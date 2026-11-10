import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: siteConfig.contentUpdated,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projects.map((project) => ({
      url: `${siteConfig.url}/projects/${project.slug}`,
      lastModified: siteConfig.contentUpdated,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
