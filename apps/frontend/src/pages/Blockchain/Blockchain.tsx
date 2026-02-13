"use client";

import { useState, type ChangeEvent } from 'react';
import Sidebar from '../../Components/common/Sidebar';
import Topbar from '../../Components/common/Topbar';
import { BlockchainNetworkCard } from '../../Components/common/Blockchain/BlockchainNetworkCard';
import { CICDProviderCard } from '../../Components/common/Blockchain/CICDProviderCard';
import { WalletsTable } from '../../Components/common/Blockchain/WalletsTable';
import { Button } from '../../Components/common/Button';
import { Input } from '../../Components/common/Input';
import { Divider } from '../../Components/common/Divider';
import { blockchainNetworks, cicdProviders, connectedWallets } from '../../mock/PagesMockData/BlockchainData';

export default function BlockchainPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [discordWebhook, setDiscordWebhook] = useState("");

  const handleSwitchNetwork = (networkId: string) => {
  };

  const handleNetworkSettings = (networkId: string) => {
  };

  const handleConfigureProvider = (providerId: string) => {
  };

  const handleDisconnectProvider = (providerId: string) => {
  };

  const handleConnectProvider = (providerId: string) => {
  };

  const handleDeleteWallet = (walletId: string) => {
  };

  const handleSyncWallet = (walletId: string) => {
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex">
      <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />

      <div className={`flex-1 transition-all duration-300`}>

        <main className="p-6">
          <div className="max-w-6xl mx-auto space-y-12">
            <div>
              <h1 className="text-lg font-bold text-slate-900 dark:text-white">Global Platform Settings</h1>
              <p className="text-slate-500 dark:text-slate-400 mt-2">
                Manage your blockchain networks, provider integrations, and security credentials.
              </p>
            </div>

            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-xl text-primary">token</span>
                <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Blockchain Network</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {blockchainNetworks.map((network) => (
                  <BlockchainNetworkCard
                    key={network.id}
                    network={network}
                    onSwitchNetwork={handleSwitchNetwork}
                    onSettings={handleNetworkSettings}
                  />
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-xl text-primary">integration_instructions</span>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">CI/CD Providers</h2>
              </div>
              <div className="space-y-4">
                {cicdProviders.map((provider) => (
                  <CICDProviderCard
                    key={provider.id}
                    provider={provider}
                    onConfigure={handleConfigureProvider}
                    onDisconnect={handleDisconnectProvider}
                    onConnect={handleConnectProvider}
                  />
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-xl text-primary">key</span>
                <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Cloud Credentials</h2>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6">
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      type="password"
                      label="AWS Access Key ID"
                      value="AKIA****************"
                      readOnly={true}
                    />
                    <Input
                      type="password"
                      label="AWS Secret Key"
                      value="********************************"
                      readOnly={true}
                    />
                  </div>

                  <Divider />

                  <div className="flex justify-between items-center">
                    <p className="text-sm mt-1 text-slate-500 dark:text-slate-400 italic">
                      Secrets are encrypted at rest with AES-256
                    </p>

                    <div className="flex gap-3">
                      <Button size="xs" variant="primary">Edit Credentials</Button>
                      <Button size="xs" variant="outline">Test Connection</Button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-xl text-primary">notifications</span>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Notifications</h2>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">Discord Webhook</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Receive build status in your Discord channel.
                    </p>
                  </div>

                  <div className="flex gap-2 w-full md:w-auto">
                    <Input
                      placeholder="https://discord.com/api/webhooks/..."
                      value={discordWebhook}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setDiscordWebhook(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      size="xs"
                      variant="primary"
                      icon={<span className="material-symbols-outlined">send</span>}
                    >
                      Send
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-4 pb-20">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-xl text-primary">account_balance_wallet</span>
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Connected Wallets</h2>
                </div>
                <Button
                  size="xs"
                  variant="ghost"
                  icon={<span className="material-symbols-outlined">add</span>}
                >
                  Add New Wallet
                </Button>
              </div>

              <WalletsTable
                wallets={connectedWallets}
                onDelete={handleDeleteWallet}
                onSync={handleSyncWallet}
              />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}