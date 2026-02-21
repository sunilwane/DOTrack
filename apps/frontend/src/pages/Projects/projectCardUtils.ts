export interface RepoPathParts {
  owner: string;
  repoName: string;
}

export const parseRepoPath = (repo: string | undefined): RepoPathParts | null => {
  if (!repo) return null;

  const parts = repo.split('/');
  if (parts.length < 2) return null;

  const owner = parts[0];
  const repoName = parts.slice(1).join('/');
  return owner && repoName ? { owner, repoName } : null;
};

export const getProjectRoute = (repo: string | undefined): string | null => {
  const parsedRepo = parseRepoPath(repo);
  if (!parsedRepo) {
    return null;
  }

  const { owner, repoName } = parsedRepo;
  return `/projects/${owner}/${repoName}`;
};
