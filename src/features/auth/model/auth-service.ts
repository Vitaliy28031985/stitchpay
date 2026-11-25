import { supabase } from '@/shared/api/supabase/client';

const SUPABASE_SETUP_ERROR = 'Додайте URL та ключ Supabase у файл .env.local, щоб увімкнути авторизацію.';

export async function signInWithEmail(email: string, password: string): Promise<string | null> {
  if (!supabase) return SUPABASE_SETUP_ERROR;
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  return error?.message ?? null;
}

export async function signUpWithEmail(name: string, email: string, password: string): Promise<string | null> {
  if (!supabase) return SUPABASE_SETUP_ERROR;
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name },
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  });
  return error?.message ?? null;
}

export async function signInWithGoogle(): Promise<string | null> {
  if (!supabase) return SUPABASE_SETUP_ERROR;
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: `${window.location.origin}/auth/callback` },
  });
  return error?.message ?? null;
}

export async function requestPasswordReset(email: string): Promise<string | null> {
  if (!supabase) return SUPABASE_SETUP_ERROR;
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/callback?type=recovery`,
  });
  return error?.message ?? null;
}

export async function updatePassword(password: string): Promise<string | null> {
  if (!supabase) return SUPABASE_SETUP_ERROR;
  const { error } = await supabase.auth.updateUser({ password });
  return error?.message ?? null;
}

export async function exchangeAuthCode(code: string): Promise<string | null> {
  if (!supabase) return SUPABASE_SETUP_ERROR;
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  return error?.message ?? null;
}

export async function signOut(): Promise<string | null> {
  if (!supabase) return SUPABASE_SETUP_ERROR;
  const { error } = await supabase.auth.signOut();
  return error?.message ?? null;
}
