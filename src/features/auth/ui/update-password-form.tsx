'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { Lock } from 'lucide-react';
import { updatePassword } from '@/features/auth/model/auth-service';
import { FormField } from './form-field';

export function UpdatePasswordForm() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password.length < 8 || password !== confirmPassword) {
      setMessage('Перевірте пароль: щонайменше 8 символів, значення мають збігатися.');
      return;
    }
    setBusy(true);
    const error = await updatePassword(password);
    setBusy(false);
    setMessage(error ?? 'Пароль успішно змінено. Тепер можна увійти.');
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <FormField label="Новий пароль" type="password" value={password} onChange={setPassword} placeholder="Мінімум 8 символів" icon={Lock} autoComplete="new-password" />
      <FormField label="Підтвердіть пароль" type="password" value={confirmPassword} onChange={setConfirmPassword} placeholder="Повторіть пароль" icon={Lock} autoComplete="new-password" />
      <button disabled={busy} className="h-12 w-full rounded-xl bg-blue-600 font-semibold text-white disabled:opacity-60">{busy ? 'Зберігаємо…' : 'Зберегти пароль'}</button>
      {message && <p role="status" className="rounded-lg bg-blue-50 p-3 text-sm text-blue-700">{message}</p>}
      <p className="text-center text-sm"><Link href="/login" className="font-semibold text-blue-600">До входу</Link></p>
    </form>
  );
}
