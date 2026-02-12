import type { ConnectedWallet } from 'types';
import { Button } from '../Button';
import { StatusBadge } from '../StatusBadge';

interface WalletsTableProps {
  wallets: ConnectedWallet[];
  onDelete?: (walletId: string) => void;
  onSync?: (walletId: string) => void;
}

export function WalletsTable({ wallets, onDelete, onSync }: WalletsTableProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Address
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Provider
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Status
              </th>
              <th className="text-right px-6 py-3 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {wallets.map((wallet) => (
              <tr key={wallet.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                    </span>
                    {wallet.isPrimary && (
                      <StatusBadge status="success" className="ml-2">
                        Primary
                      </StatusBadge>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg text-slate-500">
                      {wallet.provider === 'MetaMask' ? 'account_balance_wallet' :
                        wallet.provider === 'WalletConnect' ? 'wifi' :
                          wallet.provider === 'Coinbase' ? 'currency_exchange' : 'wallet'}
                    </span>
                    <span className="text-sm text-slate-600 dark:text-slate-400">{wallet.provider}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge
                    status={wallet.status === 'active' ? 'success' : 'pending'}
                  >
                    {wallet.status}
                  </StatusBadge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex justify-end gap-2">
                    {wallet.status === 'inactive' ? (
                      <Button
                        size="xs"
                        variant="ghost"
                        onClick={() => onSync?.(wallet.id)}
                        icon={<span className="material-symbols-outlined">refresh</span>}
                      >
                        Sync
                      </Button>
                    ) : (
                      <Button
                        size="xs"
                        variant="ghost"
                        onClick={() => onDelete?.(wallet.id)}
                        icon={<span className="material-symbols-outlined">delete</span>}
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
