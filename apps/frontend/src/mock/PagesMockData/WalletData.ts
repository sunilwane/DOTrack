import type { WalletOption } from "types";

export const WalletOptions: WalletOption[] = [
    {
        name: "MetaMask",
        description: "Recommended for desktop",
        icon: "account_balance_wallet",
        iconColor: "text-orange-400"
    },
    {
        name: "WalletConnect",
        description: "Connect via mobile app",
        icon: "qr_code_scanner",
        iconColor: "text-blue-400"
    },
    {
        name: "Coinbase Wallet",
        description: "Secure bridge to Coinbase",
        icon: "currency_bitcoin",
        iconColor: "text-blue-600"
    }
];
