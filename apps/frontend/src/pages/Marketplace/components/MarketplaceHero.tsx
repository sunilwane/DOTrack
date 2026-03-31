import { Skeleton } from '../../../Components/Skeleton';

interface MarketplaceHeroProps {
  isLoading: boolean;
}

const MarketplaceHero = ({ isLoading }: MarketplaceHeroProps) => (
  <div className="flex flex-col gap-2 pb-8">
    <Skeleton isLoaded={!isLoading} width="350px" height="28px">
      <h1 className="text-lg font-bold mb-1">Decentralized Pipeline Marketplace</h1>
    </Skeleton>
    <Skeleton isLoaded={!isLoading} width="600px" height="16px">
      <p className="text-xs text-gray-400">
        Secure, immutable, and transparent CI/CD templates stored on IPFS and verified by the
        blockchain.
      </p>
    </Skeleton>
  </div>
);

export default MarketplaceHero;
