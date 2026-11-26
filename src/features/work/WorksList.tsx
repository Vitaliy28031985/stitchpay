'use client'

import { useEntriesStore } from "@/entities/entries/model/model"
import { formatDate } from "@/shared/utils/formatDate";
import { Trash2 } from "lucide-react";

export default function WorksList() {

  const { data, total, deleteFunctionEntry } = useEntriesStore();
  
  
    return (
    <section className="card overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 p-4 md:p-5">
        <div>
          <h2 className="font-bold">Записи разом</h2>
         </div>
        <div className="rounded-xl bg-emerald-50 px-4 py-2 text-right">
          <b className="text-xl text-emerald-700">{total} ₴</b>
        </div>
      </div>
<div className="divide-y divide-slate-100">
  {data.map((x) => (
    <div key={x.id} className="flex items-center gap-3 p-4">
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{x.name}</p>

        <p className="text-xs text-slate-500">
          {x.qty} шт. × {x.price} ₴
        </p>
        
          <p className="text-xs text-slate-500">
          {x.model ?? ''}
        </p>

        <p className="mt-1 text-xs text-slate-400">
          {formatDate(x.date)}
        </p>
      </div>

      <b className="whitespace-nowrap text-sm">
        {x.result.toLocaleString("uk-UA")} ₴
      </b>

      <button
        onClick={async () => {
          deleteFunctionEntry(x.id);
        }}
        className="rounded-lg p-2 text-rose-500 hover:bg-rose-50"
        aria-label="Видалити запис"
      >
        <Trash2 size={16} />
      </button>
    </div>
  ))}
</div>
    </section>
    )
}