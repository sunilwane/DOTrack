import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { logger } from '../../utils/logger';
import { Button } from './Button';
import { UserAvatarButton } from './topbar/UserAvatarButton';
import { UserDropdownMenu } from './topbar/UserDropdownMenu';
import { useUserMenu } from './topbar/useUserMenu';

function Topbar() {
  const { user, signout } = useAuth();
  const navigate = useNavigate();
  const { isOpen, menuRef, toggleMenu, closeMenu } = useUserMenu();

  const handleSignOut = useCallback(async () => {
    closeMenu();
    try {
      await signout();
      navigate('/login');
    } catch (error) {
      logger.error('Sign out failed', error instanceof Error ? error : undefined);
    }
  }, [closeMenu, navigate, signout]);

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-200 bg-background-light/80 px-6 py-4 backdrop-blur-md dark:border-slate-800 dark:bg-background-dark/80 sm:px-8">
      <div className="flex items-center gap-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
          Project Overview
        </h2>
        <div className="hidden h-6 w-px bg-slate-200 dark:bg-slate-800 sm:block" />
        <div className="hidden cursor-default items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-3 py-1.5 transition-colors hover:border-primary/50 dark:border-slate-700 dark:bg-slate-800 sm:flex">
          <span className="material-symbols-outlined text-sm text-primary">hub</span>
          <span className="text-[10px] font-black uppercase tracking-widest dark:text-slate-300">
            Mainnet-v2.0
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <label className="relative hidden items-center md:flex">
          <span className="material-symbols-outlined absolute left-3 text-lg text-slate-500">
            search
          </span>
          <input
            className="w-64 rounded-lg border border-transparent bg-slate-200/50 py-2 pl-10 pr-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-500 focus:border-primary focus:bg-white dark:bg-slate-800/50 dark:text-white dark:focus:bg-slate-800"
            placeholder="Search deployments..."
          />
        </label>

        <Button
          variant="secondary"
          size="md"
          icon={<span className="material-symbols-outlined">add_circle</span>}
          aria-label="New Pipeline"
        >
          <span className="hidden text-sm sm:inline">New Pipeline</span>
        </Button>

        <div className="relative" ref={menuRef}>
          <UserAvatarButton email={user?.email} onClick={toggleMenu} />
          {isOpen && (
            <UserDropdownMenu
              email={user?.email}
              userId={user?.sub}
              onClose={closeMenu}
              onSignOut={handleSignOut}
            />
          )}
        </div>
      </div>
    </header>
  );
}

export default Topbar;
