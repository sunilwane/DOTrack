import { getHighlighter, getLanguageFromPath } from './shiki';

export const MAX_HIGHLIGHT_BYTES = 200 * 1024;

export interface GithubFileResponse {
  file?: { content?: string; size?: number; encoding?: string };
}

export const isUnsupportedFileEncoding = (encoding?: string) =>
  Boolean(encoding && encoding !== 'base64' && encoding !== 'utf-8');

export const isLargeFileForHighlighting = (content: string) =>
  content.length > MAX_HIGHLIGHT_BYTES;

export const getFailedFileLoadMessage = (
  status: number,
  statusText: string,
  body: string
) => `Failed to load file (${status}): ${body || statusText}`;

export const highlightSourceCode = async (
  content: string,
  path: string
): Promise<string | null> => {
  const highlighter = await getHighlighter();
  if (!highlighter) {
    return null;
  }

  const language = getLanguageFromPath(path);
  try {
    return highlighter.codeToHtml(content, { lang: language });
  } catch {
    try {
      return highlighter.codeToHtml(content, { lang: 'plaintext' });
    } catch {
      return null;
    }
  }
};
