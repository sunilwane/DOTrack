import type { FC } from 'react';
import { SimpleTooltip } from '../SimpleTooltip';

interface SidebarLinkProps {
  icon: string;
  label: string;
  collapsed: boolean;
  onClick?: () => void;
}

const SidebarLink: FC<SidebarLinkProps> = ({
  icon,
  label,
  collapsed,
  onClick,
}) => {
  const buttonElement = (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white cursor-pointer transition-colors group w-full ${
        collapsed ? 'justify-center px-0' : ''
      }`}
      aria-label={label}
    >
      <span className="material-symbols-outlined text-lg group-hover:scale-110 transition-transform">
        {icon}
      </span>
      {!collapsed && <p className="text-xs font-bold uppercase tracking-widest">{label}</p>}
    </button>
  );

  if (collapsed) {
    return (
      <SimpleTooltip label={label} placement="right" className="w-full">
        {buttonElement}
      </SimpleTooltip>
    );
  }

  return buttonElement;
};

export default SidebarLink;
