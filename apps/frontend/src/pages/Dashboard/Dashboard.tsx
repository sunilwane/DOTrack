import { DashboardCard } from '../../Components/common/DashboardCard';
import { Skeleton } from '../../Components/Skeleton';
import {
  PipelineStages,
  RecentDeployments,
} from '../../mock/PagesMockData/DashboardData';
import { usePageLoading } from '../../hooks/usePageLoading';
import PipelineTracker from './PipelineTracker';
import RecentDeploymentsTable from './RecentDeploymentsTable';
import ApprovalCenterCard from './components/ApprovalCenterCard';
import HeroBanner from './components/HeroBanner';
import StatusFooter from './components/StatusFooter';

const Dashboard = () => {
  const { isLoading } = usePageLoading('dashboard');

  return (
    <div className="flex flex-col min-h-full p-4 space-y-0 max-w-7xl mx-auto w-full transition-all duration-500">
      <HeroBanner isLoading={isLoading} />

      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 mt-8">
        <DashboardCard
          className="lg:col-span-3 h-full"
          title={
            <Skeleton isLoaded={!isLoading} width="120px" height="16px">
              Pipeline Status
            </Skeleton>
          }
          icon={
            <Skeleton isLoaded={!isLoading} variant="circular" width="20px" height="20px" className="rounded-md">
              <span className="material-symbols-outlined text-primary text-xl">route</span>
            </Skeleton>
          }
          extra={
            <Skeleton isLoaded={!isLoading} width="80px" height="12px">
              Live Monitoring
            </Skeleton>
          }
          bodyClassName="p-6 min-h-[140px] flex items-center"
        >
          <Skeleton isLoaded={!isLoading} variant="text" rows={1} height="60px" width="100%">
            <PipelineTracker initialStages={PipelineStages} />
          </Skeleton>
        </DashboardCard>

        <ApprovalCenterCard isLoading={isLoading} />
      </div>

      <div className="mt-8">
        <DashboardCard
          title={
            <Skeleton isLoaded={!isLoading} width="160px" height="16px">
              Immutable History
            </Skeleton>
          }
          icon={
            <Skeleton isLoaded={!isLoading} variant="circular" width="20px" height="20px" className="rounded-md">
              <span className="material-symbols-outlined text-primary text-xl">history</span>
            </Skeleton>
          }
          bodyClassName="p-0"
        >
          <Skeleton isLoaded={!isLoading} variant="table" rows={6}>
            <RecentDeploymentsTable deployments={RecentDeployments} />
          </Skeleton>
        </DashboardCard>
      </div>

      <StatusFooter isLoading={isLoading} />
    </div>
  );
};

export default Dashboard;
