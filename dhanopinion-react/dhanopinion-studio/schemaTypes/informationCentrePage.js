import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'informationCentrePage',
  title: 'Information Centre Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Information Centre'
    }),
    defineField({
      name: 'filtersTitle',
      title: 'Filters Section Title',
      type: 'string',
      initialValue: 'Filters'
    }),
    defineField({
      name: 'searchPlaceholder',
      title: 'Search Placeholder Text',
      type: 'string',
      initialValue: 'Input Keyword...'
    }),
    defineField({
      name: 'noResultsText',
      title: 'No Results Message',
      type: 'string',
      initialValue: 'No articles match your filters.'
    }),
  ],
})
