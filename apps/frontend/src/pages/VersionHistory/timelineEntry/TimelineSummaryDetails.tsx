import type { VersionEntry } from '../../../mock/PagesMockData/versionHistory';

interface TimelineSummaryDetailsProps {
  entry: VersionEntry;
}

const TimelineSummaryDetails = ({ entry }: TimelineSummaryDetailsProps) => (
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
        <p className="text-slate-700 dark:text-slate-400 text-sm">{entry.description}</p>
      </div>
    )}

    {entry.wallet && entry.description && (
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <div className={`size-5 rounded-full bg-gradient-to-br ${entry.walletGradient}`} />
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
);

export default TimelineSummaryDetails;
