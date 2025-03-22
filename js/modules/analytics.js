/**
 * Analytics module for tracking user interactions
 */

/**
 * Initialize analytics tracking
 */
export function initializeAnalytics() {
  console.log('Analytics initialized');
  
  // Track page view
  trackPageView();
  
  // Set up performance monitoring
  monitorPerformance();
}

/**
 * Track page view with metadata
 */
function trackPageView() {
  const pageData = {
    title: document.title,
    url: window.location.href,
    referrer: document.referrer,
    timestamp: new Date().toISOString()
  };
  
  console.log('Page view tracked', pageData);
  
  // In a real implementation, you would send this data to your analytics service
  // Example: sendToAnalyticsService('pageview', pageData);
}

/**
 * Monitor performance metrics
 */
function monitorPerformance() {
  // Check if Performance API is available
  if (window.performance) {
    // Get navigation timing data
    const timing = performance.timing;
    
    // Calculate page load time once it's complete
    window.addEventListener('load', () => {
      const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
      console.log(`Page load time: ${pageLoadTime}ms`);
    });
  }
}

/**
 * Track specific events
 * @param {string} category - Event category
 * @param {string} action - Event action
 * @param {string} label - Event label (optional)
 * @param {number} value - Event value (optional)
 */
export function trackEvent(category, action, label = null, value = null) {
  const eventData = {
    category,
    action,
    label,
    value,
    timestamp: new Date().toISOString()
  };
  
  console.log('Event tracked', eventData);
  
  // In a real implementation, you would send this data to your analytics service
  // Example: sendToAnalyticsService('event', eventData);
} 