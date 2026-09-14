import { buyerEmail } from '../lib/buyer-email.js';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const { navn, email, telefon, boligtype, melding, kilde } = body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Ugyldig e-postadresse' });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error('RESEND_API_KEY environment variable is not configured');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const selectedType = boligtype || 'Begge / Ikke spesifisert';
    const clientName = (navn || 'Interessent').trim();
    const cleanPhone = (telefon || 'Ikke oppgitt').trim();
    const comment = (melding || 'Ingen kommentar').trim();
    const sourceLabel = kilde || 'Nettsiden (cøv49.no)';
    const dateStr = new Date().toLocaleString('no-NO', { timeZone: 'Europe/Oslo' });

    const { html: buyerHtml, text: buyerText } = buyerEmail(clientName, selectedType);

    // 2. Varslings-epost til Didrik og Megler Jørgen Ek
    const internalHtml = `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.5; color: #1a1a18; padding: 20px; }
    .container { max-width: 580px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e5e5; border-radius: 8px; padding: 24px; }
    h2 { color: #111; margin-top: 0; font-size: 20px; border-bottom: 2px solid #8b6f4e; padding-bottom: 8px; }
    table { width: 100%; border-collapse: collapse; margin-top: 15px; }
    td { padding: 10px 12px; border-bottom: 1px solid #f0f0f0; font-size: 14px; }
    td.label { font-weight: 600; width: 130px; color: #555; background: #fafafa; }
    .note { margin-top: 20px; font-size: 13px; color: #666; background: #fdfbf7; padding: 12px; border-left: 3px solid #8b6f4e; }
  </style>
</head>
<body>
  <div class="container">
    <h2>Ny interessent – Caroline Øverlands vei 49</h2>
    <p>En ny interessent har registrert seg på nettsiden og har automatisk fått tilsendt bekreftelse og prospekt-lenker på e-post.</p>
    
    <table>
      <tr><td class="label">Navn:</td><td><strong>${clientName}</strong></td></tr>
      <tr><td class="label">E-post:</td><td><a href="mailto:${email}" style="color: #8b6f4e;">${email}</a></td></tr>
      <tr><td class="label">Telefon:</td><td><a href="tel:${cleanPhone}" style="color: #8b6f4e;">${cleanPhone}</a></td></tr>
      <tr><td class="label">Ønsket bolig:</td><td><strong>${selectedType}</strong></td></tr>
      <tr><td class="label">Melding:</td><td>${comment}</td></tr>
      <tr><td class="label">Kilde:</td><td>${sourceLabel}</td></tr>
      <tr><td class="label">Tidspunkt:</td><td>${dateStr}</td></tr>
    </table>
    
    <div class="note">
      Tips: Trykker du <strong>Svar (Reply)</strong> på denne e-posten, svarer du direkte til interessenten (<a href="mailto:${email}">${email}</a>).
    </div>
  </div>
</body>
</html>`;

    // Send e-post til interessenten
    const sendBuyer = fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Nobello | Caroline Øverlands vei 49 <post@mail.nobello.no>',
        reply_to: 'Jørgen Ek <jorgen.ek@privatmegleren.no>',
        to: [email],
        subject: 'Caroline Øverlands vei 49 - Salgsprospekt',
        html: buyerHtml,
        text: buyerText
      })
    });

    // Send varsling til teamet (Didrik + Megler Jørgen Ek)
    const sendTeam = fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'CØV49 Varsling <post@mail.nobello.no>',
        reply_to: `${clientName} <${email}>`,
        to: ['ds@nobello.no', 'jorgen.ek@privatmegleren.no'],
        subject: `Ny interessent: ${clientName} (${selectedType}) – CØV49`,
        html: internalHtml
      })
    });

    const [buyerResult, teamResult] = await Promise.allSettled([sendBuyer, sendTeam]);
    // A confirmation to the buyer alone must not count as a delivered lead.
    if (teamResult.status !== 'fulfilled' || !teamResult.value.ok) {
      console.error('Internal lead notification was not accepted by the email provider');
      return res.status(502).json({ error: 'Registreringen kunne ikke leveres. Prøv igjen eller kontakt megler direkte.' });
    }
    const teamData = await teamResult.value.json().catch(() => ({}));
    const buyerAccepted = buyerResult.status === 'fulfilled' && buyerResult.value.ok;
    const buyerData = buyerAccepted ? await buyerResult.value.json().catch(() => ({})) : {};
    if (!buyerAccepted) console.error('Buyer confirmation was not accepted; team notification succeeded');

    return res.status(200).json({
      success: true,
      message: 'Interesse registrert!',
      confirmationSent: buyerAccepted,
      buyerId: buyerData.id,
      teamId: teamData.id
    });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Intern serverfeil', message: error.message });
  }
}
