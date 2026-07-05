const fs = require('fs');
const path = require('path');
const dir = 'c:\\Users\\prash\\OneDrive\\Desktop\\Frontend projects\\dhan003\\dhanopinion\\dhanopinion-react\\src\\pages\\posts';
const files = fs.readdirSync(dir);

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const dateRegex = new RegExp('<p>\\s*(' + months.join('|') + ')\\s+(\\d{1,2}),\\s+(\\d{4})\\s*</p>', 'g');

for (const file of files) {
  if (file.endsWith('.jsx')) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Remove all inline style attributes from p, h1, h2, h3, h4, ul, ol, li
    content = content.replace(/<(p|h[1-6]|ul|ol|li)\s+style=\{[^}]+\}/g, '<$1');
    
    // 2. Remove all className attributes from p, h1, h2, h3, h4, ul, ol, li
    content = content.replace(/<(p|h[1-6]|ul|ol|li)\s+className=(["'])[^\2]*?\2/g, '<$1');
    
    // Clean up empty spaces in tags like <p > -> <p>
    content = content.replace(/<(p|h[1-6]|ul|ol|li)\s+>/g, '<$1>');

    // 3. Find paragraphs containing ONLY a date, and add className='post-date'
    content = content.replace(dateRegex, (match, month, day, year) => {
      return `<p className="post-date">${month} ${day}, ${year}</p>`;
    });

    fs.writeFileSync(filePath, content);
  }
}
console.log('Done!');
