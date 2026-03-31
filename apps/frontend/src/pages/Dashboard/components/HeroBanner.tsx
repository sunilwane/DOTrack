import { useNavigate } from 'react-router-dom';
import { Button } from '../../../Components/common/Button';
import { StatusBadge } from '../../../Components/common/StatusBadge';
import { Skeleton } from '../../../Components/Skeleton';
import { DashboardStats } from '../../../mock/PagesMockData/DashboardData';

interface HeroBannerProps {
  isLoading: boolean;
}

const HeroBanner = ({ isLoading }: HeroBannerProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap items-center gap-6 bg-primary/5 p-6 rounded-xl border border-primary/10 transition-all">
      <div className="flex flex-col gap-1.5 flex-1">
        <div className="flex items-center gap-3">
          <Skeleton isLoaded={!isLoading} width="40px" height="18px" className="rounded-full">
            <StatusBadge status="success" className="px-1.5 py-0.5 text-[9px]">
              Active
            </StatusBadge>
          </Skeleton>
          <Skeleton isLoaded={!isLoading} width="120px" height="18px">
            <h1 className="text-slate-900 dark:text-white text-sm font-bold uppercase tracking-wider">
              {DashboardStats.projectName}
            </h1>
          </Skeleton>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-slate-500 dark:text-slate-400 text-[11px] font-medium">
          <Skeleton isLoaded={!isLoading} width="180px" height="14px">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[14px]">code</span>
              <span>{DashboardStats.githubRepo}</span>
            </div>
          </Skeleton>
          <Skeleton isLoaded={!isLoading} width="160px" height="14px">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[14px]">terminal</span>
              <span className="font-mono text-[10px]">{DashboardStats.walletAddress}</span>
            </div>
          </Skeleton>
        </div>
      </div>
      <div className="ml-auto flex items-center gap-5">
        <Skeleton isLoaded={!isLoading} variant="button" width="80px" height="32px">
          <Button
            variant="outline"
            size="sm"
            className="text-[9px] font-black uppercase tracking-wider h-8"
          >
            Export CSV
          </Button>
        </Skeleton>

        <Skeleton isLoaded={!isLoading} variant="button" width="100px" height="32px">
          <Button
            variant="secondary"
            size="sm"
            className="h-8 text-[11px]"
            icon={<span className="material-symbols-outlined text-[16px]">open_in_new</span>}
          >
            <span className="text-sm">Etherscan</span>
          </Button>
        </Skeleton>

        <Skeleton isLoaded={!isLoading} variant="button" width="100px" height="32px">
          <Button
            variant="secondary"
            size="sm"
            className="h-8 text-[11px]"
            icon={<span className="material-symbols-outlined text-[16px]">dashboard</span>}
            onClick={() => navigate('/main-dashboard')}
          >
            <span className="text-sm">Main</span>
          </Button>
        </Skeleton>
      </div>
    </div>
  );
};

export default HeroBanner;
