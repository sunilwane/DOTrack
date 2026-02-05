import * as React from "react";
import { LandingStats } from "../../../mock/PagesMockData/LandingData";

export const StatItem: React.FC<{ label: string; value: string; border?: boolean }> = ({ label, value, border }) => (
    <div className={`flex flex-col items-center md:items-start text-left ${border ? 'border-l-0 md:border-l border-slate-200 dark:border-slate-800 md:pl-8' : ''}`}>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{label}</p>
        <p className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{value}</p>
    </div>
);

export const StatsSection: React.FC = () => {
    return (
        <section className="w-full bg-slate-50 dark:bg-[#111318] border-y border-slate-200 dark:border-[#282e39] py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 sm:gap-8">
                    {LandingStats.map((stat, index) => (
                        <StatItem key={index} {...stat} />
                    ))}
                </div>
            </div>
        </section>
    );
};
