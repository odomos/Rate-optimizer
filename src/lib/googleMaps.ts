/**
 * Google Maps integration for distance & duration.
 * Requires NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in .env.local
 */

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export interface RouteInfo {
  distanceText: string;
  distanceMeters: number;
  durationText: string;
  durationSeconds: number;
}

export async function getRouteInfo(
  origin: string,
  destination: string
): Promise<RouteInfo | null> {
  if (!GOOGLE_MAPS_API_KEY) {
    console.warn("Google Maps API key not set");
    return null;
  }

  try {
    const url = new URL("https://maps.googleapis.com/maps/api/distancematrix/json");
    url.searchParams.set("origins", origin);
    url.searchParams.set("destinations", destination);
    url.searchParams.set("key", GOOGLE_MAPS_API_KEY);

    const res = await fetch(url.toString());
    const data = await res.json();

    if (data.status !== "OK" || !data.rows?.[0]?.elements?.[0]) {
      return null;
    }

    const el = data.rows[0].elements[0];
    if (el.status !== "OK") {
      return null;
    }

    return {
      distanceText: el.distance?.text ?? "—",
      distanceMeters: el.distance?.value ?? 0,
      durationText: el.duration?.text ?? "—",
      durationSeconds: el.duration?.value ?? 0,
    };
  } catch (err) {
    console.error("Google Maps error:", err);
    return null;
  }
}
