import { Button } from '../../../Components/common/Button';
import { DashboardCard } from '../../../Components/common/DashboardCard';
import { Skeleton } from '../../../Components/Skeleton';
import { DashboardStats } from '../../../mock/PagesMockData/DashboardData';

interface ApprovalCenterCardProps {
  isLoading: boolean;
}

const ApprovalCenterCard = ({ isLoading }: ApprovalCenterCardProps) => (
  <DashboardCard
    className="lg:col-span-3 h-full"
    title={
      <Skeleton isLoaded={!isLoading} width="130px" height="16px">
        Approval Center
      </Skeleton>
    }
    icon={
      <Skeleton isLoaded={!isLoading} variant="circular" width="20px" height="20px" className="rounded-md">
        <span className="material-symbols-outlined text-primary text-xl">gavel</span>
      </Skeleton>
    }
    bodyClassName="bg-primary/5 border-primary/20 p-3"
  >
    <div className="flex flex-col gap-2">
      <div className="flex items-start gap-2">
        <Skeleton isLoaded={!isLoading} variant="circular" width="30px" height="30px" className="rounded-lg">
          <div className="p-1.5 rounded-lg bg-primary/20 text-primary">
            <span className="material-symbols-outlined text-[18px]">signature</span>
          </div>
        </Skeleton>
        <div className="flex-1">
          <Skeleton isLoaded={!isLoading} width="140px" height="12px" className="mb-1">
            <h4 className="text-slate-900 dark:text-white font-bold text-[11px] uppercase tracking-widest">
              Signature Required
            </h4>
          </Skeleton>
          <Skeleton isLoaded={!isLoading} variant="text" rows={2} height="10px">
            <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal mt-0.5">
              Pipeline #882 requires your signature to proceed with deployment to Mainnet.
            </p>
          </Skeleton>
        </div>
      </div>
      <div className="space-y-1 border-y border-primary/10 py-1.5">
        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
          <Skeleton isLoaded={!isLoading} width="70px" height="10px">
            <span className="text-slate-500">Gas Estimate</span>
          </Skeleton>
          <Skeleton isLoaded={!isLoading} width="60px" height="10px">
            <span className="text-slate-900 dark:text-slate-200">{DashboardStats.gasEstimate}</span>
          </Skeleton>
        </div>
        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
          <Skeleton isLoaded={!isLoading} width="60px" height="10px">
            <span className="text-slate-500">Priority</span>
          </Skeleton>
          <Skeleton isLoaded={!isLoading} width="50px" height="10px">
            <span className="text-accent-emerald">{DashboardStats.priority}</span>
          </Skeleton>
        </div>
      </div>
      <Skeleton isLoaded={!isLoading} variant="button" width="100%">
        <Button
          className="w-full text-xs h-7"
          icon={<span className="material-symbols-outlined text-[16px] size-6.5">draw</span>}
        >
          <span className="text-sm">Sign & Approve</span>
        </Button>
      </Skeleton>
    </div>
  </DashboardCard>
);

export default ApprovalCenterCard;
