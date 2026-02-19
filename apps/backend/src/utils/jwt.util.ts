import jwt, { SignOptions } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
}

export interface JWTPayload {
    sub: string;
    email: string;
    [key: string]: any;
}

export const generateAccessToken = (userId: string, email: string): string => {
    const payload: JWTPayload = { sub: userId, email };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN as SignOptions['expiresIn'] });
};

export const verifyAccessToken = (token: string): JWTPayload => {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
};

export const decodeToken = (token: string): JWTPayload | null => {
    return jwt.decode(token) as JWTPayload | null;
};
