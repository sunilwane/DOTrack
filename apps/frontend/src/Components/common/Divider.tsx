import * as React from "react";

export const Divider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    return (
        <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
            </div>
            {children && (
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white dark:bg-card-dark px-4 text-slate-500 tracking-widest font-bold">
                        {children}
                    </span>
                </div>
            )}
        </div>
    );
};
