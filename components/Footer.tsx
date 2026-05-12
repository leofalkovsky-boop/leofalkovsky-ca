export default function Footer({ basePath = '' }: { basePath?: string }) {
  const p = basePath;
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand-name">Leo Falkovsky</div>
            <div className="footer-brand-tag">Mortgage Broker &amp; Real Estate Agent</div>
            <p className="footer-brand-desc">
              Barrie&rsquo;s specialist in Manulife One, Smith Manoeuvre, Cash Damming, and mortgage acceleration.
              Serving Barrie and Simcoe County.
            </p>
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            <div className="footer-links">
              <a href={`${p}/manulife-one/`}>Manulife One</a>
              <a href={`${p}/refinance/`}>Refinancing</a>
              <a href={`${p}/contact/`}>Home Purchase</a>
              <a href={`${p}/contact/`}>Renewals</a>
              <a href={`${p}/contact/`}>Investment Properties</a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Locations</h4>
            <div className="footer-links">
              <a href={`${p}/barrie/`}>Barrie</a>
              <a href={`${p}/innisfil/`}>Innisfil</a>
              <a href={`${p}/springwater/`}>Springwater</a>
              <a href={`${p}/oro-medonte/`}>Oro-Medonte</a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <div className="footer-links">
              <a href={`${p}/calculators/`}>Mortgage Calculators</a>
              <a href={`${p}/blog/`}>Mortgage Blog</a>
              <a href={`${p}/apply/`}>Apply Online</a>
              <a href={`${p}/about/`}>About Leo</a>
              <a href={`${p}/contact/`}>Contact</a>
            </div>
          </div>
        </div>
        <div className="footer-fsra">
          <strong style={{ color: 'rgba(255,255,255,.8)' }}>Licensing:</strong> Leo Falkovsky is a licensed
          Mortgage Broker in Ontario, regulated by FSRA. License #M09000003. Brokerage: 8Twelve Mortgage
          FSRA #13230. Licensed Real Estate Salesperson with 8Twelve Mortgage.
        </div>
        <div className="footer-divider" />
        <div className="footer-bottom">
          <span>© 2026 Leo Falkovsky · leofalkovsky.ca · All rights reserved</span>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms</a>
            <a href="#">FSRA Disclosure</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
