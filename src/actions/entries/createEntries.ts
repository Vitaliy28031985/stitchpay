import "server-only";

import { supabaseServer } from "@/shared/api/supabase/server";
import type {
  CreateEntryData,
  Entry
} from "@/shared/interfaces/entries";

export async function createEntries(
  data: CreateEntryData
): Promise<Entry> {

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
  if (typeof data.name !== "string" || !data.name.trim()) {
    throw new Error("Введіть назву операції");
  }

  if (
    typeof data.price !== "number" ||
    !Number.isFinite(data.price) ||
    data.price < 0
  ) {
    throw new Error("Некоректна ціна операції");
  }

  if (
    typeof data.qty !== "number" ||
    !Number.isFinite(data.qty) ||
    data.qty < 0
  ) {
    throw new Error("Некоректна кількість операції");
  }

  if (
    !(data.date instanceof Date) ||
    Number.isNaN(data.date.getTime())
  ) {
    throw new Error("Некоректна дата операції");
  }

  // 3. Отримуємо останній порядковий номер
  const { data: lastEntry, error: sequenceError } =
    await supabase
      .from("entries")
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
  const date = data.date.toISOString().slice(0, 10);

  // 6. Створюємо запис
  const { data: entry, error } = await supabase
    .from("entries")
    .insert({
      name: data.name.trim(),
      price: data.price,
      qty: data.qty,
      date,
      sequence_number: nextSequenceNumber,
    })
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  if (!entry) {
    throw new Error("Операцію не вдалося створити");
  }

  return entry as Entry;
}