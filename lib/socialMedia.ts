/**
 * Social media management — real client work, real platforms.
 * No invented metrics: growth is described as a plan, not a percentage.
 */

export const SOCIAL_CLIENT = {
  name: "Batllava Premium Resort",
  summary:
    "I manage Batllava Premium Resort's digital presence with a weekly content plan, daily social media execution, visual production, editing, review handling, listing updates, and platform management across Instagram, TikTok, Facebook, Google Maps, Booking.com, and Airbnb.",
  website: "https://www.batllavaresort.com/",
};

export type SocialPlatform = {
  id: string;
  name: string;
  handle?: string;
  href: string;
  kind: "social" | "listing";
  /** what is actually managed on this platform */
  points: string[];
};

export const SOCIAL_PLATFORMS: SocialPlatform[] = [
  {
    id: "instagram",
    name: "Instagram",
    handle: "@batllavapremiumresort",
    href: "https://www.instagram.com/batllavapremiumresort/",
    kind: "social",
    points: ["Daily posts & stories", "Reels & video content", "Weekly content plan"],
  },
  {
    id: "tiktok",
    name: "TikTok",
    handle: "@premium.resort.batllava1",
    href: "https://www.tiktok.com/@premium.resort.batllava1",
    kind: "social",
    points: ["Short-form video", "Trend-aware editing", "Organic growth plan"],
  },
  {
    id: "facebook",
    name: "Facebook",
    handle: "BatllavaPremiumResort",
    href: "https://www.facebook.com/BatllavaPremiumResort",
    kind: "social",
    points: ["Daily posting", "Event & offer content", "Community responses"],
  },
  {
    id: "google-maps",
    name: "Google Maps",
    href: "https://www.google.com/maps/place/Batllava+premium+resort/@42.8297754,21.3132181,827m/data=!3m2!1e3!4b1!4m9!3m8!1s0x1354b100529e39f1:0x1dad62b737d43add!5m2!4m1!1i2!8m2!3d42.8297715!4d21.315793!16s%2Fg%2F11xdmf32sl?entry=ttu",
    kind: "listing",
    points: [
      "Review replies — positive & negative",
      "Image updates & business presentation",
      "360° visual content system",
    ],
  },
  {
    id: "booking",
    name: "Booking.com",
    href: "https://www.booking.com/hotel/xk/batllava-premium-resort.html",
    kind: "listing",
    points: ["Listing management", "Booking presence", "Hospitality platform maintenance"],
  },
  {
    id: "airbnb",
    name: "Airbnb",
    href: "https://www.airbnb.com/rooms/1263885642335264572",
    kind: "listing",
    points: ["Listing management", "Guest-facing presentation", "Visual & content updates"],
  },
];

/** The recurring work behind the presence — the real service, not just posts. */
export const SOCIAL_SERVICES = [
  "Weekly posting plan",
  "Daily posts & stories",
  "Reels & video content",
  "Image & video editing",
  "Organic growth strategy",
  "Review replies — positive & negative",
  "Google Maps image updates",
  "360° content system for clients",
  "Booking.com management",
  "Airbnb management",
];

/** Material captured with — real production kit. */
export const CONTENT_GEAR = [
  "Sony ZV-E10",
  "DJI Mini 5 Pro Fly More Combo",
  "DJI Avata 2 Fly More Combo",
  "DJI Action 5 Pro Adventure Combo",
];
