import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Provider } from '@/data/mock';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Star, Shield, Clock, MapPin, Zap, CalendarDays } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface Props {
  provider: Provider | null;
  open: boolean;
  onClose: () => void;
}

const BookingSheet = ({ provider, open, onClose }: Props) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'instant' | 'scheduled'>('instant');
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];

  if (!provider) return null;

  const handleBook = () => {
    toast.success(
      mode === 'instant'
        ? `${provider.name} is on the way! ETA: ${provider.eta}`
        : `Booked ${provider.name} for ${selectedSlot}`,
      { duration: 4000 }
    );
    onClose();
    navigate('/checkout', { state: { provider, scheduledTime: mode === 'scheduled' ? selectedSlot : null } });
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="bottom" className="rounded-t-3xl h-[85vh] p-0">
        <div className="p-6 overflow-y-auto h-full">
          <SheetHeader className="text-left mb-4">
            <SheetTitle className="text-xl text-foreground">Book Service</SheetTitle>
          </SheetHeader>

          {/* Provider info */}
          <div className="flex items-center gap-4 p-4 bg-secondary rounded-2xl mb-4">
            <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold">
              {provider.avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-foreground">{provider.name}</h3>
                {provider.verified && <Shield size={14} className="text-primary" />}
              </div>
              <p className="text-sm text-muted-foreground">{provider.specialty}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="flex items-center gap-0.5 text-xs font-medium text-foreground">
                  <Star size={12} className="text-warning fill-warning" /> {provider.rating}
                </span>
                <span className="text-xs text-muted-foreground">{provider.completedJobs} jobs</span>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg text-foreground">R{provider.rate}</p>
              <p className="text-xs text-muted-foreground">{provider.rateUnit === 'service' ? 'per service' : '/hour'}</p>
            </div>
          </div>

          {/* Booking mode toggle */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setMode('instant')}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all",
                mode === 'instant'
                  ? "gradient-primary text-primary-foreground shadow-elevated"
                  : "bg-secondary text-secondary-foreground"
              )}
            >
              <Zap size={16} /> Instant
            </button>
            <button
              onClick={() => setMode('scheduled')}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all",
                mode === 'scheduled'
                  ? "gradient-primary text-primary-foreground shadow-elevated"
                  : "bg-secondary text-secondary-foreground"
              )}
            >
              <CalendarDays size={16} /> Schedule
            </button>
          </div>

          {mode === 'instant' ? (
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 p-3 bg-secondary rounded-xl">
                <Clock size={18} className="text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">Estimated arrival</p>
                  <p className="text-xs text-muted-foreground">{provider.eta} from now</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-secondary rounded-xl">
                <MapPin size={18} className="text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">Your location</p>
                  <p className="text-xs text-muted-foreground">742 Evergreen Terrace</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-6">
              <p className="text-sm font-semibold text-foreground mb-3">Select a time slot</p>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map(slot => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={cn(
                      "py-2.5 rounded-xl text-sm font-medium transition-all",
                      selectedSlot === slot
                        ? "gradient-primary text-primary-foreground shadow-elevated"
                        : "bg-secondary text-secondary-foreground hover:bg-muted"
                    )}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Summary */}
          <div className="p-4 bg-secondary rounded-2xl mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Service fee</span>
              <span className="text-foreground">R{provider.rate}{provider.rateUnit === 'service' ? '' : '/hr'}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Platform fee</span>
              <span className="text-foreground">R5.00</span>
            </div>
            <div className="border-t border-border mt-2 pt-2 flex justify-between">
              <span className="font-semibold text-foreground">Estimated total</span>
              <span className="font-bold text-foreground">R{provider.rate + 5}{provider.rateUnit === 'service' ? '' : '/hr'}</span>
            </div>
          </div>

          <Button
            className="w-full h-14 rounded-2xl gradient-primary text-primary-foreground text-base font-bold shadow-elevated"
            onClick={handleBook}
            disabled={mode === 'scheduled' && !selectedSlot}
          >
            {mode === 'instant' ? `Request ${provider.name}` : 'Confirm Booking'}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BookingSheet;
