
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Loader2 } from "lucide-react";

import { signOut } from "@/features/auth/model/auth-service";

export function SignOutButton() {
  const router = useRouter();

  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  const handleSignOut = async () => {
    if (busy) return;

    setBusy(true);
    setMessage("");

    try {
      const error = await signOut();

      if (error) {
        setMessage(error);
        return;
      }

      // AuthProvider автоматично оновить Zustand
      router.replace("/login");
      router.refresh();

    } catch (error) {
      console.error("Logout error:", error);
      setMessage("Не вдалося вийти з акаунта.");

    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={handleSignOut}
        disabled={busy}
        className="flex items-center gap-2 text-xs text-blue-200 transition hover:text-white disabled:opacity-60"
      >
        {busy ? (
          <Loader2 size={15} className="animate-spin" />
        ) : (
          <LogOut size={15} />
        )}

        {busy ? "Вихід…" : "Вийти"}
      </button>

      {message && (
        <p
          role="alert"
          className="mt-2 text-xs text-red-300"
        >
          {message}
        </p>
      )}
    </div>
  );
}

