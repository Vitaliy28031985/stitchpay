'use server'

import { supabaseServer } from "@/shared/api/supabase/server";
import { Operation } from "@/shared/interfaces/operation";

// Отримання списку операцій
export async function getOperations(): Promise<Operation[]> {
  const supabase = await supabaseServer();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("Необхідно авторизуватися");
  }

  const { data, error } = await supabase
    .from("operations")
    .select("*")
    .eq("owner_id", user.id)
    .order("sequence_number", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data as Operation[];
}