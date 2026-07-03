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
    tagline: "Where guests decide if a place is real.",
    points: [
      "Review replies — negative and positive, handled professionally",
      "Image updates that keep the listing current",
      "Business presentation and information accuracy",
      "360° content system for immersive client presentation",
    ],
  },
  {
    id: "booking",
    name: "Booking.com",
    tagline: "The listing is the storefront.",
    points: [
      "Listing management and content accuracy",
      "Booking presence and availability presentation",
      "Ongoing hospitality platform maintenance",
    ],
  },
  {
    id: "airbnb",
    name: "Airbnb",
    tagline: "Guest-facing from the first photo.",
    points: [
      "Listing management and positioning",
      "Guest-facing presentation and descriptions",
      "Visual and content updates as the property evolves",
    ],
  },
];
