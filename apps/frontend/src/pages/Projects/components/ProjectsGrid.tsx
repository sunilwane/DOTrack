import { EmptyState } from '../../../Components/common';
import { Skeleton } from '../../../Components/Skeleton';
import type { GithubRepo } from '../../../services/githubService';
import ProjectCard from '../ProjectCard';

interface ProjectsGridProps {
  showSkeletons: boolean;
  repos: GithubRepo[];
}

const getRepoStatus = (openIssuesCount?: number): 'healthy' | 'failing' | 'pending' => {
  if (openIssuesCount === 0) return 'healthy';
  if (openIssuesCount && openIssuesCount > 5) return 'failing';
  return 'pending';
};

const ProjectsGrid = ({ showSkeletons, repos }: ProjectsGridProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {showSkeletons ? (
      Array.from({ length: 8 }).map((_, index) => (
        <Skeleton key={index} variant="project" height="280px" />
      ))
    ) : repos.length === 0 ? (
      <div className="col-span-full">
        <EmptyState
          icon={<span className="material-symbols-outlined text-6xl">folder_off</span>}
          title="No repositories found"
          description="Connect your GitHub account to see your repositories here."
        />
      </div>
    ) : (
      repos.map((repo) => (
        <ProjectCard
          key={repo.id}
          name={repo.name}
          repo={repo.full_name}
          ownerAvatarUrl={repo.owner?.avatar_url}
          repoId={repo.id}
          status={getRepoStatus(repo.open_issues_count)}
          pipelines={0}
          lastSync={new Date(repo.updated_at).toLocaleDateString()}
          icon="folder"
        />
      ))
    )}
  </div>
);

export default ProjectsGrid;
