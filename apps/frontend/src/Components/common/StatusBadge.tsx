import * as React from "react";

interface StatusBadgeProps {
    status: "success" | "warning" | "error" | "info" | "pending";
    children: React.ReactNode;
    className?: string;
    outline?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
    status,
    children,
    className = "",
    // outline = false (unused)
}) => {
    const variants = {
        success: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
        warning: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
        error: "bg-red-500/10 text-red-500 border-red-500/20",
        info: "bg-primary/10 text-primary border-primary/20",
        pending: "bg-slate-500/10 text-slate-500 border-slate-500/20",
    };

    const dotColors = {
        success: "bg-emerald-500",
        warning: "bg-yellow-500",
        error: "bg-red-500",
        info: "bg-primary",
        pending: "bg-slate-500",
    };

    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${variants[status]} ${className}`}>
            <span className={`size-1.5 rounded-full ${dotColors[status]}`}></span>
            {children}
        </span>
    );
};
