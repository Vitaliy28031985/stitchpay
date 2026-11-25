'use service'

import { supabaseServer } from "@/shared/api/supabase/server";
import { Operation, UpdateOperationData } from "@/shared/interfaces/operation";

export async function updateOperation({ id, name, price }:
    UpdateOperationData): Promise<Operation> {
    
     const supabase = await supabaseServer();

    const {
      data: { user },
     } = await supabase.auth.getUser();

    if (!user) {
       throw new Error("Необхідно авторизуватися");
    }

      const { data: existingOperation, error: existingOperationError } = await supabase
    .from("operations")
    .select("id")
    .eq("id", id)
    .eq("owner_id", user.id)
    .maybeSingle();

  if (existingOperationError) {
    throw new Error(existingOperationError.message);
  }

  if (!existingOperation) {
    throw new Error("Операцію не знайдено");
    }
    

      const { data, error } = await supabase
    .from("operations")
    .update({
      name,
      price,
    })
    .eq("id", id)
    .eq("owner_id", user.id)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("Operation was not updated");
  }

  return data as Operation;;
     
}