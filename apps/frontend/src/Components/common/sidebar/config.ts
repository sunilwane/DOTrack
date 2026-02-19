export interface NavItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  iconFilled?: boolean;
}

export const sidebarNavItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'dashboard',
    path: '/dashboard',
    iconFilled: true,
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: 'grid_view',
    path: '/all-projects',
    iconFilled: true,
  },
  { id: 'register', label: 'Register Project', icon: 'add_circle', path: '/register-project' },
  { id: 'pipelines', label: 'Pipelines', icon: 'account_tree', path: '/pipelines' },
  { id: 'market', label: 'Marketplace', icon: 'storefront', path: '/marketplace' },
  { id: 'audit', label: 'Audit Logs', icon: 'security', path: '/audit-logs' },
  {
    id: 'version-history',
    label: 'Version History',
    icon: 'history',
    path: '/version-history',
    iconFilled: true,
  },
  { id: 'blockchain', label: 'Blockchain', icon: 'link', path: '/blockchain' },
  { id: 'settings', label: 'Settings', icon: 'settings', path: '/settings' },
];

export const sidebarExternalLinks = [
  { icon: 'menu_book', label: 'Docs', url: 'https://docs.example.com' },
  { icon: 'support', label: 'Support', url: 'https://support.example.com' },
] as const;
