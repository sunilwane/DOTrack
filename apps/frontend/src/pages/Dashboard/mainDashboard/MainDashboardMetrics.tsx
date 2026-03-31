import { MetricCard } from '../../../Components/common/MainDashboardComp/MetricCard';
import { Skeleton } from '../../../Components/Skeleton';
import { MainDashboardMetrics as metrics } from '../../../mock/PagesMockData/DashboardData';

interface MainDashboardMetricsProps {
  showSkeletons: boolean;
}

const MainDashboardMetrics = ({ showSkeletons }: MainDashboardMetricsProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {showSkeletons
      ? Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} variant="rectangular" height="140px" className="rounded-xl" />
        ))
      : metrics.map((metric) => <MetricCard key={metric.title} metric={metric} />)}
  </div>
);

export default MainDashboardMetrics;
