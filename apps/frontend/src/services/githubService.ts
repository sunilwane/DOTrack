import { apiRequest } from './apiClient';
import { apiPaths } from './apiPaths';

export interface GithubRepo {
  id: number | string;
  name: string;
  full_name: string;
  owner?: { avatar_url: string };
  updated_at: string;
  open_issues_count?: number;
}

export interface GithubCollaborator {
  id: number | string;
  login: string;
  avatar_url: string;
  html_url: string;
}

class GithubService {
  async getRepos(): Promise<GithubRepo[]> {
    return apiRequest<GithubRepo[]>(apiPaths.auth.githubRepos, {
      auth: true,
    });
  }

  async getRepoCollaborators(owner: string, repo: string): Promise<GithubCollaborator[]> {
    return apiRequest<GithubCollaborator[]>(
      apiPaths.auth.githubCollaborators(owner, repo),
      {
        auth: true,
      }
    );
  }
}

export const githubService = new GithubService();
