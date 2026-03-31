import { CICDProviderCard } from '../../../Components/common/Blockchain/CICDProviderCard';
import { cicdProviders } from '../../../mock/PagesMockData/BlockchainData';
import SectionTitle from './SectionTitle';

interface ProvidersSectionProps {
  isLoading: boolean;
  onConfigure: (providerId: string) => void;
  onDisconnect: (providerId: string) => void;
  onConnect: (providerId: string) => void;
}

const ProvidersSection = ({
  isLoading,
  onConfigure,
  onDisconnect,
  onConnect,
}: ProvidersSectionProps) => (
  <section className="space-y-4">
    <SectionTitle icon="integration_instructions" title="CI/CD Providers" isLoading={isLoading} />
    <div className="space-y-4">
      {cicdProviders.map((provider) => (
        <CICDProviderCard
          key={provider.id}
          provider={provider}
          isLoading={isLoading}
          onConfigure={onConfigure}
          onDisconnect={onDisconnect}
          onConnect={onConnect}
        />
      ))}
    </div>
  </section>
);

export default ProvidersSection;
