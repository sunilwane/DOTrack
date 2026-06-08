interface FileExplorerSearchProps {
  filterQuery: string;
  onFilterQueryChange: (value: string) => void;
}

const FileExplorerSearch = ({
  filterQuery,
  onFilterQueryChange,
}: FileExplorerSearchProps) => (
  <div className="p-4 border-b border-slate-200 dark:border-slate-800">
    <div className="relative">
      <input
        value={filterQuery}
        onChange={(event) => onFilterQueryChange(event.target.value)}
        placeholder="Filter files..."
        className="w-full pl-3 pr-3 py-1.5 bg-slate-100 dark:bg-white/5 border-none rounded-md text-xs"
      />
    </div>
  </div>
);

export default FileExplorerSearch;
