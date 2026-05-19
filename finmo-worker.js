/**
 * Cloudflare Worker — Finmo Application Proxy
 * Receives form data from leofalkovsky.ca/apply.html and creates
 * a Finmo application via the REST API.
 *
 * Environment variables (set in Cloudflare dashboard, never in code):
 *   FINMO_API_TOKEN  — your Finmo team API token
 */

const FINMO_TEAM_ID  = '58e7f113-a829-45f2-803e-611d779d9551';
const FINMO_BROKER_ID = '5de6156d-0de9-4a40-bc86-1c724bfacb8b';
const FINMO_API_URL  = 'https://app.finmo.ca/api/v1/applications';
const ALLOWED_ORIGIN = 'https://leofalkovsky.ca';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const GOAL_MAP = {
  'Purchase — New Home':          'purchase',
  'Refinance Existing Mortgage':  'refinance',
  'Mortgage Renewal':             'renewal',
  'Investment Property Purchase': 'purchase',
};

export default {
  async fetch(request, env) {
    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405);
    }

    let form;
    try {
      form = await request.json();
    } catch {
      return json({ error: 'Invalid JSON body' }, 400);
    }

    // Validate required fields
    if (!form.first_name || !form.last_name || !form.email || !form.phone) {
      return json({ error: 'Missing required fields: first_name, last_name, email, phone' }, 400);
    }

    const phoneClean = form.phone.replace(/\D/g, '');
    const goal = GOAL_MAP[form.application_type] || 'purchase';

    // PIPEDA: verify consent was given before forwarding
    if (form.consent !== 'yes') {
      return json({ error: 'Consent not provided' }, 400);
    }

    const payload = {
      teamId:      FINMO_TEAM_ID,
      teamMembers: [FINMO_BROKER_ID],
      applicant: {
        firstName:   form.first_name,
        lastName:    form.last_name,
        email:       form.email,
        phoneNumber: phoneClean,
      },
      sendInvite: true,
      sendSMS:    true,
      goal,
      // PIPEDA audit: consent timestamp forwarded with application
      metadata: {
        consentGiven:    true,
        consentTimestamp: form.consent_timestamp || new Date().toISOString(),
        consentVersion:  '1.0',
        source:          'leofalkovsky.ca/apply.html',
        fsraDisclosure:  'FSRA #M09000003 / 8Twelve #13230',
      },
    };

    let finmoResp;
    try {
      finmoResp = await fetch(FINMO_API_URL, {
        method:  'POST',
        headers: {
          'Authorization': `Bearer ${env.FINMO_API_TOKEN}`,
          'Content-Type':  'application/json',
        },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      return json({ error: 'Could not reach Finmo API', detail: err.message }, 502);
    }

    const result = await finmoResp.json().catch(() => ({}));

    if (!finmoResp.ok) {
      return json({ error: 'Finmo rejected the request', detail: result }, finmoResp.status);
    }

    return json({ success: true, applicationId: result.id });
  },
};

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  });
}
