const fs = require('fs');
const path = require('path');
const https = require('https');

const pages = [
  { slug: 'easy-wins', component: 'EasyWins' },
  { slug: 'simple-investment-strategy', component: 'SimpleInvestmentStrategy' },
  { slug: 'investment-philosophy', component: 'InvestmentPhilosophy' },
  { slug: 'information-centre', component: 'InformationCentre' },
  { slug: 'about-us', component: 'AboutUs' },
  { slug: 'disclaimer', component: 'Disclaimer' }
];

const reactDir = __dirname;

// Helper to replace links
function fixLinks(html) {
  let fixed = html;
  fixed = fixed.replace(/https:\/\/dhanopinion\.com\//g, '/');
  fixed = fixed.replace(/https:\\\/\\\/dhanopinion\.com\\\//g, '\\/'); // JSON escaped urls
  fixed = fixed.replace(/href="\/wp-/g, 'href="/wp-');
  fixed = fixed.replace(/src="\/wp-/g, 'src="/wp-');
  return fixed;
}

// 1. Fix existing home.html, case1.html, index.html
['src/assets/home.html', 'src/assets/case1.html', 'index.html'].forEach(file => {
  const filePath = path.join(reactDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = fixLinks(content);
    fs.writeFileSync(filePath, content);
  }
});

// 2. Fetch missing pages
function fetchPage(slug) {
  return new Promise((resolve, reject) => {
    https.get(`https://dhanopinion.com/${slug}/`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function processPages() {
  for (const page of pages) {
    try {
      console.log(`Fetching ${page.slug}...`);
      const html = await fetchPage(page.slug);
      
      let bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      let bodyInner = bodyMatch ? bodyMatch[1] : '';
      
      // Remove scripts
      bodyInner = bodyInner.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
      
      // Fix links
      bodyInner = fixLinks(bodyInner);
      
      // Save asset
      const assetPath = path.join(reactDir, 'src', 'assets', `${page.slug}.html`);
      fs.writeFileSync(assetPath, bodyInner);
      
      // Create component
      const componentCode = `import htmlContent from '../assets/${page.slug}.html?raw'
import { useEffect, useRef } from 'react'

export default function ${page.component}() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (window.elementorFrontend) {
        try {
            setTimeout(() => {
                window.jQuery(window).trigger('elementor/frontend/init');
            }, 100);
        } catch(e) {}
    }
  }, [])

  return (
    <div ref={containerRef} dangerouslySetInnerHTML={{ __html: htmlContent }} />
  )
}
`;
      fs.writeFileSync(path.join(reactDir, 'src', 'pages', `${page.component}.jsx`), componentCode);
      console.log(`Successfully created ${page.component}`);
    } catch (e) {
      console.error(`Failed to fetch ${page.slug}`, e);
    }
  }
}

processPages();
