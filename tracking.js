/* CØV49: felles samtykke og måling for alle boligsidene. */
(function () {
  'use strict';
  const PIXEL_ID = '1077885631875451';
  const GA4_ID = 'G-CJ26HJ9N8F';
  const ADS_ID = 'AW-18444880845';
  const ADS_LEAD = ADS_ID + '/zAXYCOO__PccEM2XmttE';
  const CONSENT_KEY = 'cov49Consent';
  const VERSION = 1;
  const MAX_AGE = 180 * 24 * 60 * 60 * 1000;
  const production = ['xn--cv49-gra.no', 'cov49.no', 'www.cov49.no'].includes(location.hostname);
  let consent = { analytics: false, marketing: false };
  let saved = false;
  let metaStarted = false;
  let googleStarted = false;
  let analyticsStarted = false;
  let adsStarted = false;
  let returnFocus;

  try {
    const stored = JSON.parse(localStorage.getItem(CONSENT_KEY));
    if (stored && stored.version === VERSION && Number.isFinite(stored.time) &&
        Date.now() - stored.time >= 0 && Date.now() - stored.time < MAX_AGE &&
        typeof stored.analytics === 'boolean' && typeof stored.marketing === 'boolean') {
      consent = stored;
      saved = true;
    }
    // Det gamle valget manglet opplysninger om de separate formålene.
    localStorage.removeItem('cookieConsent');
  } catch (_) { /* Blokkert lagring betyr at vi spør på nytt. */ }

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('consent', 'default', {
    analytics_storage: 'denied', ad_storage: 'denied',
    ad_user_data: 'denied', ad_personalization: 'denied'
  });

  function applyConsent() {
    window.gtag('consent', 'update', {
      analytics_storage: consent.analytics ? 'granted' : 'denied',
      ad_storage: consent.marketing ? 'granted' : 'denied',
      ad_user_data: consent.marketing ? 'granted' : 'denied',
      ad_personalization: consent.marketing ? 'granted' : 'denied'
    });
    if (!production) return; // Forhåndsvisning sender ingen måledata.
    if ((consent.analytics || consent.marketing) && !googleStarted) {
      googleStarted = true;
      window.gtag('js', new Date());
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=' + (consent.analytics ? GA4_ID : ADS_ID);
      document.head.appendChild(script);
    }
    if (consent.analytics && !analyticsStarted) {
      analyticsStarted = true;
      window.gtag('config', GA4_ID, {
        allow_google_signals: consent.marketing,
        allow_ad_personalization_signals: consent.marketing
      });
    }
    if (consent.marketing && !adsStarted) {
      adsStarted = true;
      window.gtag('config', ADS_ID, { allow_enhanced_conversions: false });
    }
    if (consent.marketing && !metaStarted) {
      metaStarted = true;
      if (!window.fbq) {
        const fbq = function () {
          fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments);
        };
        fbq.push = fbq; fbq.loaded = true; fbq.version = '2.0'; fbq.queue = [];
        window.fbq = fbq; window._fbq = fbq;
      }
      window.fbq('consent', 'grant');
      window.fbq('set', 'autoConfig', false, PIXEL_ID);
      window.fbq('init', PIXEL_ID); // Ingen kontaktfelter eller avansert matching.
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://connect.facebook.net/en_US/fbevents.js';
      document.head.appendChild(script);
      window.fbq('track', 'PageView');
      const view = location.pathname.includes('enebolig') ? 'ViewEnebolig' :
        location.pathname.includes('tomannsbolig') ? 'ViewTomannsbolig' :
        location.pathname.includes('planlosning') ? 'ViewFloorplans' : 'ViewProjectOverview';
      window.fbq('trackCustom', view);
    }
  }

  const banner = document.getElementById('cookieBanner');
  const analyticsBox = document.getElementById('consentAnalytics');
  const marketingBox = document.getElementById('consentMarketing');
  const settings = document.getElementById('cookieOptions');
  function showSettings() {
    returnFocus = document.activeElement;
    if (analyticsBox) analyticsBox.checked = consent.analytics;
    if (marketingBox) marketingBox.checked = consent.marketing;
    if (settings) settings.open = true;
    if (banner) banner.classList.add('is-visible');
    document.getElementById('cookieDeclineBtn')?.focus();
  }
  window.showCookieSettings = showSettings;

  function clearMeasurementCookies() {
    const host = location.hostname;
    const domains = ['', host, '.' + host];
    if (host.startsWith('www.')) domains.push(host.slice(4), '.' + host.slice(4));
    document.cookie.split(';').forEach(part => {
      const name = part.split('=')[0].trim();
      if (!/^(_ga(?:_|$)|_gid$|_gat|_gcl_|_fbp$|_fbc$)/.test(name)) return;
      domains.forEach(domain => {
        document.cookie = name + '=; Max-Age=0; path=/; SameSite=Lax' + (domain ? '; domain=' + domain : '');
      });
    });
  }
  function choose(analytics, marketing) {
    const reduced = (consent.analytics && !analytics) || (consent.marketing && !marketing);
    consent = { version: VERSION, time: Date.now(), analytics, marketing };
    try { localStorage.setItem(CONSENT_KEY, JSON.stringify(consent)); } catch (_) {}
    if (!marketing && window.fbq) window.fbq('consent', 'revoke');
    if (banner) banner.classList.remove('is-visible');
    if (reduced) {
      window['ga-disable-' + GA4_ID] = true;
      window.gtag('consent', 'update', {
        analytics_storage: analytics ? 'granted' : 'denied',
        ad_storage: marketing ? 'granted' : 'denied',
        ad_user_data: marketing ? 'granted' : 'denied',
        ad_personalization: marketing ? 'granted' : 'denied'
      });
      clearMeasurementCookies();
      // Fjern allerede lastede leverandørskript ved å laste siden med nytt valg.
      location.reload();
      return;
    }
    applyConsent();
    returnFocus?.focus();
  }
  document.getElementById('cookieAcceptBtn')?.addEventListener('click', () => choose(true, true));
  document.getElementById('cookieDeclineBtn')?.addEventListener('click', () => choose(false, false));
  document.getElementById('cookieSaveBtn')?.addEventListener('click', () => choose(!!analyticsBox?.checked, !!marketingBox?.checked));
  document.querySelectorAll('[data-cookie-settings]').forEach(button => button.addEventListener('click', showSettings));

  function track(metaEvent, googleEvent, kind, standard) {
    if (!production) return;
    // Bare faste kategorier, aldri fritekst, navn, telefon eller e-post.
    const allowed = ['Enebolig', 'Tomannsbolig', 'Begge', 'Generell', 'enebolig', 'tomanns-a', 'tomanns-b', 'Prospekt'];
    const category = allowed.includes(kind) ? kind : 'Generell';
    if (consent.marketing && metaStarted && window.fbq) {
      window.fbq(standard ? 'track' : 'trackCustom', metaEvent, { content_name: 'CØV49', content_category: category });
    }
    if (consent.analytics && analyticsStarted) window.gtag('event', googleEvent, { send_to: GA4_ID, content_group: category });
    if (standard && metaEvent === 'Lead' && consent.marketing && adsStarted) {
      // Samme serverbekreftede innsending som Meta; ingen kontaktdata eller salgsverdi.
      window.gtag('event', 'conversion', { send_to: ADS_LEAD });
    }
  }
  // Kalles bare etter at skjemaets mottak er bekreftet av serveren.
  window.trackMetaLead = kind => track('Lead', 'generate_lead', kind, true);
  document.querySelectorAll('.btn-prospekt-download').forEach(button => {
    button.addEventListener('click', () => track('DownloadProspectus', 'prospect_download', button.getAttribute('data-prospekt'), false));
  });

  const codes = new URLSearchParams();
  const incoming = new URLSearchParams(location.search);
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'].forEach(key => {
    const value = incoming.get(key);
    if (value && /^[a-zA-Z0-9_-]{1,80}$/.test(value)) codes.set(key, value);
  });
  window.covCampaignSource = label => codes.size ? label + ' | ' + codes.toString() : label;
  if (codes.size) document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#')) return;
    const url = new URL(href, location.href);
    if (url.origin !== location.origin || !/\/(?:index|enebolig|tomannsbolig|planlosning)\.html$/.test(url.pathname)) return;
    codes.forEach((value, key) => url.searchParams.set(key, value));
    link.setAttribute('href', url.pathname + url.search + url.hash);
  });

  if (saved) applyConsent();
  else if (banner) banner.classList.add('is-visible');
})();
