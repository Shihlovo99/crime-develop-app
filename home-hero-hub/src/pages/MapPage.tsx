import { useState } from 'react';
import { MOCK_PROVIDERS, Provider } from '@/data/mock';
import MapView from '@/components/MapView';
import BookingSheet from '@/components/BookingSheet';
import ProviderCard from '@/components/ProviderCard';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const MapPage = () => {
  const navigate = useNavigate();
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-20 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background border-b border-border px-5 pt-12 pb-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <h1 className="text-xl font-bold text-foreground">Pros Near You</h1>
      </div>

      {/* Map */}
      <div className="flex-1 p-4">
        <div className="h-[50vh] rounded-2xl overflow-hidden">
          <MapView providers={MOCK_PROVIDERS} onSelectProvider={setSelectedProvider} />
        </div>
      </div>

      {/* Bottom list */}
      <div className="px-5 space-y-3">
        <AnimatePresence>
          {selectedProvider ? (
            <motion.div key="selected" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
              <ProviderCard provider={selectedProvider} onBook={p => { setSelectedProvider(p); setBookingOpen(true); }} />
            </motion.div>
          ) : (
            MOCK_PROVIDERS.filter(p => p.available).slice(0, 3).map(p => (
              <ProviderCard key={p.id} provider={p} onBook={pr => { setSelectedProvider(pr); setBookingOpen(true); }} />
            ))
          )}
        </AnimatePresence>
      </div>

      <BookingSheet provider={selectedProvider} open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
};

export default MapPage;
