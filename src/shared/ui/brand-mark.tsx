import Link from 'next/link';
import { Scissors } from 'lucide-react';

interface BrandMarkProps {
  light?: boolean;
  compact?: boolean;
}

export function BrandMark({ light = false, compact = false }: BrandMarkProps) {
  return (
    <Link href="/dashboard" className="inline-flex items-center gap-3" aria-label="StitchPay — головна">
      <span className={`grid place-items-center rounded-xl ${compact ? 'h-10 w-10' : 'h-12 w-12'} ${light ? 'bg-blue-500 text-white' : 'bg-blue-600 text-white'}`}>
        <Scissors size={compact ? 21 : 25} />
      </span>
      <span className={`text-xl font-bold tracking-tight ${light ? 'text-white' : 'text-slate-900'}`}>StitchPay</span>
    </Link>
  );
}
