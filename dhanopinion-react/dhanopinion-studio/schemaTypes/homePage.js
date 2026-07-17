import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
    }),
    defineField({
      name: 'focusPills',
      title: 'Focus Pills',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'startingPointsTitle',
      title: 'Starting Points Title',
      type: 'string',
    }),
    defineField({
      name: 'startingPoints',
      title: 'Starting Points (Cards)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'icon', type: 'string', title: 'Icon'},
            {name: 'label', type: 'string', title: 'Label'},
            {name: 'desc', type: 'text', title: 'Description'},
            {name: 'to', type: 'string', title: 'Link (URL Path)'},
          ]
        }
      ],
    }),
    defineField({
      name: 'scopeTitle',
      title: 'Scope Title',
      type: 'string',
    }),
    defineField({
      name: 'scopeText',
      title: 'Scope Text',
      type: 'text',
    }),
    defineField({
      name: 'expectationsTitle',
      title: 'Expectations Title',
      type: 'string',
    }),
    defineField({
      name: 'expectations',
      title: 'What You Can Expect',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'heading', type: 'string', title: 'Heading'},
            {name: 'desc', type: 'text', title: 'Description'},
          ]
        }
      ],
    }),
    defineField({
      name: 'notExpectationsTitle',
      title: 'Not Expectations Title',
      type: 'string',
    }),
    defineField({
      name: 'notExpectations',
      title: 'What You Should Not Expect',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'heading', type: 'string', title: 'Heading'},
            {name: 'desc', type: 'text', title: 'Description'},
          ]
        }
      ],
    }),
    defineField({
      name: 'audienceTitle',
      title: 'Audience Title',
      type: 'string',
    }),
    defineField({
      name: 'audienceParagraphs',
      title: 'Audience Paragraphs',
      type: 'array',
      of: [{type: 'text'}],
    }),
    defineField({
      name: 'ctaTitle',
      title: 'CTA Title',
      type: 'string',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Text',
      type: 'text',
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'CTA Button Text',
      type: 'string',
    }),
    defineField({
      name: 'ctaButtonLink',
      title: 'CTA Button Link',
      type: 'string',
    }),
  ],
})
