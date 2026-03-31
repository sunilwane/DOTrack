import { BlockchainNetworkCard } from '../../../Components/common/Blockchain/BlockchainNetworkCard';
import { blockchainNetworks } from '../../../mock/PagesMockData/BlockchainData';
import SectionTitle from './SectionTitle';

interface NetworkSectionProps {
  isLoading: boolean;
  onSwitchNetwork: (networkId: string) => void;
  onNetworkSettings: (networkId: string) => void;
}

const NetworkSection = ({
  isLoading,
  onSwitchNetwork,
  onNetworkSettings,
}: NetworkSectionProps) => (
  <section className="space-y-4">
    <SectionTitle
      icon="token"
      title="Blockchain Network"
      isLoading={isLoading}
      titleClassName="text-sm font-semibold text-slate-900 dark:text-white"
    />
    <div className="grid md:grid-cols-2 gap-6">
      {blockchainNetworks.map((network) => (
        <BlockchainNetworkCard
          key={network.id}
          network={network}
          isLoading={isLoading}
          onSwitchNetwork={onSwitchNetwork}
          onSettings={onNetworkSettings}
        />
      ))}
    </div>
  </section>
);

export default NetworkSection;
