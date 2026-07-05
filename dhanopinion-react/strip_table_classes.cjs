const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'src', 'pages', 'posts');

const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // 1. Remove Tailwind classes from table elements
  // We match className="something" or className='something'
  content = content.replace(/<(table|thead|tbody|tr|th|td)\s+className=(['"])[^'"]*\2([^>]*)>/g, '<$1$3>');
  
  // Clean up any stray spaces left before the >
  content = content.replace(/<(table|thead|tbody|tr|th|td)\s+>/g, '<$1>');

  // 2. Fix double wrapping: 
  // <div className="table-container my-8...">
  //   <div className="table-container">
  //     <table>
  content = content.replace(/<div\s+className="table-container[^"]*">\s*<div\s+className="table-container">\s*<table/g, '<div className="table-container">\n<table');
  
  // Fix the corresponding closing tags
  content = content.replace(/<\/table>\s*<\/div>\s*<\/div>/g, '</table>\n</div>');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Cleaned up classes in ${file}`);
  }
});
console.log('Done.');
