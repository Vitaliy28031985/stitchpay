import type { ReactNode } from 'react';
import { ShieldCheck, Sparkles } from 'lucide-react';
import { BrandMark } from '@/shared/ui/brand-mark';

interface AuthLayoutProps {
  children: ReactNode;
  caption: string;
}

export function AuthLayout({ children, caption }: AuthLayoutProps) {
  return (
    <main className="auth-bg min-h-screen px-4 py-8 sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl overflow-hidden rounded-[28px] bg-white shadow-2xl shadow-blue-950/10">
        <aside className="relative hidden w-[42%] flex-col justify-between overflow-hidden bg-[#172554] p-10 text-white lg:flex">
          <div className="absolute -right-24 top-24 h-72 w-72 rounded-full border-[40px] border-white/5" />
          <div className="absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-blue-500/20 blur-2xl" />
          <div className="relative"><BrandMark light /></div>
          <div className="relative max-w-sm">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs text-blue-100"><Sparkles size={14} /> Простий облік щодня</div>
            <h1 className="text-4xl font-bold leading-tight">Твоя робота.<br />Твій заробіток.<br /><span className="text-blue-300">Твій контроль.</span></h1>
            <p className="mt-5 leading-7 text-blue-100/80">Зручно записуй виконані операції, стеж за виплатами та бач результати своєї праці.</p>
            <div className="mt-9 flex items-center gap-3 text-sm text-blue-100/80"><ShieldCheck size={18} /> Особистий та захищений кабінет</div>
          </div>
          <p className="relative text-xs text-blue-100/50">© 2026 StitchPay</p>
        </aside>
        <section className="flex w-full items-center justify-center px-5 py-10 sm:px-10 lg:w-[58%]">
          <div className="w-full max-w-[430px]">
            <div className="mb-8 lg:hidden"><BrandMark compact /></div>
            <div className="mb-7">
              <p className="text-sm font-semibold text-blue-600">STITCHPAY</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{caption}</h2>
            </div>
            {children}
            <p className="mt-8 text-center text-xs text-slate-400">Продовжуючи, ви погоджуєтеся з умовами використання та політикою конфіденційності.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
