import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Navigation item type
interface NavItem {
    id: string;
    label: string;
    icon: string;
    path: string;
    iconFilled?: boolean;
}

function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Navigation items
    const navItems: NavItem[] = [
        { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', path: '/', iconFilled: true },
        { id: 'pipelines', label: 'Pipelines', icon: 'account_tree', path: '/pipelines' },
        { id: 'ipfs', label: 'IPFS Templates', icon: 'description', path: '/ipfs-templates' },
        { id: 'audit', label: 'Audit Logs', icon: 'security', path: '/audit-logs' },
        { id: 'settings', label: 'Settings', icon: 'settings', path: '/settings' },
    ];

    // Check if nav item is active
    const isActive = (path: string) => location.pathname === path;

    return (
        <aside className={`${isCollapsed ? 'w-20' : 'w-64'} flex flex-col justify-between bg-[#111318] border-r border-slate-800 p-4 transition-all duration-300`}>
            {/* Top Section */}
            <div className="flex flex-col gap-8">
                {/* Logo & Toggle */}
                <div className={`flex items-center ${isCollapsed ? 'flex-col justify-center gap-4' : 'justify-between'} px-2 overflow-hidden transition-all duration-300`}>
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
                    {/* Collapsed Logo (Shown only when collapsed) */}
                    <div className={`${isCollapsed ? 'flex' : 'hidden'} bg-primary rounded-lg size-10 items-center justify-center shrink-0`}>
                        <span className="material-symbols-outlined text-white">deployed_code</span>
                    </div>

                    {/* Hamburger Toggle */}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="text-slate-400 hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0 flex items-center justify-center"
                    >
                        <span className="material-symbols-outlined text-xl">{isCollapsed ? 'chevron_right' : 'menu_open'}</span>
                    </button>
                </div>

                {/* Navigation Menu */}
                <nav className="flex flex-col gap-1">
                    {navItems.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => navigate(item.path)}
                            className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors cursor-pointer
                ${isActive(item.path)
                                    ? 'bg-primary/10 text-primary border border-primary/20'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                }
                ${isCollapsed ? 'justify-center px-0' : ''}
              `}
                        >
                            <span
                                className="material-symbols-outlined"
                                style={item.iconFilled && isActive(item.path) ? { fontVariationSettings: "'FILL' 1" } : {}}
                            >
                                {item.icon}
                            </span>
                            {!isCollapsed && <p style={{ fontSize: '0.8em' }} className="text-sm font-medium whitespace-nowrap">{item.label}</p>}
                        </div>
                    ))}
                </nav>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col gap-4">
                {/* Connected Wallet */}
                {!isCollapsed ? (
                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                        <p className="text-[10px] text-slate-500 uppercase font-bold mb-2">Connected Wallet</p>
                        <div className="flex items-center gap-2">
                            <div className="size-2 rounded-full bg-accent-emerald animate-pulse"></div>
                            <p className="text-xs text-slate-200 font-mono">0x71C...d897</p>
                        </div>
                    </div>
                ) : (
                    <div className="p-2 mx-auto bg-slate-900 rounded-lg border border-slate-800" title="0x71C...d897">
                        <div className="size-2 rounded-full bg-accent-emerald animate-pulse"></div>
                    </div>
                )}

                {/* MetaMask Button */}
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

                {/* Footer Links */}
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
