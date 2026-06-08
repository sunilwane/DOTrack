import { Button } from '../../Components/common/Button';
import { DashboardCard } from '../../Components/common/DashboardCard';
import { StatusBadge } from '../../Components/common/StatusBadge';
import { Footer } from '../../Components/layout/Footer';
import { projectInfo } from '../../mock/PagesMockData/deploymentRequest';
import DeploymentConfigForm from './deployRequest/DeploymentConfigForm';
import DeploymentNotice from './deployRequest/DeploymentNotice';
import QuorumRequirementsCard from './deployRequest/QuorumRequirementsCard';

export default function DeploymentRequest() {
  return (
    <div className="min-h-screen bg-[#101622] text-white flex flex-col">
      <main className="flex-1 flex justify-center py-12 px-4">
        <div className="w-full max-w-full space-y-10">
          <div className="border-l-4 border-primary pl-6">
            <h1 className="text-lg font-bold">Initiate Deployment Request</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              Project: <span className="text-primary font-semibold">{projectInfo.name}</span>
            </p>
          </div>

          <DashboardCard
            title="Deployment Configuration"
            icon="settings"
            extra={<StatusBadge status="info">Immutable Pipeline</StatusBadge>}
            bodyClassName="space-y-8"
          >
            <DeploymentConfigForm />
            <QuorumRequirementsCard />

            <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
              <div>
                <p className="text-xs uppercase text-slate-500 font-bold tracking-widest">
                  Network Fee Estimate
                </p>
                <p className="font-mono text-sm text-primary mt-1">~0.0042 ETH ($12.50)</p>
              </div>

              <div className="flex gap-4 w-full sm:w-auto">
                <Button variant="ghost" className="flex-1 sm:flex-none">
                  Cancel
                </Button>

                <Button variant="primary" className="flex-1 sm:flex-none">
                  Initiate Request
                </Button>
              </div>
            </div>
          </DashboardCard>

          <DeploymentNotice />
        </div>
      </main>
      <Footer />
    </div>
  );
}
