import { SimpleTooltip } from '../../../Components/common/SimpleTooltip';
import BranchMenu from './BranchMenu';
import { useBranchSelector } from './useBranchSelector';

interface BranchSelectorProps {
  owner: string;
  repo: string;
  currentBranch: string;
}

const BranchSelector = ({ owner, repo, currentBranch }: BranchSelectorProps) => {
  const {
    loading,
    isOpen,
    setIsOpen,
    dropdownRef,
    branchListScrollRef,
    currentBranchLabel,
    visibleBranches,
    handleBranchChange,
    handleBranchListWheel,
  } = useBranchSelector({ owner, repo, currentBranch });

  return (
    <div ref={dropdownRef} className="relative">
      <SimpleTooltip
        label={currentBranchLabel}
        placement="bottom"
        className="w-[220px] sm:w-[260px] max-w-[260px]"
      >
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          disabled={loading}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className="w-full flex items-center justify-between gap-2 bg-[#111827] border border-slate-700/80 px-3 py-1.5 rounded-lg shadow-sm text-slate-100 hover:border-primary/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 disabled:opacity-60"
        >
          <span className="flex items-center gap-2 min-w-0">
            <span className="material-symbols-outlined text-base text-primary">fork_right</span>
            <span className="text-[11px] font-medium block truncate w-[130px] sm:w-[160px]">
              {currentBranchLabel}
            </span>
          </span>
          <span className="material-symbols-outlined text-base text-slate-300">
            {isOpen ? 'expand_less' : 'expand_more'}
          </span>
        </button>
      </SimpleTooltip>

      {isOpen && (
        <BranchMenu
          branchListRef={branchListScrollRef}
          branches={visibleBranches}
          currentBranch={currentBranch}
          onWheel={handleBranchListWheel}
          onBranchChange={handleBranchChange}
        />
      )}
    </div>
  );
};

export default BranchSelector;
