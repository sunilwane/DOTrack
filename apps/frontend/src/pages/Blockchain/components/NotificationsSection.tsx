import type { ChangeEvent } from 'react';
import { Button } from '../../../Components/common/Button';
import { Input } from '../../../Components/common/Input';
import { Skeleton } from '../../../Components/Skeleton';
import SectionTitle from './SectionTitle';

interface NotificationsSectionProps {
  isLoading: boolean;
  discordWebhook: string;
  onDiscordWebhookChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const NotificationsSection = ({
  isLoading,
  discordWebhook,
  onDiscordWebhookChange,
}: NotificationsSectionProps) => (
  <section className="space-y-4">
    <SectionTitle icon="notifications" title="Notifications" isLoading={isLoading} width="140px" />
    <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Skeleton isLoaded={!isLoading} width="140px" height="20px">
            <p className="font-semibold text-slate-900 dark:text-white">Discord Webhook</p>
          </Skeleton>
          <Skeleton isLoaded={!isLoading} width="220px" height="16px" className="mt-1">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Receive build status in your Discord channel.
            </p>
          </Skeleton>
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <Skeleton isLoaded={!isLoading} width="300px" height="40px" className="rounded-lg flex-1">
            <Input
              placeholder="https://discord.com/api/webhooks/..."
              value={discordWebhook}
              onChange={onDiscordWebhookChange}
              className="flex-1"
            />
          </Skeleton>
          <Skeleton isLoaded={!isLoading} width="80px" height="40px" className="rounded-lg">
            <Button
              size="xs"
              variant="primary"
              icon={<span className="material-symbols-outlined">send</span>}
            >
              Send
            </Button>
          </Skeleton>
        </div>
      </div>
    </div>
  </section>
);

export default NotificationsSection;
