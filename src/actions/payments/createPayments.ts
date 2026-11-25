'use server'

import { supabaseServer } from "@/shared/api/supabase/server";
import { CreatePaymentData, Payment } from "@/shared/interfaces/payments";

export async function createPayment(paymentData: CreatePaymentData ): Promise<Payment> {
    
      const supabase = await supabaseServer();
    
      // 1. Перевіряємо авторизацію
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();
    
      if (authError || !user) {
        throw new Error("Необхідно авторизуватися");
      }
    
      // 2. Перевіряємо вхідні дані
      if (typeof paymentData.comment !== "string" || !paymentData.comment.trim()) {
        throw new Error("Введіть коментар!");
      }
    
      if (
        typeof paymentData.amount !== "number" ||
        !Number.isFinite(paymentData.amount) ||
        paymentData.amount < 0
      ) {
        throw new Error("Некоректна сума");
      }
    
    if (typeof paymentData.kind !== "string" || !paymentData.kind.trim()) {
        throw new Error("Введіть тип виплат!");
      }
      
    
      if (
        !(paymentData.date instanceof Date) ||
        Number.isNaN(paymentData.date.getTime())
      ) {
        throw new Error("Некоректна дата виплати");
      }
    
      // 3. Отримуємо останній порядковий номер
      const { data: lastEntry, error: sequenceError } =
        await supabase
          .from("payments")
          .select("sequence_number")
          .eq("owner_id", user.id)
          .order("sequence_number", { ascending: false })
          .limit(1)
          .maybeSingle();
    
      if (sequenceError) {
        throw new Error(sequenceError.message);
      }
    
      // 4. Наступний номер
      const nextSequenceNumber =
        (lastEntry?.sequence_number ?? 0) + 1;
    
      // 5. Форматуємо дату для PostgreSQL DATE
      const date = paymentData.date.toISOString().slice(0, 10);
    
      // 6. Створюємо запис
      const { data, error } = await supabase
        .from("payments")
        .insert({
          comment: paymentData.comment.trim(),
          kind: paymentData.kind.trim(),
          amount: paymentData.amount,
          date,
          sequence_number: nextSequenceNumber,
        })
        .select("*")
        .single();
    
      if (error) {
        throw new Error(error.message);
      }
    
      if (!data) {
        throw new Error("Виплату не вдалося створити");
      }
    
      return data as Payment;
}