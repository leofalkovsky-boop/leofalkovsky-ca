'use client';

export default function Nav({ basePath = '' }: { basePath?: string }) {
  const p = basePath;
  return (
    <>
      <nav id="nav">
        <div className="nav-inner container">
          <a href={`${p}/`} className="nav-logo">
            <img
              src={`${p}/images/8twelve-logo.png`}
              alt="8Twelve Mortgage"
              className="brokerage-logo"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <div className="nav-logo-stack">
              <span className="nav-logo-name">Leo Falkovsky</span>
              <span className="nav-logo-tag">8Twelve Mortgage · FSRA #M09000003</span>
            </div>
          </a>
          <ul className="nav-links">
            <li><a href={`${p}/manulife-one/`}>Manulife One</a></li>
            <li><a href={`${p}/refinance/`}>Refinance</a></li>
            <li><a href={`${p}/calculators/`}>Calculators</a></li>
            <li><a href={`${p}/blog/`}>Blog</a></li>
            <li><a href={`${p}/about/`}>About</a></li>
          </ul>
          <a href={`${p}/contact/`} className="btn btn-primary nav-cta">Free Mortgage Review</a>
          <button className="hamburger" id="hamburgerBtn" aria-label="Open menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>
      <div className="nav-drawer" id="navDrawer">
        <button className="drawer-close" id="drawerClose">×</button>
        <a href={`${p}/manulife-one/`}>Manulife One</a>
        <a href={`${p}/refinance/`}>Refinance</a>
        <a href={`${p}/calculators/`}>Calculators</a>
        <a href={`${p}/blog/`}>Blog</a>
        <a href={`${p}/about/`}>About</a>
        <a href={`${p}/contact/`} className="btn btn-primary" style={{ marginTop: 8 }}>Free Mortgage Review</a>
      </div>
    </>
  );
}
