import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'formBlock',
  title: 'Form',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Form Title',
      type: 'string',
      description: 'Optional heading for the form',
    }),
    defineField({
      name: 'subtitle',
      title: 'Form Subtitle',
      type: 'text',
      description: 'Optional description or instructions below the title',
    }),
    defineField({
      name: 'formType',
      title: 'Form Type (Preset)',
      type: 'string',
      options: {
        list: [
          {title: 'Custom Form (Dynamic Fields)', value: 'custom'},
          {title: 'Legacy Contact Form', value: 'contact'},
          {title: 'Legacy Feedback Form', value: 'feedback'},
        ],
        layout: 'radio',
      },
      initialValue: 'custom',
    }),
    defineField({
      name: 'fields',
      title: 'Form Fields',
      type: 'array',
      of: [{type: 'formField'}],
      hidden: ({parent}) => parent?.formType === 'contact' || parent?.formType === 'feedback',
      description: 'Add dynamic fields to your custom form',
    }),
    defineField({
      name: 'submitButtonText',
      title: 'Submit Button Text',
      type: 'string',
      initialValue: 'Submit',
    }),
    defineField({
      name: 'accessKey',
      title: 'Web3Forms Access Key',
      type: 'string',
      description: 'Required to receive form submissions. Get one at web3forms.com',
    }),
    defineField({
      name: 'destinationEmail',
      title: 'Contact Email Display (Optional)',
      type: 'string',
      description: 'Email address shown next to the form (e.g. response@dhanopinion.com)',
    }),
  ],
  preview: {
    select: {
      formType: 'formType',
      title: 'title',
    },
    prepare(selection) {
      const {formType, title} = selection
      let displayTitle = title || 'Custom Form'
      if (formType === 'contact') displayTitle = 'Legacy Contact Form'
      if (formType === 'feedback') displayTitle = 'Legacy Feedback Form'
      return {
        title: displayTitle,
        subtitle: 'Interactive React Form',
      }
    },
  },
})
