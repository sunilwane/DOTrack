import * as React from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { Logo } from '../common/Logo';
import { Button } from '../common/Button';

interface NavItem {
    id: string;
    label: string;
    icon: string;
    path: string;
    iconFilled?: boolean;
}

import ProjectFilter from '../../pages/AuditLogs/ProjectFilter';

interface SidebarProps {
    isCollapsed: boolean;
    setIsCollapsed: (collapsed: boolean) => void;
}

function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const [isAuditExpanded, setIsAuditExpanded] = React.useState(false);

    React.useEffect(() => {
        if (location.pathname === '/audit-logs') {
            setIsAuditExpanded(true);
        } else {
            setIsAuditExpanded(false);
        }
    }, [location.pathname]);

    const navItems: NavItem[] = [
        { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', path: '/dashboard', iconFilled: true },
        { id: 'pipelines', label: 'Pipelines', icon: 'account_tree', path: '/pipelines' },
        { id: 'ipfs', label: 'IPFS Templates', icon: 'description', path: '/ipfs-templates' },
        { id: 'audit', label: 'Audit Logs', icon: 'security', path: '/audit-logs' },
        { id: 'settings', label: 'Settings', icon: 'settings', path: '/settings' },
    ];

    const isActive = (path: string) => location.pathname === path;

    const renderNavItem = (item: NavItem) => {
        const itemContent = (
            <div
                onClick={() => {
                    if (item.id === 'audit' && location.pathname === '/audit-logs') {
                        setIsAuditExpanded(!isAuditExpanded);
                    }
                    navigate(item.path);
                }}
                className={`
                    flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors cursor-pointer
                    ${isActive(item.path)
                        ? 'bg-primary/10 text-primary border border-primary/20'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }
                    ${isCollapsed ? 'justify-center px-0' : ''}
                `}
            >
                <div className="flex items-center gap-3">
                    <span
                        className="material-symbols-outlined"
                        style={item.iconFilled && isActive(item.path) ? { fontVariationSettings: "'FILL' 1" } : {}}
                    >
                        {item.icon}
                    </span>
                    {!isCollapsed && <p style={{ fontSize: '0.8em' }} className="text-sm font-medium whitespace-nowrap">{item.label}</p>}
                </div>
            </div>
        );

        return (
            <div key={item.id} className="flex flex-col gap-1">
                {itemContent}
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
<<<<<<< HEAD:apps/frontend/src/Components/layout/Sidebar.tsx
        <aside className={`${isCollapsed ? 'w-20' : 'w-64'} h-full flex flex-col justify-between bg-[#111318] border-r border-slate-800 p-4 transition-all duration-300 relative z-20`}>
            {/* Top Section */}
            <div className="flex flex-col gap-10">
                {/* Logo & Toggle */}
                <div className={`flex items-center ${isCollapsed ? 'flex-col justify-center gap-4' : 'justify-between'} px-2 overflow-hidden transition-all duration-300`}>
                    <div className={`flex items-center gap-3 ${isCollapsed ? 'hidden' : 'flex'} cursor-pointer`} onClick={() => navigate("/")}>
                        <Logo className="size-9 text-primary shrink-0" />
=======
        <aside className={`${isCollapsed ? 'w-20' : 'w-64'} flex flex-col justify-between bg-[#111318] border-r border-slate-800 transition-all duration-300 fixed left-0 top-0 h-screen z-50`}>
            <div className="flex flex-col flex-1 min-h-0 pt-4 px-4 overflow-hidden">
                <div className={`flex items-center ${isCollapsed ? 'flex-col justify-center gap-4' : 'justify-between'} px-2 mb-8 shrink-0 overflow-hidden transition-all duration-300`}>
                    <div className={`flex items-center gap-3 ${isCollapsed ? 'hidden' : 'flex'}`}>
                        <div className="bg-primary rounded-lg size-10 flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-white">deployed_code</span>
                        </div>
>>>>>>> 06208e11d80f527e765229f62409c1606dac0376:apps/frontend/src/Components/common/Sidebar.tsx
                        <div className="flex flex-col whitespace-nowrap overflow-hidden">
                            <h1 className="text-white text-sm font-bold leading-none tracking-tight">Nexus CI/CD</h1>
                            <p className="text-[#9ca6ba] text-[10px] uppercase tracking-wider font-semibold mt-1">
                                Web3 DevOps
                            </p>
                        </div>
                    </div>
<<<<<<< HEAD:apps/frontend/src/Components/layout/Sidebar.tsx

                    {isCollapsed && (
                        <div className="cursor-pointer" onClick={() => navigate("/")}>
                            <Logo className="size-9 text-primary shrink-0" />
                        </div>
                    )}

=======
                    <div className={`${isCollapsed ? 'flex' : 'hidden'} bg-primary rounded-lg size-10 items-center justify-center shrink-0`}>
                        <span className="material-symbols-outlined text-white">deployed_code</span>
                    </div>

>>>>>>> 06208e11d80f527e765229f62409c1606dac0376:apps/frontend/src/Components/common/Sidebar.tsx
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="text-slate-400 hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0 flex items-center justify-center"
                    >
                        <span className="material-symbols-outlined text-xl">{isCollapsed ? 'chevron_right' : 'menu_open'}</span>
                    </button>
                </div>

<<<<<<< HEAD:apps/frontend/src/Components/layout/Sidebar.tsx
                {/* Navigation Menu */}
                <nav className="flex flex-col gap-1">
                    {navItems.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => navigate(item.path)}
                            className={`
                                flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all cursor-pointer group
                                ${isActive(item.path)
                                    ? 'bg-primary/10 text-primary border border-primary/20 shadow-lg shadow-primary/5'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                                }
                                ${isCollapsed ? 'justify-center px-0' : ''}
                            `}
                        >
                            <span
                                className="material-symbols-outlined transition-transform group-hover:scale-110"
                                style={item.iconFilled && isActive(item.path) ? { fontVariationSettings: "'FILL' 1" } : {}}
                            >
                                {item.icon}
                            </span>
                            {!isCollapsed && <p className="text-sm font-bold whitespace-nowrap">{item.label}</p>}
                        </div>
                    ))}
                </nav>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col gap-4">
                {/* Connected Wallet Info */}
                <div className={`p-3 bg-white/5 rounded-lg border border-white/10 ${isCollapsed ? 'flex justify-center transition-all' : ''}`}>
                    {!isCollapsed && <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-2">Network Active</p>}
                    <div className="flex items-center gap-2">
                        <div className="size-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        {!isCollapsed && <p className="text-xs text-slate-200 font-mono font-bold tracking-tight">0x71C...d897</p>}
                    </div>
                </div>

                {/* Action Button */}
=======
                <nav className="flex-1 overflow-y-auto overflow-x-hidden pt-4 custom-scrollbar">
                    <div className="flex flex-col gap-1 pb-4">
                        {navItems.map(renderNavItem)}
                    </div>
                </nav>
            </div>

            <div className="flex flex-col gap-4 p-4 mt-auto border-t border-slate-800/50 bg-[#111318] shrink-0">
                {!isCollapsed ? (
                    <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                        <p className="text-[10px] text-slate-500 uppercase font-bold mb-2">Connected Wallet</p>
                        <div className="flex items-center gap-2">
                            <div className="size-2 rounded-full bg-accent-emerald animate-pulse"></div>
                            <p className="text-xs text-slate-200 font-mono">0x71C...d897</p>
                        </div>
                    </div>
                ) : (
                    <div className="p-2 mx-auto bg-slate-900/50 rounded-lg border border-slate-800" title="0x71C...d897">
                        <div className="size-2 rounded-full bg-accent-emerald animate-pulse"></div>
                    </div>
                )}

>>>>>>> 06208e11d80f527e765229f62409c1606dac0376:apps/frontend/src/Components/common/Sidebar.tsx
                {!isCollapsed ? (
                    <Button
                        className="w-full h-11"
                        onClick={() => navigate("/connect")}
                        icon={<span className="material-symbols-outlined text-lg">account_balance_wallet</span>}
                    >
                        Wallet Active
                    </Button>
                ) : (
                    <button
                        className="flex size-11 mx-auto cursor-pointer items-center justify-center rounded-lg bg-primary text-white hover:bg-primary/90 transition-all border-none shadow-lg shadow-primary/20"
                        onClick={() => navigate("/connect")}
                    >
                        <span className="material-symbols-outlined">wallet</span>
                    </button>
                )}

<<<<<<< HEAD:apps/frontend/src/Components/layout/Sidebar.tsx
                {/* Footer Links */}
                <div className={`flex flex-col gap-1 border-t border-white/5 pt-2 ${isCollapsed ? 'items-center' : ''}`}>
                    <SidebarLink icon="menu_book" label="Docs" collapsed={isCollapsed} />
                    <SidebarLink icon="support" label="Support" collapsed={isCollapsed} />
=======
                <div className={`flex flex-col gap-1 border-t border-slate-800 pt-1 ${isCollapsed ? 'items-center' : ''}`}>
                    <div className={`flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white cursor-pointer ${isCollapsed ? 'justify-center px-0' : ''}`} title="Documentation">
                        <span className="material-symbols-outlined text-lg">menu_book</span>
                        {!isCollapsed && <p className="text-xs font-medium">Documentation</p>}
                    </div>
                    <div className={`flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white cursor-pointer ${isCollapsed ? 'justify-center px-0' : ''}`} title="Support">
                        <span className="material-symbols-outlined text-lg">support</span>
                        {!isCollapsed && <p className="text-xs font-medium">Support</p>}
                    </div>
>>>>>>> 06208e11d80f527e765229f62409c1606dac0376:apps/frontend/src/Components/common/Sidebar.tsx
                </div>
            </div>
        </aside>
    );
}

const SidebarLink: React.FC<{ icon: string; label: string; collapsed: boolean }> = ({ icon, label, collapsed }) => (
    <div className={`flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white cursor-pointer transition-colors group ${collapsed ? 'justify-center px-0' : ''}`} title={label}>
        <span className="material-symbols-outlined text-lg group-hover:scale-110 transition-transform">{icon}</span>
        {!collapsed && <p className="text-xs font-bold uppercase tracking-widest">{label}</p>}
    </div>
);

export default Sidebar;
