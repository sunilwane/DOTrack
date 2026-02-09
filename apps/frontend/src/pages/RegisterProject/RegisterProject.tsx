import * as React from "react";
import { Button } from "../../Components/common/Button";
import { mockRegisterProjectData, mockRegistrationSteps } from "../../mock/PagesMockData/registerProjects";
import ProgressSection from "./ProgressSection";
import StepsIndicator from "./StepsIndicator";
import RegistrationSummary from "./RegistrationSummary";
import GasEstimateCard from "./GasEstimateCard";

const RegisterProject: React.FC = () => {
    return (
        <main className="flex-1 flex justify-center py-12 px-4 w-full">
            <div className="w-full max-w-[1000px] flex flex-col gap-8">
                
                <div className="text-center">
                    <h1 className="text-slate-900 dark:text-white tracking-tight text-2xl font-bold leading-tight pb-2">
                        Register New Project
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400">
                        Launch your open-source project on the decentralized CI/CD network.
                    </p>
                </div>

                
                <div className="bg-white dark:bg-[#1a202c] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-6 justify-between items-end">
                                <p className="text-slate-900 dark:text-white text-base font-medium leading-normal">
                                    Project Registration Progress
                                </p>
                                <p className="text-primary text-sm font-bold leading-normal">Step 3 of 3</p>
                            </div>
                            <div className="rounded-full bg-slate-100 dark:bg-[#3b4354] h-2.5 w-full overflow-hidden">
                                <div
                                    className="h-full rounded-full bg-primary transition-all duration-500"
                                    style={{ width: "100%" }}
                                ></div>
                            </div>
                        </div>
                    </div>

                   
                    <div className="flex border-b border-slate-100 dark:border-[#3b4354] px-6">
                        {mockRegistrationSteps.map((step) => (
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

                    
                    <div className="p-8">
                        <div className="flex flex-col gap-6">
                            <div>
                                <h2 className="text-slate-900 dark:text-white text-base font-bold leading-tight tracking-[-0.015em] mb-2">
                                    Step 3: Blockchain Registration
                                </h2>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">
                                    Deploy your project's identity to the smart contract. This action will incur a
                                    one-time gas fee.
                                </p>
                            </div>

                            
                            <div className="bg-slate-50 dark:bg-[#282e39]/30 rounded-xl p-6 border border-slate-100 dark:border-slate-800">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
                                    Registration Summary
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-600 dark:text-slate-400 text-sm">Project Name</span>
                                        <span className="text-slate-900 dark:text-white font-medium text-sm">
                                            {mockRegisterProjectData.projectName}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-600 dark:text-slate-400 text-sm">
                                            Source Repository
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm">account_tree</span>
                                            <span className="text-slate-900 dark:text-white font-medium text-sm">
                                                {mockRegisterProjectData.sourceRepository}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-600 dark:text-slate-400 text-sm">Network</span>
                                        <div className="flex items-center gap-2">
                                            <div className={`size-2 rounded-full ${
                                                mockRegisterProjectData.network.status === "active" 
                                                    ? "bg-emerald-500" 
                                                    : "bg-slate-400"
                                            }`}></div>
                                            <span className="text-slate-900 dark:text-white font-medium text-sm">
                                                {mockRegisterProjectData.network.name}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-between p-4 rounded-xl border-2 border-primary/30 bg-primary/5 dark:bg-primary/10">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center size-10 rounded-lg bg-primary/20 text-primary">
                                            <span className="material-symbols-outlined">local_gas_station</span>
                                        </div>
                                        <div>
                                            <p className="text-slate-900 dark:text-white text-sm font-bold">
                                                Estimated Gas Fee
                                            </p>
                                            <p className="text-slate-500 dark:text-slate-400 text-xs">
                                                Estimated based on current network congestion
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-primary text-xl font-bold">{mockRegisterProjectData.gasEstimate.eth}</p>
                                        <p className="text-slate-500 dark:text-slate-400 text-xs">≈ {mockRegisterProjectData.gasEstimate.usd}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 px-1">
                                    <span className="material-symbols-outlined text-amber-500 text-sm">info</span>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                                        Deployment takes approx. {mockRegisterProjectData.estimatedTime} after confirmation.
                                    </p>
                                </div>
                            </div>

                            
                            <div className="flex items-center gap-4 mt-4">
                                <Button variant="outline" className="flex-1">
                                    Back
                                </Button>
                                <Button
                                    variant="primary"
                                    className="flex-[1]"
                                    icon={<span className="material-symbols-outlined size-6.5">rocket_launch</span>}
                                >
                                    <span className="text-sm">Deploy to Blockchain</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                
                <div className="flex justify-center items-center gap-8 py-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                        <span className="material-symbols-outlined text-lg">verified_user</span>
                        <span className="text-xs">Secure Smart Contract</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                        <span className="material-symbols-outlined text-lg">history_edu</span>
                        <span className="text-xs">Audit Verified</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                        <span className="material-symbols-outlined text-lg">public</span>
                        <span className="text-xs">Immutable Record</span>
                    </div>
                </div>

                
                <div className="fixed bottom-8 right-8 hidden items-center gap-4 bg-emerald-500 text-white px-6 py-4 rounded-xl shadow-xl">
                    <span className="material-symbols-outlined">check_circle</span>
                    <div className="text-sm">
                        <p className="font-bold">Transaction Confirmed!</p>
                        <p className="opacity-90 text-xs">Project is being indexed by the network.</p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default RegisterProject;
