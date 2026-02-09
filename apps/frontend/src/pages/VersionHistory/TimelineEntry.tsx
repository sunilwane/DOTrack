import * as React from "react";
import type { VersionEntry } from "../../mock/PagesMockData/versionHistory";

interface TimelineEntryProps {
    entry: VersionEntry;
    isLast: boolean;
    isSelected: boolean;
    onToggleSelection: () => void;
    versionState: string;
    showConnector: boolean;
    connectorState: string;
}

export const TimelineEntry: React.FC<TimelineEntryProps> = ({ entry, isLast, isSelected, onToggleSelection, versionState, showConnector, connectorState }) => {
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
                    <span className={`material-symbols-outlined text-xl ${
                        versionState === 'active' ? 'animate-spin' : ''
                    }`}>
                        {versionState === 'done' && entry.icon !== 'flag' ? 'check' : versionState === 'active' ? 'progress_activity' : entry.icon}
                    </span>
                </div>
                {showConnector && (
                    <div className={`w-[2px] h-full mt-2 transition-all duration-1000 ${
                        connectorState === 'done' ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-800'
                    }`}></div>
                )}
            </div>

            <div className={`flex flex-col ${isLast ? '' : 'pb-12'}`}>
                <div className={`rounded-xl p-5 transition-all duration-500 ${
                    versionState === 'active'
                        ? 'bg-white dark:bg-slate-800/50 border border-primary/50 shadow-xl shadow-primary/5' 
                        : versionState === 'done'
                        ? 'bg-white dark:bg-slate-800/50 border border-emerald-500/30 shadow-lg shadow-emerald-500/5'
                        : 'bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800'
                }`}>
                    <div className="flex flex-wrap justify-between items-start mb-3">
                        <div>
                            <div className="flex items-center gap-3">
                                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                                    {entry.version} - {entry.title}
                                </h3>
                                {versionState === 'active' && (
                                    <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20 animate-pulse">
                                        Running...
                                    </span>
                                )}
                                {versionState === 'done' && (
                                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-widest border border-emerald-500/20">
                                        Complete
                                    </span>
                                )}
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                                {entry.releaseDate}
                            </p>
                        </div>
                        {!isLast && (
                            <div className="flex items-center gap-2">
                                <input 
                                    checked={isSelected}
                                    onChange={onToggleSelection}
                                    className="form-checkbox rounded text-primary border-slate-300 dark:border-slate-700 bg-transparent focus:ring-primary h-5 w-5 cursor-pointer" 
                                    type="checkbox"
                                />
                            </div>
                        )}
                    </div>

                    {(versionState === 'active' || versionState === 'done') && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="space-y-1">
                                    <p className="text-slate-500 dark:text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                                        IPFS CID
                                    </p>
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
                                </div>
                                <div className="space-y-1">
                                    <p className="text-slate-500 dark:text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                                        Authorizing Wallet
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <div className={`size-5 rounded-full bg-gradient-to-br ${entry.walletGradient}`}></div>
                                        <p className="text-slate-700 dark:text-slate-300 text-sm font-medium">
                                            {entry.wallet}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {entry.description && (
                                <div className="mb-4 bg-slate-100 dark:bg-slate-900/50 rounded-lg p-3 border border-slate-200 dark:border-slate-800">
                                    <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                                        {entry.description}
                                    </p>
                                </div>
                            )}

                            <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800">
                                <div className="flex items-center gap-2 text-green-500">
                                    <span className="material-symbols-outlined text-lg">verified</span>
                                    <span className="text-xs font-bold">
                                        Anchored to Block {entry.blockNumber}
                                    </span>
                                </div>
                                <button className="text-primary text-xs font-bold hover:underline">
                                    View Source Diff
                                </button>
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
