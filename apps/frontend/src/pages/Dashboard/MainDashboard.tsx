import React, { useState } from "react";
import {
    Activity,
    ChevronRight,
    PlusSquare,
    Upload,
    Zap
} from "lucide-react";
import type { MainDashboardQuickAction } from "types";
import { Button } from "../../Components/common/Button";
import { DashboardCard } from "../../Components/common/DashboardCard";
import { MetricCard } from "../../Components/common/MainDashboardComp/MetricCard";
import { ActivityFeedItem } from "../../Components/common/MainDashboardComp/ActivityFeedItem";
import { NodeStats } from "../../Components/common/MainDashboardComp/NodeStats";
import { HelpCenter } from "../../Components/common/MainDashboardComp/HelpCenter";
import { Skeleton } from "../../Components/Skeleton";
import { usePageLoading } from "../../hooks/usePageLoading";
import {
    MainDashboardActivities,
    MainDashboardFooterStats,
    MainDashboardMetrics,
    MainDashboardNodeStats,
    MainDashboardQuickActions
} from "../../mock/PagesMockData/DashboardData";


const quickActionIconByKey: Record<MainDashboardQuickAction["icon"], React.ReactNode> = {
    "plus-square": <PlusSquare size={20} />,
    upload: <Upload size={20} />
};

const MainDashboard: React.FC = () => {
    const { isLoading: isSimulatingLoad } = usePageLoading('main-dashboard');
    
    const showSkeletons = isSimulatingLoad;

    
    return (
        <div className="flex flex-col min-h-screen bg-[#f5f6f8] dark:bg-[#101622] text-slate-900 dark:text-slate-100 font-sans">
            <main className="flex-1 overflow-y-auto p-5 max-w-7xl mx-auto space-y-8 w-full">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <Skeleton isLoaded={!showSkeletons} width="200px" height="32px" className="mb-2">
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
                        </Skeleton>
                        <Skeleton isLoaded={!showSkeletons} width="300px" height="16px">
                            <p className="text-slate-500 dark:text-slate-400">Monitor your decentralized infrastructure</p>
                        </Skeleton>
                    </div>
                  
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {showSkeletons ? (
                        Array.from({ length: 4 }).map((_, i) => (
                            <Skeleton key={i} variant="rectangular" height="140px" className="rounded-xl" />
                        ))
                    ) : (
                        MainDashboardMetrics.map((metric) => (
                            <MetricCard key={metric.title} metric={metric} />
                        ))
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {showSkeletons ? (
                        <>
                            {/* Activity Feed Skeleton */}
                            <div className="lg:col-span-3 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Skeleton variant="circular" width="22px" height="22px" />
                                        <Skeleton width="200px" height="16px" />
                                    </div>
                                    <Skeleton variant="button" width="60px" height="28px" />
                                </div>
                                <div className="space-y-3">
                                    {Array.from({ length: 4 }).map((_, i) => (
                                        <div key={i} className="bg-white dark:bg-[#161d2b] p-4 rounded-xl border border-slate-200 dark:border-slate-800 border-l-4 border-l-blue-600 flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <Skeleton variant="circular" width="40px" height="40px" />
                                                <div className="flex-1 space-y-2">
                                                    <Skeleton width="200px" height="16px" />
                                                    <Skeleton width="100%" height="12px" />
                                                </div>
                                            </div>
                                            <div className="text-right space-y-1">
                                                <Skeleton width="60px" height="10px" />
                                                <Skeleton variant="button" width="80px" height="20px" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Quick Actions Skeleton */}
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Skeleton variant="circular" width="22px" height="22px" />
                                        <Skeleton width="120px" height="16px" />
                                    </div>
                                </div>
                                <div className="space-y-5">
                                    <div className="flex flex-col gap-3">
                                        {Array.from({ length: 2 }).map((_, i) => (
                                            <Skeleton key={i} variant="button" width="100%" height="60px" className="rounded-xl" />
                                        ))}
                                    </div>
                                    <Skeleton variant="rectangular" width="100%" height="180px" className="rounded-xl" />
                                    <Skeleton variant="rectangular" width="100%" height="120px" className="rounded-xl" />
                                </div>
                            </div>
                        </>
                    ) : (
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
                                                action.variant === "primary"
                                                    ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20"
                                                    : "bg-white dark:bg-[#161d2b] border-slate-200 dark:border-slate-800 hover:border-blue-600 text-slate-900 dark:text-white"
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
                    )}
                </div>
            </main>

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
                                <span>{item.label}: {item.value}</span>
                                {index < MainDashboardFooterStats.length - 1 && <span className="text-slate-700">|</span>}
                            </React.Fragment>
                        ))
                    )}
                </div>
            </footer>
        </div>
    );
};

export default MainDashboard;
