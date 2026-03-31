import { Skeleton } from '../../../Components/Skeleton';

interface RegisterProjectHeaderProps {
  isLoading: boolean;
}

export const RegisterProjectHeader = ({ isLoading }: RegisterProjectHeaderProps) => (
  <div className="text-center">
    <Skeleton isLoaded={!isLoading} width="240px" height="32px" className="mx-auto mb-2">
      <h1 className="pb-2 text-2xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white">
        Register New Project
      </h1>
    </Skeleton>
    <Skeleton isLoaded={!isLoading} width="400px" height="20px" className="mx-auto">
      <p className="text-slate-500 dark:text-slate-400">
        Launch your open-source project on the decentralized CI/CD network.
      </p>
    </Skeleton>
  </div>
);
