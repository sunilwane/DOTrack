import { Button } from '../../../Components/common/Button';
import { Skeleton } from '../../../Components/Skeleton';

interface RegisterProjectActionsProps {
  isLoading: boolean;
}

export const RegisterProjectActions = ({ isLoading }: RegisterProjectActionsProps) => (
  <div className="mt-4 flex items-center gap-4">
    <Skeleton
      isLoaded={!isLoading}
      variant="button"
      width="100%"
      height="40px"
      className="flex-1"
    >
      <Button variant="outline" className="w-full">
        Back
      </Button>
    </Skeleton>
    <Skeleton
      isLoaded={!isLoading}
      variant="button"
      width="100%"
      height="40px"
      className="flex-1"
    >
      <Button
        variant="primary"
        className="w-full"
        icon={<span className="material-symbols-outlined size-6.5">rocket_launch</span>}
      >
        <span className="text-sm">Deploy to Blockchain</span>
      </Button>
    </Skeleton>
  </div>
);
