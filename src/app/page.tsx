"use client";

import { useState } from "react";
import LocationForm from "@/components/LocationForm";
import ResultCard from "@/components/ResultCard";
import BestDealCard from "@/components/BestDealCard";
import type { FareResult, LocationInput } from "@/types";

const FAKE_RESULTS: FareResult[] = [
  { provider: "Uber", price: 245, duration: "~15 min", distance: "8.2 km", icon: "uber.png" },
  { provider: "Ola", price: 231, duration: "~14 min", distance: "8.2 km", icon: "ola.png" },
  { provider: "Rapido", price: 198, duration: "~12 min", distance: "8.2 km", icon: "rapido.png" },
];

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

    // read raw response first (important)
    const text = await res.text();

    let json: any = {};
    try {
      json = text ? JSON.parse(text) : {};
    } catch {
      json = { raw: text };
    }

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
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Hero */}
        <section className="mb-12 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            Find the Cheapest Ride Instantly!
          </h1>
          <p className="mb-8 text-gray-600">
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
            <p className="mt-6 text-center text-gray-500">
              Enter pickup and drop locations, then click <b>Compare Prices</b>.
            </p>
          )}
        </section>

        {/* Footer CTA */}
        <footer className="rounded-xl border border-gray-200 bg-white py-8 text-center shadow-sm">
          <p className="text-xl font-bold text-gray-900">Save More on Every Ride</p>
          <p className="mt-1 text-gray-500">Compare and Choose the Best Option!</p>
        </footer>
      </div>
    </main>
  );
}
