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

    // 1. Lekker HTML-epost til boligkjøperen (interessenten)
    const buyerHtml = `<!DOCTYPE html>
<html lang="no">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0e0e0c; color: #f0ece4; margin: 0; padding: 24px 12px; }
    .card { max-width: 600px; margin: 0 auto; background: #161612; border: 1px solid rgba(240, 236, 228, 0.12); border-radius: 12px; padding: 40px 32px; }
    .label { font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #b8956d; margin-bottom: 12px; font-weight: 600; }
    h1 { font-size: 26px; font-weight: 400; margin: 0 0 20px 0; color: #ffffff; letter-spacing: -0.02em; line-height: 1.25; }
    p { font-size: 15px; line-height: 1.6; color: #c4c0b6; margin: 0 0 18px 0; }
    .btn { display: inline-block; background-color: #b8956d; color: #0e0e0c !important; text-decoration: none !important; font-weight: 600; font-size: 14px; padding: 13px 24px; border-radius: 6px; margin-right: 8px; margin-bottom: 12px; }
    .btn-secondary { background-color: #22221d; color: #f0ece4 !important; border: 1px solid rgba(240, 236, 228, 0.25); }
    .box { background: #1c1c17; border-radius: 8px; padding: 20px 24px; margin: 26px 0; border: 1px solid rgba(240, 236, 228, 0.08); }
    .broker-title { font-size: 12px; text-transform: uppercase; letter-spacing: 0.12em; color: #a8a49a; margin-bottom: 6px; }
    .footer { font-size: 12px; color: #7a776f; text-align: center; margin-top: 36px; border-top: 1px solid rgba(240, 236, 228, 0.08); padding-top: 24px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="label">Nobello · Caroline Øverlands vei 49</div>
    <h1>Takk for din interesse, ${clientName}</h1>
    
    <p>Vi bekrefter at vi har mottatt din registrering for boligene i <strong>Caroline Øverlands vei 49</strong> på Bekkestua (${selectedType}).</p>
    
    <p>Du kan laste ned og lese de komplette salgsprospektene via lenkene under:</p>

    <div style="margin: 28px 0 16px 0;">
      <a href="https://xn--cv49-gra.no/Prospekt%20C%C3%98V49/Prospekt%20-%20C%C3%98V%2049%20Enebolig.pdf" class="btn">Last ned Enebolig (PDF)</a>
      <a href="https://xn--cv49-gra.no/Prospekt%20C%C3%98V49/Prospekt%20C%C3%98V%2049A%20Tomannsbolig.pdf" class="btn btn-secondary">Tomannsbolig 49A (PDF)</a>
      <a href="https://xn--cv49-gra.no/Prospekt%20C%C3%98V49/Prospekt%20C%C3%98V%2049B%20Tomannsbolig.pdf" class="btn btn-secondary">Tomannsbolig 49B (PDF)</a>
    </div>

    <div class="box">
      <div class="broker-title">Ansvarlig eiendomsmegler</div>
      <div style="color: #ffffff; font-size: 16px; font-weight: 600; margin-bottom: 4px;">Jørgen Ek</div>
      <div style="color: #a8a49a; font-size: 14px; margin-bottom: 10px;">PrivatMegleren Dyve &amp; Partnere</div>
      <div style="font-size: 14px; line-height: 1.6;">
        Telefon: <a href="tel:+4794853504" style="color: #b8956d; text-decoration: none; font-weight: 500;">948 53 504</a><br>
        E-post: <a href="mailto:jorgen.ek@privatmegleren.no" style="color: #b8956d; text-decoration: none; font-weight: 500;">jorgen.ek@privatmegleren.no</a>
      </div>
    </div>

    <p style="font-size: 13px; color: #8f8b82; line-height: 1.6;">
      Har du spørsmål om leveranse, planløsning, tilvalgsmuligheter eller fremdrift, er du hjertelig velkommen til å kontakte megler ved å svare direkte på denne e-posten.
    </p>

    <div class="footer">
      Nobello EMP AS · Caroline Øverlands vei 49, 1356 Bekkestua<br>
      <a href="https://cøv49.no" style="color: #b8956d; text-decoration: none;">www.cøv49.no</a>
    </div>
  </div>
</body>
</html>`;

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
        html: buyerHtml
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

    const [buyerRes, teamRes] = await Promise.all([sendBuyer, sendTeam]);
    const buyerData = await buyerRes.json();
    const teamData = await teamRes.json();

    if (!buyerRes.ok && !teamRes.ok) {
      console.error('Resend delivery failed:', { buyerData, teamData });
      return res.status(500).json({ error: 'E-postutsendelse feilet', details: buyerData });
    }

    return res.status(200).json({
      success: true,
      message: 'Interesse registrert og e-post sendt!',
      buyerId: buyerData.id,
      teamId: teamData.id
    });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Intern serverfeil', message: error.message });
  }
}
