import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'philosophyPage',
  title: 'Investment Philosophy Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'introParagraph1',
      title: 'Intro Paragraph 1',
      type: 'text',
    }),
    defineField({
      name: 'elementsTitle',
      title: 'Elements Title',
      type: 'string',
    }),
    defineField({
      name: 'elements',
      title: 'Elements',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'text', type: 'text', title: 'Text'},
            {name: 'link', type: 'string', title: 'Link (URL Path)'},
          ]
        }
      ]
    })
  ],
})
