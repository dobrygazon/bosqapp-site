/**
 * bosq.app — Client Scripts
 * Handles Theme Toggle, Navigation, Showcase Tabs, FAQ Accordion, and Waitlist Form
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Year
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 2. Theme Toggle (Dark / Light mode)
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('bosq-theme');

  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    document.documentElement.setAttribute('data-theme', 'light');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('bosq-theme', newTheme);
    });
  }

  // 3. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking on any navigation link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // 4. Interactive Showcase Tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetContent = document.getElementById(`tab-${targetTab}`);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  // 5. FAQ Accordion
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all accordion items for clean single-open accordion UX
        accordionItems.forEach(i => {
          i.classList.remove('active');
          const t = i.querySelector('.accordion-trigger');
          if (t) t.setAttribute('aria-expanded', 'false');
        });

        if (!isActive) {
          item.classList.add('active');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // 6. Early Access / Waitlist Form
  const waitlistForm = document.getElementById('waitlistForm');
  const emailInput = document.getElementById('emailInput');
  const formFeedback = document.getElementById('formFeedback');

  if (waitlistForm && emailInput && formFeedback) {
    waitlistForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();

      if (!email || !email.includes('@')) {
        formFeedback.textContent = 'Please enter a valid email address.';
        formFeedback.className = 'form-feedback error';
        return;
      }

      // Simulate registration
      const submitBtn = waitlistForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Joining...';
      }

      setTimeout(() => {
        formFeedback.textContent = `✨ You're on the early access list! We sent a welcome note to ${email}.`;
        formFeedback.className = 'form-feedback success';
        emailInput.value = '';
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Joined!';
        }
      }, 700);
    });
  }

  // 7. Navbar scroll shadow indicator
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });
});
