'use client'

import { ReactNode, useEffect } from "react";
import { useOperationsStore } from "@/entities/operations/model/store";
import { useEntriesStore } from "@/entities/entries/model/model";
import { usePaymentsStore } from "@/entities/payments/model/store";


interface SectionPlaceholderProps {
  title: string;
  description: string;
   children?: ReactNode;
}

export function SectionPlaceholder({ title, description, children }: SectionPlaceholderProps) {

  const { getOperation } = useOperationsStore();
  const { getEntries } = useEntriesStore();
  const {fetchPayments} = usePaymentsStore()
  
  useEffect(() => {
    getOperation();
    getEntries();
    fetchPayments();
  }, [])

  return (
    <section className="rounded-2xl border border-slate-100  p-6 shadow-soft">
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      <p className="mt-2 text-sm text-slate-500">{description}</p>
     {children}

    </section>
  );
}
