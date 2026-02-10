import * as React from "react";

interface CodeEditorProps {
  content: string;
  language: "yaml" | "json";
  className?: string;
}

const syntaxColors = {
  keyword: "#569cd6",
  string: "#ce9178",
  number: "#b5cea8",
  boolean: "#569cd6",
  null: "#569cd6",
  property: "#9cdcfe",
  comment: "#6a9955",
  punctuation: "#d4d4d4",
  bracket: "#ffd700",
};

const highlightYaml = (code: string): React.ReactNode[] => {
  const lines = code.split("\n");
  return lines.map((line, lineIdx) => {
    const tokens: React.ReactNode[] = [];
    let remaining = line;
    let keyIdx = 0;

    if (remaining.trim().startsWith("#")) {
      const indent = remaining.match(/^(\s*)/)?.[0] || "";
      return (
        <span key={lineIdx}>
          {indent}
          <span style={{ color: syntaxColors.comment }}>
            {remaining.trim()}
          </span>
        </span>
      );
    }

    const keyValueMatch = remaining.match(/^(\s*)([^:\s][^:]*?)(:)(.*)$/);
    if (keyValueMatch) {
      const [, indent, key, colon, value] = keyValueMatch;
      tokens.push(<span key={keyIdx++}>{indent}</span>);
      tokens.push(
        <span key={keyIdx++} style={{ color: syntaxColors.property }}>
          {key}
        </span>,
      );
      tokens.push(
        <span key={keyIdx++} style={{ color: syntaxColors.punctuation }}>
          {colon}
        </span>,
      );

      const trimmedValue = value.trim();
      if (trimmedValue) {
        if (trimmedValue.startsWith('"') || trimmedValue.startsWith("'")) {
          tokens.push(
            <span key={keyIdx++} style={{ color: syntaxColors.string }}>
              {value}
            </span>,
          );
        } else if (trimmedValue === "true" || trimmedValue === "false") {
          tokens.push(<span key={keyIdx++}> </span>);
          tokens.push(
            <span key={keyIdx++} style={{ color: syntaxColors.boolean }}>
              {trimmedValue}
            </span>,
          );
        } else if (trimmedValue === "null" || trimmedValue === "~") {
          tokens.push(<span key={keyIdx++}> </span>);
          tokens.push(
            <span key={keyIdx++} style={{ color: syntaxColors.null }}>
              {trimmedValue}
            </span>,
          );
        } else if (!isNaN(Number(trimmedValue))) {
          tokens.push(<span key={keyIdx++}> </span>);
          tokens.push(
            <span key={keyIdx++} style={{ color: syntaxColors.number }}>
              {trimmedValue}
            </span>,
          );
        } else if (trimmedValue.startsWith("[") && trimmedValue.endsWith("]")) {
          tokens.push(<span key={keyIdx++}> </span>);
          tokens.push(
            <span key={keyIdx++} style={{ color: syntaxColors.bracket }}>
              {trimmedValue}
            </span>,
          );
        } else {
          tokens.push(
            <span key={keyIdx++} style={{ color: syntaxColors.string }}>
              {value}
            </span>,
          );
        }
      }
      return <span key={lineIdx}>{tokens}</span>;
    }

    const listMatch = remaining.match(/^(\s*)(-)(.*)$/);
    if (listMatch) {
      const [, indent, dash, value] = listMatch;
      tokens.push(<span key={keyIdx++}>{indent}</span>);
      tokens.push(
        <span key={keyIdx++} style={{ color: syntaxColors.punctuation }}>
          {dash}
        </span>,
      );

      const itemKeyValue = value.match(/^\s*([^:\s][^:]*?)(:)(.*)$/);
      if (itemKeyValue) {
        const [, itemKey, itemColon, itemValue] = itemKeyValue;
        tokens.push(<span key={keyIdx++}> </span>);
        tokens.push(
          <span key={keyIdx++} style={{ color: syntaxColors.keyword }}>
            {itemKey}
          </span>,
        );
        tokens.push(
          <span key={keyIdx++} style={{ color: syntaxColors.punctuation }}>
            {itemColon}
          </span>,
        );
        tokens.push(
          <span key={keyIdx++} style={{ color: syntaxColors.string }}>
            {itemValue}
          </span>,
        );
      } else {
        tokens.push(
          <span key={keyIdx++} style={{ color: syntaxColors.string }}>
            {value}
          </span>,
        );
      }
      return <span key={lineIdx}>{tokens}</span>;
    }

    return <span key={lineIdx}>{line}</span>;
  });
};

const highlightJson = (code: string): React.ReactNode[] => {
  const lines = code.split("\n");
  return lines.map((line, lineIdx) => {
    const tokens: React.ReactNode[] = [];
    let remaining = line;
    let keyIdx = 0;

    const parts = remaining.split(
      /("(?:[^"\\]|\\.)*"|\{|\}|\[|\]|:|,|true|false|null|\d+\.?\d*)/g,
    );

    parts.forEach((part, partIdx) => {
      if (!part) return;

      if (part.startsWith('"') && part.endsWith('"')) {
        const nextPart = parts[partIdx + 1];
        if (nextPart?.includes(":")) {
          tokens.push(
            <span key={keyIdx++} style={{ color: syntaxColors.property }}>
              {part}
            </span>,
          );
        } else {
          tokens.push(
            <span key={keyIdx++} style={{ color: syntaxColors.string }}>
              {part}
            </span>,
          );
        }
      } else if (["{", "}", "[", "]"].includes(part)) {
        tokens.push(
          <span key={keyIdx++} style={{ color: syntaxColors.bracket }}>
            {part}
          </span>,
        );
      } else if (part === ":" || part === ",") {
        tokens.push(
          <span key={keyIdx++} style={{ color: syntaxColors.punctuation }}>
            {part}
          </span>,
        );
      } else if (part === "true" || part === "false") {
        tokens.push(
          <span key={keyIdx++} style={{ color: syntaxColors.boolean }}>
            {part}
          </span>,
        );
      } else if (part === "null") {
        tokens.push(
          <span key={keyIdx++} style={{ color: syntaxColors.null }}>
            {part}
          </span>,
        );
      } else if (!isNaN(Number(part)) && part.trim() !== "") {
        tokens.push(
          <span key={keyIdx++} style={{ color: syntaxColors.number }}>
            {part}
          </span>,
        );
      } else {
        tokens.push(<span key={keyIdx++}>{part}</span>);
      }
    });

    return <span key={lineIdx}>{tokens}</span>;
  });
};

const CodeEditor: React.FC<CodeEditorProps> = ({
  content,
  language,
  className = "",
}) => {
  const lines = content.split("\n");
  const highlightedLines =
    language === "yaml" ? highlightYaml(content) : highlightJson(content);

  return (
    <div
      className={`rounded-xl border border-slate-200 dark:border-slate-800 bg-[#1e1e1e] overflow-hidden shadow-2xl ${className}`}
    >
      <div className="flex items-center justify-between px-4 py-3 bg-[#252526] border-b border-[#3c3c3c]">
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            <div className="size-3 rounded-full bg-[#ff5f56]"></div>
            <div className="size-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="size-3 rounded-full bg-[#27c93f]"></div>
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
            {lines.map((_, idx) => (
              <span key={idx}>{idx + 1}</span>
            ))}
          </div>

          <div className="flex-1 text-[#d4d4d4] flex flex-col">
            {highlightedLines.map((line, idx) => (
              <div key={idx}>{line}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
