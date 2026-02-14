"use client";

import Image from "next/image";
import type { FareResult } from "@/types";

interface BestDealCardProps {
  result: FareResult;
}

function CrownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" width={20} height={20}>
      <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" />
    </svg>
  );
}

export default function BestDealCard({ result }: BestDealCardProps) {
  const iconPath = result.icon ? `/icons/${result.icon}` : null;
  const duration = result.duration?.replace("~", "") ?? "—";

  return (
    <div className="rounded-xl border-2 border-amber-200 bg-amber-50 p-6 shadow-md">
      <div className="mb-4 inline-block rounded bg-amber-200 px-3 py-1 text-sm font-semibold text-amber-900">
        Best Deal for You!
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {iconPath ? (
            <div className="relative h-14 w-14 overflow-hidden rounded-full bg-white shadow">
              <Image
                src={iconPath}
                alt={result.provider}
                width={56}
                height={56}
                className="object-contain p-1.5"
                unoptimized
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = "flex";
                }}
              />
              <span
                className="absolute inset-0 hidden items-center justify-center text-xl font-bold text-gray-600"
                style={{ display: "none" }}
              >
                {result.provider[0]}
              </span>
            </div>
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-xl font-bold text-gray-600 shadow">
              {result.provider[0]}
            </div>
          )}
          <div>
            <p className="flex items-center gap-2 text-xl font-bold text-gray-900">
              {result.provider}
              <span className="text-amber-600">
                <CrownIcon />
              </span>
            </p>
            <p className="text-3xl font-bold text-gray-900">₹{result.price}</p>
            <p className="text-sm text-gray-500">Estimated Time: {duration}</p>
          </div>
        </div>
        <a
          href="#"
          className="inline-flex items-center gap-1 rounded-lg bg-amber-400 px-5 py-2.5 font-semibold text-gray-900 transition hover:bg-amber-500"
        >
          Book Now
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
      </div>
    </div>
  );
}
