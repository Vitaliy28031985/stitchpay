'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { requestPasswordReset } from '@/features/auth/model/auth-service';
import { FormField } from './form-field';

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    const error = await requestPasswordReset(email);
    setBusy(false);
    setMessage(error ?? 'Якщо акаунт існує, на пошту надіслано інструкцію.');
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <p className="mb-5 text-sm leading-6 text-slate-500">Вкажіть адресу електронної пошти, яку використовували під час реєстрації. Ми надішлемо посилання для відновлення доступу.</p>
      <FormField label="Електронна пошта" type="email" value={email} onChange={setEmail} placeholder="name@example.com" icon={Mail} autoComplete="email" />
      <button disabled={busy} className="h-12 w-full rounded-xl bg-blue-600 font-semibold text-white hover:bg-blue-700 disabled:opacity-60">{busy ? 'Надсилаємо…' : 'Надіслати посилання'}</button>
      {message && <p role="status" className="rounded-lg bg-blue-50 p-3 text-sm text-blue-700">{message}</p>}
      <p className="text-center text-sm"><Link href="/login" className="font-semibold text-blue-600">Повернутися до входу</Link></p>
    </form>
  );
}
