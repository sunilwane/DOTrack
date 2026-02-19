import { comparePassword, hashPassword } from '../utils/hash';
import * as UserService from './user.service';
import * as TokenService from './token.service';
import { generateAccessToken } from '../utils/jwt.util';
import UserModel from '../models/user.model'; // Need for direct query in authenticateUser if not in UserService, but UserService has findUserByEmail

const SALT_ROUNDS = 12;
import bcrypt from 'bcrypt';
const DUMMY_HASH = bcrypt.hashSync('invalid-password-placeholder', SALT_ROUNDS);

export const createUser = async (payload: { email?: string; password?: string; name?: string }) => {
  if (!payload.email || !payload.password) throw new Error('email and password required');

  const user = await UserService.createUser({
    email: payload.email,
    password: payload.password,
    name: payload.name
  });

  return { id: user._id.toString(), email: user.email, name: user.name };
};

export const authenticateUser = async (payload: { email?: string; password?: string }) => {
  const normalizedEmail = (payload.email || '').toLowerCase().trim();
  const user = await UserService.findUserByEmail(normalizedEmail);

  const hashedToCompare = user ? user.password : DUMMY_HASH;
  const ok = await comparePassword(payload.password || '', hashedToCompare);

  if (!ok || !user) {
    throw new Error('Invalid credentials');
  }

  return await createTokensForUser(user);
};

export const rotateRefreshToken = async (oldRawToken: string, userId: string) => {
  return await TokenService.rotateRefreshToken(oldRawToken, userId);
};

export const verifyRefreshToken = async (rawToken: string) => {
  return await TokenService.verifyRefreshToken(rawToken);
};

export const revokeRefreshToken = async (rawToken: string) => {
  await TokenService.revokeRefreshToken(rawToken);
};

export const findOrCreateUserByGoogle = async (email?: string, name?: string) => {
  if (!email) throw new Error('Email required');
  return await UserService.findOrCreateUserByGoogle(email, name);
};

export const findOrCreateUserByGithub = async (
  email?: string,
  name?: string,
  githubId?: string,
  githubUsername?: string,
  githubAccessToken?: string
) => {
  if (!email) throw new Error('Email required');
  return await UserService.findOrCreateUserByGithub(email, name, githubId, githubUsername, githubAccessToken);
};

export const createTokensForUser = async (user: any) => {
  const accessToken = generateAccessToken(user._id.toString(), user.email);
  const refreshToken = await TokenService.createRefreshToken(user._id);

  return { accessToken, refreshToken, userId: user._id.toString() };
};
