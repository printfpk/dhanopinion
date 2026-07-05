const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'src', 'pages', 'posts');

const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  content = content.replace(/<table[\s\S]*?<\/table>/g, (tableMatch) => {
    // 1. Replace adjacent closing and opening paragraphs with breaks
    let fixedTable = tableMatch.replace(/<\/p>\s*<p>/g, '<br /><br />');
    
    // 2. Strip any remaining <p> or </p> tags inside the table completely
    fixedTable = fixedTable.replace(/<\/?p[^>]*>/g, '');
    
    return fixedTable;
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed paragraphs in ${file}`);
  }
});
console.log('Done.');
