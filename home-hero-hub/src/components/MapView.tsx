import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Provider, MOCK_PROVIDERS } from '@/data/mock';

interface Props {
  providers?: Provider[];
  onSelectProvider?: (provider: Provider) => void;
}

const MapView = ({ providers = MOCK_PROVIDERS, onSelectProvider }: Props) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [37.7849, -122.4094],
      zoom: 14,
      zoomControl: false,
      attributionControl: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
    }).addTo(map);

    // User location marker
    const userIcon = L.divIcon({
      html: `<div style="width:18px;height:18px;border-radius:50%;background:hsl(211,90%,42%);border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);"></div>
             <div style="position:absolute;inset:-8px;border-radius:50%;background:hsl(211,90%,42%,0.2);animation:ping 1.5s cubic-bezier(0,0,0.2,1) infinite;"></div>`,
      className: '',
      iconSize: [18, 18],
      iconAnchor: [9, 9],
    });
    L.marker([37.7849, -122.4094], { icon: userIcon }).addTo(map);

    // Provider markers
    providers.filter(p => p.available).forEach(provider => {
      const providerIcon = L.divIcon({
        html: `<div style="position:relative;cursor:pointer;">
          <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,hsl(211,90%,42%),hsl(211,80%,55%));display:flex;align-items:center;justify-content:center;color:white;font-size:11px;font-weight:700;border:2px solid white;box-shadow:0 4px 12px rgba(0,0,0,0.25);">${provider.avatar}</div>
          <div style="position:absolute;bottom:-4px;left:50%;transform:translateX(-50%) rotate(45deg);width:8px;height:8px;background:hsl(211,90%,42%);"></div>
        </div>`,
        className: '',
        iconSize: [36, 44],
        iconAnchor: [18, 44],
      });

      const marker = L.marker([provider.lat, provider.lng], { icon: providerIcon }).addTo(map);
      marker.bindPopup(
        `<div style="font-family:'Plus Jakarta Sans',sans-serif;padding:4px;">
          <strong>${provider.name}</strong><br/>
          <span style="font-size:12px;color:#666;">${provider.specialty} • ⭐ ${provider.rating}</span><br/>
           <span style="font-size:12px;color:#666;">ETA: ${provider.eta} • R${provider.rate}/hr</span>
        </div>`,
        { closeButton: false, className: 'custom-popup' }
      );
      marker.on('click', () => onSelectProvider?.(provider));
    });

    // Zoom control bottom-right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [providers, onSelectProvider]);

  return <div ref={mapRef} className="w-full h-full min-h-[300px] rounded-2xl overflow-hidden z-0" />;
};

export default MapView;
