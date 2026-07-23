export default {
  name: 'stepsToSuccessPage',
  title: 'Steps to Success Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Steps to Investing Success'
    },
    {
      name: 'introText',
      title: 'Introductory Text',
      type: 'blockContent',
      description: 'The introductory paragraph shown at the top of the page.'
    },
    {
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'num', title: 'Step Number', type: 'string' },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'desc', title: 'Description', type: 'text' },
            { name: 'icon', title: 'FontAwesome Icon Class', type: 'string' },
            { name: 'link', title: 'Link (URL path)', type: 'string' },
            {
              name: 'content',
              title: 'Full Article Content',
              type: 'blockContent'
            }
          ]
        }
      ]
    }
  ]
}
