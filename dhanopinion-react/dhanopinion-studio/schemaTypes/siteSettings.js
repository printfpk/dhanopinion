import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
    }),
    defineField({
      name: 'homeHeroHeading',
      title: 'Home Hero Heading',
      type: 'string',
    }),
    defineField({
      name: 'homeHeroSubheading',
      title: 'Home Hero Subheading',
      type: 'text',
    }),
  ],
})
