export interface FileUploadState {
  file: File | null;
  content: string;
  language: 'yaml' | 'json' | null;
  error: string | null;
}
