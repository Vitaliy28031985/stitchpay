'use client'

import { useOperationsStore } from "@/entities/operations/model/store";
import { Plus } from "lucide-react";
import { useState } from "react";



export default function CreateOperation() {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
 
  
    
    const { createOperation } = useOperationsStore();

    
    return (
        <section className="card h-fit p-4 bg-white md:p-5">
            {/* <h2 className="font-bold">{editing ? "Редагувати операцію" : "Нова операція"}</h2> */}
            <h2 className="font-bold">Нова операція</h2>
        <p className="mb-4 mt-1 text-xs text-slate-500">Вкажіть назву та вартість виконання</p>
        <label className="mb-1 block text-xs font-semibold text-slate-600">Назва операції</label>
            <input className="field mb-3" value={name} onChange={e => setName(e.target.value)}
                placeholder="Наприклад, пошиття кишені" />
        <label className="mb-1 block text-xs font-semibold text-slate-600">Ціна за одиницю, ₴</label>
        <input className="field mb-4" type="number" min="0.01" step="0.01" value={price} onChange={e => setPrice(e.target.value)} />
            <button className="btn-primary w-full" onClick={async () => {
                await createOperation({ name, price: Number(price) });
                setName("");
                setPrice("");
            }}><Plus size={17} />Додати операцію</button>
        
      </section>
    )
}