import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
  if (context.isPrerendered) {
    return next();
  }
  if (
    ["vedant-dev.com", "v3dant.com", "www.v3dant.com"].includes(
      context.request.headers.get("host") ?? context.url.hostname
    )
  ) {
    const url = new URL(context.url);
    url.hostname = "www.vedant-dev.com";
    url.protocol = "https:";
    url.port = "";
    return context.redirect(url.href, 308);
  }
  if (["/index", "/index.html", "/home"].includes(context.url.pathname)) {
    return context.redirect("/", 308);
  }
  if (context.url.pathname === "/opengraph-image") {
    return context.redirect("/opengraph-image.png", 308);
  }
  return next();
});
