import { NextRequest, NextResponse } from "next/server";
import { getRouteInfo } from "@/lib/googleMaps";
import { calculateFares } from "@/lib/pricing";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { origin, destination } = body as { origin?: string; destination?: string };

    if (!origin || !destination) {
      return NextResponse.json(
        { error: "origin and destination are required" },
        { status: 400 }
      );
    }

    const route = await getRouteInfo(origin, destination);
    const distanceMeters = route?.distanceMeters ?? 8200;
    const durationMinutes = route ? route.durationSeconds / 60 : 25;

    const results = calculateFares(distanceMeters, durationMinutes);
    if (route) {
      results.forEach((r) => {
        r.duration = route.durationText;
        r.distance = route.distanceText;
      });
    }

    return NextResponse.json({ results });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
