import ChatChannelModel, { IChatChannel } from '../models/chatChannel.model';
import ChatMessageModel, { ChatMessageKind, IChatMessage } from '../models/chatMessage.model';
import UserModel, { IUser } from '../models/user.model';
import { getUserLastSeenAt, isUserOnline } from '../realtime/chatPresence';

export interface ChatProfile {
  id: string;
  name: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  role: string;
  presenceStatus: 'online' | 'away' | 'offline';
  lastSeenAt?: Date;
}

export interface ChatAttachmentPayload {
  name: string;
  url: string;
  mimeType?: string;
}

export interface CreateChatMessagePayload {
  channelId: string;
  senderId: string;
  content: string;
  kind?: ChatMessageKind;
  replyToMessageId?: string;
  attachments?: ChatAttachmentPayload[];
}

export interface ChatMessageResponse {
  id: string;
  channelId: string;
  sender: ChatProfile;
  content: string;
  kind: ChatMessageKind;
  attachments: ChatAttachmentPayload[];
  replyToMessageId?: string;
  createdAt: Date;
  updatedAt: Date;
  editedAt?: Date;
  deletedAt?: Date;
}

export interface ChatChannelResponse {
  id: string;
  name: string;
  slug: string;
  description?: string;
  topic?: string;
  isPrivate: boolean;
  isArchived: boolean;
  lastMessageAt?: Date;
  memberCount: number;
  members: ChatProfile[];
}

export interface ChatWorkspaceResponse {
  user: ChatProfile;
  channels: ChatChannelResponse[];
  members: ChatProfile[];
}

const DEFAULT_CHANNELS = [
  {
    name: 'Deployment Logs',
    slug: 'deployment-logs',
    description: 'Deployment status, release notes, and rollout updates.',
    topic: 'Production and staging deployment coordination',
  },
  {
    name: 'Security Alerts',
    slug: 'security-alerts',
    description: 'Security incidents, approvals, and urgent reviews.',
    topic: 'High-priority security coordination',
  },
  {
    name: 'General',
    slug: 'general',
    description: 'Team chatter, planning, and quick sync updates.',
    topic: 'Everyday collaboration and planning',
  },
];

const toChatProfile = (user: IUser): ChatProfile => ({
  id: user._id.toString(),
  name: user.name || user.githubUsername || user.email,
  email: user.email,
  displayName: user.displayName || user.name || user.githubUsername || user.email,
  avatarUrl: user.avatarUrl,
  role: user.role || (user.githubUsername ? 'Contributor' : 'Member'),
  presenceStatus: isUserOnline(user._id.toString()) ? 'online' : user.presenceStatus || 'offline',
  lastSeenAt: getUserLastSeenAt(user._id.toString()) || user.lastSeenAt,
});

const toChatMessageResponse = (
  message: IChatMessage & { senderId: IUser }
): ChatMessageResponse => ({
  id: message._id.toString(),
  channelId: message.channelId.toString(),
  sender: toChatProfile(message.senderId),
  content: message.content,
  kind: message.kind,
  attachments: message.attachments.map((attachment) => ({
    name: attachment.name,
    url: attachment.url,
    mimeType: attachment.mimeType,
  })),
  replyToMessageId: message.replyToMessageId?.toString(),
  createdAt: message.createdAt,
  updatedAt: message.updatedAt,
  editedAt: message.editedAt,
  deletedAt: message.deletedAt,
});

const toChannelResponse = (
  channel: IChatChannel,
  members: IUser[]
): ChatChannelResponse => ({
  id: channel._id.toString(),
  name: channel.name,
  slug: channel.slug,
  description: channel.description,
  topic: channel.topic,
  isPrivate: channel.isPrivate,
  isArchived: channel.isArchived,
  lastMessageAt: channel.lastMessageAt,
  memberCount: members.length,
  members: members.map(toChatProfile),
});

const getWorkspaceUsers = async (): Promise<IUser[]> => {
  return await UserModel.find().sort({ createdAt: 1 });
};

export const listWorkspaceMembers = async (): Promise<ChatProfile[]> => {
  const users = await getWorkspaceUsers();
  return users.map(toChatProfile);
};

