import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { signupSchema, signinSchema } from '../utils/validators';
import { getRefreshCookieOptions } from '../utils/cookies';
import { AuthRequest } from '../middlewares/authMiddleware';
import * as AuthService from '../services/authService';
import * as UserService from '../services/user.service';
import * as TokenService from '../services/token.service';
import { githubService } from '../services/githubService';
import { oauthService } from '../services/oauthService';
import RevokedTokenModel from '../models/revokedToken.model';



export const signup = asyncHandler(async (req: Request, res: Response) => {
  const parsed = signupSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.issues.map((e: any) => e.message) });

  const user = await AuthService.createUser(parsed.data);
  res.status(201).json(user);
});




export const signin = asyncHandler(async (req: Request, res: Response) => {
  const parsed = signinSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.issues.map((e: any) => e.message) });

  const { accessToken, refreshToken } = await AuthService.authenticateUser(parsed.data as any);

  res.cookie('refreshToken', refreshToken, getRefreshCookieOptions());
  res.json({ accessToken });
});





export const signout = asyncHandler(async (req: Request, res: Response) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(400).json({ error: 'No token provided' });

  const token = auth.split(' ')[1];
  if (!token) return res.status(400).json({ error: 'Invalid authorization header' });

  const decoded = require('jsonwebtoken').decode(token) as any;
  const exp = decoded?.exp ? new Date(decoded.exp * 1000) : new Date(Date.now() + 60 * 60 * 1000);
  await RevokedTokenModel.create({ token, expiresAt: exp });

  const refreshToken = (req as any).cookies?.refreshToken;
  if (refreshToken) {
    await TokenService.revokeRefreshToken(refreshToken);
    res.clearCookie('refreshToken', getRefreshCookieOptions());
  }

  res.status(200).json({ ok: true });
});





export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const rawToken = (req as any).cookies?.refreshToken;
  if (!rawToken) return res.status(401).json({ message: 'Unauthenticated' });



  const doc = await TokenService.verifyRefreshToken(rawToken);
  if (!doc) return res.status(401).json({ message: 'Invalid refresh token' });

  const user = await UserService.findUserById(doc.userId.toString());
  if (!user) return res.status(401).json({ message: 'User not found' });

  const newRefreshToken = await TokenService.rotateRefreshToken(rawToken, user._id.toString());
  if (!newRefreshToken) return res.status(401).json({ message: 'Invalid refresh token state' });

  const tokens = await AuthService.createTokensForUser(user);
  const { generateAccessToken } = require('../utils/jwt.util');
  const accessToken = generateAccessToken(user._id.toString(), user.email);

  res.cookie('refreshToken', newRefreshToken, getRefreshCookieOptions());
  res.json({ accessToken });
});




export const me = asyncHandler(async (req: AuthRequest, res: Response) => {
  res.json({ user: req.user });
});


  


export const googleAuth = asyncHandler(async (req: Request, res: Response) => {
  const clientId = process.env.GOOGLE_CLIENT_ID!;
  const callback = process.env.GOOGLE_CALLBACK_URL!;
  const returnTo = (req.query.returnTo as string) || '/';

  const url = oauthService.buildGoogleAuthUrl({ clientId, callbackUrl: callback, clientSecret: '' }, returnTo);
  res.redirect(url);
});





export const googleCallback = asyncHandler(async (req: Request, res: Response) => {
  const code = req.query.code as string;
  const state = req.query.state as string;
  const frontend = process.env.FRONTEND_URL || 'http://localhost:3000';

  const tokenData = await oauthService.exchangeGoogleCode({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackUrl: process.env.GOOGLE_CALLBACK_URL!
  }, code);

  const decoded = require('jsonwebtoken').decode(tokenData.id_token) as any;
  const user = await UserService.findOrCreateUserByGoogle(decoded.email, decoded.name);
  const tokens = await AuthService.createTokensForUser(user);

  res.cookie('refreshToken', tokens.refreshToken, getRefreshCookieOptions());

  const { returnTo } = oauthService.parseState(state);
  res.redirect(`${frontend}${returnTo}`);
});

export const githubAuth = asyncHandler(async (req: Request, res: Response) => {
  const clientId = process.env.GITHUB_CLIENT_ID!;
  const callback = process.env.GITHUB_CALLBACK_URL!;
  const returnTo = (req.query.returnTo as string) || '/';

  const url = oauthService.buildGithubAuthUrl({ clientId, callbackUrl: callback, clientSecret: '' }, returnTo);
  res.redirect(url);
});





export const githubCallback = asyncHandler(async (req: Request, res: Response) => {
  const code = req.query.code as string;
  const state = req.query.state as string;
  const frontend = process.env.FRONTEND_URL || 'http://localhost:3000';

  const tokenData = await oauthService.exchangeGithubCode({
    clientId: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    callbackUrl: process.env.GITHUB_CALLBACK_URL!
  }, code);

  let email = await githubService.getUserPrimaryEmail(tokenData.access_token);
  const userInfo = await githubService.getUserInfo(tokenData.access_token);

  if (!email) email = userInfo.email;
  if (!email) throw new Error('No email found for GitHub user');

  const user = await UserService.findOrCreateUserByGithub(
    email,
    userInfo.name || userInfo.login,
    String(userInfo.id),
    userInfo.login,
    tokenData.access_token
  );

  const tokens = await AuthService.createTokensForUser(user);

  res.cookie('refreshToken', tokens.refreshToken, getRefreshCookieOptions());

  const { returnTo } = oauthService.parseState(state);
  res.redirect(`${frontend}${returnTo}`);
});




export const getGithubRepos = asyncHandler(async (req: AuthRequest, res: Response) => {
  const user = await UserService.findUserById(req.user.sub);
  if (!user || !user.githubAccessToken) return res.json([]);

  const repos = await githubService.getUserRepos(user.githubAccessToken);
  res.json(repos);
});



export const getGithubCollaborators = asyncHandler(async (req: AuthRequest, res: Response) => {
  const user = await UserService.findUserById(req.user.sub);
  if (!user || !user.githubAccessToken) return res.status(400).json({ error: 'No GitHub access token' });

  const { owner, repo } = req.params;
  const ownerStr = Array.isArray(owner) ? owner[0] : owner;
  const repoStr = Array.isArray(repo) ? repo[0] : repo;

  const collaborators = await githubService.getRepoCollaboratorsOrContributors(
    user.githubAccessToken,
    ownerStr,
    repoStr
  );
  res.json(collaborators);
});
