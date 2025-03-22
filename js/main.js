/**
 * Main JavaScript module for Corey Alan website
 */

// Import modules
import { initializeAnalytics, trackEvent } from './modules/analytics.js';
import { addHoverEffects, initThemeToggle, addSmoothScrolling } from './modules/effects.js';

// Initialize app when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Personal website initialized');
  
  // Initialize modules
  initializeAnalytics();
  addHoverEffects();
  initThemeToggle();
  addSmoothScrolling();
  
  // Add animations to page elements
  addPageAnimations();
  
  // Add event listeners
  setupEventListeners();
});

/**
 * Setup event listeners for various website interactions
 */
function setupEventListeners() {
  // Add click tracking to social links
  const socialLinks = document.querySelectorAll('.icons-social a');
  socialLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const linkName = e.currentTarget.getAttribute('aria-label');
      console.log(`Social link clicked: ${linkName}`);
      
      // Track event using analytics module
      trackEvent('social', 'click', linkName);
    });
  });
  
  // Track theme toggle clicks
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDarkTheme = document.documentElement.classList.contains('dark-theme');
      trackEvent('theme', 'toggle', isDarkTheme ? 'light' : 'dark');
    });
  }
}

/**
 * Add animations to page elements
 */
function addPageAnimations() {
  // Add staggered animations to social media icons
  const socialLinks = document.querySelectorAll('.icons-social a');
  socialLinks.forEach((link, index) => {
    link.style.animationDelay = `${0.3 + (index * 0.1)}s`;
  });
}

// Export public API
export default {
  init: () => {
    console.log('Manual initialization');
    setupEventListeners();
    addPageAnimations();
  }
}; 