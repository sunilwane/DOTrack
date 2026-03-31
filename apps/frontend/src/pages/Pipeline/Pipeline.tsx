import * as React from 'react';
import { useCallback } from 'react';
import { Modal } from '../../Components/common';
import { usePageLoading } from '../../hooks/usePageLoading';
import PipelineHeader from './components/PipelineHeader';
import UploadEditor from './components/UploadEditor';
import SidebarPreview from './components/SidebarPreview';
import { usePipelineUpload } from './hooks/usePipelineUpload';

const Pipeline: React.FC = () => {
  const { isLoading: isSimulatingLoad } = usePageLoading('pipeline');
  const { uploadState, isDragging, showErrorModal, fileInputRef, actions } =
    usePipelineUpload();

  const copyToClipboard = useCallback((text: string) => {
    void navigator.clipboard.writeText(text);
  }, []);

  return (
    <div className="flex-1 flex flex-col bg-background-light dark:bg-background-dark">
      <PipelineHeader isLoading={isSimulatingLoad} />

      <div className="px-8 py-6 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <UploadEditor
            isLoading={isSimulatingLoad}
            uploadState={uploadState}
            fileInputRef={fileInputRef}
            isDragging={isDragging}
            onDragOver={actions.handleDragOver}
            onDragLeave={actions.handleDragLeave}
            onDrop={actions.handleDrop}
            onBrowseClick={actions.handleBrowseClick}
            onFileSelect={actions.handleFileSelect}
            onClearFile={actions.handleClearFile}
          />

          <SidebarPreview
            isLoading={isSimulatingLoad}
            uploadState={uploadState}
            copyToClipboard={copyToClipboard}
          />
        </div>
      </div>

      <Modal
        isOpen={showErrorModal}
        onClose={actions.dismissErrorModal}
        title="Invalid File"
        description="File type not supported"
        icon={<span className="material-symbols-outlined text-red-500 text-2xl">error</span>}
        iconBgColor="bg-red-500/10"
        actions={[
          { label: 'Cancel', onClick: actions.dismissErrorModal, variant: 'secondary' },
          { label: 'Try Again', onClick: actions.retryFromErrorModal, variant: 'primary' }
        ]}
      >
        <div className="bg-red-50 dark:bg-red-500/5 border border-red-200 dark:border-red-500/20 rounded-lg p-4">
          <p className="text-sm text-red-600 dark:text-red-400">
            {uploadState.error ||
              'Inappropriate file selected. Please select a valid YAML (.yml, .yaml) or JSON (.json) file.'}
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default Pipeline;
