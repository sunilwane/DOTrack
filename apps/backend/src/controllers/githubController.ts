import { Request, Response } from 'express';
import UserModel from '../models/user.model';
import { githubService } from '../services/githubService';
import { asyncHandler } from '../utils/asyncHandler';
import { ExternalApiError } from '../services/httpService';

async function resolveAccessToken(req: Request): Promise<string | undefined> {
  const payload = (req as any).user;
  if (payload?.sub) {
    const user = await UserModel.findById(payload.sub).lean();
    if (user && (user as any).githubAccessToken) return (user as any).githubAccessToken;
  }
  return process.env.GITHUB_APP_TOKEN;
}

export const getBranches = asyncHandler(async (req: Request, res: Response) => {
  const { owner, repo } = req.params;
  const ownerStr = Array.isArray(owner) ? owner[0] : owner;
  const repoStr = Array.isArray(repo) ? repo[0] : repo;

  const token = await resolveAccessToken(req);
  const branches = await githubService.getRepoBranches(token || '', ownerStr, repoStr);
  const result = branches.map((b) => ({ name: b.name, commit: b.commit?.sha }));
  res.json({ branches: result });
});

export const getTree = asyncHandler(async (req: Request, res: Response) => {
  const { owner, repo } = req.params;
  const ownerStr = Array.isArray(owner) ? owner[0] : owner;
  const repoStr = Array.isArray(repo) ? repo[0] : repo;

  const ref = typeof req.query.ref === 'string' ? req.query.ref.trim() : '';
  const path = (req.query.path as string) || '';

  const token = await resolveAccessToken(req);
  try {
    const result = await githubService.getRepoTree(token || '', ownerStr, repoStr, path, ref);

    if (Array.isArray(result)) {
      return res.json({ entries: result, branch: ref || undefined });
    }

    if (result && typeof result === 'object' && 'sha' in result) {
      return res.json({ entries: [], file: result });
    }

    res.json({ entries: [] });
  } catch (err: any) {
    if (err instanceof ExternalApiError && err.status === 404) {
      return res.status(404).json({ entries: [] });
    }
    throw err;
  }
});

export const getFile = asyncHandler(async (req: Request, res: Response) => {
  const { owner, repo } = req.params;
  const ownerStr = Array.isArray(owner) ? owner[0] : owner;
  const repoStr = Array.isArray(repo) ? repo[0] : repo;

  const ref = typeof req.query.ref === 'string' ? req.query.ref.trim() : '';
  const path = (req.query.path as string) || '';

  if (!path) return res.status(400).json({ error: 'Missing path' });

  const token = await resolveAccessToken(req);
  const result = await githubService.getRepoTree(token || '', ownerStr, repoStr, path, ref);

  if (!result || Array.isArray(result)) {
    return res.status(400).json({ error: 'Path is not a file' });
  }

  res.json({ file: result });
});

export default { getBranches, getTree, getFile };
