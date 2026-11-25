import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVICE_CATEGORIES, MOCK_PROVIDERS, MOCK_ACTIVE_JOB, Provider } from '@/data/mock';
import ServiceCategoryCard from '@/components/ServiceCategoryCard';
import ProviderCard from '@/components/ProviderCard';
import ActiveJobCard from '@/components/ActiveJobCard';
import BookingSheet from '@/components/BookingSheet';
import { motion } from 'framer-motion';
import { Bell, Search } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  const handleBook = (provider: Provider) => {
    setSelectedProvider(provider);
    setBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="gradient-primary px-5 pt-12 pb-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-primary-foreground/70 text-sm">Good morning 👋</p>
            <h1 className="text-xl font-bold text-primary-foreground">What do you need?</h1>
          </div>
          <button className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <Bell size={20} className="text-primary-foreground" />
          </button>
        </div>

        {/* Search bar */}
        <button
          onClick={() => navigate('/services')}
          className="w-full flex items-center gap-3 px-4 py-3 bg-primary-foreground/20 rounded-xl text-primary-foreground/60 text-sm"
        >
          <Search size={18} />
          Search for a service...
        </button>
      </div>

      <div className="px-5 -mt-4 space-y-6">
        {/* Active job */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <ActiveJobCard job={MOCK_ACTIVE_JOB} />
        </motion.div>

        {/* Services grid */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-3">Services</h2>
          <div className="grid grid-cols-4 gap-2">
            {SERVICE_CATEGORIES.slice(0, 8).map((cat, i) => (
              <motion.div key={cat.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <ServiceCategoryCard category={cat} onClick={() => navigate('/services')} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Top Pros */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-foreground">Top Pros Nearby</h2>
            <button onClick={() => navigate('/map')} className="text-sm font-semibold text-primary">View Map</button>
          </div>
          <div className="space-y-3">
            {MOCK_PROVIDERS.slice(0, 3).map(provider => (
              <ProviderCard key={provider.id} provider={provider} onBook={handleBook} />
            ))}
          </div>
        </div>
      </div>

      <BookingSheet provider={selectedProvider} open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
};

export default Index;
