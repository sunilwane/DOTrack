import type { ConnectedWallet } from 'types';
import { WalletRow } from './walletsTable/WalletRow';
import { WalletSkeletonRows } from './walletsTable/WalletSkeletonRows';
import { WalletTableHeader } from './walletsTable/WalletTableHeader';

interface WalletsTableProps {
  wallets: ConnectedWallet[];
  isLoading?: boolean;
  onDelete?: (walletId: string) => void;
  onSync?: (walletId: string) => void;
}

export function WalletsTable({ wallets, isLoading, onDelete, onSync }: WalletsTableProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <WalletTableHeader />
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {isLoading ? (
              <WalletSkeletonRows count={3} />
            ) : (
              wallets.map((wallet) => (
                <WalletRow
                  key={wallet.id}
                  wallet={wallet}
                  onDelete={onDelete}
                  onSync={onSync}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
