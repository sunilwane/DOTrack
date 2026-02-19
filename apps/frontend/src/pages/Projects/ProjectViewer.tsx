import { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { RepoStateProvider, useRepoState } from '../../contexts/RepoState';
import { SimpleTooltip } from '../../Components/common/SimpleTooltip';
import { authService } from '../../services/authService';
import { buildApiUrl } from '../../services/apiClient';

interface Highlighter {
  codeToHtml(code: string, options: { lang?: string }): string;
}

interface TreeEntry {
  name: string;
  path: string;
  type: string;
  size?: number;
  sha?: string;
}

interface Branch {
  name: string;
  commit?: string;
}

const buildGithubRequestOptions = (): RequestInit => {
  const token = authService.getAccessToken();
  return {
    credentials: 'include',
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  };
};

const buildGithubApiUrl = (owner: string, repo: string, suffix: string): string =>
  buildApiUrl(
    `/api/github/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}${suffix}`
  );

const FileExplorer = ({
  owner,
  repo,
  branch,
  width,
}: {
  owner: string;
  repo: string;
  branch: string;
  width: number;
}) => {
  const { state, dispatch } = useRepoState();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [expandedDirs, setExpandedDirs] = useState<Set<string>>(new Set(['']));
  const [loadingDirs, setLoadingDirs] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);
  const treeScrollRef = useRef<HTMLDivElement | null>(null);

  const currentPath = searchParams.get('path') || '';

  const loadDirectory = useCallback(async (dirPath: string): Promise<void> => {
    if (state.treeCache.has(dirPath)) return;
    setLoadingDirs((prev) => new Set(prev).add(dirPath));
    setError(null);
    try {
      const res = await fetch(
        buildApiUrl(`/api/github/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/tree?ref=${encodeURIComponent(branch)}&path=${encodeURIComponent(dirPath)}`),
        buildGithubRequestOptions()
      );
      if (res.status === 403) {
        setError('Insufficient access - please connect GitHub');
        return;
      }
      if (res.status === 404) {
        // cache empty so UI shows empty directory instead of error
        dispatch({ type: 'cacheTree', path: dirPath, entries: [] });
        return;
      }
      if (!res.ok) {
        const text = await res.text().catch(() => '');
        console.error('Failed loading tree', { status: res.status, statusText: res.statusText, body: text });
        setError(`Failed to load directory (${res.status}): ${text || res.statusText}`);
        return;
      }
      const json = await res.json() as { entries?: TreeEntry[] };
      dispatch({ type: 'cacheTree', path: dirPath, entries: json.entries || [] });
    } catch (err) {
      console.error('Error loading directory', err);
      setError('Failed to load directory');
    } finally {
      setLoadingDirs((prev) => {
        const next = new Set(prev);
        next.delete(dirPath);
        return next;
      });
    }
  }, [owner, repo, branch, state.treeCache, dispatch]);

  useEffect(() => {
    if (owner && repo) {
      void loadDirectory('');
    }
  }, [owner, repo, branch, loadDirectory]);

  const toggleDirectory = (path: string) => {
    if (expandedDirs.has(path)) {
      setExpandedDirs((prev) => {
        const next = new Set(prev);
        next.delete(path);
        return next;
      });
    } else {
      setExpandedDirs((prev) => new Set(prev).add(path));
      void loadDirectory(path);
    }
  };

  const handleFileClick = (path: string) => {
    navigate(`/projects/${owner}/${repo}?ref=${encodeURIComponent(branch)}&path=${encodeURIComponent(path)}`);
  };

  const handleTreeWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const el = treeScrollRef.current;
    if (!el) return;

    event.preventDefault();
    event.stopPropagation();

    if (el.scrollHeight <= el.clientHeight) {
      return;
    }

    const maxTop = el.scrollHeight - el.clientHeight;
    const nextTop = Math.max(0, Math.min(maxTop, el.scrollTop + event.deltaY));
    el.scrollTop = nextTop;
  };

  const renderTree = (parentPath: string, level = 0): React.ReactNode => {
    const entries = state.treeCache.get(parentPath) || [];
    return entries.map((entry) => {
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
              onClick={() => toggleDirectory(entry.path)}
            >
              <span className="material-symbols-outlined text-sm leading-none text-slate-400">
                {isLoading ? 'sync' : isExpanded ? 'expand_more' : 'chevron_right'}
              </span>
              <span className="material-symbols-outlined text-sm leading-none text-amber-400">folder</span>
              <span className="text-xs font-medium">{entry.name}</span>
            </div>
            {isExpanded && renderTree(entry.path, level + 1)}
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
          onClick={() => handleFileClick(entry.path)}
        >
          <span className="material-symbols-outlined text-sm leading-none opacity-0">chevron_right</span>
          <span className="material-symbols-outlined text-sm leading-none text-slate-400">description</span>
          <span className={`text-xs font-medium ${isSelected ? 'text-primary font-bold' : ''}`}>
            {entry.name}
          </span>
        </div>
      );
    });
  };

  return (
    <aside
      className="border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c0c0c] flex flex-col shrink-0"
      style={{ width: `${width}px` }}
    >
      <div className="p-4 border-b border-slate-200 dark:border-slate-800">
        <div className="relative">
          <input
            placeholder="Filter files..."
            className="w-full pl-3 pr-3 py-1.5 bg-slate-100 dark:bg-white/5 border-none rounded-md text-xs"
          />
        </div>
      </div>
      <div
        ref={treeScrollRef}
        data-lenis-prevent
        onWheel={handleTreeWheel}
        className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden py-2 custom-scrollbar"
      >
        {error ? (
          <div className="p-4 text-xs text-red-400">{error}</div>
        ) : (
          <div className="space-y-0.5">{renderTree('')}</div>
        )}
      </div>
    </aside>
  );
};

