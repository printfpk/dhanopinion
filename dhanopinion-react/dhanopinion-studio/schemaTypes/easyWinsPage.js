import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'easyWinsPage',
  title: 'Easy Wins Page',
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
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', type: 'string', title: 'Title'},
            {name: 'desc', type: 'text', title: 'Description'},
            {name: 'to', type: 'string', title: 'Link (URL Path)'},
          ]
        }
      ]
    })
  ],
})
