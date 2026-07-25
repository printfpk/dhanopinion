import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'formField',
  title: 'Form Field',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Field ID (Name)',
      type: 'string',
      description: 'Used as the key in form submission (e.g., firstName, email)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'inputType',
      title: 'Input Type',
      type: 'string',
      options: {
        list: [
          {title: 'Text', value: 'text'},
          {title: 'Email', value: 'email'},
          {title: 'Phone (Tel)', value: 'tel'},
          {title: 'Text Area', value: 'textarea'},
          {title: 'Radio Buttons', value: 'radio'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'placeholder',
      title: 'Placeholder',
      type: 'string',
      hidden: ({parent}) => parent?.inputType === 'radio',
    }),
    defineField({
      name: 'options',
      title: 'Radio Options',
      type: 'array',
      of: [{type: 'string'}],
      hidden: ({parent}) => parent?.inputType !== 'radio',
      description: 'Add options for the radio buttons',
    }),
    defineField({
      name: 'required',
      title: 'Required',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'inputType',
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: title || 'Unnamed Field',
        subtitle: subtitle ? `Type: ${subtitle}` : 'No type selected',
      }
    }
  }
})
