import type { BlockchainNetwork } from 'types';
import { Button } from '../Button';
import { StatusBadge } from '../StatusBadge';

interface BlockchainNetworkCardProps {
  network: BlockchainNetwork;
  onSwitchNetwork?: (networkId: string) => void;
  onSettings?: (networkId: string) => void;
}

export function BlockchainNetworkCard({ network, onSwitchNetwork, onSettings }: BlockchainNetworkCardProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start gap-3">
          <span className="material-symbols-outlined text-2xl text-primary mt-1">
            {network.id === 'ethereum-mainnet' ? 'currency_bitcoin' :
              network.id === 'polygon-pos' ? 'hexagon' : 'token'}
          </span>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">{network.name}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{network.description}</p>
          </div>
        </div>
        <StatusBadge
          status={network.status === 'connected' ? 'success' : network.status === 'connecting' ? 'warning' : 'pending'}
        >
          {network.status === 'connected' ? 'Connected' : network.status === 'connecting' ? 'Connecting' : 'Disconnected'}
        </StatusBadge>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-600 dark:text-slate-400">
          <span className="font-medium">Chain ID:</span> {network.chainId}
        </div>

        {network.status === 'connected' ? (
          <Button
            size="xs"
            variant="secondary"
            onClick={() => onSettings?.(network.id)}
          >
            Settings
          </Button>
        ) : (
          <Button
            size="xs"
            variant="primary"
            onClick={() => onSwitchNetwork?.(network.id)}
          >
            Switch Network
          </Button>
        )}
      </div>
    </div>
  );
}
