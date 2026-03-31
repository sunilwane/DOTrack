import { useCallback, useRef, useState } from 'react';
import type { FileUploadState } from '../types';
import {
  initialUploadState,
  readFileContent,
  validateFile,
} from './pipelineUploadUtils';

export const usePipelineUpload = () => {
  const [uploadState, setUploadState] = useState<FileUploadState>(initialUploadState);
  const [isDragging, setIsDragging] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (file: File) => {
    const validation = validateFile(file);

    if (!validation.valid) {
      setUploadState((prev) => ({ ...prev, error: validation.error }));
      setShowErrorModal(true);
      return;
    }

    try {
      const content = await readFileContent(file);
      setUploadState({
        file,
        content,
        language: validation.language,
        error: null,
      });
    } catch {
      setUploadState((prev) => ({
        ...prev,
        error: 'Failed to read file content. Please try again.',
      }));
      setShowErrorModal(true);
    }
  }, []);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      void handleFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) {
      void handleFile(file);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleClearFile = () => {
    setUploadState(initialUploadState);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const dismissErrorModal = () => {
    setShowErrorModal(false);
    setUploadState((prev) => ({ ...prev, error: null }));
  };

  const retryFromErrorModal = () => {
    dismissErrorModal();
    handleBrowseClick();
  };

  return {
    uploadState,
    isDragging,
    showErrorModal,
    fileInputRef,
    actions: {
      handleFileSelect,
      handleDragOver,
      handleDragLeave,
      handleDrop,
      handleBrowseClick,
      handleClearFile,
      dismissErrorModal,
      retryFromErrorModal,
    },
  };
};
