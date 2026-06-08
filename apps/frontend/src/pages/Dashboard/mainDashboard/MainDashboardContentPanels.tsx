import { Activity, ChevronRight, Zap } from 'lucide-react';
import { Button } from '../../../Components/common/Button';
import { DashboardCard } from '../../../Components/common/DashboardCard';
import { ActivityFeedItem } from '../../../Components/common/MainDashboardComp/ActivityFeedItem';
import { HelpCenter } from '../../../Components/common/MainDashboardComp/HelpCenter';
import { NodeStats } from '../../../Components/common/MainDashboardComp/NodeStats';
import {
  MainDashboardActivities,
  MainDashboardNodeStats,
  MainDashboardQuickActions,
} from '../../../mock/PagesMockData/DashboardData';
import { quickActionIconByKey } from './quickActionIcons';

const MainDashboardContentPanels = () => (
  <>
    <DashboardCard
      className="lg:col-span-3 space-y-4"
      title="Recent Activity Feed"
      icon={<Activity className="text-blue-600" size={22} />}
      extra={
        <Button
          variant="outline"
          size="xs"
          className="h-7 text-[10px] uppercase border-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white"
        >
          Filter
        </Button>
      }
      bodyClassName="bg-transparent border-none shadow-none p-0 space-y-3"
    >
      {MainDashboardActivities.map((activity) => (
        <ActivityFeedItem key={activity.id} activity={activity} />
      ))}
    </DashboardCard>

    <DashboardCard
      className="space-y-6"
      title="Quick Actions"
      icon={<Zap className="text-blue-600" size={22} fill="currentColor" />}
      bodyClassName="space-y-5"
    >
      <div className="flex flex-col gap-3">
        {MainDashboardQuickActions.map((action) => (
          <Button
            key={action.id}
            variant={action.variant}
            className={`w-full h-auto p-4 rounded-xl group ${
              action.variant === 'primary'
                ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20'
                : 'bg-white dark:bg-[#161d2b] border-slate-200 dark:border-slate-800 hover:border-blue-600 text-slate-900 dark:text-white'
            }`}
            icon={quickActionIconByKey[action.icon]}
          >
            <span className="w-full flex items-center justify-between">
              <span className="text-sm font-bold">{action.label}</span>
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>
        ))}
      </div>

      <NodeStats stats={MainDashboardNodeStats} />
      <HelpCenter />
    </DashboardCard>
  </>
);

export default MainDashboardContentPanels;
