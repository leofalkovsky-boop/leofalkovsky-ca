import type { Metadata } from 'next';
import { createReader } from '@keystatic/core/reader';
import config from '@/keystatic.config';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Mortgage Blog',
  description: 'Expert mortgage insights from Leo Falkovsky at 8Twelve Mortgage in Barrie. Articles on Manulife One, Smith Manoeuvre, investing, and Barrie market updates.',
  alternates: { canonical: 'https://leofalkovsky.ca/blog/' },
};

const CATEGORY_LABELS: Record<string, string> = {
  'mortgage-tips': 'Mortgage Tips',
  'market-update': 'Market Update',
  'first-time-buyers': 'First-Time Buyers',
  'refinancing': 'Refinancing',
  'investment': 'Investment',
  'wealth-building': 'Wealth Building',
  'cash-damming': 'Cash Damming',
  'smith-manoeuvre': 'Smith Manoeuvre',
};

export default async function BlogPage() {
  const reader = createReader(process.cwd(), config);
  const allPosts = await reader.collections.posts.all();
  const posts = allPosts
    .filter(p => p.entry.publishDate)
    .sort((a, b) => new Date(b.entry.publishDate!).getTime() - new Date(a.entry.publishDate!).getTime());

  return (
    <>
      <Nav />

      <section className="hero hero-inner" id="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">Mortgage Insights for Barrie &amp; Simcoe County</div>
            <h1 className="hero-title">The Leo Falkovsky<br /><span>Mortgage Blog</span></h1>
            <p className="hero-sub">Practical guides on Manulife One, Smith Manoeuvre, Cash Damming, market conditions, and wealth-building through real estate.</p>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--cream)', padding: '80px 0' }}>
        <div className="container">
          <div className="blog-layout">
            <div className="blog-grid">
              {posts.map(post => (
                <article className="blog-card" key={post.slug}>
                  <div className="blog-card-img" style={{ background: 'linear-gradient(135deg,var(--navy) 0%,var(--navy-mid) 100%)', color: 'var(--white)', fontSize: '2.5rem' }}>
                    📰
                  </div>
                  <div className="blog-card-body">
                    <div className="blog-cat">{CATEGORY_LABELS[post.entry.category] || post.entry.category}</div>
                    <h2 className="blog-title">
                      <a href={`/blog/${post.slug}/`}>{post.entry.title}</a>
                    </h2>
                    <p className="blog-excerpt">{post.entry.description}</p>
                    <div className="blog-meta">
                      <span>{post.entry.publishDate ? new Date(post.entry.publishDate).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}</span>
                      <span>·</span>
                      <span>{post.entry.readTime} min read</span>
                      <a href={`/blog/${post.slug}/`} style={{ marginLeft: 'auto' }}>Read →</a>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside>
              <div className="sidebar-box">
                <div className="sidebar-title">Free Mortgage Review</div>
                <p style={{ fontSize: '.85rem', color: 'var(--text-mid)', marginBottom: 16, lineHeight: 1.6 }}>
                  Book a 30-minute consultation. No obligation — just honest advice for your situation.
                </p>
                <a href="/contact/" className="btn btn-navy" style={{ width: '100%', justifyContent: 'center' }}>Book Free Review</a>
              </div>
              <div className="sidebar-box">
                <div className="sidebar-title">Categories</div>
                {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
                  <span key={value} className="cat-pill">{label}</span>
                ))}
              </div>
              <div className="sidebar-box">
                <div className="sidebar-title">Quick Calculator</div>
                <p style={{ fontSize: '.82rem', color: 'var(--text-mid)', marginBottom: 12 }}>
                  Estimate your mortgage payment instantly.
                </p>
                <a href="/calculators/" className="btn btn-ghost btn-sm" style={{ width: '100%', justifyContent: 'center' }}>Open Calculators</a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container cta-content" style={{ position: 'relative', zIndex: 1 }}>
          <span className="section-label">Work With Leo</span>
          <h2 className="section-title">Have a Mortgage Question?</h2>
          <p className="cta-sub">Every article leads to the same place — a strategy built around your specific numbers. Let&rsquo;s build yours.</p>
          <div className="cta-actions">
            <a href="/contact/" className="btn btn-primary btn-lg">Book Free Consultation</a>
            <a href="/calculators/" className="btn btn-outline btn-lg">Run the Numbers</a>
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
