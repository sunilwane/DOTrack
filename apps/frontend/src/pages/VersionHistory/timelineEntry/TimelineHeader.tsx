import type { VersionEntry } from '../../../mock/PagesMockData/versionHistory';
import { Skeleton } from '../../../Components/Skeleton';
import type { VersionState } from './status';

interface TimelineHeaderProps {
  entry: VersionEntry;
  versionState: VersionState;
  isLast: boolean;
  isSelected: boolean;
  onToggleSelection: () => void;
  isLoading: boolean;
}

const TimelineHeader = ({
  entry,
  versionState,
  isLast,
  isSelected,
  onToggleSelection,
  isLoading,
}: TimelineHeaderProps) => (
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
        {isLoading && <Skeleton isLoaded={false} width="60px" height="18px" className="rounded" />}
      </div>
      <Skeleton isLoaded={!isLoading} width="120px" height="14px" className="mt-1">
        <p className="text-slate-500 dark:text-slate-400 text-sm">{entry.releaseDate}</p>
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
    {isLoading && <Skeleton isLoaded={false} width="20px" height="20px" className="rounded" />}
  </div>
);

export default TimelineHeader;
