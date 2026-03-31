import { Button } from '../../../Components/common/Button';
import { WalletsTable } from '../../../Components/common/Blockchain/WalletsTable';
import { Skeleton } from '../../../Components/Skeleton';
import { connectedWallets } from '../../../mock/PagesMockData/BlockchainData';
import SectionTitle from './SectionTitle';

interface WalletsSectionProps {
  isLoading: boolean;
  onDeleteWallet: (walletId: string) => void;
  onSyncWallet: (walletId: string) => void;
}

const WalletsSection = ({
  isLoading,
  onDeleteWallet,
  onSyncWallet,
}: WalletsSectionProps) => (
  <section className="space-y-4 pb-20">
    <div className="flex justify-between items-center">
      <SectionTitle
        icon="account_balance_wallet"
        title="Connected Wallets"
        isLoading={isLoading}
        width="180px"
      />
      <Skeleton isLoaded={!isLoading} width="140px" height="32px" className="rounded-lg">
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
      isLoading={isLoading}
      onDelete={onDeleteWallet}
      onSync={onSyncWallet}
    />
  </section>
);

export default WalletsSection;
