import { IUser } from '../models/user.model';


interface GitHubRepo {
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

interface GitHubCollaborator {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}

export class GitHubService {
  private readonly baseUrl = 'https://api.github.com';

  
  async getUserRepos(accessToken: string): Promise<GitHubRepo[]> {
    const response = await fetch(`${this.baseUrl}/user/repos?per_page=100`, {
      headers: {
        Authorization: `token ${accessToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch repos: ${response.statusText}`);
    }

    return await response.json();
  }

  
  async getRepoCollaborators(
    accessToken: string,
    owner: string,
    repo: string
  ): Promise<GitHubCollaborator[]> {
    const response = await fetch(
      `${this.baseUrl}/repos/${owner}/${repo}/collaborators?per_page=20`,
      {
        headers: {
          Authorization: `token ${accessToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        return data.map((c: any) => ({
          login: c.login,
          id: c.id,
          avatar_url: c.avatar_url,
          html_url: c.html_url,
        }));
      }
    }

    return [];
  }

  
  async getRepoContributors(
    accessToken: string,
    owner: string,
    repo: string
  ): Promise<GitHubCollaborator[]> {
    const response = await fetch(
      `${this.baseUrl}/repos/${owner}/${repo}/contributors?per_page=20`,
      {
        headers: {
          Authorization: `token ${accessToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data.map((c: any) => ({
      login: c.login,
      id: c.id,
      avatar_url: c.avatar_url,
      html_url: c.html_url,
    }));
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

  
  async getUserInfo(accessToken: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}/user`, {
      headers: {
        Authorization: `token ${accessToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch GitHub user info');
    }

    return await response.json();
  }

  
  async getUserPrimaryEmail(accessToken: string): Promise<string | undefined> {
    const response = await fetch(`${this.baseUrl}/user/emails`, {
      headers: {
        Authorization: `token ${accessToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      return undefined;
    }

    const emails = await response.json();
    if (Array.isArray(emails)) {
      const primary = emails.find((e: any) => e.primary) || emails[0];
      return primary?.email;
    }

    return undefined;
  }
}

export const githubService = new GitHubService();
