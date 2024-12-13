// main.js

// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    /* ===============================
       1. Hamburger Menu Toggle with Accessibility
       =============================== */
  
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
  
    // Toggle navigation menu on hamburger click
    const toggleMenu = () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
  
      // Update ARIA attributes for accessibility
      const isExpanded = hamburger.classList.contains('active');
      hamburger.setAttribute('aria-expanded', isExpanded);
    };
  
    hamburger.addEventListener('click', toggleMenu);
  
    // Allow toggling menu with keyboard (Enter or Space)
    hamburger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
      }
    });
  
    // Close navigation menu when a link is clicked (useful for mobile)
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
          toggleMenu();
        }
      });
    });
  
    /* ===============================
       2. Dynamic Footer Year
       =============================== */
  
    const yearSpan = document.getElementById('year');
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;
  
    /* ===============================
       3. Back-to-Top Button Functionality
       =============================== */
  
    const backToTopButton = document.getElementById('back-to-top');
  
    // Show or hide the back-to-top button based on scroll position
    const toggleBackToTopButton = () => {
      if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
      } else {
        backToTopButton.classList.remove('show');
      }
    };
  
    window.addEventListener('scroll', toggleBackToTopButton);
  
    // Smooth scroll to top when the back-to-top button is clicked
    backToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  
    /* ===============================
       4. Enhanced Smooth Scrolling with Easing Function
       =============================== */
  
    // Easing function for smooth scrolling
    const easeInOutCubic = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t * t + b;
      t -= 2;
      return c / 2 * (t * t * t + 2) + b;
    };
  
    // Custom smooth scroll function
    const smoothScrollTo = (target, duration = 800) => {
      const targetElement = document.querySelector(target);
      if (!targetElement) return;
  
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 60; // Adjust for navbar height
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      let startTime = null;
  
      const animation = currentTime => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      };
  
      requestAnimationFrame(animation);
    };
  
    // Attach smooth scroll to internal navigation links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = this.getAttribute('href');
        smoothScrollTo(target, 1000);
      });
    });
  
    /* ===============================
       5. Scroll-Based Animations (Scroll Reveal)
       =============================== */
  
    const revealElements = document.querySelectorAll('[data-reveal]');
  
    const revealOnScroll = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Stop observing after revealing
        }
      });
    };
  
    const observerOptions = {
      threshold: 0.1
    };
  
    const observer = new IntersectionObserver(revealOnScroll, observerOptions);
  
    revealElements.forEach(element => {
      observer.observe(element);
    });
  
    /* ===============================
       6. Lazy Loading of Images
       =============================== */
  
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
    if ('IntersectionObserver' in window) {
      const lazyImageObserver = new IntersectionObserver((entries, imgObserver) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imgObserver.unobserve(img);
          }
        });
      });
  
      lazyImages.forEach(img => {
        lazyImageObserver.observe(img);
      });
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      lazyImages.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    }
  
    /* ===============================
       7. Optional: Typing Animation for Hero Text
       =============================== */
  
    // Ensure that the hero-text paragraph contains a span with class 'typed-text'
    // Example HTML:
    // <p><span class="typed-text"></span><span class="cursor">&nbsp;</span></p>
  
    const typedTextSpan = document.querySelector(".typed-text");
    const cursorSpan = document.querySelector(".cursor");
  
    const textArray = ["Empowering Skyriz Development", "Join the Skyriz Community", "Innovate with Us"];
    const typingDelay = 150;
    const erasingDelay = 100;
    const newTextDelay = 2000; // Delay between current and next text
    let textArrayIndex = 0;
    let charIndex = 0;
  
    if (typedTextSpan) {
      function type() {
        if (charIndex < textArray[textArrayIndex].length) {
          typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
          charIndex++;
          setTimeout(type, typingDelay);
        } else {
          setTimeout(erase, newTextDelay);
        }
      }
  
      function erase() {
        if (charIndex > 0) {
          typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
          charIndex--;
          setTimeout(erase, erasingDelay);
        } else {
          textArrayIndex++;
          if (textArrayIndex >= textArray.length) textArrayIndex = 0;
          setTimeout(type, typingDelay + 1100);
        }
      }
  
      document.addEventListener("DOMContentLoaded", function () { // On DOM Load initiate the effect
        if (textArray.length) setTimeout(type, newTextDelay + 250);
      });
    }
  
  });
  