import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/all-articles?"],
      },
    ],
    sitemap: "https://www.justawakenspirit.com/sitemap.xml",
    host: "https://www.justawakenspirit.com",
  };
}
