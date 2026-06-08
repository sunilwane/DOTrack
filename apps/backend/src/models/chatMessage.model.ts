import mongoose, { Document } from 'mongoose';

export type ChatMessageKind = 'text' | 'code' | 'system';

export interface IChatAttachment {
  name: string;
  url: string;
  mimeType?: string;
}

export interface IChatReaction {
  emoji: string;
  userIds: mongoose.Types.ObjectId[];
}

export interface IChatMessage extends Document {
  channelId: mongoose.Types.ObjectId;
  senderId: mongoose.Types.ObjectId;
  content: string;
  kind: ChatMessageKind;
  attachments: IChatAttachment[];
  reactions: IChatReaction[];
  replyToMessageId?: mongoose.Types.ObjectId;
  editedAt?: Date;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ChatMessageSchema = new mongoose.Schema(
  {
    channelId: { type: mongoose.Schema.Types.ObjectId, ref: 'ChatChannel', required: true, index: true },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    content: { type: String, required: true, trim: true },
    kind: { type: String, enum: ['text', 'code', 'system'], default: 'text' },
    attachments: [
      {
        name: { type: String, required: true },
        url: { type: String, required: true },
        mimeType: { type: String },
      },
    ],
    reactions: [
      {
        emoji: { type: String, required: true },
        userIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      },
    ],
    replyToMessageId: { type: mongoose.Schema.Types.ObjectId, ref: 'ChatMessage' },
    editedAt: { type: Date },
    deletedAt: { type: Date },
  },
  { timestamps: true }
);

ChatMessageSchema.index({ channelId: 1, createdAt: -1 });

const ChatMessageModel = mongoose.model<IChatMessage>('ChatMessage', ChatMessageSchema);

export default ChatMessageModel;
