import type { Provider } from '@/data/mock';

export interface ProviderFilters {
  maxDistanceKm: number | null;
  availableOnly: boolean;
  minimumRating: number | null;
}

export const DEFAULT_PROVIDER_FILTERS: ProviderFilters = {
  maxDistanceKm: null,
  availableOnly: false,
  minimumRating: null,
};

export function filterProviders(providers: Provider[], filters: ProviderFilters): Provider[] {
  return providers.filter((provider) => {
    const distanceKm = Number.parseFloat(provider.distance);
    if (filters.maxDistanceKm !== null && (!Number.isFinite(distanceKm) || distanceKm > filters.maxDistanceKm)) return false;
    if (filters.availableOnly && !provider.available) return false;
    if (filters.minimumRating !== null && provider.rating < filters.minimumRating) return false;
    return true;
  });
}
