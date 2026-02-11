import * as React from "react";

interface RegisterProjectData {
    projectName: string;
    sourceRepository: string;
    network: {
        name: string;
        status: "active" | "inactive";
    };
}

interface RegistrationSummaryProps {
    data: RegisterProjectData;
}

export const RegistrationSummary: React.FC<RegistrationSummaryProps> = ({ data }) => (
    <div className="bg-slate-50 dark:bg-[#282e39]/30 rounded-xl p-6 border border-slate-100 dark:border-slate-800">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
            Registration Summary
        </h3>
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400 text-sm">Project Name</span>
                <span className="text-slate-900 dark:text-white font-medium text-sm">
                    {data.projectName}
                </span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400 text-sm">
                    Source Repository
                </span>
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">account_tree</span>
                    <span className="text-slate-900 dark:text-white font-medium text-sm">
                        {data.sourceRepository}
                    </span>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400 text-sm">Network</span>
                <div className="flex items-center gap-2">
                    <div className={`size-2 rounded-full ${
                        data.network.status === "active" 
                            ? "bg-emerald-500" 
                            : "bg-slate-400"
                    }`}></div>
                    <span className="text-slate-900 dark:text-white font-medium text-sm">
                        {data.network.name}
                    </span>
                </div>
            </div>
        </div>
    </div>
);

export default RegistrationSummary;
