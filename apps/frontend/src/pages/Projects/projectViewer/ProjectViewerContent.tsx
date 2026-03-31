import { useEffect, useRef, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useRepoState } from '../../../contexts/useRepoState';
import BranchSelector from './BranchSelector';
import CodeViewer from './CodeViewer';
import FileExplorer from './FileExplorer';

const ProjectViewerContent = () => {
  const params = useParams<{ owner?: string; repo?: string }>();
  const [search] = useSearchParams();
  const owner = params.owner || '';
  const repo = params.repo || '';
  const ref = search.get('ref') || '';
  const path = search.get('path') || '';
  const { state, dispatch } = useRepoState();
  const previousBranch = state.branch;
  const [sidebarWidth, setSidebarWidth] = useState(320);
  const [isResizing, setIsResizing] = useState(false);
  const resizeStateRef = useRef<{ startX: number; startWidth: number } | null>(null);

  useEffect(() => {
    if (owner && repo) {
      dispatch({ type: 'setRepo', owner, repo });
    }
  }, [owner, repo, dispatch]);

  useEffect(() => {
    dispatch({ type: 'setBranch', branch: ref });
  }, [ref, dispatch]);

  useEffect(() => {
    dispatch({ type: 'setPath', path });
  }, [path, dispatch]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    if (previousBranch && previousBranch !== ref) {
      dispatch({ type: 'clearCaches' });
    }
  }, [ref, previousBranch, dispatch]);

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (event: MouseEvent) => {
      const activeResize = resizeStateRef.current;
      if (!activeResize) return;

      const delta = event.clientX - activeResize.startX;
      const maxWidth = Math.min(window.innerWidth * 0.65, 760);
      const nextWidth = Math.max(
        240,
        Math.min(maxWidth, activeResize.startWidth + delta)
      );
      setSidebarWidth(nextWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      resizeStateRef.current = null;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  const startResizing = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    resizeStateRef.current = { startX: event.clientX, startWidth: sidebarWidth };
    setIsResizing(true);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  return (
    <div className="flex flex-col h-full min-h-0 overflow-hidden">
      <header className="h-16 shrink-0 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0a0a0a] flex items-center justify-between px-6 z-10">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-lg text-amber-400">folder</span>
            <h1 className="font-bold text-lg tracking-tight">{repo}</h1>
          </div>
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-2" />
          <BranchSelector owner={owner} repo={repo} currentBranch={ref} />
        </div>
      </header>
      <div className="flex flex-1 min-h-0 min-w-0 overflow-hidden">
        <FileExplorer owner={owner} repo={repo} branch={ref} width={sidebarWidth} />
        <div
          role="separator"
          aria-orientation="vertical"
          aria-label="Resize explorer and code panes"
          onMouseDown={startResizing}
          className={`w-1 shrink-0 cursor-col-resize transition-colors ${
            isResizing ? 'bg-primary' : 'bg-slate-300/30 hover:bg-primary/70'
          }`}
        />
        <CodeViewer />
      </div>
    </div>
  );
};

export default ProjectViewerContent;
