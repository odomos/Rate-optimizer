import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="relative z-10 border-b border-slate-700/50 bg-slate-900/80 px-6 py-4 shadow-lg backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
          </div>
          <span className="text-xl font-bold text-slate-100">Fare Compare</span>
        </div>
        <div className="flex gap-6 text-sm font-medium text-slate-400">
          <Link href="/login" className="transition hover:text-emerald-400">
            Sign in
          </Link>
          <Link href="#" className="transition hover:text-slate-200">
            History
          </Link>
          <Link href="/about" className="transition hover:text-slate-200">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}
