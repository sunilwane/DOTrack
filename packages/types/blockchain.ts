export interface BlockchainNetwork {
  id: string;
  name: string;
  description: string;
  status: 'connected' | 'disconnected' | 'connecting';
  chainId: number;
  rpcUrl: string;
  blockExplorer?: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
}

export interface CICDProvider {
  id: string;
  name: string;
  description: string;
  status: 'connected' | 'disconnected';
  repository?: string;
  lastSync?: Date;
}

export interface CloudCredential {
  id: string;
  provider: 'aws' | 'azure' | 'gcp';
  accessKeyId?: string;
  secretKey?: string;
  region?: string;
  isConfigured: boolean;
  lastTested?: Date;
}

export interface ConnectedWallet {
  id: string;
  address: string;
  provider: 'MetaMask' | 'WalletConnect' | 'Coinbase' | 'Phantom';
  status: 'active' | 'inactive';
  isPrimary: boolean;
  balance?: string;
}

export interface NotificationConfig {
  id: string;
  type: 'discord' | 'slack' | 'email';
  webhookUrl?: string;
  enabled: boolean;
  lastTriggered?: Date;
}
