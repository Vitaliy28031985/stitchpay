'use client'

import { useEntriesStore } from "@/entities/entries/model/model"
import { usePaymentsStore } from "@/entities/payments/model/store"
import { StatCard } from "@/shared/ui/ui";
import { Clock3, Wallet } from "lucide-react";

export default function Report() {
    const {total } = usePaymentsStore()
    const { total: entriesTotal } = useEntriesStore();

    const reportTotal = entriesTotal - total; 
    
    return (
        <>
        <StatCard title="Зароблено" value={`${entriesTotal} ₴`} note="" tone="green" icon={<Wallet size={20} />} />
      <StatCard title="Виплачено" value={`${total.toLocaleString("uk-UA")} ₴`} note="Сума внесених виплат" tone="blue" icon={<Wallet size={20} />} />
      <StatCard title="Залишок до виплати" value={`${reportTotal.toLocaleString("uk-UA")} ₴`} note="Зароблено мінус виплачено" tone="orange" icon={<Clock3 size={20} />} />
        </> 
    )

}