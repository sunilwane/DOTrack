import FileExplorerSearch from './FileExplorerSearch';
import FileTree from './FileTree';
import { useFileExplorerTree } from './useFileExplorerTree';

interface FileExplorerProps {
  owner: string;
  repo: string;
  branch: string;
  width: number;
}

const FileExplorer = ({ owner, repo, branch, width }: FileExplorerProps) => {
  const {
    state,
    treeScrollRef,
    currentPath,
    normalizedFilter,
    expandedDirs,
    loadingDirs,
    error,
    filterQuery,
    setFilterQuery,
    toggleDirectory,
    handleFileClick,
    handleTreeWheel,
  } = useFileExplorerTree({ owner, repo, branch });

  return (
    <aside
      className="border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c0c0c] flex flex-col shrink-0"
      style={{ width: `${width}px` }}
    >
      <FileExplorerSearch filterQuery={filterQuery} onFilterQueryChange={setFilterQuery} />

      <div
        ref={treeScrollRef}
        data-lenis-prevent
        onWheel={handleTreeWheel}
        className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden py-2 custom-scrollbar"
      >
        {error ? (
          <div className="p-4 text-xs text-red-400">{error}</div>
        ) : (
          <div className="space-y-0.5">
            <FileTree
              parentPath=""
              treeCache={state.treeCache}
              normalizedFilter={normalizedFilter}
              expandedDirs={expandedDirs}
              loadingDirs={loadingDirs}
              currentPath={currentPath}
              onToggleDirectory={toggleDirectory}
              onFileClick={handleFileClick}
            />
          </div>
        )}
      </div>
    </aside>
  );
};

export default FileExplorer;
