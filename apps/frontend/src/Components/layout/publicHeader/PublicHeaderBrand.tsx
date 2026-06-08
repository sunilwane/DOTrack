import { Logo } from '../../common/Logo';

interface PublicHeaderBrandProps {
  onNavigateHome: () => void;
}

export const PublicHeaderBrand = ({ onNavigateHome }: PublicHeaderBrandProps) => (
  <div
    className="group flex shrink-0 cursor-pointer items-center gap-2 sm:gap-3"
    onClick={onNavigateHome}
  >
    <Logo className="size-7 shrink-0 text-primary transition-transform group-hover:scale-110 sm:size-8" />
    <h2 className="truncate text-lg font-bold tracking-tight text-slate-900 dark:text-white sm:text-xl">
      Nexus CI/CD
    </h2>
  </div>
);