// Shiki highlighter singleton (lazy)
let shikiHighlighter: Highlighter | null = null;
let shikiLoader: Promise<Highlighter | null> | null = null;
let shikiConfigured = false;

const getHighlighter = async (): Promise<Highlighter | null> => {
  if (shikiHighlighter) return shikiHighlighter;
  if (!shikiLoader) {
    // dynamically import shiki to keep bundle small
    shikiLoader = (import('shiki') as Promise<{
      getHighlighter: (opts: { theme: string }) => Promise<Highlighter>;
      setCDN?: (cdn: string) => void;
    }>)
      .then((shiki) => {
        if (!shikiConfigured && typeof shiki.setCDN === 'function') {
          // Absolute CDN base avoids nested-route relative path failures.
          shiki.setCDN('https://cdn.jsdelivr.net/npm/shiki@0.13.0/');
          shikiConfigured = true;
        }
        return shiki.getHighlighter({ theme: 'dark-plus' });
      })
      .then((h: Highlighter) => {
        shikiHighlighter = h;
        return h;
      })
      .catch((err) => {
        console.error('Failed to initialize Shiki highlighter', err);
        return null;
      });
  }
  return shikiLoader;
};

function getLanguageFromPath(path: string): string {
  const fileName = path.split('/').pop()?.toLowerCase() || '';
  const byName: Record<string, string> = {
    dockerfile: 'dockerfile',
    makefile: 'make',
    '.gitignore': 'plaintext',
    '.npmrc': 'ini',
    '.env': 'bash',
  };

  if (byName[fileName]) return byName[fileName];

  const idx = fileName.lastIndexOf('.');
  if (idx === -1) return 'plaintext';
  const ext = fileName.slice(idx + 1).toLowerCase();
  const map: Record<string, string> = {
    ts: 'typescript',
    tsx: 'tsx',
    mts: 'typescript',
    cts: 'typescript',
    js: 'javascript',
    jsx: 'jsx',
    mjs: 'javascript',
    cjs: 'javascript',
    py: 'python',
    go: 'go',
    java: 'java',
    rs: 'rust',
    c: 'c',
    h: 'c',
    cpp: 'cpp',
    hpp: 'cpp',
    css: 'css',
    scss: 'scss',
    html: 'html',
    xml: 'xml',
    sh: 'bash',
    bash: 'bash',
    zsh: 'bash',
    yml: 'yaml',
    yaml: 'yaml',
    toml: 'toml',
    ini: 'ini',
    json: 'json',
    lock: 'json',
    md: 'markdown',
    mdx: 'markdown',
    sql: 'sql',
  };
  return map[ext] || 'plaintext';
}

