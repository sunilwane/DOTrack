import React from 'react';
import { usePageLoading } from '../../hooks/usePageLoading';
import MainDashboardContentPanels from './mainDashboard/MainDashboardContentPanels';
import MainDashboardFooter from './mainDashboard/MainDashboardFooter';
import MainDashboardHeader from './mainDashboard/MainDashboardHeader';
import MainDashboardMetrics from './mainDashboard/MainDashboardMetrics';
import MainDashboardSkeletonPanels from './mainDashboard/MainDashboardSkeletonPanels';

const MainDashboard: React.FC = () => {
  const { isLoading: isSimulatingLoad } = usePageLoading('main-dashboard');
  const showSkeletons = isSimulatingLoad;

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f6f8] dark:bg-[#101622] text-slate-900 dark:text-slate-100 font-sans">
      <main className="flex-1 overflow-y-auto p-5 max-w-7xl mx-auto space-y-8 w-full">
        <MainDashboardHeader showSkeletons={showSkeletons} />
        <MainDashboardMetrics showSkeletons={showSkeletons} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {showSkeletons ? <MainDashboardSkeletonPanels /> : <MainDashboardContentPanels />}
        </div>
      </main>

      <MainDashboardFooter showSkeletons={showSkeletons} />
    </div>
  );
};

export default MainDashboard;
