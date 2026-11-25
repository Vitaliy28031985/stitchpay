
"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  ArrowRight,
  Loader2,
  Lock,
  Mail,
} from "lucide-react";

import { signInWithEmail } from "@/features/auth/model/auth-service";
import { useAuthStore } from "@/features/auth/model/auth-store";

import { AuthDivider } from "./auth-divider";
import { FormField } from "./form-field";
import { GoogleAuthButton } from "./google-auth-button";

export function LoginForm() {
  const router = useRouter();

  // Локальний стан форми
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [mounted, setMounted] = useState(false);

  // Глобальний стан авторизації
  const user = useAuthStore((state) => state.user);

  const isInitialized = useAuthStore(
    (state) => state.isInitialized
  );

  // Очікуємо монтування компонента
  useEffect(() => {
    setMounted(true);
  }, []);

  // Перенаправляємо після оновлення Zustand
  useEffect(() => {
    if (mounted && isInitialized && user) {
      router.replace("/dashboard");
      router.refresh();
    }
  }, [mounted, isInitialized, user, router]);

  // Обробка входу
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (busy) return;

    setMessage("");

    if (!email.trim() || !password) {
      setMessage("Заповніть усі поля.");
      return;
    }

    setBusy(true);

    try {
      const error = await signInWithEmail(
        email.trim(),
        password
      );

      if (error) {
        setMessage(error);
        return;
      }

      setMessage("Вхід успішний. Завантажуємо ваш кабінет...");

      // Не робимо router.push тут.
      // Чекаємо, поки AuthProvider оновить Zustand.

    } catch (error) {
      console.error("Login error:", error);

      setMessage("Не вдалося виконати вхід. Спробуйте ще раз.");

    } finally {
      setBusy(false);
    }
  };

  // Запобігаємо hydration mismatch
  if (!mounted || !isInitialized || user) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2
          className="animate-spin text-blue-600"
          size={28}
        />
      </div>
    );
  }

  return (
    <>
      <GoogleAuthButton onError={setMessage} />

      <AuthDivider />

      <form onSubmit={submit} className="space-y-4">
        <FormField
          label="Електронна пошта"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="name@example.com"
          icon={Mail}
          autoComplete="email"
        />

        <FormField
          label="Пароль"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="Введіть пароль"
          icon={Lock}
          autoComplete="current-password"
        />

        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Забули пароль?
          </Link>
        </div>

        <button
          type="submit"
          disabled={busy}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:opacity-60"
        >
          {busy ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <>
              Увійти
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      {message && (
        <p
          role="status"
          className="mt-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-700"
        >
          {message}
        </p>
      )}

      <p className="mt-6 text-center text-sm text-slate-500">
        Ще не маєте акаунта?{" "}
        <Link
          href="/register"
          className="font-semibold text-blue-600"
        >
          Зареєструватися
        </Link>
      </p>
    </>
  );
}
