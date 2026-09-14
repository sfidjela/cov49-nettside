const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));

const brochures = [
  ['Eneboligen', 'https://xn--cv49-gra.no/Prospekt%20C%C3%98V49/Prospekt%20-%20C%C3%98V%2049%20Enebolig.pdf'],
  ['Tomannsbolig 49A', 'https://xn--cv49-gra.no/Prospekt%20C%C3%98V49/Prospekt%20C%C3%98V%2049A%20Tomannsbolig.pdf'],
  ['Tomannsbolig 49B', 'https://xn--cv49-gra.no/Prospekt%20C%C3%98V49/Prospekt%20C%C3%98V%2049B%20Tomannsbolig.pdf'],
];

export function buyerEmail(clientName, selectedType) {
  const name = String(clientName || '').trim();
  const greeting = name && name !== 'Interessent' ? `Hei ${escapeHtml(name)},` : 'Hei,';
  const selected = String(selectedType || 'Begge / Ikke spesifisert');
  const selection = escapeHtml(selected);
  const isShared = /begge|ikke spesifisert/i.test(selected);
  const isDetached = !isShared && /enebolig/i.test(selected);
  const isSemi = !isShared && /tomanns|49\s*[ab]/i.test(selected);
  const hero = isDetached
    ? { file: 'Enebolig kjøkken påkostet ferdig-1280w.jpg', alt: 'Illustrasjon av eneboligens kjøkken og spiseplass med utsikt', page: 'enebolig.html' }
    : isSemi
      ? { file: 'Tomannsbolig kjøkken ferdig-1280w.jpg', alt: 'Illustrasjon av kjøkkenet i tomannsboligen', page: 'tomannsbolig.html' }
      : { file: 'Nytt forsidebilde CØV49-1280w.jpg', alt: 'Prosjektillustrasjon av Caroline Øverlands vei 49', page: '' };
  const heroUrl = `https://xn--cv49-gra.no/images/optimized/${encodeURIComponent(hero.file)}`;
  const brochureRows = brochures.map(([label, url]) => `<tr><td style="padding:0 0 12px;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td bgcolor="#243a32" style="background-color:#243a32;padding:16px 20px;">
      <a href="${url}" style="display:block;color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:24px;font-weight:bold;text-decoration:underline;">${label} &nbsp;·&nbsp; Se prospekt (PDF)</a>
    </td></tr></table>
  </td></tr>`).join('');
  const html = `<!doctype html>
<html lang="nb"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Takk for interessen · CØV49</title></head>
<body style="margin:0;padding:0;background-color:#f2efe8;color:#243a32;">
<div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">Her finner du prospektene og kontaktinformasjonen til megler for Caroline Øverlands vei 49.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f2efe8" style="width:100%;background-color:#f2efe8;"><tr><td align="center" style="padding:28px 12px;">
<!--[if mso]><table role="presentation" width="600" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="width:100%;max-width:600px;background-color:#ffffff;">
  <tr><td bgcolor="#243a32" style="padding:28px 28px 25px;background-color:#243a32;color:#ffffff;">
    <a href="https://xn--cv49-gra.no/" style="text-decoration:none;"><img src="https://xn--cv49-gra.no/images/nobello-tekstlogo-hvit-email.png" alt="Nobello" width="180" border="0" style="display:block;width:180px;max-width:100%;height:auto;border:0;color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:22px;line-height:38px;"></a>
    <p style="margin:9px 0 0;color:#e2d8c7;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:20px;letter-spacing:1px;">CAROLINE ØVERLANDS VEI 49</p>
  </td></tr>
  <tr><td style="padding:0;font-size:0;line-height:0;">
    <a href="https://xn--cv49-gra.no/${hero.page}" style="text-decoration:none;"><img src="${heroUrl}" alt="${hero.alt}" width="600" border="0" style="display:block;width:100%;max-width:600px;height:auto;border:0;color:#243a32;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:24px;"></a>
  </td></tr>
  <tr><td style="padding:9px 28px 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:17px;color:#586259;">Illustrasjon. Avvik og tilvalg kan forekomme.</td></tr>
  <tr><td style="padding:30px 28px 12px;font-family:Arial,Helvetica,sans-serif;color:#243a32;">
    <h1 style="margin:0 0 23px;color:#243a32;font-family:Georgia,'Times New Roman',serif;font-size:30px;font-weight:normal;line-height:38px;">Takk for interessen.</h1>
    <p style="margin:0 0 14px;font-size:16px;line-height:26px;color:#243a32;overflow-wrap:anywhere;">${greeting}</p>
    <p style="margin:0 0 18px;font-size:16px;line-height:26px;color:#243a32;">Vi har mottatt din interesse for Caroline Øverlands vei 49, ved Bekkestua. Du har valgt: <strong>${selection}</strong>.</p>
    <p style="margin:0 0 18px;font-size:16px;line-height:26px;color:#243a32;">Her finner du prospektene med priser, plantegninger og informasjon om boligene.</p>
  </td></tr>
  <tr><td style="padding:0 28px 18px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${brochureRows}</table></td></tr>
  <tr><td style="padding:0 28px 28px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f2efe8"><tr><td style="padding:23px 20px;background-color:#f2efe8;font-family:Arial,Helvetica,sans-serif;">
      <p style="margin:0 0 10px;font-size:12px;line-height:18px;color:#5c655e;letter-spacing:1px;">DIN KONTAKT HOS MEGLER</p>
      <p style="margin:0 0 5px;font-size:20px;line-height:28px;color:#243a32;font-weight:bold;">Jørgen Ek</p>
      <p style="margin:0 0 16px;font-size:14px;line-height:22px;color:#48544d;">PrivatMegleren Dyve &amp; Partnere</p>
      <p style="margin:0 0 8px;font-size:16px;line-height:25px;"><a href="tel:+4794853504" style="color:#243a32;text-decoration:underline;">948 53 504</a></p>
      <p style="margin:0;font-size:14px;line-height:24px;overflow-wrap:anywhere;"><a href="mailto:jorgen.ek@privatmegleren.no" style="color:#243a32;text-decoration:underline;">jorgen.ek@privatmegleren.no</a></p>
    </td></tr></table>
  </td></tr>
  <tr><td style="padding:0 28px 30px;font-family:Arial,Helvetica,sans-serif;">
    <p style="margin:0;color:#243a32;font-size:16px;line-height:26px;">Vil du vite mer om boligen eller avtale en personlig gjennomgang? Svar direkte på denne e-posten, så går svaret til Jørgen.</p>
  </td></tr>
  <tr><td style="padding:22px 28px;border-top:1px solid #e5e0d6;font-family:Arial,Helvetica,sans-serif;">
    <p style="margin:0 0 7px;color:#586259;font-size:12px;line-height:20px;">Du mottar denne e-posten fordi du har registrert interesse for CØV49.</p>
    <p style="margin:0;font-size:14px;line-height:22px;"><a href="https://xn--cv49-gra.no" style="color:#243a32;text-decoration:underline;">www.cøv49.no</a></p>
  </td></tr>
</table>
<!--[if mso]></td></tr></table><![endif]-->
</td></tr></table></body></html>`;
  const text = `Takk for interessen.\n\n${name && name !== 'Interessent' ? `Hei ${name},` : 'Hei,'}\n\nVi har mottatt din interesse for Caroline Øverlands vei 49, ved Bekkestua. Du har valgt: ${selectedType}.\n\nProspekter med priser, plantegninger og informasjon:\n${brochures.map(([label,url])=>`${label}: ${url}`).join('\n\n')}\n\nDin kontakt hos megler:\nJørgen Ek · PrivatMegleren Dyve & Partnere\nTelefon: 948 53 504\nE-post: jorgen.ek@privatmegleren.no\n\nSvar direkte på denne e-posten for spørsmål eller en personlig gjennomgang.\n\nDu mottar denne e-posten fordi du har registrert interesse for CØV49.\nwww.cøv49.no`;
  return { html, text };
}
