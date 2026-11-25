import { supabaseServer } from "@/shared/api/supabase/server";
import { Entry, EntriesResponse } from "@/shared/interfaces/entries";

export async function getEntries(): Promise<EntriesResponse> {
  const supabase = await supabaseServer();

  // 1. Перевіряємо авторизацію
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("Необхідно авторизуватися");
  }

  // 2. Отримуємо всі роботи
  const { data, error } = await supabase
    .from("entries")
    .select("*")
    .eq("owner_id", user.id)
    .order("sequence_number", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  const entries = (data ?? []) as Entry[];

  // 3. Обчислюємо загальну суму
  const total = entries.reduce(
    (sum, entry) => sum + Number(entry.result),
    0
  );

  // 4. Повертаємо роботи та загальну суму
  return {
    entries,
    total,
  };
}