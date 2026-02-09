import { StatusBadge } from '../../Components/common/StatusBadge';
import { Button } from '../../Components/common/Button';
import { DashboardCard } from '../../Components/common/DashboardCard';
import { PipelineStages, RecentDeployments, DashboardStats } from '../../mock/PagesMockData/DashboardData';
import { usePipelineAnimation } from './usePipelineAnimation';
import PipelineTracker from './PipelineTracker';
import RecentDeploymentsTable from './RecentDeploymentsTable';

const Dashboard = () => {
    const stages = usePipelineAnimation(PipelineStages);

    return (
        <div className="flex flex-col min-h-full p-0 space-y-0 max-w-7xl mx-auto w-full">
           
            <div className="flex flex-wrap items-center gap-6 bg-primary/5 p-6 rounded-xl border border-primary/10">
                <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-3">
                        <StatusBadge status="success" className="px-1.5 py-0.5 text-[9px]">Active</StatusBadge>
                        <h1 className="text-slate-900 dark:text-white text-sm font-bold uppercase tracking-wider">
                            {DashboardStats.projectName}
                        </h1>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-slate-500 dark:text-slate-400 text-[11px] font-medium">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[14px]">code</span>
                            <span>{DashboardStats.githubRepo}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[14px]">terminal</span>
                            <span className="font-mono text-[10px]">{DashboardStats.walletAddress}</span>
                            <span className="material-symbols-outlined text-[14px] cursor-pointer hover:text-primary transition-colors">
                                content_copy
                            </span>
                        </div>
                    </div>
                </div>
                <div className="ml-auto flex items-center gap-5">
                    <button className="text-[9px] font-black uppercase tracking-widest rounded border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-primary hover:border-primary transition-colors cursor-pointer">
                        <span className='text-sm'>Export CSV</span>
                    </button>

                    <Button
                        variant="secondary"
                        size="sm"
                        className="h-8 text-[11px]"
                        icon={<span className="material-symbols-outlined text-[16px]">open_in_new</span>}
                    >
                        Etherscan
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 mt-8">
                
                <DashboardCard
                    className="lg:col-span-3"
                    title="Pipeline Status"
                    icon="route"
                    extra="Live Monitoring"
                    bodyClassName="p-6 min-h-[140px] flex items-center"
                >
                    <PipelineTracker stages={stages} />
                </DashboardCard>

                
                <DashboardCard
                    className="lg:col-span-3"
                    title="Approval Center"
                    icon="gavel"
                    bodyClassName="bg-primary/5 border-primary/20 p-3"
                >
                    <div className="flex flex-col gap-2">
                        <div className="flex items-start gap-2">
                            <div className="p-1.5 rounded-lg bg-primary/20 text-primary">
                                <span className="material-symbols-outlined text-[18px]">signature</span>
                            </div>
                            <div>
                                <h4 className="text-slate-900 dark:text-white font-bold text-[11px] uppercase tracking-widest">Signature Required</h4>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal mt-0.5">
                                    Pipeline #882 requires your signature to proceed with deployment to Mainnet.
                                </p>
                            </div>
                        </div>
                        <div className="space-y-1 border-y border-primary/10 py-1.5">
                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                                <span className="text-slate-500">Gas Estimate</span>
                                <span className="text-slate-900 dark:text-slate-200">{DashboardStats.gasEstimate}</span>
                            </div>
                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                                <span className="text-slate-500">Priority</span>
                                <span className="text-accent-emerald">{DashboardStats.priority}</span>
                            </div>
                        </div>
                        <Button className="w-full text-xs h-7" icon={<span className="material-symbols-outlined text-[16px] size-6.5">draw</span>}>
                            <span className='text-sm'>Sign & Approve</span>
                        </Button>
                    </div>
                </DashboardCard>
            </div>

            
            <DashboardCard
                title="Immutable History"
                icon="history"
                bodyClassName="p-0"
            >
                <RecentDeploymentsTable deployments={RecentDeployments} />
            </DashboardCard>

           
            <footer className="mt-4 border-t border-slate-200 dark:border-slate-800 pt-3 flex flex-wrap justify-between items-center gap-4 text-[9px] font-black tracking-widest text-slate-500 uppercase">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-500/5 rounded border border-emerald-500/10">
                        <span className="size-1.5 rounded-full bg-emerald-500"></span>
                        IPFS: ONLINE
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-500/5 rounded border border-emerald-500/10">
                        <span className="size-1.5 rounded-full bg-emerald-500"></span>
                        RPC: CONNECTED
                    </div>
                </div>
                <div className="text-[10px]">
                    BLOCK: {DashboardStats.blockNumber}
                </div>
            </footer>
        </div>
    );
};

export default Dashboard;
