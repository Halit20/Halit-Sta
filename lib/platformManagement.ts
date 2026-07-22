/**
 * Platform & listing management — the full digital hospitality presence,
 * beyond social posting: maps, OTAs, reviews, and visual upkeep.
 */

export type ManagedPlatform = {
  id: string;
  name: string;
  tagline: string;
  points: string[];
};

export const MANAGED_PLATFORMS: ManagedPlatform[] = [
  {
    id: "google-maps",
    name: "Google Maps",
    tagline: "Where guests decide if a place feels real.",
    points: [
      "Professional responses to positive and negative reviews",
      "Current imagery and business information",
      "Accurate property presentation",
      "360° visual presentation",
    ],
  },
  {
    id: "booking",
    name: "Booking.com",
    tagline: "The listing is the storefront.",
    points: [
      "Listing accuracy and ongoing management",
      "Availability and property presentation",
      "Content and image updates",
    ],
  },
  {
    id: "airbnb",
    name: "Airbnb",
    tagline: "Guest-facing from the first photo.",
    points: [
      "Listing management and positioning",
      "Guest-facing descriptions and presentation",
      "Visual updates as the property evolves",
    ],
  },
];