export const ensureDefaultChannels = async (): Promise<void> => {
  const existingCount = await ChatChannelModel.countDocuments();
  if (existingCount > 0) return;

  const firstUser = await UserModel.findOne().sort({ createdAt: 1 });
  if (!firstUser) return;

  await ChatChannelModel.insertMany(
    DEFAULT_CHANNELS.map((channel) => ({
      ...channel,
      createdBy: firstUser._id,
      memberIds: [firstUser._id],
    }))
  );
};

export const getChatProfileByUserId = async (userId: string): Promise<ChatProfile | null> => {
  const user = await UserModel.findById(userId);
  return user ? toChatProfile(user) : null;
};

export const listChatChannels = async (): Promise<ChatChannelResponse[]> => {
  await ensureDefaultChannels();

  const channels = await ChatChannelModel.find({ isArchived: false }).sort({ createdAt: 1 });
  const users = await getWorkspaceUsers();

  return channels.map((channel) => {
    const memberIds = channel.memberIds.length > 0 ? channel.memberIds : users.map((user) => user._id);
    const members = users.filter((user) => memberIds.some((memberId) => memberId.equals(user._id)));
    return toChannelResponse(channel, members);
  });
};

export const getChatWorkspace = async (userId: string): Promise<ChatWorkspaceResponse> => {
  await ensureDefaultChannels();
  await seedChannelMembershipForUser(userId);

  const [user, channels, members] = await Promise.all([
    getChatProfileByUserId(userId),
    listChatChannels(),
    listWorkspaceMembers(),
  ]);

  if (!user) {
    throw new Error('User not found');
  }

  return { user, channels, members };
};

export const getChatChannelById = async (channelId: string): Promise<IChatChannel | null> => {
  return await ChatChannelModel.findById(channelId);
};

export const getChatChannelBySlug = async (slug: string): Promise<IChatChannel | null> => {
  return await ChatChannelModel.findOne({ slug });
};

export const getChatChannelMembers = async (channelId: string): Promise<ChatProfile[]> => {
  const channel = await ChatChannelModel.findById(channelId);
  if (!channel) return [];

  const users = await getWorkspaceUsers();
  const memberIds = channel.memberIds.length > 0 ? channel.memberIds : users.map((user) => user._id);
  return users.filter((user) => memberIds.some((memberId) => memberId.equals(user._id))).map(toChatProfile);
};

export const getChatChannelMessages = async (
  channelId: string,
  limit = 50
): Promise<ChatMessageResponse[]> => {
  const safeLimit = Math.max(1, Math.min(limit, 100));
  const messages = await ChatMessageModel.find({ channelId, deletedAt: { $exists: false } })
    .sort({ createdAt: -1 })
    .limit(safeLimit)
    .populate<{ senderId: IUser }>('senderId');

  return messages.reverse().map((message) =>
    toChatMessageResponse(message as unknown as IChatMessage & { senderId: IUser })
  );
};

export const createChatMessage = async (
  payload: CreateChatMessagePayload
): Promise<ChatMessageResponse> => {
  const message = await ChatMessageModel.create({
    channelId: payload.channelId,
    senderId: payload.senderId,
    content: payload.content.trim(),
    kind: payload.kind || 'text',
    replyToMessageId: payload.replyToMessageId,
    attachments: payload.attachments || [],
  });

  await ChatChannelModel.findByIdAndUpdate(payload.channelId, {
    $set: { lastMessageAt: message.createdAt },
  });

  const populated = await ChatMessageModel.findById(message._id).populate<{ senderId: IUser }>('senderId');
  if (!populated) {
    throw new Error('Unable to load chat message');
  }

  return toChatMessageResponse(populated as unknown as IChatMessage & { senderId: IUser });
};

export const seedChannelMembershipForUser = async (userId: string): Promise<void> => {
  const channels = await ChatChannelModel.find({ isArchived: false });
  if (channels.length === 0) return;

  await ChatChannelModel.updateMany(
    { _id: { $in: channels.map((channel) => channel._id) } },
    { $addToSet: { memberIds: userId } }
  );
};
