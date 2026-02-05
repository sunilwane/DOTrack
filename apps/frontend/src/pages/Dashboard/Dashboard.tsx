import { useState, useEffect } from 'react'
import { StatusBadge } from '../../Components/common/StatusBadge';
import { Button } from '../../Components/common/Button';
import { DashboardCard } from '../../Components/common/DashboardCard';
import { PipelineStages, RecentDeployments, DashboardStats } from '../../mock/PagesMockData/DashboardData';
import type { PipelineStage } from "types";

const Dashboard = () => {
    const [stages, setStages] = useState<PipelineStage[]>(PipelineStages);

    useEffect(() => {
        let currentStageIndex = 0;
        let interval: any;
        let restartTimeout: any;

        const runAnimation = () => {
            // Reset all stages to pending
            setStages(prev => prev.map(s => ({
                ...s,
                status: "pending",
                time: s.id === 5 ? "Queued" : "Pending",
                icon: s.id === 3 ? "verified_user" : s.id === 4 ? "pen_size_2" : s.id === 5 ? "rocket_launch" : "check"
            })));
            currentStageIndex = 0;

            interval = setInterval(() => {
                setStages(prev => {
                    const newStages = [...prev];

                    // If we've completed all stages, mark last as done and restart
                    if (currentStageIndex >= newStages.length) {
                        // Mark the last stage as done before restarting
                        if (currentStageIndex === newStages.length && newStages[currentStageIndex - 1]) {
                            newStages[currentStageIndex - 1].status = "done";
                            newStages[currentStageIndex - 1].time = "Complete";
                            newStages[currentStageIndex - 1].icon = "check";
                        }
                        clearInterval(interval);
                        restartTimeout = setTimeout(runAnimation, 3000);
                        return newStages;
                    }

                    // Mark previous stage as done
                    if (currentStageIndex > 0) {
                        newStages[currentStageIndex - 1].status = "done";
                        const timeAgo = ["2m ago", "1m ago", "45s ago", "30s ago"];
                        newStages[currentStageIndex - 1].time = timeAgo[currentStageIndex - 1] || "Just now";
                        newStages[currentStageIndex - 1].icon = "check";
                        if (newStages[currentStageIndex - 1].id === 3) {
                            newStages[currentStageIndex - 1].icon = "verified_user";
                        }
                    }

                    // Mark current stage as active
                    newStages[currentStageIndex].status = "active";
                    if (currentStageIndex === 3) { // On-Chain Gate
                        newStages[currentStageIndex].time = "Pending Signature";
                        newStages[currentStageIndex].icon = "pen_size_2";
                    } else if (currentStageIndex === 4) { // Deploy
                        newStages[currentStageIndex].time = "Deploying...";
                        newStages[currentStageIndex].icon = "rocket_launch";
                    } else {
                        newStages[currentStageIndex].time = "Running...";
                        newStages[currentStageIndex].icon = "progress_activity";
                    }

                    currentStageIndex++;
                    return newStages;
                });
            }, 2500);
        };

        runAnimation();

        return () => {
            if (interval) clearInterval(interval);
            if (restartTimeout) clearTimeout(restartTimeout);
        };
    }, []);

    return (
        <div className="flex flex-col min-h-full p-0 space-y-6 max-w-7xl mx-auto w-full">
            {/* PageHeading */}
            <div className="flex flex-wrap justify-between items-center gap-6 bg-primary/5 p-6 rounded-xl border border-primary/10">
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
                <Button variant="secondary" size="sm" className="h-8 text-[11px]" icon={<span className="material-symbols-outlined text-[16px]">open_in_new</span>}>
                    Etherscan
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Pipeline Status Visual Tracker */}
                <DashboardCard
                    className="lg:col-span-3"
                    title="Pipeline Status"
                    icon="route"
                    extra="Live Monitoring"
                    bodyClassName="p-6 min-h-[140px] flex items-center"
                >
                    <div className="flex items-center justify-between relative w-full px-4">
                        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-200 dark:bg-slate-700 -translate-y-1/2 z-0"></div>
                        <div
                            className="absolute top-1/2 left-0 h-[1px] bg-primary -translate-y-1/2 z-0 transition-all duration-1000"
                            style={{ width: `${stages.length > 1 ? (stages.filter(s => s.status === 'done').length / (stages.length - 1)) * 100 : 0}%` }}
                        ></div>

                        {stages.map((stage, index) => (
                            <div key={index} className={`relative z-10 flex flex-col items-center gap-3 transition-all duration-500 ${stage.status === 'pending' ? 'opacity-40' : ''}`}>
                                <div
                                    className={`
                                        flex items-center justify-center shadow-lg transition-all duration-500
                                        ${stage.status === 'done' ? 'size-10 rounded-full bg-accent-emerald text-white' : ''}
                                        ${stage.status === 'active' ? 'size-12 rounded-full bg-primary text-white outline outline-4 outline-background-dark shadow-primary/20 scale-110' : ''}
                                        ${stage.status === 'pending' ? 'size-10 rounded-full bg-slate-700 text-slate-400' : ''}
                                    `}
                                >
                                    <span className={`material-symbols-outlined text-[20px] ${stage.status === 'active' && stage.icon === 'progress_activity' ? 'animate-spin' : stage.status === 'active' && stage.icon === 'pen_size_2' ? 'animate-pulse' : ''}`}>
                                        {stage.icon}
                                    </span>
                                </div>
                                <div className="text-center">
                                    <p className={`text-[10px] font-bold uppercase tracking-tight ${stage.status === 'active' ? 'text-primary' : stage.status === 'pending' ? 'text-slate-500' : 'text-slate-900 dark:text-white'}`}>
                                        {stage.label}
                                    </p>
                                    <p className={`text-[9px] font-mono tracking-tighter ${stage.status === 'pending' ? 'text-slate-600' : 'text-slate-500'}`}>
                                        {stage.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </DashboardCard>

                {/* Approval Center Widget */}
                <DashboardCard
                    className="lg:col-span-2"
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
                                <h4 className="text-slate-900 dark:text-white font-bold text-[11px] uppercase tracking-wide">Signature Required</h4>
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
                        <Button className="w-full text-xs h-7" icon={<span className="material-symbols-outlined text-[16px]">draw</span>}>
                            Sign & Approve
                        </Button>
                    </div>
                </DashboardCard>
            </div>

            {/* Recent Deployments Table */}
            <DashboardCard
                title="Immutable History"
                icon="history"
                extra={<button className="px-2 py-1 text-[9px] font-black uppercase tracking-widest rounded border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-primary hover:border-primary transition-colors cursor-pointer">Export CSV</button>}
                bodyClassName="p-0"
            >
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 text-[10px] text-slate-400 font-black uppercase tracking-widest">
                                <th className="px-6 py-4">ID</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Approver</th>
                                <th className="px-6 py-4">CID</th>
                                <th className="px-6 py-4">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                            {RecentDeployments.map((row, index) => (
                                <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-[11px]">
                                    <td className="px-6 py-4 font-mono text-slate-900 dark:text-slate-300">{row.id}</td>
                                    <td className="px-6 py-4">
                                        <StatusBadge status={row.success ? 'success' : 'error'} className="text-[9px] px-2 py-0.5">{row.status}</StatusBadge>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-slate-500">{row.approver}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 font-mono text-primary cursor-pointer transition-all group">
                                            <span className='group-hover:underline'>{row.cid}</span>
                                            <span className="material-symbols-outlined text-[14px]">cloud_download</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500">{row.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </DashboardCard>

            {/* Footer Status Bar */}
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
