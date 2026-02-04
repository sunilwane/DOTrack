import { useState, useEffect } from 'react'

const Dashboard = () => {
    const [stages, setStages] = useState([
        { id: 1, label: "Build", time: "Pending", status: "pending", icon: "check" },
        { id: 2, label: "Test Suite", time: "Pending", status: "pending", icon: "check" },
        { id: 3, label: "Security Scan", time: "Pending", status: "pending", icon: "verified_user" },
        { id: 4, label: "On-Chain Gate", time: "Pending", status: "pending", icon: "pen_size_2" },
        { id: 5, label: "Deploy", time: "Queued", status: "pending", icon: "rocket_launch" },
    ]);

    useEffect(() => {
        let currentStageIndex = 0;

        const runAnimation = () => {
            setStages(prev => prev.map(s => ({ ...s, status: "pending", time: "Pending", icon: s.id === 3 ? "verified_user" : s.id === 4 ? "pen_size_2" : s.id === 5 ? "rocket_launch" : "check" })));

            const interval = setInterval(() => {
                setStages(prev => {
                    const newStages = [...prev];

                    if (currentStageIndex >= newStages.length) {
                        clearInterval(interval);
                        setTimeout(() => {
                            currentStageIndex = 0;
                            runAnimation();
                        }, 3000);
                        return newStages;
                    }

                    if (currentStageIndex > 0) {
                        newStages[currentStageIndex - 1].status = "done";
                        newStages[currentStageIndex - 1].time = "Just now";
                        newStages[currentStageIndex - 1].icon = "check";
                        if (currentStageIndex - 1 === 2) newStages[currentStageIndex - 1].icon = "verified_user";
                    }

                    if (newStages[currentStageIndex]) {
                        if (currentStageIndex === 3) {
                            newStages[currentStageIndex].status = "active";
                            newStages[currentStageIndex].time = "Pending Signature";
                            newStages[currentStageIndex].icon = "pen_size_2";
                            clearInterval(interval);
                        } else {
                            newStages[currentStageIndex].status = "active";
                            newStages[currentStageIndex].time = "Running...";
                            newStages[currentStageIndex].icon = "progress_activity";
                        }
                    }

                    return newStages;
                });

                currentStageIndex++;
            }, 3000);
        };

        runAnimation();

        return () => { };
    }, []);

    return (
        <div className="flex flex-col min-h-full">
            <div className="p-8 mx-auto flex-1 w-full">
                <div className="flex flex-wrap justify-between items-end gap-6 bg-primary/5 p-2 rounded-xl border border-primary/10">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                            <span className="px-2 py-0.5 bg-accent-emerald/20 text-accent-emerald text-[10px] font-bold uppercase rounded">
                                Active
                            </span>
                            <h1 style={{ fontSize: '0.8em' }} className="text-slate-900 dark:text-white  font-bold tracking-tight">
                                OpenSource-DApp-v1
                            </h1>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-slate-500 dark:text-slate-400 text-sm font-medium">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">code</span>
                                <span>github.com/org/core-protocol</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">terminal</span>
                                <span className="font-mono text-xs">Contract: 0x71C765...d897</span>
                                <span className="material-symbols-outlined text-sm cursor-pointer hover:text-primary">
                                    content_copy
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg text-sm font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors border-none cursor-pointer">
                            <span style={{ fontSize: '1.2em' }} className="material-symbols-outlined mr-2">open_in_new</span>
                            <span style={{ fontSize: '0.8em' }}>Etherscan</span>
                        </button>
                    </div>
                </div>

                <div style={{ width: '80%' }} className="grid grid-cols-4 lg:grid-cols-3 gap-5 mt-8">
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 style={{ fontSize: '0.8em' }} className="text-slate-900 dark:text-white  font-bold flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">route</span>
                                Pipeline Status
                            </h3>
                            <span className="text-xs text-slate-500 font-medium">Live Monitoring</span>
                        </div>
                        <div className="bg-white dark:bg-[#161d2b] p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl">
                            <div className="flex items-center justify-between relative">
                                <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 dark:bg-slate-700 -translate-y-1/2 z-0"></div>
                                <div className="absolute top-1/2 left-0 w-3/4 h-1 bg-primary -translate-y-1/2 z-0"></div>

                                {stages.map((stage, index) => (
                                    <div key={index} className={`relative z-10 flex flex-col items-center gap-3 ${stage.status === 'pending' ? 'opacity-40' : ''} transition-all duration-700 ease-in-out`}>
                                        <div
                                            className={`
                        flex items-center justify-center shadow-lg transition-all duration-700 ease-in-out
                        ${stage.status === 'done' ? 'size-10 rounded-full bg-accent-emerald text-white shadow-accent-emerald/20 scale-100' : ''}
                        ${stage.status === 'active' ? 'size-12 rounded-full bg-primary text-white shadow-primary/40 outline outline-4 outline-background-dark scale-110' : ''}
                        ${stage.status === 'pending' ? 'size-10 rounded-full bg-slate-700 text-slate-400 scale-90' : ''}
                      `}
                                        >
                                            <span className={`material-symbols-outlined ${stage.status === 'active' && stage.icon === 'progress_activity' ? 'animate-spin' : ''} transition-all duration-300`}>
                                                {stage.icon}
                                            </span>
                                        </div>
                                        <div className="text-center">
                                            <p className={`text-xs font-bold transition-colors duration-500 ${stage.status === 'active' ? 'text-primary' : stage.status === 'pending' ? 'text-slate-500' : 'text-slate-900 dark:text-white'}`}>
                                                {stage.label}
                                            </p>
                                            <p className={`text-[10px] font-mono transition-colors duration-500 ${stage.status === 'pending' ? 'text-slate-600' : 'text-slate-500'}`}>
                                                {stage.time}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div style={{ width: '180%' }} className="space-y-4 ">
                        <h3 style={{ fontSize: '0.8em' }} className="text-slate-900 dark:text-white  font-bold flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">gavel</span>
                            Approval Center
                        </h3>
                        <div className="bg-primary/5 border border-primary/20 rounded-xl  flex flex-col gap-2 p-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-lg bg-primary/20 text-primary">
                                    <span className="material-symbols-outlined">signature</span>
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '0.8em' }} className="text-slate-900 dark:text-white font-bold">Signature Required</h4>
                                    <p style={{ fontSize: '0.8em' }} className="text-sm text-slate-500 dark:text-slate-400 leading-snug mt-1 mb-1">
                                        Pipeline #882 requires your signature to proceed with deployment to Mainnet.
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between text-xs font-medium">
                                    <span className="text-slate-500">Gas Estimate:</span>
                                    <span className="text-slate-900 dark:text-slate-200">~0.0042 ETH</span>
                                </div>
                                <div className="flex justify-between text-xs font-medium">
                                    <span className="text-slate-500">Priority:</span>
                                    <span className="text-accent-emerald">Fastest</span>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <button style={{ fontSize: '0.8em', height: '2rem' }} className=" bg-[#0d59f2] w-1/2   hover:bg-[#0b4ecf] text-white font-bold rounded-lg flex items-center justify-center  gap-2 transition-transform active:scale-95 shadow-lg shadow-[#0d59f2]/20 cursor-pointer border-none">
                                    <span style={{ fontSize: '1.2em' }} className="material-symbols-outlined ">draw</span>
                                    Sign & Approve
                                </button>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 style={{ fontSize: '0.8em' }} className="text-slate-900 dark:text-white font-bold flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">history</span>
                            Immutable Deployment History
                        </h3>
                        <div className="flex gap-2">
                            <button style={{ fontSize: '0.8em' }} className="px-3  font-bold uppercase rounded border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 bg-transparent cursor-pointer">
                                Export CSV
                            </button>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-[#161d2b] rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">ID</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Approver Address</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">IPFS Content Identifier (CID)</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Timestamp</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                {[
                                    { id: "#881", status: "SUCCESS", approver: "0x4b9...9a12", cid: "QmXoyp...3Vp8", time: "2023-11-24 14:32:01", success: true },
                                    { id: "#880", status: "SUCCESS", approver: "0x71C...d897", cid: "QmNrg8...9Lk2", time: "2023-11-23 09:15:44", success: true },
                                    { id: "#879", status: "FAILED", approver: "0x71C...d897", cid: "QmZ6t2...6Hj1", time: "2023-11-22 18:02:12", success: false },
                                ].map((row, index) => (
                                    <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-4 font-mono text-xs text-slate-900 dark:text-slate-300">{row.id}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${row.success ? 'bg-accent-emerald/10 text-accent-emerald border-accent-emerald/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
                                                <span className={`size-1.5 rounded-full ${row.success ? 'bg-accent-emerald' : 'bg-red-500'}`}></span> {row.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-mono text-xs text-slate-500">{row.approver}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 font-mono text-xs text-primary cursor-pointer hover:underline">
                                                <span>{row.cid}</span>
                                                <span className="material-symbols-outlined text-[16px]">cloud_download</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-slate-500">{row.time}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 px-8 py-3 bg-white dark:bg-slate-900 flex justify-between items-center text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                        <span className="size-2 rounded-full bg-accent-emerald"></span>
                        IPFS NODE: ONLINE
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="size-2 rounded-full bg-accent-emerald"></span>
                        ETHEREUM RPC: CONNECTED
                    </div>
                </div>
                <div>
                    BLOCK HEIGHT: 18,452,901
                </div>
            </footer>
        </div>
    );
};

export default Dashboard;
