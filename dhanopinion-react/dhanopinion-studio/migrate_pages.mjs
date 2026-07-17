import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';
import { htmlToBlocks } from '@sanity/block-tools';
import { Schema } from '@sanity/schema';

// Basic Schema to compile block content
const defaultSchema = Schema.compile({
  name: 'myBlog',
  types: [
    {
      type: 'object',
      name: 'page',
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

const blockContentType = defaultSchema.get('page').fields.find(f => f.name === 'body').type;

const pagesToMigrate = [
  { url: 'http://localhost:5173/about-us', slug: 'about-us', title: 'About Us', selector: '.wrap' },
  { url: 'http://localhost:5173/disclaimer', slug: 'disclaimer', title: 'Disclaimer', selector: '.wrap-narrow' },
  { url: 'http://localhost:5173/investment-philosophy', slug: 'investment-philosophy', title: 'Investment Philosophy', selector: '#elements' },
  { url: 'http://localhost:5173/simple-investment-strategy', slug: 'simple-investment-strategy', title: 'Simple Investment Strategy', selector: 'main, .sec' },
  { url: 'http://localhost:5173/steps-to-investing-success', slug: 'steps-to-investing-success', title: 'Steps to Investing Success', selector: '.wrap' },
  { url: 'http://localhost:5173/easy-wins', slug: 'easy-wins', title: 'Easy Wins', selector: '.wrap' }
];

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const docs = [];

  for (const pageInfo of pagesToMigrate) {
    console.log(`Processing ${pageInfo.title}...`);
    await page.goto(pageInfo.url, { waitUntil: 'networkidle0' });

    // Extract HTML
    const htmlContent = await page.evaluate((selector) => {
      // Find all sections and combine their innerHTML
      const sections = document.querySelectorAll('section');
      let combinedHtml = '';
      
      // Skip the hero sections for most pages to just get the body text
      for (let i = 1; i < sections.length; i++) {
        combinedHtml += sections[i].innerHTML;
      }
      
      // If no sections or just one, fallback to body
      if (sections.length <= 1) {
          return document.body.innerHTML;
      }
      return combinedHtml;
    }, pageInfo.selector);

    // Clean up HTML before block-tools
    let cleanHtml = htmlContent.replace(/<button[^>]*>.*?<\/button>/gi, ''); // Remove buttons like "Read More"
    cleanHtml = cleanHtml.replace(/<form[^>]*>.*?<\/form>/gi, ''); // Remove forms like Contact Us
    cleanHtml = cleanHtml.replace(/<svg[^>]*>.*?<\/svg>/gi, ''); // Remove SVGs

    const rules = [
      {
        deserialize(el, next, block) {
          if (el.tagName && el.tagName.toLowerCase() === 'img') {
            return undefined; // skip images for pages for now to avoid upload issues
          }
          if (el.tagName && (el.tagName.toLowerCase() === 'h1' || el.tagName.toLowerCase() === 'h2' || el.tagName.toLowerCase() === 'h3')) {
              // Convert all headers to h2 to standardize
              return block({ _type: 'block', style: 'h2', children: next(el.childNodes) });
          }
          return undefined;
        }
      }
    ];

    const blocks = htmlToBlocks(cleanHtml, blockContentType, {
      parseHtml: html => new JSDOM(html).window.document,
      rules
    });

    const doc = {
      _id: `page-${pageInfo.slug}`,
      _type: 'page',
      title: pageInfo.title,
      slug: {
        _type: 'slug',
        current: pageInfo.slug
      },
      body: blocks
    };

    docs.push(JSON.stringify(doc));
  }

  await browser.close();

  fs.writeFileSync('import_pages.ndjson', docs.join('\n'));
  console.log(`Successfully generated import_pages.ndjson with ${docs.length} pages!`);
}

run().catch(console.error);
