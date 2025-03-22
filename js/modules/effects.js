/**
 * Effects module for animations and theme toggling
 */

/**
 * Add hover effects to interactive elements
 */
export function addHoverEffects() {
  console.log('Hover effects initialized');
  
  // Add subtle hover animations to links
  const links = document.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('mouseenter', (e) => {
      e.target.style.transition = `all ${getComputedStyle(document.documentElement).getPropertyValue('--transition-speed')}`;
    });
  });
}

/**
 * Initialize theme toggle functionality
 */
export function initThemeToggle() {
  // Check for saved theme preference or use preferred color scheme
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Set initial theme based on saved preference or system preference
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark-theme');
    updateThemeToggleButton(true);
  } else {
    document.documentElement.classList.remove('dark-theme');
    updateThemeToggleButton(false);
  }
  
  // Add event listener to theme toggle button
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
}

/**
 * Toggle between light and dark themes
 */
function toggleTheme() {
  const isDarkTheme = document.documentElement.classList.toggle('dark-theme');
  
  // Save theme preference to localStorage
  localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
  
  // Update button icon and aria-label
  updateThemeToggleButton(isDarkTheme);
  
  // Add transition class for smooth animation
  document.documentElement.classList.add('theme-transition');
  
  // Remove transition class after transition completes
  setTimeout(() => {
    document.documentElement.classList.remove('theme-transition');
  }, 300);
}

/**
 * Update theme toggle button appearance based on current theme
 * @param {boolean} isDarkTheme - Whether the current theme is dark
 */
function updateThemeToggleButton(isDarkTheme) {
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    const icon = themeToggle.querySelector('i');
    
    if (isDarkTheme) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
      themeToggle.setAttribute('aria-label', 'Switch to light theme');
      themeToggle.title = 'Switch to light theme';
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
      themeToggle.setAttribute('aria-label', 'Switch to dark theme');
      themeToggle.title = 'Switch to dark theme';
    }
  }
}

/**
 * Add smooth scroll behavior to page
 */
export function addSmoothScrolling() {
  // Add smooth scrolling to the entire page
  document.documentElement.style.scrollBehavior = 'smooth';
  
  // Add smooth scrolling to all anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href !== '#') {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
} 