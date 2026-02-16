import * as React from "react";
import type { VersionEntry } from "../../mock/PagesMockData/versionHistory";
import { Skeleton } from "../../Components/Skeleton";

interface TimelineEntryProps {
    entry: VersionEntry;
    isLast: boolean;
    isSelected: boolean;
    onToggleSelection: () => void;
    versionState: string;
    showConnector: boolean;
    connectorProgress: number;
    connectorDuration?: number;
    isLoading?: boolean;
}

export const TimelineEntry: React.FC<TimelineEntryProps> = ({
    entry,
    isLast,
    isSelected,
    onToggleSelection,
    versionState,
    showConnector,
    connectorProgress,
    connectorDuration = 1400,
    isLoading = false
}) => {
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="grid grid-cols-[48px_1fr] gap-x-4">
            <div className="flex flex-col items-center">
                <div
                    className={`
                        flex items-center justify-center shadow-lg transition-all duration-500 z-10
                        ${versionState === 'done' ? 'size-10 rounded-full bg-emerald-500 text-white' : ''}
                        ${versionState === 'active' ? 'size-12 rounded-full bg-primary text-white ring-4 ring-primary/20 scale-110' : ''}
                        ${versionState === 'pending' ? 'size-10 rounded-full bg-slate-300 dark:bg-slate-700 text-slate-500 dark:text-slate-400 opacity-40' : ''}
                    `}
                >
                    <span className={`material-symbols-outlined text-xl ${versionState === 'active' ? 'animate-spin' : ''
                        }`}>
                        {versionState === 'done' && entry.icon !== 'flag' ? 'check' : versionState === 'active' ? 'progress_activity' : entry.icon}
                    </span>
                </div>
                {showConnector && (
                    <div className="relative w-[2px] h-full mt-2 bg-slate-200 dark:bg-slate-800">
                        <div
                            className="absolute top-0 left-0 w-full bg-primary"
                            style={{
                                height: `${connectorProgress}%`,
                                transition: connectorProgress === 0 ? 'none' : `height ${connectorDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
                            }}
                        />
                    </div>
                )}
            </div>

            <div className={`flex flex-col ${isLast ? '' : 'pb-12'}`}>
                <div className={`rounded-xl p-5 transition-all duration-500 ${versionState === 'active'
                    ? 'bg-white dark:bg-slate-800/50 border border-primary/50 shadow-xl shadow-primary/5'
                    : versionState === 'done'
                        ? 'bg-white dark:bg-slate-800/50 border border-emerald-500/30 shadow-lg shadow-emerald-500/5'
                        : 'bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800'
                    }`}>
                    <div className="flex flex-wrap justify-between items-start mb-3">
                        <div>
                            <div className="flex items-center gap-3">
                                <Skeleton isLoaded={!isLoading} width="220px" height="20px">
                                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                                        {entry.version} - {entry.title}
                                    </h3>
                                </Skeleton>
                                {versionState === 'active' && !isLoading && (
                                    <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20 animate-pulse">
                                        Running...
                                    </span>
                                )}
                                {versionState === 'done' && !isLoading && (
                                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-widest border border-emerald-500/20">
                                        Complete
                                    </span>
                                )}
                                {isLoading && (
                                    <Skeleton isLoaded={false} width="60px" height="18px" className="rounded" />
                                )}
                            </div>
                            <Skeleton isLoaded={!isLoading} width="120px" height="14px" className="mt-1">
                                <p className="text-slate-500 dark:text-slate-400 text-sm">
                                    {entry.releaseDate}
                                </p>
                            </Skeleton>
                        </div>
                        {!isLast && !isLoading && (
                            <div className="flex items-center gap-2">
                                <input
                                    checked={isSelected}
                                    onChange={onToggleSelection}
                                    className="form-checkbox rounded text-primary border-slate-300 dark:border-slate-700 bg-transparent focus:ring-primary h-5 w-5 cursor-pointer"
                                    type="checkbox"
                                />
                            </div>
                        )}
                        {isLoading && (
                            <Skeleton isLoaded={false} width="20px" height="20px" className="rounded" />
                        )}
                    </div>

                    {(versionState === 'active' || versionState === 'done' || isLoading) && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="space-y-1">
                                    <Skeleton isLoaded={!isLoading} width="60px" height="12px">
                                        <p className="text-slate-500 dark:text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                                            IPFS CID
                                        </p>
                                    </Skeleton>
                                    <Skeleton isLoaded={!isLoading} width="100%" height="28px" className="rounded-lg">
                                        <div
                                            className="flex items-center gap-2 group cursor-pointer"
                                            onClick={() => copyToClipboard(entry.ipfsCid)}
                                        >
                                            <code className="text-primary text-sm font-mono truncate">
                                                {entry.ipfsCid}
                                            </code>
                                            <span className="material-symbols-outlined text-slate-400 group-hover:text-primary text-sm">
                                                content_copy
                                            </span>
                                        </div>
                                    </Skeleton>
                                </div>
                                <div className="space-y-1">
                                    <Skeleton isLoaded={!isLoading} width="100px" height="12px">
                                        <p className="text-slate-500 dark:text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                                            Authorizing Wallet
                                        </p>
                                    </Skeleton>
                                    <Skeleton isLoaded={!isLoading} width="160px" height="24px" className="rounded-full">
                                        <div className="flex items-center gap-2">
                                            <div className={`size-5 rounded-full bg-gradient-to-br ${entry.walletGradient}`}></div>
                                            <p className="text-slate-700 dark:text-slate-300 text-sm font-medium">
                                                {entry.wallet}
                                            </p>
                                        </div>
                                    </Skeleton>
                                </div>
                            </div>

                            <Skeleton isLoaded={!isLoading} width="100%" height="60px" className="rounded-lg mb-4">
                                {entry.description && (
                                    <div className="bg-slate-100 dark:bg-slate-900/50 rounded-lg p-3 border border-slate-200 dark:border-slate-800">
                                        <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                                            {entry.description}
                                        </p>
                                    </div>
                                )}
                            </Skeleton>

                            <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800">
                                <Skeleton isLoaded={!isLoading} width="180px" height="16px">
                                    <div className="flex items-center gap-2 text-green-500">
                                        <span className="material-symbols-outlined text-lg">verified</span>
                                        <span className="text-xs font-bold">
                                            Anchored to Block {entry.blockNumber}
                                        </span>
                                    </div>
                                </Skeleton>
                                <Skeleton isLoaded={!isLoading} width="100px" height="16px">
                                    <button className="text-primary text-xs font-bold hover:underline">
                                        View Source Diff
                                    </button>
                                </Skeleton>
                            </div>
                        </>
                    )}

                    {versionState !== 'active' && !isLast && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <p className="text-slate-500 dark:text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                                        IPFS CID
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <code className="text-slate-600 dark:text-slate-400 text-sm font-mono truncate">
                                            {entry.ipfsCid}
                                        </code>
                                    </div>
                                </div>
                                <div className="flex items-center justify-end">
                                    <div className="flex items-center gap-2 text-slate-500">
                                        <span className="material-symbols-outlined text-lg">link</span>
                                        <span className="text-xs font-bold">Block {entry.blockNumber}</span>
                                    </div>
                                </div>
                            </div>

                            {entry.description && (
                                <div className="bg-slate-100 dark:bg-slate-900/50 rounded-lg p-3 mb-4 mt-4">
                                    <p className="text-slate-700 dark:text-slate-400 text-sm">
                                        {entry.description}
                                    </p>
                                </div>
                            )}

                            {entry.wallet && entry.description && (
                                <div className="flex items-center justify-between mt-4">
                                    <div className="flex items-center gap-2">
                                        <div className={`size-5 rounded-full bg-gradient-to-br ${entry.walletGradient}`}></div>
                                        <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">
                                            Auth: {entry.wallet}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-500">
                                        <span className="material-symbols-outlined text-lg">link</span>
                                        <span className="text-xs font-bold">Block {entry.blockNumber}</span>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TimelineEntry;
