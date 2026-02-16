"use client";

import { useState, type FormEvent } from "react";
import type { LocationInput } from "@/types";

interface LocationFormProps {
  onSubmit?: (data: LocationInput) => void | Promise<void>;
  isLoading?: boolean;
}

function MapPinIcon() {
  return (
    <svg
      className="h-5 w-5 shrink-0 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function FlagIcon() {
  return (
    <svg
      className="h-5 w-5 shrink-0 text-red-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      className="h-5 w-5 shrink-0 text-red-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  );
}

export default function LocationForm({ onSubmit, isLoading = false }: LocationFormProps) {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {

    e.preventDefault();

    const o = origin.trim();
    const d = destination.trim();

    if (!o || !d) {
      setError("Please enter both pickup and drop locations.");
      return;
    }

    setError(null);
    await onSubmit?.({ origin: o, destination: d });
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-3">
        <div className="flex w-full flex-1 items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-emerald-500/30">
          <MapPinIcon />
          <input
            id="origin"
            name="origin"
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            placeholder="Enter Pickup Location"
            className="min-w-0 flex-1 bg-transparent text-gray-900 placeholder-gray-400 outline-none"
            disabled={isLoading}
            autoComplete="off"
          />
        </div>

        <div className="hidden shrink-0 sm:block" aria-hidden>
          <ArrowRightIcon />
        </div>

        <div className="flex w-full flex-1 items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-emerald-500/30">
          <FlagIcon />
          <input
            id="destination"
            name="destination"
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Enter Drop Location"
            className="min-w-0 flex-1 bg-transparent text-gray-900 placeholder-gray-400 outline-none"
            disabled={isLoading}
            autoComplete="off"
          />
        </div>
      </div>

      {error && <p className="mt-3 text-center text-sm text-red-600">{error}</p>}

      <div className="mt-5 flex justify-center">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-xl bg-emerald-600 px-8 py-3 font-semibold text-white shadow-md transition hover:bg-emerald-700 disabled:opacity-50 sm:w-auto"
        >
          {isLoading ? "Comparing..." : "Compare Prices"}
        </button>
      </div>
    </form>
  );
}
