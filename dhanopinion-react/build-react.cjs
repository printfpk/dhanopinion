const fs = require('fs');
const path = require('path');

const originalDir = path.join(__dirname, '..', 'dhanopinion.com');
const reactDir = __dirname;

// Read original index.html
let originalHtml = fs.readFileSync(path.join(originalDir, 'index.html'), 'utf8');

// Fix paths in the HTML string
originalHtml = originalHtml.replace(/href="\.\.\//g, 'href="/');
originalHtml = originalHtml.replace(/src="\.\.\//g, 'src="/');
originalHtml = originalHtml.replace(/href="wp-/g, 'href="/wp-');
originalHtml = originalHtml.replace(/src="wp-/g, 'src="/wp-');

// Extract head inner
const headMatch = originalHtml.match(/<head>([\s\S]*?)<\/head>/i);
const headInner = headMatch ? headMatch[1] : '';

// Extract body inner
const bodyMatch = originalHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
let bodyInner = bodyMatch ? bodyMatch[1] : '';

// Remove the wp-emoji script from head just to prevent errors, or keep it. It's fine.
// We will replace the Vite index.html head with this head + vite stuff
let viteHtml = fs.readFileSync(path.join(reactDir, 'index.html'), 'utf8');

// The new head should contain the vite head elements + original head elements
const newHead = `
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dhanopinion</title>
    ${headInner}
  </head>
`;

viteHtml = viteHtml.replace(/<head>[\s\S]*?<\/head>/i, newHead);

// Now for the body, the scripts at the end of the original body should be put in the Vite index.html
// so they run after the React app mounts, or they can be dangerouslySetInnerHTML in the component.
// But dangerouslySetInnerHTML does NOT execute <script> tags!
// So we MUST move all <script> tags from bodyInner to index.html.

const scriptRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
const scripts = [];
bodyInner = bodyInner.replace(scriptRegex, (match) => {
    scripts.push(match);
    return ''; // remove from bodyInner
});

// Also there might be a <div class="ui-cursor..."> and styles. Let's leave them in bodyInner.

// Add the scripts to the end of viteHtml body
const scriptTagsStr = scripts.join('\n');
viteHtml = viteHtml.replace('</body>', `\n${scriptTagsStr}\n</body>`);

fs.writeFileSync(path.join(reactDir, 'index.html'), viteHtml);

// Save the cleaned bodyInner to an asset file
fs.mkdirSync(path.join(reactDir, 'src', 'assets'), { recursive: true });
fs.writeFileSync(path.join(reactDir, 'src', 'assets', 'home.html'), bodyInner);

console.log("Processed index.html successfully!");
