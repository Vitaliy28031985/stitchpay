import "server-only";

import { supabaseServer } from "@/shared/api/supabase/server";

export async function deleteOperation(id: string) {
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
    .delete()
    .eq("id", id)
    .eq("owner_id", user.id)
    .select("id")
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("Операцію не знайдено!");
  }

  return {
    success: true,
    id: data.id,
  };
}