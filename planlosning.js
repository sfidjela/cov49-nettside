/* ========================================================
   PLANLØSNING PAGE – Interactions
   ======================================================== */

(function () {
  'use strict';

  // ══════════════════════════════════════════════════════════
  // ROM-DATA
  // Bilde-felt: sett filbane når bilder er klare.
  // Tomme bilde-felt viser "Bilde kommer snart"-placeholder.
  // ══════════════════════════════════════════════════════════
  const roomData = {
    // ── ENEBOLIG – Hovedetasje ──
    'ene-stue': {
      name: 'Stue',
      area: 'ca. 35 m²',
      image: '', // Legg til bilde her når klart, f.eks: 'images/rom/ene-stue.jpg'
      desc: 'Stor, lys stue med herdet eikegulv og store vindusflater. Rommet gir god plass til salong, spiseplass og TV-sone – med direkte utgang til terrasse.'
    },
    'ene-kjokken': {
      name: 'Kjøkken',
      area: 'ca. 14 m²',
      image: '',
      desc: 'Romslig kjøkken med plass til øy-løsning. Leveres med kjøkken inkludert i prisen (verdi 150 000 kr). Tapwell armaturer og integrerte hvitevarer.'
    },
    'ene-entre': {
      name: 'Entré',
      area: 'ca. 8 m²',
      image: '',
      desc: 'Innbydende entré med garderobeplass og varmekabler i gulv. Listefri overgang mellom vegg og himling gir et rent, moderne uttrykk.'
    },
    'ene-bad-hoved': {
      name: 'Bad',
      area: 'ca. 7 m²',
      image: '',
      desc: 'Moderne bad med vegghengt WC, kromaturer og dimbart speil med innebygget lys. Flis 60×60 på gulv og vegger. Varmekabler og Plejd dimbare downlights.'
    },
    'ene-garderobe': {
      name: 'Garderobe',
      area: 'ca. 5 m²',
      image: '',
      desc: 'Romslig walk-in garderobe i tilknytning til soverom eller entré. Varmekabler i gulv.'
    },
    'ene-terrasse': {
      name: 'Terrasse',
      area: 'ca. 18 m²',
      image: '',
      desc: 'Privat terrasse med gode solforhold. Forberedt for utemøbler og stemningsfull utebelysning. Direkte adkomst fra stue.'
    },

    // ── ENEBOLIG – Underetasje ──
    'ene-sov1': {
      name: 'Soverom 1',
      area: 'ca. 12 m²',
      image: '',
      desc: 'Romslig hovedsoverom med god plass til dobbeltseng og nattbord. Herdet eikegulv og lysinnslipp fra store vinduer.'
    },
    'ene-sov2': {
      name: 'Soverom 2',
      area: 'ca. 10 m²',
      image: '',
      desc: 'Godt soverom med plass til dobbeltseng. Herdet eikegulv og Plejd trådløs lysstyring.'
    },
    'ene-sov3': {
      name: 'Soverom 3',
      area: 'ca. 9 m²',
      image: '',
      desc: 'Fleksibelt rom som kan brukes som soverom, barnerom eller kontor. Herdet eikegulv.'
    },
    'ene-sov4': {
      name: 'Soverom 4',
      area: 'ca. 8 m²',
      image: '',
      desc: 'Ekstra soverom eller hybel – ideelt som gjesterom, tenåringsrom eller hjemmekontor.'
    },
    'ene-bad-under': {
      name: 'Bad',
      area: 'ca. 6 m²',
      image: '',
      desc: 'Bad i underetasje med vegghengt WC, dusj og kromaturer. Flis 60×60 og varmekabler i gulv.'
    },
    'ene-vaskerom': {
      name: 'Vaskerom',
      area: 'ca. 5 m²',
      image: '',
      desc: 'Praktisk vaskerom med opplegg for vaskemaskin og tørketrommel. Varmekabler i gulv.'
    },
    'ene-bod': {
      name: 'Bod',
      area: 'ca. 6 m²',
      image: '',
      desc: 'God lagringsplass i underetasjen.'
    },

    // ── TOMANNSBOLIG – 1. etasje ──
    'tom-stue': {
      name: 'Stue',
      area: 'ca. 25 m²',
      image: '',
      desc: 'Åpen stue med herdet eikegulv og lyse flater. Gode romproportjoner med plass til salong og spisebord.'
    },
    'tom-kjokken': {
      name: 'Kjøkken',
      area: 'ca. 10 m²',
      image: '',
      desc: 'Kjøkken med moderne innredning inkludert i prisen (verdi 150 000 kr). Tapwell armaturer og integrerte hvitevarer.'
    },
    'tom-entre': {
      name: 'Entré',
      area: 'ca. 6 m²',
      image: '',
      desc: 'Inngangsparti med garderobeplass og varmekabler. Listefri design.'
    },
    'tom-bad1': {
      name: 'Bad',
      area: 'ca. 5 m²',
      image: '',
      desc: 'Moderne bad med vegghengt WC, kromaturer og dimbart speil. Flis 60×60 og varmekabler.'
    },

    // ── TOMANNSBOLIG – 2. etasje ──
    'tom-sov1': {
      name: 'Hovedsoverom',
      area: 'ca. 14 m²',
      image: '',
      desc: 'Romslig hovedsoverom med god takhøyde og plass til dobbeltseng. Herdet eikegulv.'
    },
    'tom-sov2': {
      name: 'Soverom 2',
      area: 'ca. 10 m²',
      image: '',
      desc: 'Godt soverom med herdet eikegulv og Plejd lysstyring.'
    },
    'tom-sov3': {
      name: 'Soverom 3',
      area: 'ca. 8 m²',
      image: '',
      desc: 'Fleksibelt rom for barn, gjester eller hjemmekontor.'
    },
    'tom-bad2': {
      name: 'Bad',
      area: 'ca. 5 m²',
      image: '',
      desc: 'Bad i 2. etasje med dusj, vegghengt WC og kromaturer. Varmekabler og dimbare downlights.'
    },

    // ── TOMANNSBOLIG – Underetasje ──
    'tom-bod': {
      name: 'Bod',
      area: 'ca. 8 m²',
      image: '',
      desc: 'Stor bod for lagring av sesongbetonede ting, sportsutstyr og annet.'
    },
    'tom-vaskerom': {
      name: 'Vaskerom',
      area: 'ca. 5 m²',
      image: '',
      desc: 'Vaskerom med opplegg for vaskemaskin og tørketrommel. Varmekabler i gulv.'
    },
    'tom-teknisk': {
      name: 'Teknisk rom',
      area: 'ca. 4 m²',
      image: '',
      desc: 'Teknisk rom med balansert ventilasjonsanlegg og tilkoblinger.'
    }
  };

  // ══════════════════════════════════════════════════════════
  // DOM References
  // ══════════════════════════════════════════════════════════
  const roomDisplay = document.getElementById('roomDisplay');
  const roomPlaceholder = document.getElementById('roomPlaceholder');
  const roomContent = document.getElementById('roomContent');
  const roomImg = document.getElementById('roomImg');
  const roomNoImage = document.getElementById('roomNoImage');
  const roomName = document.getElementById('roomName');
  const roomArea = document.getElementById('roomArea');
  const roomDesc = document.getElementById('roomDesc');

  // ══════════════════════════════════════════════════════════
  // Bolig selector (Enebolig / Tomannsbolig)
  // ══════════════════════════════════════════════════════════
  const boligBtns = document.querySelectorAll('.pl-bolig-btn');
  const boligGroups = document.querySelectorAll('.pl-bolig-group');

  boligBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const bolig = btn.dataset.bolig;

      // Update tabs
      boligBtns.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      // Show correct group
      boligGroups.forEach((g) => g.classList.remove('is-active'));
      const target = document.getElementById('grp-' + bolig);
      if (target) target.classList.add('is-active');

      // Reset room display
      resetRoomDisplay();

      // Reset room button active states
      document.querySelectorAll('.pl-room-btn').forEach((rb) => rb.classList.remove('is-active'));
    });
  });

  // ══════════════════════════════════════════════════════════
  // Etasje tabs (floor switching)
  // ══════════════════════════════════════════════════════════
  document.querySelectorAll('.pl-etasje-tabs').forEach((tabGroup) => {
    tabGroup.addEventListener('click', (e) => {
      const tab = e.target.closest('.pl-etasje-tab');
      if (!tab) return;

      const floor = tab.dataset.floor;
      const group = tab.closest('.pl-bolig-group');

      // Update tabs
      group.querySelectorAll('.pl-etasje-tab').forEach((t) => t.classList.remove('is-active'));
      tab.classList.add('is-active');

      // Get current variant
      const variantBtn = group.querySelector('.pl-variant-btn.is-active');
      const variant = variantBtn ? variantBtn.dataset.variant : 'planlagt';

      // Update floor plan image
      updateFloorPlan(group, floor, variant);

      // Update room grid
      updateRoomGrid(group, floor);

      // Reset room display
      resetRoomDisplay();
      document.querySelectorAll('.pl-room-btn').forEach((rb) => rb.classList.remove('is-active'));
    });
  });

  // ══════════════════════════════════════════════════════════
  // Variant toggle (planlagt / alternativ)
  // ══════════════════════════════════════════════════════════
  document.querySelectorAll('.pl-variant-toggle').forEach((toggle) => {
    toggle.addEventListener('click', (e) => {
      const btn = e.target.closest('.pl-variant-btn');
      if (!btn) return;

      const variant = btn.dataset.variant;
      const group = btn.closest('.pl-bolig-group');

      // Update toggle
      toggle.querySelectorAll('.pl-variant-btn').forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      // Get current floor
      const floorTab = group.querySelector('.pl-etasje-tab.is-active');
      const floor = floorTab ? floorTab.dataset.floor : '';

      // Update floor plan image
      updateFloorPlan(group, floor, variant);
    });
  });

  function updateFloorPlan(group, floor, variant) {
    // Hide all floor plan images in this group
    group.querySelectorAll('.pl-floorplan__img').forEach((img) => img.classList.remove('is-active'));

    // Show the matching one
    const targetId = 'fp-' + floor + '-' + variant;
    const target = document.getElementById(targetId);
    if (target) {
      target.classList.add('is-active');
    } else {
      // Fallback: try planlagt
      const fallback = document.getElementById('fp-' + floor + '-planlagt');
      if (fallback) fallback.classList.add('is-active');
    }
  }

  function updateRoomGrid(group, floor) {
    // Hide all room grids in this group
    group.querySelectorAll('.pl-room-grid').forEach((g) => g.classList.remove('is-active'));

    // Show the matching one
    const targetId = 'rooms-' + floor;
    const target = document.getElementById(targetId);
    if (target) target.classList.add('is-active');
  }

  // ══════════════════════════════════════════════════════════
  // Room button clicks
  // ══════════════════════════════════════════════════════════
  document.querySelectorAll('.pl-room-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const roomId = btn.dataset.room;
      const data = roomData[roomId];
      if (!data) return;

      // Update button states within same grid
      const grid = btn.closest('.pl-room-grid');
      grid.querySelectorAll('.pl-room-btn').forEach((rb) => rb.classList.remove('is-active'));
      btn.classList.add('is-active');

      // Show room content
      showRoom(data);
    });
  });

  function showRoom(data) {
    roomPlaceholder.style.display = 'none';
    roomContent.style.display = 'block';

    // Handle image
    if (data.image) {
      roomImg.src = data.image;
      roomImg.alt = data.name;
      roomImg.style.display = 'block';
      roomNoImage.style.display = 'none';
    } else {
      roomImg.style.display = 'none';
      roomNoImage.style.display = 'flex';
    }

    // Update text
    roomName.textContent = data.name;
    roomArea.textContent = data.area;
    roomDesc.textContent = data.desc;

    // Re-trigger animation
    roomContent.style.animation = 'none';
    void roomContent.offsetHeight; // reflow
    roomContent.style.animation = '';

    // On mobile, scroll to room display
    if (window.innerWidth < 1024) {
      roomDisplay.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function resetRoomDisplay() {
    roomPlaceholder.style.display = 'flex';
    roomContent.style.display = 'none';
    roomImg.src = '';
  }

})();
