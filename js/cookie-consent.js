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
    style.textContent = [
      '#lf-cookie{position:fixed;bottom:0;left:0;right:0;z-index:99999;',
      'background:#0a1428;border-top:1px solid rgba(109,154,220,.25);',
      'padding:18px 24px;display:flex;align-items:center;justify-content:space-between;',
      'gap:20px;flex-wrap:wrap;box-shadow:0 -4px 24px rgba(0,0,0,.35);',
      'animation:lf-slide-up .4s cubic-bezier(.22,1,.36,1) both;}',
      '@keyframes lf-slide-up{from{transform:translateY(100%);}to{transform:translateY(0);}}',
      '#lf-cookie p{margin:0;font-size:.82rem;color:rgba(255,255,255,.8);line-height:1.55;max-width:680px;}',
      '#lf-cookie p a{color:#6d9adc;text-decoration:underline;}',
      '#lf-cookie p a:hover{color:#fff;}',
      '.lf-ck-btns{display:flex;gap:10px;flex-shrink:0;}',
      '#lf-ck-accept{background:#4374bb;color:#fff;border:none;border-radius:6px;',
      'padding:9px 20px;font-size:.82rem;font-weight:600;cursor:pointer;',
      'transition:background .2s;white-space:nowrap;}',
      '#lf-ck-accept:hover{background:#2a528d;}',
      '#lf-ck-decline{background:transparent;color:rgba(255,255,255,.55);',
      'border:1px solid rgba(255,255,255,.2);border-radius:6px;',
      'padding:9px 16px;font-size:.82rem;cursor:pointer;',
      'transition:color .2s,border-color .2s;white-space:nowrap;}',
      '#lf-ck-decline:hover{color:rgba(255,255,255,.9);border-color:rgba(255,255,255,.5);}'
    ].join('');
    document.head.appendChild(style);

    var banner = document.createElement('div');
    banner.id = 'lf-cookie';
    banner.innerHTML =
      '<p>We use cookies to analyse site traffic via Google Analytics, helping us improve your experience.' +
      ' By clicking <strong>Accept</strong> you consent to analytics cookies in accordance with' +
      ' <a href="https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/" target="_blank" rel="noopener">PIPEDA</a>.</p>' +
      '<div class="lf-ck-btns">' +
      '<button id="lf-ck-decline">Decline</button>' +
      '<button id="lf-ck-accept">Accept Analytics</button>' +
      '</div>';
    document.body.appendChild(banner);

    document.getElementById('lf-ck-accept').addEventListener('click', function () {
      localStorage.setItem(KEY, 'accepted');
      loadGA();
      dismiss();
    });

    document.getElementById('lf-ck-decline').addEventListener('click', function () {
      localStorage.setItem(KEY, 'declined');
      dismiss();
    });

    function dismiss() {
      banner.style.transition = 'transform .35s ease, opacity .35s ease';
      banner.style.transform = 'translateY(100%)';
      banner.style.opacity = '0';
      setTimeout(function () { banner.remove(); }, 360);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', showBanner);
  } else {
    showBanner();
  }
})();
