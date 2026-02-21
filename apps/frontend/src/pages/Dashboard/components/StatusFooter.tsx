import { Skeleton } from '../../../Components/Skeleton';
import { DashboardStats } from '../../../mock/PagesMockData/DashboardData';

interface StatusFooterProps {
  isLoading: boolean;
}

const StatusFooter = ({ isLoading }: StatusFooterProps) => (
  <footer className="mt-4 border-t border-slate-200 dark:border-slate-800 pt-3 flex flex-wrap justify-between items-center gap-4 text-[9px] font-black tracking-widest text-slate-500 uppercase">
    <div className="flex items-center gap-4">
      <Skeleton isLoaded={!isLoading} width="100px" height="24px">
        <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-500/5 rounded border border-emerald-500/10">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          IPFS: ONLINE
        </div>
      </Skeleton>
      <Skeleton isLoaded={!isLoading} width="110px" height="24px">
        <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-500/5 rounded border border-emerald-500/10">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          RPC: CONNECTED
        </div>
      </Skeleton>
    </div>
    <Skeleton isLoaded={!isLoading} width="120px" height="14px">
      <div className="text-[10px]">BLOCK: {DashboardStats.blockNumber}</div>
    </Skeleton>
  </footer>
);

export default StatusFooter;
