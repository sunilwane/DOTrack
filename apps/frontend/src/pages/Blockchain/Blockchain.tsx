"use client";

import { useState, type ChangeEvent } from 'react';
import { usePageLoading } from '../../hooks/usePageLoading';
import Sidebar from '../../Components/common/Sidebar';
import { BlockchainNetworkCard } from '../../Components/common/Blockchain/BlockchainNetworkCard';
import { CICDProviderCard } from '../../Components/common/Blockchain/CICDProviderCard';
import { WalletsTable } from '../../Components/common/Blockchain/WalletsTable';
import { Button } from '../../Components/common/Button';
import { Input } from '../../Components/common/Input';
import { Divider } from '../../Components/common/Divider';
import { blockchainNetworks, cicdProviders, connectedWallets } from '../../mock/PagesMockData/BlockchainData';
import { Skeleton } from '../../Components/Skeleton';

export default function BlockchainPage() {
  const { isLoading: isSimulatingLoad } = usePageLoading('blockchain');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [discordWebhook, setDiscordWebhook] = useState("");
  const [awsAccessKey, setAwsAccessKey] = useState("AKIA****************");
  const [awsSecretKey, setAwsSecretKey] = useState("********************************");

  const handleSwitchNetwork = () => {
  };

  const handleNetworkSettings = () => {
  };

  const handleConfigureProvider = () => {
  };

  const handleDisconnectProvider = () => {
  };

  const handleConnectProvider = () => {
  };

  const handleDeleteWallet = () => {
  };

  const handleSyncWallet = () => {
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex">
      <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />

      <div className={`flex-1 transition-all duration-300`}>

        <main className="p-6">
          <div className="max-w-6xl mx-auto space-y-12">
            <div>
              <Skeleton isLoaded={!isSimulatingLoad} width="240px" height="28px">
                <h1 className="text-lg font-bold text-slate-900 dark:text-white">Global Platform Settings</h1>
              </Skeleton>
              <Skeleton isLoaded={!isSimulatingLoad} width="100%" height="20px" className="mt-2 max-w-2xl">
                <p className="text-slate-500 dark:text-slate-400">
                  Manage your blockchain networks, provider integrations, and security credentials.
                </p>
              </Skeleton>
            </div>

            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-xl text-primary">token</span>
                <Skeleton isLoaded={!isSimulatingLoad} width="160px" height="20px">
                  <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Blockchain Network</h2>
                </Skeleton>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {blockchainNetworks.map((network) => (
                  <BlockchainNetworkCard
                    key={network.id}
                    network={network}
                    isLoading={isSimulatingLoad}
                    onSwitchNetwork={handleSwitchNetwork}
                    onSettings={handleNetworkSettings}
                  />
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-xl text-primary">integration_instructions</span>
                <Skeleton isLoaded={!isSimulatingLoad} width="160px" height="20px">
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white">CI/CD Providers</h2>
                </Skeleton>
              </div>
              <div className="space-y-4">
                {cicdProviders.map((provider) => (
                  <CICDProviderCard
                    key={provider.id}
                    provider={provider}
                    isLoading={isSimulatingLoad}
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
                <Skeleton isLoaded={!isSimulatingLoad} width="160px" height="20px">
                  <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Cloud Credentials</h2>
                </Skeleton>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6">
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Skeleton isLoaded={!isSimulatingLoad} width="100%" height="56px" className="rounded-lg">
                      <Input
                        type="password"
                        label="AWS Access Key ID"
                        value={awsAccessKey}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setAwsAccessKey(e.target.value)}
                      />
                    </Skeleton>
                    <Skeleton isLoaded={!isSimulatingLoad} width="100%" height="56px" className="rounded-lg">
                      <Input
                        type="password"
                        label="AWS Secret Key"
                        value={awsSecretKey}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setAwsSecretKey(e.target.value)}
                      />
                    </Skeleton>
                  </div>

                  <Divider />

                  <div className="flex justify-between items-center">
                    <Skeleton isLoaded={!isSimulatingLoad} width="240px" height="16px">
                      <p className="text-sm mt-2 text-slate-500 dark:text-slate-400 italic">
                        Secrets are encrypted at rest with AES-256
                      </p>
                    </Skeleton>

                    <div className="flex gap-3 mt-3">
                      <Skeleton isLoaded={!isSimulatingLoad} width="120px" height="32px" className="rounded-lg">
                        <Button size="xs" variant="primary">Edit Credentials</Button>
                      </Skeleton>
                      <Skeleton isLoaded={!isSimulatingLoad} width="120px" height="32px" className="rounded-lg">
                        <Button size="xs" variant="outline">Test Connection</Button>
                      </Skeleton>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-xl text-primary">notifications</span>
                <Skeleton isLoaded={!isSimulatingLoad} width="140px" height="20px">
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Notifications</h2>
                </Skeleton>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <Skeleton isLoaded={!isSimulatingLoad} width="140px" height="20px">
                      <p className="font-semibold text-slate-900 dark:text-white">Discord Webhook</p>
                    </Skeleton>
                    <Skeleton isLoaded={!isSimulatingLoad} width="220px" height="16px" className="mt-1">
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Receive build status in your Discord channel.
                      </p>
                    </Skeleton>
                  </div>

                  <div className="flex gap-2 w-full md:w-auto">
                    <Skeleton isLoaded={!isSimulatingLoad} width="300px" height="40px" className="rounded-lg flex-1">
                      <Input
                        placeholder="https://discord.com/api/webhooks/..."
                        value={discordWebhook}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setDiscordWebhook(e.target.value)}
                        className="flex-1"
                      />
                    </Skeleton>
                    <Skeleton isLoaded={!isSimulatingLoad} width="80px" height="40px" className="rounded-lg">
                      <Button
                        size="xs"
                        variant="primary"
                        icon={<span className="material-symbols-outlined">send</span>}
                      >
                        Send
                      </Button>
                    </Skeleton>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-4 pb-20">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-xl text-primary">account_balance_wallet</span>
                  <Skeleton isLoaded={!isSimulatingLoad} width="180px" height="24px">
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Connected Wallets</h2>
                  </Skeleton>
                </div>
                <Skeleton isLoaded={!isSimulatingLoad} width="140px" height="32px" className="rounded-lg">
                  <Button
                    size="xs"
                    variant="ghost"
                    icon={<span className="material-symbols-outlined">add</span>}
                  >
                    Add New Wallet
                  </Button>
                </Skeleton>
              </div>

              <WalletsTable
                wallets={connectedWallets}
                isLoading={isSimulatingLoad}
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