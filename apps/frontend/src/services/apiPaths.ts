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
  chat: {
    me: '/api/chat/me',
    workspace: '/api/chat/workspace',
    channels: '/api/chat/channels',
    members: '/api/chat/members',
    messages: (channelId: string) => `/api/chat/channels/${encodeURIComponent(channelId)}/messages`,
    projectMessages: (roomId: string) => `/api/chat/rooms/${encodeURIComponent(roomId)}/messages`,
  },
} as const;
