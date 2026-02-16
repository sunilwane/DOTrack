import { useState, useEffect } from 'react';
import { StatusBadge } from '../../Components/common/StatusBadge';
import { Button } from '../../Components/common/Button';
import { DashboardCard } from '../../Components/common/DashboardCard';
import { PipelineStages, RecentDeployments, DashboardStats } from '../../mock/PagesMockData/DashboardData';
import PipelineTracker from './PipelineTracker';
import RecentDeploymentsTable from './RecentDeploymentsTable';
import { Skeleton } from '../../Components/Skeleton';

const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex flex-col min-h-full p-4 space-y-0 max-w-7xl mx-auto w-full transition-all duration-500">

            <div className="flex flex-wrap items-center gap-6 bg-primary/5 p-6 rounded-xl border border-primary/10 transition-all">
                <div className="flex flex-col gap-1.5 flex-1">
                    <div className="flex items-center gap-3">
                        <Skeleton isLoaded={!isLoading} width="40px" height="18px" className="rounded-full">
                            <StatusBadge status="success" className="px-1.5 py-0.5 text-[9px]">Active</StatusBadge>
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
                        <button className="text-[9px] font-black uppercase tracking-wider rounded border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-primary hover:border-primary transition-colors cursor-pointer px-3 h-8">
                            Export CSV
                        </button>
                    </Skeleton>

                    <Skeleton isLoaded={!isLoading} variant="button" width="100px" height="32px">
                        <Button
                            variant="secondary"
                            size="sm"
                            className="h-8 text-[11px]"
                            icon={<span className="material-symbols-outlined text-[16px]">open_in_new</span>}
                        >
                            <span className='text-sm'>Etherscan</span>
                        </Button>
                    </Skeleton>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 mt-8">
                {/* Pipeline Tracker Card */}
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

                {/* Approval Center Card */}
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
                                    <h4 className="text-slate-900 dark:text-white font-bold text-[11px] uppercase tracking-widest">Signature Required</h4>
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
                            <Button className="w-full text-xs h-7" icon={<span className="material-symbols-outlined text-[16px] size-6.5">draw</span>}>
                                <span className='text-sm'>Sign & Approve</span>
                            </Button>
                        </Skeleton>
                    </div>
                </DashboardCard>
            </div>

            {/* History Table */}
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

            <footer className="mt-4 border-t border-slate-200 dark:border-slate-800 pt-3 flex flex-wrap justify-between items-center gap-4 text-[9px] font-black tracking-widest text-slate-500 uppercase">
                <div className="flex items-center gap-4">
                    <Skeleton isLoaded={!isLoading} width="100px" height="24px">
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-500/5 rounded border border-emerald-500/10">
                            <span className="size-1.5 rounded-full bg-emerald-500"></span>
                            IPFS: ONLINE
                        </div>
                    </Skeleton>
                    <Skeleton isLoaded={!isLoading} width="110px" height="24px">
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-500/5 rounded border border-emerald-500/10">
                            <span className="size-1.5 rounded-full bg-emerald-500"></span>
                            RPC: CONNECTED
                        </div>
                    </Skeleton>
                </div>
                <Skeleton isLoaded={!isLoading} width="120px" height="14px">
                    <div className="text-[10px]">
                        BLOCK: {DashboardStats.blockNumber}
                    </div>
                </Skeleton>
            </footer>
        </div>
    );
};

export default Dashboard;
