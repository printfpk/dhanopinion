import { JSDOM } from 'jsdom';
import { htmlToBlocks } from '@sanity/block-tools';
import { Schema } from '@sanity/schema';

const defaultSchema = Schema.compile({
  name: 'myBlog',
  types: [
    {
      type: 'object',
      name: 'tableRow',
      fields: [{ name: 'cells', type: 'array', of: [{ type: 'string' }] }]
    },
    {
      type: 'object',
      name: 'table',
      fields: [{ name: 'rows', type: 'array', of: [{ type: 'tableRow' }] }]
    },
    {
      type: 'object',
      name: 'blogPost',
      fields: [
        {
          title: 'Body',
          name: 'body',
          type: 'array',
          of: [{ type: 'block' }, { type: 'image' }, { type: 'table' }]
        }
      ]
    }
  ]
});

const blockContentType = defaultSchema.get('blogPost').fields.find(f => f.name === 'body').type;

const htmlContent = '<p>Hello</p><table><tr><td>Hi</td></tr></table><img src="foo.jpg" />';

const rules = [
  {
    deserialize(el, next, block) {
      if (el.tagName && el.tagName.toLowerCase() === 'table') {
        const rows = Array.from(el.querySelectorAll('tr')).map(tr => {
          return {
            _type: 'tableRow',
            _key: Math.random().toString(36).substring(2, 9),
            cells: Array.from(tr.querySelectorAll('th, td')).map(td => td.textContent.trim())
          };
        });
        return { _type: 'table', rows };
      }
      if (el.tagName && el.tagName.toLowerCase() === 'img') {
        return block({
          _type: 'image',
          src: el.getAttribute('src')
        });
      }
      return undefined;
    }
  }
];

const blocks = htmlToBlocks(htmlContent, blockContentType, {
  parseHtml: html => new JSDOM(html).window.document,
  rules
});

console.log(JSON.stringify(blocks, null, 2));
