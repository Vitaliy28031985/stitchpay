import {
  CalendarDays,
  ChartNoAxesCombined,
  Home,
  Scissors,
  Settings,
  Wallet,
  type LucideIcon,
} from 'lucide-react';

export interface NavigationItem {
  href: string;
  label: string;
  shortLabel: string;
  icon: LucideIcon;
}

export const dashboardNavigation: NavigationItem[] = [
  { href: '/dashboard', label: 'Головна', shortLabel: 'Головна', icon: Home },
  { href: '/operations', label: 'Мої операції', shortLabel: 'Операції', icon: Scissors },
  { href: '/work', label: 'Облік роботи', shortLabel: 'Робота', icon: CalendarDays },
  { href: '/payments', label: 'Мої виплати', shortLabel: 'Виплати', icon: Wallet },
  { href: '/analytics', label: 'Аналітика', shortLabel: 'Аналітика', icon: ChartNoAxesCombined },
  { href: '/settings', label: 'Налаштування', shortLabel: 'Налаштування', icon: Settings },
];
