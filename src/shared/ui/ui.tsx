import { ReactNode } from "react";

export function PageTitle({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><h1 className="text-2xl font-bold tracking-tight text-navy md:text-3xl">{title}</h1><p className="mt-1 text-sm text-slate-500">{description}</p></div>{action}</div>;
}

export function StatCard({ title, value, note, tone = "blue", icon }: { title: string; value: string; note?: string; tone?: "green"|"blue"|"orange"|"purple"; icon: ReactNode }) {
  const tones = { green: "bg-emerald-50 text-emerald-700 border-emerald-100", blue: "bg-blue-50 text-blue-700 border-blue-100", orange: "bg-orange-50 text-orange-700 border-orange-100", purple: "bg-violet-50 text-violet-700 border-violet-100" };
  return <div className={`rounded-2xl border p-4 ${tones[tone]}`}><div className="flex items-center justify-between gap-2"><p className="text-xs font-semibold opacity-80 sm:text-sm">{title}</p><span className="grid h-9 w-9 place-items-center rounded-xl bg-white/80">{icon}</span></div><p className="mt-3 text-2xl font-bold tracking-tight">{value}</p>{note && <p className="mt-1 text-xs opacity-75">{note}</p>}</div>;
}

export function EmptyHint({ children }: { children: ReactNode }) {
  return <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center text-sm text-slate-500">{children}</div>;
}
