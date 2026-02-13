import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "social";
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    className?: string;
    icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = "primary",
    size = "md",
    className = "",
    icon,
    type = "button",
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-bold transition-all transition-colors active:scale-95 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
        primary: "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20",
        secondary: "bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-white/20",
        outline: "border border-slate-300 dark:border-slate-700 bg-transparent hover:bg-slate-100 dark:hover:bg-white/5",
        ghost: "bg-transparent hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white",
        social: "border border-slate-200 dark:border-slate-800 bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 text-sm font-medium",
    };

    const sizes = {
        xs: "h-6 px-3 text-[6px] font-semibold rounded-md shadow-none",
        sm: "h-9 px-3 text-xs",
        md: "h-10 px-5 text-sm",
        lg: "h-12 px-6 text-base",
        xl: "h-14 px-8 text-lg",
    };

    return (
        <button
            type={type}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {icon && <span className="mr-2 flex items-center">{icon}</span>}
            {children}
        </button>
    );
};
