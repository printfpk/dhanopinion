import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';
import { htmlToBlocks } from '@sanity/block-tools';
import { Schema } from '@sanity/schema';
import { allArticles } from '../src/data/articles.js';

const postsDir = path.join(process.cwd(), '../src/pages/posts');
const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.jsx'));

// Compile a basic schema for block-tools
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

const docs = [];
const seenIds = new Set();

for (const file of files) {
  const filePath = path.join(postsDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');

  // Extract title from <PostLayout title="...">
  const titleMatch = content.match(/<PostLayout[^>]*title=["']([^"']+)["'][^>]*>/);
  if (!titleMatch) continue;

  const title = titleMatch[1];

  const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, '');
  let articleMeta = allArticles.find(a => normalize(a.title) === normalize(title));
  
  if (!articleMeta) {
    articleMeta = allArticles.find(a => normalize(a.title.replace(/\(.*?\)/g, '')) === normalize(title.replace(/\(.*?\)/g, '')));
  }

  if (!articleMeta) {
    console.warn(`Could not find metadata in articles.js for title: ${title}`);
    articleMeta = {
      id: file.replace('.jsx', ''),
      to: `/${file.replace('.jsx', '').toLowerCase()}`,
      date: new Date().toISOString()
    };
  }

  const docId = `article-${articleMeta.id}`;
  if (seenIds.has(docId)) {
    console.warn(`Skipping duplicate file for ID: ${docId} (File: ${file})`);
    continue;
  }
  seenIds.add(docId);

  // Extract everything inside <PostLayout> ... </PostLayout>
  const bodyMatch = content.match(/<PostLayout[^>]*>([\s\S]*?)<\/PostLayout>/);
  if (!bodyMatch) continue;

  let htmlContent = bodyMatch[1];

  // Strip the date <p> tag at the top
  htmlContent = htmlContent.replace(/<p className="post-date"[^>]*>[\s\S]*?<\/p>/, '');

  // Convert MediaSkeleton to img tag so block-tools can deserialize it
  htmlContent = htmlContent.replace(/<MediaSkeleton[^>]*src=["']([^"']+)["'][^>]*\/>/g, '<img src="$1" />');

  // Replace className with class
  htmlContent = htmlContent.replace(/className=/g, 'class=');

  // Convert React <Link> to HTML <a> so block-tools recognizes them as links
  htmlContent = htmlContent.replace(/<Link\s+to=(["'])(.*?)\1[^>]*>/g, '<a href="$2">');
  htmlContent = htmlContent.replace(/<\/Link>/g, '</a>');

  // Fix JSX Fragments
  htmlContent = htmlContent.replace(/<\/?\s*>/g, '');

  // Custom rules for block-tools to handle any extra html correctly
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
          return block({ _type: 'table', rows });
        }
        if (el.tagName && el.tagName.toLowerCase() === 'img') {
          let src = el.getAttribute('src');
          let absolutePath = path.join(process.cwd(), '../public', src).replace(/\\/g, '/');
          if (absolutePath.match(/^[a-zA-Z]:\//)) {
            absolutePath = '/' + absolutePath;
          }
          return block({
            _type: 'image',
            _sanityAsset: `image@file://${absolutePath}`
          });
        }
        return undefined
      }
    }
  ];

  const blocks = htmlToBlocks(htmlContent, blockContentType, {
    parseHtml: html => new JSDOM(html).window.document,
    rules
  });

  const doc = {
    _id: `article-${articleMeta.id}`,
    _type: 'post',
    title: title,
    slug: {
      _type: 'slug',
      current: articleMeta.to.replace(/^\/|\/$/g, '').replace(/\//g, '-') // Convert route to slug
    },
    publishedAt: new Date(articleMeta.date).toISOString(),
    body: blocks
  };

  docs.push(JSON.stringify(doc));
}

fs.writeFileSync('import.ndjson', docs.join('\n'));
console.log(`Successfully generated import.ndjson with ${docs.length} full articles!`);
