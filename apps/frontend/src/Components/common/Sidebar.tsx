import * as React from "react";
import { useNavigate, useLocation } from 'react-router-dom';

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
        <aside className={`${isCollapsed ? 'w-20' : 'w-64'} flex flex-col justify-between bg-[#111318] border-r border-slate-800 transition-all duration-300 fixed left-0 top-0 h-screen z-50`}>
            <div className="flex flex-col flex-1 min-h-0 pt-4 px-4 overflow-hidden">
                <div className={`flex items-center ${isCollapsed ? 'flex-col justify-center gap-4' : 'justify-between'} px-2 mb-8 shrink-0 overflow-hidden transition-all duration-300`}>
                    <div className={`flex items-center gap-3 ${isCollapsed ? 'hidden' : 'flex'}`}>
                        <div className="bg-primary rounded-lg size-10 flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-white">deployed_code</span>
                        </div>
                        <div className="flex flex-col whitespace-nowrap overflow-hidden">
                            <h1 className="text-white text-[0.8em] font-bold leading-none">Nexus DevOps</h1>
                            <p className="text-[#9ca6ba] text-[10px] uppercase tracking-wider font-semibold">
                                Web3 CI/CD
                            </p>
                        </div>
                    </div>
                    <div className={`${isCollapsed ? 'flex' : 'hidden'} bg-primary rounded-lg size-10 items-center justify-center shrink-0`}>
                        <span className="material-symbols-outlined text-white">deployed_code</span>
                    </div>

                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="text-slate-400 hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0 flex items-center justify-center"
                    >
                        <span className="material-symbols-outlined text-xl">{isCollapsed ? 'chevron_right' : 'menu_open'}</span>
                    </button>
                </div>

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

                {!isCollapsed ? (
                    <button style={{ fontSize: '0.8em' }} className="flex w-full cursor-pointer items-center justify-center rounded-lg h-10 px-4 mt-1 bg-primary text-white font-bold transition-all hover:bg-blue-600 border-none">
                        <span style={{ fontSize: '1.5em' }} className="material-symbols-outlined text-sm mr-2">wallet</span>
                        <span className="truncate">MetaMask Active</span>
                    </button>
                ) : (
                    <button className="flex w-10 h-10 mx-auto cursor-pointer items-center justify-center rounded-lg bg-primary text-white hover:bg-blue-600 transition-all border-none" title="MetaMask Active">
                        <span className="material-symbols-outlined">wallet</span>
                    </button>
                )}

                <div className={`flex flex-col gap-1 border-t border-slate-800 pt-1 ${isCollapsed ? 'items-center' : ''}`}>
                    <div className={`flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white cursor-pointer ${isCollapsed ? 'justify-center px-0' : ''}`} title="Documentation">
                        <span className="material-symbols-outlined text-lg">menu_book</span>
                        {!isCollapsed && <p className="text-xs font-medium">Documentation</p>}
                    </div>
                    <div className={`flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white cursor-pointer ${isCollapsed ? 'justify-center px-0' : ''}`} title="Support">
                        <span className="material-symbols-outlined text-lg">support</span>
                        {!isCollapsed && <p className="text-xs font-medium">Support</p>}
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
