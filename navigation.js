(() => {
  'use strict';
  const nav = document.getElementById('navbar');
  if (!nav) return;
  const panel = nav.querySelector('.container');
  if (!panel) return;
  const mobile = window.matchMedia('(max-width: 1024px)');
  panel.id = 'navigation-links';
  const header = document.createElement('div');
  header.className = 'navbar__mobile-header';
  header.innerHTML = `<a href="index.html" class="navbar__mobile-brand" aria-label="Nobello – forsiden">
    <img src="Logo/02. Tekstlogo/Nobello_Tekstlogo_negativ.svg" class="logo-dark-theme" alt="Nobello">
    <img src="Logo/02. Tekstlogo/Nobello_Tekstlogo.svg" class="logo-light-theme" alt="Nobello">
  </a><button type="button" class="navbar__menu-toggle" aria-expanded="false" aria-controls="navigation-links">Meny <span aria-hidden="true">☰</span></button>`;
  nav.prepend(header);
  nav.classList.add('has-mobile-menu');
  const toggle = header.querySelector('button');
  const toggleLabel = toggle.firstChild;
  const toggleIcon = toggle.querySelector('span');
  const dropdowns = Array.from(nav.querySelectorAll('.navbar__dropdown'));

  function setDropdown(dropdown, open) {
    dropdown.classList.toggle('is-open', open);
    dropdown.querySelector('.navbar__link').setAttribute('aria-expanded', String(open));
  }
  function setMenu(open, returnFocus = false) {
    nav.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    // Behold klikkmålet i DOM-en mens klikket bobler til dokumentet.
    toggleLabel.nodeValue = open ? 'Lukk ' : 'Meny ';
    toggleIcon.textContent = open ? '×' : '☰';
    if (!open) dropdowns.forEach(d => setDropdown(d, false));
    if (returnFocus) toggle.focus();
  }
  toggle.addEventListener('click', () => setMenu(!nav.classList.contains('menu-open')));
  dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('.navbar__link');
    const submenu = dropdown.querySelector('.navbar__dropdown-panel');
    if (!trigger || !submenu) return;
    trigger.setAttribute('aria-controls', submenu.id);
    trigger.addEventListener('click', event => {
      if (!mobile.matches) return;
      event.preventDefault();
      const open = !dropdown.classList.contains('is-open');
      dropdowns.forEach(d => setDropdown(d, d === dropdown && open));
    });
  });
  panel.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (link && !link.matches('.navbar__dropdown > .navbar__link')) setMenu(false);
  });
  document.addEventListener('click', event => {
    if (!nav.contains(event.target)) setMenu(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('menu-open')) setMenu(false, true);
  });
  nav.addEventListener('focusout', event => {
    if (event.relatedTarget && !nav.contains(event.relatedTarget)) setMenu(false);
  });
  mobile.addEventListener('change', () => setMenu(false));
})();
