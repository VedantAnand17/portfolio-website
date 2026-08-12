type Gtag = (
  command: "event" | "config" | "set",
  targetId: string,
  config?: Record<string, unknown>
) => void;

const getGtag = () => (window as Window & { gtag?: Gtag }).gtag;

export const trackEvent = (
  eventName: string,
  properties?: Record<string, unknown>
) => {
  if (typeof window !== "undefined") {
    // Google Analytics 4
    getGtag()?.("event", eventName, properties);

    // Custom analytics
    console.log("Analytics Event:", eventName, properties);
  }
};

export const trackPageView = (url: string) => {
  if (typeof window !== "undefined") {
    getGtag()?.("config", "G-L2R4MNTEYH", {
      page_path: url,
    });
  }
};

export const trackProjectView = (projectTitle: string) => {
  trackEvent("project_view", {
    project_title: projectTitle,
    timestamp: new Date().toISOString(),
  });
};

export const trackSocialClick = (platform: string) => {
  trackEvent("social_click", {
    platform,
    timestamp: new Date().toISOString(),
  });
};

export const trackContactClick = (method: string) => {
  trackEvent("contact_click", {
    method,
    timestamp: new Date().toISOString(),
  });
};

// Performance monitoring
export const measurePerformance = () => {
  if (typeof window !== "undefined" && "performance" in window) {
    const navigation = performance.getEntriesByType(
      "navigation"
    )[0] as PerformanceNavigationTiming;

    if (navigation) {
      const metrics = {
        dns: navigation.domainLookupEnd - navigation.domainLookupStart,
        domContentLoaded:
          navigation.domContentLoadedEventEnd -
          navigation.domContentLoadedEventStart,
        load: navigation.loadEventEnd - navigation.loadEventStart,
        tcp: navigation.connectEnd - navigation.connectStart,
        total: navigation.loadEventEnd - navigation.fetchStart,
        ttfb: navigation.responseStart - navigation.requestStart,
      };

      trackEvent("performance_metrics", metrics);
    }
  }
};
