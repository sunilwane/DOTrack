import * as React from "react";
import { AuthLayout } from "../../Components/layout/AuthLayout";
import { SmoothScrollProvider } from "../../Components/layout/SmoothScrollProvider";

const ConnectWallet: React.FC = () => {
    // TODO: Integrate wallet connection state (useAccount, useNetwork from wagmi/web3-react)
    const isConnected = false; // Replace with actual wallet connection state
    const isPolygonMainnet = false; // Replace with actual network check

    return (
        <SmoothScrollProvider>
            <AuthLayout
            title="Connect Your Wallet"
            description="Join the Decentralized CI/CD Ecosystem for Open-Source projects"
            backgroundVariant="mesh"
            maxWidth="max-w-[480px]"
        >
            {/* Status Badge */}
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

            {/* Wallet Options */}
            <div className="space-y-3 mb-8">
                <WalletOption
                    name="MetaMask"
                    description="Recommended for desktop"
                    icon={<span className="material-symbols-outlined text-orange-400">account_balance_wallet</span>}
                />
                <WalletOption
                    name="WalletConnect"
                    description="Connect via mobile app"
                    icon={<span className="material-symbols-outlined text-blue-400">qr_code_scanner</span>}
                />
                <WalletOption
                    name="Coinbase Wallet"
                    description="Secure bridge to Coinbase"
                    icon={<span className="material-symbols-outlined text-blue-600">currency_bitcoin</span>}
                />
            </div>

            {/* Security Check */}
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
        </SmoothScrollProvider>
    );
};

interface WalletOptionProps {
    name: string;
    description: string;
    icon: React.ReactNode;
}

const WalletOption: React.FC<WalletOptionProps> = ({ name, description, icon }) => (
    <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl px-4 min-h-[72px] py-2 justify-between transition-all group">
        <div className="flex items-center gap-4">
            <div className="text-white flex items-center justify-center rounded-lg bg-[#282e39] shrink-0 size-12 shadow-inner">
                {icon}
            </div>
            <div className="flex flex-col justify-center">
                <p className="text-white text-base font-semibold leading-normal line-clamp-1">{name}</p>
                <p className="text-[#9ca6ba] text-xs font-normal leading-normal">{description}</p>
            </div>
        </div>
        <div className="shrink-0 group-hover:translate-x-1 transition-transform">
            <span className="material-symbols-outlined text-white/40">chevron_right</span>
        </div>
    </div>
);

export default ConnectWallet;
