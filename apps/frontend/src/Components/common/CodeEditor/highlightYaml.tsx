import type { ReactNode } from 'react';
import { isNumeric, syntaxColors } from './syntaxUtils';

export const highlightYamlLine = (line: string, lineIndex: number): ReactNode => {
  const tokens: ReactNode[] = [];
  let tokenIndex = 0;

  if (line.trim().startsWith('#')) {
    const indent = line.match(/^(\s*)/)?.[0] || '';
    return (
      <span key={lineIndex}>
        {indent}
        <span style={{ color: syntaxColors.comment }}>{line.trim()}</span>
      </span>
    );
  }

  const keyValueMatch = line.match(/^(\s*)([^:\s][^:]*?)(:)(.*)$/);
  if (keyValueMatch) {
    const [, indent, key, colon, value] = keyValueMatch;
    const trimmedValue = value.trim();

    tokens.push(<span key={tokenIndex++}>{indent}</span>);
    tokens.push(
      <span key={tokenIndex++} style={{ color: syntaxColors.property }}>
        {key}
      </span>
    );
    tokens.push(
      <span key={tokenIndex++} style={{ color: syntaxColors.punctuation }}>
        {colon}
      </span>
    );

    if (!trimmedValue) {
      return <span key={lineIndex}>{tokens}</span>;
    }

    const prefixSpace = <span key={tokenIndex++}> </span>;
    const valueToken = (() => {
      if (trimmedValue.startsWith('"') || trimmedValue.startsWith("'")) {
        return (
          <span key={tokenIndex++} style={{ color: syntaxColors.string }}>
            {value}
          </span>
        );
      }

      if (trimmedValue === 'true' || trimmedValue === 'false') {
        return (
          <span key={tokenIndex++} style={{ color: syntaxColors.boolean }}>
            {trimmedValue}
          </span>
        );
      }

      if (trimmedValue === 'null' || trimmedValue === '~') {
        return (
          <span key={tokenIndex++} style={{ color: syntaxColors.null }}>
            {trimmedValue}
          </span>
        );
      }

      if (isNumeric(trimmedValue)) {
        return (
          <span key={tokenIndex++} style={{ color: syntaxColors.number }}>
            {trimmedValue}
          </span>
        );
      }

      if (trimmedValue.startsWith('[') && trimmedValue.endsWith(']')) {
        return (
          <span key={tokenIndex++} style={{ color: syntaxColors.bracket }}>
            {trimmedValue}
          </span>
        );
      }

      return (
        <span key={tokenIndex++} style={{ color: syntaxColors.string }}>
          {value}
        </span>
      );
    })();

    tokens.push(prefixSpace, valueToken);
    return <span key={lineIndex}>{tokens}</span>;
  }

  const listMatch = line.match(/^(\s*)(-)(.*)$/);
  if (listMatch) {
    const [, indent, dash, value] = listMatch;
    const itemKeyValue = value.match(/^\s*([^:\s][^:]*?)(:)(.*)$/);

    tokens.push(<span key={tokenIndex++}>{indent}</span>);
    tokens.push(
      <span key={tokenIndex++} style={{ color: syntaxColors.punctuation }}>
        {dash}
      </span>
    );

    if (itemKeyValue) {
      const [, itemKey, itemColon, itemValue] = itemKeyValue;
      tokens.push(<span key={tokenIndex++}> </span>);
      tokens.push(
        <span key={tokenIndex++} style={{ color: syntaxColors.keyword }}>
          {itemKey}
        </span>
      );
      tokens.push(
        <span key={tokenIndex++} style={{ color: syntaxColors.punctuation }}>
          {itemColon}
        </span>
      );
      tokens.push(
        <span key={tokenIndex++} style={{ color: syntaxColors.string }}>
          {itemValue}
        </span>
      );
    } else {
      tokens.push(
        <span key={tokenIndex++} style={{ color: syntaxColors.string }}>
          {value}
        </span>
      );
    }

    return <span key={lineIndex}>{tokens}</span>;
  }

  return <span key={lineIndex}>{line}</span>;
};
