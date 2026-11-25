'use server'

import { supabaseServer } from "@/shared/api/supabase/server";
import { CreateOperationData, Operation } from "@/shared/interfaces/operation";


// Створення операції
export async function createOperation({
  name,
  price,
}: CreateOperationData): Promise<Operation> {
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
  if (typeof name !== "string" || !name.trim()) {
    throw new Error("Введіть назву операції");
  }

  if (
    typeof price !== "number" ||
    !Number.isFinite(price) ||
    price < 0
  ) {
    throw new Error("Некоректна ціна операції");
  }

  // 3. Отримуємо останній порядковий номер
  const { data: lastOperation, error: sequenceError } =
    await supabase
      .from("operations")
      .select("sequence_number")
      .eq("owner_id", user.id)
      .order("sequence_number", { ascending: false })
      .limit(1)
      .maybeSingle();

  if (sequenceError) {
    throw new Error(sequenceError.message);
  }

  // 4. Визначаємо наступний номер
  const nextSequenceNumber =
    (lastOperation?.sequence_number ?? 0) + 1;

  // 5. Створюємо операцію
  const { data, error } = await supabase
    .from("operations")
    .insert({
      name: name.trim(),
      price,
      sequence_number: nextSequenceNumber,
    })
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("Операцію не вдалося створити");
  }

  return data as Operation;
}
