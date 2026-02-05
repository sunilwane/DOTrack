import * as React from "react";

interface CardProps {
    children: React.ReactNode;
    className?: string;
    bodyClassName?: string;
    title?: string;
    icon?: string;
    extra?: React.ReactNode;
}

export const DashboardCard: React.FC<CardProps> = ({
    children,
    className = "",
    bodyClassName = "",
    title,
    icon,
    extra
}) => {
    return (
        <div className={`flex flex-col gap-3 ${className}`}>
            {(title || icon) && (
                <div className="flex items-center justify-between px-1">
                    <h3 className="text-slate-900 dark:text-white text-[11px] font-bold uppercase tracking-widest flex items-center gap-2">
                        {icon && <span className="material-symbols-outlined text-primary text-[18px]">{icon}</span>}
                        {title}
                    </h3>
                    {extra && <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest opacity-60">{extra}</div>}
                </div>
            )}
            <div className={`bg-white dark:bg-[#161d2b] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden ${bodyClassName}`}>
                {children}
            </div>
        </div>
    );
};
