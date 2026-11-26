
import { supabase } from '@/shared/api/supabase/client';

const SUPABASE_SETUP_ERROR =
  'Додайте URL та ключ Supabase у файл .env.local, щоб увімкнути авторизацію.';

// Формуємо адресу серверного callback
function getAuthCallbackUrl(type?: string): string {
  const url = new URL(
    '/api/auth/callback',
    window.location.origin
  );

  if (type) {
    url.searchParams.set('type', type);
  }

  return url.toString();
}

// Авторизація через email та пароль
export async function signInWithEmail(
  email: string,
  password: string
): Promise<string | null> {
  if (!supabase) return SUPABASE_SETUP_ERROR;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return error?.message ?? null;
}

// Реєстрація через email та пароль
export async function signUpWithEmail(
  name: string,
  email: string,
  password: string
): Promise<string | null> {
  if (!supabase) return SUPABASE_SETUP_ERROR;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
      emailRedirectTo: getAuthCallbackUrl(),
    },
  });

  return error?.message ?? null;
}

// Авторизація через Google
export async function signInWithGoogle(): Promise<string | null> {
  if (!supabase) return SUPABASE_SETUP_ERROR;

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: getAuthCallbackUrl(),
    },
  });

  return error?.message ?? null;
}

// Запит на відновлення пароля
export async function requestPasswordReset(
  email: string
): Promise<string | null> {
  if (!supabase) return SUPABASE_SETUP_ERROR;

  const { error } = await supabase.auth.resetPasswordForEmail(
    email,
    {
      redirectTo: getAuthCallbackUrl('recovery'),
    }
  );

  return error?.message ?? null;
}

// Оновлення пароля
export async function updatePassword(
  password: string
): Promise<string | null> {
  if (!supabase) return SUPABASE_SETUP_ERROR;

  const { error } = await supabase.auth.updateUser({
    password,
  });

  return error?.message ?? null;
}

// Старий клієнтський обмін коду.
// Для нового OAuth callback використовується route.ts на сервері.
export async function exchangeAuthCode(
  code: string
): Promise<string | null> {
  if (!supabase) return SUPABASE_SETUP_ERROR;

  const { error } =
    await supabase.auth.exchangeCodeForSession(code);

  return error?.message ?? null;
}

// Вихід із системи
export async function signOut(): Promise<string | null> {
  if (!supabase) return SUPABASE_SETUP_ERROR;

  const { error } = await supabase.auth.signOut();

  return error?.message ?? null;
}
