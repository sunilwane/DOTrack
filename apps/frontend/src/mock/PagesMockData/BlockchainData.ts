import type { BlockchainNetwork, CICDProvider, CloudCredential, ConnectedWallet, NotificationConfig } from 'types';

export const blockchainNetworks: BlockchainNetwork[] = [
  {
    id: 'ethereum-mainnet',
    name: 'Ethereum Mainnet',
    description: 'Primary network for high-value deployments.',
    status: 'connected',
    chainId: 1,
    rpcUrl: 'https://mainnet.infura.io/v3/...',
    blockExplorer: 'https://etherscan.io',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18
    }
  },
  {
    id: 'polygon-pos',
    name: 'Polygon POS',
    description: 'Alternative network for low-cost gas fees.',
    status: 'disconnected',
    chainId: 137,
    rpcUrl: 'https://polygon-rpc.com',
    blockExplorer: 'https://polygonscan.com',
    nativeCurrency: {
      name: 'Polygon',
      symbol: 'MATIC',
      decimals: 18
    }
  },
  {
    id: 'arbitrum',
    name: 'Arbitrum One',
    description: 'Layer 2 scaling solution for Ethereum.',
    status: 'disconnected',
    chainId: 42161,
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
    blockExplorer: 'https://arbiscan.io',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18
    }
  }
];

export const cicdProviders: CICDProvider[] = [
  {
    id: 'github',
    name: 'GitHub',
    description: 'Connected to @oss-main-repo',
    status: 'connected',
    repository: '@oss-main-repo',
    lastSync: new Date('2024-01-15T10:30:00Z')
  },
  {
    id: 'jenkins',
    name: 'Jenkins',
    description: 'Self-hosted automation server',
    status: 'disconnected'
  },
  {
    id: 'gitlab',
    name: 'GitLab',
    description: 'DevOps platform for CI/CD',
    status: 'disconnected'
  }
];

export const cloudCredentials: CloudCredential[] = [
  {
    id: 'aws-primary',
    provider: 'aws',
    accessKeyId: 'AKIA****************',
    secretKey: '********************************',
    region: 'us-east-1',
    isConfigured: true,
    lastTested: new Date('2024-01-14T15:45:00Z')
  },
  {
    id: 'azure-backup',
    provider: 'azure',
    isConfigured: false
  }
];

export const connectedWallets: ConnectedWallet[] = [
  {
    id: 'wallet-1',
    address: '0x71C7656EC7ab88b098defB751B7401B5f6d8974f',
    provider: 'MetaMask',
    status: 'active',
    isPrimary: true,
    balance: '2.456 ETH'
  },
  {
    id: 'wallet-2',
    address: '0x3A257F32b7b3c1A8E4D2E9f5B1c6A7d8E9f0A1b',
    provider: 'WalletConnect',
    status: 'inactive',
    isPrimary: false,
    balance: '0.123 ETH'
  },
  {
    id: 'wallet-3',
    address: '0x8B4e3c9F8d2A5b7E1f6C0a9D3e4B8f7C2A5b9E1d',
    provider: 'Coinbase',
    status: 'active',
    isPrimary: false,
    balance: '0.892 ETH'
  }
];

export const notificationConfigs: NotificationConfig[] = [
  {
    id: 'discord-main',
    type: 'discord',
    webhookUrl: '',
    enabled: true
  },
  {
    id: 'slack-backup',
    type: 'slack',
    webhookUrl: 'https://hooks.slack.com/services/...',
    enabled: false
  }
];
