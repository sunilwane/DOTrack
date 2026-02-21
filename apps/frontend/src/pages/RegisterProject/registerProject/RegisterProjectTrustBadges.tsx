import { trustBadges } from './registerProjectConstants';

export const RegisterProjectTrustBadges = () => (
  <div className="flex items-center justify-center gap-8 border-t border-slate-100 py-4 dark:border-slate-800">
    {trustBadges.map((badge) => (
      <div key={badge.label} className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
        <span className="material-symbols-outlined text-lg">{badge.icon}</span>
        <span className="text-xs">{badge.label}</span>
      </div>
    ))}
  </div>
);
