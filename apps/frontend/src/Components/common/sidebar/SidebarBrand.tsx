import type { RefObject } from 'react';
import { Logo } from '../Logo';

interface SidebarBrandProps {
  isCollapsed: boolean;
  hamburgerRef: RefObject<HTMLButtonElement | null>;
  onToggleSidebar: () => void;
}

const SidebarBrand = ({ isCollapsed, hamburgerRef, onToggleSidebar }: SidebarBrandProps) => (
  <div
    className={`flex items-center ${
      isCollapsed ? 'flex-col justify-center gap-4' : 'gap-3'
    } transition-all duration-300`}
  >
    <div
      className={`flex items-center gap-3 ${
        isCollapsed ? 'hidden' : 'flex'
      } bg-transparent border-none p-0 text-left flex-1`}
      aria-hidden
    >
      <Logo className="size-9 text-primary shrink-0" />
      <div className="flex flex-col whitespace-nowrap overflow-hidden">
        <h1 className="text-white text-sm font-bold leading-none tracking-tight">Nexus CI/CD</h1>
        <p className="text-[#9ca6ba] text-[10px] uppercase tracking-wider font-semibold mt-1">
          Web3 DevOps
        </p>
      </div>
    </div>

    {isCollapsed && (
      <div className="cursor-default bg-transparent border-none p-0 focus:outline-none" aria-hidden>
        <Logo className="size-9 text-primary shrink-0" />
      </div>
    )}

    <button
      ref={hamburgerRef}
      onClick={onToggleSidebar}
      className="text-slate-400 hover:text-white transition-colors cursor-pointer bg-transparent border-none p-2 flex items-center justify-center rounded-lg hover:bg-white/5 focus:outline-none shrink-0"
      aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
    >
      <span className="material-symbols-outlined text-xl">menu</span>
    </button>
  </div>
);

export default SidebarBrand;
