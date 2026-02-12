import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/authService';
import RevokedTokenModel from '../models/revokedToken.model';
import jwt from 'jsonwebtoken';
import { signupSchema, signinSchema } from '../utils/validators';
import UserModel from '../models/user.model';
import { getRefreshCookieOptions } from '../utils/cookies';
import { AuthRequest } from '../middlewares/authMiddleware';

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.issues.map((e: any) => e.message) });
    const user = await authService.createUser(parsed.data);
    res.status(201).json(user);
  } catch (err) {
    console.error('signup error', err);
    res.status(400).json({ error: 'Unable to complete request' });
  }
};

export const signin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = signinSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.issues.map((e: any) => e.message) });
    const { accessToken, refreshToken } = await authService.authenticateUser(parsed.data as any);
    const cookieOptions = getRefreshCookieOptions();
    res.cookie('refreshToken', refreshToken, cookieOptions);
    res.json({ accessToken });
  } catch (err) {
    console.error('signin error', err);
    res.status(401).json({ error: 'Invalid credentials' });
  }
};

export const signout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) return res.status(400).json({ error: 'No token provided' });
    const parts = auth.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(400).json({ error: 'Invalid authorization header' });
    const token = parts[1];

    const decoded = jwt.decode(token) as any;
    const exp = decoded?.exp ? new Date(decoded.exp * 1000) : new Date(Date.now() + 60 * 60 * 1000);

    await RevokedTokenModel.create({ token, expiresAt: exp });
    const raw = (req as any).cookies?.refreshToken;
    if (raw) {
      await authService.revokeRefreshToken(raw);
      const cookieOptions = getRefreshCookieOptions();
      res.clearCookie('refreshToken', cookieOptions);
    }
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('signout error', err);
    res.status(500).json({ error: 'Unable to complete request' });
  }
};

export const me = async (req: AuthRequest, res: Response) => {
  const payload = req.user;
  res.json({ user: payload });
};

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const raw = (req as any).cookies?.refreshToken;
    if (!raw) return res.status(401).json({ message: 'Unauthenticated' });
    const doc = await authService.verifyRefreshToken(raw);
    if (!doc) return res.status(401).json({ message: 'Invalid refresh token' });
    const user = await UserModel.findById(doc.userId);
    if (!user) return res.status(401).json({ message: 'Invalid refresh token' });
    const newRaw = await authService.rotateRefreshToken(raw, doc.userId.toString());
    if (!newRaw) return res.status(401).json({ message: 'Invalid refresh token' });
    const secret = process.env.JWT_SECRET as string;
    const expiresIn = process.env.JWT_EXPIRES_IN || '1h';
    const accessToken = jwt.sign({ sub: user._id.toString(), email: user.email }, secret as any, { expiresIn: expiresIn as any });
    const cookieOptions = getRefreshCookieOptions();
    res.cookie('refreshToken', newRaw, cookieOptions);
    res.json({ accessToken });
  } catch (err) {
    next(err);
  }
};

export const googleAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const callback = process.env.GOOGLE_CALLBACK_URL;
    if (!clientId || !callback) return res.status(500).json({ error: 'Google OAuth not configured' });
    const returnTo = (req.query.returnTo as string) || '/';
    const frontend = process.env.FRONTEND_URL || 'http://localhost:3000';
    const state = encodeURIComponent(JSON.stringify({ returnTo }));
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(
      clientId
    )}&redirect_uri=${encodeURIComponent(callback)}&response_type=code&scope=${encodeURIComponent(
      'openid profile email'
    )}&access_type=offline&prompt=consent&state=${state}`;
    res.redirect(url);
  } catch (err) {
    next(err);
  }
};

export const googleCallback = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const code = req.query.code as string | undefined;
    const state = req.query.state as string | undefined;
    const clientId = process.env.GOOGLE_CLIENT_ID as string;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET as string;
    const callback = process.env.GOOGLE_CALLBACK_URL as string;
    const frontend = process.env.FRONTEND_URL || 'http://localhost:3000';

    if (!code) return res.status(400).json({ error: 'Missing code' });
    const params = new URLSearchParams();
    params.append('code', code);
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    params.append('redirect_uri', callback);
    params.append('grant_type', 'authorization_code');

    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    const tokenJson = await tokenRes.json();
    const idToken = tokenJson.id_token as string | undefined;
    if (!idToken) return res.status(400).json({ error: 'Unable to verify google identity' });

    const decoded = require('jsonwebtoken').decode(idToken) as any;
    const email = decoded?.email;
    const name = decoded?.name;
    if (!email) return res.status(400).json({ error: 'No email returned from Google' });

    const user = await authService.findOrCreateUserByGoogle(email, name);
    const tokens = await authService.createTokensForUser(user as any);

    const cookieOptions = getRefreshCookieOptions();
    res.cookie('refreshToken', tokens.refreshToken, cookieOptions);

    let returnTo = '/';
    if (state) {
      try {
        const parsed = JSON.parse(decodeURIComponent(state));
        if (parsed?.returnTo) returnTo = parsed.returnTo;
      } catch (e) {
      }
    }

    res.redirect(`${frontend}${returnTo}`);
  } catch (err) {
    next(err);
  }
};

export const githubAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const clientId = process.env.GITHUB_CLIENT_ID;
    const callback = process.env.GITHUB_CALLBACK_URL;
    if (!clientId || !callback) return res.status(500).json({ error: 'GitHub OAuth not configured' });
    const returnTo = (req.query.returnTo as string) || '/';
    const frontend = process.env.FRONTEND_URL || 'http://localhost:3000';
    const state = encodeURIComponent(JSON.stringify({ returnTo }));
    const url = `https://github.com/login/oauth/authorize?client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(callback)}&scope=${encodeURIComponent('read:user repo user:email')}&state=${state}`;
    res.redirect(url);
  } catch (err) {
    next(err);
  }
};

