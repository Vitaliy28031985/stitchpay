'use client'

import { usePaymentsStore } from "@/entities/payments/model/store"
import { Trash2, Wallet } from "lucide-react"


export default function PaymentsList () {

    const { data: payments, deleteFunctionPaymentFetch } = usePaymentsStore();
    
    return (
       <section className="card overflow-hidden">
        <div className="border-b border-slate-100 p-4 md:p-5">
          <h2 className="font-bold">Історія виплат</h2>
          <p className="text-xs text-slate-500">Усі отримані кошти з датами та коментарями</p>
        </div>
        <div className="divide-y divide-slate-100">{payments.map(p =>
          <div key={p.id} className="flex items-center gap-3 p-4">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600">
              <Wallet size={18} /></div><div className="min-w-0 flex-1"><p className="text-sm font-semibold">{p.kind}</p>
              <p className="truncate text-xs text-slate-500">{new Date(p.date + "T00:00:00").toLocaleDateString("uk-UA")} · {p.comment || "Без коментаря"}</p>
            </div>
            <b className="whitespace-nowrap text-sm text-emerald-700">{p.amount.toLocaleString("uk-UA")} ₴</b>
            <button onClick={async () => {deleteFunctionPaymentFetch(p.id)}} className="rounded-lg p-2 text-rose-500 hover:bg-rose-50" aria-label="Видалити виплату">
              <Trash2 size={16} />
            </button>
          </div>)}
        </div>
      </section>
    ) 
}