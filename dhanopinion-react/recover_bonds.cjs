const fs = require('fs');
const { execSync } = require('child_process');

// 1. Get original file from git (note the repo root offset)
const originalContent = execSync('git show HEAD:dhanopinion-react/src/pages/posts/Post_government_bonds.jsx').toString();

// 2. Fix the paragraph tags to h3 tags
let content = originalContent;
const headings = [
  "Fixed-rate bonds",
  "Floating Rate Bonds (FRBs)",
  "Sovereign Gold Bonds (SGBs)",
  "Inflation-Indexed Bonds",
  "Treasury Bills (T-Bills)",
  "7.75% GOI Savings Bond",
  "Tax free Bonds",
  "Zero coupon Bonds"
];

headings.forEach(h => {
  content = content.replace(`<p>${h}</p>`, `<h3>${h}</h3>`);
});

// 3. Fix the table
// Find the table block
content = content.replace(/<table[\s\S]*?<\/table>/g, (tableMatch) => {
  // Remove style attributes
  tableMatch = tableMatch.replace(/\s*style=\{\{[^}]*\}\}/g, '');
  
  // Remove className attributes from table, thead, tbody, tr, th, td
  tableMatch = tableMatch.replace(/<(table|thead|tbody|tr|th|td)\s+className=(['"])[^'"]*\2([^>]*)>/g, '<$1$3>');
  
  // Clean up any stray spaces left before the >
  tableMatch = tableMatch.replace(/<(table|thead|tbody|tr|th|td)\s+>/g, '<$1>');

  return `<div className="table-container">\n${tableMatch}\n</div>`;
});

// 4. Remove the rogue <div style={{...}}> wrapper if it exists around the table
// The file has `<div style=...>\n<div className="table-container">\n<table>...</table>\n</div>\n</div>`.
content = content.replace(/<div style=\{\{\s*overflowX:\s*'auto'[\s\S]*?\}\}>\s*(<div className="table-container">[\s\S]*?<\/div>)\s*<\/div>/g, '$1');

// Wait, the original file from git does NOT have `<div className="table-container">`.
// The original file just had `<div style=...>\n<table>...</table>\n</div>`.
// Our step 3 changed it to `<div style=...>\n<div className="table-container">\n<table>...</table>\n</div>\n</div>`.
// So the regex to unwrap is exactly:
content = content.replace(/<div style=\{\{\s*overflowX[^}]*\}\}>\s*(<div className="table-container">[\s\S]*?<\/div>)\s*<\/div>/g, '$1');


// Save it back
fs.writeFileSync('src/pages/posts/Post_government_bonds.jsx', content, 'utf8');
console.log('Restored and fixed Post_government_bonds.jsx');
