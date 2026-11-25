import Link from 'next/link';
import { dashboardNavigation } from '@/shared/config/navigation';
import { BrandMark } from '@/shared/ui/brand-mark';
import { UserAvatar } from '@/entities/user/ui/user-avatar';
import { SignOutButton } from '@/features/auth/ui/sign-out-button';

interface SidebarProps { currentPath: string; }

export function Sidebar({ currentPath }: SidebarProps) {
  return (
    <aside className="hidden w-64 shrink-0 flex-col bg-[#172554] px-5 py-6 text-white md:flex">
      <div className="mb-10 px-2"><BrandMark light compact /></div>
      <nav className="space-y-1" aria-label="Головна навігація">
        {dashboardNavigation.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} aria-current={currentPath === href ? 'page' : undefined} className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${currentPath === href ? 'bg-blue-600 text-white' : 'text-blue-100/75 hover:bg-white/10 hover:text-white'}`}>
            <Icon size={18} /> {label}
          </Link>
        ))}
      </nav>
      <div className="mt-auto rounded-2xl bg-white/10 p-4">
        <div className="flex items-center gap-3">
          <UserAvatar className="bg-blue-300 text-blue-950" />
          <div><p className="text-sm font-semibold">Олена Швачка</p><p className="text-xs text-blue-200">Особистий кабінет</p></div>
        </div>
        <SignOutButton />
      </div>
    </aside>
  );
}
