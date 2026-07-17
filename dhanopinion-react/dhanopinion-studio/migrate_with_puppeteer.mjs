import fs from 'fs';
import puppeteer from 'puppeteer';
import { htmlToBlocks } from '@sanity/block-tools';
import { Schema } from '@sanity/schema';
import { JSDOM } from 'jsdom';
import path from 'path';

// Define the schema required by block-tools
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
      type: 'image',
      name: 'image',
      options: { hotspot: true }
    },
    {
      name: 'blockContent',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' }
          ],
          lists: [{ title: 'Bullet', value: 'bullet' }],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' }
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                fields: [{ name: 'href', type: 'url' }]
              }
            ]
          }
        },
        { type: 'image' },
        { type: 'table' }
      ]
    }
  ]
});

const blockContentType = defaultSchema.get('blockContent');

// Custom rules to parse HTML tables into Sanity @sanity/table structure
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
        
        return block({
          _type: 'table',
          rows
        });
      }
      return undefined;
    }
  },
  {
    deserialize(el, next, block) {
      if (el.tagName && el.tagName.toLowerCase() === 'img') {
        let src = el.getAttribute('src');
        if (src.startsWith('/src/')) {
          src = path.resolve(process.cwd(), '../', src.slice(1));
        }
        return {
          _type: 'image',
          _sanityAsset: `file://${src}`
        };
      }
      return undefined;
    }
  }
];

async function run() {
  const appJsx = fs.readFileSync('../src/App.jsx', 'utf8');
  
  // Find all routes that look like blog posts or case studies
  const routeRegex = /<Route path="([^"]+)\/\*" element=\{<(Post_|CaseStudy)[^>]+ \/>\} \/>/g;
  const matches = [...appJsx.matchAll(routeRegex)];
  
  console.log(`Found ${matches.length} routes to scrape.`);

  const browser = await puppeteer.launch({ 
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  const page = await browser.newPage();
  
  let ndjson = '';
  let idCounter = 1;

  for (const match of matches) {
    const route = match[1]; // e.g. 2023/08/25/inflation...
    const url = `http://localhost:5173/${route}/`;
    
    console.log(`Scraping ${url}...`);
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      // wait for React to render
      await new Promise(r => setTimeout(r, 2000));
    } catch (err) {
      console.warn(`Navigation error for ${url}: ${err.message}`);
      continue;
    }
    
    // Extract data from the page
    const data = await page.evaluate(() => {
      const titleEl = document.querySelector('h1');
      const dateEl = document.querySelector('.post-date');
      const contentEl = document.querySelector('.post-content');
      
      if (!contentEl) return null;
      
      // We want everything in .post-content EXCEPT the .post-date, h1 (if inside), and the next/prev buttons
      const clone = contentEl.cloneNode(true);
      
      // Remove prev/next buttons
      const buttons = clone.querySelectorAll('.btn');
      buttons.forEach(b => b.parentNode?.parentNode?.removeChild(b.parentNode));
      
      // Ensure absolute image srcs
      clone.querySelectorAll('img').forEach(img => {
        img.src = new URL(img.getAttribute('src'), window.location.href).pathname;
      });
      
      return {
        title: titleEl ? titleEl.textContent : 'Untitled',
        date: dateEl ? dateEl.textContent : new Date().toISOString(),
        html: clone.innerHTML
      };
    });
    
    if (!data) {
      console.warn(`Could not find content on ${url}`);
      continue;
    }
    
    // Clean up HTML before passing to block-tools
    let htmlContent = data.html;
    htmlContent = htmlContent.replace(/<p class="post-date"[^>]*>[\s\S]*?<\/p>/, '');
    
    // Parse HTML to blocks
    const blocks = htmlToBlocks(htmlContent, blockContentType, {
      parseHtml: html => new JSDOM(html).window.document,
      rules
    });
    
    const docId = `article-${idCounter++}`;
    const slug = route.replace(/\//g, '-');
    
    let publishedAt = new Date().toISOString();
    try {
      publishedAt = new Date(data.date).toISOString();
    } catch(e) {}
    
    const doc = {
      _id: docId,
      _type: 'post',
      title: data.title,
      slug: {
        _type: 'slug',
        current: slug
      },
      publishedAt,
      body: blocks
    };
    
    ndjson += JSON.stringify(doc) + '\n';
  }
  
  await browser.close();
  
  fs.writeFileSync('import_full.ndjson', ndjson);
  console.log('Successfully generated import_full.ndjson');
}

run().catch(console.error);
