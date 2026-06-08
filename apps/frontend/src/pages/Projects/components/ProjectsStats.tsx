import * as React from 'react';
import { Skeleton } from '../../../Components/Skeleton';

interface ProjectsStatsProps {
  showSkeletons: boolean;
}

const stats = [
  {
    label: 'Global Deployments',
    value: '1,284',
    icon: 'rocket_launch',
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    label: 'Success Rate',
    value: '99.2%',
    icon: 'cloud_done',
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
  },
  {
    label: 'Storage Used',
    value: '42.5 GB',
    icon: 'database',
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
  },
];

const ProjectsStats = ({ showSkeletons }: ProjectsStatsProps) => (
  <div className="mt-12 flex flex-wrap items-center gap-8 px-6 py-4 bg-white dark:bg-[#161616] border border-slate-200 dark:border-slate-800 rounded-2xl">
    {stats.map((stat, index) => (
      <React.Fragment key={stat.label}>
        <div className="flex items-center gap-3">
          <Skeleton
            isLoaded={!showSkeletons}
            variant="circular"
            width="40px"
            height="40px"
            className="rounded-lg"
          >
            <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
              <span className="material-symbols-outlined text-xl">{stat.icon}</span>
            </div>
          </Skeleton>
          <div>
            <Skeleton isLoaded={!showSkeletons} width="100px" height="10px" className="mb-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {stat.label}
              </p>
            </Skeleton>
            <Skeleton isLoaded={!showSkeletons} width="80px" height="20px">
              <p className="text-lg font-bold dark:text-white">{stat.value}</p>
            </Skeleton>
          </div>
        </div>
        {index < stats.length - 1 && (
          <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 hidden md:block" />
        )}
      </React.Fragment>
    ))}
  </div>
);

export default ProjectsStats;
