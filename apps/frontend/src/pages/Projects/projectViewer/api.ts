import { authService } from '../../../services/authService';
import { buildApiUrl } from '../../../services/apiClient';

export const buildGithubRequestOptions = (): RequestInit => {
  const token = authService.getAccessToken();
  return {
    credentials: 'include',
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  };
};

export const buildGithubApiUrl = (
  owner: string,
  repo: string,
  suffix: string
): string =>
  buildApiUrl(
    `/api/github/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}${suffix}`
  );

export const buildGithubTreeUrl = (
  owner: string,
  repo: string,
  branch: string,
  path: string
): string =>
  buildGithubApiUrl(
    owner,
    repo,
    `/tree?ref=${encodeURIComponent(branch)}&path=${encodeURIComponent(path)}`
  );

export const buildGithubFileUrl = (
  owner: string,
  repo: string,
  branch: string,
  path: string
): string =>
  buildGithubApiUrl(
    owner,
    repo,
    `/file?ref=${encodeURIComponent(branch)}&path=${encodeURIComponent(path)}`
  );
