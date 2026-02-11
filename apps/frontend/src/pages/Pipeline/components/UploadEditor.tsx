import * as React from 'react';
import { CodeEditor } from '../../../Components/common/CodeEditor';
import type { FileUploadState } from '../Pipeline';

interface Props {
    uploadState: FileUploadState;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
    isDragging: boolean;
    onDragOver: (e: React.DragEvent) => void;
    onDragLeave: (e: React.DragEvent) => void;
    onDrop: (e: React.DragEvent) => void;
    onBrowseClick: () => void;
    onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClearFile: () => void;
}

const UploadEditor: React.FC<Props> = ({
    uploadState,
    fileInputRef,
    isDragging,
    onDragOver,
    onDragLeave,
    onDrop,
    onBrowseClick,
    onFileSelect,
    onClearFile,
}) => {
    return (
        <div className="xl:col-span-2 space-y-6">
            <div
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                onClick={onBrowseClick}
                className={
                    `flex flex-col items-center gap-4 rounded-xl border-2 border-dashed px-6 py-8 cursor-pointer transition-colors ${
                        isDragging ? 'border-primary bg-primary/5' : 'border-slate-300 dark:border-[#3b4354] bg-slate-50 dark:bg-slate-800/20 hover:border-primary'
                    }`
                }
            >
                <div className={`size-12 rounded-full flex items-center justify-center ${isDragging ? 'bg-primary text-white' : 'bg-primary/10 text-primary'}`}>
                    <span className="material-symbols-outlined text-3xl">upload_file</span>
                </div>
                <div className="text-center">
                    <p className="text-slate-900 dark:text-white text-lg font-bold">Upload Configuration</p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Drag and drop your pipeline YAML or JSON file here or click to browse</p>
                    <p className="text-slate-400 text-xs mt-1">Accepted formats: .yml, .yaml, .json</p>
                </div>
                <button
                    type="button"
                    className="px-6 py-2 bg-slate-200 dark:bg-[#282e39] text-slate-700 dark:text-white text-sm font-bold rounded-lg mt-2 hover:bg-slate-300 dark:hover:bg-[#343a46] transition-colors"
                    onClick={(e) => { e.stopPropagation(); onBrowseClick(); }}
                >
                    <span className='text-sm'>Select File</span>
                </button>
                <input ref={fileInputRef} type="file" accept=".yml,.yaml,.json" onChange={onFileSelect} className="hidden" />
            </div>

            {uploadState.file && (
                <div className="flex items-center justify-between p-4 bg-primary/5 border border-primary/20 rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined">{uploadState.language === 'json' ? 'data_object' : 'code'}</span>
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 dark:text-white">{uploadState.file.name}</p>
                            <p className="text-xs text-slate-500">{(uploadState.file.size / 1024).toFixed(2)} KB • {uploadState.language?.toUpperCase()}</p>
                        </div>
                    </div>
                    <button onClick={onClearFile} className="p-2 text-slate-400 hover:text-red-500 transition-colors h-10 w-10 flex items-center justify-center rounded-full">
                        <span className="material-symbols-outlined ">close</span>
                    </button>
                </div>
            )}

            {uploadState.content && uploadState.language && (
                <CodeEditor content={uploadState.content} language={uploadState.language} />
            )}

            {!uploadState.content && (
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-[#1e1e1e] overflow-hidden shadow-2xl">
                    <div className="flex items-center justify-between px-4 py-3 bg-[#252526] border-b border-[#3c3c3c]">
                        <div className="flex items-center gap-4">
                            <div className="flex gap-1.5">
                                <div className="size-3 rounded-full bg-[#ff5f56]/50"></div>
                                <div className="size-3 rounded-full bg-[#ffbd2e]/50"></div>
                                <div className="size-3 rounded-full bg-[#27c93f]/50"></div>
                            </div>
                            <span className="text-xs font-mono text-slate-500 uppercase tracking-widest px-2 py-0.5 bg-[#3c3c3c] rounded">Editor</span>
                        </div>
                    </div>
                    <div className="p-8 min-h-[300px] flex flex-col items-center justify-center text-center">
                        <span className="material-symbols-outlined text-5xl text-slate-600 mb-4">code_off</span>
                        <p className="text-slate-500 font-medium">No file selected</p>
                        <p className="text-slate-600 text-sm mt-1">Upload a YAML or JSON file to preview your configuration</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadEditor;
