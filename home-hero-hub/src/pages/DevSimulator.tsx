import { useEffect, useMemo, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ArrowLeft, Activity, Zap, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MOCK_PROVIDERS } from '@/data/mock';
import { subscribeToProviderLocation, LocationUpdate } from '@/lib/providerLocationStream';
import { Button } from '@/components/ui/button';

const DEST = { lat: 37.7849, lng: -122.4094 };

interface SimJob {
  id: string;
  providerId: string;
  avatar: string;
  startLat: number;
  startLng: number;
}

const buildJobs = (n: number): SimJob[] =>
  Array.from({ length: n }, (_, i) => {
    const base = MOCK_PROVIDERS[i % MOCK_PROVIDERS.length];
    const ring = Math.floor(i / MOCK_PROVIDERS.length);
    const jitter = 0.004 * (ring + 1);
    return {
      id: `sim-${i}`,
      providerId: base.id,
      avatar: base.avatar,
      startLat: base.lat + (Math.random() - 0.5) * jitter,
      startLng: base.lng + (Math.random() - 0.5) * jitter,
    };
  });

const DevSimulator = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(5);
  const [running, setRunning] = useState(true);
  const jobs = useMemo(() => buildJobs(count), [count]);

  // Perf metrics
  const [updates, setUpdates] = useState(0);
  const [fps, setFps] = useState(0);
  const updatesRef = useRef(0);
  const lastTickRef = useRef(performance.now());
  const lastUpdatesRef = useRef(0);

  // Map
  const mapDivRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());

  // Init map once
  useEffect(() => {
    if (!mapDivRef.current || mapRef.current) return;
    const map = L.map(mapDivRef.current, {
      center: [DEST.lat, DEST.lng],
      zoom: 13,
      zoomControl: false,
      attributionControl: false,
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    L.circleMarker([DEST.lat, DEST.lng], {
      radius: 8,
      color: 'hsl(211,90%,42%)',
      fillColor: 'hsl(211,90%,42%)',
      fillOpacity: 1,
      weight: 3,
    }).addTo(map);
    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Manage markers + subscriptions when jobs change
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !running) return;

    // Clear existing
    markersRef.current.forEach((m) => m.remove());
    markersRef.current.clear();

    const unsubs: Array<() => void> = [];

    jobs.forEach((job) => {
      const icon = L.divIcon({
        html: `<div style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,hsl(211,90%,42%),hsl(211,80%,55%));display:flex;align-items:center;justify-content:center;color:white;font-size:10px;font-weight:700;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);">${job.avatar}</div>`,
        className: '',
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });
      const marker = L.marker([job.startLat, job.startLng], { icon }).addTo(map);
      markersRef.current.set(job.id, marker);

      const unsub = subscribeToProviderLocation(
        {
          jobId: job.id,
          providerId: job.providerId,
          start: { lat: job.startLat, lng: job.startLng },
          destination: DEST,
          initialEtaMin: 10 + Math.floor(Math.random() * 10),
          initialDistanceKm: 1 + Math.random() * 3,
          intervalMs: 1000,
        },
        (u: LocationUpdate) => {
          const mk = markersRef.current.get(job.id);
          if (mk) mk.setLatLng([u.lat, u.lng]);
          updatesRef.current += 1;
        },
      );
      unsubs.push(unsub);
    });

    return () => {
      unsubs.forEach((u) => u());
    };
  }, [jobs, running]);

  // FPS / updates-per-second counter
  useEffect(() => {
    let raf = 0;
    const loop = () => {
      const now = performance.now();
      const dt = now - lastTickRef.current;
      if (dt >= 1000) {
        const ups = updatesRef.current - lastUpdatesRef.current;
        const fpsNow = Math.round((ups * 1000) / dt);
        setFps(fpsNow);
        setUpdates(updatesRef.current);
        lastUpdatesRef.current = updatesRef.current;
        lastTickRef.current = now;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-30 bg-background border-b border-border px-5 pt-12 pb-4">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"
          >
            <ArrowLeft size={20} className="text-foreground" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-foreground">Live Jobs Simulator</h1>
            <p className="text-xs text-muted-foreground">Dev tool · stress test map & streams</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="p-2 rounded-xl bg-secondary">
            <p className="text-[10px] text-muted-foreground">Jobs</p>
            <p className="text-lg font-bold text-foreground">{count}</p>
          </div>
          <div className="p-2 rounded-xl bg-secondary">
            <p className="text-[10px] text-muted-foreground flex items-center gap-1">
              <Activity size={10} /> Updates/s
            </p>
            <p className="text-lg font-bold text-foreground">{fps}</p>
          </div>
          <div className="p-2 rounded-xl bg-secondary">
            <p className="text-[10px] text-muted-foreground flex items-center gap-1">
              <Zap size={10} /> Total
            </p>
            <p className="text-lg font-bold text-foreground">{updates}</p>
          </div>
        </div>
      </div>

      <div className="px-5 py-4 space-y-4">
        <div className="flex items-center gap-3">
          <Button
            size="icon"
            variant="outline"
            onClick={() => setCount((c) => Math.max(1, c - 1))}
          >
            <Minus size={16} />
          </Button>
          <input
            type="range"
            min={1}
            max={30}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="flex-1 accent-primary"
          />
          <Button
            size="icon"
            variant="outline"
            onClick={() => setCount((c) => Math.min(30, c + 1))}
          >
            <Plus size={16} />
          </Button>
        </div>

        <div className="flex gap-2">
          {[1, 5, 10, 20, 30].map((n) => (
            <button
              key={n}
              onClick={() => setCount(n)}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-colors ${
                count === n
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-secondary text-secondary-foreground border-border'
              }`}
            >
              {n}
            </button>
          ))}
        </div>

        <Button
          variant={running ? 'outline' : 'default'}
          className="w-full"
          onClick={() => setRunning((r) => !r)}
        >
          {running ? 'Pause streams' : 'Resume streams'}
        </Button>

        <div
          ref={mapDivRef}
          className="w-full h-[420px] rounded-2xl overflow-hidden z-0 border border-border"
        />

        <p className="text-xs text-muted-foreground text-center">
          Each marker is driven by an independent <code>subscribeToProviderLocation</code> stream
          emitting every 1s. Watch Updates/s scale linearly with job count.
        </p>
      </div>
    </div>
  );
};

export default DevSimulator;
