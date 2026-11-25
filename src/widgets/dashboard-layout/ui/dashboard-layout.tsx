'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { Sidebar } from './sidebar';
import { DashboardHeader } from './dashboard-header';
import { MobileNavigation } from './mobile-navigation';

interface DashboardLayoutProps {
  title: string;
  children: ReactNode;
}

export function DashboardLayout({ title, children }: DashboardLayoutProps) {
  const currentPath = usePathname();

  return (
    <div className="min-h-screen bg-[#f6f8fc] md:flex">
      <Sidebar currentPath={currentPath} />
      <main className="min-w-0 flex-1 pb-24 md:pb-8">
        <DashboardHeader title={title} />
        <div className="mx-auto max-w-7xl p-5 sm:p-8">{children}</div>
      </main>
      <MobileNavigation currentPath={currentPath} />
    </div>
  );
}
