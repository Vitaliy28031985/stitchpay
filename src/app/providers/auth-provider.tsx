
"use client";

import { useEffect } from "react";

import { supabase } from "@/shared/api/supabase/client";
import { useAuthStore } from "@/features/auth/model/auth-store";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const setAuthState = useAuthStore(
    (state) => state.setAuthState
  );

  useEffect(() => {
    if (!supabase) {
      setAuthState(null);
      return;
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setAuthState(session?.user ?? null);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [setAuthState]);

  return <>{children}</>;
}
