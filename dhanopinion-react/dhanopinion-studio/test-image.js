const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const { htmlToBlocks } = require('@sanity/block-tools');
const { Schema } = require('@sanity/schema');

const defaultSchema = Schema.compile({
  name: 'myBlog',
  types: [
    {
      type: 'object',
      name: 'blogPost',
      fields: [
        {
          title: 'Body',
          name: 'body',
          type: 'array',
          of: [{ type: 'block' }, { type: 'image' }]
        }
      ]
    }
  ]
});

const blockContentType = defaultSchema.get('blogPost').fields.find(f => f.name === 'body').type;

let htmlContent = '<p>Test</p><img src="/assets/images/info_centre/doc_image_1.png" />';

const rules = [
  {
    deserialize(el, next, block) {
      if (el.tagName && el.tagName.toLowerCase() === 'img') {
        let src = el.getAttribute('src');
        let absolutePath = path.join(process.cwd(), '../public', src).replace(/\\/g, '/');
        // On windows, absolute path usually starts with drive letter e.g. C:/
        // For file:// URL we usually need file:///C:/...
        if (absolutePath.match(/^[a-zA-Z]:\//)) {
            absolutePath = '/' + absolutePath;
        }
        return block({
          _type: 'image',
          _sanityAsset: `image@file://${absolutePath}`
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
