import { Job } from '@/data/mock';
import { motion } from 'framer-motion';
import { MapPin, Phone, MessageCircle, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import LiveTrackingMap from './LiveTrackingMap';
import { subscribeToProviderLocation, LocationUpdate } from '@/lib/providerLocationStream';

const STATUS_CONFIG = {
  searching: { label: 'Finding a Pro...', step: 0, color: 'bg-warning' },
  heading: { label: 'Heading to you', step: 1, color: 'bg-primary' },
  arrived: { label: 'Pro has arrived', step: 2, color: 'bg-primary' },
  'in-progress': { label: 'Job in Progress', step: 3, color: 'bg-accent' },
  completed: { label: 'Completed', step: 4, color: 'bg-success' },
};

const STEPS = ['Matched', 'En Route', 'Arrived', 'Working', 'Done'];

interface Props {
  job: Job;
}

const ActiveJobCard = ({ job }: Props) => {
  const config = STATUS_CONFIG[job.status];
  const initialEta = parseInt(job.provider.eta) || 12;
  const initialDist = parseFloat(job.provider.distance) || 1.3;

  // Destination = customer's location (mocked here; would come from job.address geocode)
  const destination = { lat: 37.7849, lng: -122.4094 };

  const [location, setLocation] = useState<LocationUpdate | null>(null);

  // Subscribe to the mock streaming feed of provider GPS updates
  useEffect(() => {
    if (job.status !== 'heading' && job.status !== 'arrived') return;

    const unsubscribe = subscribeToProviderLocation(
      {
        jobId: job.id,
        providerId: job.provider.id,
        start: { lat: job.provider.lat, lng: job.provider.lng },
        destination,
        initialEtaMin: initialEta,
        initialDistanceKm: initialDist,
        intervalMs: 1500,
      },
      (update) => setLocation(update),
    );

    return unsubscribe;
  }, [job.id, job.provider.id, job.provider.lat, job.provider.lng, job.status, initialEta, initialDist]);

  const showLive = job.status === 'heading' || job.status === 'arrived';
  const etaMin = location?.etaMin ?? initialEta;
  const distanceKm = location?.distanceKm ?? initialDist;
  const speedKph = location?.speedKph;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 bg-card rounded-2xl shadow-elevated"
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="text-xs font-medium text-muted-foreground">ACTIVE JOB</span>
          <h3 className="font-bold text-foreground">{job.service}</h3>
        </div>
        <span className={cn("px-3 py-1 rounded-full text-xs font-semibold text-primary-foreground", config.color)}>
          {config.label}
        </span>
      </div>

      {/* Progress stepper */}
      <div className="flex items-center gap-1 mb-4">
        {STEPS.map((step, i) => (
          <div key={step} className="flex-1 flex flex-col items-center gap-1">
            <div className={cn(
              "w-full h-1.5 rounded-full transition-colors duration-500",
              i <= config.step ? "bg-primary" : "bg-muted"
            )} />
            <span className={cn(
              "text-[9px] font-medium",
              i <= config.step ? "text-primary" : "text-muted-foreground"
            )}>{step}</span>
          </div>
        ))}
      </div>

      {/* Live tracking map */}
      {showLive && (
        <div className="mb-3 relative">
          <div className="h-64">
            <LiveTrackingMap
              provider={job.provider}
              userLat={destination.lat}
              userLng={destination.lng}
              providerLat={location?.lat}
              providerLng={location?.lng}
            />
          </div>
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 bg-card/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-elevated z-[400]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
                <Navigation size={14} className="text-primary-foreground" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground leading-none">Arriving in</p>
                <p className="text-sm font-bold text-foreground">
                  {etaMin} min{speedKph ? <span className="ml-1 text-[10px] font-medium text-muted-foreground">· {Math.round(speedKph)} km/h</span> : null}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-muted-foreground leading-none">Distance</p>
              <p className="text-sm font-bold text-foreground">{distanceKm} km</p>
            </div>
          </div>
        </div>
      )}

      {/* Provider info */}
      <div className="flex items-center gap-3 p-3 bg-secondary rounded-xl">
        <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-xs">
          {job.provider.avatar}
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm text-foreground">{job.provider.name}</p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <MapPin size={10} /> {job.address}
          </p>
        </div>
        <div className="flex gap-2">
          <Button size="icon" variant="outline" className="h-9 w-9 rounded-full">
            <Phone size={16} />
          </Button>
          <Button size="icon" variant="outline" className="h-9 w-9 rounded-full">
            <MessageCircle size={16} />
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
        <span className="text-xs text-muted-foreground">Estimated cost</span>
        <span className="font-bold text-foreground">R{job.estimatedCost}</span>
      </div>
    </motion.div>
  );
};

export default ActiveJobCard;
