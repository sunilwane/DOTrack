import type { ConnectedWallet } from 'types';
import { Button } from '../../Button';
import { StatusBadge } from '../../StatusBadge';
import { formatWalletAddress, getProviderIcon } from './walletUtils';

interface WalletRowProps {
  wallet: ConnectedWallet;
  onDelete?: (walletId: string) => void;
  onSync?: (walletId: string) => void;
}

export const WalletRow = ({ wallet, onDelete, onSync }: WalletRowProps) => (
  <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
    <td className="whitespace-nowrap px-6 py-4">
      <div className="flex items-center">
        <span className="text-sm font-medium text-slate-900 dark:text-white">
          {formatWalletAddress(wallet.address)}
        </span>
        {wallet.isPrimary && (
          <StatusBadge status="success" className="ml-2">
            Primary
          </StatusBadge>
        )}
      </div>
    </td>
    <td className="whitespace-nowrap px-6 py-4">
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-lg text-slate-500">
          {getProviderIcon(wallet.provider)}
        </span>
        <span className="text-sm text-slate-600 dark:text-slate-400">{wallet.provider}</span>
      </div>
    </td>
    <td className="whitespace-nowrap px-6 py-4">
      <StatusBadge status={wallet.status === 'active' ? 'success' : 'pending'}>
        {wallet.status}
      </StatusBadge>
    </td>
    <td className="whitespace-nowrap px-6 py-4 text-right">
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
);
