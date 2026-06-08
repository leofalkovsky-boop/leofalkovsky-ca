/* main.js — leofalkovsky.ca */
'use strict';

// ── COOKIE CONSENT (PIPEDA) ──────────────────────────────────────
(function () {
  var KEY = 'lf_cookie_consent';
  var GA_ID = 'G-XB7RQSPPMW';

  function loadGA() {
    if (window.__gaLoaded) return;
    window.__gaLoaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', GA_ID);
  }

  var stored = localStorage.getItem(KEY);
  if (stored === 'accepted') { loadGA(); return; }
  if (stored === 'declined') { return; }

  function showBanner() {
    var style = document.createElement('style');
    style.textContent =
      '#lf-cookie{position:fixed;bottom:0;left:0;right:0;z-index:99999;' +
      'background:#0a1428;border-top:2px solid rgba(67,116,187,.35);' +
      'padding:16px 28px;display:flex;align-items:center;justify-content:space-between;' +
      'gap:20px;flex-wrap:wrap;box-shadow:0 -4px 28px rgba(0,0,0,.4);' +
      'animation:lf-up .4s cubic-bezier(.22,1,.36,1) both;}' +
      '@keyframes lf-up{from{transform:translateY(110%);}to{transform:translateY(0);}}' +
      '#lf-cookie p{margin:0;font-size:.82rem;color:rgba(255,255,255,.82);' +
      'line-height:1.55;max-width:700px;font-family:Inter,sans-serif;}' +
      '#lf-cookie p a{color:#6d9adc;text-decoration:underline;}' +
      '#lf-cookie p a:hover{color:#fff;}' +
      '.lf-ck-btns{display:flex;gap:10px;flex-shrink:0;}' +
      '#lf-ck-accept{background:#4374bb;color:#fff;border:none;border-radius:6px;' +
      'padding:9px 20px;font-size:.82rem;font-weight:600;cursor:pointer;' +
      'font-family:Inter,sans-serif;transition:background .2s;white-space:nowrap;}' +
      '#lf-ck-accept:hover{background:#2a528d;}' +
      '#lf-ck-decline{background:transparent;color:rgba(255,255,255,.5);' +
      'border:1px solid rgba(255,255,255,.2);border-radius:6px;' +
      'padding:9px 16px;font-size:.82rem;cursor:pointer;white-space:nowrap;' +
      'font-family:Inter,sans-serif;transition:color .2s,border-color .2s;}' +
      '#lf-ck-decline:hover{color:rgba(255,255,255,.9);border-color:rgba(255,255,255,.5);}';
    document.head.appendChild(style);

    var banner = document.createElement('div');
    banner.id = 'lf-cookie';
    banner.innerHTML =
      '<p>We use cookies to analyse site traffic via Google Analytics, helping us improve your' +
      ' experience. By clicking <strong>Accept</strong> you consent to analytics cookies in' +
      ' accordance with <a href="https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/' +
      'the-personal-information-protection-and-electronic-documents-act-pipeda/" target="_blank"' +
      ' rel="noopener">PIPEDA</a>.</p>' +
      '<div class="lf-ck-btns">' +
      '<button id="lf-ck-decline">Decline</button>' +
      '<button id="lf-ck-accept">Accept Analytics</button>' +
      '</div>';
    document.body.appendChild(banner);

    function dismiss() {
      banner.style.cssText += 'transition:transform .35s ease,opacity .35s ease;transform:translateY(110%);opacity:0;';
      setTimeout(function () { if (banner.parentNode) banner.parentNode.removeChild(banner); }, 380);
    }

    document.getElementById('lf-ck-accept').addEventListener('click', function () {
      localStorage.setItem(KEY, 'accepted');
      loadGA();
      dismiss();
    });
    document.getElementById('lf-ck-decline').addEventListener('click', function () {
      localStorage.setItem(KEY, 'declined');
      dismiss();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', showBanner);
  } else {
    showBanner();
  }
}());

// ── NETLIFY IDENTITY (CMS login redirect) ────────────────────────
if (window.netlifyIdentity) {
  window.netlifyIdentity.on('init', user => {
    if (!user) {
      window.netlifyIdentity.on('login', () => { document.location.href = '/admin/'; });
    }
  });
}

// ── HERO BACKGROUND CAROUSEL ─────────────────────────────────────
(function() {
  const slides = document.querySelectorAll('.hero-bg-slide');
  const dots   = document.querySelectorAll('.hero-slide-dot');
  if (!slides.length) return;
  let cur = 0, timer;

  function goTo(idx) {
    slides[cur].classList.remove('active');
    if (dots[cur]) dots[cur].classList.remove('active');
    cur = (idx + slides.length) % slides.length;
    slides[cur].classList.add('active');
    if (dots[cur]) dots[cur].classList.add('active');
  }
  function startTimer() { clearInterval(timer); timer = setInterval(() => goTo(cur + 1), 7000); }

  dots.forEach(d => d.addEventListener('click', () => { goTo(+d.dataset.hsd); startTimer(); }));
  startTimer();
}());

// ── NAV ──────────────────────────────────────────────────────────
const nav = document.getElementById('nav');
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
  if (scrollTopBtn) scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
});
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ── ANIMATED COUNTERS ────────────────────────────────────────────
(function() {
  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    if (!target) return;
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();
    function step(now) {
      const pct = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - pct, 3);
      const val = Math.round(ease * target);
      const display = val >= 1000 ? (val / 1000).toFixed(0) + 'K' : val;
      el.textContent = prefix + display + suffix;
      if (pct < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && e.target.dataset.count) {
        animateCounter(e.target);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => io.observe(el));
})();

// ── MOBILE HAMBURGER ──────────────────────────────────────────────
const hamburger = document.getElementById('hamburgerBtn');
const drawer = document.getElementById('navDrawer');
const drawerClose = document.getElementById('drawerClose');
if (hamburger && drawer) {
  hamburger.addEventListener('click', () => drawer.classList.add('open'));
  if (drawerClose) drawerClose.addEventListener('click', () => drawer.classList.remove('open'));
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => drawer.classList.remove('open')));
}

// ── RESOURCES DROPDOWN (click toggle) ────────────────────────────
document.addEventListener('click', function(e) {
  const toggle = e.target.closest('.dropdown-toggle');
  if (toggle) {
    e.preventDefault();
    const li = toggle.closest('.has-dropdown');
    const isOpen = li.classList.contains('open');
    document.querySelectorAll('.nav-links li.has-dropdown').forEach(function(el) {
      el.classList.remove('open');
    });
    if (!isOpen) li.classList.add('open');
    return;
  }
  if (!e.target.closest('.has-dropdown')) {
    document.querySelectorAll('.nav-links li.has-dropdown.open').forEach(function(el) {
      el.classList.remove('open');
    });
  }
});

