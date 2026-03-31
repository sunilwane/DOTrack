import { Skeleton } from '../../../Components/Skeleton';

interface VersionHistoryHeaderProps {
  isLoading: boolean;
  selectedCount: number;
}

const VersionHistoryHeader = ({ isLoading, selectedCount }: VersionHistoryHeaderProps) => (
  <>
    <div className="flex flex-wrap gap-2 px-6 py-4">
      <Skeleton isLoaded={!isLoading} width="60px" height="14px">
        <a
          className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal hover:text-primary cursor-pointer"
          href="#"
        >
          Pipelines
        </a>
      </Skeleton>
      <span className="text-slate-400 text-sm font-medium leading-normal">/</span>
      <Skeleton isLoaded={!isLoading} width="100px" height="14px">
        <a
          className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal hover:text-primary cursor-pointer"
          href="#"
        >
          Pipeline Alpha
        </a>
      </Skeleton>
      <span className="text-slate-400 text-sm font-medium leading-normal">/</span>
      <Skeleton isLoaded={!isLoading} width="120px" height="14px">
        <span className="text-slate-900 dark:text-white text-sm font-bold leading-normal">
          Version History
        </span>
      </Skeleton>
    </div>

    <div className="flex flex-wrap justify-between items-end gap-3 px-6 py-4">
      <div className="flex min-w-72 flex-col gap-2">
        <Skeleton isLoaded={!isLoading} width="180px" height="28px">
          <p className="text-slate-900 dark:text-white text-xl font-black leading-tight tracking-[-0.033em]">
            Version History
          </p>
        </Skeleton>
        <Skeleton isLoaded={!isLoading} width="100%" height="16px" className="max-w-md">
          <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal text-sm">
            Immutable timeline of pipeline manifests anchored to blockchain.
          </p>
        </Skeleton>
      </div>
      <div className="flex gap-3">
        <Skeleton isLoaded={!isLoading} width="100px" height="40px" className="rounded-lg">
          <button className="flex min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-slate-100 dark:hover:bg-slate-700">
            <span className="material-symbols-outlined mr-2 text-lg">filter_list</span>
            <span className="truncate text-sm">Filter</span>
          </button>
        </Skeleton>
        <Skeleton isLoaded={!isLoading} width="160px" height="40px" className="rounded-lg">
          <button
            className="flex min-w-[140px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary/20 text-primary text-sm font-bold leading-normal tracking-[0.015em] border border-primary/30 hover:bg-primary/30"
            disabled={selectedCount < 2}
          >
            <span className="material-symbols-outlined mr-2 text-lg">compare_arrows</span>
            <span className="truncate text-sm">Compare Selected</span>
          </button>
        </Skeleton>
      </div>
    </div>
  </>
);

export default VersionHistoryHeader;
