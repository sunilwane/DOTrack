import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  name?: string;
  displayName?: string;
  avatarUrl?: string;
  role?: string;
  presenceStatus?: 'online' | 'away' | 'offline';
  lastSeenAt?: Date;
  githubId?: string;
  githubUsername?: string;
  githubAccessToken?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    name: { type: String },
    displayName: { type: String },
    avatarUrl: { type: String },
    role: { type: String },
    presenceStatus: { type: String, enum: ['online', 'away', 'offline'], default: 'offline' },
    lastSeenAt: { type: Date },
    githubId: { type: String, index: true },
    githubUsername: { type: String },
    githubAccessToken: { type: String },
  },
  { timestamps: true }
);

const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;
