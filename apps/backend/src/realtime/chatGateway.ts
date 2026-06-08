import { IncomingMessage, Server } from 'http';
import { RawData, WebSocket, WebSocketServer } from 'ws';
import { verifyAccessToken } from '../utils/jwt.util';
import {
  createChatMessage,
  getChatChannelById,
  getChatChannelMembers,
  getChatChannelMessages,
  getChatProfileByUserId,
  listChatChannels,
  listWorkspaceMembers,
  seedChannelMembershipForUser,
} from '../services/chat.service';
import { addProjectRoomMessage, getProjectRoomMessages, type ProjectChatMessage } from '../services/projectChat.service';
import { setUserOffline, setUserOnline } from './chatPresence';

type ProjectRoomState = {
  roomId: string;
  participants: Set<string>;
};

type ChatSocketMessage =
  | { type: 'join_channel'; channelId: string }
  | {
      type: 'send_message';
      channelId: string;
      content: string;
      kind?: 'text' | 'code' | 'system';
      replyToMessageId?: string;
      attachments?: { name: string; url: string; mimeType?: string }[];
    }
  | { type: 'typing'; channelId: string; isTyping: boolean };

type SocketState = {
  userId: string;
  joinedChannels: Set<string>;
};

type JoinChannelEvent = {
  type: 'channel:joined';
  channelId: string;
  messages: Awaited<ReturnType<typeof getChatChannelMessages>>;
  members: Awaited<ReturnType<typeof getChatChannelMembers>>;
};

type MessageEvent = {
  type: 'message:new';
  message: Awaited<ReturnType<typeof createChatMessage>>;
};

type PresenceEvent = {
  type: 'presence:update';
  channelId: string;
  members: Awaited<ReturnType<typeof getChatChannelMembers>>;
};

const socketState = new Map<WebSocket, SocketState>();
const channelSubscribers = new Map<string, Set<WebSocket>>();
const projectRoomSockets = new Map<string, Set<WebSocket>>();
const projectRoomState = new Map<WebSocket, ProjectRoomState>();

const sendJson = (socket: WebSocket, payload: unknown) => {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(payload));
  }
};

const getTokenFromRequest = (request: IncomingMessage): string | null => {
  try {
    const url = new URL(request.url || '', 'http://localhost');
    return url.searchParams.get('token');
  } catch {
    return null;
  }
};

const addSubscriber = (channelId: string, socket: WebSocket) => {
  const subscribers = channelSubscribers.get(channelId) || new Set<WebSocket>();
  subscribers.add(socket);
  channelSubscribers.set(channelId, subscribers);
};

const removeSubscriber = (channelId: string, socket: WebSocket) => {
  const subscribers = channelSubscribers.get(channelId);
  if (!subscribers) return;

  subscribers.delete(socket);
  if (subscribers.size === 0) {
    channelSubscribers.delete(channelId);
  }
};

const broadcastToChannel = (channelId: string, payload: unknown) => {
  const subscribers = channelSubscribers.get(channelId);
  if (!subscribers) return;

  subscribers.forEach((socket) => sendJson(socket, payload));
};

const broadcastToProjectRoom = (roomId: string, payload: unknown) => {
  const subscribers = projectRoomSockets.get(roomId);
  if (!subscribers) return;

  subscribers.forEach((socket) => sendJson(socket, payload));
};

const handleJoinChannel = async (socket: WebSocket, state: SocketState, channelId: string) => {
  const channel = await getChatChannelById(channelId);
  if (!channel) {
    sendJson(socket, { type: 'error', message: 'Channel not found' });
    return;
  }

  if (!state.joinedChannels.has(channelId)) {
    state.joinedChannels.add(channelId);
    addSubscriber(channelId, socket);
  }

  const [messages, channelMembers, workspaceMembers] = await Promise.all([
    getChatChannelMessages(channelId),
    getChatChannelMembers(channelId),
    listWorkspaceMembers(),
  ]);

  const event: JoinChannelEvent = {
    type: 'channel:joined',
    channelId,
    messages,
    members: channelMembers,
  };

  sendJson(socket, event);
  broadcastToChannel(channelId, {
    type: 'presence:update',
    channelId,
    members: workspaceMembers,
  } satisfies PresenceEvent);
};

const handleSendMessage = async (socket: WebSocket, state: SocketState, payload: Extract<ChatSocketMessage, { type: 'send_message' }>) => {
  const channel = await getChatChannelById(payload.channelId);
  if (!channel) {
    sendJson(socket, { type: 'error', message: 'Channel not found' });
    return;
  }

  const message = await createChatMessage({
    channelId: payload.channelId,
    senderId: state.userId,
    content: payload.content,
    kind: payload.kind,
    replyToMessageId: payload.replyToMessageId,
    attachments: payload.attachments,
  });

  const event: MessageEvent = { type: 'message:new', message };
  broadcastToChannel(payload.channelId, event);
};

