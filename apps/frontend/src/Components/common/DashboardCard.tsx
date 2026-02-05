import * as React from "react";

interface CardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
    icon?: string;
    extra?: React.ReactNode;
    bodyClassName?: string;
}

export const DashboardCard: React.FC<CardProps> = ({
    children,
    className = "",
    title,
    icon,
    extra,
    bodyClassName = ""
}) => {
    return (
        <div className={`flex flex-col gap-4 ${className}`}>
            {(title || icon) && (
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold flex items-center gap-2 text-slate-900 dark:text-white uppercase tracking-tight">
                        {icon && <span className="material-symbols-outlined text-primary text-xl">{icon}</span>}
                        {title}
                    </h3>
                    {extra && <div className="text-xs text-slate-500 font-medium">{extra}</div>}
                </div>
            )}
            <div className={`bg-white dark:bg-[#161d2b] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden ${bodyClassName}`}>
                {children}
            </div>
        </div>
    );
};
