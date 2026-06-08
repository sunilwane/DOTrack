import ProjectFilter from '../../../pages/AuditLogs/ProjectFilter';
import { Scroller } from '../Scroller';
import { SimpleTooltip } from '../SimpleTooltip';
import { type NavItem, sidebarNavItems } from './config';

interface SidebarNavProps {
  isCollapsed: boolean;
  currentPath: string;
  isAuditExpanded: boolean;
  onToggleAudit: () => void;
  onNavigate: (path: string) => void;
}

const SidebarNav = ({
  isCollapsed,
  currentPath,
  isAuditExpanded,
  onToggleAudit,
  onNavigate,
}: SidebarNavProps) => {
  const isActive = (path: string) => currentPath === path;

  const renderNavItem = (item: NavItem) => {
    const isCurrentlyActive = isActive(item.path);
    const buttonElement = (
      <button
        type="button"
        onClick={() => {
          if (item.id === 'audit' && currentPath === '/audit-logs') {
            onToggleAudit();
          }
          onNavigate(item.path);
        }}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all cursor-pointer group w-full relative ${
          isCurrentlyActive
            ? 'bg-primary/10 text-primary border border-primary/20 shadow-lg shadow-primary/5'
            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
        } ${isCollapsed ? 'justify-center px-2' : ''}`}
        aria-current={isCurrentlyActive ? 'page' : undefined}
      >
        <span
          className="material-symbols-outlined text-xl transition-transform group-hover:scale-110"
          style={item.iconFilled && isCurrentlyActive ? { fontVariationSettings: "'FILL' 1" } : {}}
        >
          {item.icon}
        </span>
        {!isCollapsed && <p className="text-sm font-bold whitespace-nowrap">{item.label}</p>}
      </button>
    );

    return (
      <div key={item.id} className="flex flex-col gap-1">
        {isCollapsed ? (
          <SimpleTooltip label={item.label} placement="right" className="w-full">
            {buttonElement}
          </SimpleTooltip>
        ) : (
          buttonElement
        )}

        {item.id === 'audit' && (
          <div
            className={`grid transition-all duration-300 ease-in-out ${
              isAuditExpanded && !isCollapsed
                ? 'grid-rows-[1fr] opacity-100 mt-2'
                : 'grid-rows-[0fr] opacity-0 mt-0'
            }`}
          >
            <div className="overflow-hidden min-h-0">
              <ProjectFilter />
            </div>
          </div>
        )}
      </div>
    );
  };

  if (isCollapsed) {
    return (
      <nav className="flex-1 overflow-y-auto overflow-x-visible px-1 scrollbar-hide">
        <div className="flex flex-col gap-1">{sidebarNavItems.map(renderNavItem)}</div>
      </nav>
    );
  }

  return (
    <Scroller className="flex-1" direction="vertical" scrollbarStyle="thin">
      <nav>
        <div className="flex flex-col gap-1">{sidebarNavItems.map(renderNavItem)}</div>
      </nav>
    </Scroller>
  );
};

export default SidebarNav;
