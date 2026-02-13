import mongoose, { Document } from 'mongoose';

export interface IRevokedToken extends Document {
  token: string;
  expiresAt: Date;
}

const RevokedTokenSchema = new mongoose.Schema(
  {
    token: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

RevokedTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const RevokedTokenModel = mongoose.model<IRevokedToken>('RevokedToken', RevokedTokenSchema);

export default RevokedTokenModel;
