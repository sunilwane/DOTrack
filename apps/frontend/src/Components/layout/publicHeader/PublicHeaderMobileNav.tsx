import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { publicHeaderMobileNavItems } from './navigationItems';

interface PublicHeaderMobileNavProps {
  onNavigate: (path: string) => void;
}

export const PublicHeaderMobileNav = ({ onNavigate }: PublicHeaderMobileNavProps) => (
  <Dropdown
    placement="bottom-start"
    className="border border-slate-200 dark:border-slate-800 dark:bg-[#1b1f27]"
  >
    <DropdownTrigger>
      <button className="flex size-9 items-center justify-center rounded-lg transition-colors hover:bg-slate-100 dark:hover:bg-white/5">
        <span className="material-symbols-outlined text-[24px]">more_vert</span>
      </button>
    </DropdownTrigger>
    <DropdownMenu
      aria-label="Mobile Navigation"
      variant="flat"
      className="p-2"
      itemClasses={{
        base: [
          'rounded-xl',
          'transition-opacity',
          'data-[hover=true]:bg-primary/10',
          'data-[hover=true]:text-primary',
          'px-4',
          'py-3',
        ],
      }}
    >
      {publicHeaderMobileNavItems.map((item) => (
        <DropdownItem
          key={item.key}
          textValue={item.label}
          className={item.isPrimary ? 'mb-1 font-bold text-primary' : ''}
          showDivider={item.showDivider}
          onClick={() => onNavigate(item.href)}
        >
          <div className="flex items-center gap-3">
            {item.isPrimary ? (
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              </div>
            ) : (
              <span className="material-symbols-outlined text-[20px] opacity-60">{item.icon}</span>
            )}
            <span className={item.isPrimary ? 'text-sm font-bold' : 'text-sm'}>{item.label}</span>
          </div>
        </DropdownItem>
      ))}
    </DropdownMenu>
  </Dropdown>
);
