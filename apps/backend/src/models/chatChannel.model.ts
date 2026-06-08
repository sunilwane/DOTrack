import mongoose, { Document } from 'mongoose';

export interface IChatChannel extends Document {
  name: string;
  slug: string;
  description?: string;
  topic?: string;
  createdBy: mongoose.Types.ObjectId;
  memberIds: mongoose.Types.ObjectId[];
  isPrivate: boolean;
  isArchived: boolean;
  lastMessageAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ChatChannelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String },
    topic: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    memberIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    isPrivate: { type: Boolean, default: false },
    isArchived: { type: Boolean, default: false },
    lastMessageAt: { type: Date },
  },
  { timestamps: true }
);

ChatChannelSchema.index({ slug: 1 }, { unique: true });

const ChatChannelModel = mongoose.model<IChatChannel>('ChatChannel', ChatChannelSchema);

export default ChatChannelModel;
