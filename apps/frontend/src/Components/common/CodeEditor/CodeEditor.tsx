import type { FC } from 'react';
import { highlightCode } from './highlightCode';

interface CodeEditorProps {
  content: string;
  language: 'yaml' | 'json';
  className?: string;
}

const CodeEditor: FC<CodeEditorProps> = ({
  content,
  language,
  className = '',
}) => {
  const lines = content.split('\n');
  const highlightedLines = highlightCode(content, language);

  return (
    <div
      className={`rounded-xl border border-slate-200 dark:border-slate-800 bg-[#1e1e1e] overflow-hidden shadow-2xl ${className}`}
    >
      <div className="flex items-center justify-between px-4 py-3 bg-[#252526] border-b border-[#3c3c3c]">
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            <div className="size-3 rounded-full bg-[#ff5f56]" />
            <div className="size-3 rounded-full bg-[#ffbd2e]" />
            <div className="size-3 rounded-full bg-[#27c93f]" />
          </div>
          <span className="text-xs font-mono text-slate-400 uppercase tracking-widest px-2 py-0.5 bg-[#3c3c3c] rounded">
            {language.toUpperCase()} Editor
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            VALID SYNTAX
          </span>
        </div>
      </div>

      <div className="p-4 font-mono text-sm leading-relaxed overflow-x-auto max-h-[500px] overflow-y-auto">
        <div className="flex gap-4">
          <div className="text-[#858585] text-right select-none pr-4 border-r border-[#3c3c3c] min-w-[2.5rem] flex flex-col">
            {lines.map((_, index) => (
              <span key={index}>{index + 1}</span>
            ))}
          </div>

          <div className="flex-1 text-[#d4d4d4] flex flex-col">
            {highlightedLines.map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
