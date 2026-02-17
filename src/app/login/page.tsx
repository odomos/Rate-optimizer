"use client";

import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  async function handleSignIn() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-slate-950 px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(16,185,129,0.12),transparent)]" aria-hidden />
      <div className="relative z-10 w-full max-w-sm rounded-2xl border border-slate-700/50 bg-slate-800/80 p-8 shadow-2xl backdrop-blur-sm">
        <h1 className="mb-2 text-center text-2xl font-bold text-slate-100">Sign in</h1>
        <p className="mb-6 text-center text-sm text-slate-400">
          Use your Google account to continue
        </p>
        <button
          type="button"
          onClick={handleSignIn}
          className="w-full rounded-xl bg-emerald-500 py-3 font-semibold text-slate-900 shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-400 hover:shadow-emerald-500/30"
        >
          Sign in with Google
        </button>
      </div>
    </main>
  );
}