// ── FAQ ACCORDION ─────────────────────────────────────────────────
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-q');
  if (!q) return;
  q.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ── AJAX FORMS ────────────────────────────────────────────────────
document.querySelectorAll('form[data-ajax]').forEach(form => {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('[type=submit]');
    if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
    try {
      const res = await fetch('https://formspree.io/f/mwvyjqyv', {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        form.style.display = 'none';
        const success = form.closest('.form-container, .form-wrap')?.querySelector('.form-success');
        if (success) success.style.display = 'block';
      } else {
        if (btn) { btn.disabled = false; btn.textContent = 'Try Again'; }
        alert('Something went wrong. Please email leo@leofalkovsky.com directly.');
      }
    } catch {
      if (btn) { btn.disabled = false; btn.textContent = 'Try Again'; }
      alert('Connection error. Please email leo@leofalkovsky.com directly.');
    }
  });
});

// ── SCROLL REVEAL ─────────────────────────────────────────────────
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, (i % 4) * 80);
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll(
  '.card, .testimonial-card, .process-step, .loc-card, .blog-card, .calc-tab-panel'
).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(22px)';
  el.style.transition = 'opacity .45s ease, transform .45s ease';
  revealObs.observe(el);
});

// ── BAR CHART ANIMATION ───────────────────────────────────────────
const barObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.bar-fill').forEach(bar => {
        const target = bar.getAttribute('data-width') || bar.style.width || '0%';
        bar.style.width = '0%';
        requestAnimationFrame(() => setTimeout(() => { bar.style.width = target; }, 50));
      });
      barObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.bar-chart').forEach(el => {
  el.querySelectorAll('.bar-fill').forEach(b => {
    b.setAttribute('data-width', b.style.width);
    b.style.width = '0%';
  });
  barObs.observe(el);
});

// ── CALCULATOR TABS ───────────────────────────────────────────────
(function () {
  const tabs = document.querySelectorAll('.calc-tab');
  const panels = document.querySelectorAll('.calc-tab-panel');
  if (!tabs.length) return;
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.style.display = 'none');
      tab.classList.add('active');
      const target = document.getElementById(tab.getAttribute('data-panel'));
      if (target) { target.style.display = 'block'; target.style.opacity = '1'; target.style.transform = 'translateY(0)'; }
    });
  });
  if (tabs[0]) tabs[0].click();
})();

// ── CALCULATOR UTILITIES ──────────────────────────────────────────
function canadianMonthlyRate(annualPct) {
  // Canadian standard: semi-annual compounding → effective monthly rate
  // (1 + i_m)^12 = (1 + annualPct/200)^2  →  i_m = (1 + annualPct/200)^(1/6) - 1
  return Math.pow(1 + annualPct / 200, 1 / 6) - 1;
}
function monthlyPayment(P, r, n) {
  if (r === 0) return P / n;
  return P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
}
function totalInterest(P, r, n) {
  return monthlyPayment(P, r, n) * n - P;
}
function fmt(n)  { return Math.abs(n).toLocaleString('en-CA', { maximumFractionDigits: 0 }); }
function fmtC(n) { return (n < 0 ? '-$' : '$') + fmt(n); }
function fmtPct(n){ return (Math.round(n * 10) / 10).toFixed(1) + '%'; }
function getVal(form, name) { return parseFloat(form.querySelector(`[name="${name}"]`)?.value) || 0; }
function getInt(form, name) { return parseInt(form.querySelector(`[name="${name}"]`)?.value) || 0; }
function setEl(id, text) { const el = document.getElementById(id); if (el) el.textContent = text; }
function showEl(id) { const el = document.getElementById(id); if (el) el.style.display = 'block'; }

// ── AFFORDABILITY CALCULATOR ──────────────────────────────────────
function calcAfford() {
  const form = document.getElementById('calc-afford');
  if (!form) return;

  const inc1  = getVal(form, 'af-inc1');
  const inc2  = getVal(form, 'af-inc2');
  const debts = getVal(form, 'af-debts');
  const rate  = getVal(form, 'af-rate')  || 4.99;
  const amort = getInt(form, 'af-amort') || 25;
  const tax   = getVal(form, 'af-tax');
  const heat  = getVal(form, 'af-heat') || 150;
  const condo = getVal(form, 'af-condo');

  const grossMonthly = (inc1 + inc2) / 12;
  const qualRate = rate + 2;
  const r = canadianMonthlyRate(qualRate);
  const n = amort * 12;

  // GDS = (PITH + 50% condo fees) / gross monthly — heat is the H in PITH
  const fixedCosts = (tax / 12) + heat + (condo * 0.5);

  // GDS: (payment + fixedCosts) / grossMonthly ≤ 39%
  const maxPmtGDS = grossMonthly * 0.39 - fixedCosts;
  // TDS: (payment + fixedCosts + debts) / grossMonthly ≤ 44%
  const maxPmtTDS = grossMonthly * 0.44 - fixedCosts - debts;
  const maxPmt = Math.min(maxPmtGDS, maxPmtTDS);

  if (maxPmt <= 0) {
    const w = document.getElementById('af-warning');
    if (w) { w.style.display = 'block'; w.textContent = 'Monthly obligations exceed the qualifying ratio for this income level. Try reducing debts or adding a co-applicant.'; }
    showEl('afford-results');
    document.getElementById('afford-placeholder').style.display = 'none';
    return;
  }

  const maxMortgage = maxPmt * (1 - Math.pow(1 + r, -n)) / r;
  const actualPmt = monthlyPayment(maxMortgage, canadianMonthlyRate(rate), n);

  setEl('af-stress',   qualRate.toFixed(2) + '%');
  setEl('af-max-pmt', '$' + fmt(actualPmt) + ' / mo');
  setEl('af-max-mort', '$' + fmt(maxMortgage));

  const warn = document.getElementById('af-warning');
  if (warn) warn.style.display = 'none';
  showEl('afford-results');
  showEl('afford-cta');
  document.getElementById('afford-placeholder').style.display = 'none';
}

