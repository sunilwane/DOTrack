import * as React from "react";
import { useState } from "react";
import { mockVersions } from "../../mock/PagesMockData/versionHistory";
import { useStageAnimation } from "../../Components/common/StageAnimation";
import TimelineEntry from "./TimelineEntry";
import { Skeleton } from "../../Components/Skeleton";

const VersionHistory: React.FC = () => {
    const [selectedVersions, setSelectedVersions] = useState<string[]>([]);
    const [isSimulatingLoad, setIsSimulatingLoad] = useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => setIsSimulatingLoad(false), 2000);
        return () => clearTimeout(timer);
    }, []);


    const stageItems = React.useMemo(() =>
        mockVersions.map(v => ({
            id: v.version,
            label: v.title,
        })),
        []
    );

    const { states } = useStageAnimation(stageItems, {
        loadingDuration: 1500,
        connectorDuration: 1400,
        restartDelay: 2000,
        loop: true,
    });

    const toggleVersionSelection = (version: string) => {
        setSelectedVersions(prev =>
            prev.includes(version)
                ? prev.filter(v => v !== version)
                : [...prev, version]
        );
    };

    const clearSelection = () => {
        setSelectedVersions([]);
    };

    return (
        <div className="flex-1 flex flex-col bg-background-light dark:bg-background-dark max-w-5xl mx-auto w-full">

            <div className="flex flex-wrap gap-2 px-6 py-4">
                <Skeleton isLoaded={!isSimulatingLoad} width="60px" height="14px">
                    <a className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal hover:text-primary cursor-pointer" href="#">
                        Pipelines
                    </a>
                </Skeleton>
                <span className="text-slate-400 text-sm font-medium leading-normal">/</span>
                <Skeleton isLoaded={!isSimulatingLoad} width="100px" height="14px">
                    <a className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal hover:text-primary cursor-pointer" href="#">
                        Pipeline Alpha
                    </a>
                </Skeleton>
                <span className="text-slate-400 text-sm font-medium leading-normal">/</span>
                <Skeleton isLoaded={!isSimulatingLoad} width="120px" height="14px">
                    <span className="text-slate-900 dark:text-white text-sm font-bold leading-normal">Version History</span>
                </Skeleton>
            </div>

            <div className="flex flex-wrap justify-between items-end gap-3 px-6 py-4">
                <div className="flex min-w-72 flex-col gap-2">
                    <Skeleton isLoaded={!isSimulatingLoad} width="180px" height="28px">
                        <p className="text-slate-900 dark:text-white text-xl font-black leading-tight tracking-[-0.033em]">
                            Version History
                        </p>
                    </Skeleton>
                    <Skeleton isLoaded={!isSimulatingLoad} width="100%" height="16px" className="max-w-md">
                        <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal text-sm">
                            Immutable timeline of pipeline manifests anchored to blockchain.
                        </p>
                    </Skeleton>
                </div>
                <div className="flex gap-3">
                    <Skeleton isLoaded={!isSimulatingLoad} width="100px" height="40px" className="rounded-lg">
                        <button className="flex min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-slate-100 dark:hover:bg-slate-700">
                            <span className="material-symbols-outlined mr-2 text-lg">filter_list</span>
                            <span className="truncate text-sm">Filter</span>
                        </button>
                    </Skeleton>
                    <Skeleton isLoaded={!isSimulatingLoad} width="160px" height="40px" className="rounded-lg">
                        <button
                            className="flex min-w-[140px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary/20 text-primary text-sm font-bold leading-normal tracking-[0.015em] border border-primary/30 hover:bg-primary/30"
                            disabled={selectedVersions.length < 2}
                        >
                            <span className="material-symbols-outlined mr-2 text-lg">compare_arrows</span>
                            <span className="truncate text-sm">Compare Selected</span>
                        </button>
                    </Skeleton>
                </div>
            </div>


            <div className="px-6 py-8">
                <div className="flex flex-col relative">
                    {mockVersions.map((entry, index) => {
                        const state = states.find(s => s.id === entry.version);
                        const versionState = state?.status || 'pending';
                        const progress = state?.connectorProgress || 0;

                        return (
                            <TimelineEntry
                                key={entry.version}
                                entry={entry}
                                isLast={index === mockVersions.length - 1}
                                isSelected={selectedVersions.includes(entry.version)}
                                onToggleSelection={() => toggleVersionSelection(entry.version)}
                                versionState={versionState}
                                showConnector={index < mockVersions.length - 1}
                                connectorProgress={progress}
                                connectorDuration={1400}
                                isLoading={isSimulatingLoad}
                            />
                        );
                    })}
                </div>
            </div>


            {selectedVersions.length > 0 && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-xl px-4 z-[100]">
                    <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-2xl p-4 shadow-2xl flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex -space-x-3">
                                {selectedVersions.map((version, idx) => (
                                    <div
                                        key={version}
                                        className={`size-8 rounded-lg flex items-center justify-center text-[10px] font-bold text-white ring-2 ring-slate-900 ${idx === 0 ? 'bg-primary' : 'bg-slate-700'}`}
                                    >
                                        {version}
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm font-medium text-white hidden sm:block">
                                {selectedVersions.length} Version{selectedVersions.length !== 1 ? 's' : ''} selected for comparison
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={clearSelection}
                                className="text-slate-400 text-xs font-bold px-3 hover:text-white transition-colors"
                            >
                                Clear
                            </button>
                            <button className="bg-primary text-white text-xs font-bold h-9 px-4 rounded-lg shadow-lg shadow-primary/20 flex items-center gap-1.5 whitespace-nowrap">
                                <span className="material-symbols-outlined text-sm">difference</span>
                                <span> View Code Diff</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes spin {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </div>
    );
};

export default VersionHistory;
