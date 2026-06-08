interface VersionSelectionBarProps {
  selectedVersions: string[];
  onClear: () => void;
}

const VersionSelectionBar = ({ selectedVersions, onClear }: VersionSelectionBarProps) => {
  if (selectedVersions.length === 0) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-xl px-4 z-[100]">
      <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-2xl p-4 shadow-2xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex -space-x-3">
            {selectedVersions.map((version, index) => (
              <div
                key={version}
                className={`size-8 rounded-lg flex items-center justify-center text-[10px] font-bold text-white ring-2 ring-slate-900 ${
                  index === 0 ? 'bg-primary' : 'bg-slate-700'
                }`}
              >
                {version}
              </div>
            ))}
          </div>
          <p className="text-sm font-medium text-white hidden sm:block">
            {selectedVersions.length} Version{selectedVersions.length !== 1 ? 's' : ''} selected
            for comparison
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onClear}
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
  );
};

export default VersionSelectionBar;
