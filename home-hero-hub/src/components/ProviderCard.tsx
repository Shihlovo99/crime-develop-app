import { Provider } from '@/data/mock';
import { Star, Shield, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Props {
  provider: Provider;
  onBook: (provider: Provider) => void;
}

const ProviderCard = ({ provider, onBook }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-3 p-4 bg-card rounded-2xl shadow-card"
    >
      <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">
        {provider.avatar}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <h3 className="font-semibold text-foreground truncate">{provider.name}</h3>
          {provider.verified && (
            <Shield size={14} className="text-primary shrink-0" />
          )}
        </div>
        <p className="text-xs text-muted-foreground">{provider.specialty}</p>
        <div className="flex items-center gap-3 mt-1.5">
          <span className="flex items-center gap-0.5 text-xs font-medium text-foreground">
            <Star size={12} className="text-warning fill-warning" />
            {provider.rating}
            <span className="text-muted-foreground">({provider.reviews})</span>
          </span>
          <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
            <MapPin size={12} />
            {provider.distance}
          </span>
          <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
            <Clock size={12} />
            {provider.eta}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <span className="text-sm font-bold text-foreground">R{provider.rate}{provider.rateUnit === 'service' ? '/service' : '/hr'}</span>
        <Button
          size="sm"
          onClick={() => onBook(provider)}
          className={cn(
            "h-8 text-xs px-4 rounded-full",
            provider.available
              ? "gradient-primary text-primary-foreground"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          )}
          disabled={!provider.available}
        >
          {provider.available ? 'Book' : 'Busy'}
        </Button>
      </div>
    </motion.div>
  );
};

export default ProviderCard;
