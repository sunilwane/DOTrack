import * as React from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { Logo } from '../common/Logo';
import { Button } from '../common/Button';
import { Scroller } from '../common/Scroller';
import { SimpleTooltip } from '../common/SimpleTooltip';
import ProjectFilter from '../../pages/AuditLogs/ProjectFilter';

interface NavItem {
    id: string;
    label: string;
    icon: string;
    path: string;
    iconFilled?: boolean;
}

interface SidebarProps {
    isCollapsed: boolean;
    setIsCollapsed: (collapsed: boolean) => void;
}

function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const [isAuditExpanded, setIsAuditExpanded] = React.useState(false);
    const hamburgerRef = React.useRef<HTMLButtonElement>(null);

    React.useEffect(() => {
        if (location.pathname === '/audit-logs') {
            setIsAuditExpanded(true);
        } else {
            setIsAuditExpanded(false);
        }
    }, [location.pathname]);

    const handleToggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
        setTimeout(() => {
            if (hamburgerRef.current) {
                hamburgerRef.current.blur();
            }
        }, 1000);
    };

    const navItems: NavItem[] = [
        { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', path: '/dashboard', iconFilled: true },
        { id: 'projects', label: 'Projects', icon: 'grid_view', path: '/all-projects', iconFilled: true },
        { id: 'register', label: 'Register Project', icon: 'add_circle', path: '/register-project' },
        { id: 'pipelines', label: 'Pipelines', icon: 'account_tree', path: '/pipelines' },
        { id: 'market', label: 'Marketplace', icon: 'storefront', path: '/marketplace' },
        { id: 'audit', label: 'Audit Logs', icon: 'security', path: '/audit-logs' },
        { id: 'version-history', label: 'Version History', icon: 'history', path: '/version-history', iconFilled: true },
        { id: 'settings', label: 'Settings', icon: 'settings', path: '/settings' },
    ];

    const isActive = (path: string) => location.pathname === path;

    const renderNavItem = (item: NavItem) => {
        const isCurrentlyActive = isActive(item.path);

        const buttonElement = (
            <button
                type="button"
                onClick={() => {
                    if (item.id === 'audit' && location.pathname === '/audit-logs') {
                        setIsAuditExpanded(!isAuditExpanded);
                    }
                    navigate(item.path);
                }}
                className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all cursor-pointer group w-full relative
                    ${isCurrentlyActive
                        ? 'bg-primary/10 text-primary border border-primary/20 shadow-lg shadow-primary/5'
                        : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                    }
                    ${isCollapsed ? 'justify-center px-2' : ''}
                `}
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
                    <div className={`grid transition-all duration-300 ease-in-out ${isAuditExpanded && !isCollapsed ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                        <div className="overflow-hidden min-h-0">
                            <ProjectFilter />
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <aside className={`${isCollapsed ? 'w-20' : 'w-64'} h-screen fixed top-0 left-0 flex flex-col justify-between bg-[#111318] border-r border-slate-800 p-4 transition-all duration-300 z-50 overflow-hidden`}>

            <div className="flex flex-col gap-10 flex-1 min-h-0">

                <div className={`flex items-center ${isCollapsed ? 'flex-col justify-center gap-4' : 'gap-3'} transition-all duration-300`}>
                    <div
                        className={`flex items-center gap-3 ${isCollapsed ? 'hidden' : 'flex'} bg-transparent border-none p-0 text-left flex-1`}
                        aria-hidden={true}
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
                        <div className="cursor-default bg-transparent border-none p-0 focus:outline-none" aria-hidden={true}>
                            <Logo className="size-9 text-primary shrink-0" />
                        </div>
                    )}

                    <button
                        ref={hamburgerRef}
                        onClick={handleToggleSidebar}
                        className="text-slate-400 hover:text-white transition-colors cursor-pointer bg-transparent border-none p-2 flex items-center justify-center rounded-lg hover:bg-white/5 focus:outline-none shrink-0"
                        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    >
                        <span className="material-symbols-outlined text-xl">menu</span>
                    </button>
                </div>

                {isCollapsed ? (
                    <nav className="flex-1 overflow-y-auto overflow-x-visible px-1 scrollbar-hide">
                        <div className="flex flex-col gap-1">
                            {navItems.map(renderNavItem)}
                        </div>
                    </nav>
                ) : (
                    <Scroller className="flex-1" direction="vertical" scrollbarStyle="thin">
                        <nav>
                            <div className="flex flex-col gap-1">
                                {navItems.map(renderNavItem)}
                            </div>
                        </nav>
                    </Scroller>
                )}
            </div>


            <div className="flex flex-col gap-4 mt-auto pt-4 border-t border-slate-800/50">

                <div className={`p-3 bg-white/5 rounded-lg border border-white/10 ${isCollapsed ? 'flex justify-center transition-all' : ''}`}>
                    {!isCollapsed && <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-2">Network Active</p>}
                    <div className="flex items-center gap-2">
                        <div className="size-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        {!isCollapsed && <p className="text-xs text-slate-200 font-mono font-bold tracking-tight">0x71C...d897</p>}
                    </div>
                </div>


                {!isCollapsed ? (
                    <Button

                        className="w-full h-11 "
                        onClick={() => navigate("/connect")}
                        icon={<span className="material-symbols-outlined size-6.5">account_balance_wallet</span>}
                    >
                        <span className="text-sm"> Wallet Active</span>
                    </Button>
                ) : (
                    <SimpleTooltip label="Wallet Active" placement="right" className="w-full">
                        <button
                            className="flex size-11 mx-auto cursor-pointer items-center justify-center rounded-lg bg-primary text-white hover:bg-primary/90 transition-all border-none shadow-lg shadow-primary/20"
                            onClick={() => navigate("/connect")}
                        >
                            <span className="material-symbols-outlined">wallet</span>
                        </button>
                    </SimpleTooltip>
                )}

                <div className={`flex flex-col gap-1 border-t border-white/5 pt-2 ${isCollapsed ? 'items-center' : ''}`}>
                    <SidebarLink icon="menu_book" label="Docs" collapsed={isCollapsed} onClick={() => window.open('https://docs.example.com', '_blank')} />
                    <SidebarLink icon="support" label="Support" collapsed={isCollapsed} onClick={() => window.open('https://support.example.com', '_blank')} />
                </div>
            </div>
        </aside>
    );
}

const SidebarLink: React.FC<{ icon: string; label: string; collapsed: boolean; onClick?: () => void }> = ({ icon, label, collapsed, onClick }) => {
    const buttonElement = (
        <button
            type="button"
            onClick={onClick}
            className={`flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white cursor-pointer transition-colors group w-full ${collapsed ? 'justify-center px-0' : ''}`}
            aria-label={label}
        >
            <span className="material-symbols-outlined text-lg group-hover:scale-110 transition-transform">{icon}</span>
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

export default Sidebar;
