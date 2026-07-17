import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'formBlock',
  title: 'Form',
  type: 'object',
  fields: [
    defineField({
      name: 'formType',
      title: 'Form Type',
      type: 'string',
      options: {
        list: [
          {title: 'Contact Form', value: 'contact'},
          {title: 'Feedback Form', value: 'feedback'},
        ],
        layout: 'radio',
      },
    }),
  ],
  preview: {
    select: {
      formType: 'formType',
    },
    prepare(selection) {
      const {formType} = selection
      return {
        title: formType === 'contact' ? 'Contact Form' : formType === 'feedback' ? 'Feedback Form' : 'Form',
        subtitle: 'Interactive React Form',
      }
    },
  },
})
