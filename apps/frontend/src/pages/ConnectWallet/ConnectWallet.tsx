import * as React from "react";
import { useNavigate } from "react-router-dom";
import { AuthLayout } from "../../Components/layout/AuthLayout";
import { Button } from "../../Components/common/Button";
import { WalletOptionCard } from "./WalletOptionCard";
import { WalletOptions } from "../../mock/PagesMockData/WalletData";

const ConnectWallet: React.FC = () => {
    const navigate = useNavigate();
    
    const isConnected = false; 
    const isPolygonMainnet = false; 

    return (
       
            <AuthLayout
                title="Connect Your Wallet"
                description="Join the Decentralized CI/CD Ecosystem for Open-Source projects"
                backgroundVariant="mesh"
                maxWidth="max-w-[480px]"
            >
               
                {isConnected && isPolygonMainnet && (
                    <div className="flex items-center justify-center mb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-xs font-medium text-emerald-400">Connected to Polygon Mainnet</span>
                        </div>
                    </div>
                )}

               
                <div className="space-y-3 mb-8">
                    {WalletOptions.map((option, index) => (
                        <WalletOptionCard
                            key={index}
                            {...option}
                        />
                    ))}
                </div>

                
                <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-primary text-xl">verified_user</span>
                        <div className="flex flex-col">
                            <p className="text-white text-sm font-bold mb-1">Security Check: Verified</p>
                            <p className="text-[#9ca6ba] text-xs leading-relaxed">
                                Your private keys are never stored on our servers. Transactions require manual approval in your wallet extension.
                            </p>
                            <a className="text-primary text-xs font-medium mt-2 hover:underline inline-flex items-center gap-1" href="#">
                                Learn more about security <span className="material-symbols-outlined text-xs">open_in_new</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-[#9ca6ba] text-[10px] uppercase tracking-widest font-medium">
                        By connecting, you agree to the <a className="text-white hover:underline cursor-pointer" href="#">Terms of Service</a>
                    </p>
                </div>
            </AuthLayout>

    );
};

export default ConnectWallet;
