'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { exchangeAuthCode } from '@/features/auth/model/auth-service';
import { supabase } from '@/shared/api/supabase/client';

function CallbackContent() {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    const finishAuth = async () => {
      const code = params.get('code');
      if (!supabase) {
        if (active) setError('Не налаштовано Supabase.');
        return;
      }
      if (code) {
        const exchangeError = await exchangeAuthCode(code);
        if (exchangeError) {
          if (active) setError(exchangeError);
          return;
        }
      } else {
        await supabase.auth.getSession();
      }
      if (!active) return;
      router.replace(params.get('type') === 'recovery' ? '/update-password' : '/dashboard');
    };
    void finishAuth();
    return () => { active = false; };
  }, [params, router]);

  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 p-6">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-xl">
        {error ? (
          <>
            <h1 className="font-bold text-slate-900">Не вдалося завершити вхід</h1>
            <p role="alert" className="mt-2 text-sm text-rose-600">{error}</p>
            <Link href="/login" className="mt-5 inline-block font-semibold text-blue-600">Повернутися до входу</Link>
          </>
        ) : (
          <>
            <Loader2 className="mx-auto animate-spin text-blue-600" size={30} />
            <p className="mt-4 font-semibold text-slate-800">Завершуємо авторизацію…</p>
          </>
        )}
      </div>
    </main>
  );
}

export function AuthCallbackScreen() {
  return <Suspense fallback={<main className="grid min-h-screen place-items-center bg-slate-50">
    <Loader2 className="animate-spin text-blue-600" size={30} />
  </main>}>
    <CallbackContent />
  </Suspense>;
}
