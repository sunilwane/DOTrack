import { Skeleton } from '../../Components/Skeleton';
import { usePageLoading } from '../../hooks/usePageLoading';
import {
  mockRegisterProjectData,
  mockRegistrationSteps,
} from '../../mock/PagesMockData/registerProjects';
import GasEstimateCard from './GasEstimateCard';
import ProgressSection from './ProgressSection';
import RegistrationSummary from './RegistrationSummary';
import StepsIndicator from './StepsIndicator';
import { RegisterProjectActions } from './registerProject/RegisterProjectActions';
import { RegisterProjectHeader } from './registerProject/RegisterProjectHeader';
import { RegisterProjectSuccessToast } from './registerProject/RegisterProjectSuccessToast';
import { RegisterProjectTrustBadges } from './registerProject/RegisterProjectTrustBadges';

const RegisterProject: React.FC = () => {
  const { isLoading } = usePageLoading('register_project');

  return (
    <main className="flex-1 flex justify-center py-12 px-4 w-full">
      <div className="w-full max-w-[1000px] flex flex-col gap-8">
        <RegisterProjectHeader isLoading={isLoading} />

        <div className="bg-white dark:bg-[#1a202c] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <Skeleton isLoaded={!isLoading} width="100%" height="92px" className="rounded-none">
            <ProgressSection step={3} totalSteps={3} progress={100} />
          </Skeleton>

          <Skeleton isLoaded={!isLoading} width="100%" height="72px" className="rounded-none">
            <StepsIndicator steps={mockRegistrationSteps} />
          </Skeleton>

          <div className="p-8">
            <div className="flex flex-col gap-6">
              <div>
                <Skeleton isLoaded={!isLoading} width="220px" height="24px" className="mb-2">
                  <h2 className="text-slate-900 dark:text-white text-base font-bold leading-tight tracking-[-0.015em] mb-2">
                    Step 3: Blockchain Registration
                  </h2>
                </Skeleton>
                <Skeleton isLoaded={!isLoading} variant="text" rows={2}>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    Deploy your project's identity to the smart contract. This action will incur a
                    one-time gas fee.
                  </p>
                </Skeleton>
              </div>

              <Skeleton isLoaded={!isLoading} width="100%" height="220px" className="rounded-xl">
                <RegistrationSummary data={mockRegisterProjectData} />
              </Skeleton>

              <Skeleton isLoaded={!isLoading} width="100%" height="120px" className="rounded-xl">
                <GasEstimateCard
                  estimate={mockRegisterProjectData.gasEstimate}
                  estimatedTime={mockRegisterProjectData.estimatedTime}
                />
              </Skeleton>

              <RegisterProjectActions isLoading={isLoading} />
            </div>
          </div>
        </div>

        <RegisterProjectTrustBadges />

        <RegisterProjectSuccessToast />
      </div>
    </main>
  );
};

export default RegisterProject;
