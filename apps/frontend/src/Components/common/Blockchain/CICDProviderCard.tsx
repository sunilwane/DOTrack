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

interface CICDProviderCardProps {
  provider: CICDProvider;
  onConfigure?: (providerId: string) => void;
  onDisconnect?: (providerId: string) => void;
  onConnect?: (providerId: string) => void;
}

export function CICDProviderCard({ provider, onConfigure, onDisconnect, onConnect }: CICDProviderCardProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6">
      <div className="flex justify-between items-center">
        <div className="flex items-start gap-3">
          <div className="text-primary mt-1">
            {provider.id === 'github' && <GitHubIcon />}
            {provider.id === 'jenkins' && <JenkinsIcon />}
            {provider.id === 'gitlab' && <GitLabIcon />}
            {provider.id === 'bitbucket' && <BitbucketIcon />}
            {provider.id === 'circleci' && <CircleCIIcon />}
            {provider.id === 'travisci' && <TravisCIIcon />}
            {provider.id === 'azuredevops' && <AzureDevOpsIcon />}
            {!['github', 'jenkins', 'gitlab', 'bitbucket', 'circleci', 'travisci', 'azuredevops'].includes(provider.id) && <DefaultProviderIcon />}
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">{provider.name}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{provider.description}</p>
            {provider.repository && (
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                Connected to {provider.repository}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          {provider.status === 'connected' ? (
            <>
              <Button
                size="xs"
                variant="secondary"
                onClick={() => onConfigure?.(provider.id)}
              >
                Configure
              </Button>
              <Button
                size="xs"
                variant="outline"
                onClick={() => onDisconnect?.(provider.id)}
              >
                Disconnect
              </Button>
            </>
          ) : (
            <Button
              size="xs"
              variant="primary"
              onClick={() => onConnect?.(provider.id)}
            >
              Link Account
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
