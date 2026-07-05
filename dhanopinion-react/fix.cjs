const fs = require('fs');
const path = require('path');
const dir = 'c:\\Users\\prash\\OneDrive\\Desktop\\Frontend projects\\dhan003\\dhanopinion\\dhanopinion-react\\src\\pages\\posts';
const files = fs.readdirSync(dir);

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const dateRegex = new RegExp('<p>\\s*(' + months.join('|') + ')\\s+(\\d{1,2}),\\s+(\\d{4})\\s*</p>', 'g');

for (const file of files) {
  if (file.endsWith('.jsx')) {
    const p = path.join(dir, file);
    let content = fs.readFileSync(p, 'utf8');
    
    // Fix the broken tags that powershell created
    content = content.replace(/<>([A-Z][a-z]+\s+\d{1,2},\s+\d{4})<\/p>/g, '<p className="post-date">$1</p>');

    // Apply the date class to any valid <p>Date</p>
    content = content.replace(dateRegex, '<p className="post-date">$1 $2, $3</p>');

    fs.writeFileSync(p, content);
  }
}
console.log('Fixed syntax errors');