// ── MORTGAGE PAYMENT CALCULATOR ──────────────────────────────────
function calcMortgagePayment() {
  const form = document.getElementById('calc-mortgage');
  if (!form) return;
  const propertyValue = getVal(form, 'mp-value');
  const downPayment   = getVal(form, 'mp-down');
  const rate          = getVal(form, 'mp-rate') || 4.99;
  const amort         = getInt(form, 'mp-amort') || 25;
  const term          = getInt(form, 'mp-term') || 5;
  const freq          = form.querySelector('[name="mp-freq"]')?.value || 'biweekly-accel';
  if (propertyValue <= 0) return;
  const mortgageBase = Math.max(0, propertyValue - downPayment);
  const downPct      = (downPayment / propertyValue) * 100;
  const hint = document.getElementById('mp-down-hint');
  if (hint) hint.textContent = downPct.toFixed(1) + '% of purchase price';
  // CMHC: required if down < 20% and property ≤ $1.5M and down ≥ 5%
  let cmhcRate = 0;
  if (downPct < 20 && propertyValue < 1500000 && downPct >= 5) {
    if (downPct >= 15) cmhcRate = 0.028;
    else if (downPct >= 10) cmhcRate = 0.031;
    else cmhcRate = 0.04;
  }
  const cmhcPremium   = mortgageBase * cmhcRate;
  const totalMortgage = mortgageBase + cmhcPremium;

  // Canadian semi-annual compounding → per-period rates
  const EAR  = Math.pow(1 + rate / 200, 2) - 1;
  const r_m  = canadianMonthlyRate(rate);
  const r_sm = Math.pow(1 + EAR, 1 / 24) - 1;
  const r_bw = Math.pow(1 + EAR, 1 / 26) - 1;
  const r_w  = Math.pow(1 + EAR, 1 / 52) - 1;

  const n_m  = amort * 12;
  const pmt_m  = monthlyPayment(totalMortgage, r_m,  n_m);
  const pmt_sm = monthlyPayment(totalMortgage, r_sm, amort * 24);
  const pmt_bw = monthlyPayment(totalMortgage, r_bw, amort * 26);
  const pmt_w  = monthlyPayment(totalMortgage, r_w,  amort * 52);
  const pmt_bwa = pmt_m / 2;   // accelerated = monthly ÷ 2 paid every 2 weeks
  const pmt_wa  = pmt_m / 4;   // accelerated = monthly ÷ 4 paid every week

  const freqDef = {
    'monthly':        { pmt: pmt_m,   label: 'Monthly Payment',               n: n_m,          r: r_m  },
    'semi-monthly':   { pmt: pmt_sm,  label: 'Semi-Monthly Payment',          n: amort * 24,   r: r_sm },
    'biweekly':       { pmt: pmt_bw,  label: 'Bi-Weekly Payment',             n: amort * 26,   r: r_bw },
    'biweekly-accel': { pmt: pmt_bwa, label: 'Bi-Weekly Accelerated Payment', n: null,         r: r_bw },
    'weekly':         { pmt: pmt_w,   label: 'Weekly Payment',                n: amort * 52,   r: r_w  },
    'weekly-accel':   { pmt: pmt_wa,  label: 'Weekly Accelerated Payment',    n: null,         r: r_w  },
  };
  const sel = freqDef[freq] || freqDef['monthly'];
  const selectedPmt = sel.pmt;

  // Actual number of periods (accelerated pays off early)
  let totalPeriods;
  if (sel.n === null) {
    totalPeriods = selectedPmt > totalMortgage * sel.r
      ? -Math.log(1 - totalMortgage * sel.r / selectedPmt) / Math.log(1 + sel.r)
      : (freq === 'biweekly-accel' ? amort * 26 : amort * 52);
  } else {
    totalPeriods = sel.n;
  }
  const totalInterestPaid = selectedPmt * totalPeriods - totalMortgage;
  const totalLoanCost     = totalMortgage + Math.max(0, totalInterestPaid);

  const cmhcRow = document.getElementById('mp-cmhc-row');
  if (cmhcPremium > 0) {
    setEl('mp-cmhc', '$' + fmt(cmhcPremium) + ' (' + (cmhcRate * 100).toFixed(2) + '%)');
    if (cmhcRow) cmhcRow.style.display = 'flex';
  } else {
    if (cmhcRow) cmhcRow.style.display = 'none';
  }
  setEl('mp-down-display',  '$' + fmt(downPayment) + ' (' + downPct.toFixed(1) + '%)');
  setEl('mp-mortgage',      '$' + fmt(mortgageBase));
  setEl('mp-total-mort',    '$' + fmt(totalMortgage));
  setEl('mp-freq-label',    sel.label);
  setEl('mp-monthly',       '$' + fmt(selectedPmt));
  setEl('mp-num-payments',  Math.ceil(totalPeriods).toLocaleString('en-CA') + ' payments');
  setEl('mp-total-cost',    '$' + fmt(totalLoanCost));
  setEl('mp-total-int',     '$' + fmt(Math.max(0, totalInterestPaid)));

  buildAmortTable(totalMortgage, r_m, term, amort);
}

function buildAmortTable(P, r_m, termYears, amortYears) {
  const wrap  = document.getElementById('mp-amort-wrap');
  const tbody = document.getElementById('mp-amort-tbody');
  if (!wrap || !tbody) return;
  const n = amortYears * 12;
  const pmt = monthlyPayment(P, r_m, n);
  let balance = P;
  const startYear = new Date().getFullYear();
  let html = '';
  for (let yr = 1; yr <= amortYears && balance > 0.5; yr++) {
    let yearPmt = 0, yearPrincipal = 0, yearInterest = 0;
    for (let m = 0; m < 12; m++) {
      if (balance < 0.01) break;
      const interest  = balance * r_m;
      const principal = Math.min(pmt - interest, balance);
      yearInterest   += interest;
      yearPrincipal  += principal;
      yearPmt        += Math.min(pmt, balance + interest);
      balance        -= principal;
    }
    balance = Math.max(0, balance);
    const isTermEnd = termYears > 0 && yr === termYears;
    html += `<tr${isTermEnd ? ' class="amort-term-row"' : ''}>
      <td>${startYear + yr - 1}</td>
      <td>$${fmt(yearPmt)}</td>
      <td>$${fmt(yearPrincipal)}</td>
      <td>$${fmt(yearInterest)}</td>
      <td>${balance < 1 ? '—' : '$' + fmt(balance)}</td>
    </tr>`;
    if (isTermEnd) {
      html += `<tr class="amort-term-marker"><td colspan="5">↑ End of ${termYears}-year term — mortgage renewal required</td></tr>`;
    }
  }
  tbody.innerHTML = html;
  wrap.style.display = 'block';
}

