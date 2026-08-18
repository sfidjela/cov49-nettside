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
      const href = this.getAttribute('href');
      if (href === '#' || href === '#faq') return; // FAQ modal handles #faq
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navbarHeight = document.getElementById('navbar')?.offsetHeight || 70;
        const targetPos = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 24;
        window.scrollTo({
          top: Math.max(0, targetPos),
          behavior: 'smooth'
        });
      }
    });
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

  // ── FAQ Accordion Logic ───────────────────────────────
  const faqItems = document.querySelectorAll('.faq__item');
  faqItems.forEach(item => {
    const summary = item.querySelector('.faq__question');
    if (summary) {
      summary.addEventListener('click', (e) => {
        // If it's closed and about to open, close all others
        if (!item.hasAttribute('open')) {
          faqItems.forEach(other => {
            if (other !== item && other.hasAttribute('open')) {
              other.removeAttribute('open');
            }
          });
        }
      });
    }
  });

  // ── FAQ Modal Logic ───────────────────────────────
  const navFaqBtn = document.getElementById('navFaqBtn');
  const faqModal = document.getElementById('faqModal');
  const faqModalCloseBtn = document.getElementById('faqModalCloseBtn');
  const faqModalCloseBg = document.getElementById('faqModalCloseBg');

  function openFaqModal(e) {
    if (e) e.preventDefault();
    document.body.classList.add('faq-open');
  }

  function closeFaqModal() {
    document.body.classList.remove('faq-open');
    if (window.location.hash === '#faq') {
      history.replaceState(null, null, window.location.pathname + window.location.search);
    }
  }

  if (navFaqBtn) navFaqBtn.addEventListener('click', openFaqModal);
  if (faqModalCloseBtn) faqModalCloseBtn.addEventListener('click', closeFaqModal);
  if (faqModalCloseBg) faqModalCloseBg.addEventListener('click', closeFaqModal);

  if (window.location.hash === '#faq') {
    openFaqModal();
  }
  window.addEventListener('hashchange', () => {
    if (window.location.hash === '#faq') {
      openFaqModal();
    }
  });

  // ── Dark/Light Mode Theme Toggle ─────────────────────
  const themeToggle = document.getElementById('theme-toggle');

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      const currentTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
      localStorage.setItem('theme', currentTheme);
    });
  }

  // Synchronize theme across open tabs/windows
  window.addEventListener('storage', (e) => {
    if (e.key === 'theme') {
      if (e.newValue === 'light') {
        document.body.classList.add('light-mode');
      } else {
        document.body.classList.remove('light-mode');
      }
    }
  });

  // ── BILDEGALLERI & FILTER LOGIC ──────────────────────
  const gallerySection = document.querySelector('.pl-gallery-section');
  if (gallerySection) {
    const galleryTrack = gallerySection.querySelector('.pl-gallery-track');
    const allSlides = Array.from(galleryTrack.querySelectorAll('.pl-gallery-slide'));
    const prevBtn = gallerySection.querySelector('.pl-gallery-nav.prev');
    const nextBtn = gallerySection.querySelector('.pl-gallery-nav.next');
    const thumb = gallerySection.querySelector('.pl-gallery-scrollbar-thumb');
    const scrollbar = gallerySection.querySelector('.pl-gallery-scrollbar');
    const filterBtns = gallerySection.querySelectorAll('.gallery-filter-btn');
    const wrapper = gallerySection.querySelector('.pl-gallery-track-wrapper');

    // Lightbox elements
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = lightbox ? lightbox.querySelector('.lightbox__close') : null;
    const lightboxPrev = lightbox ? lightbox.querySelector('.lightbox__prev') : null;
    const lightboxNext = lightbox ? lightbox.querySelector('.lightbox__next') : null;
    const lightboxCounter = lightbox ? lightbox.querySelector('.lightbox__counter') : null;

    let galleryIndex = 0;
    let activeFilter = 'all';
    let visibleSlides = allSlides;

    function getItemsPerScreen() {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 768) return 2;
      return 1;
    }

    function getMaxIndex() {
      return Math.max(0, visibleSlides.length - getItemsPerScreen());
    }

    function updateGallery() {
      const itemsPerScreen = getItemsPerScreen();
      const maxIndex = getMaxIndex();

      if (galleryIndex > maxIndex) galleryIndex = maxIndex;
      if (galleryIndex < 0) galleryIndex = 0;

      const slideWidthPercent = 100 / itemsPerScreen;
      galleryTrack.style.transform = `translateX(-${galleryIndex * slideWidthPercent}%)`;

      if (thumb) {
        const thumbWidthPercent = (1 / (maxIndex + 1)) * 100;
        thumb.style.width = `${thumbWidthPercent}%`;
        thumb.style.transform = `translateX(${galleryIndex * 100}%)`;
      }

      if (prevBtn) prevBtn.style.opacity = galleryIndex === 0 ? '0.35' : '1';
      if (nextBtn) nextBtn.style.opacity = galleryIndex === maxIndex ? '0.35' : '1';
    }

    function filterGallery(filter) {
      activeFilter = filter;
      galleryIndex = 0;

      allSlides.forEach(slide => {
        const cat = slide.dataset.category;
        if (filter === 'all' || cat === filter) {
          slide.classList.remove('is-hidden');
        } else {
          slide.classList.add('is-hidden');
        }
      });

      visibleSlides = allSlides.filter(s => !s.classList.contains('is-hidden'));
      updateGallery();
    }

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        filterGallery(btn.dataset.filter);
      });
    });

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (galleryIndex > 0) {
          galleryIndex--;
          updateGallery();
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (galleryIndex < getMaxIndex()) {
          galleryIndex++;
          updateGallery();
        }
      });
    }

    // Drag / Swipe Support
    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    let wasDragged = false;

    allSlides.forEach(slide => {
      const img = slide.querySelector('img');
      if (img) img.addEventListener('dragstart', (e) => e.preventDefault());
    });

    function dragStart(e) {
      isDragging = true;
      wasDragged = false;
      startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      galleryTrack.style.transition = 'none';
    }

    function dragMove(e) {
      if (!isDragging) return;
      currentX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      const diffX = currentX - startX;
      if (Math.abs(diffX) > 8) wasDragged = true;
    }

    function dragEnd() {
      if (!isDragging) return;
      isDragging = false;
      galleryTrack.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      const diffX = currentX - startX;
      if (diffX < -50 && galleryIndex < getMaxIndex()) {
        galleryIndex++;
      } else if (diffX > 50 && galleryIndex > 0) {
        galleryIndex--;
      }
      updateGallery();
    }

    if (wrapper) {
      wrapper.addEventListener('touchstart', dragStart, { passive: true });
      wrapper.addEventListener('touchmove', dragMove, { passive: true });
      wrapper.addEventListener('touchend', dragEnd);
      wrapper.addEventListener('mousedown', dragStart);
      window.addEventListener('mousemove', dragMove);
      window.addEventListener('mouseup', dragEnd);
    }

    // Scrollbar click
    if (scrollbar) {
      scrollbar.addEventListener('click', (e) => {
        const rect = scrollbar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const ratio = Math.max(0, Math.min(1, clickX / rect.width));
        galleryIndex = Math.round(ratio * getMaxIndex());
        updateGallery();
      });
    }

    // Lightbox Logic
    let currentLightboxImages = [];
    let currentLightboxIndex = 0;

    function updateLightbox() {
      if (!lightbox || !lightboxImg) return;
      const item = currentLightboxImages[currentLightboxIndex];
      if (!item) return;

      lightboxImg.src = item.src;
      lightboxImg.alt = item.alt || '';
      if (lightboxCaption) {
        lightboxCaption.textContent = item.caption || '';
        lightboxCaption.style.display = item.caption ? 'block' : 'none';
      }
      if (lightboxCounter) {
        lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${currentLightboxImages.length}`;
      }
    }

    function openLightbox(index) {
      currentLightboxImages = visibleSlides.map(slide => {
        const img = slide.querySelector('.pl-gallery-img');
        const cap = slide.querySelector('.pl-gallery-caption');
        return {
          src: img.src,
          alt: img.alt,
          caption: cap ? cap.textContent.trim() : ''
        };
      });
      currentLightboxIndex = index;
      updateLightbox();
      document.body.classList.add('lightbox-open');
    }

    function closeLightbox() {
      document.body.classList.remove('lightbox-open');
    }

    function navigateLightbox(step) {
      if (!currentLightboxImages.length) return;
      currentLightboxIndex = (currentLightboxIndex + step + currentLightboxImages.length) % currentLightboxImages.length;
      updateLightbox();
    }

    allSlides.forEach(slide => {
      const img = slide.querySelector('.pl-gallery-img');
      if (img) {
        img.addEventListener('click', () => {
          if (wasDragged) return;
          const idx = visibleSlides.indexOf(slide);
          if (idx !== -1) openLightbox(idx);
        });
      }
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateLightbox(-1);
    });
    if (lightboxNext) lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateLightbox(1);
    });
    if (lightbox) {
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
      });
    }

    window.addEventListener('keydown', (e) => {
      if (!document.body.classList.contains('lightbox-open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
    });

    window.addEventListener('resize', () => {
      updateGallery();
    });

    updateGallery();
  }

})();
