'use client'

import { useEntriesStore } from "@/entities/entries/model/model";
import { useOperationsStore } from "@/entities/operations/model/store";
import { Plus, } from "lucide-react";
import { useState } from "react";



export default function CreateWork() {
    const { data } = useOperationsStore();
    const {createEntry} = useEntriesStore()
    const [date, setDate] = useState(createCurrentDate());
    const [operation, setOperation] = useState(data[0]?.id);
    const [qty, setQty] = useState("1");

    const selectedOperation = data.find(
       (item) => String(item.id) === operation
  );
  
  function createCurrentDate() {
  const now = new Date();

  const offset = now.getTimezoneOffset() * 60000;

  return new Date(now.getTime() - offset)
    .toISOString()
    .slice(0, 10);
}

   
    return (
        <section className="card mt-3 mb-5 p-4 md:p-5">
      <h2 className="mb-4 font-bold">Додати виконану роботу</h2>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-600">Дата роботи</label>
          <input className="field" type="date" value={date} onChange={e => setDate(e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-600">Операція</label>
            <select
            className="field"
             value={operation}
             onChange={(event) => setOperation(event.target.value)}
               >
            <option value="">Виберіть операцію</option>

           {data.map(({ id, name }) => (
              <option key={id} value={id}>
             {name}
              </option>
                 ))}
             </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-600">Кількість</label>
          <input className="field" type="number" min="1" value={qty} onChange={e => setQty(e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-600">Ціна за одиницю</label>
          <div className="field bg-slate-50">{selectedOperation?.price ?? 0} ₴</div>
        </div>
      </div>
      <div className="mt-4 flex flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-center">
                <p className=" text-sm text-slate-500">Сума нового запису: 
                <b className="text-navy ml-2">
                   {(
                  Number(qty || 0) * (selectedOperation?.price ?? 0)
                   ).toLocaleString("uk-UA")}
                </b>
                </p><button className="btn-primary" onClick={async () => {
                    createEntry({
                        date: new Date(`${date}T00:00:00.000Z`), name: selectedOperation?.name ?? '', qty: Number(qty ?? 0), price: Number(selectedOperation?.price)
                    });
                    setDate(createCurrentDate());
                    setOperation('');
                    setQty('1');
        }}><Plus size={17} /> Додати запис</button>
      </div>
    </section>
    )

}