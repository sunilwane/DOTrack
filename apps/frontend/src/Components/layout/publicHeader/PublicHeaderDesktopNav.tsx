import { Link } from 'react-router-dom';
import { publicHeaderDesktopNavItems } from './navigationItems';

const PublicHeaderNavLink = ({ href, label }: { href: string; label: string }) => (
  <Link className="shrink-0 text-sm font-medium transition-colors hover:text-primary" to={href}>
    {label}
  </Link>
);

export const PublicHeaderDesktopNav = () => (
  <nav className="mr-4 hidden items-center gap-6 lg:flex lg:gap-8">
    {publicHeaderDesktopNavItems.map((item) => (
      <PublicHeaderNavLink key={item.key} href={item.href} label={item.label} />
    ))}
  </nav>
);