export const githubCallback = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const code = req.query.code as string | undefined;
    const state = req.query.state as string | undefined;
    const clientId = process.env.GITHUB_CLIENT_ID as string;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET as string;
    const callback = process.env.GITHUB_CALLBACK_URL as string;
    const frontend = process.env.FRONTEND_URL || 'http://localhost:3000';

    if (!code) return res.status(400).json({ error: 'Missing code' });

    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code, redirect_uri: callback }),
    });

    const tokenJson = await tokenRes.json();
    const accessToken = tokenJson.access_token as string | undefined;
    if (!accessToken) return res.status(400).json({ error: 'Unable to obtain access token from GitHub' });

    // Fetch user
    const userRes = await fetch('https://api.github.com/user', {
      headers: { Authorization: `token ${accessToken}`, Accept: 'application/vnd.github.v3+json' },
    });
    const userJson = await userRes.json();
    const email = userJson?.email as string | undefined;
    const name = userJson?.name || userJson?.login;
    const githubId = userJson?.id ? String(userJson.id) : undefined;
    const githubUsername = userJson?.login;

    // If email not present, fetch emails endpoint
    let primaryEmail = email;
    if (!primaryEmail) {
      const emailsRes = await fetch('https://api.github.com/user/emails', {
        headers: { Authorization: `token ${accessToken}`, Accept: 'application/vnd.github.v3+json' },
      });
      const emailsJson = await emailsRes.json();
      if (Array.isArray(emailsJson)) {
        const primary = emailsJson.find((e: any) => e.primary) || emailsJson[0];
        primaryEmail = primary?.email;
      }
    }

    const user = await authService.findOrCreateUserByGithub(primaryEmail, name, githubId, githubUsername, accessToken);
    const tokens = await authService.createTokensForUser(user as any);

    const cookieOptions = getRefreshCookieOptions();
    res.cookie('refreshToken', tokens.refreshToken, cookieOptions);

    let returnTo = '/';
    if (state) {
      try {
        const parsed = JSON.parse(decodeURIComponent(state));
        if (parsed?.returnTo) returnTo = parsed.returnTo;
      } catch (e) {}
    }

    res.redirect(`${frontend}${returnTo}`);
  } catch (err) {
    next(err);
  }
};

export const getGithubRepos = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const payload = req.user as any;
    if (!payload?.sub) return res.status(401).json({ error: 'Unauthorized' });
    const user = await UserModel.findById(payload.sub);
    if (!user) return res.status(404).json({ error: 'User not found' });
    const token = (user as any).githubAccessToken;
    if (!token) return res.status(400).json({ error: 'No GitHub access token available' });

    const reposRes = await fetch('https://api.github.com/user/repos?per_page=100', {
      headers: { Authorization: `token ${token}`, Accept: 'application/vnd.github.v3+json' },
    });
    if (!reposRes.ok) {
      const text = await reposRes.text();
      return res.status(502).json({ error: 'Failed to fetch repos', details: text });
    }
    const reposJson = await reposRes.json();
    res.json(reposJson);
  } catch (err) {
    next(err);
  }
};