// ── LAND TRANSFER TAX CALCULATOR ─────────────────────────────────
function ontarioLTT(price) {
  let t = 0;
  if (price > 2000000) t += (price - 2000000) * 0.025;
  if (price > 400000)  t += (Math.min(price, 2000000) - 400000) * 0.02;
  if (price > 250000)  t += (Math.min(price, 400000) - 250000) * 0.015;
  if (price > 55000)   t += (Math.min(price, 250000) - 55000) * 0.01;
  t += Math.min(price, 55000) * 0.005;
  return t;
}
function calcLandTransferTax() {
  const form = document.getElementById('calc-ltt');
  if (!form) return;
  const price    = getVal(form, 'ltt-price');
  const location = form.querySelector('[name="ltt-location"]')?.value || 'ontario';
  const isFTB    = form.querySelector('[name="ltt-ftb"]')?.value === 'yes';
  const isToronto = location === 'toronto';
  if (price <= 0) return;
  const onLTT  = ontarioLTT(price);
  const torLTT = isToronto ? ontarioLTT(price) : 0;
  const onRebate  = isFTB ? Math.min(onLTT,  4000) : 0;
  const torRebate = (isFTB && isToronto) ? Math.min(torLTT, 4475) : 0;
  const total = onLTT + torLTT - onRebate - torRebate;
  setEl('ltt-ontario', '$' + fmt(onLTT));
  const torRow = document.getElementById('ltt-toronto-row');
  if (isToronto) {
    if (torRow) torRow.style.display = 'flex';
    setEl('ltt-toronto', '$' + fmt(torLTT));
  } else {
    if (torRow) torRow.style.display = 'none';
  }
  const rebateOnRow = document.getElementById('ltt-rebate-on-row');
  if (isFTB && onRebate > 0) {
    if (rebateOnRow) rebateOnRow.style.display = 'flex';
    setEl('ltt-rebate-on', '−$' + fmt(onRebate));
  } else {
    if (rebateOnRow) rebateOnRow.style.display = 'none';
  }
  const rebateTorRow = document.getElementById('ltt-rebate-tor-row');
  if (isFTB && isToronto && torRebate > 0) {
    if (rebateTorRow) rebateTorRow.style.display = 'flex';
    setEl('ltt-rebate-tor', '−$' + fmt(torRebate));
  } else {
    if (rebateTorRow) rebateTorRow.style.display = 'none';
  }
  setEl('ltt-total', '$' + fmt(total));
  const note = document.getElementById('ltt-note');
  if (note) {
    note.textContent = isToronto
      ? 'Toronto buyers pay both Ontario provincial and City of Toronto municipal LTT on every purchase.'
      : 'Ontario LTT is due on closing. It is not financed into your mortgage.';
  }
}

// ── PAYMENT SCHEDULE CALCULATOR ───────────────────────────────────
function calcPayment() {
  const form = document.getElementById('calc-payment');
  if (!form) return;

  const P     = getVal(form, 'pmt-amount') || 500000;
  const rate  = getVal(form, 'pmt-rate')   || 4.99;
  const amort = getInt(form, 'pmt-amort')  || 25;
  const freq  = form.querySelector('[name="pmt-freq"]')?.value || 'biweekly-accel';

  const n = amort * 12;
  const r_m = canadianMonthlyRate(rate);

  // Effective annual rate from semi-annual compounding
  const EAR = Math.pow(1 + rate / 200, 2) - 1;

  // Per-period rates
  const r_bw = Math.pow(1 + EAR, 1 / 26) - 1;  // bi-weekly
  const r_w  = Math.pow(1 + EAR, 1 / 52) - 1;  // weekly

  // Standard payments
  const pmt_m   = monthlyPayment(P, r_m, n);
  const pmt_bw  = monthlyPayment(P, r_bw, amort * 26);
  const pmt_w   = monthlyPayment(P, r_w,  amort * 52);

  // Accelerated payments = monthly / divisor  (makes 13 months/yr)
  const pmt_bwa = pmt_m / 2;
  const pmt_wa  = pmt_m / 4;

  // Total interest for monthly
  const int_m = pmt_m * n - P;

  // Periods for accelerated bi-weekly to payoff
  const n_bwa = pmt_bwa > P * r_bw
    ? -Math.log(1 - P * r_bw / pmt_bwa) / Math.log(1 + r_bw)
    : amort * 26;
  const int_bwa = pmt_bwa * n_bwa - P;

  // Periods for accelerated weekly to payoff
  const n_wa = pmt_wa > P * r_w
    ? -Math.log(1 - P * r_w / pmt_wa) / Math.log(1 + r_w)
    : amort * 52;
  const int_wa = pmt_wa * n_wa - P;

  // Time saved (bi-weekly accel vs monthly)
  const yearsSaved = amort - n_bwa / 26;
  const fullYears  = Math.floor(yearsSaved);
  const months     = Math.round((yearsSaved - fullYears) * 12);
  const timeSavedStr = fullYears > 0
    ? fullYears + ' yr' + (fullYears !== 1 ? 's' : '') + (months > 0 ? ', ' + months + ' mo' : '')
    : months + ' months';

  setEl('pmt-monthly',       '$' + fmt(pmt_m)   + ' / mo');
  setEl('pmt-biweekly',      '$' + fmt(pmt_bw)  + ' / 2 wks');
  setEl('pmt-biweekly-accel','$' + fmt(pmt_bwa) + ' / 2 wks');
  setEl('pmt-weekly',        '$' + fmt(pmt_w)   + ' / wk');
  setEl('pmt-weekly-accel',  '$' + fmt(pmt_wa)  + ' / wk');

  setEl('pmt-int-monthly',   '$' + fmt(int_m));
  setEl('pmt-int-bwa',       '$' + fmt(int_bwa));
  setEl('pmt-int-saved',     '$' + fmt(int_m - int_bwa));
  setEl('pmt-time-saved',    timeSavedStr);

  // Selected frequency highlight
  const labels = {
    'monthly':        ['Monthly Payment',           '$' + fmt(pmt_m),   'per month'],
    'biweekly':       ['Bi-Weekly Payment',          '$' + fmt(pmt_bw),  'every 2 weeks'],
    'biweekly-accel': ['Bi-Weekly Accelerated ★',   '$' + fmt(pmt_bwa), 'every 2 weeks — saves ' + timeSavedStr],
    'weekly':         ['Weekly Payment',             '$' + fmt(pmt_w),   'every week'],
    'weekly-accel':   ['Weekly Accelerated ★',      '$' + fmt(pmt_wa),  'every week — saves ' + timeSavedStr],
  };
  const sel = labels[freq] || labels['biweekly-accel'];
  setEl('pmt-selected-lbl',  sel[0]);
  setEl('pmt-selected-val',  sel[1]);
  setEl('pmt-selected-freq', sel[2]);

  showEl('payment-results');
  showEl('payment-cta');
}

