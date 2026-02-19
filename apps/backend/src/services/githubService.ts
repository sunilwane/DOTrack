import { requestJson, requestJsonOrNull } from './httpService';

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

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name?: string;
  email?: string;
}

export interface GitHubCollaborator {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}

type GitHubEmail = {
  email?: string;
  primary?: boolean;
};

export class GitHubService {
  private readonly baseUrl = 'https://api.github.com';

  private buildHeaders(accessToken: string): HeadersInit {
    return {
      Authorization: `token ${accessToken}`,
      Accept: 'application/vnd.github.v3+json',
    };
  }

  private mapUsersToCollaborators(users: GitHubUser[] = []): GitHubCollaborator[] {
    return users.map((user) => ({
      login: user.login,
      id: user.id,
      avatar_url: user.avatar_url,
      html_url: user.html_url,
    }));
  }

  async getUserRepos(accessToken: string): Promise<GitHubRepo[]> {
    return requestJson<GitHubRepo[]>(
      `${this.baseUrl}/user/repos?per_page=100`,
      {
        headers: this.buildHeaders(accessToken),
      },
      'Failed to fetch GitHub repositories'
    );
  }

  async getRepoCollaborators(
    accessToken: string,
    owner: string,
    repo: string
  ): Promise<GitHubCollaborator[]> {
    const users = await requestJsonOrNull<GitHubUser[]>(
      `${this.baseUrl}/repos/${owner}/${repo}/collaborators?per_page=20`,
      {
        headers: this.buildHeaders(accessToken),
      }
    );

    if (!Array.isArray(users)) return [];
    return this.mapUsersToCollaborators(users);
  }

  async getRepoContributors(
    accessToken: string,
    owner: string,
    repo: string
  ): Promise<GitHubCollaborator[]> {
    const users = await requestJsonOrNull<GitHubUser[]>(
      `${this.baseUrl}/repos/${owner}/${repo}/contributors?per_page=20`,
      {
        headers: this.buildHeaders(accessToken),
      }
    );

    if (!Array.isArray(users)) return [];
    return this.mapUsersToCollaborators(users);
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

    return this.getRepoContributors(accessToken, owner, repo);
  }

  async getUserInfo(accessToken: string): Promise<GitHubUser> {
    return requestJson<GitHubUser>(
      `${this.baseUrl}/user`,
      {
        headers: this.buildHeaders(accessToken),
      },
      'Failed to fetch GitHub user info'
    );
  }

  async getUserPrimaryEmail(accessToken: string): Promise<string | undefined> {
    const emails = await requestJsonOrNull<GitHubEmail[]>(
      `${this.baseUrl}/user/emails`,
      {
        headers: this.buildHeaders(accessToken),
      }
    );

    if (!Array.isArray(emails) || emails.length === 0) return undefined;

    const primary = emails.find((entry) => entry.primary) || emails[0];
    return primary?.email;
  }
}

export const githubService = new GitHubService();
