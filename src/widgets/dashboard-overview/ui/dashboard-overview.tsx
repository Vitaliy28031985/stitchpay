'use client';

import Link from 'next/link';
import { TrendingUp } from 'lucide-react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useReportsStore } from '@/entities/reports/model/store';
import { useEffect, useMemo } from 'react';
import { useEntriesStore } from '@/entities/entries/model/model';
import { usePaymentsStore } from '@/entities/payments/model/store';
import { getDashboardMetrics } from '@/features/dashboard/getDashboardMetrics';
import RecentEntries from './RecentEntries';

export function DashboardOverview() {

  const { earningsChartData, getEarningsChartData } = useReportsStore();
  const { popularOperations, getEntries, } = useEntriesStore();
  const {fetchPayments} = usePaymentsStore()
  
  const entries = useEntriesStore((state) => state.data);
  const payments = usePaymentsStore((state) => state.data);
  
  useEffect(() => {
    getEntries();
    fetchPayments();
    getEarningsChartData();
  }, [])

    const dashboardMetrics = useMemo(
    () => getDashboardMetrics(entries, payments),
    [entries, payments]
  );

  return (
    <>
      <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
        <div>
          {/* <p className="text-sm text-slate-500">Вітаємо, Олено! 👋</p> */}
          <h2 className="mt-1 text-2xl font-bold text-slate-900">Ваші результати</h2>
        </div>

      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map(({ label, value, trend, tone }) => (
          <section key={label} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">{label}</span>
              <span className={`rounded-xl px-2.5 py-2 text-xs font-bold ${tone}`}>↗</span>
            </div>
            <p className="mt-3 text-2xl font-bold text-slate-900">{value}</p>
            {trend && <p className="mt-1 text-xs font-medium text-emerald-600">↑ {trend} до минулого місяця</p>}
          </section>
        ))}
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-soft">
          <div className="mb-5 flex items-center justify-between"><div>
            <h3 className="font-bold text-slate-900">Динаміка заробітку</h3>
            <p className="mt-1 text-xs text-slate-400">Зароблено та виплачено, ₴</p>
          </div><TrendingUp className="text-blue-500" />
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={earningsChartData} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
                <CartesianGrid stroke="#eef2f7" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis  strokeDasharray="3 3" tick={false} axisLine={false} tickLine={false} width={48} />
                <Tooltip formatter={(value) => `${Number(value).toLocaleString('uk-UA')} ₴`} />
                <Line type="monotone" dataKey="earned" name="Зароблено" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="paid" name="Виплачено" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-soft">
          <h3 className="font-bold text-slate-900">Найпопулярніші операції</h3><p className="mt-1 text-xs text-slate-400">За поточний місяць</p>
          {popularOperations.map(({ name, count, progress }) => (
            <div key={name} className="mt-6">
              <div className="mb-2 flex justify-between gap-3 text-sm"><span className="font-medium text-slate-700">{name}</span><span className="shrink-0 text-slate-400">{count}</span></div>
              <div className="h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-blue-500" style={{ width: `${progress}%` }} /></div>
            </div>
          ))}
        </section>
      </div>

      <RecentEntries/>
    </>
  );
}
