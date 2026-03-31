import type { FileUploadState } from '../types';

type FileValidationResult = {
  valid: boolean;
  language: 'yaml' | 'json' | null;
  error: string | null;
};

export const initialUploadState: FileUploadState = {
  file: null,
  content: '',
  language: null,
  error: null,
};

export const validateFile = (file: File): FileValidationResult => {
  const fileName = file.name.toLowerCase();
  const validExtensions = ['.yml', '.yaml', '.json'];
  const extension = fileName.substring(fileName.lastIndexOf('.'));

  if (!validExtensions.includes(extension)) {
    return {
      valid: false,
      language: null,
      error: `Invalid file type "${extension}". Only .yml, .yaml, and .json files are allowed.`,
    };
  }

  return {
    valid: true,
    language: extension === '.json' ? 'json' : 'yaml',
    error: null,
  };
};

export const readFileContent = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve((event.target?.result as string) || '');
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
