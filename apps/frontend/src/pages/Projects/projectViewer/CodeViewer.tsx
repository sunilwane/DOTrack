import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRepoState } from '../../../contexts/useRepoState';
import { useCodeFilePreview } from './useCodeFilePreview';

const CodeViewer = () => {
  const { state } = useRepoState();
  const navigate = useNavigate();
  const {
    content,
    loading,
    highlightedHtml,
    error,
    isBinary,
    isLarge,
    showLargeRaw,
    setShowLargeRaw,
  } = useCodeFilePreview({
    owner: state.owner,
    repo: state.repo,
    branch: state.branch,
    path: state.path,
  });
  const codeScrollRef = useRef<HTMLDivElement | null>(null);

  const handleCodeWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const element = codeScrollRef.current;
    if (!element) return;

    // Keep native vertical scrolling, but handle explicit horizontal gestures.
    const horizontalDelta =
      event.deltaX !== 0 ? event.deltaX : event.shiftKey ? event.deltaY : 0;
    if (horizontalDelta === 0) return;

    event.preventDefault();
    event.stopPropagation();

    const maxLeft = Math.max(0, element.scrollWidth - element.clientWidth);
    if (maxLeft === 0) return;

    const nextLeft = Math.max(
      0,
      Math.min(maxLeft, element.scrollLeft + horizontalDelta)
    );
    element.scrollLeft = nextLeft;
  };

  return (
    <main
      className="flex-1 flex flex-col bg-[#0d1117] text-white"
      style={{ minWidth: 0, maxWidth: '100%', overflow: 'hidden' }}
    >
      <div className="px-6 py-3 border-b border-slate-800 bg-[#0d1117] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-sm">{state.path || 'No file selected'}</h2>
        </div>
        {state.path && (
          <div className="text-xs text-slate-500">
            {isLarge && 'Large file | '}
            {isBinary && 'Binary file'}
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
                <button
                  className="px-4 py-2 bg-primary text-white rounded-md text-xs"
                  onClick={() => navigate('/connect')}
                >
                  Connect GitHub
                </button>
              )}
            </div>
          </div>
        ) : isBinary ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-slate-400 text-sm">Cannot preview binary file</div>
          </div>
        ) : isLarge && !showLargeRaw ? (
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <div className="text-slate-400 text-sm">
              File is too large to preview ({Math.round((content?.length || 0) / 1024)}
              KB)
            </div>
            <button
              className="px-4 py-2 bg-slate-700 text-white rounded-md text-xs hover:bg-slate-600"
              onClick={() => setShowLargeRaw(true)}
            >
              View Raw
            </button>
          </div>
        ) : highlightedHtml ? (
          <div className="project-viewer-code">
            <div
              className="project-viewer-code-content"
              dangerouslySetInnerHTML={{ __html: highlightedHtml }}
            />
          </div>
        ) : content ? (
          <pre className="code-font m-0 w-max min-w-full min-h-full px-4 py-3 text-xs leading-[1.35] whitespace-pre">
            {content}
          </pre>
        ) : (
          <div className="flex items-center justify-center h-full text-slate-400 text-sm">
            Select a file to view its contents
          </div>
        )}
      </div>
    </main>
  );
};

export default CodeViewer;
