import { useCallback, useEffect, useState } from 'react';
import { buildGithubFileUrl, buildGithubRequestOptions } from './api';
import {
  getFailedFileLoadMessage,
  highlightSourceCode,
  isLargeFileForHighlighting,
  isUnsupportedFileEncoding,
} from './codePreviewUtils';
import type { GithubFileResponse } from './codePreviewUtils';

interface UseCodeFilePreviewParams {
  owner: string;
  repo: string;
  branch: string;
  path: string;
}

export const useCodeFilePreview = ({
  owner,
  repo,
  branch,
  path,
}: UseCodeFilePreviewParams) => {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [highlightedHtml, setHighlightedHtml] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isBinary, setIsBinary] = useState(false);
  const [isLarge, setIsLarge] = useState(false);
  const [showLargeRaw, setShowLargeRaw] = useState(false);

  const resetPreviewState = useCallback(() => {
    setContent(null);
    setHighlightedHtml(null);
    setError(null);
    setIsBinary(false);
    setIsLarge(false);
    setShowLargeRaw(false);
  }, []);

  const loadFile = useCallback(async () => {
    if (!owner || !repo || !path) {
      resetPreviewState();
      return;
    }

    setLoading(true);
    resetPreviewState();

    try {
      const response = await fetch(
        buildGithubFileUrl(owner, repo, branch, path),
        buildGithubRequestOptions()
      );

      if (response.status === 403) {
        setError('Insufficient access - please connect GitHub');
        return;
      }

      if (response.status === 404) {
        setError('File not found');
        return;
      }

      if (!response.ok) {
        const text = await response.text().catch(() => '');
        console.error('Failed loading file', { status: response.status, body: text });
        setError(getFailedFileLoadMessage(response.status, response.statusText, text));
        return;
      }

      const json = (await response.json()) as GithubFileResponse;
      const file = json.file;
      const raw = file?.content || null;

      if (isUnsupportedFileEncoding(file?.encoding)) {
        setIsBinary(true);
        return;
      }

      setContent(raw);

      if (raw && isLargeFileForHighlighting(raw)) {
        setIsLarge(true);
        setHighlightedHtml(null);
        return;
      }

      if (!raw) {
        setHighlightedHtml(null);
        return;
      }

      setHighlightedHtml(await highlightSourceCode(raw, path || ''));
    } catch {
      setError('Failed to load file');
      setContent(null);
      setHighlightedHtml(null);
    } finally {
      setLoading(false);
    }
  }, [branch, owner, path, repo, resetPreviewState]);

  useEffect(() => {
    void loadFile();
  }, [loadFile]);

  return {
    content,
    loading,
    highlightedHtml,
    error,
    isBinary,
    isLarge,
    showLargeRaw,
    setShowLargeRaw,
  };
};
