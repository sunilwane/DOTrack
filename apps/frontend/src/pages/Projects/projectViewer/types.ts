export interface Highlighter {
  codeToHtml(code: string, options: { lang?: string }): string;
}

export interface TreeEntry {
  name: string;
  path: string;
  type: string;
  size?: number;
  sha?: string;
}

export interface Branch {
  name: string;
  commit?: string;
}
