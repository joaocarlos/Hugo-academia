/**
 * Academia Theme - Main JavaScript
 * Handles theme switching, mobile menu, and TOC highlighting
 */

(function() {
  'use strict';

  // ==========================================================================
  // Theme Toggle
  // ==========================================================================
  
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  
  function getPreferredTheme() {
    try {
      const stored = localStorage.getItem('theme');
      if (stored) return stored;
    } catch (e) {}
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  
  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {}
  }
  
  function toggleTheme() {
    const current = html.getAttribute('data-theme');
    // Resolve 'auto' to the actual current appearance before toggling
    const resolved = current === 'auto'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : current;
    const next = resolved === 'dark' ? 'light' : 'dark';
    setTheme(next);
  }
  
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
  
  // Follow system theme changes only when no explicit user preference is stored
  function onSystemThemeChange(isDark) {
    try {
      if (!localStorage.getItem('theme')) {
        // Update attribute only – do NOT persist to localStorage so CSS keeps control
        html.setAttribute('data-theme', isDark ? 'dark' : 'light');
      }
    } catch (e) {
      html.setAttribute('data-theme', isDark ? 'dark' : 'light');
    }
  }

  var mql = window.matchMedia('(prefers-color-scheme: dark)');
  // addEventListener supported in Safari ≥ 14; fall back to addListener for older Safari
  if (typeof mql.addEventListener === 'function') {
    mql.addEventListener('change', function(e) { onSystemThemeChange(e.matches); });
  } else if (typeof mql.addListener === 'function') {
    mql.addListener(function(e) { onSystemThemeChange(e.matches); });
  }

  // Re-apply theme on BFCache restore (Safari aggressively caches pages)
  window.addEventListener('pageshow', function(e) {
    if (e.persisted) {
      try {
        var stored = localStorage.getItem('theme');
        html.setAttribute('data-theme', stored || 'auto');
      } catch (err) {}
    }
  });

  // ==========================================================================
  // Mobile Menu
  // ==========================================================================
  
  const menuToggle = document.getElementById('menu-toggle');
  const menuClose = document.getElementById('menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuOverlay = document.getElementById('mobile-menu-overlay');
  
  function openMenu() {
    mobileMenu.classList.add('mobile-menu--open');
    menuOverlay.classList.add('mobile-menu-overlay--visible');
    menuToggle.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
    mobileMenu.removeAttribute('inert');
    document.body.style.overflow = 'hidden';
    menuClose.focus();
  }
  
  function closeMenu() {
    mobileMenu.classList.remove('mobile-menu--open');
    menuOverlay.classList.remove('mobile-menu-overlay--visible');
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    mobileMenu.setAttribute('inert', '');
    document.body.style.overflow = '';
    menuToggle.focus();
  }
  
  if (menuToggle) {
    menuToggle.addEventListener('click', openMenu);
  }
  
  if (menuClose) {
    menuClose.addEventListener('click', closeMenu);
  }
  
  if (menuOverlay) {
    menuOverlay.addEventListener('click', closeMenu);
  }
  
  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('mobile-menu--open')) {
      closeMenu();
    }
  });
  
  // Close menu when clicking a link
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu__link');
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // ==========================================================================
  // Table of Contents - Active Section Highlighting
  // ==========================================================================
  
  const tocNav = document.getElementById('toc-nav');
  
  if (tocNav) {
    const tocLinks = tocNav.querySelectorAll('a');
    const headings = [];
    
    // Collect all headings that match TOC links
    tocLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const id = href.slice(1);
        const heading = document.getElementById(id);
        if (heading) {
          headings.push({ element: heading, link: link });
        }
      }
    });
    
    if (headings.length > 0) {
      // Intersection Observer for TOC highlighting
      const observerOptions = {
        root: null,
        rootMargin: '-80px 0px -70% 0px',
        threshold: 0
      };
      
      let activeLink = null;
      
      function setActiveLink(link) {
        if (activeLink) {
          activeLink.classList.remove('toc-active');
        }
        if (link) {
          link.classList.add('toc-active');
          activeLink = link;
        }
      }
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const heading = headings.find(h => h.element === entry.target);
            if (heading) {
              setActiveLink(heading.link);
            }
          }
        });
      }, observerOptions);
      
      headings.forEach(({ element }) => {
        observer.observe(element);
      });
      
      // Set initial active state based on scroll position
      function setInitialActive() {
        const scrollY = window.scrollY;
        const headerOffset = 100;
        
        for (let i = headings.length - 1; i >= 0; i--) {
          const { element, link } = headings[i];
          const rect = element.getBoundingClientRect();
          const offsetTop = rect.top + scrollY - headerOffset;
          
          if (scrollY >= offsetTop) {
            setActiveLink(link);
            return;
          }
        }
        
        // If no heading is past the scroll position, activate the first one
        if (headings.length > 0) {
          setActiveLink(headings[0].link);
        }
      }
      
      // Run on load
      setInitialActive();
      
      // Smooth scroll for TOC links
      tocLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          const href = link.getAttribute('href');
          if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
              const headerOffset = 80;
              const elementPosition = target.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
              
              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
              });
              
              // Update URL without jumping
              history.pushState(null, null, href);
            }
          }
        });
      });
    }
  }

  // ==========================================================================
  // Smooth Scroll for All Anchor Links
  // ==========================================================================
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Update URL
        history.pushState(null, null, href);
      }
    });
  });

  // ==========================================================================
  // Code Block Copy Button
  // ==========================================================================
  
  const codeBlocks = document.querySelectorAll('pre > code');
  
  codeBlocks.forEach(codeBlock => {
    const pre = codeBlock.parentElement;
    pre.style.position = 'relative';
    
    const copyButton = document.createElement('button');
    copyButton.className = 'code-copy-btn';
    copyButton.textContent = 'Copy';
    copyButton.setAttribute('aria-label', 'Copy code to clipboard');
    
    copyButton.addEventListener('click', async () => {
      const code = codeBlock.textContent;
      
      try {
        await navigator.clipboard.writeText(code);
        copyButton.textContent = 'Copied!';
        copyButton.classList.add('copied');
        
        setTimeout(() => {
          copyButton.textContent = 'Copy';
          copyButton.classList.remove('copied');
        }, 2000);
      } catch (err) {
        copyButton.textContent = 'Error';
        setTimeout(() => {
          copyButton.textContent = 'Copy';
        }, 2000);
      }
    });
    
    pre.appendChild(copyButton);
  });

  // ==========================================================================
  // External Links - Add Icons and Target
  // ==========================================================================
  
  const contentLinks = document.querySelectorAll('.content a[href^="http"]');
  
  contentLinks.forEach(link => {
    // Skip if already has target
    if (!link.hasAttribute('target')) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });

  // ==========================================================================
  // Language Switcher – Record Explicit Choice
  // ==========================================================================
  // When the user actively clicks a language link, store the preference so the
  // auto-detection script never overrides their decision on future visits.
  document.addEventListener('click', function(e) {
    var link = e.target.closest('.lang-switcher__link');
    if (!link) return;
    try {
      var hreflang = (link.getAttribute('hreflang') || link.getAttribute('lang') || '').toLowerCase();
      localStorage.setItem('lang-pref', hreflang.startsWith('pt') ? 'pt-br' : 'en');
    } catch (e) {}
  });

  // ==========================================================================
  // Reading Progress Indicator (Optional)
  // ==========================================================================
  
  const progressBar = document.querySelector('.reading-progress');
  
  if (progressBar) {
    const article = document.querySelector('.article__content');
    
    if (article) {
      function updateProgress() {
        const articleRect = article.getBoundingClientRect();
        const articleTop = articleRect.top + window.scrollY;
        const articleHeight = articleRect.height;
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;
        
        const progress = Math.min(
          Math.max((scrollY - articleTop + windowHeight * 0.3) / articleHeight, 0),
          1
        );
        
        progressBar.style.transform = `scaleX(${progress})`;
      }
      
      window.addEventListener('scroll', updateProgress, { passive: true });
      updateProgress();
    }
  }

})();

// ==========================================================================
// CSS for Code Copy Button (injected via JS)
// ==========================================================================

const copyButtonStyles = document.createElement('style');
copyButtonStyles.textContent = `
  .code-copy-btn {
    position: absolute;
    top: var(--sp-2, 0.5rem);
    right: var(--sp-2, 0.5rem);
    padding: var(--sp-1, 0.25rem) var(--sp-3, 0.75rem);
    font-family: var(--font-sans, system-ui);
    font-size: var(--fs-xs, 0.75rem);
    font-weight: 500;
    color: var(--color-text-muted, #888);
    background: var(--color-bg-alt, #f5f5f5);
    border: 1px solid var(--color-border, #e0e0e0);
    border-radius: var(--radius-sm, 3px);
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.2s ease, background 0.2s ease;
  }
  
  pre:hover .code-copy-btn {
    opacity: 1;
  }
  
  .code-copy-btn:hover {
    background: var(--color-bg-elevated, #fff);
  }
  
  .code-copy-btn.copied {
    color: var(--color-success, #48bb78);
    border-color: var(--color-success, #48bb78);
  }
`;
document.head.appendChild(copyButtonStyles);
