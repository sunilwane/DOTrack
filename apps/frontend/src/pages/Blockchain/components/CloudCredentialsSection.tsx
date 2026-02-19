import type { ChangeEvent } from 'react';
import { Button } from '../../../Components/common/Button';
import { Divider } from '../../../Components/common/Divider';
import { Input } from '../../../Components/common/Input';
import { Skeleton } from '../../../Components/Skeleton';
import SectionTitle from './SectionTitle';

interface CloudCredentialsSectionProps {
  isLoading: boolean;
  awsAccessKey: string;
  awsSecretKey: string;
  onAwsAccessKeyChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onAwsSecretKeyChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const CloudCredentialsSection = ({
  isLoading,
  awsAccessKey,
  awsSecretKey,
  onAwsAccessKeyChange,
  onAwsSecretKeyChange,
}: CloudCredentialsSectionProps) => (
  <section className="space-y-4">
    <SectionTitle
      icon="key"
      title="Cloud Credentials"
      isLoading={isLoading}
      titleClassName="text-sm font-semibold text-slate-900 dark:text-white"
    />
    <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6">
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <Skeleton isLoaded={!isLoading} width="100%" height="56px" className="rounded-lg">
            <Input
              type="password"
              label="AWS Access Key ID"
              value={awsAccessKey}
              onChange={onAwsAccessKeyChange}
            />
          </Skeleton>
          <Skeleton isLoaded={!isLoading} width="100%" height="56px" className="rounded-lg">
            <Input
              type="password"
              label="AWS Secret Key"
              value={awsSecretKey}
              onChange={onAwsSecretKeyChange}
            />
          </Skeleton>
        </div>

        <Divider />

        <div className="flex justify-between items-center">
          <Skeleton isLoaded={!isLoading} width="240px" height="16px">
            <p className="text-sm mt-2 text-slate-500 dark:text-slate-400 italic">
              Secrets are encrypted at rest with AES-256
            </p>
          </Skeleton>

          <div className="flex gap-3 mt-3">
            <Skeleton isLoaded={!isLoading} width="120px" height="32px" className="rounded-lg">
              <Button size="xs" variant="primary">
                Edit Credentials
              </Button>
            </Skeleton>
            <Skeleton isLoaded={!isLoading} width="120px" height="32px" className="rounded-lg">
              <Button size="xs" variant="outline">
                Test Connection
              </Button>
            </Skeleton>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CloudCredentialsSection;
