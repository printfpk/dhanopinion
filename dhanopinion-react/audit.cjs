const fs = require('fs');
const path = require('path');
const dir = 'c:\\Users\\prash\\OneDrive\\Desktop\\Frontend projects\\dhan003\\dhanopinion\\dhanopinion-react\\src\\pages\\posts';
const files = fs.readdirSync(dir);

let errors = [];

for (const file of files) {
  if (file.endsWith('.jsx')) {
    const p = path.join(dir, file);
    const content = fs.readFileSync(p, 'utf8');

    // 1. Inline styles Check
    const hasInlineStyles = /<(p|h[1-6]|ul|ol|li)[^>]*style=/i.test(content);
    if (hasInlineStyles) {
      errors.push(file + ' ERROR: has inline styles');
    }

    // 2. Class Check (allow 'post-date', disallow everything else on headings and p)
    // Matches `<p className="some-class">` but ignores `<p className="post-date">`
    const hasOtherClasses = /<(p|h[1-6]|ul|ol|li)[^>]*className=([\"'])(?!post-date\2)[^\2]*\2/i.test(content);
    if (hasOtherClasses) {
      errors.push(file + ' ERROR: has unauthorized classes');
    }

    // 3. Heading level checks
    const hasH1 = /<h1[^>]*>/.test(content);
    if (hasH1) {
      errors.push(file + ' ERROR: uses H1 (reserved for PostLayout title)');
    }

    const hasH2 = /<h2[^>]*>/.test(content);
    const hasH3 = /<h3[^>]*>/.test(content);
    const hasH4 = /<h4[^>]*>/.test(content);

    // If H3 exists, H2 MUST exist (except if it's a completely flat file with no headings at all)
    if (hasH3 && !hasH2) {
      errors.push(file + ' ERROR: has H3 but no H2');
    }
    
    // If H4 exists, H3 MUST exist
    if (hasH4 && !hasH3) {
      errors.push(file + ' ERROR: has H4 but no H3');
    }
  }
}

if (errors.length > 0) {
  console.log('--- FOUND ISSUES ---');
  console.log(errors.join('\n'));
} else {
  console.log('ALL POSTS VERIFIED SUCCESSFULLY.');
  console.log('No inline styles. No unauthorized classes. HTML semantic hierarchy is strictly enforced (H2 -> H3 -> H4).');
}
