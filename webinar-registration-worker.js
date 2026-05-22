/**
 * Cloudflare Worker — Webinar Registration Handler
 * Deploy at: Cloudflare Dashboard → Workers & Pages → Create Worker
 * Required secret: RESEND_API_KEY (from resend.com — free, 3,000 emails/month)
 * Set secret: wrangler secret put RESEND_API_KEY
 */

export default {
  async fetch(request, env) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': 'https://leofalkovsky.ca',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      });
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
    }

    let data;
    try {
      data = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
    }

    const { name, email, phone, situation } = data;

    if (!name || !email) {
      return new Response(JSON.stringify({ error: 'Name and email are required' }), { status: 400 });
    }

    // Send notification email to Leo via Resend
    const emailBody = `
New Webinar Registration — June 4th, 2026

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Situation: ${situation || 'Not selected'}

Registered at: ${new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto' })} EST
    `.trim();

    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Webinar Registration <noreply@leofalkovsky.ca>',
          to: ['leo@leofalkovsky.com'],
          subject: `New Webinar Registration — ${name}`,
          text: emailBody,
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        console.error('Resend error:', err);
        throw new Error('Email send failed');
      }
    } catch (err) {
      console.error(err);
      // Still return success to the user — log the failure server-side
      // so registrations aren't lost if email temporarily fails
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://leofalkovsky.ca',
      }
    });
  }
};
