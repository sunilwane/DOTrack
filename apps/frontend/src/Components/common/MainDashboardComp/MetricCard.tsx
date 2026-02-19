import React from "react";
import { Info } from "lucide-react";
import type { MainDashboardMetric } from "types";
import { Box, ShieldCheck, Store, Star } from "lucide-react";

interface MetricCardProps {
    metric: MainDashboardMetric;
}

const metricStyles = {
    blue: "bg-blue-600/10 text-blue-600",
    emerald: "bg-emerald-500/10 text-emerald-500",
    yellow: "bg-yellow-500/10 text-yellow-500"
} as const;

const metricIconByKey: Record<MainDashboardMetric["icon"], React.ReactNode> = {
    box: <Box size={24} />,
    "shield-check": <ShieldCheck size={24} />,
    store: <Store size={24} />,
    star: <Star size={24} fill="currentColor" />
};

export const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
    return (
        <div className="bg-white dark:bg-[#161d2b] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg ${metricStyles[metric.accent]}`}>
                    {metricIconByKey[metric.icon]}
                </div>
                {metric.trendLabel === "Info" ? (
                    <Info size={16} className="text-slate-500" />
                ) : (
                    <span
                        className={`text-xs font-bold ${
                            metric.trendLabel === "GOLD" ? "text-yellow-500" : "text-blue-500"
                        }`}
                    >
                        {metric.trendLabel}
                    </span>
                )}
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                {metric.title}
            </p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">{metric.value}</h3>
            <p className="text-[10px] text-slate-500 mt-2 font-medium">{metric.subtitle}</p>
        </div>
    );
};
