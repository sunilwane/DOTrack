import type { VersionEntry } from '../../../mock/PagesMockData/versionHistory';
import { Skeleton } from '../../../Components/Skeleton';

interface TimelineExpandedDetailsProps {
  entry: VersionEntry;
  isLoading: boolean;
  onCopyCid: () => void;
}

const TimelineExpandedDetails = ({
  entry,
  isLoading,
  onCopyCid,
}: TimelineExpandedDetailsProps) => (
  <>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div className="space-y-1">
        <Skeleton isLoaded={!isLoading} width="60px" height="12px">
          <p className="text-slate-500 dark:text-slate-500 text-[11px] font-bold uppercase tracking-wider">
            IPFS CID
          </p>
        </Skeleton>
        <Skeleton isLoaded={!isLoading} width="100%" height="28px" className="rounded-lg">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={onCopyCid}>
            <code className="text-primary text-sm font-mono truncate">{entry.ipfsCid}</code>
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
            <div className={`size-5 rounded-full bg-gradient-to-br ${entry.walletGradient}`} />
            <p className="text-slate-700 dark:text-slate-300 text-sm font-medium">{entry.wallet}</p>
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
          <span className="text-xs font-bold">Anchored to Block {entry.blockNumber}</span>
        </div>
      </Skeleton>
      <Skeleton isLoaded={!isLoading} width="100px" height="16px">
        <button className="text-primary text-xs font-bold hover:underline">View Source Diff</button>
      </Skeleton>
    </div>
  </>
);

export default TimelineExpandedDetails;
