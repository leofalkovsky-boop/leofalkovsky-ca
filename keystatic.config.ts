import { config, collection, fields } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: {
      owner: 'leofalkovsky-boop',
      name: 'leofalkovsky-ca',
    },
    branchPrefix: 'content/',
  },
  ui: {
    brand: { name: 'Leo Falkovsky · Blog CMS' },
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
