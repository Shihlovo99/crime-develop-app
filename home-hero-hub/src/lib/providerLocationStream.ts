// Mock streaming data source for provider live location updates.
// Simulates a real-time feed (websocket / GPS push) by emitting LocationUpdate
// events at a fixed cadence as the provider moves toward the destination.

export interface LocationUpdate {
  jobId: string;
  providerId: string;
  lat: number;
  lng: number;
  headingDeg: number;       // bearing 0-360
  speedKph: number;         // current speed
  distanceKm: number;       // remaining distance to destination
  etaMin: number;           // remaining ETA in minutes
  timestamp: number;
}

interface StreamOptions {
  jobId: string;
  providerId: string;
  start: { lat: number; lng: number };
  destination: { lat: number; lng: number };
  initialEtaMin: number;
  initialDistanceKm: number;
  intervalMs?: number;
  // total simulated trip duration in ms (defaults to initialEtaMin * 5000 for demo speed)
  durationMs?: number;
}

type Listener = (u: LocationUpdate) => void;

const haversineKm = (a: { lat: number; lng: number }, b: { lat: number; lng: number }) => {
  const R = 6371;
  const toRad = (x: number) => (x * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
};

const bearingDeg = (a: { lat: number; lng: number }, b: { lat: number; lng: number }) => {
  const toRad = (x: number) => (x * Math.PI) / 180;
  const toDeg = (x: number) => (x * 180) / Math.PI;
  const y = Math.sin(toRad(b.lng - a.lng)) * Math.cos(toRad(b.lat));
  const x =
    Math.cos(toRad(a.lat)) * Math.sin(toRad(b.lat)) -
    Math.sin(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.cos(toRad(b.lng - a.lng));
  return (toDeg(Math.atan2(y, x)) + 360) % 360;
};

/**
 * Subscribe to a mock provider location stream.
 * Returns an unsubscribe function. Emits ~every intervalMs until arrival.
 */
export const subscribeToProviderLocation = (
  opts: StreamOptions,
  listener: Listener,
): (() => void) => {
  const {
    jobId,
    providerId,
    start,
    destination,
    initialEtaMin,
    initialDistanceKm,
    intervalMs = 1500,
    durationMs = Math.max(initialEtaMin * 5000, 20000),
  } = opts;

  const startTs = Date.now();
  let cancelled = false;

  // Emit an immediate first update
  const emit = (progress: number) => {
    const lat = start.lat + (destination.lat - start.lat) * progress;
    const lng = start.lng + (destination.lng - start.lng) * progress;
    // Add a tiny jitter to feel like real GPS
    const jitter = (Math.random() - 0.5) * 0.0002;
    const point = { lat: lat + jitter, lng: lng + jitter };
    const remaining = Math.max(0, 1 - progress);
    const update: LocationUpdate = {
      jobId,
      providerId,
      lat: point.lat,
      lng: point.lng,
      headingDeg: bearingDeg(point, destination),
      speedKph: 18 + Math.random() * 12,
      distanceKm: Math.max(0.02, +(remaining * initialDistanceKm).toFixed(2)),
      etaMin: Math.max(1, Math.round(remaining * initialEtaMin)),
      timestamp: Date.now(),
    };
    listener(update);
  };

  emit(0);

  const interval = window.setInterval(() => {
    if (cancelled) return;
    const elapsed = Date.now() - startTs;
    const progress = Math.min(1, elapsed / durationMs);
    emit(progress);
    if (progress >= 1) {
      window.clearInterval(interval);
    }
  }, intervalMs);

  return () => {
    cancelled = true;
    window.clearInterval(interval);
  };
};

export { haversineKm, bearingDeg };
