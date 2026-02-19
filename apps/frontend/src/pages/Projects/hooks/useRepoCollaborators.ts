import { useEffect, useState } from 'react';
import { authService } from '../../../services/authService';
import { githubService, type GithubCollaborator } from '../../../services/githubService';
import { parseRepoPath } from '../projectCardUtils';

interface UseRepoCollaboratorsParams {
  repo?: string;
  repoId?: number | string;
}

export const useRepoCollaborators = ({ repo, repoId }: UseRepoCollaboratorsParams) => {
  const [collaborators, setCollaborators] = useState<GithubCollaborator[]>([]);

  useEffect(() => {
    const fetchCollaborators = async () => {
      if (!repo || !repoId) return;

      const parsedRepo = parseRepoPath(repo);
      if (!parsedRepo) return;

      const token = authService.getAccessToken();
      if (!token) return;

      try {
        const data = await githubService.getRepoCollaborators(
          parsedRepo.owner,
          parsedRepo.repoName
        );
        setCollaborators(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching collaborators:', error);
      }
    };

    void fetchCollaborators();
  }, [repo, repoId]);

  return collaborators;
};
