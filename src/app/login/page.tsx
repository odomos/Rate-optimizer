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
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-center text-2xl font-bold text-gray-900">Sign in</h1>
        <p className="mb-6 text-center text-sm text-gray-500">
          Use your Google account to continue
        </p>
        <button
          type="button"
          onClick={handleSignIn}
          className="w-full rounded-lg bg-gray-900 px-4 py-3 font-medium text-white transition hover:bg-gray-800"
        >
          Sign in with Google
        </button>
      </div>
    </main>
  );
}
