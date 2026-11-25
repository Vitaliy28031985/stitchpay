"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useEntriesStore } from "@/entities/entries/model/model";

export default function RecentEntries() {

  const data = useEntriesStore((state) => state.data);

  // Отримуємо останні 5 записів
  const recentEntries = useMemo(() => {
    return [...data]
      .sort((a, b) => {
        const dateCompare = b.date.localeCompare(a.date);

        if (dateCompare !== 0) {
          return dateCompare;
        }

        return b.sequence_number - a.sequence_number;
      })
      .slice(0, 3);
  }, [data]);

  // Форматування дати
  const formatDate = (date: string) => {
    const [year, month, day] = date.split("-");

    return `${day}.${month}.${year}`;
  };

  return (
    <section className="mt-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-soft">

      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-bold">Останні записи</h3>

        <Link
          href="/work"
          className="text-sm font-semibold text-blue-600"
        >
          Усі записи →
        </Link>
      </div>

      <div className="overflow-x-auto">

        <table className="w-full min-w-[560px] text-left text-sm">

          <thead className="text-xs text-slate-400">
            <tr>
              <th className="pb-3">Дата</th>
              <th>Операція</th>
              <th>Кількість</th>
              <th>Сума</th>
            </tr>
          </thead>

          <tbody className="text-slate-700">

            {recentEntries.length > 0 ? (
              recentEntries.map((entry) => (
                <tr
                  key={entry.id}
                  className="border-t border-slate-100"
                >
                  <td className="py-4 whitespace-nowrap">
                    {formatDate(entry.date)}
                  </td>

                  <td>{entry.name}</td>

                  <td className="whitespace-nowrap">
                    {Number(entry.qty).toLocaleString("uk-UA")} шт.
                  </td>

                  <td className="whitespace-nowrap font-semibold">
                    {Number(entry.result).toLocaleString("uk-UA")} ₴
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="py-8 text-center text-slate-400"
                >
                  Поки що немає виконаних робіт
                </td>
              </tr>
            )}

          </tbody>
        </table>

      </div>
    </section>
  );
}