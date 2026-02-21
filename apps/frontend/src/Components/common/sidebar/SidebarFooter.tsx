import { Button } from '../Button';
import { SimpleTooltip } from '../SimpleTooltip';
import SidebarLink from './SidebarLink';
import { sidebarExternalLinks } from './config';

interface SidebarFooterProps {
  isCollapsed: boolean;
  onConnectWallet: () => void;
}

const SidebarFooter = ({ isCollapsed, onConnectWallet }: SidebarFooterProps) => (
  <div className="flex flex-col gap-4 mt-auto pt-4 border-t border-slate-800/50">
    <div
      className={`p-3 bg-white/5 rounded-lg border border-white/10 ${
        isCollapsed ? 'flex justify-center transition-all' : ''
      }`}
    >
      {!isCollapsed && (
        <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-2">
          Network Active
        </p>
      )}
      <div className="flex items-center gap-2">
        <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
        {!isCollapsed && (
          <p className="text-xs text-slate-200 font-mono font-bold tracking-tight">0x71C...d897</p>
        )}
      </div>
    </div>

    {!isCollapsed ? (
      <Button
        className="w-full h-11"
        onClick={onConnectWallet}
        icon={<span className="material-symbols-outlined size-6.5">account_balance_wallet</span>}
      >
        <span className="text-sm"> Wallet Active</span>
      </Button>
    ) : (
      <SimpleTooltip label="Wallet Active" placement="right" className="w-full">
        <button
          className="flex size-11 mx-auto cursor-pointer items-center justify-center rounded-lg bg-primary text-white hover:bg-primary/90 transition-all border-none shadow-lg shadow-primary/20"
          onClick={onConnectWallet}
        >
          <span className="material-symbols-outlined">wallet</span>
        </button>
      </SimpleTooltip>
    )}

    <div
      className={`flex flex-col gap-1 border-t border-white/5 pt-2 ${
        isCollapsed ? 'items-center' : ''
      }`}
    >
      {sidebarExternalLinks.map((link) => (
        <SidebarLink
          key={link.label}
          icon={link.icon}
          label={link.label}
          collapsed={isCollapsed}
          onClick={() => window.open(link.url, '_blank')}
        />
      ))}
    </div>
  </div>
);

export default SidebarFooter;
