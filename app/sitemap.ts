import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://halitsta.com",
      lastModified: new Date("2026-06-30"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://halitsta.com/privacy",
      lastModified: new Date("2026-07-22"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: "https://halitsta.com/terms",
      lastModified: new Date("2026-07-22"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
