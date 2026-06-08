export const syntaxColors = {
  keyword: '#569cd6',
  string: '#ce9178',
  number: '#b5cea8',
  boolean: '#569cd6',
  null: '#569cd6',
  property: '#9cdcfe',
  comment: '#6a9955',
  punctuation: '#d4d4d4',
  bracket: '#ffd700',
} as const;

export const isNumeric = (value: string): boolean =>
  value.trim() !== '' && !Number.isNaN(Number(value));
