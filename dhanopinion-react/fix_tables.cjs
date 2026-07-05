const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'src', 'pages', 'posts');

const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // 1. Remove inline styles from table, tr, th, td (we're using global CSS)
  content = content.replace(/<(table|tr|th|td)[^>]*style=\{\{[^}]*\}\}[^>]*>/g, (match, tag) => {
    return match.replace(/\s*style=\{\{[^}]*\}\}/, '');
  });

  // 2. Wrap tables in <div className="table-container"> if not already wrapped
  // This regex matches a <table>...</table> that is not preceded by <div className="table-container">
  // Since JSX can span multiple lines, we'll use a replacer function.
  
  // First, temporarily unwrap tables already wrapped to avoid double wrapping during regex
  content = content.replace(/<div className="table-container">\s*(<table[\s\S]*?<\/table>)\s*<\/div>/g, '$1');

  // Find all table blocks
  content = content.replace(/<table[\s\S]*?<\/table>/g, (tableMatch) => {
    // 3. Fix the first row headers if they are <td>
    let rowCount = 0;
    tableMatch = tableMatch.replace(/<tr[\s\S]*?<\/tr>/g, (trMatch) => {
      rowCount++;
      if (rowCount === 1) {
        // If the first row contains <td>, convert them to <th>
        if (trMatch.includes('<td')) {
          let newTr = trMatch.replace(/<td/g, '<th').replace(/<\/td>/g, '</th>');
          // Also remove <p> tags inside these new <th>
          newTr = newTr.replace(/<th>\s*<p>(.*?)<\/p>\s*<\/th>/g, '<th>$1</th>');
          return newTr;
        }
      }
      return trMatch;
    });

    // We also want to strip <p> from ALL td cells because our global CSS formats td fine without <p>
    // In some tables, data cells have <p> which adds too much margin.
    tableMatch = tableMatch.replace(/<td>\s*<p>(.*?)<\/p>\s*<\/td>/g, '<td>$1</td>');
    
    // Check if the table needs semantic thead/tbody (basic check)
    // If it has <th> but no <thead>, we could add it, but our CSS works without it.
    
    return `<div className="table-container">\n        ${tableMatch}\n      </div>`;
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated tables in ${file}`);
  }
});
console.log('Done.');
