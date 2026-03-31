import type { FileUploadState } from '../types';
import { Skeleton } from '../../../Components/Skeleton';

interface Props {
    isLoading?: boolean;
    uploadState: FileUploadState;
    copyToClipboard: (text: string) => void;
}

const SidebarPreview: React.FC<Props> = ({ isLoading, uploadState, copyToClipboard }) => {
    const mockIpfsCid = 'QmXoyp...38290aksm89';
    const mockVerificationHash = '0x892...f7a1';

    return (
        <div className="space-y-6 ">
            <div className="bg-white dark:bg-[#1a1e26] rounded-xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-6  top-6 self-start">
                <div>
                    <Skeleton isLoaded={!isLoading} width="160px" height="24px" className="mb-2">
                        <h3 className="text-slate-900 dark:text-white text-lg font-bold mb-1">Blockchain Preview</h3>
                    </Skeleton>
                    <Skeleton isLoaded={!isLoading} width="100%" height="16px">
                        <p className="text-slate-500 dark:text-[#9ca6ba] text-sm">Cryptographic snapshot of your config</p>
                    </Skeleton>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <Skeleton isLoaded={!isLoading} width="60px" height="12px">
                                <label className="text-xs font-bold text-slate-500 uppercase">IPFS CID</label>
                            </Skeleton>
                            <Skeleton isLoaded={!isLoading} width="50px" height="16px">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${uploadState.content ? 'text-primary bg-primary/10' : 'text-slate-400 bg-slate-200 dark:bg-slate-800'}`}>
                                    {uploadState.content ? 'READY' : 'PENDING'}
                                </span>
                            </Skeleton>
                        </div>
                        <Skeleton isLoaded={!isLoading} width="100%" height="40px" className="rounded-lg">
                            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 px-3 py-3 rounded-lg border border-slate-200 dark:border-slate-800">
                                <p className="text-xs font-mono text-slate-600 dark:text-slate-400 truncate flex-1">{uploadState.content ? mockIpfsCid : '---'}</p>
                                {uploadState.content && (
                                    <button onClick={() => copyToClipboard(mockIpfsCid)} className="text-slate-400 hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined text-sm">content_copy</span>
                                    </button>
                                )}
                            </div>
                        </Skeleton>
                    </div>

                    <div className="space-y-2">
                        <Skeleton isLoaded={!isLoading} width="100px" height="12px">
                            <label className="text-xs font-bold text-slate-500 uppercase">Verification Hash</label>
                        </Skeleton>
                        <Skeleton isLoaded={!isLoading} width="100%" height="40px" className="rounded-lg">
                            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 px-3 py-3 rounded-lg border border-slate-200 dark:border-slate-800">
                                <p className="text-xs font-mono text-slate-600 dark:text-slate-400 truncate flex-1">{uploadState.content ? mockVerificationHash : '---'}</p>
                                {uploadState.content && (
                                    <button onClick={() => copyToClipboard(mockVerificationHash)} className="text-slate-400 hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined text-sm">fingerprint</span>
                                    </button>
                                )}
                            </div>
                        </Skeleton>
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                    <Skeleton isLoaded={!isLoading} width="100%" height="64px" className="mb-6 rounded-lg">
                        <div className="flex items-center gap-3 mb-6 p-3 bg-primary/5 rounded-lg border border-primary/20">
                            <div className="size-10 rounded bg-primary flex items-center justify-center text-white">
                                <span className="material-symbols-outlined">account_balance_wallet</span>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Wallet Connected</p>
                                <p className="text-sm font-bold text-slate-900 dark:text-white">0x71C...49A</p>
                            </div>
                        </div>
                    </Skeleton>

                    <Skeleton isLoaded={!isLoading} width="100%" height="52px" variant="button" className="rounded-xl">
                        <button disabled={!uploadState.content} className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${uploadState.content ? 'bg-primary text-white hover:scale-[1.02] active:scale-95' : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'}`}>
                            <span className="material-symbols-outlined">publish</span>
                            <span className='text-sm'>Upload & Hash</span>
                        </button>
                    </Skeleton>

                    <Skeleton isLoaded={!isLoading} width="100%" height="32px" className="mt-4">
                        <p className="text-[11px] text-center text-slate-500 mt-4 px-4">By clicking "Upload & Hash", you will sign a transaction to store this configuration on-chain. Gas fees apply.</p>
                    </Skeleton>
                </div>
            </div>

            <Skeleton isLoaded={!isLoading} width="100%" height="100px" className="rounded-xl">
                <div className="bg-gradient-to-br from-primary/10 to-transparent p-6 rounded-xl border border-primary/20">
                    <div className="flex gap-3">
                        <span className="material-symbols-outlined text-primary">verified_user</span>
                        <div>
                            <p className="text-sm font-bold text-slate-900 dark:text-white mb-1">Immutability Guaranteed</p>
                            <p className="text-xs text-slate-600 dark:text-[#9ca6ba] leading-relaxed">Once uploaded, this version cannot be modified. Anyone can verify the integrity of your CI/CD pipeline using the provided CID.</p>
                        </div>
                    </div>
                </div>
            </Skeleton>
        </div>
    );
};

export default SidebarPreview;
