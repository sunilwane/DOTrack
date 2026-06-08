import type { CICDProvider } from 'types';
import { Button } from '../Button';
import {
  GitHubIcon,
  JenkinsIcon,
  GitLabIcon,
  BitbucketIcon,
  CircleCIIcon,
  TravisCIIcon,
  AzureDevOpsIcon,
  DefaultProviderIcon
} from './ProviderIcons';

import { Skeleton } from '../../Skeleton';

interface CICDProviderCardProps {
  provider: CICDProvider;
  isLoading?: boolean;
  onConfigure?: (providerId: string) => void;
  onDisconnect?: (providerId: string) => void;
  onConnect?: (providerId: string) => void;
}

export function CICDProviderCard({ provider, isLoading, onConfigure, onDisconnect, onConnect }: CICDProviderCardProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6">
      <div className="flex justify-between items-center">
        <div className="flex items-start gap-3">
          <Skeleton isLoaded={!isLoading} width="32px" height="32px" className="rounded-lg mt-1">
            <div className="text-primary">
              {provider.id === 'github' && <GitHubIcon />}
              {provider.id === 'jenkins' && <JenkinsIcon />}
              {provider.id === 'gitlab' && <GitLabIcon />}
              {provider.id === 'bitbucket' && <BitbucketIcon />}
              {provider.id === 'circleci' && <CircleCIIcon />}
              {provider.id === 'travisci' && <TravisCIIcon />}
              {provider.id === 'azuredevops' && <AzureDevOpsIcon />}
              {!['github', 'jenkins', 'gitlab', 'bitbucket', 'circleci', 'travisci', 'azuredevops'].includes(provider.id) && <DefaultProviderIcon />}
            </div>
          </Skeleton>
          <div className="space-y-1">
            <Skeleton isLoaded={!isLoading} width="120px" height="20px">
              <h3 className="font-semibold text-slate-900 dark:text-white">{provider.name}</h3>
            </Skeleton>
            <Skeleton isLoaded={!isLoading} width="240px" height="14px">
              <p className="text-sm text-slate-500 dark:text-slate-400">{provider.description}</p>
            </Skeleton>
            {provider.repository && (
              <Skeleton isLoaded={!isLoading} width="180px" height="12px" className="mt-1">
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  Connected to {provider.repository}
                </p>
              </Skeleton>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          {provider.status === 'connected' ? (
            <>
              <Skeleton isLoaded={!isLoading} width="80px" height="32px" className="rounded-lg">
                <Button
                  size="xs"
                  variant="secondary"
                  onClick={() => onConfigure?.(provider.id)}
                >
                  Configure
                </Button>
              </Skeleton>
              <Skeleton isLoaded={!isLoading} width="80px" height="32px" className="rounded-lg">
                <Button
                  size="xs"
                  variant="outline"
                  onClick={() => onDisconnect?.(provider.id)}
                >
                  Disconnect
                </Button>
              </Skeleton>
            </>
          ) : (
            <Skeleton isLoaded={!isLoading} width="100px" height="32px" className="rounded-lg">
              <Button
                size="xs"
                variant="primary"
                onClick={() => onConnect?.(provider.id)}
              >
                Link Account
              </Button>
            </Skeleton>
          )}
        </div>
      </div>
    </div>
  );
}
