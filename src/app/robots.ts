import type { MetadataRoute } from "next";

import { DATA } from "@/data/resume";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      allow: "/",
      disallow: ["/private/", "/admin/"],
      userAgent: "*",
    },
    sitemap: `${DATA.url}/sitemap.xml`,
  };
}
