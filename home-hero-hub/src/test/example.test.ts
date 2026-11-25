import { describe, it, expect } from "vitest";
import { MOCK_PROVIDERS, SERVICE_CATEGORIES } from "@/data/mock";
import { filterProviders } from "@/lib/providerFilters";

describe("bookable services", () => {
  it("offers bookable providers for every listed service, including mobile auto, catering, and rubble removal", () => {
    expect(SERVICE_CATEGORIES.map(category => category.name)).toEqual(
      expect.arrayContaining(["Mobile Mechanic", "Car Detailing", "Catering", "Rubble Removal"]),
    );

    for (const category of SERVICE_CATEGORIES) {
      expect(
        MOCK_PROVIDERS.some(provider => provider.specialty === category.name && provider.available),
        `${category.name} should have an available provider`,
      ).toBe(true);
    }
  });
});

describe("provider filters", () => {
  it("limits providers to the selected nearby service area in kilometers", () => {
    const results = filterProviders(MOCK_PROVIDERS, { maxDistanceKm: 2, availableOnly: false, minimumRating: null });
    expect(results.length).toBeGreaterThan(0);
    expect(results.every(provider => Number.parseFloat(provider.distance) <= 2)).toBe(true);
  });

  it("shows only providers available now when requested", () => {
    const results = filterProviders(MOCK_PROVIDERS, { maxDistanceKm: null, availableOnly: true, minimumRating: null });
    expect(results.length).toBeGreaterThan(0);
    expect(results.every(provider => provider.available)).toBe(true);
  });

  it("keeps only providers meeting the minimum customer rating", () => {
    const results = filterProviders(MOCK_PROVIDERS, { maxDistanceKm: null, availableOnly: false, minimumRating: 4.8 });
    expect(results.length).toBeGreaterThan(0);
    expect(results.every(provider => provider.rating >= 4.8)).toBe(true);
  });
});
