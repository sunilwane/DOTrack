import * as React from "react";

interface LogoProps {
    className?: string;
    size?: number | string;
}

export const Logo: React.FC<LogoProps> = ({ className = "size-8 text-primary", size }) => {
    const style = size ? { width: size, height: size } : {};

    return (
        <div className={className} style={style}>
            <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z"></path>
            </svg>
        </div>
    );
};

export const LogoWithText: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
    return (
        <button
            type="button"
            className="flex items-center gap-3 group cursor-pointer bg-transparent border-none p-0"
            onClick={onClick}
            aria-label="Nexus CI/CD Home"
        >
            <Logo className="size-8 text-primary group-hover:scale-110 transition-transform" />
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Nexus CI/CD
            </h2>
        </button>
    );
};
