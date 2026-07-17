import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';
import { htmlToBlocks } from '@sanity/block-tools';
import { Schema } from '@sanity/schema';

const defaultSchema = Schema.compile({
  name: 'myBlog',
  types: [
    {
      type: 'object',
      name: 'page',
      fields: [{ name: 'body', type: 'array', of: [{ type: 'block' }] }]
    }
  ]
});
const blockContentType = defaultSchema.get('page').fields.find(f => f.name === 'body').type;

const pagesToMigrate = [
  { file: 'Disclaimer.jsx', slug: 'disclaimer', title: 'Disclaimer' },
  { file: 'AboutUs.jsx', slug: 'about-us', title: 'About Us' },
  { file: 'InvestmentPhilosophy.jsx', slug: 'investment-philosophy', title: 'Investment Philosophy' },
  { file: 'SimpleInvestmentStrategy.jsx', slug: 'simple-investment-strategy', title: 'Simple Investment Strategy' },
  { file: 'EasyWins.jsx', slug: 'easy-wins', title: 'Easy Wins' }
];

const docs = [];

for (const p of pagesToMigrate) {
  const filePath = path.join(process.cwd(), '../src/pages', p.file);
  let rawContent = fs.readFileSync(filePath, 'utf-8');

  // ONLY grab what's inside the main return statement to avoid JS logic!
  const returnMatch = rawContent.match(/return \(\s*<>([\s\S]*?)<\/>\s*\)/) || rawContent.match(/return \(\s*([\s\S]*?)\s*\)/);
  if (!returnMatch) {
      console.error(`Could not find return block in ${p.file}`);
      continue;
  }
  
  let content = returnMatch[1];

  // Strip {...props} or dynamic props like style={{...}}
  content = content.replace(/\{.*?\}/gs, '');
  
  // Replace custom components with their inner text or standard tags
  content = content.replace(/<RevealChar[^>]*text=["']([^"']+)["'][^>]*>/g, '<h2>$1</h2>');
  content = content.replace(/<HoverFlip[^>]*text=["']([^"']+)["'][^>]*>/g, '$1');
  content = content.replace(/<motion\.div[^>]*>/g, '<div>');
  content = content.replace(/<\/motion\.div>/g, '</div>');
  content = content.replace(/<motion\.p[^>]*>/g, '<p>');
  content = content.replace(/<\/motion\.p>/g, '</p>');
  content = content.replace(/<motion\.h1[^>]*>/g, '<h1>');
  content = content.replace(/<\/motion\.h1>/g, '</h1>');
  content = content.replace(/<motion\.h2[^>]*>/g, '<h2>');
  content = content.replace(/<\/motion\.h2>/g, '</h2>');
  content = content.replace(/<Link[^>]*to=["']([^"']+)["'][^>]*>/g, '<a href="$1">');
  content = content.replace(/<\/Link>/g, '</a>');
  
  // Clean up stray jsx
  content = content.replace(/className=/g, 'class=');

  const rules = [
    {
      deserialize(el, next, block) {
        if (el.tagName && ['h1','h2','h3','h4','h5','h6'].includes(el.tagName.toLowerCase())) {
            return block({ _type: 'block', style: 'h2', children: next(el.childNodes) });
        }
        if (el.tagName && el.tagName.toLowerCase() === 'button') {
            return undefined; // skip buttons
        }
        if (el.tagName && el.tagName.toLowerCase() === 'form') {
            return undefined; // skip forms
        }
        if (el.tagName && el.tagName.toLowerCase() === 'input') {
            return undefined; // skip inputs
        }
        if (el.tagName && el.tagName.toLowerCase() === 'textarea') {
            return undefined; // skip textareas
        }
        if (el.tagName && el.tagName.toLowerCase() === 'svg') {
            return undefined; // skip svgs
        }
        return undefined;
      }
    }
  ];

  try {
    const blocks = htmlToBlocks(content, blockContentType, {
      parseHtml: html => new JSDOM(html).window.document,
      rules
    });

    const doc = {
      _id: `page-${p.slug}`,
      _type: 'page',
      title: p.title,
      slug: { _type: 'slug', current: p.slug },
      body: blocks
    };
    docs.push(JSON.stringify(doc));
    console.log(`Successfully migrated ${p.title}`);
  } catch (e) {
    console.error(`Failed to migrate ${p.title}`, e);
  }
}

fs.writeFileSync('import_pages.ndjson', docs.join('\n'));
console.log(`Generated import_pages.ndjson with ${docs.length} pages`);
