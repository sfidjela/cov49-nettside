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
      variantImages: {
        'planlagt': 'images/optimized/Enebolig stue stor ferdig-1280w.jpg',
        'soverom': 'images/optimized/Enebolig stue ferdig-1280w.jpg',
        'tv-stue': ''
      },
      variantDescs: {
        'planlagt': 'Stor, lys stue på 32 m² med en imponerende takhøyde på opptil 4,8 meter, herdet eikegulv og store vindusflater som gir en luftig, åpen romfølelse med mye dagslys. Rommet gir god plass til salong, spiseplass og TV-sone – med direkte utgang til terrasse.',
        'soverom': 'Solfylt og luftig stue på 24 m² med god takhøyde, herdet eikegulv og store vindusflater som fyller rommet med dagslys. Rommet gir god plass til salong og TV-sone – med direkte utgang til terrasse.',
        'tv-stue': 'Her er det mulighet for en ekstra TV-stue. Ta gjerne kontakt med oss for detaljer om denne løsningen.'
      },
      desc: 'Stor, lys stue med god takhøyde, herdet eikegulv og store vindusflater som gir en luftig, åpen romfølelse med mye dagslys. Rommet gir god plass til salong, spiseplass og TV-sone – med direkte utgang til terrasse.'
    },
    'ene-kjokken': {
      name: 'Kjøkken',
      area: 'ca. 40 m²',
      image: 'images/optimized/Enebolig kjøkken påkostet ferdig-1280w.jpg',
      desc: 'Det leveres et flott kjøkken fra Svane kjøkkenet med fronter i eik, en hvit steinbenkeplate og kvalitetshvitevarer fra Siemens og BORA. Kjøkkenet preges av en stor kjøkkenøy og høye skap som når helt opp til taket, tilpasset den imponerende takhøyden på opptil 4,8 meter. Store vindusflater fyller det 39 m² store rommet med dagslys, byr på en nydelig utsikt og gir direkte adkomst til en romslig balkong på 11 m².'
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
      image: 'images/optimized/Enebolig gang ferdig-1280w.jpg',
      desc: 'Det er avsatt plass til en stor walk-in garderobe i tilknytning til den 10 m² store entréen. I entréen finner du også et eget WC. Varmekabler i gulv. Merk at selve garderobeløsningen og innredningen ikke leveres som standard.'
    },
    'ene-terrasse': {
      name: 'Terrasse',
      area: 'ca. 18 m²',
      image: '',
      desc: 'Privat terrasse med gode solforhold. Forberedt for utemøbler og stemningsfull utebelysning. Direkte adkomst fra stue.'
    },

    // ── ENEBOLIG – Underetasje ──
    'ene-sov1': {
      name: 'Hovedsoverom',
      area: 'ca. 19 m²',
      image: 'images/optimized/Enebolig hovedsoverom ferdig-1280w.jpg',
      desc: 'Egen masterfløy på totalt 19 m² bestående av et stort og romslig soverom med direkte tilgang til en romslig walk-in garderobe og et tilhørende, delikat bad utstyrt med dobbel vask og god plass til for eksempel sminkebord (garderobeinnredning medfølger ikke).'
    },
    'ene-tvstue-under': {
      name: 'TV-stue',
      area: 'ca. 12 m²',
      variantNames: {
        'planlagt': 'TV-stue',
        'alternativ': 'Kjellerstue'
      },
      variantImages: {
        'planlagt': 'images/optimized/Enebolig tv-stue liten ferdig-1280w.jpg',
        'alternativ': 'images/optimized/Enebolig tv-stue stor ferdig-1280w.jpg'
      },
      variantDescs: {
        'planlagt': 'En koselig og lun TV-stue i underetasjen, perfekt som en egen TV-avdeling for barn og unge, eller som et stille oppholdsrom. Ved behov kan dette rommet også enkelt gjøres om til et ekstra soverom, eller utvides om man ønsker et større oppholdsrom.',
        'alternativ': 'En utvidet, stor og innbydende kjellerstue med 2,7 meter takhøyde. Kjellerstuen fungerer som et herlig samlingspunkt for familien med direkte utgang til en stor terrasse tilrettelagt for grilling og soling.'
      }
    },
    'ene-hybel': {
      name: 'Hybel',
      area: 'ca. 25 m²',
      variantNames: {
        'planlagt': 'Hybel',
        'alternativ': 'Ungdomsavdeling'
      },
      variantImages: {
        'planlagt': 'images/optimized/Enebolig hybel ferdig-1280w.jpg',
        'alternativ': ''
      },
      variantDescs: {
        'planlagt': 'Separat hybel/utleiedel med eget bad, utgang til platting og en smart hems med ca. 1,9 meter takhøyde. Hybelen byr på over 4 meter under taket, noe som gir en luftig atmosfære og god plassutnyttelse.',
        'alternativ': 'En ekstra ungdomsavdeling eller soverom på 16,7 m² med en koselig hems. Rommet har over 4 meter takhøyde, ca. 1,9 meter på hemsen, og direkte utgang til en hyggelig, utvendig platting.'
      }
    },

    // ── TOMANNSBOLIG – 1. etasje ──
    'tom-stue': {
      name: 'Stue',
      area: 'ca. 25 m²',
      image: 'images/Ferdige illustrasjoner/Tomannsbolig stue ferdig.jpg',
      desc: 'Åpen og sosial stueløsning med herdet tregulv i naturlig eik og listefrie detaljer. Store vindusflater gir rikelig med naturlig lys, og den gjennomtenkte rominndelingen gjør stuen svært enkel å møblere på en naturlig måte. Her er det god plass til både salong, spisebord og hyggelige sammenkomster med direkte utgang til uteplassen. Merk at peisen på illustrasjonen ikke leveres som standard, men tilbys som et tilvalg.'
    },
    'tom-kjokken': {
      name: 'Kjøkken',
      area: 'ca. 10 m²',
      image: 'images/Ferdige illustrasjoner/Tomannsbolig kjøkken ferdig.jpg',
      desc: 'Kjøkkenet er prosjektert med et eksklusivt preg, utstyrt med praktiske høyskap og en flott kjøkkenøy. Innredningen leveres med en kombinasjon av eikefronter og malte slette overflater som gir et moderne uttrykk. Det leveres med en nydelig hvit steinbenkeplate og integrerte kvalitetshvitevarer. Store vindusflater slipper inn rikelig med dagslys og byr på en flott utsikt.'
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
      image: 'images/Ferdige illustrasjoner/Tomannsbolig soverom ferdig.jpg',
      desc: 'Romslig hovedsoverom med god takhøyde, mye garderobe- og skapplass, og plass til dobbeltseng. Herdet eikegulv.'
    },
    'tom-loftstue': {
      name: 'Loftstue',
      area: 'ca. 12 m²',
      image: 'images/Ferdige illustrasjoner/Tomannsbolig loftstue ferdig.jpg',
      desc: 'Denne illustrasjonen viser en løsning der det ene soverommet er gjort om til en loftstue, noe som gir et lyst og åpent oppholdsrom med en nydelig utsikt. Dette viser boligens fleksibilitet og hvordan planløsningen enkelt kan tilpasses kjøperens egne behov og ønsker.'
    },
    'tom-bad2': {
      name: 'Familiebad',
      area: 'ca. 7 m²',
      image: 'images/Ferdige illustrasjoner/Familiebad tomannsbolig ferdig.jpg',
      desc: 'I andre etasje leveres det et delikat og romslig familiebad med flotte 60x60 fliser. Badet har dobbel servant og en egen våtsone med en enkeltdusj, her illustrert med badekar som tilvalg. Toalettområdet kan enkelt skjermes med en stilig, sotet glassdør. I tillegg er det et separat, praktisk vaskerom plassert rett ved siden av badet.'
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

  const floorplanDescs = {
    // Enebolig Hovedetasje
    'ene-hoved-planlagt': 'Denne planløsningen byr på en storslått, åpen løsning skreddersydd for en sosial og luftig atmosfære. Etasjen preges av generøs takhøyde, nydelig utsikt og optimale solforhold. Her er det direkte utgang til både en romslig balkong og en solrik terrasse. En elegant trapp ned fra entréen separerer inngangsnivået fra stue- og kjøkkensonen på en naturlig og innbydende måte.',
    'ene-hoved-soverom': 'Denne løsningen er optimalisert for en fleksibel familiehverdag, med mulighet for et ekstra soverom eller hjemmekontor i tilknytning til entréen. Det er direkte utgang til en romslig balkong og en solrik terrasse. En elegant trapp ned fra entréen leder til de åpne oppholdsrommene. Velger du denne løsningen, kan en koselig TV-stue enkelt etableres i underetasjen for ytterligere boltreplass.',
    'ene-hoved-tv-stue': 'Denne varianten gir mulighet til å lukke inn deler av stuen for å skape et lunt bibliotek eller en skjermet TV-avdeling for barna, uten at det går på bekostning av den sosiale flyten. Det er direkte utgang til en romslig balkong og en solrik terrasse. Den elegante trappen ned fra entréen skaper et naturlig og stilig skille mellom inngangssonen og de luftige stue- og kjøkkenområdene.',
    
    // Enebolig Underetasje
    'ene-under-planlagt': 'Denne planløsningen er optimalisert for en velfungerende familiehverdag. Barneavdelingen har to soverom, en koselig TV-stue og eget bad, i tillegg til et praktisk, separat vaskerom/teknisk rom som forenkler logistikken. Foreldrene kan trekke seg tilbake til en romslig masterfløy med eget bad og rikelig med skapplass. Fra kjellerstuen er det direkte utgang til en stor terrasse tilrettelagt for grilling og soling, med trapp opp til første etasje. Boligen har også en separat hybel med eget bad, utgang til platting og en smart hems med ca. 1,9 meter takhøyde. Planløsningen byr på stor fleksibilitet; ved behov kan TV-stuen enkelt gjøres om til et ekstra soverom, eller utvides om man ønsker et større oppholdsrom. Takhøyden i underetasjen er ca. 2,7 meter, mens hybelen byr på over 4 meter under taket. Himlingen vil være nedsenket i enkelte rom, som bad og teknisk rom.',
    'ene-under-alternativ': 'Denne alternative planløsningen er skreddersydd for en aktiv og fleksibel familiehverdag med fokus på gode, felles sosiale soner. Den sentrale stuen er utvidet til en romslig kjellerstue, og den tidligere hybelen er omgjort til en ekstra ungdomsavdeling/soverom med en smart hems. Også i denne løsningen har foreldrene en privat masterfløy med eget bad og rikelig med skapplass, mens barna har eget bad og et praktisk vaskerom/teknisk rom som forenkler logistikken. Fra den utvidede kjellerstuen er det direkte utgang til den store terrassen tilrettelagt for grilling og soling, og ungdomsavdelingen har utgang til en egen, skjermet platting. Takhøyden i etasjen er ca. 2,7 meter, mens ungdomsavdelingen byr på over 4 meter under taket, med ca. 1,9 meter takhøyde på hemsen. Himlingen vil være nedsenket i enkelte rom, som bad og teknisk rom.',
    
    // Tomannsbolig
    'tom-1-planlagt': 'Første etasje i tomannsboligen byr på en lys og innbydende entré med romslig garderobeplass og et praktisk, separat toalett. Videre har etasjen en åpen og luftig stue- og kjøkkenløsning med et stort spisestueområde. Store vindusflater med lysinnslipp fra tre sider sikrer rikelig med dagslys gjennom hele dagen. Fra oppholdsrommet er det utgang til en koselig balkong på den ene siden, og en terrasse på den andre med god plass til et utekjøkken samt mulighet for å etablere en spisegruppe under en pergola. Uteplassene på begge sider gjør at man har mulighet til å finne en solfylt plass til ulike tider av dagen.',
    'tom-2-planlagt': 'Andre etasje utgjør boligenes soveavdeling, som leveres med en gjennomtenkt planløsning bestående av et hovedsoverom og inntil tre barnerom. Det er lagt til rette for god skapplass på alle soverom. Alternativt kan det ene soverommet omgjøres til en luftig loftstue som byr på en nydelig utsikt. Etasjen inneholder også et separat vaskerom og et romslig familiebad med dobbel servant, egen våtsone, og en praktisk mulighet for å skjerme/stenge av toalettet.',
    'tom-under-planlagt': 'Ned trappen finner vi gode oppbevaringsmuligheter i det romslige tekniske rommet/boden, samt under trappen. Videre er det både et separat bad og en kjellerstue/soverom med egen utgang til hagen. I tillegg er det en stor og romslig kjellerstue som har separat bad, egen inngang fra gårdsplassen, samt utgang til hagen. I denne delen kan det etableres en utleiedel. Det er med andre ord stor fleksibilitet i bruken av underetasjen, som man kan tilpasse etter egne behov og ønsker.'
  };

  // ══════════════════════════════════════════════════════════
  // DOM References
  // ══════════════════════════════════════════════════════════
  const roomDisplay = document.getElementById('roomDisplay');
  const roomPlaceholder = document.getElementById('roomPlaceholder');
  const roomContent = document.getElementById('roomContent');
  const roomImagesList = document.getElementById('roomImagesList');
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

      // Update room grid based on current floor of the active group
      if (target) {
        const activeTab = target.querySelector('.pl-etasje-tab.is-active');
        if (activeTab) {
          const floor = activeTab.dataset.floor;
          // Hide all variant toggles first
          target.querySelectorAll('.pl-variant-toggle').forEach((vt) => {
            vt.style.display = 'none';
            vt.classList.remove('is-active');
          });
          // Show the one matching this floor
          const targetVt = document.getElementById('vt-' + floor);
          if (targetVt) {
            targetVt.style.display = 'flex';
            targetVt.classList.add('is-active');
          }
          
          const activeVt = target.querySelector('.pl-variant-toggle.is-active');
          const variantBtn = activeVt ? activeVt.querySelector('.pl-variant-btn.is-active') : null;
          const variant = variantBtn ? variantBtn.dataset.variant : 'planlagt';
          updateFloorPlan(target, floor, variant);

          updateRoomGrid(target, floor);

          // Select default room for the new active floor/grid
          const activeGrid = document.querySelector('.pl-room-grid.is-active');
          updateDisplayColumnVisibility(activeGrid);
        }
      }

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

      // Hide all variant toggles in this group first
      group.querySelectorAll('.pl-variant-toggle').forEach((vt) => {
        vt.style.display = 'none';
        vt.classList.remove('is-active');
      });
      // Show the one matching this floor
      const targetVt = document.getElementById('vt-' + floor);
      if (targetVt) {
        targetVt.style.display = 'flex';
        targetVt.classList.add('is-active');
      }

      // Get current variant from the active toggle
      const activeVt = group.querySelector('.pl-variant-toggle.is-active');
      const variantBtn = activeVt ? activeVt.querySelector('.pl-variant-btn.is-active') : null;
      const variant = variantBtn ? variantBtn.dataset.variant : 'planlagt';

      // Update floor plan image
      updateFloorPlan(group, floor, variant);

      // Update room grid
      updateRoomGrid(group, floor);

      // Update room visibility
      updateRoomVisibility(group, floor, variant);

      // Auto-select the first visible room in the active grid of this floor
      const activeGrid = document.querySelector('.pl-room-grid.is-active');
      updateDisplayColumnVisibility(activeGrid);
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

      // Update room visibility
      updateRoomVisibility(group, floor, variant);

      // Update active room illustration if one is currently selected
      const activeRoomBtn = document.querySelector('.pl-room-grid.is-active .pl-room-btn.is-active');
      if (activeRoomBtn) {
        const roomId = activeRoomBtn.dataset.room;
        const data = roomData[roomId];
        if (data) {
          showRoom(data);
        }
      }
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

    // Update floor plan description text box
    const descBox = group.querySelector('.pl-floorplan-desc');
    if (descBox) {
      const descKey = floor + '-' + variant;
      const descText = floorplanDescs[descKey] || floorplanDescs[floor + '-planlagt'] || '';
      
      if (descText) {
        descBox.innerHTML = `
          <span class="pl-floorplan-desc__title">Enkel beskrivelse av planløsningen</span>
          <p class="pl-floorplan-desc__text">${descText}</p>
        `;
        descBox.style.display = 'block';
        
        // Re-trigger animation
        descBox.style.animation = 'none';
        void descBox.offsetHeight; // reflow
        descBox.style.animation = '';
      } else {
        descBox.style.display = 'none';
      }
    }
  }

  function updateRoomVisibility(group, floor, variant) {
    // Only affect Enebolig Hovedetasje ('ene-hoved')
    const stueBtn = document.querySelector('.pl-room-btn[data-room="ene-stue"]');
    if (stueBtn) {
      if (floor === 'ene-hoved' && variant === 'tv-stue') {
        // Hide Stue button
        stueBtn.style.display = 'none';
        // If Stue was active, shift activation to Kjøkken
        if (stueBtn.classList.contains('is-active')) {
          stueBtn.classList.remove('is-active');
          const nextBtn = document.querySelector('.pl-room-btn[data-room="ene-kjokken"]');
          if (nextBtn) {
            nextBtn.click();
          }
        }
      } else {
        // Show Stue button
        stueBtn.style.display = 'flex';
      }
    }

    // Dynamic button names and visibility for Enebolig Underetasje ('ene-under')
    if (floor === 'ene-under') {
      const tvstueBtnSpan = document.querySelector('.pl-room-btn[data-room="ene-tvstue-under"] .pl-room-btn__name');
      const hybelBtn = document.querySelector('.pl-room-btn[data-room="ene-hybel"]');
      const hybelBtnSpan = hybelBtn ? hybelBtn.querySelector('.pl-room-btn__name') : null;
      
      if (tvstueBtnSpan) {
        tvstueBtnSpan.textContent = (variant === 'alternativ') ? 'Kjellerstue' : 'TV-stue';
      }
      
      if (hybelBtn) {
        if (variant === 'alternativ') {
          // Hide button completely
          hybelBtn.style.display = 'none';
          // Shift activation to Hovedsoverom if it was active
          if (hybelBtn.classList.contains('is-active')) {
            hybelBtn.classList.remove('is-active');
            const masterBtn = document.querySelector('.pl-room-btn[data-room="ene-sov1"]');
            if (masterBtn) {
              masterBtn.click();
            }
          }
        } else {
          // Show button
          hybelBtn.style.display = 'flex';
          if (hybelBtnSpan) {
            hybelBtnSpan.textContent = 'Hybel';
          }
        }
      }
    }
  }

  function updateRoomGrid(group, floor) {
    // Hide all room grids globally
    document.querySelectorAll('.pl-room-grid').forEach((g) => g.classList.remove('is-active'));

    // Show the matching one
    const targetId = 'rooms-' + floor;
    const target = document.getElementById(targetId);
    if (target) target.classList.add('is-active');
  }

  function updateDisplayColumnVisibility(activeGrid) {
    const displayColumn = document.querySelector('.pl-display-column');
    if (!displayColumn) return;
    
    if (activeGrid) {
      const visibleBtns = Array.from(activeGrid.querySelectorAll('.pl-room-btn')).filter(btn => btn.style.display !== 'none');
      if (visibleBtns.length > 0) {
        displayColumn.style.display = '';
        visibleBtns[0].click();
      } else {
        displayColumn.style.display = 'none';
      }
    } else {
      displayColumn.style.display = 'none';
    }
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

  function getActiveVariant() {
    const activeGroup = document.querySelector('.pl-bolig-group.is-active');
    if (!activeGroup) return 'planlagt';
    const activeVt = activeGroup.querySelector('.pl-variant-toggle.is-active');
    const variantBtn = activeVt ? activeVt.querySelector('.pl-variant-btn.is-active') : null;
    return variantBtn ? variantBtn.dataset.variant : 'planlagt';
  }

  function showRoom(data) {
    roomPlaceholder.style.display = 'none';
    roomContent.style.display = 'block';

    roomImagesList.innerHTML = '';

    let imgs = [];
    if (data.variantImages) {
      const variant = getActiveVariant();
      const variantImg = data.variantImages[variant];
      imgs = variantImg ? [variantImg] : [];
    } else {
      imgs = data.images || (data.image ? [data.image] : []);
    }

    if (imgs.length > 0) {
      imgs.forEach((imgSrc, idx) => {
        const wrap = document.createElement('div');
        wrap.className = 'pl-room-display__image-wrap';
        
        const img = document.createElement('img');
        img.className = 'pl-room-display__img';
        img.src = imgSrc;
        img.alt = data.name;
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
          const lightboxImages = imgs.map(src => ({ src, alt: data.name }));
          openLightbox(lightboxImages, idx);
        });
        
        wrap.appendChild(img);
        roomImagesList.appendChild(wrap);
      });
    } else {
      const wrap = document.createElement('div');
      wrap.className = 'pl-room-display__image-wrap';
      
      const noImg = document.createElement('div');
      noImg.className = 'pl-room-display__no-image';
      noImg.innerHTML = `
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1" width="48" height="48">
            <rect x="6" y="10" width="36" height="28" rx="2" />
            <path d="M6 30l10-8 8 6 8-10 10 12" />
            <circle cx="32" cy="18" r="3" />
        </svg>
        <p>Bilde kommer snart</p>
      `;
      wrap.appendChild(noImg);
      roomImagesList.appendChild(wrap);
    }

    // Update text
    let nameText = data.name;
    if (data.variantNames) {
      const variant = getActiveVariant();
      nameText = data.variantNames[variant] || data.name;
    }
    roomName.textContent = nameText;
    
    let descText = data.desc;
    if (data.variantDescs) {
      const variant = getActiveVariant();
      descText = data.variantDescs[variant] || data.desc;
    }
    roomDesc.textContent = descText;

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
    if (roomImagesList) roomImagesList.innerHTML = '';
  }

  // ══════════════════════════════════════════════════════════
  // LIGHTBOX (forstørret bilde)
  // ══════════════════════════════════════════════════════════
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.querySelector('.lightbox__close');
  const lightboxPrev = document.querySelector('.lightbox__prev');
  const lightboxNext = document.querySelector('.lightbox__next');
  const lightboxCounter = document.querySelector('.lightbox__counter');

  let currentImages = [];
  let currentIndex = 0;

  function updateLightbox() {
    if (!currentImages.length) return;
    const data = currentImages[currentIndex];
    lightboxImg.src = data.src;
    lightboxImg.alt = data.alt || '';

    if (lightboxCaption) {
      lightboxCaption.textContent = data.caption || '';
      lightboxCaption.style.display = data.caption ? 'block' : 'none';
    }

    if (lightboxCounter) {
      lightboxCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
    }

    const showNav = currentImages.length > 1;
    if (lightboxPrev) lightboxPrev.style.display = showNav ? 'block' : 'none';
    if (lightboxNext) lightboxNext.style.display = showNav ? 'block' : 'none';
    if (lightboxCounter) lightboxCounter.style.display = showNav ? 'block' : 'none';
  }

  function openLightbox(images, index) {
    currentImages = images;
    currentIndex = index;
    updateLightbox();
    document.body.classList.add('lightbox-open');
  }

  function closeLightbox() {
    document.body.classList.remove('lightbox-open');
    setTimeout(() => {
      lightboxImg.src = '';
    }, 300);
  }

  function navigateLightbox(step) {
    currentIndex = (currentIndex + step + currentImages.length) % currentImages.length;
    updateLightbox();
  }

  // Bind to floor plans
  document.querySelectorAll('.pl-floorplan').forEach((container) => {
    const images = Array.from(container.querySelectorAll('.pl-floorplan__img img')).map(img => ({
      src: img.src,
      alt: img.alt
    }));

    container.querySelectorAll('.pl-floorplan__img').forEach((pic, index) => {
      // Find index of this image in the filtered list (active variant)
      // Actually, let's just allow navigating through ALL variants in the current floor?
      // Or just the active one? The user request implies navigating "between floor plans".
      // Usually signifies all floors for that house.

      pic.addEventListener('click', () => {
        // Collect all images in this house type (Enebolig or Tomannsbolig)
        const houseGroup = pic.closest('.pl-bolig-group');
        const houseImages = Array.from(houseGroup.querySelectorAll('.pl-floorplan__img img')).map(img => ({
          src: img.src,
          alt: img.alt
        }));
        const imgIndex = houseImages.findIndex(i => i.src === pic.querySelector('img').src);

        openLightbox(houseImages, imgIndex >= 0 ? imgIndex : 0);
      });
    });
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

  if (lightbox) lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!document.body.classList.contains('lightbox-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });

  // ══════════════════════════════════════════════════════════
  // ENEBOLIG GALLERY CAROUSEL
  // ══════════════════════════════════════════════════════════
  const galleryTrack = document.querySelector('.pl-gallery-track');
  if (galleryTrack) {
    const slides = Array.from(galleryTrack.querySelectorAll('.pl-gallery-slide'));
    const prevBtn = document.querySelector('.pl-gallery-nav.prev');
    const nextBtn = document.querySelector('.pl-gallery-nav.next');
    const thumb = document.querySelector('.pl-gallery-scrollbar-thumb');
    
    let galleryIndex = 0;

    function getItemsPerScreen() {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 768) return 2;
      return 1;
    }

    function getMaxIndex() {
      return Math.max(0, slides.length - getItemsPerScreen());
    }

    function updateGallery() {
      const itemsPerScreen = getItemsPerScreen();
      const maxIndex = getMaxIndex();
      
      if (galleryIndex > maxIndex) galleryIndex = maxIndex;
      if (galleryIndex < 0) galleryIndex = 0;

      const slideWidthPercent = 100 / itemsPerScreen;
      galleryTrack.style.transform = `translateX(-${galleryIndex * slideWidthPercent}%)`;

      if (thumb && scrollbar) {
        const thumbWidthPercent = (1 / (maxIndex + 1)) * 100;
        thumb.style.width = `${thumbWidthPercent}%`;
        const rect = scrollbar.getBoundingClientRect();
        const thumbWidth = (rect.width * thumbWidthPercent) / 100;
        const availableWidth = Math.max(0, rect.width - thumbWidth);
        const ratio = maxIndex > 0 ? galleryIndex / maxIndex : 0;
        thumb.style.transform = `translateX(${ratio * availableWidth}px)`;
      }

      if (prevBtn) prevBtn.style.opacity = galleryIndex === 0 ? '0.4' : '1';
      if (nextBtn) nextBtn.style.opacity = galleryIndex === maxIndex ? '0.4' : '1';
    }

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
    let startTranslate = 0;
    let wasDragged = false;

    galleryTrack.querySelectorAll('img').forEach(img => {
      img.addEventListener('dragstart', (e) => e.preventDefault());
    });

    const wrapper = document.querySelector('.pl-gallery-track-wrapper');

    function dragStart(e) {
      isDragging = true;
      wasDragged = false;
      startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      galleryTrack.style.transition = 'none';
      
      const width = galleryTrack.offsetWidth;
      const itemsPerScreen = getItemsPerScreen();
      startTranslate = -galleryIndex * (width / itemsPerScreen);
    }

    function dragMove(e) {
      if (!isDragging) return;
      currentX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      const diffX = currentX - startX;
      
      // If moved more than 5px, flag that a drag occurred
      if (Math.abs(diffX) > 5) {
        wasDragged = true;
      }
      
      galleryTrack.style.transform = `translateX(${startTranslate + diffX}px)`;
    }

    function dragEnd() {
      if (!isDragging) return;
      isDragging = false;
      galleryTrack.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      
      const diffX = currentX - startX;
      const width = galleryTrack.offsetWidth;
      const itemsPerScreen = getItemsPerScreen();
      const threshold = (width / itemsPerScreen) * 0.2;

      if (diffX < -threshold && galleryIndex < getMaxIndex()) {
        galleryIndex++;
      } else if (diffX > threshold && galleryIndex > 0) {
        galleryIndex--;
      }
      
      updateGallery();
      
      // Clear wasDragged after a tiny delay so click listener can process it
      setTimeout(() => {
        wasDragged = false;
      }, 50);
    }

    wrapper.addEventListener('touchstart', dragStart, { passive: true });
    wrapper.addEventListener('touchmove', dragMove, { passive: true });
    wrapper.addEventListener('touchend', dragEnd);
    wrapper.addEventListener('mousedown', dragStart);

    window.addEventListener('mousemove', (e) => {
      if (!isDraggingScrollbar) {
        dragMove(e);
      }
    });

    window.addEventListener('mouseup', (e) => {
      if (!isDraggingScrollbar) {
        dragEnd();
      }
    });

    // Scrollbar Drag / Click
    let isDraggingScrollbar = false;
    const scrollbar = document.querySelector('.pl-gallery-scrollbar');

    if (scrollbar && thumb) {
      function getScrollbarRatio(clientX) {
        const rect = scrollbar.getBoundingClientRect();
        const thumbWidth = thumb.offsetWidth || ((1 / (getMaxIndex() + 1)) * rect.width);
        const availableWidth = rect.width - thumbWidth;
        if (availableWidth <= 0) return 0;
        const relativeX = clientX - rect.left - (thumbWidth / 2);
        return Math.max(0, Math.min(1, relativeX / availableWidth));
      }

      function handleScrollbarDrag(clientX) {
        const maxIndex = getMaxIndex();
        if (maxIndex <= 0) return;
        const ratio = getScrollbarRatio(clientX);

        const rect = scrollbar.getBoundingClientRect();
        const thumbWidth = thumb.offsetWidth || ((1 / (maxIndex + 1)) * rect.width);
        const availableWidth = Math.max(0, rect.width - thumbWidth);
        const thumbX = ratio * availableWidth;

        const itemsPerScreen = getItemsPerScreen();
        const trackWidth = galleryTrack.offsetWidth;
        const slideWidth = trackWidth / itemsPerScreen;
        const maxTrackTranslate = maxIndex * slideWidth;
        const trackX = ratio * maxTrackTranslate;

        galleryTrack.style.transition = 'none';
        thumb.style.transition = 'none';
        thumb.style.transform = `translateX(${thumbX}px)`;
        galleryTrack.style.transform = `translateX(-${trackX}px)`;

        galleryIndex = Math.round(ratio * maxIndex);
        if (prevBtn) prevBtn.style.opacity = galleryIndex === 0 ? '0.4' : '1';
        if (nextBtn) nextBtn.style.opacity = galleryIndex === maxIndex ? '0.4' : '1';
      }

      function startScrollbarDrag(e) {
        isDraggingScrollbar = true;
        scrollbar.classList.add('is-dragging');
        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        handleScrollbarDrag(clientX);
      }

      function endScrollbarDrag() {
        if (!isDraggingScrollbar) return;
        isDraggingScrollbar = false;
        scrollbar.classList.remove('is-dragging');
        galleryTrack.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        thumb.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        updateGallery();
      }

      scrollbar.addEventListener('mousedown', (e) => {
        e.preventDefault();
        startScrollbarDrag(e);
      });

      scrollbar.addEventListener('touchstart', (e) => {
        startScrollbarDrag(e);
      }, { passive: true });

      window.addEventListener('mousemove', (e) => {
        if (isDraggingScrollbar) {
          e.preventDefault();
          handleScrollbarDrag(e.clientX);
        }
      });

      window.addEventListener('touchmove', (e) => {
        if (isDraggingScrollbar) {
          handleScrollbarDrag(e.touches[0].clientX);
        }
      }, { passive: true });

      window.addEventListener('mouseup', endScrollbarDrag);
      window.addEventListener('touchend', endScrollbarDrag);
      window.addEventListener('touchcancel', endScrollbarDrag);
    }

    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        updateGallery();
      }, 100);
    });

    const galleryImages = slides.map(slide => {
      const img = slide.querySelector('.pl-gallery-img');
      const caption = slide.querySelector('.pl-gallery-caption');
      return {
        src: img.src,
        alt: caption ? caption.textContent.trim() : img.alt,
        caption: caption ? caption.textContent.trim() : ''
      };
    });

    slides.forEach((slide, idx) => {
      const img = slide.querySelector('.pl-gallery-img');
      if (img) {
        img.addEventListener('click', (e) => {
          if (wasDragged) {
            e.preventDefault();
            e.stopPropagation();
            return;
          }
          openLightbox(galleryImages, idx);
        });
      }
    });

    updateGallery();
  }

  // Run default selection on load
  document.querySelectorAll('.pl-bolig-group.is-active').forEach((group) => {
    const floorTab = group.querySelector('.pl-etasje-tab.is-active');
    const floor = floorTab ? floorTab.dataset.floor : '';
    const activeVt = group.querySelector('.pl-variant-toggle.is-active');
    const variantBtn = activeVt ? activeVt.querySelector('.pl-variant-btn.is-active') : null;
    const variant = variantBtn ? variantBtn.dataset.variant : 'planlagt';
    
    updateFloorPlan(group, floor, variant);
    updateRoomVisibility(group, floor, variant);
  });

  const activeGrid = document.querySelector('.pl-room-grid.is-active');
  updateDisplayColumnVisibility(activeGrid);

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

  // ── FAQ Accordion Logic ───────────────────────────────
  const faqItems = document.querySelectorAll('.faq__item');
  faqItems.forEach(item => {
    const summary = item.querySelector('.faq__question');
    if (summary) {
      summary.addEventListener('click', () => {
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
  document.querySelectorAll('a[href="#faq"], [data-open-faq]').forEach((el) => {
    el.addEventListener('click', openFaqModal);
  });
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

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('faq-open')) {
      closeFaqModal();
    }
  });

  // ── Floating CTA Note Logic ────────────────────────
  const floatingNote = document.getElementById('floatingNote');
  const closeNoteBtn = document.getElementById('closeNote');

  if (floatingNote && closeNoteBtn) {
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

    const noteContent = floatingNote.querySelector('.floating-note__content');
    if (noteContent) {
      noteContent.addEventListener('click', (e) => {
        floatingNote.classList.remove('is-visible');
        openProspektModal(e);
      });
    }
  }

  // ── Prospekt / Interessent Modal Logic ───────────────────
  const prospektModal = document.getElementById('prospektModal');
  const prospektModalCloseBtn = document.getElementById('prospektModalCloseBtn');
  const prospektModalCloseBg = document.getElementById('prospektModalCloseBg');

  function openProspektModal(e) {
    if (e) e.preventDefault();
    document.body.classList.add('prospekt-open');
    if (floatingNote) floatingNote.classList.remove('is-visible');
  }

  function closeProspektModal() {
    document.body.classList.remove('prospekt-open');
  }

  document.querySelectorAll('#openProspektBtn, [data-open-prospekt], a[href="#prospekt"]').forEach((el) => {
    el.addEventListener('click', openProspektModal);
  });
  if (prospektModalCloseBtn) prospektModalCloseBtn.addEventListener('click', closeProspektModal);
  if (prospektModalCloseBg) prospektModalCloseBg.addEventListener('click', closeProspektModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('prospekt-open')) {
      closeProspektModal();
    }
  });

  // Modal Form Submission (FormSubmit.co AJAX + Instant Download View)
  window.handleProspektSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const button = form.querySelector('button[type="submit"]');
    const modalContent = form.closest('.prospekt-modal__content');
    const successMsg = modalContent ? modalContent.querySelector('.prospekt-success') : document.getElementById('prospektSuccess');

    const originalText = button.textContent;
    button.disabled = true;
    button.textContent = 'Registrerer...';

    try {
      const formData = new FormData(form);
      const selectedType = formData.get('boligtype') || 'Begge';
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
        form.style.display = 'none';
        if (modalContent) {
          const headerTitle = modalContent.querySelector('#prospektModalTitle');
          const headerSubtitle = modalContent.querySelector('.prospekt-modal__subtitle');
          const headerLabel = modalContent.querySelector('.section-label');
          if (headerLabel) headerLabel.style.display = 'none';
          if (headerTitle) headerTitle.style.display = 'none';
          if (headerSubtitle) headerSubtitle.style.display = 'none';
        }
        if (successMsg) {
          successMsg.style.display = 'flex';
          
          // Reorder or highlight buttons based on selection
          const eneboligBtn = successMsg.querySelector('[data-prospekt="enebolig"]');
          const tomannsA = successMsg.querySelector('[data-prospekt="tomanns-a"]');
          const tomannsB = successMsg.querySelector('[data-prospekt="tomanns-b"]');
          
          if (selectedType === 'Enebolig') {
            if (eneboligBtn) eneboligBtn.classList.remove('secondary');
            if (tomannsA) tomannsA.classList.add('secondary');
            if (tomannsB) tomannsB.classList.add('secondary');
          } else if (selectedType === 'Tomannsbolig') {
            if (eneboligBtn) eneboligBtn.classList.add('secondary');
            if (tomannsA) tomannsA.classList.remove('secondary');
            if (tomannsB) tomannsB.classList.remove('secondary');
          }
        }

        if (window.trackMetaLead) {
          window.trackMetaLead(selectedType);
        }
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      alert('Det oppsto en feil ved registrering. Vennligst prøv igjen eller ring megler direkte.');
      button.disabled = false;
      button.textContent = originalText;
    }
  };

  // ── Navbar Dropdowns & Smooth Scroll ───────────────
  const navDropdowns = document.querySelectorAll('.navbar__dropdown');
  navDropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('.navbar__link');
    const menu = dropdown.querySelector('.navbar__dropdown-panel');

    if (trigger && menu) {
      trigger.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          dropdown.classList.toggle('is-open');
        }
      });

      menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          dropdown.classList.remove('is-open');
        });
      });
    }
  });

  document.addEventListener('click', (e) => {
    navDropdowns.forEach(dropdown => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('is-open');
      }
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#faq' || href === '#prospekt') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Analytics & Pixel (Cookie Consent Controlled) ───────
  const PIXEL_ID = '1027189313416777';
  const GA4_ID = 'G-CJ26HJ9N8F';

  function initAnalytics() {
    if (window.analyticsInitialized) return;
    window.analyticsInitialized = true;

    // 1. Meta Pixel
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');

    fbq('init', PIXEL_ID);
    fbq('track', 'PageView');

    if (window.location.pathname.includes('enebolig')) {
      fbq('trackCustom', 'ViewEnebolig');
    } else if (window.location.pathname.includes('tomannsbolig')) {
      fbq('trackCustom', 'ViewTomannsbolig');
    } else if (window.location.pathname.includes('planlosning')) {
      fbq('trackCustom', 'ViewFloorplans');
    } else {
      fbq('trackCustom', 'ViewProjectOverview');
    }

    // 2. Google Analytics (GA4)
    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
    document.head.appendChild(gaScript);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA4_ID);
  }

  window.trackMetaLead = function(boligtype) {
    if (localStorage.getItem('cookieConsent') === 'accepted') {
      if (window.fbq) {
        fbq('track', 'Lead', {
          content_name: 'Prospekt CØV49',
          content_category: boligtype || 'Generell'
        });
      }
      if (window.gtag) {
        gtag('event', 'generate_lead', {
          event_category: 'Prospekt',
          event_label: boligtype || 'Generell'
        });
      }
    }
  };

  const cookieBanner = document.getElementById('cookieBanner');
  const cookieAcceptBtn = document.getElementById('cookieAcceptBtn');
  const cookieDeclineBtn = document.getElementById('cookieDeclineBtn');
  const consent = localStorage.getItem('cookieConsent');

  if (consent === 'accepted') {
    initAnalytics();
  } else if (!consent && cookieBanner) {
    setTimeout(() => {
      cookieBanner.classList.add('is-visible');
    }, 1500);
  }

  if (cookieAcceptBtn) {
    cookieAcceptBtn.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'accepted');
      if (cookieBanner) cookieBanner.classList.remove('is-visible');
      initAnalytics();
    });
  }

  if (cookieDeclineBtn) {
    cookieDeclineBtn.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'declined');
      if (cookieBanner) cookieBanner.classList.remove('is-visible');
    });
  }

  document.querySelectorAll('.btn-prospekt-download').forEach(btn => {
    btn.addEventListener('click', function() {
      const prospekt = this.getAttribute('data-prospekt') || 'Prospekt';
      window.trackMetaLead(prospekt);
    });
  });

})();
