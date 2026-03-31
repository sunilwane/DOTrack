import type { Highlighter } from './types';

let shikiHighlighter: Highlighter | null = null;
let shikiLoader: Promise<Highlighter | null> | null = null;
let shikiConfigured = false;

export const getHighlighter = async (): Promise<Highlighter | null> => {
  if (shikiHighlighter) return shikiHighlighter;

  if (!shikiLoader) {
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
      .then((highlighter: Highlighter) => {
        shikiHighlighter = highlighter;
        return highlighter;
      })
      .catch((err) => {
        console.error('Failed to initialize Shiki highlighter', err);
        return null;
      });
  }

  return shikiLoader;
};

export function getLanguageFromPath(path: string): string {
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
  const extensionLanguageMap: Record<string, string> = {
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

  return extensionLanguageMap[ext] || 'plaintext';
}
