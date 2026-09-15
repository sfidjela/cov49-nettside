import { buyerEmail } from '../lib/buyer-email.js';
import { internalEmail } from '../lib/internal-email.js';

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

    const { html: internalHtml, text: internalText } = internalEmail({
      clientName, email, cleanPhone, selectedType, comment, sourceLabel, dateStr
    });

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
        html: internalHtml,
        text: internalText
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
