import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Mortgage Broker Barrie | Leo Falkovsky | 8Twelve Mortgage',
  description: "Leo Falkovsky is Barrie's trusted mortgage broker at 8Twelve Mortgage specializing in Manulife One, Smith Manoeuvre, Cash Damming and mortgage acceleration. Save thousands and own your home years sooner.",
  alternates: { canonical: 'https://leofalkovsky.ca/' },
  openGraph: {
    title: 'Leo Falkovsky | Mortgage Broker & Real Estate Agent | Barrie, ON',
    description: "Barrie's Manulife One, Smith Manoeuvre and mortgage acceleration specialist. Save tens of thousands in interest.",
    url: 'https://leofalkovsky.ca/',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': ['FinancialService', 'LocalBusiness'],
            '@id': 'https://leofalkovsky.ca/#business',
            name: 'Leo Falkovsky – Mortgage Broker & Real Estate Agent',
            description: "Barrie's specialist in Manulife One, Smith Manoeuvre, Cash Damming, and mortgage acceleration strategies.",
            url: 'https://leofalkovsky.ca',
            telephone: '+17051234567',
            email: 'leo@leofalkovsky.ca',
            image: 'https://leofalkovsky.ca/images/leo-falkovsky.jpg',
            priceRange: 'Free consultation',
            address: { '@type': 'PostalAddress', addressLocality: 'Barrie', addressRegion: 'ON', postalCode: 'L4N', addressCountry: 'CA' },
            areaServed: [
              { '@type': 'City', name: 'Barrie' },
              { '@type': 'City', name: 'Innisfil' },
              { '@type': 'City', name: 'Springwater' },
              { '@type': 'City', name: 'Oro-Medonte' },
              { '@type': 'AdministrativeArea', name: 'Simcoe County' },
            ],
            aggregateRating: { '@type': 'AggregateRating', ratingValue: '5.0', reviewCount: '47', bestRating: '5' },
          }),
        }}
      />

      <style>{`
        #hero {
          min-height:100vh;
          background:
            linear-gradient(105deg,rgba(20,81,126,.88) 0%,rgba(19,86,123,.72) 50%,rgba(0,26,63,.55) 100%),
            url('https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1900&q=85') center/cover no-repeat;
          padding:100px 0 60px;
        }
        .hero-split{display:grid;grid-template-columns:1.15fr 1fr;gap:48px;align-items:center;}
        @keyframes slideUp   {from{opacity:0;transform:translateY(36px);}to{opacity:1;transform:translateY(0);}}
        @keyframes slideRight{from{opacity:0;transform:translateX(40px);}to{opacity:1;transform:translateX(0);}}
        @keyframes floatY    {0%,100%{transform:translateY(0);}50%{transform:translateY(-14px);}}
        @keyframes pulse2    {0%,100%{opacity:1;}50%{opacity:.55;}}
        .hero-content{animation:slideUp .8s cubic-bezier(.22,1,.36,1) both;}
        .hero-right{animation:slideRight .8s .18s cubic-bezier(.22,1,.36,1) both;}
        .hero-card{background:rgba(255,255,255,.13);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.22);border-radius:24px;padding:36px 32px;color:var(--white);animation:floatY 5s ease-in-out infinite;}
        .hero-card-label{font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--gold-light);margin-bottom:20px;display:flex;align-items:center;gap:8px;}
        .hero-card-label::before{content:'';width:8px;height:8px;border-radius:50%;background:var(--gold);animation:pulse2 1.8s infinite;flex-shrink:0;}
        .hero-card-stat{margin-bottom:14px;padding-bottom:14px;border-bottom:1px solid rgba(255,255,255,.12);}
        .hero-card-stat:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0;}
        .hero-card-num{font-family:'Playfair Display',serif;font-size:2rem;color:var(--gold);line-height:1;}
        .hero-card-desc{font-size:.78rem;color:rgba(255,255,255,.65);margin-top:3px;}
        .hero-card-cta{display:block;margin-top:24px;text-align:center;}
        .hero-badge-float{position:absolute;background:var(--white);border-radius:12px;padding:10px 16px;box-shadow:0 8px 24px rgba(0,0,0,.18);display:flex;align-items:center;gap:10px;font-size:.8rem;font-weight:600;color:var(--navy-dark);white-space:nowrap;}
        .hero-badge-float.top-right{top:-20px;right:-20px;animation:floatY 4.5s .8s ease-in-out infinite;}
        .hero-badge-float.bot-left{bottom:-16px;left:-16px;animation:floatY 5.5s 1.2s ease-in-out infinite;}
        .hbf-icon{width:32px;height:32px;border-radius:8px;background:var(--gold);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:1rem;}
        .hero-right-wrap{position:relative;}
        @media(max-width:900px){.hero-split{grid-template-columns:1fr;}.hero-right{display:none;}}
        .specialty-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(270px,1fr));gap:28px;}
        .spec-card{background:var(--white);border-radius:var(--radius-md);padding:40px 32px;box-shadow:var(--shadow-sm);border:1px solid var(--cream-dark);transition:var(--transition);position:relative;overflow:hidden;}
        .spec-card::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,var(--gold),var(--gold-light));transform:scaleX(0);transform-origin:left;transition:var(--transition);}
        .spec-card:hover{transform:translateY(-6px);box-shadow:var(--shadow-lg);}
        .spec-card:hover::before{transform:scaleX(1);}
        .spec-icon{width:56px;height:56px;background:rgba(46,191,165,.1);border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;margin-bottom:20px;}
        .spec-icon svg{width:28px;height:28px;fill:var(--gold);}
        .spec-tag{font-size:.67rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);margin-bottom:10px;display:block;}
        .spec-title{font-family:'Playfair Display',serif;font-size:1.25rem;color:var(--navy-dark);margin-bottom:12px;}
        .spec-desc{font-size:.88rem;color:var(--text-mid);line-height:1.7;margin-bottom:16px;}
        .spec-link{font-size:.84rem;font-weight:600;color:var(--gold-dark);display:inline-flex;align-items:center;gap:5px;transition:var(--transition);}
        .spec-link:hover{gap:8px;color:var(--gold);}
        .barrie-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px;}
        .barrie-card{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.14);border-radius:var(--radius-md);padding:28px 22px;transition:var(--transition);}
        .barrie-card:hover{background:rgba(255,255,255,.14);transform:translateY(-4px);}
        .bc-stat{font-family:'Playfair Display',serif;font-size:2rem;color:var(--gold);margin-bottom:5px;}
        .bc-label{font-size:.83rem;color:rgba(255,255,255,.65);line-height:1.45;}
        .section-navy{background:var(--navy);}
        .two-col{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:start;}
        @media(max-width:900px){.two-col{grid-template-columns:1fr;}}
        .vb-label{font-size:.72rem;font-weight:700;letter-spacing:.13em;text-transform:uppercase;color:var(--gold-light);}
        .num-list{display:flex;flex-direction:column;gap:20px;}
        .num-row{display:flex;gap:16px;align-items:flex-start;}
        .num-circle{width:36px;height:36px;border-radius:50%;background:var(--gold);color:var(--navy-dark);font-family:'Playfair Display',serif;font-size:1.05rem;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-weight:700;}
        .num-text{display:flex;flex-direction:column;gap:3px;padding-top:6px;}
        .num-text strong{font-size:.93rem;color:var(--white);font-weight:600;}
        .num-text span{font-size:.83rem;color:rgba(255,255,255,.6);line-height:1.55;}
        .lenders-row{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;}
        .lender-chip{background:var(--white);border:1px solid var(--cream-dark);border-radius:100px;padding:8px 18px;font-size:.83rem;font-weight:500;color:var(--navy);box-shadow:var(--shadow-sm);}
      `}</style>

      <Nav />

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="container">
          <div className="hero-split">
            <div className="hero-content">
              <div className="hero-badge">Barrie&rsquo;s Manulife One &amp; Smith Manoeuvre Specialist</div>
              <h1 className="hero-title">
                Pay Off Your<br />Barrie Mortgage<br /><span>Years Sooner.</span>
              </h1>
              <p className="hero-sub">Leo Falkovsky helps Barrie homeowners save tens of thousands in interest using Manulife One, the Smith Manoeuvre, and mortgage acceleration — without paying more each month.</p>
              <div className="hero-actions">
                <a href="/contact/" className="btn btn-primary btn-lg">Book a Free Mortgage Review</a>
                <a href="/manulife-one/" className="btn btn-outline btn-lg">Explore Manulife One →</a>
              </div>
              <div className="hero-stats">
                <div><div className="stat-num" data-count="60000" data-prefix="$" data-suffix="K+">$60K+</div><div className="stat-label">Average interest saved</div></div>
                <div><div className="stat-num" data-count="7" data-suffix=" yrs">7 yrs</div><div className="stat-label">Avg amortization cut</div></div>
                <div><div className="stat-num" data-count="50" data-suffix="+">50+</div><div className="stat-label">Lending partners</div></div>
                <div><div className="stat-num">5★</div><div className="stat-label">Google Reviews</div></div>
              </div>
            </div>
            <div className="hero-right">
              <div className="hero-right-wrap">
                <div className="hero-badge-float top-right">
                  <div className="hbf-icon">✓</div>
                  <div><div style={{ fontSize: '.7rem', color: 'var(--gold-dark)' }}>FSRA Licensed</div>Mortgage Broker</div>
                </div>
                <div className="hero-card">
                  <div className="hero-card-label">Live Client Savings Example</div>
                  <div className="hero-card-stat">
                    <div className="hero-card-num">$500K</div>
                    <div className="hero-card-desc">Manulife One — Barrie home, 5.49%</div>
                  </div>
                  <div className="hero-card-stat">
                    <div className="hero-card-num" style={{ color: '#5dd4bf' }}>$74,200</div>
                    <div className="hero-card-desc">Interest saved vs. traditional mortgage</div>
                  </div>
                  <div className="hero-card-stat">
                    <div className="hero-card-num" style={{ color: '#5dd4bf' }}>8.5 yrs</div>
                    <div className="hero-card-desc">Paid off years earlier — same income</div>
                  </div>
                  <a href="/contact/" className="btn btn-primary hero-card-cta" style={{ padding: '13px 24px', fontSize: '.9rem' }}>Run My Numbers Free →</a>
                </div>
                <div className="hero-badge-float bot-left">
                  <div className="hbf-icon">🏆</div>
                  <div><div style={{ fontSize: '.7rem', color: 'var(--text-light)' }}>Barrie&rsquo;s Top Rated</div>5.0 ★ Google Reviews</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="trust-bar">
        <div className="container trust-bar-inner">
          {[
            { icon: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z', label: 'FSRA Licensed Mortgage Broker' },
            { icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z', label: 'Manulife One Certified' },
            { icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z', label: 'AMP Designation' },
            { icon: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z', label: 'Licensed Real Estate Agent' },
          ].map(({ icon, label }) => (
            <div className="trust-item" key={label}>
              <div className="trust-icon"><svg viewBox="0 0 24 24"><path d={icon} /></svg></div>
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* SPECIALTIES */}
      <section style={{ background: 'var(--cream-light)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <span className="section-label">Core Specialties</span>
            <h2 className="section-title">Advanced Mortgage Strategies<br />Most Brokers Don&rsquo;t Offer</h2>
            <div className="gold-rule center" />
            <p className="section-sub" style={{ margin: '0 auto' }}>These four strategies alone have saved my clients millions in interest and built wealth that conventional mortgages simply can&rsquo;t match.</p>
          </div>
          <div className="specialty-grid">
            {[
              { tag: 'Signature Specialty', title: 'Manulife One', href: '/manulife-one/', desc: 'The all-in-one banking account that combines your mortgage, line of credit, and daily banking. Your paycheque deposits directly reduce your mortgage balance — automatically cutting interest from day one.', icon: 'M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z' },
              { tag: 'Tax Strategy', title: 'Smith Manoeuvre', href: '/contact/', desc: "Canada's most powerful wealth-building mortgage strategy. Convert your non-deductible mortgage debt into tax-deductible investment loans while simultaneously building a tax-sheltered portfolio.", icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z' },
              { tag: 'Business Strategy', title: 'Cash Damming', href: '/contact/', desc: 'For self-employed Canadians: restructure how you use business and personal cash flows to make your mortgage interest tax-deductible — without changing how much you spend or earn.', icon: 'M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z' },
              { tag: 'Acceleration', title: 'Mortgage Acceleration', href: '/calculators/', desc: 'Custom acceleration roadmaps using bi-weekly payments, lump-sum top-ups, and strategic rate shopping to shave 5–10 years off your mortgage without increasing your cash outflow.', icon: 'M13 2.05v2.02c3.95.49 7 3.85 7 7.93 0 3.21-1.81 6-4.72 7.28L13 17v5h5l-1.22-1.22C19.91 19.07 22 15.76 22 12c0-5.18-3.95-9.45-9-9.95zM11 2.05C5.95 2.55 2 6.82 2 12c0 3.76 2.09 7.07 5.22 8.78L6 22h5V2.05z' },
            ].map(({ tag, title, href, desc, icon }) => (
              <div className="spec-card" key={title}>
                <div className="spec-icon"><svg viewBox="0 0 24 24"><path d={icon} /></svg></div>
                <span className="spec-tag">{tag}</span>
                <h2 className="spec-title">{title}</h2>
                <p className="spec-desc">{desc}</p>
                <a href={href} className="spec-link">Learn more →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section style={{ background: 'var(--white)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="section-label">Full Service</span>
            <h2 className="section-title">Everything You Need Under One Roof</h2>
            <div className="gold-rule center" />
          </div>
          <div className="services-grid">
            {[
              { title: 'Home Purchase', desc: 'First-time buyer or move-up — I source the best rate across 50+ lenders and guide you from pre-approval to keys in hand.', icon: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' },
              { title: 'Mortgage Renewal', desc: "Don't auto-renew with your bank. At renewal, I shop the full market and often save clients 0.5–1.0% on their rate.", icon: 'M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z' },
              { title: 'Refinancing', desc: 'Lower your rate, access equity, or consolidate debt. I run a full cost-benefit analysis before recommending a refinance.', icon: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z' },
              { title: 'Investment Properties', desc: 'Expand your Barrie-area portfolio with financing strategies designed for investors — including cash-out refinancing and portfolio lenders.', icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z' },
              { title: 'Real Estate Services', desc: 'As a licensed real estate agent, I can help you buy or sell your Barrie home — a truly seamless mortgage + real estate experience.', icon: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z' },
            ].map(({ title, desc, icon }) => (
              <div className="card" key={title}>
                <div className="card-icon"><svg viewBox="0 0 24 24"><path d={icon} /></svg></div>
                <h3 className="card-title">{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
            <div className="card dark">
              <div className="card-icon"><svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4l5 2.18V11c0 3.5-2.33 6.79-5 7.93-2.67-1.14-5-4.43-5-7.93V7.18L12 5z" /></svg></div>
              <div className="card-badge">No Cost to You</div>
              <h3 className="card-title">Broker Advantage</h3>
              <p>My service is free — I&rsquo;m paid by lenders, never by you. My recommendations are always 100% in your best interest.</p>
              <a href="/contact/" className="btn btn-primary btn-sm" style={{ marginTop: 18 }}>Book Free Review</a>
            </div>
          </div>
        </div>
      </section>

      {/* LOCAL EXPERTISE */}
      <section className="section-navy" style={{ padding: '88px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-label">Local Expertise</span>
          <h2 className="section-title" style={{ color: 'var(--white)' }}>Barrie &amp; Simcoe County — Deeply Rooted</h2>
          <div className="gold-rule center" />
          <p className="section-sub" style={{ color: 'rgba(255,255,255,.7)', margin: '0 auto 52px' }}>I live here, work here, and know every neighbourhood. That local knowledge translates to better deal structuring, faster closings, and advice that&rsquo;s actually relevant to the Barrie market.</p>
          <div className="barrie-grid">
            {[
              { city: 'Barrie', desc: 'City of Barrie — primary market and home base', href: '/barrie/' },
              { city: 'Innisfil', desc: 'Innisfil, Alcona, Friday Harbour and surrounding areas', href: '/innisfil/' },
              { city: 'Springwater', desc: 'Midhurst, Elmvale, Minesing and Springwater Township', href: '/springwater/' },
              { city: 'Oro-Medonte', desc: 'Horseshoe Valley, Shanty Bay, Warminster', href: '/oro-medonte/' },
            ].map(({ city, desc, href }) => (
              <a href={href} className="barrie-card" key={city} style={{ textDecoration: 'none' }}>
                <div className="bc-stat">{city}</div>
                <div className="bc-label">{desc}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section style={{ background: 'var(--cream-light)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <span className="section-label">How It Works</span>
            <h2 className="section-title">Simple. Transparent. Fast.</h2>
            <div className="gold-rule center" />
          </div>
          <div className="process-grid">
            {[
              { n: 1, title: 'Free Strategy Call', desc: '30 minutes. We discuss your goals, situation, and which advanced strategies apply to your financial picture.' },
              { n: 2, title: 'Full Market Analysis', desc: 'I compare 50+ lenders, model your Manulife One or Smith Manoeuvre savings, and present your best options clearly.' },
              { n: 3, title: 'Best Rate Secured', desc: 'I negotiate the best rate and terms, handle all paperwork, and keep you informed at every step.' },
              { n: 4, title: 'Funded & Supported', desc: "Mortgage funded. Annual reviews, renewal strategy, and acceleration tracking — I'm your advisor for life." },
            ].map(({ n, title, desc }) => (
              <div className="process-step" key={n}>
                <div className="process-num">{n}</div>
                <div className="process-step-title">{title}</div>
                <p className="process-step-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ background: 'var(--white)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <span className="section-label">Client Stories</span>
            <h2 className="section-title">What Barrie Homeowners Say</h2>
            <div className="gold-rule center" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(290px,1fr))', gap: 24 }}>
            {[
              { initials: 'SK', name: 'Sarah K.', loc: 'Barrie, ON — South End', quote: '"Leo set us up with Manulife One and we\'re on track to be mortgage-free 9 years ahead of schedule. The interest savings are over $80,000. I tell every homeowner I know."' },
              { initials: 'MT', name: 'Mike & Tanya R.', loc: 'Barrie, ON — Painswick', quote: '"Leo explained the Smith Manoeuvre in a way that finally clicked. We\'re now using our mortgage equity to invest in a diversified portfolio while getting the tax deductions. Game-changing."' },
              { initials: 'DJ', name: 'David J.', loc: 'Innisfil, ON', quote: '"Refinanced through Leo at renewal — he beat our bank\'s offer by 0.70%. That\'s over $24,000 in savings over 5 years. The process was seamless and took less than 2 weeks."' },
            ].map(({ initials, name, loc, quote }) => (
              <div className="testimonial-card" key={initials}>
                <div className="stars">{[...Array(5)].map((_, i) => <span key={i} className="star">★</span>)}</div>
                <p className="testimonial-text">{quote}</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{initials}</div>
                  <div><div className="author-name">{name}</div><div className="author-loc">{loc}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LENDERS */}
      <section style={{ background: 'var(--cream)', padding: '56px 0' }}>
        <div className="container">
          <p style={{ textAlign: 'center', fontSize: '.73rem', fontWeight: 700, letterSpacing: '.13em', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: 32 }}>50+ Lending Partners Including</p>
          <div className="lenders-row">
            {['Manulife Bank', 'TD Bank', 'RBC', 'BMO', 'Scotiabank', 'CIBC', 'First National', 'MCAP', 'Meridian CU', 'Street Capital', 'Equitable Bank', 'CMLS'].map(l => (
              <span className="lender-chip" key={l}>{l}</span>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section style={{ background: 'var(--cream-light)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <span className="section-label">Latest Insights</span>
              <h2 className="section-title">From the Mortgage Blog</h2>
              <div className="gold-rule" />
            </div>
            <a href="/blog/" className="btn btn-ghost">View All Posts →</a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 24 }}>
            {[
              { href: '/blog/payment-shock-2026/', bg: 'linear-gradient(135deg,var(--navy) 0%,var(--navy-mid) 100%)', textColor: 'var(--white)', cat: 'Market Update', title: 'Payment Shock 2026: Why Many Renewals May Jump 20%', excerpt: "60% of Canadian mortgages renew in 2025–2026. Five-year fixed borrowers face 15–20% payment increases. Here's how to prepare.", date: 'Oct 21, 2025' },
              { href: '/blog/stop-asking-good-time-to-buy/', bg: 'linear-gradient(135deg,var(--gold-dark) 0%,var(--gold) 100%)', textColor: 'var(--navy-dark)', cat: 'First-Time Buyers', title: "Stop Asking If It's a Good Time to Buy", excerpt: "Market timing creates hesitation, not clarity. Here's the better framework for evaluating whether a property is right for you now.", date: 'Jan 22, 2026' },
              { href: '/blog/flexibility-vs-indecision/', bg: 'linear-gradient(135deg,#2e80aa 0%,var(--navy) 100%)', textColor: 'var(--white)', cat: 'Mortgage Tips', title: 'The Difference Between Flexibility and Indecision', excerpt: "Keeping your options open is not a strategy. Here's how to tell genuine flexibility from financial avoidance — and why it costs real money.", date: 'Jan 8, 2026' },
            ].map(({ href, bg, textColor, cat, title, excerpt, date }) => (
              <a href={href} className="blog-card" key={href} style={{ background: 'var(--white)', borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--cream-dark)', transition: 'var(--transition)', display: 'block', textDecoration: 'none' }}>
                <div style={{ height: 180, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
                  <p style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.1rem', color: textColor, textAlign: 'center', lineHeight: 1.3 }}>{title}</p>
                </div>
                <div style={{ padding: 24 }}>
                  <span style={{ fontSize: '.7rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' as const, color: 'var(--gold)' }}>{cat}</span>
                  <p style={{ fontSize: '.85rem', color: 'var(--text-mid)', marginTop: 10, lineHeight: 1.65 }}>{excerpt}</p>
                  <p style={{ fontSize: '.78rem', color: 'var(--text-light)', marginTop: 14 }}>{date}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container cta-content" style={{ position: 'relative', zIndex: 1 }}>
          <span className="section-label">Get Started</span>
          <h2 className="section-title">Ready to Save Thousands<br />on Your Barrie Mortgage?</h2>
          <p className="cta-sub">Book a free 30-minute mortgage review. I&rsquo;ll analyze your current situation, show you your savings potential, and build a custom plan — no obligation, no pressure.</p>
          <div className="cta-actions">
            <a href="/contact/" className="btn btn-primary btn-lg">Book My Free Mortgage Review</a>
            <a href="/apply/" className="btn btn-outline btn-lg">Start My Application</a>
          </div>
          <div className="cta-contact-row">
            <div className="cta-contact-item"><span>📞</span><a href="tel:+17051234567">(705) 123-4567</a></div>
            <div className="cta-contact-item"><span>✉</span><a href="mailto:leo@leofalkovsky.ca">leo@leofalkovsky.ca</a></div>
            <div className="cta-contact-item"><span>📍</span><span>Barrie &amp; Simcoe County</span></div>
          </div>
        </div>
      </section>

      <Footer />
      <button id="scrollTop" aria-label="Back to top">
        <svg viewBox="0 0 24 24"><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" /></svg>
      </button>
    </>
  );
}
