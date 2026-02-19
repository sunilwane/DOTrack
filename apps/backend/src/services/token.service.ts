import RefreshTokenModel, { IRefreshToken } from '../models/refreshToken.model';
import { generateRefreshToken, hashToken } from '../utils/token';
import mongoose from 'mongoose';

const REFRESH_TOKEN_EXPIRES_IN_SECONDS = parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN || '604800'); // 7 days

export const createRefreshToken = async (userId: string | mongoose.Types.ObjectId): Promise<string> => {
    const rawToken = generateRefreshToken(64);
    const tokenHash = hashToken(rawToken);
    const expiresAt = new Date(Date.now() + REFRESH_TOKEN_EXPIRES_IN_SECONDS * 1000);

    await RefreshTokenModel.create({
        userId,
        tokenHash,
        expiresAt,
    });

    return rawToken;
};

export const verifyRefreshToken = async (rawToken: string): Promise<IRefreshToken | null> => {
    const tokenHash = hashToken(rawToken);
    return await RefreshTokenModel.findOne({ tokenHash });
};

export const rotateRefreshToken = async (oldRawToken: string, userId: string): Promise<string | null> => {
    const oldHash = hashToken(oldRawToken);
    const doc = await RefreshTokenModel.findOne({ tokenHash: oldHash, userId });

    if (!doc) return null;

    await RefreshTokenModel.deleteOne({ _id: doc._id });

    return await createRefreshToken(userId);
};

export const revokeRefreshToken = async (rawToken: string): Promise<void> => {
    const tokenHash = hashToken(rawToken);
    await RefreshTokenModel.deleteOne({ tokenHash });
};

export const revokeAllUserRefreshTokens = async (userId: string): Promise<void> => {
    await RefreshTokenModel.deleteMany({ userId });
};