const CodeViewer = () => {
  const { state } = useRepoState();
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [highlightedHtml, setHighlightedHtml] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isBinary, setIsBinary] = useState(false);
  const [isLarge, setIsLarge] = useState(false);
  const codeScrollRef = useRef<HTMLDivElement | null>(null);

  const handleCodeWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const el = codeScrollRef.current;
    if (!el) return;

    // Keep native vertical scrolling, but handle explicit horizontal gestures here
    // so long lines are reachable even when nested smooth-scroll is active.
    const horizontalDelta = event.deltaX !== 0 ? event.deltaX : event.shiftKey ? event.deltaY : 0;
    if (horizontalDelta === 0) return;

    event.preventDefault();
    event.stopPropagation();

    const maxLeft = Math.max(0, el.scrollWidth - el.clientWidth);
    if (maxLeft === 0) return;
    const nextLeft = Math.max(0, Math.min(maxLeft, el.scrollLeft + horizontalDelta));
    el.scrollLeft = nextLeft;
  };

  const loadFile = useCallback(async () => {
    if (!state.owner || !state.repo || !state.path) {
      setContent(null);
      setHighlightedHtml(null);
      setError(null);
      setIsBinary(false);
      setIsLarge(false);
      return;
    }
    setLoading(true);
    setError(null);
    setIsBinary(false);
    setIsLarge(false);
    try {
      const res = await fetch(
        buildApiUrl(`/api/github/${encodeURIComponent(state.owner)}/${encodeURIComponent(state.repo)}/file?ref=${encodeURIComponent(state.branch)}&path=${encodeURIComponent(state.path)}`),
        buildGithubRequestOptions()
      );
      if (res.status === 403) {
        setError('Insufficient access - please connect GitHub');
        return;
      }
      if (res.status === 404) {
        setError('File not found');
        return;
      }
      if (!res.ok) {
        const text = await res.text().catch(() => '');
        console.error('Failed loading file', { status: res.status, body: text });
        setError(`Failed to load file (${res.status}): ${text || res.statusText}`);
        return;
      }
      const json = await res.json() as { file?: { content?: string; size?: number; encoding?: string } };
      const file = json.file;
      const raw = file?.content || null;
      
      // Check if binary
      if (file?.encoding && file.encoding !== 'base64' && file.encoding !== 'utf-8') {
        setIsBinary(true);
        return;
      }
      
      setContent(raw);

      // handle large files: if > 200KB skip highlighting
      if (raw && raw.length > 200 * 1024) {
        setIsLarge(true);
        setHighlightedHtml(null);
      } else if (raw) {
        const highlighter = await getHighlighter();
        if (highlighter) {
          const lang = getLanguageFromPath(state.path || '');
          try {
            const html = highlighter.codeToHtml(raw, { lang });
            setHighlightedHtml(html);
          } catch {
            try {
              const html = highlighter.codeToHtml(raw, { lang: 'plaintext' });
              setHighlightedHtml(html);
            } catch {
              setHighlightedHtml(null);
            }
          }
        } else {
          setHighlightedHtml(null);
        }
      } else {
        setHighlightedHtml(null);
      }
    } catch {
      setError('Failed to load file');
      setContent(null);
      setHighlightedHtml(null);
    } finally {
      setLoading(false);
    }
  }, [state.owner, state.repo, state.branch, state.path]);

  useEffect(() => {
    void loadFile();
  }, [loadFile]);

  return (
    <main className="flex-1 flex flex-col bg-[#0d1117] text-white" style={{ minWidth: 0, maxWidth: '100%', overflow: 'hidden' }}>
      <div className="px-6 py-3 border-b border-slate-800 bg-[#0d1117] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-sm">{state.path || 'No file selected'}</h2>
        </div>
        {state.path && (
          <div className="text-xs text-slate-500">
            {isLarge && 'Large file | '}{isBinary && 'Binary file'}
          </div>
        )}
      </div>
      <div
        ref={codeScrollRef}
        data-lenis-prevent
        onWheel={handleCodeWheel}
        className="project-viewer-code-panel flex-1 min-h-0"
        style={{ width: '100%', maxWidth: '100%' }}
      >
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-slate-400 text-sm">Loading file...</div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-red-400 text-sm mb-2">{error}</div>
              {error.includes('Insufficient access') && (
                <button className="px-4 py-2 bg-primary text-white rounded-md text-xs">
                  Connect GitHub
                </button>
              )}
            </div>
          </div>
        ) : isBinary ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-slate-400 text-sm">Cannot preview binary file</div>
          </div>
        ) : isLarge ? (
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <div className="text-slate-400 text-sm">File is too large to preview ({Math.round((content?.length || 0) / 1024)}KB)</div>
            <button className="px-4 py-2 bg-slate-700 text-white rounded-md text-xs hover:bg-slate-600">
              View Raw
            </button>
          </div>
        ) : highlightedHtml ? (
          <div className="project-viewer-code">
            <div className="project-viewer-code-content" dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
          </div>
        ) : content ? (
          <pre className="code-font m-0 w-max min-w-full min-h-full px-4 py-3 text-xs leading-[1.35] whitespace-pre">{content}</pre>
        ) : (
          <div className="flex items-center justify-center h-full text-slate-400 text-sm">
            Select a file to view its contents
          </div>
        )}
      </div>
    </main>
  );
};

