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

  // 3. Xəbərdar Ol / Email Formaları (Hero və Yekun Bölmə)
  setupEmailForm('notifyForm', 'emailInput', 'formFeedback');
  setupEmailForm('notifyFormFinal', 'emailInputFinal', 'formFeedbackFinal');

  // 4. FAQ Akordion Funksionallığı
  initFaqAccordion();

  // 5. Hero Banner Əl ilə Yazılan Logo Animasiyası (Boşq.app)
  initHeroLogoAnimation();
});

/**
 * E-poçt Forması İdarəedicisi
 */
function setupEmailForm(formId, inputId, feedbackId) {
  const form = document.getElementById(formId);
  const input = document.getElementById(inputId);
  const feedback = document.getElementById(feedbackId);
  if (!form || !input || !feedback) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = input.value.trim();

    if (!email || !email.includes('@') || !email.includes('.')) {
      feedback.textContent = 'Zəhmət olmasa düzgün e-poçt ünvanı daxil edin.';
      feedback.className = 'form-feedback error';
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.textContent : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Qeyd olunur...';
    }

    // Xəbərdarlıq qeydiyyatı
    setTimeout(() => {
      feedback.textContent = `✨ Təşəkkür edirik! bosq yayımlandıqda (${email}) ünvanına erkən giriş göndərəcəyik.`;
      feedback.className = 'form-feedback success';
      input.value = '';
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Qeyd olundu!';
        setTimeout(() => {
          submitBtn.textContent = originalText;
        }, 3000);
      }
    }, 500);
  });
}

/**
 * FAQ Akordion İdarəedicisi
 */
function initFaqAccordion() {
  const faqCards = document.querySelectorAll('.faq-card');
  faqCards.forEach(card => {
    const btn = card.querySelector('.faq-question');
    if (btn) {
      btn.addEventListener('click', () => {
        const isOpen = card.classList.contains('active');
        faqCards.forEach(c => c.classList.remove('active'));
        if (!isOpen) {
          card.classList.add('active');
        }
      });
    }
  });
}

/**
 * Boşq.app Əl ilə Yazılan Logo Animasiyası
 * Bütün hərflər eyni anda yazılmağa başlayır:
 * - B, ş, p (1): Yuxarıdan aşağıya
 * - o, q, a, p (2): Aşağıdan yuxarıya
 * - . (nöqtə): Mərkəzdən mürəkkəb damcısı kimi
 */
function initHeroLogoAnimation() {
  const banner = document.getElementById('heroLogoBanner');
  const replayBtn = document.getElementById('heroLogoReplayBtn');
  if (!banner) return;

  const DURATION = 1850; // Millisaniyə: bütün hərflər eyni 1.85 saniyə ərzində yazılır
  let animId = null;
  let isPlaying = false;

  // 8 simvol üçün mask yolları və qələm ucluqları
  const strokeData = [];
  for (let i = 0; i < 8; i++) {
    const maskPath = document.getElementById('hero-mask-path-' + i);
    const nib = document.getElementById('hero-nib-' + i);
    const letter = document.getElementById('hero-letter-' + i);
    if (maskPath) {
      const len = maskPath.getTotalLength();
      strokeData.push({
        index: i,
        maskPath,
        nib,
        letter,
        len: len || 1
      });
    }
  }

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function playAnimation() {
    if (animId) {
      cancelAnimationFrame(animId);
      animId = null;
    }

    isPlaying = true;
    if (replayBtn) {
      replayBtn.style.pointerEvents = 'none';
      replayBtn.style.opacity = '0.5';
    }

    // Başlanğıc vəziyyət: bütün hərflər gizlədilir, stroke-dashoffset sıfırlanır
    strokeData.forEach(item => {
      item.maskPath.style.strokeDasharray = item.len;
      item.maskPath.style.strokeDashoffset = item.len;
      if (item.nib) {
        item.nib.style.opacity = '0';
        try {
          const startPt = item.maskPath.getPointAtLength(0);
          item.nib.setAttribute('cx', startPt.x);
          item.nib.setAttribute('cy', startPt.y);
        } catch (e) {}
      }
    });

    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / DURATION);
      const eased = easeInOutCubic(progress);

      strokeData.forEach(item => {
        // Hər bir hərfin trayektoriyası ilə xəttin çəkilməsi
        const currentOffset = item.len * (1 - eased);
        item.maskPath.style.strokeDashoffset = currentOffset;

        if (item.nib) {
          try {
            const currentDist = item.len * eased;
            const pt = item.maskPath.getPointAtLength(currentDist);
            item.nib.setAttribute('cx', pt.x);
            item.nib.setAttribute('cy', pt.y);

            // Qələm ucunun parıltısı: əvvəlcə yaranır, sonda incəcə itir
            if (progress < 0.1) {
              item.nib.style.opacity = String(progress / 0.1);
            } else if (progress > 0.88) {
              item.nib.style.opacity = String(Math.max(0, (1 - progress) / 0.12));
            } else {
              item.nib.style.opacity = '1';
            }
          } catch (e) {}
        }
      });

      if (progress < 1) {
        animId = requestAnimationFrame(step);
      } else {
        // Animasiya tamamlandı
        strokeData.forEach(item => {
          item.maskPath.style.strokeDashoffset = '0';
          if (item.nib) item.nib.style.opacity = '0';
        });
        isPlaying = false;
        if (replayBtn) {
          replayBtn.style.pointerEvents = '';
          replayBtn.style.opacity = '';
        }
      }
    }

    animId = requestAnimationFrame(step);
  }

  // Təkrar oynat düyməsi və loqo üzərinə klikləmə
  if (replayBtn) {
    replayBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      playAnimation();
    });
  }

  const wrapper = banner.querySelector('.hero-logo-wrapper');
  if (wrapper) {
    wrapper.addEventListener('click', () => {
      if (!isPlaying) playAnimation();
    });
  }

  // Səhifə yükləndikdə animasiyanı bir qədər gecikmə ilə başlat
  setTimeout(playAnimation, 400);
}
