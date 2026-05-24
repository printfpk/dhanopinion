const fs = require('fs');
const path = require('path');

const originalDir = path.join(__dirname, '..', 'dhanopinion.com');
const reactDir = __dirname;

let case1Html = fs.readFileSync(path.join(originalDir, 'case-1', 'index.html'), 'utf8');

case1Html = case1Html.replace(/href="\.\.\//g, 'href="/');
case1Html = case1Html.replace(/src="\.\.\//g, 'src="/');
case1Html = case1Html.replace(/href="\.\.\/\.\.\//g, 'href="/');
case1Html = case1Html.replace(/src="\.\.\/\.\.\//g, 'src="/');
case1Html = case1Html.replace(/href="wp-/g, 'href="/wp-');
case1Html = case1Html.replace(/src="wp-/g, 'src="/wp-');

const bodyMatch = case1Html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
let bodyInner = bodyMatch ? bodyMatch[1] : '';

// remove script tags from bodyInner to prevent duplication
const scriptRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
bodyInner = bodyInner.replace(scriptRegex, '');

fs.writeFileSync(path.join(reactDir, 'src', 'assets', 'case1.html'), bodyInner);

console.log("Processed case-1 successfully!");
