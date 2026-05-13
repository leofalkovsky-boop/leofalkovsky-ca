import { config, collection, singleton, fields } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: {
      owner: 'leofalkovsky-boop',
      name: 'leofalkovsky-ca',
    },
    branchPrefix: 'cms/',
  },
  ui: {
    brand: { name: 'Leo Falkovsky · CMS' },
  },
  singletons: {
    siteSettings: singleton({
      label: 'Site Settings',
      path: 'content/site-settings',
      format: { data: 'json' },
      schema: {
        phone: fields.text({ label: 'Phone Number' }),
        email: fields.text({ label: 'Email Address' }),
        address: fields.text({ label: 'Office Address' }),
        fsraNumber: fields.text({ label: 'FSRA Licence Number' }),
        tagline: fields.text({ label: 'Tagline (shown under name in header)' }),
      },
    }),
    homepage: singleton({
      label: 'Home Page',
      path: 'content/homepage',
      format: { data: 'json' },
      schema: {
        heroTitle: fields.text({ label: 'Hero Headline (line 1)' }),
        heroTitleHighlight: fields.text({ label: 'Hero Headline (line 2 — gold text)' }),
        heroSubtitle: fields.text({ label: 'Hero Subtitle Paragraph', multiline: true }),
        heroCta: fields.text({ label: 'Primary CTA Button Text' }),
        heroCtaPhone: fields.text({ label: 'Phone CTA Button Text' }),
      },
    }),
    aboutPage: singleton({
      label: 'About Page',
      path: 'content/about-page',
      format: { data: 'json' },
      schema: {
        bio: fields.text({ label: 'Bio / Introduction', multiline: true }),
        credentials: fields.text({ label: 'Credentials (comma-separated)', multiline: true }),
        whyWorkWithMe: fields.text({ label: 'Why Work With Me section text', multiline: true }),
      },
    }),
  },
  collections: {
    posts: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({
          label: 'Meta Description',
          multiline: true,
          validation: { isRequired: true, length: { max: 160 } },
        }),
        publishDate: fields.date({
          label: 'Publish Date',
          validation: { isRequired: true },
        }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Mortgage Tips', value: 'mortgage-tips' },
            { label: 'Market Update', value: 'market-update' },
            { label: 'First-Time Buyers', value: 'first-time-buyers' },
            { label: 'Refinancing', value: 'refinancing' },
            { label: 'Investment', value: 'investment' },
            { label: 'Wealth Building', value: 'wealth-building' },
            { label: 'Cash Damming', value: 'cash-damming' },
            { label: 'Smith Manoeuvre', value: 'smith-manoeuvre' },
          ],
          defaultValue: 'mortgage-tips',
        }),
        readTime: fields.integer({ label: 'Read Time (minutes)', defaultValue: 5 }),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),
  },
});
