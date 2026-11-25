'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { signInWithGoogle } from '@/features/auth/model/auth-service';

interface GoogleAuthButtonProps {
  onError: (message: string) => void;
}

export function GoogleAuthButton({ onError }: GoogleAuthButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const error = await signInWithGoogle();
    if (error) {
      onError(error);
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
    >
      {loading ? <Loader2 size={18} className="animate-spin" /> : <span className="grid h-5 w-5 place-items-center rounded-full border border-slate-200 font-bold">G</span>}
      {loading ? 'Переадресація…' : 'Продовжити з Google'}
    </button>
  );
}
