/**
 * Cloudflare Worker — Finmo Full Application Proxy
 * Populates all form fields from leofalkovsky.ca/apply.html into Finmo:
 *   1. Creates application + applicant
 *   2. Adds income / employment
 *   3. Adds property details
 *   4. Adds assets
 *   5. Adds liabilities
 *
 * Secrets (set in Cloudflare dashboard → Settings → Variables & Secrets):
 *   FINMO_API_TOKEN — your Finmo team API token
 */

const TEAM_ID    = '58e7f113-a829-45f2-803e-611d779d9551';
const BROKER_ID  = '5de6156d-0de9-4a40-bc86-1c724bfacb8b';
const BASE_URL   = 'https://app.finmo.ca/api/v1';
const ORIGIN     = 'https://leofalkovsky.ca';

const CORS = {
  'Access-Control-Allow-Origin':  ORIGIN,
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// ── Field maps ───────────────────────────────────────────────────────────────

const GOAL_MAP = {
  'Purchase — New Home':          'purchase',
  'Refinance Existing Mortgage':  'refinance',
  'Mortgage Renewal':             'renewal',
  'Investment Property Purchase': 'purchase',
};

const EMPLOYMENT_MAP = {
  'Employed Full-Time':   'fullTime',
  'Employed Part-Time':   'partTime',
  'Self-Employed':        'selfEmployed',
  'Contract / Freelance': 'contract',
  'Retired':              'retired',
};

const PROPERTY_TYPE_MAP = {
  'Detached House':   'detached',
  'Semi-Detached':    'semiDetached',
  'Townhouse':        'townhouse',
  'Condo':            'condo',
  'Rural / Acreage':  'rural',
};

const PROPERTY_USE_MAP = {
  'Primary Residence':       'ownerOccupied',
  'Secondary / Vacation':    'secondary',
  'Rental / Investment':     'rental',
};

const RATE_TYPE_MAP = {
  'Fixed Rate':              'fixed',
  'Variable Rate':           'variable',
  'Not Sure — Advise Me':    'fixed',
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  });
}

async function finmo(token, method, path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type':  'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}

function num(val) {
  const n = parseFloat(String(val).replace(/[^0-9.]/g, ''));
  return isNaN(n) ? 0 : n;
}

// ── Main handler ─────────────────────────────────────────────────────────────

