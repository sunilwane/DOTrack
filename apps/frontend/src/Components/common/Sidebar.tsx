import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToggle } from '../../hooks';
import SidebarBrand from './sidebar/SidebarBrand';
import SidebarFooter from './sidebar/SidebarFooter';
import SidebarNav from './sidebar/SidebarNav';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const Sidebar = ({ isCollapsed, setIsCollapsed }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuditExpanded, toggleAuditExpanded, , , setIsAuditExpanded] = useToggle(false);
  const hamburgerRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    setIsAuditExpanded(location.pathname === '/audit-logs');
  }, [location.pathname, setIsAuditExpanded]);

  const handleToggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    setTimeout(() => hamburgerRef.current?.blur(), 1000);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <aside
      className={`${
        isCollapsed ? 'w-20' : 'w-64'
      } h-screen fixed top-0 left-0 flex flex-col justify-between bg-[#111318] border-r border-slate-800 p-4 transition-all duration-300 z-50 overflow-hidden`}
    >
      <div className="flex flex-col gap-10 flex-1 min-h-0">
        <SidebarBrand
          isCollapsed={isCollapsed}
          hamburgerRef={hamburgerRef}
          onToggleSidebar={handleToggleSidebar}
        />

        <SidebarNav
          isCollapsed={isCollapsed}
          currentPath={location.pathname}
          isAuditExpanded={isAuditExpanded}
          onToggleAudit={toggleAuditExpanded}
          onNavigate={handleNavigate}
        />
      </div>

      <SidebarFooter isCollapsed={isCollapsed} onConnectWallet={() => navigate('/connect')} />
    </aside>
  );
};

export default Sidebar;
