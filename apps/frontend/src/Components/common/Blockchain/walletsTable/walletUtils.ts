import type { ConnectedWallet } from 'types';

export const formatWalletAddress = (address: string) =>
  `${address.slice(0, 6)}...${address.slice(-4)}`;

export const getProviderIcon = (provider: ConnectedWallet['provider']) => {
  switch (provider) {
    case 'MetaMask':
      return 'account_balance_wallet';
    case 'WalletConnect':
      return 'wifi';
    case 'Coinbase':
      return 'currency_exchange';
    default:
      return 'wallet';
  }
};
