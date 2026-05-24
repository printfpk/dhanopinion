const fs = require('fs');
const path = require('path');
const https = require('https');

const postUrls = [
  "/2023/01/09/there-is-always-some-risk-2/",
  "/2023/04/09/diversification-reduces-risk/",
  "/2023/08/03/compound-interest-and-exponential-growth/",
  "/2023/08/04/there-is-always-some-risk/",
  "/2023/08/05/asset-allocation/",
  "/2023/08/06/equity-investing/",
  "/2023/08/07/defining-your-investment-horizon-can-lead-to-better-planning/",
  "/2023/08/08/risk-and-return-profile-of-equity/",
  "/2023/08/09/risk-and-return-profile-of-fixed-income/",
  "/2023/08/10/test/",
  "/2023/08/11/index-funds/",
  "/2023/08/12/competitive-financial-markets-and-the-implications-for-investment-strategy/",
  "/2023/08/13/individual-or-institution-who-you-are-changes-investment-choices/",
  "/2023/08/14/dont-pick-stocks-buy-the-index/",
  "/2023/08/16/keep-the-cost-of-investing-low/",
  "/2023/08/17/taxes-and-investment-outcomes/",
  "/2023/08/18/when-investing-in-a-mutual-fund-choose-a-direct-mf-over-a-regular-mf/",
  "/2023/08/19/why-keeping-money-in-a-liquid-mutual-fund-is-better-for-short-term-needs-than-keeping-it-in-a-savings-account/",
  "/2023/08/20/national-pension-system-nps/",
  "/2023/08/23/government-savings-schemes/"
];

const reactDir = __dirname;
const postsDir = path.join(reactDir, 'src', 'assets', 'posts');
const pagesDir = path.join(reactDir, 'src', 'pages', 'posts');

if (!fs.existsSync(postsDir)) fs.mkdirSync(postsDir, { recursive: true });
if (!fs.existsSync(pagesDir)) fs.mkdirSync(pagesDir, { recursive: true });

function fixLinks(html) {
  let fixed = html;
  fixed = fixed.replace(/https:\/\/dhanopinion\.com\//g, '/');
  fixed = fixed.replace(/https:\\\/\\\/dhanopinion\.com\\\//g, '\\/');
  fixed = fixed.replace(/href="\/wp-/g, 'href="/wp-');
  fixed = fixed.replace(/src="\/wp-/g, 'src="/wp-');
  return fixed;
}

function fetchPage(urlPath) {
  return new Promise((resolve, reject) => {
    https.get(`https://dhanopinion.com${urlPath}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function processPosts() {
  let appRoutes = [];
  let appImports = [];

  for (const urlPath of postUrls) {
    try {
      console.log(`Fetching ${urlPath}...`);
      const html = await fetchPage(urlPath);
      
      let bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      let bodyInner = bodyMatch ? bodyMatch[1] : '';
      bodyInner = bodyInner.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
      bodyInner = fixLinks(bodyInner);
      
      const parts = urlPath.split('/').filter(Boolean);
      const slug = parts[parts.length - 1]; // e.g. "there-is-always-some-risk-2"
      
      const assetPath = path.join(postsDir, `${slug}.html`);
      fs.writeFileSync(assetPath, bodyInner);
      
      const componentName = 'Post_' + slug.replace(/-/g, '_');
      
      const componentCode = `import htmlContent from '../../assets/posts/${slug}.html?raw'
import { useEffect, useRef } from 'react'

export default function ${componentName}() {
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
      fs.writeFileSync(path.join(pagesDir, `${componentName}.jsx`), componentCode);
      
      appImports.push(`import ${componentName} from './pages/posts/${componentName}'`);
      appRoutes.push(`        <Route path="${urlPath.substring(1)}" element={<${componentName} />} />`);
      
    } catch (e) {
      console.error(`Failed to fetch ${urlPath}`, e);
    }
  }

  console.log("App imports:\n" + appImports.join("\n"));
  console.log("App routes:\n" + appRoutes.join("\n"));
}

processPosts();
