const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

export function internalEmail({ clientName, email, cleanPhone, selectedType, comment, sourceLabel, dateStr }) {
  const phone = String(cleanPhone || '').replace(/[^+\d]/g, '');
  const hasPhone = /^\+?\d{5,15}$/.test(phone);
  const address = String(email || '').trim();
  const emailHref = `mailto:${encodeURIComponent(address)}`;
  const row = (label, value) => `<tr><td style="padding:0 24px 20px;font-family:Arial,Helvetica,sans-serif;overflow-wrap:anywhere;word-break:break-word;"><p style="margin:0 0 5px;color:#646d65;font-size:12px;line-height:18px;letter-spacing:1px;">${label}</p><div style="color:#243a32;font-size:16px;line-height:25px;">${value}</div></td></tr>`;
  const contact = row('E-POST', `<a href="${escapeHtml(emailHref)}" style="color:#243a32;text-decoration:underline;">${escapeHtml(address)}</a>`)
    + row('TELEFON', hasPhone ? `<a href="tel:${phone}" style="color:#243a32;text-decoration:underline;font-weight:bold;">${escapeHtml(cleanPhone)}</a>` : 'Ikke oppgitt');
  const html = `<!doctype html>
<html lang="nb"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Ny henvendelse · CØV49</title></head>
<body style="margin:0;padding:0;background-color:#f2efe8;color:#243a32;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f2efe8"><tr><td align="center" style="padding:24px 12px;">
<!--[if mso]><table role="presentation" width="600" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="width:100%;max-width:600px;background-color:#ffffff;">
<tr><td bgcolor="#243a32" style="padding:26px 24px;background-color:#243a32;">
<img src="https://xn--cv49-gra.no/images/nobello-tekstlogo-hvit-email.png" alt="Nobello" width="180" border="0" style="display:block;width:180px;max-width:100%;height:auto;color:#ffffff;font:22px Arial,Helvetica,sans-serif;">
<p style="margin:12px 0 0;color:#e2d8c7;font:12px/20px Arial,Helvetica,sans-serif;letter-spacing:1px;">CØV49 · INTERNVARSEL</p></td></tr>
<tr><td style="padding:28px 24px 22px;font-family:Arial,Helvetica,sans-serif;">
<h1 style="margin:0 0 12px;color:#243a32;font:normal 30px/38px Georgia,'Times New Roman',serif;">Ny henvendelse.</h1>
<p style="margin:0 0 8px;font-size:22px;line-height:30px;font-weight:bold;overflow-wrap:anywhere;">${escapeHtml(clientName)}</p>
<p style="margin:0;color:#646d65;font-size:15px;line-height:24px;">Har registrert interesse og bedt om prospekt.</p></td></tr>
<tr><td style="padding:0 24px 24px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f2efe8"><tr><td style="padding:18px 20px;font-family:Arial,Helvetica,sans-serif;">
<p style="margin:0 0 6px;color:#646d65;font-size:12px;line-height:18px;letter-spacing:1px;">ØNSKET BOLIG</p>
<p style="margin:0;color:#243a32;font-size:20px;line-height:28px;font-weight:bold;overflow-wrap:anywhere;">${escapeHtml(selectedType)}</p>
<p style="margin:8px 0 0;color:#646d65;font-size:13px;line-height:21px;">Caroline Øverlands vei 49 · ved Bekkestua</p></td></tr></table></td></tr>
${contact}
${row('MELDING FRA INTERESSENTEN', escapeHtml(comment).replace(/\r?\n/g, '<br>'))}
<tr><td style="padding:0 24px 24px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td bgcolor="#243a32" style="padding:16px 20px;background-color:#243a32;"><a href="${escapeHtml(emailHref)}" style="display:block;color:#ffffff;font:bold 16px/24px Arial,Helvetica,sans-serif;text-decoration:underline;">Svar interessenten</a></td></tr></table></td></tr>
<tr><td style="padding:0 24px 24px;font:14px/23px Arial,Helvetica,sans-serif;color:#243a32;"><strong>Ansvarlig for oppfølging: Jørgen Ek.</strong><br>«Svar» på denne e-posten går direkte til interessenten. Didrik mottar en kopi til orientering.</td></tr>
<tr><td style="padding:22px 24px 8px;border-top:1px solid #e5e0d6;color:#646d65;font:12px/18px Arial,Helvetica,sans-serif;letter-spacing:1px;">REGISTRERING</td></tr>
${row('KILDE / ANNONSE', escapeHtml(sourceLabel))}
${row('MOTTATT', escapeHtml(dateStr))}
<tr><td style="padding:0 24px 24px;color:#646d65;font:12px/20px Arial,Helvetica,sans-serif;">Kontaktopplysningene er til intern oppfølging av denne henvendelsen.</td></tr>
</table><!--[if mso]></td></tr></table><![endif]--></td></tr></table></body></html>`;
  const text = `NY HENVENDELSE · CØV49\n\n${clientName}\nØnsket bolig: ${selectedType}\n\nE-post: ${address}\nTelefon: ${hasPhone ? cleanPhone : 'Ikke oppgitt'}\n\nMelding:\n${comment}\n\nAnsvarlig for oppfølging: Jørgen Ek.\nSvar på denne e-posten går direkte til interessenten. Didrik mottar en kopi til orientering.\n\nKilde / annonse: ${sourceLabel}\nMottatt: ${dateStr}\n\nKontaktopplysningene er til intern oppfølging av denne henvendelsen.`;
  return { html, text };
}
