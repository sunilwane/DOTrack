import * as React from 'react';
import { Skeleton } from '../../../Components/Skeleton';

interface Props {
    isLoading?: boolean;
}

const PipelineHeader: React.FC<Props> = ({ isLoading }) => {
    return (
        <div className="px-8 py-6 max-w-6xl mx-auto w-full">
            <div className="flex flex-wrap gap-2 mb-4">
                <Skeleton isLoaded={!isLoading} width="60px" height="12px">
                    <a className="text-slate-400 text-xs font-medium hover:text-primary transition-colors cursor-pointer" href="#">
                        Pipelines
                    </a>
                </Skeleton>
                <span className="text-slate-400 text-xs font-medium">/</span>
                <Skeleton isLoaded={!isLoading} width="120px" height="12px">
                    <span className="text-slate-900 dark:text-white text-xs font-medium">New Pipeline Upload</span>
                </Skeleton>
            </div>

            <div className="flex flex-wrap justify-between items-end gap-6 mb-2">
                <div className="flex flex-col gap-2">
                    <Skeleton isLoaded={!isLoading} width="200px" height="28px">
                        <p className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-tight">
                            <span className='text-lg'>Secure Your Pipeline</span>
                        </p>
                    </Skeleton>
                    <Skeleton isLoaded={!isLoading} width="100%" height="32px" className="max-w-2xl">
                        <p className="text-slate-500 dark:text-[#9ca6ba] text-sm max-w-2xl">
                            Deploy immutable CI/CD configurations to the decentralized marketplace. Every version is cryptographically signed and stored forever on IPFS.
                        </p>
                    </Skeleton>
                </div>
                <Skeleton isLoaded={!isLoading} width="160px" height="36px" variant="button">
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-[#282e39] text-slate-700 dark:text-white rounded-lg font-bold text-sm hover:opacity-80 transition-opacity">
                        <span className="material-symbols-outlined text-base">description</span>
                        <span className='text-sm'>View Documentation</span>
                    </button>
                </Skeleton>
            </div>
        </div>
    );
};

export default PipelineHeader;
