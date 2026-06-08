export type VersionState = 'pending' | 'active' | 'done';

export const getVersionIcon = (
  versionState: VersionState,
  fallbackIcon: string
): string => {
  if (versionState === 'done' && fallbackIcon !== 'flag') return 'check';
  if (versionState === 'active') return 'progress_activity';
  return fallbackIcon;
};

export const getMarkerClasses = (versionState: VersionState): string => {
  switch (versionState) {
    case 'done':
      return 'size-10 rounded-full bg-emerald-500 text-white';
    case 'active':
      return 'size-12 rounded-full bg-primary text-white ring-4 ring-primary/20 scale-110';
    case 'pending':
    default:
      return 'size-10 rounded-full bg-slate-300 dark:bg-slate-700 text-slate-500 dark:text-slate-400 opacity-40';
  }
};

export const getCardClasses = (versionState: VersionState): string => {
  switch (versionState) {
    case 'active':
      return 'bg-white dark:bg-slate-800/50 border border-primary/50 shadow-xl shadow-primary/5';
    case 'done':
      return 'bg-white dark:bg-slate-800/50 border border-emerald-500/30 shadow-lg shadow-emerald-500/5';
    case 'pending':
    default:
      return 'bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800';
  }
};