const BranchSelector = ({ owner, repo, currentBranch }: { owner: string; repo: string; currentBranch: string }) => {
  const navigate = useNavigate();
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const branchListScrollRef = useRef<HTMLDivElement | null>(null);
  const currentBranchLabel = currentBranch || 'default';

  useEffect(() => {
    const loadBranches = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          buildApiUrl(`/api/github/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/branches`),
          buildGithubRequestOptions()
        );
        if (res.ok) {
          const json = await res.json() as { branches?: Branch[] };
          const loaded = json.branches || [];
          setBranches(loaded);

          // If the current branch (from URL) isn't present, switch to the repo's first branch
          if (loaded.length > 0 && !loaded.find((b) => b.name === currentBranch)) {
            const first = loaded[0].name;
            // navigate to first branch (clears path)
            navigate(`/projects/${owner}/${repo}?ref=${encodeURIComponent(first)}`);
            return;
          }
        } else {
          const text = await res.text().catch(() => '');
          console.error('Failed loading branches', { status: res.status, body: text });
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    };
    if (owner && repo) {
      void loadBranches();
    }
  }, [owner, repo, currentBranch, navigate]);

  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('mousedown', handleOutsideClick);
    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleBranchChange = (newBranch: string) => {
    setIsOpen(false);
    navigate(`/projects/${owner}/${repo}?ref=${encodeURIComponent(newBranch)}`);
  };

  const handleBranchListWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const el = branchListScrollRef.current;
    if (!el) return;

    event.preventDefault();
    event.stopPropagation();

    if (el.scrollHeight <= el.clientHeight) {
      return;
    }

    const maxTop = el.scrollHeight - el.clientHeight;
    const nextTop = Math.max(0, Math.min(maxTop, el.scrollTop + event.deltaY));
    el.scrollTop = nextTop;
  };

  const visibleBranches = branches.length > 0 ? branches : [{ name: currentBranchLabel }];

  return (
    <div ref={dropdownRef} className="relative">
      <SimpleTooltip label={currentBranchLabel} placement="bottom" className="w-[220px] sm:w-[260px] max-w-[260px]">
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
            <span className="text-[11px] font-medium block truncate w-[130px] sm:w-[160px]">{currentBranchLabel}</span>
          </span>
          <span className="material-symbols-outlined text-base text-slate-300">
            {isOpen ? 'expand_less' : 'expand_more'}
          </span>
        </button>
      </SimpleTooltip>
      {isOpen && (
        <div
          ref={branchListScrollRef}
          data-lenis-prevent
          onWheel={handleBranchListWheel}
          role="listbox"
          className="absolute left-0 mt-2 w-full min-w-[220px] max-h-72 overflow-y-auto custom-scrollbar rounded-lg border border-slate-700/80 bg-[#0b1220] shadow-xl z-30"
        >
          {visibleBranches.map((branch) => {
            const selected = branch.name === currentBranch;
            return (
              <SimpleTooltip key={branch.name} label={branch.name} placement="right" className="w-full text-xs">
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => handleBranchChange(branch.name)}
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
      )}
    </div>
  );
};

const Inner = () => {
  const params = useParams<{ owner?: string; repo?: string }>();
  const [search] = useSearchParams();
  const owner = params.owner || '';
  const repo = params.repo || '';
  const ref = search.get('ref') || '';
  const path = search.get('path') || '';
  const { state, dispatch } = useRepoState();
  const prevBranch = state.branch;
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

  // Clear caches when branch changes
  useEffect(() => {
    if (prevBranch && prevBranch !== ref) {
      dispatch({ type: 'clearCaches' });
    }
  }, [ref, prevBranch, dispatch]);

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (event: MouseEvent) => {
      const active = resizeStateRef.current;
      if (!active) return;

      const delta = event.clientX - active.startX;
      const max = Math.min(window.innerWidth * 0.65, 760);
      const next = Math.max(240, Math.min(max, active.startWidth + delta));
      setSidebarWidth(next);
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
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>
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

const ProjectViewerWrapper = () => (
  <RepoStateProvider>
    <Inner />
  </RepoStateProvider>
);

export default ProjectViewerWrapper;
