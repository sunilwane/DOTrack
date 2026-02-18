import { createGitHubClient } from '../utils/http.util';

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  description: string;
  html_url: string;
  updated_at: string;
  open_issues_count: number;
}

export interface GitHubCollaborator {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}

export interface GitHubUser {
  id: number;
  login: string;
  name?: string;
  email?: string;
  avatar_url: string;
  html_url: string;
}

export interface GitHubEmail {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: string | null;
}

export class GitHubService {

  async getUserRepos(accessToken: string): Promise<GitHubRepo[]> {
    const client = createGitHubClient(accessToken);
    return await client.get<GitHubRepo[]>('/user/repos', { params: { per_page: 100 } });
  }

  async getRepoCollaborators(
    accessToken: string,
    owner: string,
    repo: string
  ): Promise<GitHubCollaborator[]> {
    const client = createGitHubClient(accessToken);
    try {
      const data = await client.get<any[]>(`/repos/${owner}/${repo}/collaborators`, { params: { per_page: 20 } });
      if (Array.isArray(data)) {
        return this.mapToCollaborator(data);
      }
      return [];
    } catch (error) {
      console.error('Error fetching collaborators:', error);
      return [];
    }
  }

  async getRepoContributors(
    accessToken: string,
    owner: string,
    repo: string
  ): Promise<GitHubCollaborator[]> {
    const client = createGitHubClient(accessToken);
    try {
      const data = await client.get<any[]>(`/repos/${owner}/${repo}/contributors`, { params: { per_page: 20 } });
      return this.mapToCollaborator(data);
    } catch (error) {
      console.error('Error fetching contributors:', error);
      return [];
    }
  }

  async getRepoCollaboratorsOrContributors(
    accessToken: string,
    owner: string,
    repo: string
  ): Promise<GitHubCollaborator[]> {
    const collaborators = await this.getRepoCollaborators(accessToken, owner, repo);
    if (collaborators.length > 0) {
      return collaborators;
    }
    return await this.getRepoContributors(accessToken, owner, repo);
  }

  async getUserInfo(accessToken: string): Promise<GitHubUser> {
    const client = createGitHubClient(accessToken);
    return await client.get<GitHubUser>('/user');
  }

  async getUserPrimaryEmail(accessToken: string): Promise<string | undefined> {
    const client = createGitHubClient(accessToken);
    try {
      const emails = await client.get<GitHubEmail[]>('/user/emails');
      if (Array.isArray(emails)) {
        const primary = emails.find((e) => e.primary) || emails[0];
        return primary?.email;
      }
    } catch (error) {
      console.error('Error fetching user emails:', error);
    }
    return undefined;
  }

  private mapToCollaborator(data: any[]): GitHubCollaborator[] {
    return data.map((c) => ({
      login: c.login,
      id: c.id,
      avatar_url: c.avatar_url,
      html_url: c.html_url,
    }));
  }
}

export const githubService = new GitHubService();
