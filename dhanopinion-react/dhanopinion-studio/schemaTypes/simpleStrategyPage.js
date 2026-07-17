import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'simpleStrategyPage',
  title: 'Simple Strategy Page',
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
      name: 'introParagraph2',
      title: 'Intro Paragraph 2',
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
            {name: 'n', type: 'string', title: 'Number (e.g. 01)'},
            {name: 'text', type: 'text', title: 'Text'},
            {name: 'link', type: 'string', title: 'Link (URL Path)'},
          ]
        }
      ]
    })
  ],
})
