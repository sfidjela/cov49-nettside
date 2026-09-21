import { buyerEmail } from '../lib/buyer-email.js';
import { internalEmail } from '../lib/internal-email.js';

const ALLOWED_ORIGINS = new Set([
  'https://xn--cv49-gra.no',
  'https://www.xn--cv49-gra.no',
  'https://cov49.no',
  'https://www.cov49.no',
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:5500'
]);
const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMITS = { ip: 8, email: 4 };
const rateBuckets = new Map();

const getHeader = (req, name) => {
  const value = req.headers?.[name] ?? req.headers?.[name.toLowerCase()];
  return Array.isArray(value) ? value[0] : value;
};

const cleanText = (value, maxLength, fallback = '') => {
  if (value === undefined || value === null || value === '') return fallback;
  if (typeof value !== 'string') throw new Error('INVALID_INPUT');
  return value.trim().slice(0, maxLength) || fallback;
};

const rateLimited = (key, limit, now = Date.now()) => {
  const current = rateBuckets.get(key);
  if (!current || current.resetAt <= now) {
    rateBuckets.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  current.count += 1;
  return current.count > limit;
};

const pruneRateBuckets = (now = Date.now()) => {
  if (rateBuckets.size < 500) return;
  for (const [key, bucket] of rateBuckets) {
    if (bucket.resetAt <= now) rateBuckets.delete(key);
  }
};

const readResendBody = async (response) => response.json().catch(() => ({}));

export default async function handler(req, res) {
  const origin = getHeader(req, 'origin');
  const originAllowed = !origin || ALLOWED_ORIGINS.has(origin);

  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store');
  if (origin && originAllowed) res.setHeader('Access-Control-Allow-Origin', origin);

  if (req.method === 'OPTIONS') {
    return originAllowed
      ? res.status(204).end()
      : res.status(403).json({ error: 'Ikke tillatt opprinnelse' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!originAllowed) {
    return res.status(403).json({ error: 'Ikke tillatt opprinnelse' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});

    // Skjulte felt skal være tomme. Returner et tilsynelatende vellykket svar til roboter.
    if (body._honey) {
      return res.status(200).json({ success: true, message: 'Interesse registrert!' });
    }

    const email = cleanText(body.email, 254).toLowerCase();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({ error: 'Ugyldig e-postadresse' });
    }

    const forwardedFor = getHeader(req, 'x-forwarded-for');
    const clientIp = String(forwardedFor || getHeader(req, 'x-real-ip') || req.socket?.remoteAddress || 'unknown')
      .split(',')[0]
      .trim();
    pruneRateBuckets();
    if (rateLimited(`ip:${clientIp}`, RATE_LIMITS.ip) || rateLimited(`email:${email}`, RATE_LIMITS.email)) {
      res.setHeader('Retry-After', String(Math.ceil(RATE_WINDOW_MS / 1000)));
      return res.status(429).json({ error: 'For mange innsendinger. Vent litt og prøv igjen.' });
    }

    const clientName = cleanText(body.navn, 120, 'Interessent');
    const cleanPhone = cleanText(body.telefon, 60, 'Ikke oppgitt');
    const selectedType = cleanText(body.boligtype, 80, 'Begge / Ikke spesifisert');
    const comment = cleanText(body.melding, 2000, 'Ingen kommentar');
    const sourceLabel = cleanText(body.kilde, 300, 'Nettsiden (cøv49.no)');
    const replyName = clientName.replace(/[\r\n"]/g, ' ').slice(0, 80);
    const dateStr = new Date().toLocaleString('no-NO', { timeZone: 'Europe/Oslo' });

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error('RESEND_API_KEY environment variable is not configured');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const { html: internalHtml, text: internalText } = internalEmail({
      clientName, email, cleanPhone, selectedType, comment, sourceLabel, dateStr
    });

    // Teamvarslet må være akseptert før interessenten får en bekreftelse.
    const teamRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'CØV49 Varsling <post@mail.nobello.no>',
        reply_to: `${replyName} <${email}>`,
        to: ['ds@nobello.no', 'sf@nobello.no', 'jorgen.ek@privatmegleren.no'],
        subject: `Ny interessent: ${clientName} (${selectedType}) – CØV49`,
        html: internalHtml,
        text: internalText
      })
    });
    const teamData = await readResendBody(teamRes);
    if (!teamRes.ok) {
      console.error('Internal lead notification was not accepted by the email provider', { status: teamRes.status });
      return res.status(502).json({ error: 'Registreringen kunne ikke leveres. Prøv igjen eller kontakt megler direkte.' });
    }

    const { html: buyerHtml, text: buyerText } = buyerEmail(clientName, selectedType);
    let buyerData = {};
    let confirmationSent = false;
    try {
      const buyerRes = await fetch('https://api.resend.com/emails', {
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
      buyerData = await readResendBody(buyerRes);
      confirmationSent = buyerRes.ok;
    } catch (error) {
      console.error('Buyer confirmation request failed after team notification succeeded');
    }
    if (!confirmationSent) console.error('Buyer confirmation was not accepted; team notification succeeded');

    return res.status(200).json({
      success: true,
      message: 'Interesse registrert!',
      confirmationSent,
      buyerId: buyerData.id,
      teamId: teamData.id
    });
  } catch (error) {
    if (error?.message === 'INVALID_INPUT' || error instanceof SyntaxError) {
      return res.status(400).json({ error: 'Ugyldig skjemadata' });
    }
    console.error('Server error', error);
    return res.status(500).json({ error: 'Intern serverfeil' });
  }
}
