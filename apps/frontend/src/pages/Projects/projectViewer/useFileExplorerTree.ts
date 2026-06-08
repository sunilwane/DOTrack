import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useRepoState } from '../../../contexts/useRepoState';
import { buildGithubRequestOptions, buildGithubTreeUrl } from './api';
import {
  addSetValue,
  buildProjectFileRoute,
  getFailedDirectoryLoadMessage,
  getNextScrollTop,
  normalizeFilterQuery,
  removeSetValue,
} from './fileExplorerUtils';
import type { TreeEntry } from './types';

interface UseFileExplorerTreeParams {
  owner: string;
  repo: string;
  branch: string;
}

export const useFileExplorerTree = ({ owner, repo, branch }: UseFileExplorerTreeParams) => {
  const { state, dispatch } = useRepoState();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [expandedDirs, setExpandedDirs] = useState<Set<string>>(new Set(['']));
  const [loadingDirs, setLoadingDirs] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);
  const [filterQuery, setFilterQuery] = useState('');
  const treeScrollRef = useRef<HTMLDivElement | null>(null);

  const currentPath = searchParams.get('path') || '';
  const normalizedFilter = normalizeFilterQuery(filterQuery);

  const loadDirectory = useCallback(
    async (dirPath: string): Promise<void> => {
      if (state.treeCache.has(dirPath)) return;

      setLoadingDirs((previous) => addSetValue(previous, dirPath));
      setError(null);

      try {
        const response = await fetch(
          buildGithubTreeUrl(owner, repo, branch, dirPath),
          buildGithubRequestOptions()
        );

        if (response.status === 403) {
          setError('Insufficient access - please connect GitHub');
          return;
        }

        if (response.status === 404) {
          dispatch({ type: 'cacheTree', path: dirPath, entries: [] });
          return;
        }

        if (!response.ok) {
          const text = await response.text().catch(() => '');
          console.error('Failed loading tree', {
            status: response.status,
            statusText: response.statusText,
            body: text,
          });
          setError(
            getFailedDirectoryLoadMessage(response.status, response.statusText, text)
          );
          return;
        }

        const json = (await response.json()) as { entries?: TreeEntry[] };
        dispatch({ type: 'cacheTree', path: dirPath, entries: json.entries || [] });
      } catch (error) {
        console.error('Error loading directory', error);
        setError('Failed to load directory');
      } finally {
        setLoadingDirs((previous) => removeSetValue(previous, dirPath));
      }
    },
    [owner, repo, branch, state.treeCache, dispatch]
  );

  useEffect(() => {
    if (owner && repo) {
      void loadDirectory('');
    }
  }, [owner, repo, branch, loadDirectory]);

  const toggleDirectory = (path: string) => {
    if (expandedDirs.has(path)) {
      setExpandedDirs((previous) => removeSetValue(previous, path));
      return;
    }

    setExpandedDirs((previous) => addSetValue(previous, path));
    void loadDirectory(path);
  };

  const handleFileClick = (path: string) => {
    navigate(buildProjectFileRoute(owner, repo, branch, path));
  };

  const handleTreeWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const element = treeScrollRef.current;
    if (!element) return;

    event.preventDefault();
    event.stopPropagation();

    element.scrollTop = getNextScrollTop(
      element.scrollHeight,
      element.clientHeight,
      element.scrollTop,
      event.deltaY
    );
  };

  return {
    state,
    treeScrollRef,
    currentPath,
    normalizedFilter,
    expandedDirs,
    loadingDirs,
    error,
    filterQuery,
    setFilterQuery,
    toggleDirectory,
    handleFileClick,
    handleTreeWheel,
  };
};
