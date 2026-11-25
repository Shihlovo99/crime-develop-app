import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Provider } from '@/data/mock';

interface Props {
  provider: Provider;
  userLat?: number;
  userLng?: number;
  /** Live provider position (from streaming updates). Falls back to provider.lat/lng. */
  providerLat?: number;
  providerLng?: number;
}

const LiveTrackingMap = ({
  provider,
  userLat = 37.7849,
  userLng = -122.4094,
  providerLat,
  providerLng,
}: Props) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const providerMarkerRef = useRef<L.Marker | null>(null);
  const routeLineRef = useRef<L.Polyline | null>(null);

  const liveLat = providerLat ?? provider.lat;
  const liveLng = providerLng ?? provider.lng;

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [userLat, userLng],
      zoom: 14,
      zoomControl: false,
      attributionControl: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
    }).addTo(map);

    const userIcon = L.divIcon({
      html: `<div style="width:18px;height:18px;border-radius:50%;background:hsl(211,90%,42%);border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);"></div>
             <div style="position:absolute;inset:-8px;border-radius:50%;background:hsl(211,90%,42%,0.2);animation:ping 1.5s cubic-bezier(0,0,0.2,1) infinite;"></div>`,
      className: '',
      iconSize: [18, 18],
      iconAnchor: [9, 9],
    });
    L.marker([userLat, userLng], { icon: userIcon }).addTo(map);

    const providerIcon = L.divIcon({
      html: `<div style="position:relative;">
        <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,hsl(211,90%,42%),hsl(211,80%,55%));display:flex;align-items:center;justify-content:center;color:white;font-size:12px;font-weight:700;border:3px solid white;box-shadow:0 4px 14px rgba(0,0,0,0.3);transition:transform 0.4s ease;">${provider.avatar}</div>
      </div>`,
      className: '',
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });
    const marker = L.marker([liveLat, liveLng], { icon: providerIcon }).addTo(map);
    providerMarkerRef.current = marker;

    const line = L.polyline(
      [[liveLat, liveLng], [userLat, userLng]],
      { color: 'hsl(211,90%,42%)', weight: 3, dashArray: '8,8', opacity: 0.7 }
    ).addTo(map);
    routeLineRef.current = line;

    map.fitBounds([[liveLat, liveLng], [userLat, userLng]], { padding: [50, 50] });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
      providerMarkerRef.current = null;
      routeLineRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // React to streamed location updates
  useEffect(() => {
    if (!providerMarkerRef.current || !routeLineRef.current) return;
    providerMarkerRef.current.setLatLng([liveLat, liveLng]);
    routeLineRef.current.setLatLngs([[liveLat, liveLng], [userLat, userLng]]);
  }, [liveLat, liveLng, userLat, userLng]);

  return <div ref={mapRef} className="w-full h-full min-h-[260px] rounded-2xl overflow-hidden z-0" />;
};

export default LiveTrackingMap;
