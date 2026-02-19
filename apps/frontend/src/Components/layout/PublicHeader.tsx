import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../common/Button';
import { PublicHeaderBrand } from './publicHeader/PublicHeaderBrand';
import { PublicHeaderDesktopNav } from './publicHeader/PublicHeaderDesktopNav';
import { PublicHeaderMobileNav } from './publicHeader/PublicHeaderMobileNav';

export const PublicHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-solid border-slate-200 bg-background-light/80 px-4 py-4 backdrop-blur-md dark:border-[#282e39] dark:bg-background-dark/80 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex shrink-0 items-center md:hidden">
            <PublicHeaderMobileNav onNavigate={(path) => navigate(path)} />
          </div>
          <PublicHeaderBrand onNavigateHome={() => navigate('/')} />
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <PublicHeaderDesktopNav />
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Button className="hidden min-w-[120px] md:flex" onClick={() => navigate('/connect')}>
              <span className="text-sm">Connect Wallet</span>
            </Button>
            <Button
              variant="secondary"
              className="min-w-[90px] sm:min-w-[100px]"
              onClick={() => navigate('/login')}
            >
              <span className="text-sm">Sign In</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
