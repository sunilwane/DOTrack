import React, { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';

type TreeEntry = { name: string; path: string; type: string; size?: number; sha?: string };
type FileData = { name: string; path: string; content?: string; size?: number; encoding?: string };

type RepoStateType = {
  owner: string;
  repo: string;
  branch: string;
  path: string;
  treeCache: Map<string, TreeEntry[]>;
  fileCache: Map<string, FileData>;
};

type Action =
  | { type: 'setRepo'; owner: string; repo: string }
  | { type: 'setBranch'; branch: string }
  | { type: 'setPath'; path: string }
  | { type: 'cacheTree'; path: string; entries: TreeEntry[] }
  | { type: 'cacheFile'; path: string; file: FileData }
  | { type: 'clearCaches' };

const defaultState: RepoStateType = {
  owner: '',
  repo: '',
  branch: 'main',
  path: '',
  treeCache: new Map(),
  fileCache: new Map(),
};

function reducer(state: RepoStateType, action: Action): RepoStateType {
  switch (action.type) {
    case 'setRepo':
      return { ...state, owner: action.owner, repo: action.repo, path: '' };
    case 'setBranch':
      return { ...state, branch: action.branch };
    case 'setPath':
      return { ...state, path: action.path };
    case 'cacheTree': {
      const map = new Map(state.treeCache);
      map.set(action.path, action.entries);
      return { ...state, treeCache: map };
    }
    case 'cacheFile': {
      const map = new Map(state.fileCache);
      map.set(action.path, action.file);
      return { ...state, fileCache: map };
    }
    case 'clearCaches':
      return { ...state, treeCache: new Map(), fileCache: new Map() };
    default:
      return state;
  }
}

const RepoStateContext = createContext<{
  state: RepoStateType;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export const RepoStateProvider = ({ children, initial }: { children: ReactNode; initial?: Partial<RepoStateType> }) => {
  const init = { ...defaultState, ...(initial || {}) };
  const [state, dispatch] = useReducer(reducer, init);
  return <RepoStateContext.Provider value={{ state, dispatch }}>{children}</RepoStateContext.Provider>;
};

export const useRepoState = () => {
  const ctx = useContext(RepoStateContext);
  if (!ctx) throw new Error('useRepoState must be used within RepoStateProvider');
  return ctx;
};

export type { TreeEntry, FileData };