export const initializeChatGateway = (server: Server) => {
  const wss = new WebSocketServer({ server, path: '/ws/chat' });

  wss.on('connection', async (socket: WebSocket, request: IncomingMessage) => {
    const token = getTokenFromRequest(request);
    if (!token) {
      sendJson(socket, { type: 'error', message: 'Missing auth token' });
      socket.close();
      return;
    }

    try {
      const decoded = verifyAccessToken(token);
      const url = new URL(request.url || '', 'http://localhost');
      const roomId = url.searchParams.get('room');

      const profile = await getChatProfileByUserId(decoded.sub);
      if (!profile) {
        sendJson(socket, { type: 'error', message: 'User not found' });
        socket.close();
        return;
      }

      if (roomId) {
        const subscribers = projectRoomSockets.get(roomId) || new Set<WebSocket>();
        subscribers.add(socket);
        projectRoomSockets.set(roomId, subscribers);

        const roomMessages = getProjectRoomMessages(roomId);
        projectRoomState.set(socket, { roomId, participants: new Set([profile.id]) });
        setUserOnline(profile.id);

        sendJson(socket, {
          type: 'connected',
          user: profile,
          roomId,
          messages: roomMessages,
        });

        socket.on('message', async (rawMessage: RawData) => {
          try {
            const parsed = JSON.parse(rawMessage.toString()) as ChatSocketMessage & {
              type?: string;
            };

            if (parsed.type === 'send_message') {
              if (!parsed.content.trim()) {
                sendJson(socket, { type: 'error', message: 'Message cannot be empty' });
                return;
              }

              const nextMessage: ProjectChatMessage = {
                id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
                roomId,
                sender: { name: profile.displayName || profile.name, email: profile.email },
                content: parsed.content.trim(),
                kind: parsed.kind === 'code' ? 'code' : 'text',
                createdAt: new Date().toISOString(),
              };

              addProjectRoomMessage(nextMessage);

              broadcastToProjectRoom(roomId, { type: 'message:new', message: nextMessage });
              return;
            }

            if (parsed.type === 'typing') {
              broadcastToProjectRoom(roomId, {
                type: 'typing:update',
                roomId,
                user: profile.displayName || profile.name,
                isTyping: parsed.isTyping,
              });
            }
          } catch {
            sendJson(socket, { type: 'error', message: 'Invalid websocket payload' });
          }
        });

        socket.on('close', () => {
          const subscribersSet = projectRoomSockets.get(roomId);
          if (subscribersSet) {
            subscribersSet.delete(socket);
            if (subscribersSet.size === 0) {
              projectRoomSockets.delete(roomId);
            }
          }
          const currentState = projectRoomState.get(socket);
          if (currentState) {
            setUserOffline(profile.id);
          }
          projectRoomState.delete(socket);
        });

        return;
      }

      await seedChannelMembershipForUser(profile.id);

      const state: SocketState = {
        userId: profile.id,
        joinedChannels: new Set<string>(),
      };

      socketState.set(socket, state);
      setUserOnline(profile.id);

      const channels = await listChatChannels();
      const members = await listWorkspaceMembers();
      sendJson(socket, {
        type: 'connected',
        user: profile,
        channels,
        members,
      });

      socket.on('message', async (rawMessage: RawData) => {
        try {
          const parsed = JSON.parse(rawMessage.toString()) as ChatSocketMessage;
          if (parsed.type === 'join_channel') {
            await handleJoinChannel(socket, state, parsed.channelId);
            return;
          }

          if (parsed.type === 'send_message') {
            if (!parsed.content.trim()) {
              sendJson(socket, { type: 'error', message: 'Message cannot be empty' });
              return;
            }

            await handleSendMessage(socket, state, parsed);
            return;
          }

          if (parsed.type === 'typing') {
            sendJson(socket, { type: 'typing:ack', channelId: parsed.channelId, isTyping: parsed.isTyping });
            return;
          }

          sendJson(socket, { type: 'error', message: 'Unsupported event type' });
        } catch {
          sendJson(socket, { type: 'error', message: 'Invalid websocket payload' });
        }
      });

      socket.on('close', () => {
        const currentState = socketState.get(socket);
        if (currentState) {
          currentState.joinedChannels.forEach((channelId) => removeSubscriber(channelId, socket));
          setUserOffline(currentState.userId);
        }
        socketState.delete(socket);
      });
    } catch {
      sendJson(socket, { type: 'error', message: 'Invalid auth token' });
      socket.close();
      return;
    }
  });

  return wss;
};
