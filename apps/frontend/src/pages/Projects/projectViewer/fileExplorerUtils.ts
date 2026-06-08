export const normalizeFilterQuery = (value: string) => value.trim().toLowerCase();

export const addSetValue = (previous: Set<string>, value: string) => new Set(previous).add(value);

export const removeSetValue = (previous: Set<string>, value: string) => {
  const next = new Set(previous);
  next.delete(value);
  return next;
};

export const buildProjectFileRoute = (
  owner: string,
  repo: string,
  branch: string,
  path: string
) =>
  `/projects/${owner}/${repo}?ref=${encodeURIComponent(branch)}&path=${encodeURIComponent(path)}`;

export const getFailedDirectoryLoadMessage = (
  status: number,
  statusText: string,
  body: string
) => `Failed to load directory (${status}): ${body || statusText}`;

export const getNextScrollTop = (
  scrollHeight: number,
  clientHeight: number,
  currentTop: number,
  deltaY: number
) => {
  if (scrollHeight <= clientHeight) {
    return currentTop;
  }

  const maxTop = scrollHeight - clientHeight;
  return Math.max(0, Math.min(maxTop, currentTop + deltaY));
};
