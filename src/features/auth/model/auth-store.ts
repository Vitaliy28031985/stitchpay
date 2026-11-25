
import { create } from "zustand";
import type { User } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isInitialized: boolean;

  setAuthState: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  isInitialized: false,

  setAuthState: (user) =>
    set({
      user,
      isLoading: false,
      isInitialized: true,
    }),
}));
