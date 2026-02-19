import { useContext } from 'react';
import { RepoStateContext } from './RepoState';

export const useRepoState = () => {
  const context = useContext(RepoStateContext);
  if (!context) {
    throw new Error('useRepoState must be used within RepoStateProvider');
  }
  return context;
};
