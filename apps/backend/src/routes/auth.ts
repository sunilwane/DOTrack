import { Router } from 'express';
import { signup, signin, signout, refresh } from '../controllers/authController';
import { me, googleAuth, googleCallback, githubAuth, githubCallback, getGithubRepos } from '../controllers/authController';
import { requireAuth } from '../middlewares/authMiddleware';

const router = Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signout', signout);
router.post('/refresh', refresh);
router.get('/me', requireAuth, me);
router.get('/google', googleAuth);
router.get('/google/callback', googleCallback);
router.get('/github', githubAuth);
router.get('/github/callback', githubCallback);
router.get('/github/repos', requireAuth, getGithubRepos);

export default router;
