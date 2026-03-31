import React from 'react';
import { Skeleton } from '../../../Components/Skeleton';
import { MainDashboardFooterStats } from '../../../mock/PagesMockData/DashboardData';

interface MainDashboardFooterProps {
  showSkeletons: boolean;
}

const MainDashboardFooter = ({ showSkeletons }: MainDashboardFooterProps) => (
  <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 px-8 py-3 bg-white dark:bg-[#0f151f] flex justify-between items-center text-[10px] font-bold tracking-widest text-slate-500 uppercase">
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-1.5">
        <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
        IPFS NODE: ONLINE
      </div>
      <div className="flex items-center gap-1.5">
        <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
        ETHEREUM RPC: CONNECTED
      </div>
    </div>
    <div className="flex gap-4">
      {showSkeletons ? (
        <>
          <Skeleton width="120px" height="10px" />
          <span className="text-slate-700">|</span>
          <Skeleton width="60px" height="10px" />
        </>
      ) : (
        MainDashboardFooterStats.map((item, index) => (
          <React.Fragment key={item.label}>
            <span>
              {item.label}: {item.value}
            </span>
            {index < MainDashboardFooterStats.length - 1 && <span className="text-slate-700">|</span>}
          </React.Fragment>
        ))
      )}
    </div>
  </footer>
);

export default MainDashboardFooter;
