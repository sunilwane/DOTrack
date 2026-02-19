import type { TreeEntry } from './types';

interface FileTreeProps {
  parentPath: string;
  level?: number;
  treeCache: Map<string, TreeEntry[]>;
  normalizedFilter: string;
  expandedDirs: Set<string>;
  loadingDirs: Set<string>;
  currentPath: string;
  onToggleDirectory: (path: string) => void;
  onFileClick: (path: string) => void;
}

const FileTree = ({
  parentPath,
  level = 0,
  treeCache,
  normalizedFilter,
  expandedDirs,
  loadingDirs,
  currentPath,
  onToggleDirectory,
  onFileClick,
}: FileTreeProps) => {
  const allEntries = treeCache.get(parentPath) || [];
  const entries = normalizedFilter
    ? allEntries.filter((entry) => entry.name.toLowerCase().includes(normalizedFilter))
    : allEntries;

  return (
    <>
      {entries.map((entry) => {
        const isExpanded = expandedDirs.has(entry.path);
        const isSelected = currentPath === entry.path;
        const isLoading = loadingDirs.has(entry.path);

        if (entry.type === 'dir') {
          return (
            <div key={entry.path}>
              <div
                className={`group flex items-center gap-2 px-4 py-1 hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer ${
                  isSelected ? 'bg-primary/10 border-r-2 border-primary' : ''
                }`}
                style={{ paddingLeft: `${level * 12 + 16}px` }}
                onClick={() => onToggleDirectory(entry.path)}
              >
                <span className="material-symbols-outlined text-sm leading-none text-slate-400">
                  {isLoading ? 'sync' : isExpanded ? 'expand_more' : 'chevron_right'}
                </span>
                <span className="material-symbols-outlined text-sm leading-none text-amber-400">
                  folder
                </span>
                <span className="text-xs font-medium">{entry.name}</span>
              </div>
              {isExpanded && (
                <FileTree
                  parentPath={entry.path}
                  level={level + 1}
                  treeCache={treeCache}
                  normalizedFilter={normalizedFilter}
                  expandedDirs={expandedDirs}
                  loadingDirs={loadingDirs}
                  currentPath={currentPath}
                  onToggleDirectory={onToggleDirectory}
                  onFileClick={onFileClick}
                />
              )}
            </div>
          );
        }

        return (
          <div
            key={entry.path}
            className={`group flex items-center gap-2 px-4 py-1 hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer ${
              isSelected ? 'bg-primary/10 border-r-2 border-primary' : ''
            }`}
            style={{ paddingLeft: `${level * 12 + 16}px` }}
            onClick={() => onFileClick(entry.path)}
          >
            <span className="material-symbols-outlined text-sm leading-none opacity-0">
              chevron_right
            </span>
            <span className="material-symbols-outlined text-sm leading-none text-slate-400">
              description
            </span>
            <span className={`text-xs font-medium ${isSelected ? 'text-primary font-bold' : ''}`}>
              {entry.name}
            </span>
          </div>
        );
      })}
    </>
  );
};

export default FileTree;
