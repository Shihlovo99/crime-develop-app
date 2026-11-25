import { useState } from 'react';
import { SERVICE_CATEGORIES, MOCK_PROVIDERS, Provider } from '@/data/mock';
import ServiceCategoryCard from '@/components/ServiceCategoryCard';
import ProviderCard from '@/components/ProviderCard';
import BookingSheet from '@/components/BookingSheet';
import { Search, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DEFAULT_PROVIDER_FILTERS, filterProviders } from '@/lib/providerFilters';

const Services = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [maxDistanceKm, setMaxDistanceKm] = useState('any');
  const [availability, setAvailability] = useState('any');
  const [minimumRating, setMinimumRating] = useState('any');

  const filteredCategories = SERVICE_CATEGORIES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const selectedService = SERVICE_CATEGORIES.find(category => category.id === selectedCategory);
  const providersForService = MOCK_PROVIDERS.filter(p =>
    !selectedService || p.specialty.toLowerCase() === selectedService.name.toLowerCase()
  );
  const filteredProviders = filterProviders(providersForService, {
    maxDistanceKm: maxDistanceKm === 'any' ? DEFAULT_PROVIDER_FILTERS.maxDistanceKm : Number(maxDistanceKm),
    availableOnly: availability === 'available',
    minimumRating: minimumRating === 'any' ? DEFAULT_PROVIDER_FILTERS.minimumRating : Number(minimumRating),
  });
  const activeFilterCount = [maxDistanceKm !== 'any', availability !== 'any', minimumRating !== 'any'].filter(Boolean).length;
  const resetFilters = () => {
    setMaxDistanceKm('any');
    setAvailability('any');
    setMinimumRating('any');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-30 bg-background border-b border-border px-5 pt-12 pb-4">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
            <ArrowLeft size={20} className="text-foreground" />
          </button>
          <h1 className="text-xl font-bold text-foreground">Services</h1>
        </div>
        <div className="flex items-center gap-3 px-4 py-3 bg-secondary rounded-xl">
          <Search size={18} className="text-muted-foreground" />
          <input
            type="text"
            placeholder="Search services..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
        </div>
      </div>

      <div className="px-5 py-4 space-y-6">
        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          <button
            onClick={() => setSelectedCategory(null)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
              !selectedCategory ? "gradient-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
            )}
          >
            All
          </button>
          {SERVICE_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                selectedCategory === cat.id ? "gradient-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {!selectedCategory && (
          <div className="grid grid-cols-4 gap-2">
            {filteredCategories.map((cat, i) => (
              <motion.div key={cat.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.03 }}>
                <ServiceCategoryCard category={cat} onClick={setSelectedCategory} />
              </motion.div>
            ))}
          </div>
        )}

        <div>
          <div className="flex items-center justify-between gap-3 mb-3">
            <h2 className="text-lg font-bold text-foreground">
              {selectedCategory ? `${SERVICE_CATEGORIES.find(c => c.id === selectedCategory)?.name} Pros` : 'Available Pros'}
            </h2>
            {activeFilterCount > 0 && (
              <Button variant="ghost" size="sm" onClick={resetFilters} className="h-8 shrink-0 px-2 text-xs">
                Reset ({activeFilterCount})
              </Button>
            )}
          </div>
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="min-w-0">
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Service area</label>
              <Select value={maxDistanceKm} onValueChange={setMaxDistanceKm}>
                <SelectTrigger aria-label="Service area" className="h-10 px-2 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any distance</SelectItem>
                  <SelectItem value="2">Within 2 km</SelectItem>
                  <SelectItem value="5">Within 5 km</SelectItem>
                  <SelectItem value="10">Within 10 km</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="min-w-0">
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Availability</label>
              <Select value={availability} onValueChange={setAvailability}>
                <SelectTrigger aria-label="Availability" className="h-10 px-2 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any status</SelectItem>
                  <SelectItem value="available">Available now</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="min-w-0">
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Rating</label>
              <Select value={minimumRating} onValueChange={setMinimumRating}>
                <SelectTrigger aria-label="Minimum rating" className="h-10 px-2 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any rating</SelectItem>
                  <SelectItem value="4">4+ stars</SelectItem>
                  <SelectItem value="4.5">4.5+ stars</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-3">
            {filteredProviders.map(p => (
              <ProviderCard key={p.id} provider={p} onBook={pr => { setSelectedProvider(pr); setBookingOpen(true); }} />
            ))}
            {filteredProviders.length === 0 && (
              <div className="py-8 text-center">
                <p className="font-medium text-foreground">No providers match these filters</p>
                <p className="mt-1 text-sm text-muted-foreground">Try a wider service area or different rating.</p>
                <Button variant="outline" size="sm" onClick={resetFilters} className="mt-4">Clear filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <BookingSheet provider={selectedProvider} open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
};

export default Services;