// ── 1. MANULIFE ONE CALCULATOR ────────────────────────────────────
(function () {
  const form = document.getElementById('calc-m1');
  if (!form) return;

  function run() {
    const balance  = getVal(form, 'm1-balance')  || 500000;
    const rate     = getVal(form, 'm1-rate')     || 5.49;
    const income   = getVal(form, 'm1-income')   || 7000;
    const spending = getVal(form, 'm1-spending') || 5500;
    const amortYrs = getInt(form, 'm1-amort')    || 25;

    const r = canadianMonthlyRate(rate);
    const n = amortYrs * 12;
    const pmt = monthlyPayment(balance, r, n);
    const tradInt = pmt * n - balance;
    const surplus = Math.max(0, income - spending);

    // M1 simulation: surplus sits in account reducing effective balance
    let bal = balance;
    let m1Int = 0;
    let months = 0;
    while (bal > 1 && months < n * 2) {
      const effectiveBal = Math.max(0, bal - surplus);
      const interest = effectiveBal * r;
      const principal = pmt - effectiveBal * r;
      m1Int += interest;
      bal -= Math.min(principal + surplus * r, bal); // surplus reduces faster
      // Simplified: treat surplus as extra principal each period
      bal = Math.max(0, bal - surplus * 0.08);
      months++;
    }

    const saved = tradInt - m1Int;
    const yrsSaved = ((n - months) / 12).toFixed(1);
    const m1Yrs = Math.floor(months / 12);
    const m1Mo  = months % 12;

    setEl('m1-trad-int',   fmtC(tradInt));
    setEl('m1-trad-yrs',   amortYrs + ' years');
    setEl('m1-new-int',    fmtC(Math.max(0, m1Int)));
    setEl('m1-new-yrs',    m1Yrs + ' yrs ' + m1Mo + ' mo');
    setEl('m1-int-saved',  fmtC(Math.max(0, saved)));
    setEl('m1-yrs-saved',  Math.max(0, yrsSaved) + ' years');
    showEl('m1-results');
    showEl('m1-cta');
  }

  form.querySelectorAll('input, select').forEach(el => el.addEventListener('input', run));
  run();
})();

// ── 2. REFINANCE CALCULATOR ───────────────────────────────────────
(function () {
  const form = document.getElementById('calc-refi');
  if (!form) return;

  function run() {
    const balance    = getVal(form, 'refi-balance')      || 400000;
    const curRate    = getVal(form, 'refi-cur-rate')     || 6.5;
    const curAmort   = getInt(form, 'refi-cur-amort')    || 20;
    const newRate    = getVal(form, 'refi-new-rate')     || 5.0;
    const newAmort   = getInt(form, 'refi-new-amort')    || 25;
    const penalty    = getVal(form, 'refi-penalty')      || 4000;
    const costs      = getVal(form, 'refi-costs')        || 1500;

    const rCur = canadianMonthlyRate(curRate);
    const rNew = canadianMonthlyRate(newRate);
    const newBalance = balance + penalty + costs;
    const curPmt = monthlyPayment(balance, rCur, curAmort * 12);
    const newPmt = monthlyPayment(newBalance, rNew, newAmort * 12);
    const monthly = curPmt - newPmt;
    const totalCosts = penalty + costs;
    const breakEven = monthly > 0 ? Math.ceil(totalCosts / monthly) : null;
    const curTotInt = totalInterest(balance, rCur, curAmort * 12);
    const newTotInt = totalInterest(newBalance, rNew, newAmort * 12);

    setEl('refi-cur-pmt',    fmtC(curPmt));
    setEl('refi-new-pmt',    fmtC(newPmt));
    setEl('refi-monthly',    fmtC(Math.abs(monthly)));
    setEl('refi-monthly-lbl', monthly >= 0 ? 'Monthly Cash Flow Gain' : 'Monthly Increase');
    setEl('refi-breakeven',  breakEven ? breakEven + ' months' : 'No break-even — costs exceed savings');
    setEl('refi-int-saved',  fmtC(curTotInt - newTotInt));
    setEl('refi-total-costs', fmtC(totalCosts));
    showEl('refi-results');
    showEl('refi-cta');
  }

  form.querySelectorAll('input, select').forEach(el => el.addEventListener('input', run));
  run();
})();

// ── 3. DEBT CONSOLIDATION CALCULATOR ─────────────────────────────
(function () {
  const form = document.getElementById('calc-debt');
  if (!form) return;

  function run() {
    const mortBal   = getVal(form, 'debt-mort-bal')   || 350000;
    const mortRate  = getVal(form, 'debt-mort-rate')  || 5.49;
    const amort     = getInt(form, 'debt-amort')      || 20;
    const cc1Bal    = getVal(form, 'debt-cc1-bal')    || 0;
    const cc1Rate   = getVal(form, 'debt-cc1-rate')   || 19.99;
    const cc2Bal    = getVal(form, 'debt-cc2-bal')    || 0;
    const cc2Rate   = getVal(form, 'debt-cc2-rate')   || 19.99;
    const carBal    = getVal(form, 'debt-car-bal')    || 0;
    const carRate   = getVal(form, 'debt-car-rate')   || 6.99;
    const otherBal  = getVal(form, 'debt-other-bal')  || 0;
    const otherRate = getVal(form, 'debt-other-rate') || 12.0;

    const r = canadianMonthlyRate(mortRate);
    const curMortPmt = monthlyPayment(mortBal, r, amort * 12);
    const curDebtPmts = [
      cc1Bal  > 0 ? Math.max(cc1Bal  * (cc1Rate  / 1200), cc1Bal  * 0.02) : 0,
      cc2Bal  > 0 ? Math.max(cc2Bal  * (cc2Rate  / 1200), cc2Bal  * 0.02) : 0,
      carBal  > 0 ? monthlyPayment(carBal, carRate / 1200, 60) : 0,
      otherBal > 0 ? Math.max(otherBal * (otherRate / 1200), otherBal * 0.02) : 0,
    ].reduce((a, b) => a + b, 0);

    const totalDebt = cc1Bal + cc2Bal + carBal + otherBal;
    const newBal = mortBal + totalDebt;
    const newPmt = monthlyPayment(newBal, r, amort * 12);
    const monthly = (curMortPmt + curDebtPmts) - newPmt;

    // 5-year interest comparison for high-rate debt
    const debtInt5yr = [
      totalInterest(cc1Bal,  cc1Rate  / 1200, 60),
      totalInterest(cc2Bal,  cc2Rate  / 1200, 60),
      totalInterest(carBal,  carRate  / 1200, 60),
      totalInterest(otherBal, otherRate / 1200, 60),
    ].filter(Boolean).reduce((a, b) => a + b, 0);
    const consolidatedInt5 = totalInterest(totalDebt, r, 60);

    setEl('debt-cur-pmt',    fmtC(curMortPmt + curDebtPmts));
    setEl('debt-new-pmt',    fmtC(newPmt));
    setEl('debt-monthly',    fmtC(Math.abs(monthly)));
    setEl('debt-total',      fmtC(totalDebt));
    setEl('debt-int-5yr',    fmtC(Math.max(0, debtInt5yr - consolidatedInt5)));
    showEl('debt-results');
    showEl('debt-cta');
  }

  form.querySelectorAll('input, select').forEach(el => el.addEventListener('input', run));
  run();
})();

