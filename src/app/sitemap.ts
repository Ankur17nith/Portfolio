import { MetadataRoute } from "next";
import { workStories } from "@/lib/work-stories";
import { siteConfig } from "@/lib/data";

const BASE_URL = siteConfig.url;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE_URL}/blog`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    {
      url: BASE_URL,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/stories/journey`,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/stories/ai`,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/work`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...workStories.map((post) => ({
      url: `${BASE_URL}/work/${post.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.75,
    })),
  ];
}
