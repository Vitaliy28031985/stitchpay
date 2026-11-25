'use client'

import { usePaymentsStore } from "@/entities/payments/model/store";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function CreatePayments() {
    const { createPayment } = usePaymentsStore();
    const [amount,setAmount]=useState("");
    const [date, setDate] = useState(createCurrentDate());
    const [kind,setKind]=useState("Аванс");
    const [comment, setComment] = useState("");

function createCurrentDate() {
  const now = new Date();

  const offset = now.getTimezoneOffset() * 60000;

  return new Date(now.getTime() - offset)
    .toISOString()
    .slice(0, 10);
}
    

    return (
        <section className="card h-fit p-4 md:p-5">
        <h2 className="font-bold">Додати виплату</h2>
        <p className="mb-4 mt-1 text-xs text-slate-500">Вкажіть суму та тип отриманих коштів</p>
        <label className="mb-1 block text-xs font-semibold text-slate-600">Дата</label>
        <input className="field mb-3" type="date" value={date} onChange={e => setDate(e.target.value)} />
        <label className="mb-1 block text-xs font-semibold text-slate-600">Сума, ₴</label>
        <input className="field mb-3" type="number" min="0.01" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Наприклад, 3000" />
        <label className="mb-1 block text-xs font-semibold text-slate-600">Тип виплати</label>
        <select className="field mb-3" value={kind} onChange={e => setKind(e.target.value)}>
          <option>Аванс</option><option>Зарплата</option><option>Часткова виплата</option>
          <option>Інше</option>
        </select>
        <label className="mb-1 block text-xs font-semibold text-slate-600">Коментар</label>
        <input className="field mb-4" value={comment} onChange={e => setComment(e.target.value)} placeholder="Необов’язково" />
            <button className="btn-primary w-full" onClick={async () => {
                createPayment({
                    date: new Date(`${date}T00:00:00.000Z`),
                    comment,
                    amount: Number(amount) ?? 0,
                    kind
                })
                setDate(createCurrentDate());
                setAmount('');
                setComment('');
                setKind('Аванс');
        }}><Plus size={17} /> Зберегти виплату
        </button>
      </section>
    )

}