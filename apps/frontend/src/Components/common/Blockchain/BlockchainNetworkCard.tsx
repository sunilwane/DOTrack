import type { BlockchainNetwork } from 'types';
import { Button } from '../Button';
import { StatusBadge } from '../StatusBadge';
import { Skeleton } from '../../Skeleton';

interface BlockchainNetworkCardProps {
  network: BlockchainNetwork;
  isLoading?: boolean;
  onSwitchNetwork?: (networkId: string) => void;
  onSettings?: (networkId: string) => void;
}

export function BlockchainNetworkCard({ network, isLoading, onSwitchNetwork, onSettings }: BlockchainNetworkCardProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start gap-3">
          <Skeleton isLoaded={!isLoading} width="32px" height="32px" className="rounded-lg mt-1">
            <span className="material-symbols-outlined text-2xl text-primary">
              {network.id === 'ethereum-mainnet' ? 'currency_bitcoin' :
                network.id === 'polygon-pos' ? 'hexagon' : 'token'}
            </span>
          </Skeleton>
          <div className="space-y-2">
            <Skeleton isLoaded={!isLoading} width="120px" height="20px">
              <h3 className="font-semibold text-slate-900 dark:text-white">{network.name}</h3>
            </Skeleton>
            <Skeleton isLoaded={!isLoading} width="200px" height="14px">
              <p className="text-sm text-slate-500 dark:text-slate-400">{network.description}</p>
            </Skeleton>
          </div>
        </div>
        <Skeleton isLoaded={!isLoading} width="80px" height="24px" className="rounded-full">
          <StatusBadge
            status={network.status === 'connected' ? 'success' : network.status === 'connecting' ? 'warning' : 'pending'}
          >
            {network.status === 'connected' ? 'Connected' : network.status === 'connecting' ? 'Connecting' : 'Disconnected'}
          </StatusBadge>
        </Skeleton>
      </div>

      <div className="flex items-center justify-between">
        <Skeleton isLoaded={!isLoading} width="100px" height="16px">
          <div className="text-sm text-slate-600 dark:text-slate-400">
            <span className="font-medium">Chain ID:</span> {network.chainId}
          </div>
        </Skeleton>

        <Skeleton isLoaded={!isLoading} width="100px" height="32px" className="rounded-lg">
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
        </Skeleton>
      </div>
    </div>
  );
}