export default {
  async fetch(request, env) {

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS });
    }
    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405);
    }

    let f;
    try { f = await request.json(); }
    catch { return json({ error: 'Invalid JSON' }, 400); }

    if (!f.first_name || !f.last_name || !f.email || !f.phone) {
      return json({ error: 'Missing required fields' }, 400);
    }
    if (f.consent !== 'yes') {
      return json({ error: 'Consent not provided' }, 400);
    }

    const token   = env.FINMO_API_TOKEN;
    const results = {};

    // ── 1. Create application ───────────────────────────────────────────────
    const appPayload = {
      teamId:      TEAM_ID,
      teamMembers: [BROKER_ID],
      applicant: {
        firstName:   f.first_name,
        lastName:    f.last_name,
        email:       f.email,
        phoneNumber: f.phone.replace(/\D/g, ''),
        ...(f.date_of_birth && { dateOfBirth: f.date_of_birth }),
        ...(f.marital_status && { maritalStatus: f.marital_status }),
      },
      sendInvite: false,
      sendSMS:    false,
      goal: GOAL_MAP[f.application_type] || 'purchase',
      notes: f.notes || '',
    };

    const appRes = await finmo(token, 'POST', '/applications', appPayload);
    results.application = { ok: appRes.ok, id: appRes.data?.id };

    if (!appRes.ok) {
      return json({ error: 'Failed to create application', detail: appRes.data }, appRes.status);
    }

    const appId      = appRes.data.id;
    const borrowerId = appRes.data.applicant?.id || appRes.data.borrowerId;

    // ── 2. Income / Employment ──────────────────────────────────────────────
    if (f.income && num(f.income) > 0) {
      const incomePayload = {
        ...(borrowerId && { borrowerId }),
        incomeType:     EMPLOYMENT_MAP[f.employment_type] === 'selfEmployed' ? 'selfEmployment' : 'employment',
        employmentType: EMPLOYMENT_MAP[f.employment_type] || 'fullTime',
        employerName:   f.employer   || '',
        jobTitle:       f.position   || '',
        yearsAtJob:     f.years_at_job ? parseFloat(f.years_at_job) : undefined,
        annualAmount:   num(f.income),
        frequency:      'annual',
        isCurrent:      true,
      };
      const incRes = await finmo(token, 'POST', `/applications/${appId}/incomes`, incomePayload);
      results.income = { ok: incRes.ok, detail: incRes.ok ? 'created' : incRes.data };
    }

    // Other / additional income
    if (f.income_other && num(f.income_other) > 0) {
      const otherIncome = {
        ...(borrowerId && { borrowerId }),
        incomeType:   'other',
        annualAmount: num(f.income_other),
        frequency:    'annual',
        description:  'Other income (bonus, rental, etc.)',
      };
      const oiRes = await finmo(token, 'POST', `/applications/${appId}/incomes`, otherIncome);
      results.incomeOther = { ok: oiRes.ok };
    }

    // ── 3. Property ─────────────────────────────────────────────────────────
    if (f.purchase_price && num(f.purchase_price) > 0) {
      const propPayload = {
        address:          f.property_address || '',
        propertyType:     PROPERTY_TYPE_MAP[f.property_type]  || 'detached',
        propertyUse:      PROPERTY_USE_MAP[f.property_use]    || 'ownerOccupied',
        purchasePrice:    num(f.purchase_price),
        estimatedValue:   num(f.purchase_price),
        downPayment:      num(f.down_payment),
        amortization:     parseInt(f.amortization) || 25,
        rateType:         RATE_TYPE_MAP[f.rate_type] || 'fixed',
        ...(f.closing_date && { closingDate: f.closing_date }),
        isSubjectProperty: true,
      };
      const propRes = await finmo(token, 'POST', `/applications/${appId}/properties`, propPayload);
      results.property = { ok: propRes.ok, detail: propRes.ok ? 'created' : propRes.data };
    }

    // ── 4. Assets ───────────────────────────────────────────────────────────
    const assets = [
      { type: 'chequingSavings', value: num(f.assets_savings),      label: 'Chequing / Savings' },
      { type: 'rrsp',            value: num(f.assets_rrsp),          label: 'RRSP / TFSA' },
      { type: 'realEstate',      value: num(f.assets_real_estate),   label: 'Other Real Estate' },
      { type: 'other',           value: num(f.assets_other),         label: 'Other Assets' },
    ].filter(a => a.value > 0);

    results.assets = [];
    for (const asset of assets) {
      const aRes = await finmo(token, 'POST', `/applications/${appId}/assets`, {
        ...(borrowerId && { borrowerId }),
        assetType:   asset.type,
        description: asset.label,
        value:       asset.value,
      });
      results.assets.push({ type: asset.type, ok: aRes.ok });
    }

    // ── 5. Liabilities ──────────────────────────────────────────────────────
    const liabilities = [
      { type: 'creditCard',   monthly: num(f.liability_cc),            label: 'Credit Card' },
      { type: 'carLoan',      monthly: num(f.liability_car),           label: 'Car Loan' },
      { type: 'lineOfCredit', monthly: num(f.liability_loc),           label: 'Line of Credit' },
      { type: 'other',        monthly: num(f.liability_other),         label: 'Other Liability' },
      { type: 'childSupport', monthly: num(f.liability_child_support), label: 'Child Support / Alimony' },
    ].filter(l => l.monthly > 0);

    results.liabilities = [];
    for (const lib of liabilities) {
      const lRes = await finmo(token, 'POST', `/applications/${appId}/liabilities`, {
        ...(borrowerId && { borrowerId }),
        liabilityType:   lib.type,
        description:     lib.label,
        monthlyPayment:  lib.monthly,
        balance:         lib.monthly * 12,
      });
      results.liabilities.push({ type: lib.type, ok: lRes.ok });
    }

    // ── 6. Co-applicant (if provided) ───────────────────────────────────────
    if (f.co_app === 'yes' && f.co_first_name && f.co_last_name) {
      const coRes = await finmo(token, 'POST', `/applications/${appId}/co-applicants`, {
        firstName:      f.co_first_name,
        lastName:       f.co_last_name,
        employmentType: EMPLOYMENT_MAP[f.co_employment_type] || 'fullTime',
        annualIncome:   num(f.co_income),
      });
      results.coApplicant = { ok: coRes.ok, detail: coRes.ok ? 'created' : coRes.data };
    }

    return json({
      success: true,
      applicationId: appId,
      finmoUrl: `https://app.finmo.ca/teams/${TEAM_ID}/deals/${appId}/application`,
      populated: results,
    });
  },
};
