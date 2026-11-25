'use client'

import { deleteOperation } from "@/entities/operations/api/operations";
import { useOperationsStore } from "@/entities/operations/model/store";
import { Pencil, Save, Scissors, Trash2 } from "lucide-react";
import { useState } from "react";

type Operation = { id: number; name: string; price: number };
const initial: Operation[] = [
  { id: 1, name: "Пошиття рукава", price: 25 },
  { id: 2, name: "Обробка коміра", price: 15 },
  { id: 3, name: "Встановлення блискавки", price: 30 },
  { id: 4, name: "Підшивання низу", price: 20 },
  { id: 5, name: "Пошиття кишені", price: 18 }
];


export default function OperationList() {
 const [items, setItems] = useState(initial);
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("25");
  const [editing, setEditing] = useState<number | null>(null);
//   function save() {
//     if (!name.trim() || Number(price) <= 0) return;
//     if (editing) setItems(items.map(x => x.id === editing ? { ...x, name: name.trim(), price: Number(price) } : x));
//     else setItems([...items, { id: Date.now(), name: name.trim(), price: Number(price) }]);
//     setName(""); setPrice("25"); setEditing(null);
//   }

    function edit(item: Operation): void {
        throw new Error("Function not implemented.");
    }

    const { data, onChange, updateOperations, deleteFunctionOperation } = useOperationsStore();

    return (
        <section className="card overflow-hidden bg-white">
        <div className="divide-y divide-slate-100">{data.map(item =>
          <div key={item.id} className="flex items-center gap-3 p-4">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600">
                    <Scissors size={19} />
                </div>
            <div className="min-w-0 flex-1">
              {item.isShow ? (
                <input id={item.id} name='name' type="text" value={item.name} onChange={onChange} className=" truncate text-sm font-semibold appearance-none border-none outline-none bg-transparent shadow-none focus:outline-none focus:ring-0" />
              ) : (<p className="truncate text-sm font-semibold">{item.name}</p>)}
              
              <p className="text-xs text-slate-500">Ціна за одиницю</p>
            </div>
            {item.isShow ? (
            <input id={item.id} name="price" type="number" value={item.price} onChange={onChange} className="w-10 whitespace-nowrap text-sm appearance-none border-none outline-none bg-transparent shadow-none focus:outline-none focus:ring-0" />
            ) : (<p className="whitespace-nowrap text-sm">{item.price.toFixed(2)} ₴</p>)}
            
            <button onClick={async () => await updateOperations({ id: item.id, name: item.name, price: item.price, isShow: item.isShow })} className="rounded-lg p-2 text-blue-600 hover:bg-blue-50" aria-label="Редагувати">
              {item.isShow ? (<Save size={16}  />) : (<Pencil size={16} />)}      
            </button>
            <button onClick={async () => {
              await deleteFunctionOperation(item.id)
            }} className="rounded-lg p-2 text-rose-500 hover:bg-rose-50" aria-label="Видалити">
              <Trash2 size={16} /> 
            </button>
          </div>)}
        </div>
      </section>
    )

}