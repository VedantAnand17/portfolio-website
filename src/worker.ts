import { handleErrorReport } from "./lib/error-collector.ts";

const aliases = new Set(["vedant-dev.com", "v3dant.com", "www.v3dant.com"]);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (aliases.has(url.hostname)) {
      url.protocol = "https:";
      url.hostname = "www.vedant-dev.com";
      url.port = "";
      return Response.redirect(url.href, 308);
    }
    if (["/index", "/index.html", "/home"].includes(url.pathname)) {
      url.pathname = "/";
      return Response.redirect(url.href, 308);
    }
    if (url.pathname === "/opengraph-image") {
      url.pathname = "/opengraph-image.png";
      return Response.redirect(url.href, 308);
    }
    if (url.pathname === "/api/errors") {
      const limiter = env.ERROR_REPORTS_LIMITER;
      return handleErrorReport(request, {
        log: (error, context) => console.error(error, context),
        limit: limiter
          ? async () => {
              const result = await limiter.limit({
                key: "portfolio-browser-errors",
              });
              return result.success;
            }
          : undefined,
      });
    }
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<CloudflareEnv>;
