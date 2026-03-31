"use client";

import { useState, type ChangeEvent } from 'react';
import { Skeleton } from '../../Components/Skeleton';
import { usePageLoading } from '../../hooks/usePageLoading';
import CloudCredentialsSection from './components/CloudCredentialsSection';
import NetworkSection from './components/NetworkSection';
import NotificationsSection from './components/NotificationsSection';
import ProvidersSection from './components/ProvidersSection';
import WalletsSection from './components/WalletsSection';

const noopAction = () => undefined;

export default function BlockchainPage() {
  const { isLoading: isSimulatingLoad } = usePageLoading('blockchain');
  const [discordWebhook, setDiscordWebhook] = useState('');
  const [awsAccessKey, setAwsAccessKey] = useState('AKIA****************');
  const [awsSecretKey, setAwsSecretKey] = useState('********************************');

  const handleAwsAccessKeyChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAwsAccessKey(event.target.value);
  };

  const handleAwsSecretKeyChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAwsSecretKey(event.target.value);
  };

  const handleDiscordWebhookChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDiscordWebhook(event.target.value);
  };

  return (
    <div className="p-6">
      <main className="max-w-6xl mx-auto space-y-12">
        <div>
          <Skeleton isLoaded={!isSimulatingLoad} width="240px" height="28px">
            <h1 className="text-lg font-bold text-slate-900 dark:text-white">
              Global Platform Settings
            </h1>
          </Skeleton>
          <Skeleton isLoaded={!isSimulatingLoad} width="100%" height="20px" className="mt-2 max-w-2xl">
            <p className="text-slate-500 dark:text-slate-400">
              Manage your blockchain networks, provider integrations, and security credentials.
            </p>
          </Skeleton>
        </div>

        <NetworkSection
          isLoading={isSimulatingLoad}
          onSwitchNetwork={noopAction}
          onNetworkSettings={noopAction}
        />

        <ProvidersSection
          isLoading={isSimulatingLoad}
          onConfigure={noopAction}
          onDisconnect={noopAction}
          onConnect={noopAction}
        />

        <CloudCredentialsSection
          isLoading={isSimulatingLoad}
          awsAccessKey={awsAccessKey}
          awsSecretKey={awsSecretKey}
          onAwsAccessKeyChange={handleAwsAccessKeyChange}
          onAwsSecretKeyChange={handleAwsSecretKeyChange}
        />

        <NotificationsSection
          isLoading={isSimulatingLoad}
          discordWebhook={discordWebhook}
          onDiscordWebhookChange={handleDiscordWebhookChange}
        />

        <WalletsSection
          isLoading={isSimulatingLoad}
          onDeleteWallet={noopAction}
          onSyncWallet={noopAction}
        />
      </main>
    </div>
  );
}
