import { DATA } from "@/data/resume";

export function GET() {
  return new Response(
    `User-agent: *\nAllow: /\nDisallow: /private/\nDisallow: /admin/\n\nSitemap: ${DATA.url}/sitemap.xml\n`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } }
  );
}
