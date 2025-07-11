export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    // Google Analytics 4
    if (window.gtag) {
      window.gtag('event', eventName, properties);
    }
    
    // Custom analytics
    console.log('Analytics Event:', eventName, properties);
  }
};

export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined') {
    if (window.gtag) {
      window.gtag('config', 'G-XXXXXXXXXX', {
        page_path: url,
      });
    }
  }
};

export const trackProjectView = (projectTitle: string) => {
  trackEvent('project_view', {
    project_title: projectTitle,
    timestamp: new Date().toISOString(),
  });
};

export const trackSocialClick = (platform: string) => {
  trackEvent('social_click', {
    platform,
    timestamp: new Date().toISOString(),
  });
};

export const trackContactClick = (method: string) => {
  trackEvent('contact_click', {
    method,
    timestamp: new Date().toISOString(),
  });
};

// Performance monitoring
export const measurePerformance = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    if (navigation) {
      const metrics = {
        dns: navigation.domainLookupEnd - navigation.domainLookupStart,
        tcp: navigation.connectEnd - navigation.connectStart,
        ttfb: navigation.responseStart - navigation.requestStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        load: navigation.loadEventEnd - navigation.loadEventStart,
        total: navigation.loadEventEnd - navigation.fetchStart,
      };
      
      trackEvent('performance_metrics', metrics);
    }
  }
}; 