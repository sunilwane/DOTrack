import * as React from "react";

interface Step {
    step: string;
    title: string;
    icon: string;
    status: "active" | "completed" | "pending";
}

interface StepsIndicatorProps {
    steps: Step[];
}

export const StepsIndicator: React.FC<StepsIndicatorProps> = ({ steps }) => (
    <div className="flex border-b border-slate-100 dark:border-[#3b4354] px-6">
        {steps.map((step) => (
            <a
                key={step.step}
                className={`flex flex-1 items-center justify-center gap-2 border-b-2 pb-4 pt-5 ${
                    step.status === "active" || step.status === "completed"
                        ? "border-primary text-primary"
                        : "border-transparent text-slate-400"
                }`}
                href="#"
            >
                <span className="material-symbols-outlined text-sm">{step.icon}</span>
                <p className="text-sm font-bold leading-normal tracking-[0.015em]">
                    {step.step}. {step.title}
                </p>
            </a>
        ))}
    </div>
);

export default StepsIndicator;
