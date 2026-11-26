
import { UserAvatar } from '@/entities/user/ui/user-avatar';
import { SignOutButton } from '@/features/auth';

interface DashboardHeaderProps { title: string; }

export function DashboardHeader({ title }: DashboardHeaderProps) {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-5 sm:px-8">
      <div>
        {/* <p className="text-xs text-slate-400">StitchPay / Особистий кабінет</p> */}
        <h1 className="text-lg font-bold text-slate-900">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className='flex justify-center items-center px-4 pb-2 rounded-[16px] bg-[#172554]'>
         <SignOutButton /> 
        </div>
        
      </div>
    </header>
  );
}
