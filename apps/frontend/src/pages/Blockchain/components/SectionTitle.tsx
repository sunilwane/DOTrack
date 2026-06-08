import { Skeleton } from '../../../Components/Skeleton';

interface SectionTitleProps {
  icon: string;
  title: string;
  isLoading: boolean;
  width?: string;
  titleClassName?: string;
}

const SectionTitle = ({
  icon,
  title,
  isLoading,
  width = '160px',
  titleClassName = 'text-xl font-semibold text-slate-900 dark:text-white',
}: SectionTitleProps) => (
  <div className="flex items-center gap-2">
    <span className="material-symbols-outlined text-xl text-primary">{icon}</span>
    <Skeleton isLoaded={!isLoading} width={width} height="20px">
      <h2 className={titleClassName}>{title}</h2>
    </Skeleton>
  </div>
);

export default SectionTitle;
