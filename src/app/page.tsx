"use client";

import { useState } from "react";
import LocationForm from "@/components/LocationForm";
import ResultCard from "@/components/ResultCard";
import BestDealCard from "@/components/BestDealCard";
import type { FareResult, LocationInput } from "@/types";

type CompareApiResponse = {
  results: FareResult[];
};

export default function Home() {
  // ✅ start empty so UI ONLY updates from API
  const [results, setResults] = useState<FareResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  const bestDeal =
    results.length > 0
      ? results.reduce((min, r) => (r.price < min.price ? r : min))
      : null;

  async function handleCompare(data: LocationInput) {
  setIsLoading(true);

  try {
    const res = await fetch("/api/compare", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json: CompareApiResponse = await res.json();

    if (!res.ok) {
      console.error("Compare API failed:", res.status, json);
      return;
    }

    if (json.results?.length) {
      setResults(json.results);

      const cheapest = json.results.reduce((min: FareResult, r: FareResult) =>
        r.price < min.price ? r : min
      );
      setSelectedProvider(cheapest.provider);
    } else {
      console.error("Compare API returned no results:", json);
    }

  } catch (err) {
    console.error("Compare failed:", err);
  } finally {
    setIsLoading(false);
  }
}


  return (
    <main className="relative z-0 min-h-screen bg-slate-950">
      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Hero */}
        <section className="mb-12 text-center">
          <h1 className="mb-2 text-3xl font-bold text-slate-100 sm:text-4xl">
            Find the Cheapest Ride Instantly!
          </h1>
          <p className="mb-8 text-slate-400">
            Compare fares from Uber, Ola, and Rapido in one click.
          </p>
          <div className="flex justify-center">
            <LocationForm onSubmit={handleCompare} isLoading={isLoading} />
          </div>
        </section>

        {/* Best Deal */}
        {bestDeal && (
          <section className="mb-8">
            <BestDealCard result={bestDeal} />
          </section>
        )}

        {/* Comparison cards */}
        <section className="mb-16">
          <div className="grid gap-4 sm:grid-cols-3">
            {results.map((r) => (
              <ResultCard
                key={r.provider}
                result={r}
                isBestDeal={bestDeal?.provider === r.provider}
                isSelected={selectedProvider === r.provider}
                onSelect={() => setSelectedProvider(r.provider)}
              />
            ))}
          </div>

          {/* ✅ helpful message when nothing yet */}
          {results.length === 0 && (
            <p className="mt-6 text-center text-slate-500">
              Enter pickup and drop locations, then click <b className="text-slate-400">Compare Prices</b>.
            </p>
          )}
        </section>

        {/* Footer CTA */}
        <footer className="rounded-xl border border-slate-700/50 bg-slate-800/50 py-8 text-center shadow-xl backdrop-blur-sm">
          <p className="text-xl font-bold text-slate-100">Save More on Every Ride</p>
          <p className="mt-1 text-slate-400">Compare and Choose the Best Option!</p>
        </footer>
      </div>
    </main>
  );
}
