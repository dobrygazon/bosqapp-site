/**
 * bosq.app — Client Scripts (Azərbaycan dili)
 * Qaranlıq/İşıqlı rejim dəyişdiricisi və Xəbərdarlıq forması
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dinamik İl
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 2. Qaranlıq / İşıqlı rejim
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

  // 3. Xəbərdar Ol / Email Forması
  const notifyForm = document.getElementById('notifyForm');
  const emailInput = document.getElementById('emailInput');
  const formFeedback = document.getElementById('formFeedback');

  if (notifyForm && emailInput && formFeedback) {
    notifyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();

      if (!email || !email.includes('@') || !email.includes('.')) {
        formFeedback.textContent = 'Zəhmət olmasa düzgün e-poçt ünvanı daxil edin.';
        formFeedback.className = 'form-feedback error';
        return;
      }

      const submitBtn = notifyForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Qeyd olunur...';
      }

      // Xəbərdarlıq qeydiyyatı simulyasiyası
      setTimeout(() => {
        formFeedback.textContent = `✨ Təşəkkür edirik! bosq yayımlandıqda (${email}) ünvanına xəbər göndərəcəyik.`;
        formFeedback.className = 'form-feedback success';
        emailInput.value = '';
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Qeyd olundu!';
        }
      }, 600);
    });
  }
});
