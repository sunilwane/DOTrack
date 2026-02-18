import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/user.model';
import { requestJson, ExternalApiError } from '../services/httpService';

const GITHUB_API = 'https://api.github.com';

async function resolveAccessToken(req: Request): Promise<string | undefined> {
  try {
    const payload = (req as any).user as any;
    if (payload?.sub) {
      const user = await UserModel.findById(payload.sub).lean();
      if (user && (user as any).githubAccessToken) return (user as any).githubAccessToken;
    }
  } catch (err) {
    // ignore and fallback to app token
  }

  return process.env.GITHUB_APP_TOKEN || undefined;
}

function buildHeaders(token?: string) {
  const h: any = { Accept: 'application/vnd.github.v3+json' };
  if (token) h.Authorization = `token ${token}`;
  return h;
}

export const getBranches = async (req: Request, res: Response, next: NextFunction) => {
  const { owner, repo } = req.params;
  try {
    const token = await resolveAccessToken(req);
    const url = `${GITHUB_API}/repos/${owner}/${repo}/branches`;
    const branches = await requestJson<any[]>(url, { headers: buildHeaders(token) }, 'Failed to fetch branches');
    const result = branches.map((b) => ({ name: b.name, commit: b.commit?.sha }));
    res.json({ branches: result });
  } catch (err: any) {
    if (err instanceof ExternalApiError) return res.status(err.status).json({ error: err.message });
    next(err);
  }
};

export const getTree = async (req: Request, res: Response, next: NextFunction) => {
  const { owner, repo } = req.params;
  const ref = (req.query.ref as string) || 'main';
  const path = (req.query.path as string) || '';
  try {
    const token = await resolveAccessToken(req);
    const encodedPath = path ? `/${encodeURIComponent(path)}` : '';
    const url = `${GITHUB_API}/repos/${owner}/${repo}/contents${encodedPath}?ref=${encodeURIComponent(ref)}`;
    const result = await requestJson<any>(url, { headers: buildHeaders(token) }, 'Failed to fetch tree');

    // If folder, GitHub returns array
    if (Array.isArray(result)) {
      const entries = result.map((e) => ({
        name: e.name,
        path: e.path,
        type: e.type, // 'file' | 'dir'
        size: e.size,
        sha: e.sha,
      }));
      return res.json({ entries, branch: ref });
    }

    // If file was requested
    if (result.type === 'file') {
      return res.json({ entries: [], file: { name: result.name, path: result.path, type: 'file', size: result.size, sha: result.sha } });
    }

    return res.json({ entries: [] });
  } catch (err: any) {
    if (err instanceof ExternalApiError) {
      if (err.status === 404) return res.status(404).json({ entries: [] });
      return res.status(err.status).json({ error: err.message });
    }
    next(err);
  }
};

export const getFile = async (req: Request, res: Response, next: NextFunction) => {
  const { owner, repo } = req.params;
  const ref = (req.query.ref as string) || 'main';
  const path = (req.query.path as string) || '';
  if (!path) return res.status(400).json({ error: 'Missing path' });

  try {
    const token = await resolveAccessToken(req);
    const encodedPath = `/${encodeURIComponent(path)}`;
    const url = `${GITHUB_API}/repos/${owner}/${repo}/contents${encodedPath}?ref=${encodeURIComponent(ref)}`;
    const result = await requestJson<any>(url, { headers: buildHeaders(token) }, 'Failed to fetch file');

    if (result.type !== 'file') return res.status(400).json({ error: 'Path is not a file' });

    const content = result.content ? Buffer.from(result.content, result.encoding || 'base64').toString('utf8') : null;
    res.json({ file: { name: result.name, path: result.path, sha: result.sha, size: result.size, content, encoding: result.encoding } });
  } catch (err: any) {
    if (err instanceof ExternalApiError) return res.status(err.status).json({ error: err.message });
    next(err);
  }
};

export default { getBranches, getTree, getFile };
