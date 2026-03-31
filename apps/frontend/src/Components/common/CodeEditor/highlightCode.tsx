import type { ReactNode } from 'react';
import { highlightJsonLine } from './highlightJson';
import { highlightYamlLine } from './highlightYaml';

type EditorLanguage = 'yaml' | 'json';

export const highlightCode = (
  code: string,
  language: EditorLanguage
): ReactNode[] => {
  const lines = code.split('\n');
  return lines.map((line, index) =>
    language === 'yaml' ? highlightYamlLine(line, index) : highlightJsonLine(line, index)
  );
};
