declare module 'shiki' {
  interface HighlighterOptions {
    theme: string;
  }
  
  interface ShikiHighlighter {
    codeToHtml(code: string, options: { lang?: string }): string;
  }
  
  export function getHighlighter(options: HighlighterOptions): Promise<ShikiHighlighter>;
  export function setCDN(cdn: string): void;
}
