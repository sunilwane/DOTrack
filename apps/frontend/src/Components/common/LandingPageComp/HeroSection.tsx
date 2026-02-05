import * as React from "react";
import { Card, CardBody } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import { HeroTerminalLogs } from "../../../mock/PagesMockData/LandingData";

export const HeroSection: React.FC = () => {
    const navigate = useNavigate();

    return (
        <section className="w-full relative py-16 sm:py-24 lg:py-32 overflow-hidden node-bg">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-light/50 dark:via-background-dark/50 to-background-light dark:to-background-dark pointer-events-none"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center gap-6 sm:gap-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    v2.0 Beta Now Live
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight max-w-[900px]">
                    Trustless CI/CD for the <span className="text-primary">Open Source</span> Future
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-[700px] font-normal leading-relaxed">
                    Automate your workflows with blockchain-verified approvals and
                    IPFS-stored templates. Secure. Transparent. Immutable.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
                    <Button
                        size="xl"
                        className="w-full sm:min-w-[200px] hover:scale-105"
                        onClick={() => navigate("/connect")}
                    >
                        Connect Wallet
                    </Button>
                    <Button
                        variant="outline"
                        size="xl"
                        className="w-full sm:min-w-[200px] backdrop-blur-md"
                    >
                        Explore Marketplace
                    </Button>
                </div>

                <Card className="mt-12 sm:mt-16 w-full max-w-5xl mx-auto rounded-xl border border-slate-200 dark:border-[#3b4354] overflow-hidden shadow-2xl bg-transparent" shadow="none" radius="none">
                    <div className="bg-slate-100 dark:bg-[#1b1f27] border-b border-slate-200 dark:border-[#3b4354] px-4 py-2 flex items-center gap-2">
                        <div className="flex gap-1.5 shrink-0">
                            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                        </div>
                        <div className="mx-auto text-[10px] uppercase tracking-widest opacity-50 font-bold truncate">
                            Mainnet Deployment Pipeline
                        </div>
                    </div>
                    <CardBody className="aspect-video bg-[#101622] p-4 sm:p-6 font-mono text-xs sm:text-sm overflow-hidden flex flex-col gap-2 text-left">
                        {HeroTerminalLogs.map((log, index) => (
                            <div key={index} className={`flex items-center gap-3 ${log.color}`}>
                                <span className="material-symbols-outlined text-sm sm:text-base">{log.icon}</span>
                                <span className={log.truncate ? "truncate" : ""}>
                                    {log.text}
                                </span>
                            </div>
                        ))}
                        <div className="mt-4 p-4 rounded bg-white/5 border border-white/10 overflow-hidden">
                            <p className="text-primary truncate font-semibold text-xs sm:text-sm">
                                0x71C7656EC7ab88b098defB751B7401B5f6d8976F
                            </p>
                            <p className="text-emerald-500 mt-2 font-bold text-left text-xs sm:text-sm">
                                VERIFIED_IMMUTABLE
                            </p>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </section>
    );
};
