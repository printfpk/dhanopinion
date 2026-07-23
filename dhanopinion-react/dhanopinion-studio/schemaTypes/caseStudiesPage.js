export default {
  name: 'caseStudiesPage',
  title: 'Case Studies Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Case Studies'
    },
    {
      name: 'cases',
      title: 'Cases',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'id', title: 'ID', type: 'string' },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'desc', title: 'Description', type: 'text' },
            { name: 'age', title: 'Age', type: 'number' },
            { name: 'equity', title: 'Equity', type: 'number' },
            { 
              name: 'risk', 
              title: 'Risk Taking Ability', 
              type: 'string',
              options: {
                list: ['Low', 'Average', 'High'],
                layout: 'radio'
              }
            },
            {
              name: 'content',
              title: 'Full Content',
              type: 'blockContent'
            }
          ]
        }
      ]
    }
  ]
}
