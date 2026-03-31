import { useNavigate } from 'react-router-dom';
import { Button } from '../../../Components/common/Button';
import { Skeleton } from '../../../Components/Skeleton';

interface ProjectsHeaderProps {
  showSkeletons: boolean;
}

const ProjectsHeader = ({ showSkeletons }: ProjectsHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <Skeleton isLoaded={!showSkeletons} width="180px" height="24px" className="mb-2">
          <h2 className="text-lg font-bold dark:text-white tracking-tight">Active Projects</h2>
        </Skeleton>
        <Skeleton isLoaded={!showSkeletons} width="320px" height="16px">
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage and monitor your decentralized repository pipelines.
          </p>
        </Skeleton>
      </div>
      <div className="flex items-center gap-4">
        <Skeleton isLoaded={!showSkeletons} variant="button" width="80px" height="32px">
          <Button size="sm" variant="secondary" onClick={() => navigate('/projects/deploy-request')}>
            <span className="text-sm">Deploy</span>
          </Button>
        </Skeleton>
        <Skeleton isLoaded={!showSkeletons} variant="button" width="160px" height="32px">
          <Button
            size="sm"
            variant="primary"
            icon={<span className="material-symbols-outlined text-lg">add</span>}
          >
            <span className="text-sm">Create New Project</span>
          </Button>
        </Skeleton>
      </div>
    </div>
  );
};

export default ProjectsHeader;
