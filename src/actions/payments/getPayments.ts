'use server'

import { supabaseServer } from "@/shared/api/supabase/server";
import { Payment, PaymentsResponse } from "@/shared/interfaces/payments";

export async function getPayments(): Promise<PaymentsResponse> {
      const supabase = await supabaseServer();
    
      // 1. Перевіряємо авторизацію
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();
    
      if (authError || !user) {
        throw new Error("Необхідно авторизуватися");
    }
    
      const { data, error } = await supabase
    .from("payments")
    .select("*")
    .eq("owner_id", user.id)
    .order("sequence_number", { ascending: true });

    if (error) {
    throw new Error(error.message);
    }
    
    const payments = (data ?? []) as Payment[];
    
    const total = payments.reduce(
    (sum, entry) => sum + Number(entry.amount),
    0
    );

    return {
    payments,
    total,
  };
    
}