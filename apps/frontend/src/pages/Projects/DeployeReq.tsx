import {
    Select,
    SelectItem,
    Textarea,
    RadioGroup,
    Radio,
    Avatar,
} from "@nextui-org/react";
import { Button } from "../../Components/common/Button";
import { DashboardCard } from "../../Components/common/DashboardCard";
import { Divider } from "../../Components/common/Divider";
import { StatusBadge } from "../../Components/common/StatusBadge";
import { pipelineVersions, signers, projectInfo } from "../../mock/PagesMockData/deploymentRequest";
import type { SignerInfo } from "types";
import { Footer } from "../../Components/layout/Footer";

export default function DeploymentRequest() {
    return (
        <div className="min-h-screen bg-[#101622] text-white flex flex-col">
            <main className="flex-1 flex justify-center py-12 px-4">
                <div className="w-full max-w-full space-y-10">

                    <div className="border-l-4 border-primary pl-6">
                        <h1 className="text-lg font-bold">
                            Initiate Deployment Request
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-2">
                            Project: <span className="text-primary font-semibold">{projectInfo.name}</span>
                        </p>
                    </div>

                    <DashboardCard
                        title="Deployment Configuration"
                        icon="settings"
                        extra={<StatusBadge status="info">Immutable Pipeline</StatusBadge>}
                        bodyClassName="space-y-8"
                    >
                        <div>
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 block">
                                Pipeline Version (IPFS Hash)
                            </label>

                            <Select
                                className="mt-3"
                                defaultSelectedKeys={["v2.1.0"]}
                                variant="bordered"
                                classNames={{
                                    trigger: "bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800",
                                }}
                            >
                                {pipelineVersions.map((version) => (
                                    <SelectItem key={version.key}>
                                        {version.label}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>

                        <div>
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 block">
                                Target Environment
                            </label>

                            <RadioGroup
                                orientation="horizontal"
                                defaultValue="staging"
                                className="mt-3"
                            >
                                <Radio value="staging">Staging</Radio>
                                <Radio value="production">Production</Radio>
                            </RadioGroup>
                        </div>

                        <div>
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 block">
                                Rationale / Deployment Notes
                            </label>

                            <Textarea
                                className="mt-3"
                                minRows={4}
                                placeholder="Explain why this deployment is necessary..."
                                variant="bordered"
                                classNames={{
                                    inputWrapper: "bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800",
                                }}
                            />
                        </div>

                        <DashboardCard
                            title="Quorum Requirements"
                            icon="verified_user"
                            extra={<StatusBadge status="info">2 of 3 Signatures Required</StatusBadge>}
                            bodyClassName="!p-0"
                        >
                            <Divider />

                            <div className="grid md:grid-cols-3 gap-4 p-6">
                                {signers.map((signer, index) => (
                                    <SignerCard key={index} {...signer} />
                                ))}
                            </div>
                        </DashboardCard>

                        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
                            <div>
                                <p className="text-xs uppercase text-slate-500 font-bold tracking-widest">
                                    Network Fee Estimate
                                </p>
                                <p className="font-mono text-sm text-primary mt-1">
                                    ~0.0042 ETH ($12.50)
                                </p>
                            </div>

                            <div className="flex gap-4 w-full sm:w-auto">
                                <Button variant="ghost" className="flex-1 sm:flex-none">
                                    Cancel
                                </Button>

                                <Button variant="primary" className="flex-1 sm:flex-none">
                                    Initiate Request
                                </Button>
                            </div>
                        </div>
                    </DashboardCard>

                    <div className="bg-primary/10 border border-primary/20 p-6 rounded-xl flex gap-4 items-start">
                        <span className="material-symbols-outlined text-primary mt-1">shield</span>
                        <div>
                            <h4 className="font-bold">Trustless Deployment Execution</h4>
                            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 leading-relaxed">
                                Once initiated, this request creates a pending transaction on
                                the blockchain. The CI/CD runner triggers only after receiving
                                the required signatures.
                            </p>
                        </div>
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
}

function SignerCard({ name, role, verified, disabled }: SignerInfo) {
    return (
        <div
            className={`flex items-center gap-3 p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/30 transition-all ${disabled ? "opacity-30 grayscale pointer-events-none" : "hover:border-primary/30"
                }`}
        >
            <Avatar name={name} size="sm" className="w-8 h-8" />

            <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate">{name}</p>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">{role}</p>
            </div>

            {verified && (
                <StatusBadge status="success">Verified</StatusBadge>
            )}
        </div>
    );
}
