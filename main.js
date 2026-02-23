/* ========================================================
   CØV49 NOBELLO – Interactions
   ======================================================== */

(function () {
  'use strict';

  // ── Scroll-based reveal ──────────────────────────────
  const revealElements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach((el) => observer.observe(el));

  // ── Navbar scroll state ──────────────────────────────
  const navbar = document.getElementById('navbar');

  function handleNavbarScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });

  // ── Sticky CTA visibility (hide when contact form visible) ──
  const stickyCta = document.getElementById('stickyCta');
  const kontaktSection = document.getElementById('kontakt');

  if (stickyCta && kontaktSection) {
    const ctaObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            stickyCta.style.transform = 'translateY(100%)';
            stickyCta.style.transition = 'transform 0.3s ease';
          } else {
            stickyCta.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1 }
    );
    ctaObserver.observe(kontaktSection);
  }

  // ── Smooth scroll for all anchor links ───────────────
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Floor plan tab switching ─────────────────────────
  document.querySelectorAll('.planlosning__tabs').forEach((tabGroup) => {
    tabGroup.addEventListener('click', (e) => {
      const tab = e.target.closest('.planlosning__tab');
      if (!tab) return;

      const planlosning = tab.closest('.planlosning');
      const planId = tab.dataset.plan;

      // Update tabs
      planlosning.querySelectorAll('.planlosning__tab').forEach((t) => t.classList.remove('is-active'));
      tab.classList.add('is-active');

      // Update images
      planlosning.querySelectorAll('.planlosning__img').forEach((img) => img.classList.remove('is-active'));
      const target = planlosning.querySelector('#' + planId);
      if (target) target.classList.add('is-active');
    });
  });

  // ── Lightbox for floor plans ─────────────────────────
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.querySelector('.lightbox__close');

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    document.body.classList.add('lightbox-open');
  }

  function closeLightbox() {
    document.body.classList.remove('lightbox-open');
    lightboxImg.src = '';
  }

  // Click on any floor plan image to open lightbox
  document.querySelectorAll('.planlosning__img').forEach((pic) => {
    pic.addEventListener('click', () => {
      const img = pic.querySelector('img');
      if (img) {
        openLightbox(img.src, img.alt);
      }
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // ── Map POI click-to-navigate ───────────────────────
  const mapFrame = document.getElementById('mapFrame');
  const defaultMapSrc = 'https://www.google.com/maps?q=59.9081,10.5654&z=15&output=embed';

  document.querySelectorAll('.poi-item[data-dest]').forEach((item) => {
    item.addEventListener('click', () => {
      const wasActive = item.classList.contains('is-active');

      // Remove all active states
      document.querySelectorAll('.poi-item[data-dest]').forEach((i) => {
        i.classList.remove('is-active');
      });

      if (wasActive) {
        mapFrame.src = defaultMapSrc;
      } else {
        item.classList.add('is-active');
        const dest = item.dataset.dest;
        mapFrame.src = 'https://www.google.com/maps?saddr=' + encodeURIComponent('Caroline Øverlands vei 49, Bekkestua') + '&daddr=' + dest + '&output=embed';
      }
    });
  });

  // ── Contact Form Handling (FormSubmit.co AJAX Fallback) ──
  window.handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const button = form.querySelector('button[type="submit"]');
    const successMsg = document.getElementById('formSuccess');

    // Button loading state
    const originalText = button.textContent;
    button.disabled = true;
    button.textContent = 'Sender...';

    try {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      const response = await fetch(form.action, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        form.reset();
        successMsg.style.display = 'flex';
        button.style.display = 'none';

        // Also hide the floating note if it was the trigger
        const floatingNote = document.getElementById('floatingNote');
        if (floatingNote) floatingNote.classList.remove('is-visible');
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      alert('Det oppsto en feil. Vennligst prøv igjen senere eller ring oss direkte.');
      button.disabled = false;
      button.textContent = originalText;
    }
  };

  // ── Floating CTA Note Logic ────────────────────────
  const floatingNote = document.getElementById('floatingNote');
  const closeNoteBtn = document.getElementById('closeNote');

  if (floatingNote && closeNoteBtn) {
    // Show after 5 seconds unless dismissed this session
    if (!sessionStorage.getItem('noteDismissed')) {
      setTimeout(() => {
        floatingNote.classList.add('is-visible');
      }, 5000);
    }

    closeNoteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      floatingNote.classList.remove('is-visible');
      sessionStorage.setItem('noteDismissed', 'true');
    });

    // Close note when clicking content (it scrolls to #kontakt anyway)
    floatingNote.querySelector('.floating-note__content').addEventListener('click', () => {
      floatingNote.classList.remove('is-visible');
    });
  }

})();
