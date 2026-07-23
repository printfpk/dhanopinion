import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';
import { htmlToBlocks } from '@sanity/block-tools';
import { Schema } from '@sanity/schema';
import { getCliClient } from 'sanity/cli';

const client = getCliClient({ apiVersion: '2024-07-11' });

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

async function run() {
  const filePath = path.join(process.cwd(), '../src/pages/posts/CaseStudy1.jsx');
  let rawContent = fs.readFileSync(filePath, 'utf-8');

  // ONLY grab what's inside the PostLayout return statement
  const returnMatch = rawContent.match(/<PostLayout[^>]*>([\s\S]*?)<\/PostLayout>/);
  if (!returnMatch) {
      console.error(`Could not find PostLayout block`);
      return;
  }
  
  let content = returnMatch[1];
  
  // Clean up stray jsx
  content = content.replace(/className=/g, 'class=');

  const rules = [
    {
      deserialize(el, next, block) {
        if (el.tagName && ['h1','h2','h3','h4','h5','h6'].includes(el.tagName.toLowerCase())) {
            return block({ _type: 'block', style: 'h2', children: next(el.childNodes) });
        }
        return undefined;
      }
    }
  ];

  const blocks = htmlToBlocks(content, blockContentType, {
    parseHtml: html => new JSDOM(html).window.document,
    rules
  });

  // Also construct generic blocks for Case 2 and 3
  const blocks2 = htmlToBlocks('<p>Data coming soon.</p>', blockContentType, {
    parseHtml: html => new JSDOM(html).window.document,
    rules
  });
  const blocks3 = htmlToBlocks('<p>Data coming soon.</p>', blockContentType, {
    parseHtml: html => new JSDOM(html).window.document,
    rules
  });

  console.log("Extracted Case 1 blocks:", blocks.length);

  // Fetch the singleton
  const doc = await client.getDocument('caseStudiesSingleton');
  if (!doc) {
    console.error("No caseStudiesSingleton found");
    return;
  }

  // Update the cases
  const updatedCases = doc.cases.map(c => {
    if (c.id === 'case-1') return { ...c, content: blocks };
    if (c.id === 'case-2') return { ...c, content: blocks2 };
    if (c.id === 'case-3') return { ...c, content: blocks3 };
    return c;
  });

  console.log("Patching document...");
  await client.patch('caseStudiesSingleton').set({ cases: updatedCases }).commit();
  console.log("Successfully migrated Case Study content to Sanity!");
}

run().catch(console.error);