// ── 4. HELOC CALCULATOR ───────────────────────────────────────────
(function () {
  const form = document.getElementById('calc-heloc');
  if (!form) return;

  function run() {
    const homeVal  = getVal(form, 'heloc-value')   || 700000;
    const mortBal  = getVal(form, 'heloc-bal')     || 400000;
    const helocRate = getVal(form, 'heloc-rate')   || 7.2;

    const equity   = homeVal - mortBal;
    const ltv      = (mortBal / homeVal) * 100;
    // OSFI: Max HELOC = 65% home value. Combined (mort + HELOC) ≤ 80% home value.
    const maxCombined = homeVal * 0.80;
    const maxHeloc = Math.max(0, Math.min(homeVal * 0.65, maxCombined - mortBal));
    const monthlyIntOnly = maxHeloc * (helocRate / 1200);

    setEl('heloc-equity',    fmtC(equity));
    setEl('heloc-ltv',       fmtPct(ltv));
    setEl('heloc-max',       fmtC(maxHeloc));
    setEl('heloc-int-only',  fmtC(monthlyIntOnly) + '/mo');
    setEl('heloc-status',    maxHeloc > 0 ? '✓ You qualify for a HELOC' : '✗ Insufficient equity — need LTV under 80%');
    showEl('heloc-results');
    showEl('heloc-cta');
  }

  form.querySelectorAll('input').forEach(el => el.addEventListener('input', run));
  run();
})();

// ── 5. MORTGAGE QUALIFIER ─────────────────────────────────────────
(function () {
  const form = document.getElementById('calc-qualify');
  if (!form) return;

  function run() {
    const income   = getVal(form, 'qual-income')    || 100000;
    const coIncome = getVal(form, 'qual-coincome')  || 0;
    const debts    = getVal(form, 'qual-debts')     || 0;
    const down     = getVal(form, 'qual-down')      || 100000;
    const contract = getVal(form, 'qual-rate')      || 5.49;
    const amort    = getInt(form, 'qual-amort')     || 25;
    const taxYr    = getVal(form, 'qual-tax')       || 4800;
    const heat     = getVal(form, 'qual-heat')      || 150;
    const condo    = getVal(form, 'qual-condo')     || 0;

    const totalGross   = income + coIncome;
    const monthlyGross = totalGross / 12;
    const stressRate   = contract + 2;
    const r = canadianMonthlyRate(stressRate);
    const n = amort * 12;

    // Housing costs required in GDS (Canadian standard)
    const fixedCosts = (taxYr / 12) + heat + (condo * 0.5);

    // GDS ≤ 39%: mortgage pmt + fixed costs ≤ 39% gross monthly
    const maxGDSpmt = monthlyGross * 0.39 - fixedCosts;
    // TDS ≤ 44%: mortgage pmt + fixed costs + debts ≤ 44% gross monthly
    const maxTDSpmt = monthlyGross * 0.44 - fixedCosts - debts;
    const maxPmt = Math.min(maxGDSpmt, maxTDSpmt);

    const factor = r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    const maxMort = factor > 0 && maxPmt > 0 ? maxPmt / factor : 0;
    const maxPurchase = maxMort + down;
    const actualGDS = ((maxPmt + fixedCosts) / (monthlyGross || 1)) * 100;
    const actualTDS = ((maxPmt + fixedCosts + debts) / (monthlyGross || 1)) * 100;

    setEl('qual-max-mort',    fmtC(maxMort));
    setEl('qual-max-purchase', fmtC(maxPurchase));
    setEl('qual-stress',      fmtPct(stressRate));
    setEl('qual-max-pmt',     fmtC(maxPmt));
    setEl('qual-gds',         fmtPct(actualGDS) + ' (max 39%)');
    setEl('qual-tds',         fmtPct(actualTDS) + ' (max 44%)');
    showEl('qual-results');
    showEl('qual-cta');
  }

  form.querySelectorAll('input, select').forEach(el => el.addEventListener('input', run));
  run();
})();

// ── 6. SMITH MANOEUVRE CALCULATOR ────────────────────────────────
(function () {
  const form = document.getElementById('calc-smith');
  if (!form) return;

  function run() {
    const mortBal    = getVal(form, 'sm-balance')  || 500000;
    const mortRate   = getVal(form, 'sm-mort-rate')|| 5.49;
    const returnRate = getVal(form, 'sm-return')   || 7.0;
    const taxBracket = getVal(form, 'sm-tax')      || 40;
    const years      = getInt(form, 'sm-years')    || 20;

    const r = canadianMonthlyRate(mortRate);
    const pmt = monthlyPayment(mortBal, r, 25 * 12);

    let mortBalance  = mortBal;
    let helocBalance = 0;
    let investVal    = 0;
    let totalRefunds = 0;
    let totalDeductibleInt = 0;

    for (let yr = 1; yr <= years; yr++) {
      let yearlyPrincipal = 0;
      for (let m = 0; m < 12; m++) {
        if (mortBalance <= 0) break;
        const interest   = mortBalance * r;
        const principal  = Math.min(pmt - interest, mortBalance);
        mortBalance     -= principal;
        yearlyPrincipal += principal;
      }
      // Re-borrow principal as HELOC → invest
      helocBalance += yearlyPrincipal;
      investVal    += yearlyPrincipal;
      // Tax refund on HELOC interest (investment loan = deductible)
      const helocInt = helocBalance * (mortRate / 100);
      totalDeductibleInt += helocInt;
      const refund = helocInt * (taxBracket / 100);
      totalRefunds += refund;
      // Reinvest refund + investment growth
      investVal = (investVal + refund) * (1 + returnRate / 100);
    }

    const netGain = investVal - helocBalance;

    setEl('sm-invest-val',  fmtC(investVal));
    setEl('sm-heloc-bal',   fmtC(helocBalance));
    setEl('sm-net-gain',    fmtC(netGain));
    setEl('sm-tax-refunds', fmtC(totalRefunds));
    setEl('sm-deduct-int',  fmtC(totalDeductibleInt));
    showEl('sm-results');
    showEl('sm-cta');
  }

  form.querySelectorAll('input').forEach(el => el.addEventListener('input', run));
  run();
})();

