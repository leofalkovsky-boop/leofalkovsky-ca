import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createReader } from '@keystatic/core/reader';
import Markdoc from '@markdoc/markdoc';
import React from 'react';
import config from '@/keystatic.config';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

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

export async function generateStaticParams() {
  const reader = createReader(process.cwd(), config);
  const posts = await reader.collections.posts.all();
  return posts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const reader = createReader(process.cwd(), config);
  const post = await reader.collections.posts.read(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `https://leofalkovsky.ca/blog/${slug}/` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://leofalkovsky.ca/blog/${slug}/`,
      type: 'article',
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const reader = createReader(process.cwd(), config);
  const post = await reader.collections.posts.read(slug);
  if (!post) notFound();

  const contentNode = await post.content();
  const renderable = Markdoc.renderers.react(contentNode as Parameters<typeof Markdoc.renderers.react>[0], React);

  const publishedDate = post.publishDate
    ? new Date(post.publishDate).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })
    : '';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.publishDate,
    author: { '@type': 'Person', name: 'Leo Falkovsky', url: 'https://leofalkovsky.ca/about/' },
    publisher: { '@type': 'Organization', name: '8Twelve Mortgage', url: 'https://leofalkovsky.ca' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://leofalkovsky.ca/blog/${slug}/` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />

      <section className="hero hero-inner" id="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">{CATEGORY_LABELS[post.category] || post.category}</div>
            <h1 className="hero-title" style={{ fontSize: 'clamp(1.8rem,4vw,3rem)' }}>{post.title}</h1>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', color: 'rgba(255,255,255,.7)', fontSize: '.85rem', marginTop: 16 }}>
              <span>By Leo Falkovsky</span>
              <span>·</span>
              <span>{publishedDate}</span>
              <span>·</span>
              <span>{post.readTime} min read</span>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '72px 0', background: 'var(--white)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 56, alignItems: 'start' }}>
            <article className="post-content" style={{
              fontSize: '1.02rem', lineHeight: 1.8, color: 'var(--text-mid)',
              maxWidth: '100%',
            }}>
              <style>{`
                .post-content h2 { font-family:'Playfair Display',serif; color:var(--navy-dark); margin:2em 0 .6em; font-size:1.55rem; }
                .post-content h3 { font-family:'Playfair Display',serif; color:var(--navy-dark); margin:1.5em 0 .5em; font-size:1.2rem; }
                .post-content p { margin-bottom:1.2em; }
                .post-content ul, .post-content ol { margin:0 0 1.2em 1.4em; }
                .post-content li { margin-bottom:.4em; }
                .post-content strong { color:var(--navy-dark); font-weight:600; }
                .post-content a { color:var(--navy-mid); text-decoration:underline; }
                .post-content blockquote { border-left:4px solid var(--gold); padding:12px 20px; background:var(--cream); margin:1.5em 0; border-radius:0 8px 8px 0; }
              `}</style>
              {renderable}
            </article>

            <aside style={{ position: 'sticky', top: 100 }}>
              <div className="sidebar-box">
                <div className="sidebar-title">Get a Free Review</div>
                <p style={{ fontSize: '.84rem', color: 'var(--text-mid)', marginBottom: 16, lineHeight: 1.6 }}>
                  Questions about this article? Book a 30-minute consultation with Leo.
                </p>
                <a href="/contact/" className="btn btn-navy" style={{ width: '100%', justifyContent: 'center' }}>Book Now — Free</a>
              </div>
              <div className="sidebar-box" style={{ marginTop: 20 }}>
                <div className="sidebar-title">Quick Tools</div>
                <div className="footer-links" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <a href="/calculators/">Mortgage Payment Calculator</a>
                  <a href="/calculators/">Affordability Calculator</a>
                  <a href="/apply/">Start Application</a>
                </div>
              </div>
              <div className="sidebar-box" style={{ marginTop: 20 }}>
                <div className="sidebar-title">More Articles</div>
                <a href="/blog/" style={{ fontSize: '.84rem', color: 'var(--navy)', fontWeight: 600 }}>← Back to Blog</a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container cta-content" style={{ position: 'relative', zIndex: 1 }}>
          <span className="section-label">Next Step</span>
          <h2 className="section-title">Ready to Put This Into Practice?</h2>
          <p className="cta-sub">Book a free consultation and build a strategy around your specific situation — not a generic answer.</p>
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
