import * as React from "react";

interface ProgressSectionProps {
    step: number;
    totalSteps: number;
    progress: number;
}

export const ProgressSection: React.FC<ProgressSectionProps> = ({ step, totalSteps, progress }) => (
    <div className="p-6 border-b border-slate-100 dark:border-slate-800">
        <div className="flex flex-col gap-3">
            <div className="flex gap-6 justify-between items-end">
                <p className="text-slate-900 dark:text-white text-base font-medium leading-normal">
                    Project Registration Progress
                </p>
                <p className="text-primary text-sm font-bold leading-normal">Step {step} of {totalSteps}</p>
            </div>
            <div className="rounded-full bg-slate-100 dark:bg-[#3b4354] h-2.5 w-full overflow-hidden">
                <div
                    className="h-full rounded-full bg-primary transition-all duration-500"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
    </div>
);

export default ProgressSection;