// ── IRD PENALTY CALCULATOR ────────────────────────────────────────
(function () {
  const form = document.getElementById('calc-ird');
  if (!form) return;

  const typeSelect    = form.querySelector('[name="ird-type"]');
  const lenderSelect  = form.querySelector('[name="ird-lender"]');
  const fixedSection  = document.getElementById('ird-fixed-section');
  const bigbankInputs = document.getElementById('ird-bigbank-inputs');
  const monoInputs    = document.getElementById('ird-monoline-inputs');
  const placeholder   = document.getElementById('ird-placeholder');

  function toggleInputs() {
    const isFixed = typeSelect.value === 'fixed';
    if (fixedSection)  fixedSection.style.display  = isFixed ? '' : 'none';
    if (bigbankInputs) bigbankInputs.style.display = (isFixed && lenderSelect.value === 'bigbank')   ? '' : 'none';
    if (monoInputs)    monoInputs.style.display    = (isFixed && lenderSelect.value === 'monoline')  ? '' : 'none';
  }

  function run() {
    const type       = typeSelect.value;
    const lender     = lenderSelect.value;
    const balance    = getVal(form, 'ird-balance')  || 400000;
    const contract   = getVal(form, 'ird-contract') || 5.49;
    const months     = getVal(form, 'ird-months')   || 24;
    const prepayPct  = getVal(form, 'ird-prepay')   || 0;

    // Prepayment privilege reduces the penalized principal
    const effBal = balance * (1 - prepayPct / 100);

    // 3-month interest: balance × annual_rate / 4 (simplified lender method)
    const threeMonth = effBal * (contract / 100) / 4;

    let irdAmt   = 0;
    let rateDiff = 0;

    if (type === 'fixed') {
      if (lender === 'bigbank') {
        // Big bank formula: IRD = (orig_posted − cur_posted) × balance × months/12
        // The discount you received is "locked in" — equivalent formula to the discount method
        const origPosted = getVal(form, 'ird-orig-posted') || 0;
        const curPosted  = getVal(form, 'ird-cur-posted')  || 0;
        rateDiff = origPosted - curPosted;
      } else {
        // Monoline: IRD = (contract_rate − lender_current_rate) × balance × months/12
        const curMono = getVal(form, 'ird-cur-mono') || 0;
        rateDiff = contract - curMono;
      }
      irdAmt = Math.max(0, rateDiff / 100 * effBal * months / 12);
    }

    const penalty = Math.max(threeMonth, irdAmt);

    let whichApplies;
    if (type === 'variable') {
      whichApplies = '3-month interest rule (variable mortgages only)';
    } else if (rateDiff <= 0) {
      whichApplies = '3-month interest applies — rates rose, no IRD';
    } else if (irdAmt > threeMonth) {
      whichApplies = 'IRD applies — greater than 3-month interest';
    } else {
      whichApplies = '3-month interest applies — greater than IRD';
    }

    let tip = '';
    if (type === 'variable') {
      tip = 'Variable-rate mortgages always use the 3-month interest penalty — no IRD. This is usually much cheaper than breaking a fixed mortgage.';
    } else if (rateDiff <= 0) {
      tip = 'Since current rates are equal to or higher than your rate, IRD is $0. Your penalty is just 3 months\' interest — a relatively low break cost.';
    } else if (lender === 'bigbank') {
      tip = 'Big bank IRD uses the original posted rate discount, which can make penalties 3–5× higher than a monoline. Use your full prepayment privilege before breaking.';
    } else {
      tip = 'Monoline penalties are based on actual market rates — typically much lower than big bank IRD. Use your prepayment privilege first to reduce the penalized balance.';
    }

    setEl('ird-eff-bal',  fmtC(effBal));
    setEl('ird-rate-diff', type === 'variable' ? 'N/A' : (rateDiff > 0 ? rateDiff.toFixed(2) + '%' : '0.00% (rates rose)'));
    setEl('ird-3mo',      fmtC(threeMonth));
    setEl('ird-ird-amt',  type === 'variable' ? 'N/A' : fmtC(irdAmt));
    setEl('ird-penalty',  fmtC(penalty));
    setEl('ird-which',    whichApplies);
    setEl('ird-tip',      tip);

    if (placeholder) placeholder.style.display = 'none';
    showEl('ird-results');
    showEl('ird-cta');
  }

  typeSelect.addEventListener('change',   () => { toggleInputs(); run(); });
  lenderSelect.addEventListener('change', () => { toggleInputs(); run(); });
  form.querySelectorAll('input').forEach(el => el.addEventListener('input', run));
  toggleInputs();
  run();
})();

// ── COOKIE CONSENT BANNER ────────────────────────────────────────
(function () {
  const KEY = 'lf_cookie_consent';
  if (localStorage.getItem(KEY)) return;

  const banner = document.createElement('div');
  banner.id = 'cookie-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-label', 'Cookie consent');
  banner.innerHTML =
    '<div id="cookie-banner-inner">' +
      '<p id="cookie-banner-text">We use Google Analytics to understand how visitors use this site. No personal information is collected. ' +
        '<a href="/contact.html" style="color:var(--gold);font-weight:600;">Learn more</a>.</p>' +
      '<div id="cookie-banner-btns">' +
        '<button id="cookie-decline">Decline</button>' +
        '<button id="cookie-accept">Accept</button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(banner);

  function dismiss(choice) {
    localStorage.setItem(KEY, choice);
    banner.classList.add('cookie-banner-hide');
    setTimeout(() => banner.remove(), 400);
  }

  document.getElementById('cookie-accept').addEventListener('click', () => dismiss('accepted'));
  document.getElementById('cookie-decline').addEventListener('click', () => dismiss('declined'));
}());

