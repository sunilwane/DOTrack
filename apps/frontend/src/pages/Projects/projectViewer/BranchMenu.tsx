import { SimpleTooltip } from '../../../Components/common/SimpleTooltip';
import type { Branch } from './types';

interface BranchMenuProps {
  branchListRef: React.RefObject<HTMLDivElement | null>;
  branches: Branch[];
  currentBranch: string;
  onWheel: (event: React.WheelEvent<HTMLDivElement>) => void;
  onBranchChange: (newBranch: string) => void;
}

const BranchMenu = ({
  branchListRef,
  branches,
  currentBranch,
  onWheel,
  onBranchChange,
}: BranchMenuProps) => (
  <div
    ref={branchListRef}
    data-lenis-prevent
    onWheel={onWheel}
    role="listbox"
    className="absolute left-0 mt-2 w-full min-w-[220px] max-h-72 overflow-y-auto custom-scrollbar rounded-lg border border-slate-700/80 bg-[#0b1220] shadow-xl z-30"
  >
    {branches.map((branch) => {
      const selected = branch.name === currentBranch;
      return (
        <SimpleTooltip
          key={branch.name}
          label={branch.name}
          placement="right"
          className="w-full text-xs"
        >
          <button
            type="button"
            role="option"
            aria-selected={selected}
            onClick={() => onBranchChange(branch.name)}
            className={`w-full text-left px-3 py-2 text-[11px] font-medium transition-colors ${
              selected
                ? 'bg-primary/20 text-slate-100'
                : 'text-slate-200 hover:bg-slate-700/40 hover:text-white'
            }`}
          >
            <span className="block truncate">{branch.name}</span>
          </button>
        </SimpleTooltip>
      );
    })}
  </div>
);

export default BranchMenu;
