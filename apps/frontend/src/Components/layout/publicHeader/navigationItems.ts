export interface PublicHeaderNavItem {
  key: string;
  label: string;
  href: string;
  icon: string;
  isPrimary?: boolean;
  showDivider?: boolean;
}

export const publicHeaderDesktopNavItems: PublicHeaderNavItem[] = [
  { key: 'features', label: 'Features', href: '/features', icon: 'layers' },
  { key: 'marketplace', label: 'Marketplace', href: '/', icon: 'storefront' },
  { key: 'docs', label: 'Docs', href: '/docs', icon: 'description' },
];

export const publicHeaderMobileNavItems: PublicHeaderNavItem[] = [
  {
    key: 'connect',
    label: 'Connect Wallet',
    href: '/connect',
    icon: 'account_balance_wallet',
    isPrimary: true,
    showDivider: true,
  },
  { key: 'features', label: 'Features', href: '/', icon: 'layers' },
  { key: 'marketplace', label: 'Marketplace', href: '/', icon: 'storefront' },
  { key: 'docs', label: 'Documentation', href: '/', icon: 'description' },
];
