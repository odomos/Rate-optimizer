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
  const [results, setResults] = useState<FareResult[]>(FAKE_RESULTS);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<string | null>("Rapido");

  const bestDeal = results.length > 0
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
      const json = await res.json();
      if (res.ok && json.results?.length) {
        setResults(json.results);
        const cheapest = json.results.reduce((min: FareResult, r: FareResult) =>
          r.price < min.price ? r : min
        );
        setSelectedProvider(cheapest.provider);
      }
    } catch {
      setResults(FAKE_RESULTS);
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
