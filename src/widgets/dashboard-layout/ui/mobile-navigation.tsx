import Link from 'next/link';
import { dashboardNavigation } from '@/shared/config/navigation';

interface MobileNavigationProps { currentPath: string; }

export function MobileNavigation({ currentPath }: MobileNavigationProps) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-5 border-t border-slate-200 bg-white px-1 py-2 md:hidden" aria-label="Мобільна навігація">
      {dashboardNavigation.slice(0, 5).map(({ href, shortLabel, icon: Icon }) => (
        <Link key={href} href={href} aria-current={currentPath === href ? 'page' : undefined} className={`flex flex-col items-center gap-1 py-1 text-[10px] ${currentPath === href ? 'text-blue-600' : 'text-slate-400'}`}>
          <Icon size={19} /> {shortLabel}
        </Link>
      ))}
    </nav>
  );
}
