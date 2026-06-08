export type ChatPresenceStatus = 'online' | 'away' | 'offline';
export type ChatMessageKind = 'text' | 'code' | 'system';

export interface ChatProfile {
  id: string;
  name: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  role: string;
  presenceStatus: ChatPresenceStatus;
  lastSeenAt?: string;
}

export interface ChatAttachment {
  name: string;
  url: string;
  mimeType?: string;
}

export interface ChatMessage {
  id: string;
  channelId: string;
  sender: ChatProfile;
  content: string;
  kind: ChatMessageKind;
  attachments: ChatAttachment[];
  replyToMessageId?: string;
  createdAt: string;
  updatedAt: string;
  editedAt?: string;
  deletedAt?: string;
}

export interface ChatChannel {
  id: string;
  name: string;
  slug: string;
  description?: string;
  topic?: string;
  isPrivate: boolean;
  isArchived: boolean;
  lastMessageAt?: string;
  memberCount: number;
  members: ChatProfile[];
}

export interface ChatWorkspaceResponse {
  user: ChatProfile;
  channels: ChatChannel[];
  members: ChatProfile[];
}

export interface ChatMessagesResponse {
  messages: ChatMessage[];
}

export interface ProjectChatMessage {
  id: string;
  roomId: string;
  sender: {
    name: string;
    email: string;
  };
  content: string;
  kind: 'text' | 'code';
  createdAt: string;
}

export interface ChatChannelSummary {
  id: string;
  name: string;
  slug: string;
  description?: string;
  topic?: string;
  isPrivate: boolean;
  isArchived: boolean;
  lastMessageAt?: string;
  memberCount: number;
  members: ChatProfile[];
}
