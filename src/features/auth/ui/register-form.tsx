
"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Loader2,
  Lock,
  Mail,
  User as UserIcon,
} from "lucide-react";

import { signUpWithEmail } from "@/features/auth/model/auth-service";
import { useAuthStore } from "@/features/auth/model/auth-store";

import { AuthDivider } from "./auth-divider";
import { FormField } from "./form-field";
import { GoogleAuthButton } from "./google-auth-button";

export function RegisterForm() {
  // Локальний стан форми
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  // Глобальний стан авторизації
  const user = useAuthStore((state) => state.user);
  const isInitialized = useAuthStore(
    (state) => state.isInitialized
  );

  const router = useRouter();

  // Перенаправлення авторизованого користувача
  useEffect(() => {
    if (isInitialized && user) {
      router.replace("/dashboard");
    }
  }, [isInitialized, user, router]);

  // Обробка реєстрації
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setMessage("");

    // Перевірка імені
    if (!name.trim()) {
      setMessage("Введіть ваше ім'я.");
      return;
    }

    // Перевірка довжини пароля
    if (password.length < 8) {
      setMessage("Пароль має містити щонайменше 8 символів.");
      return;
    }

    // Перевірка паролів
    if (password !== confirmPassword) {
      setMessage("Паролі не збігаються.");
      return;
    }

    setBusy(true);

    try {
      const error = await signUpWithEmail(
        name.trim(),
        email.trim(),
        password
      );

      if (error) {
        setMessage(error);
        return;
      }

      setMessage(
        "Реєстрація успішна! Перевірте електронну пошту та підтвердьте свій акаунт."
      );

      // Очищаємо паролі
      setPassword("");
      setConfirmPassword("");

    } catch (error) {
      console.error("Registration error:", error);

      setMessage(
        "Не вдалося зареєструватися. Спробуйте ще раз."
      );
    } finally {
      setBusy(false);
    }
  };

  // Перевіряємо початкову сесію
  if (!isInitialized || user) {
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
          label="Ваше ім’я"
          value={name}
          onChange={setName}
          placeholder="Наприклад, Олена"
          icon={UserIcon}
          autoComplete="name"
        />

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
          placeholder="Мінімум 8 символів"
          icon={Lock}
          autoComplete="new-password"
        />

        <FormField
          label="Підтвердіть пароль"
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          placeholder="Повторіть пароль"
          icon={Lock}
          autoComplete="new-password"
        />

        <button
          type="submit"
          disabled={busy}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:opacity-60"
        >
          {busy ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <>
              Створити акаунт
              <ArrowRight size={18} />
            </>
          )}
        </button>

      </form>

      {message && (
        <p
          role="status"
          aria-live="polite"
          className="mt-4 rounded-lg bg-blue-50 p-3 text-sm text-blue-700"
        >
          {message}
        </p>
      )}

      <p className="mt-6 text-center text-sm text-slate-500">
        Вже маєте акаунт?{" "}
        <Link
          href="/login"
          className="font-semibold text-blue-600"
        >
          Увійти
        </Link>
      </p>
    </>
  );
}
