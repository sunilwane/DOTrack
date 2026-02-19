import { Skeleton } from '../../../Components/Skeleton';

interface MainDashboardHeaderProps {
  showSkeletons: boolean;
}

const MainDashboardHeader = ({ showSkeletons }: MainDashboardHeaderProps) => (
  <div className="flex justify-between items-center mb-6">
    <div>
      <Skeleton isLoaded={!showSkeletons} width="200px" height="32px" className="mb-2">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
      </Skeleton>
      <Skeleton isLoaded={!showSkeletons} width="300px" height="16px">
        <p className="text-slate-500 dark:text-slate-400">
          Monitor your decentralized infrastructure
        </p>
      </Skeleton>
    </div>
  </div>
);

export default MainDashboardHeader;
