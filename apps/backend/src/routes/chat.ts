import { Router } from 'express';
import { requireAuth } from '../middlewares/authMiddleware';
import {
  getChatChannels,
  getChatMembers,
  getChatMessages,
  getChatProfile,
  getChatWorkspace,
  getProjectChatMessages,
} from '../controllers/chatController';

const router = Router();

router.get('/me', requireAuth, getChatProfile);
router.get('/workspace', requireAuth, getChatWorkspace);
router.get('/channels', requireAuth, getChatChannels);
router.get('/members', requireAuth, getChatMembers);
router.get('/channels/:channelId/messages', requireAuth, getChatMessages);
router.get('/rooms/:roomId/messages', requireAuth, getProjectChatMessages);

export default router;
