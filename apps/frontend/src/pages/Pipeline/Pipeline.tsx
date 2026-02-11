
import * as React from "react";
import { useState, useRef, useCallback } from "react";
import PipelineHeader from "./components/PipelineHeader";
import UploadEditor from "./components/UploadEditor";
import SidebarPreview from "./components/SidebarPreview";

export interface FileUploadState {
    file: File | null;
    content: string;
    language: 'yaml' | 'json' | null;
    error: string | null;
}

const Pipeline: React.FC = () => {
    const [uploadState, setUploadState] = useState<FileUploadState>({
        file: null,
        content: '',
        language: null,
        error: null,
    });
    const [isDragging, setIsDragging] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const validateFile = (file: File): { valid: boolean; language: 'yaml' | 'json' | null; error: string | null } => {
        const fileName = file.name.toLowerCase();
        const validExtensions = ['.yml', '.yaml', '.json'];
        const extension = fileName.substring(fileName.lastIndexOf('.'));
        
        if (!validExtensions.includes(extension)) {
            return {
                valid: false,
                language: null,
                error: `Invalid file type "${extension}". Only .yml, .yaml, and .json files are allowed.`
            };
        }

        const language: 'yaml' | 'json' = extension === '.json' ? 'json' : 'yaml';
        return { valid: true, language, error: null };
    };

    const readFileContent = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target?.result as string);
            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsText(file);
        });
    };

    const handleFile = useCallback(async (file: File) => {
        const validation = validateFile(file);
        
        if (!validation.valid) {
            setUploadState(prev => ({ ...prev, error: validation.error }));
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
            setUploadState(prev => ({ 
                ...prev, 
                error: 'Failed to read file content. Please try again.' 
            }));
            setShowErrorModal(true);
        }
    }, []);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFile(file);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            handleFile(file);
        }
    };

    const handleBrowseClick = () => {
        fileInputRef.current?.click();
    };

    const handleClearFile = () => {
        setUploadState({
            file: null,
            content: '',
            language: null,
            error: null,
        });
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="flex-1 flex flex-col bg-background-light dark:bg-background-dark">
            <PipelineHeader />

            <div className="px-8 py-6 max-w-6xl mx-auto w-full">
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    <UploadEditor
                        uploadState={uploadState}
                        fileInputRef={fileInputRef}
                        isDragging={isDragging}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onBrowseClick={handleBrowseClick}
                        onFileSelect={handleFileSelect}
                        onClearFile={handleClearFile}
                    />

                    <SidebarPreview uploadState={uploadState} copyToClipboard={copyToClipboard} />
                </div>
            </div>

            
            {showErrorModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 max-w-md mx-4 shadow-2xl border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="size-12 rounded-full bg-red-500/10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-red-500 text-2xl">error</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Invalid File</h3>
                                <p className="text-sm text-slate-500">File type not supported</p>
                            </div>
                        </div>

                        <div className="bg-red-50 dark:bg-red-500/5 border border-red-200 dark:border-red-500/20 rounded-lg p-4 mb-6">
                            <p className="text-sm text-red-600 dark:text-red-400">
                                {uploadState.error || 'Inappropriate file selected. Please select a valid YAML (.yml, .yaml) or JSON (.json) file.'}
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setShowErrorModal(false);
                                    setUploadState(prev => ({ ...prev, error: null }));
                                }}
                                className="flex-1 px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-white rounded-lg font-bold text-sm hover:opacity-80 transition-opacity"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    setShowErrorModal(false);
                                    setUploadState(prev => ({ ...prev, error: null }));
                                    handleBrowseClick();
                                }}
                                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-bold text-sm hover:opacity-90 transition-opacity"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Pipeline;
