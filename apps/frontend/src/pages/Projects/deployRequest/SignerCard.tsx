import { Avatar } from '@nextui-org/react';
import type { SignerInfo } from 'types';
import { StatusBadge } from '../../../Components/common/StatusBadge';

const SignerCard = ({ name, role, verified, disabled }: SignerInfo) => (
  <div
    className={`flex items-center gap-3 p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/30 transition-all ${
      disabled ? 'opacity-30 grayscale pointer-events-none' : 'hover:border-primary/30'
    }`}
  >
    <Avatar name={name} size="sm" className="w-8 h-8" />

    <div className="flex-1 min-w-0">
      <p className="text-sm font-bold truncate">{name}</p>
      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">{role}</p>
    </div>

    {verified && <StatusBadge status="success">Verified</StatusBadge>}
  </div>
);

export default SignerCard;
