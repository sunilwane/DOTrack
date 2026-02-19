import { Router } from 'express';
import githubController from '../controllers/githubController';
import { requireAuth } from '../middlewares/authMiddleware';

const router = Router();

// Protected proxy endpoints for GitHub repository browsing
router.get('/:owner/:repo/branches', requireAuth, githubController.getBranches);
router.get('/:owner/:repo/tree', requireAuth, githubController.getTree);
router.get('/:owner/:repo/file', requireAuth, githubController.getFile);

export default router;
