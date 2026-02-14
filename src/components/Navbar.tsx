import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </div>
          <span className="text-xl font-bold text-gray-800">Fare Compare</span>
        </div>
        <div className="flex gap-6 text-sm font-medium text-gray-600">
          <Link href="/login" className="hover:text-gray-900">
            Sign in
          </Link>
          <Link href="#" className="hover:text-gray-900">
            History
          </Link>
          <Link href="#" className="hover:text-gray-900">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}
