import { usePageLoading } from "../../hooks/usePageLoading";
import { Button } from "../../Components/common/Button";
import { mockRegisterProjectData, mockRegistrationSteps } from "../../mock/PagesMockData/registerProjects";
import { Skeleton } from "../../Components/Skeleton";

const RegisterProject: React.FC = () => {
    const { isLoading } = usePageLoading('register_project');
    return (
        <main className="flex-1 flex justify-center py-12 px-4 w-full">
            <div className="w-full max-w-[1000px] flex flex-col gap-8">

                <div className="text-center">
                    <Skeleton isLoaded={!isLoading} width="240px" height="32px" className="mx-auto mb-2">
                        <h1 className="text-slate-900 dark:text-white tracking-tight text-2xl font-bold leading-tight pb-2">
                            Register New Project
                        </h1>
                    </Skeleton>
                    <Skeleton isLoaded={!isLoading} width="400px" height="20px" className="mx-auto">
                        <p className="text-slate-500 dark:text-slate-400">
                            Launch your open-source project on the decentralized CI/CD network.
                        </p>
                    </Skeleton>
                </div>


                <div className="bg-white dark:bg-[#1a202c] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-6 justify-between items-end">
                                <Skeleton isLoaded={!isLoading} width="200px" height="20px">
                                    <p className="text-slate-900 dark:text-white text-base font-medium leading-normal">
                                        Project Registration Progress
                                    </p>
                                </Skeleton>
                                <Skeleton isLoaded={!isLoading} width="80px" height="20px">
                                    <p className="text-primary text-sm font-bold leading-normal">Step 3 of 3</p>
                                </Skeleton>
                            </div>
                            <Skeleton isLoaded={!isLoading} width="100%" height="10px" className="rounded-full">
                                <div className="rounded-full bg-slate-100 dark:bg-[#3b4354] h-2.5 w-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full bg-primary transition-all duration-500"
                                        style={{ width: "100%" }}
                                    ></div>
                                </div>
                            </Skeleton>
                        </div>
                    </div>


                    <div className="flex border-b border-slate-100 dark:border-[#3b4354] px-6">
                        {mockRegistrationSteps.map((step) => (
                            <div key={step.step} className="flex-1">
                                <Skeleton isLoaded={!isLoading} width="100%" height="48px" className="rounded-none">
                                    <a
                                        className={`flex items-center justify-center gap-2 border-b-2 pb-4 pt-5 ${step.status === "active" || step.status === "completed"
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
                                </Skeleton>
                            </div>
                        ))}
                    </div>


                    <div className="p-8">
                        <div className="flex flex-col gap-6">
                            <div>
                                <Skeleton isLoaded={!isLoading} width="220px" height="24px" className="mb-2">
                                    <h2 className="text-slate-900 dark:text-white text-base font-bold leading-tight tracking-[-0.015em] mb-2">
                                        Step 3: Blockchain Registration
                                    </h2>
                                </Skeleton>
                                <Skeleton isLoaded={!isLoading} variant="text" rows={2}>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                                        Deploy your project's identity to the smart contract. This action will incur a
                                        one-time gas fee.
                                    </p>
                                </Skeleton>
                            </div>


                            <div className="bg-slate-50 dark:bg-[#282e39]/30 rounded-xl p-6 border border-slate-100 dark:border-slate-800">
                                <Skeleton isLoaded={!isLoading} width="160px" height="12px" className="mb-4">
                                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
                                        Registration Summary
                                    </h3>
                                </Skeleton>
                                <div className="space-y-4">
                                    {[
                                        { label: "Project Name", value: mockRegisterProjectData.projectName },
                                        { label: "Source Repository", value: mockRegisterProjectData.sourceRepository, icon: "account_tree" },
                                        { label: "Network", value: mockRegisterProjectData.network.name, status: mockRegisterProjectData.network.status }
                                    ].map((item, i) => (
                                        <div key={i} className="flex justify-between items-center">
                                            <Skeleton isLoaded={!isLoading} width="100px" height="14px">
                                                <span className="text-slate-600 dark:text-slate-400 text-sm">{item.label}</span>
                                            </Skeleton>
                                            <Skeleton isLoaded={!isLoading} width="180px" height="14px">
                                                <div className="flex items-center gap-2">
                                                    {item.icon && <span className="material-symbols-outlined text-sm">{item.icon}</span>}
                                                    {item.status && (
                                                        <div className={`size-2 rounded-full ${item.status === "active" ? "bg-emerald-500" : "bg-slate-400"
                                                            }`}></div>
                                                    )}
                                                    <span className="text-slate-900 dark:text-white font-medium text-sm">
                                                        {item.value}
                                                    </span>
                                                </div>
                                            </Skeleton>
                                        </div>
                                    ))}
                                </div>
                            </div>


                            <div className="flex flex-col gap-4">
                                <Skeleton isLoaded={!isLoading} width="100%" height="72px" className="rounded-xl">
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
                                </Skeleton>
                                <Skeleton isLoaded={!isLoading} width="320px" height="16px">
                                    <div className="flex items-center gap-2 px-1">
                                        <span className="material-symbols-outlined text-amber-500 text-sm">info</span>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                                            Deployment takes approx. {mockRegisterProjectData.estimatedTime} after confirmation.
                                        </p>
                                    </div>
                                </Skeleton>
                            </div>


                            <div className="flex items-center gap-4 mt-4">
                                <Skeleton isLoaded={!isLoading} variant="button" width="100%" height="40px" className="flex-1">
                                    <Button variant="outline" className="w-full">
                                        Back
                                    </Button>
                                </Skeleton>
                                <Skeleton isLoaded={!isLoading} variant="button" width="100%" height="40px" className="flex-1">
                                    <Button
                                        variant="primary"
                                        className="w-full"
                                        icon={<span className="material-symbols-outlined size-6.5">rocket_launch</span>}
                                    >
                                        <span className="text-sm">Deploy to Blockchain</span>
                                    </Button>
                                </Skeleton>
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
