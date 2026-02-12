import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  name?: string;
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
    githubId: { type: String, index: true },
    githubUsername: { type: String },
    githubAccessToken: { type: String },
  },
  { timestamps: true }
);

const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;
