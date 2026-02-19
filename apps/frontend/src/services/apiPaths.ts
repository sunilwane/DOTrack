export const apiPaths = {
  auth: {
    signup: '/api/auth/signup',
    signin: '/api/auth/signin',
    signout: '/api/auth/signout',
    refresh: '/api/auth/refresh',
    me: '/api/auth/me',
    google: '/api/auth/google',
    github: '/api/auth/github',
    githubRepos: '/api/auth/github/repos',
    githubCollaborators: (owner: string, repo: string) =>
      `/api/auth/github/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/collaborators`,
  },
} as const;
