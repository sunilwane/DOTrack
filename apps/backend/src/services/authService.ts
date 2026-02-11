import UserModel from '../models/user.model';
import RefreshTokenModel from '../models/refreshToken.model';
import { hashPassword, comparePassword } from '../utils/hash';
import { generateRefreshToken, hashToken } from '../utils/token';
import jwt from 'jsonwebtoken';

const SALT_ROUNDS = 12;
import bcrypt from 'bcrypt';
const DUMMY_HASH = bcrypt.hashSync('invalid-password-placeholder', SALT_ROUNDS);

export const createUser = async (payload: { email?: string; password?: string; name?: string }) => {
  if (!payload.email || !payload.password) throw new Error('email and password required');
  const normalizedEmail = payload.email.toLowerCase().trim();
  const existing = await UserModel.findOne({ email: normalizedEmail });
  if (existing) {
    throw new Error('Unable to process request');
  }
  const hashed = await hashPassword(payload.password);
  const user = await UserModel.create({ email: normalizedEmail, password: hashed, name: payload.name });
  return { id: user._id.toString(), email: user.email, name: user.name };
};

export const authenticateUser = async (payload: { email?: string; password?: string }) => {
  const normalizedEmail = (payload.email || '').toLowerCase().trim();
  const user = await UserModel.findOne({ email: normalizedEmail });
  const hashedToCompare = user ? user.password : DUMMY_HASH;
  const ok = await comparePassword(payload.password || '', hashedToCompare);
  if (!ok || !user) {
    throw new Error('Invalid credentials');
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET not set');
  const expiresIn = process.env.JWT_EXPIRES_IN || '1h';
  const accessToken = jwt.sign({ sub: user._id.toString(), email: user.email }, secret as any, { expiresIn: expiresIn as any });

  const rawRefreshToken = generateRefreshToken(64);
  const tokenHash = hashToken(rawRefreshToken);
  const refreshExpiresSeconds = parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN || '604800');
  const expiresAt = new Date(Date.now() + refreshExpiresSeconds * 1000);
  await RefreshTokenModel.create({ userId: user._id, tokenHash, expiresAt });

  return { accessToken, refreshToken: rawRefreshToken, userId: user._id.toString() };
};

export const rotateRefreshToken = async (oldRawToken: string, userId: string) => {
  const oldHash = hashToken(oldRawToken);
  const doc = await RefreshTokenModel.findOne({ tokenHash: oldHash, userId });
  if (!doc) return null;
  await RefreshTokenModel.deleteOne({ _id: doc._id });
  const newRaw = generateRefreshToken(64);
  const newHash = hashToken(newRaw);
  const refreshExpiresSeconds = parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN || '604800');
  const expiresAt = new Date(Date.now() + refreshExpiresSeconds * 1000);
  await RefreshTokenModel.create({ userId, tokenHash: newHash, expiresAt });
  return newRaw;
};

export const verifyRefreshToken = async (rawToken: string) => {
  const tokenHash = hashToken(rawToken);
  const doc = await RefreshTokenModel.findOne({ tokenHash });
  return doc;
};

export const revokeRefreshToken = async (rawToken: string) => {
  const tokenHash = hashToken(rawToken);
  await RefreshTokenModel.deleteOne({ tokenHash });
};

export const findOrCreateUserByGoogle = async (email?: string, name?: string) => {
  if (!email) throw new Error('Email required');
  const normalizedEmail = email.toLowerCase().trim();
  let user = await UserModel.findOne({ email: normalizedEmail });
  if (user) return user;
  const random = generateRefreshToken(32);
  const hashed = await hashPassword(random);
  user = await UserModel.create({ email: normalizedEmail, password: hashed, name });
  return user;
};

export const createTokensForUser = async (user: any) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET not set');
  const expiresIn = process.env.JWT_EXPIRES_IN || '1h';
  const accessToken = jwt.sign({ sub: user._id.toString(), email: user.email }, secret as any, { expiresIn: expiresIn as any });

  const rawRefreshToken = generateRefreshToken(64);
  const tokenHash = hashToken(rawRefreshToken);
  const refreshExpiresSeconds = parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN || '604800');
  const expiresAt = new Date(Date.now() + refreshExpiresSeconds * 1000);
  await RefreshTokenModel.create({ userId: user._id, tokenHash, expiresAt });

  return { accessToken, refreshToken: rawRefreshToken, userId: user._id.toString() };
};
