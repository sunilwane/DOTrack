import { Button } from "../common/Button";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

function Topbar() {
    const { user, signout } = useAuth();
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSignOut = async () => {
        try {
            await signout();
            navigate('/login');
        } catch (error) {
            console.error('Sign out error:', error);
        }
    };

    return (
        <header className="flex items-center justify-between sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-6 sm:px-8 py-4">
            <div className="flex items-center gap-6">
                <h2 className="text-slate-900 dark:text-white font-bold text-sm uppercase tracking-wider">Project Overview</h2>
                <div className="hidden sm:block h-6 w-px bg-slate-200 dark:bg-slate-800"></div>
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-colors cursor-default">
                    <span className="material-symbols-outlined text-sm text-primary">hub</span>
                    <span className="text-[10px] font-black uppercase tracking-widest dark:text-slate-300">Mainnet-v2.0</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                
                <label className="relative hidden md:flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-slate-500 text-lg">
                        search
                    </span>
                    <input
                        className="w-64 pl-10 pr-4 py-2 rounded-lg bg-slate-200/50 dark:bg-slate-800/50 border border-transparent focus:border-primary focus:bg-white dark:focus:bg-slate-800 text-sm text-slate-900 dark:text-white outline-none transition-all placeholder-slate-500"
                        placeholder="Search deployments..."
                    />
                </label>

                
                <Button 
                    variant="secondary" 
                    size="md" 
                    icon={<span className="material-symbols-outlined" aria-hidden="true">add_circle</span>}
                    aria-label="New Pipeline"
                >
                    <span className="hidden sm:inline text-sm">New Pipeline</span>
                </Button>

                <div className="relative" ref={menuRef}>
                    <div className="relative">
                        <div 
                            className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 p-0.5"
                            style={{
                                zIndex: -1
                            }}
                        ></div>
                        <button
                            onClick={() => setShowMenu(!showMenu)}
                            className="relative size-10 rounded-full "
                            aria-label="User menu"
                            title="Click to open user menu"
                        >
                            <div
                                className="w-full h-full rounded-full bg-gradient-to-br from-yellow-200 to-yellow-400 flex items-center justify-center text-slate-900 font-bold text-sm shadow-md"
                            >
                                {user?.email ? (
                                    <span className="text-sm font-bold uppercase">
                                        {user.email.charAt(0)}
                                    </span>
                                ) : (
                                    <span className="material-symbols-outlined text-white text-lg">person</span>
                                )}
                            </div>
                        </button>
                    </div>

                    {showMenu && (
                        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-200 dark:border-slate-800 py-2 z-50">
                            <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800">
                                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                                    {user?.email || 'User'}
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                    {user?.sub ? `ID: ${user.sub.substring(0, 8)}...` : ''}
                                </p>
                            </div>

                            <div className="py-1">
                                <button
                                    onClick={() => {
                                        setShowMenu(false);
                                    }}
                                    className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-3 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-lg">person</span>
                                    <span>Profile</span>
                                    <span className="ml-auto text-xs text-slate-400">(Coming Soon)</span>
                                </button>
                                
                                <button
                                    onClick={() => {
                                        setShowMenu(false);
                                        handleSignOut();
                                    }}
                                    className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-lg">logout</span>
                                    <span>Sign Out</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Topbar;
