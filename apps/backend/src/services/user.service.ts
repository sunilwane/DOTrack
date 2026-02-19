import UserModel, { IUser } from '../models/user.model';
import { hashPassword } from '../utils/hash';
import { generateRefreshToken } from '../utils/token';

export interface CreateUserPayload {
    email: string;
    password?: string;
    name?: string;
    githubId?: string;
    githubUsername?: string;
    githubAccessToken?: string;
}

export const createUser = async (payload: CreateUserPayload): Promise<IUser> => {
    const normalizedEmail = payload.email.toLowerCase().trim();

    let password = payload.password;
    if (!password) {
        const random = generateRefreshToken(32);
        password = random;
    }

    const hashed = await hashPassword(password);

    return await UserModel.create({
        ...payload,
        email: normalizedEmail,
        password: hashed,
    });
};

export const findUserByEmail = async (email: string): Promise<IUser | null> => {
    const normalizedEmail = email.toLowerCase().trim();
    return await UserModel.findOne({ email: normalizedEmail });
};

export const findUserById = async (id: string): Promise<IUser | null> => {
    return await UserModel.findById(id);
};

export const findOrCreateUserByGoogle = async (email: string, name?: string): Promise<IUser> => {
    const existingUser = await findUserByEmail(email);
    if (existingUser) return existingUser;

    return await createUser({ email, name });
};

export const findOrCreateUserByGithub = async (
    email: string,
    name?: string,
    githubId?: string,
    githubUsername?: string,
    githubAccessToken?: string
): Promise<IUser> => {
    let user = await findUserByEmail(email);

    if (user) {
        const updates: Partial<IUser> = {};
        if (githubId) updates.githubId = githubId;
        if (githubUsername) updates.githubUsername = githubUsername;
        if (githubAccessToken) updates.githubAccessToken = githubAccessToken;

        if (Object.keys(updates).length > 0) {
            user = await UserModel.findByIdAndUpdate(user._id, { $set: updates }, { new: true });
        }
        return user!;
    }

    return await createUser({
        email,
        name,
        githubId,
        githubUsername,
        githubAccessToken,
    });
};
