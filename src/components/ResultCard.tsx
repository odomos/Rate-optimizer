"use client";

import Image from "next/image";
import type { FareResult } from "@/types";

interface ResultCardProps {
  result: FareResult;
  isBestDeal?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
}

function CrownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" width={18} height={18}>
      <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" />
    </svg>
  );
}

export default function ResultCard({ result, isBestDeal, isSelected, onSelect }: ResultCardProps) {
  const iconPath = result.icon ? `/icons/${result.icon}` : null;
  const cardBg = isBestDeal || isSelected ? "bg-amber-50 border-amber-200" : "bg-white border-gray-200";

  return (
    <div
      className={`flex flex-col rounded-xl border-2 p-5 shadow-sm transition ${cardBg}`}
    >
      <div className="mb-3 flex items-center gap-2">
        {iconPath ? (
          <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gray-100">
            <Image
              src={iconPath}
              alt={result.provider}
              width={48}
              height={48}
              className="object-contain p-1"
              unoptimized
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = "flex";
              }}
            />
            <span
              className="absolute inset-0 hidden items-center justify-center text-lg font-bold text-gray-600"
              style={{ display: "none" }}
            >
              {result.provider[0]}
            </span>
          </div>
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-lg font-bold text-gray-600">
            {result.provider[0]}
          </div>
        )}
        <div>
          <p className="flex items-center gap-1.5 font-bold text-gray-900">
            {result.provider}
            {isBestDeal && (
              <span className="text-amber-500">
                <CrownIcon />
              </span>
            )}
          </p>
          {result.duration && (
            <p className="text-sm text-gray-500">Est. Time: {result.duration.replace("~", "")}</p>
          )}
        </div>
      </div>
      <p className="mb-4 text-2xl font-bold text-gray-900">₹{result.price}</p>
      <button
        type="button"
        onClick={onSelect}
        className={`mt-auto rounded-lg px-4 py-2 text-sm font-semibold transition ${
          isSelected
            ? "bg-amber-400 text-gray-900"
            : isBestDeal
              ? "bg-amber-400 text-gray-900 hover:bg-amber-500"
              : "bg-gray-800 text-white hover:bg-gray-700"
        }`}
      >
        {isSelected ? "Selected ✓" : "Select"}
      </button>
    </div>
  );
}
