import { apiRequest } from './apiClient';
import { apiPaths } from './apiPaths';
import { tokenStorage } from './tokenStorage';
import type {
  ChatChannelSummary,
  ChatMessagesResponse,
  ProjectChatMessage,
  ChatWorkspaceResponse,
} from '../types/chat';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.trim().replace(/\/+$/, '') ||
  (import.meta.env.DEV ? 'http://localhost:5000' : '');

class ChatService {
  async getWorkspace(): Promise<ChatWorkspaceResponse> {
    return apiRequest<ChatWorkspaceResponse>(apiPaths.chat.workspace, {
      method: 'GET',
      auth: true,
    });
  }

  async getProfile(): Promise<ChatWorkspaceResponse['user']> {
    const response = await apiRequest<{ user: ChatWorkspaceResponse['user'] }>(apiPaths.chat.me, {
      method: 'GET',
      auth: true,
    });

    return response.user;
  }

  async getChannels(): Promise<ChatChannelSummary[]> {
    const response = await apiRequest<{ channels: ChatChannelSummary[] }>(apiPaths.chat.channels, {
      method: 'GET',
      auth: true,
    });

    return response.channels;
  }

  async getMessages(channelId: string): Promise<ChatMessagesResponse['messages']> {
    const response = await apiRequest<ChatMessagesResponse>(apiPaths.chat.messages(channelId), {
      method: 'GET',
      auth: true,
    });

    return response.messages;
  }

  async getProjectMessages(roomId: string): Promise<ProjectChatMessage[]> {
    const response = await apiRequest<{ messages: ProjectChatMessage[] }>(
      apiPaths.chat.projectMessages(roomId),
      {
        method: 'GET',
        auth: true,
      }
    );

    return response.messages;
  }

  buildSocketUrl(): string | null {
    const token = tokenStorage.get();
    if (!token) return null;

    const wsBaseUrl = API_BASE_URL
      .replace(/^http/i, 'ws')
      .replace(/\/+$/, '');

    return `${wsBaseUrl}/ws/chat?token=${encodeURIComponent(token)}`;
  }

  createSocket(): WebSocket | null {
    const socketUrl = this.buildSocketUrl();
    if (!socketUrl) return null;
    return new WebSocket(socketUrl);
  }

  createProjectSocket(roomId: string): WebSocket | null {
    const token = tokenStorage.get();
    if (!token) return null;

    const wsBaseUrl = API_BASE_URL.replace(/^http/i, 'ws').replace(/\/+$/, '');
    return new WebSocket(`${wsBaseUrl}/ws/chat?token=${encodeURIComponent(token)}&room=${encodeURIComponent(roomId)}`);
  }

  getCurrentToken(): string | null {
    return tokenStorage.get();
  }
}

export const chatService = new ChatService();
