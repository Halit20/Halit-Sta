/**
 * Social media management — real client work, real platforms.
 * No invented metrics: growth is described as a strategy, not a percentage.
 */

export const SOCIAL_CLIENT = {
  name: "Batllava Premium Resort",
  summary:
    "I manage Batllava Premium Resort’s digital presence through weekly planning, daily stories, scheduled posts, visual production, editing, community management, review responses, and listing upkeep across Instagram, TikTok, Facebook, Google Maps, Booking.com, and Airbnb.",
  website: "https://www.batllavaresort.com/",
};

export type SocialCard = {
  id: string;
  name: string;
  /** shown only when verified in the project */
  handle?: string;
  /** real URL only — cards without one render as non-interactive */
  href?: string;
  /** type label shown above the title */
  kind: "Social" | "Strategy" | "Production" | "Community";
  /** what is actually done */
  points: string[];
};

/** First grid: execution, planning, production, and community — 6 cards. */
export const SOCIAL_CARDS: SocialCard[] = [
  {
    id: "instagram",
    name: "Instagram",
    handle: "@batllavapremiumresort",
    href: "https://www.instagram.com/batllavapremiumresort/",
    kind: "Social",
    points: [
      "Daily stories & scheduled posts",
      "Reels & video content",
      "Weekly content planning",
    ],
  },
  {
    id: "tiktok",
    name: "TikTok",
    handle: "@premium.resort.batllava1",
    href: "https://www.tiktok.com/@premium.resort.batllava1",
    kind: "Social",
    points: [
      "Short-form video production",
      "Trend-aware editing",
      "Organic growth strategy",
    ],
  },
  {
    id: "facebook",
    name: "Facebook",
    handle: "BatllavaPremiumResort",
    href: "https://www.facebook.com/BatllavaPremiumResort",
    kind: "Social",
    points: [
      "Scheduled posts & daily stories",
      "Event and offer content",
      "Community responses",
    ],
  },
  {
    id: "planning",
    name: "Content Planning",
    kind: "Strategy",
    points: [
      "Weekly content calendar",
      "Platform-specific content planning",
      "Campaign, event, and offer coordination",
    ],
  },
  {
    id: "production",
    name: "Content Production",
    kind: "Production",
    points: [
      "Photo and video production",
      "Reels, stories, and social visuals",
      "Editing, color, and final delivery",
    ],
  },
  {
    id: "community",
    name: "Community & Reviews",
    kind: "Community",
    points: [
      "Comments and message responses",
      "Professional review replies",
      "Guest feedback monitoring",
    ],
  },
];

/** The recurring weekly service behind the presence — max 8 chips. */
export const SOCIAL_SERVICES = [
  "Weekly content planning",
  "Daily stories",
  "Scheduled publishing",
  "Reels & video production",
  "Image & video editing",
  "Community management",
  "Review responses",
  "Organic growth strategy",
];
