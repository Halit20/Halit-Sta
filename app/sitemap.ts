import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://halitstatovci.com",
      lastModified: new Date("2026-06-30"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
