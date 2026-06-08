import { Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { AuthRequest } from '../middlewares/authMiddleware';
import {
  getChatWorkspace as fetchChatWorkspace,
  getChatProfileByUserId,
  getChatChannelMessages,
  listChatChannels,
  listWorkspaceMembers,
} from '../services/chat.service';
import { getProjectRoomMessages } from '../services/projectChat.service';

export const getChatProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
  const profile = await getChatProfileByUserId(req.user.sub);
  if (!profile) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json({ user: profile });
});

export const getChatChannels = asyncHandler(async (_req: AuthRequest, res: Response) => {
  const channels = await listChatChannels();
  res.json({ channels });
});

export const getChatWorkspace = asyncHandler(async (req: AuthRequest, res: Response) => {
  const workspace = await fetchChatWorkspace(req.user.sub);
  res.json(workspace);
});

export const getChatMembers = asyncHandler(async (_req: AuthRequest, res: Response) => {
  const members = await listWorkspaceMembers();
  res.json({ members });
});

export const getChatMessages = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { channelId } = req.params;
  const limitParam = Number(req.query.limit || 50);
  const channelKey = Array.isArray(channelId) ? channelId[0] : channelId;
  const messages = await getChatChannelMessages(channelKey, Number.isFinite(limitParam) ? limitParam : 50);
  res.json({ messages });
});

export const getProjectChatMessages = asyncHandler(async (req: AuthRequest, res: Response) => {
  const roomId = typeof req.params.roomId === 'string' ? req.params.roomId : '';
  const messages = getProjectRoomMessages(roomId);
  res.json({ messages });
});
