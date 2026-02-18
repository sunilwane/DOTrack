import React from "react";
import type { MainDashboardNodeStat } from "types";

interface NodeStatsProps {
    stats: MainDashboardNodeStat[];
    progressPercentage?: number;
}

export const NodeStats: React.FC<NodeStatsProps> = ({ stats, progressPercentage = 85 }) => {
    return (
        <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-800 space-y-4">
            <h4 className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Active Nodes</h4>
            <div className="space-y-3">
                {stats.map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">{stat.label}</span>
                        <span className={stat.valueAccent === "emerald" ? "text-emerald-500 font-bold" : "text-slate-200"}>
                            {stat.value}
                        </span>
                    </div>
                ))}
                <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2">
                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${progressPercentage}%` }} />
                </div>
            </div>
        </div>
    );
};
