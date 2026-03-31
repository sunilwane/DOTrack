import type { ReactNode } from 'react';
import { isNumeric, syntaxColors } from './syntaxUtils';

const jsonTokenRegex =
  /("(?:[^"\\]|\\.)*"|\{|\}|\[|\]|:|,|true|false|null|\d+\.?\d*)/g;

export const highlightJsonLine = (line: string, lineIndex: number): ReactNode => {
  const tokens: ReactNode[] = [];
  const parts = line.split(jsonTokenRegex);
  let tokenIndex = 0;

  parts.forEach((part, partIndex) => {
    if (!part) return;

    if (part.startsWith('"') && part.endsWith('"')) {
      const nextPart = parts[partIndex + 1];
      const color = nextPart?.includes(':')
        ? syntaxColors.property
        : syntaxColors.string;
      tokens.push(
        <span key={tokenIndex++} style={{ color }}>
          {part}
        </span>
      );
      return;
    }

    if (['{', '}', '[', ']'].includes(part)) {
      tokens.push(
        <span key={tokenIndex++} style={{ color: syntaxColors.bracket }}>
          {part}
        </span>
      );
      return;
    }

    if (part === ':' || part === ',') {
      tokens.push(
        <span key={tokenIndex++} style={{ color: syntaxColors.punctuation }}>
          {part}
        </span>
      );
      return;
    }

    if (part === 'true' || part === 'false') {
      tokens.push(
        <span key={tokenIndex++} style={{ color: syntaxColors.boolean }}>
          {part}
        </span>
      );
      return;
    }

    if (part === 'null') {
      tokens.push(
        <span key={tokenIndex++} style={{ color: syntaxColors.null }}>
          {part}
        </span>
      );
      return;
    }

    if (isNumeric(part)) {
      tokens.push(
        <span key={tokenIndex++} style={{ color: syntaxColors.number }}>
          {part}
        </span>
      );
      return;
    }

    tokens.push(<span key={tokenIndex++}>{part}</span>);
  });

  return <span key={lineIndex}>{tokens}</span>;
};