// ── GA4 CTA CLICK TRACKING ───────────────────────────────────────
(function () {
  if (typeof gtag !== 'function') return;
  const page = window.location.pathname.replace(/\/index\.html$/, '/') || '/';

  document.querySelectorAll(
    'a.btn-primary, button.btn-primary, a[href*="contact"], a[href*="apply"]'
  ).forEach(el => {
    el.addEventListener('click', function () {
      gtag('event', 'cta_click', {
        cta_text:     (el.textContent || '').trim().slice(0, 60),
        cta_href:     el.getAttribute('href') || '',
        page_path:    page,
      });
    });
  });

  // Track calculator results shown (intent signal)
  document.querySelectorAll('[id$="-results"]').forEach(panel => {
    const obs = new MutationObserver(mutations => {
      mutations.forEach(m => {
        if (m.type === 'attributes' && m.attributeName === 'style' &&
            panel.style.display !== 'none') {
          gtag('event', 'calculator_used', {
            calculator_id: panel.id,
            page_path:     page,
          });
          obs.disconnect();
        }
      });
    });
    obs.observe(panel, { attributes: true });
  });
}());

// ── SOCIAL SHARE ──────────────────────────────────────────────────
document.querySelectorAll('[data-share]').forEach(btn => {
  btn.addEventListener('click', () => {
    const type  = btn.getAttribute('data-share');
    const url   = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    const links = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter:  `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      email:    `mailto:?subject=${title}&body=Thought%20you%27d%20find%20this%20useful:%20${url}`,
    };
    if (links[type]) window.open(links[type], '_blank', 'width=600,height=440');
  });
});

// ── MULTI-STEP APPLICATION FORM ───────────────────────────────────
(function () {
  const wrapper = document.getElementById('application-form');
  if (!wrapper) return;

  const steps    = Array.from(wrapper.querySelectorAll('.app-step'));
  const bar      = document.getElementById('app-progress-bar');
  const barLabel = document.getElementById('app-progress-label');
  const stepDots = Array.from(document.querySelectorAll('.app-dot'));
  let current = 0;

  function goTo(n) {
    steps.forEach((s, i) => s.style.display = i === n ? 'block' : 'none');
    stepDots.forEach((d, i) => {
      d.classList.toggle('active', i === n);
      d.classList.toggle('done', i < n);
    });
    const pct = Math.round(((n + 1) / steps.length) * 100);
    if (bar) bar.style.width = pct + '%';
    if (barLabel) barLabel.textContent = `Step ${n + 1} of ${steps.length}`;
    current = n;
    window.scrollTo({ top: wrapper.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' });
  }

  wrapper.querySelectorAll('[data-next]').forEach(btn =>
    btn.addEventListener('click', () => { if (current < steps.length - 1) goTo(current + 1); })
  );
  wrapper.querySelectorAll('[data-prev]').forEach(btn =>
    btn.addEventListener('click', () => { if (current > 0) goTo(current - 1); })
  );

  const finalForm = wrapper.querySelector('form');
  if (finalForm) {
    finalForm.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = finalForm.querySelector('[type=submit]');
      if (btn) { btn.disabled = true; btn.textContent = 'Submitting…'; }
      try {
        const res = await fetch('https://formspree.io/f/mwvyjqyv', {
          method: 'POST',
          body: new FormData(finalForm),
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          wrapper.style.display = 'none';
          const success = document.getElementById('app-success');
          if (success) success.style.display = 'block';
        } else {
          if (btn) { btn.disabled = false; btn.textContent = 'Submit Application'; }
          alert('Something went wrong. Please email leo@leofalkovsky.com directly.');
        }
      } catch {
        if (btn) { btn.disabled = false; btn.textContent = 'Submit Application'; }
        alert('Connection error. Please email leo@leofalkovsky.com directly.');
      }
    });
  }

  goTo(0);
})();

// ── AUTO-RUN: Affordability & Payment calculators ─────────────────
(function() {
  const af = document.getElementById('calc-afford');
  if (af) {
    af.querySelectorAll('input, select').forEach(el => el.addEventListener('input', calcAfford));
    calcAfford();
  }
  const pmt = document.getElementById('calc-payment');
  if (pmt) {
    pmt.querySelectorAll('input, select').forEach(el => el.addEventListener('input', calcPayment));
    calcPayment();
  }
})();

// ── EMAIL OPT-IN (blog) ───────────────────────────────────────────
document.querySelectorAll('.optin-form').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    form.innerHTML = '<p style="text-align:center;color:var(--gold);font-weight:600;padding:12px 0">✓ You\'re on the list! Check your inbox.</p>';
  });
});

// ── MOBILE BOTTOM NAV ────────────────────────────────────────────
(function() {
  const path = window.location.pathname.replace(/\/index\.html$/, '/');
  const ICON_HOME = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>';
  const ICON_DOLLAR = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>';
  const ICON_REFRESH = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>';
  const ICON_CALC = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><rect x="8" y="6" width="8" height="4" rx="1"/><circle cx="9" cy="15" r="1.2" fill="currentColor" stroke="none"/><circle cx="12" cy="15" r="1.2" fill="currentColor" stroke="none"/><circle cx="15" cy="15" r="1.2" fill="currentColor" stroke="none"/><circle cx="9" cy="19" r="1.2" fill="currentColor" stroke="none"/><circle cx="12" cy="19" r="1.2" fill="currentColor" stroke="none"/><circle cx="15" cy="19" r="1.2" fill="currentColor" stroke="none"/></svg>';
  const ICON_PHONE = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>';

  const pages = [
    { href: '/',                  label: 'Home',       icon: ICON_HOME    },
    { href: '/manulife-one.html', label: 'Manulife',   icon: ICON_DOLLAR  },
    { href: '/refinance.html',    label: 'Refinance',  icon: ICON_REFRESH },
    { href: '/calculators.html',  label: 'Calculators',icon: ICON_CALC    },
    { href: '/contact.html',      label: 'Contact',    icon: ICON_PHONE   },
  ];

  function isActive(href) {
    if (href === '/') return path === '/' || path === '';
    return path.startsWith(href.replace('.html', ''));
  }

  const bnav = document.createElement('nav');
  bnav.id = 'bottom-nav';
  bnav.setAttribute('aria-label', 'Mobile navigation');
  bnav.innerHTML = '<div id="bottom-nav-inner">' +
    pages.map(p =>
      `<a href="${p.href}"${isActive(p.href) ? ' class="active"' : ''}>${p.icon}<span>${p.label}</span></a>`
    ).join('') +
  '</div>';
  document.body.appendChild(bnav);
}());


// ── AUTO-INIT CALCULATORS ─────────────────────────────────────────
if (document.getElementById('calc-mortgage')) calcMortgagePayment();
if (document.getElementById('calc-ltt'))      calcLandTransferTax();
