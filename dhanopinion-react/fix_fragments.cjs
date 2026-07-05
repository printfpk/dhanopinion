const fs = require('fs');
const path = require('path');
const dir = 'c:\\Users\\prash\\OneDrive\\Desktop\\Frontend projects\\dhan003\\dhanopinion\\dhanopinion-react\\src\\pages\\posts';
const files = fs.readdirSync(dir);

for (const file of files) {
  if (file.endsWith('.jsx')) {
    const p = path.join(dir, file);
    let content = fs.readFileSync(p, 'utf8');

    // Replace <>Text<> with <h2>Text</h2>
    // This fixes the bug where PowerShell ate the variables and replaced <h3 and </h3 with just <
    if (/<>[^<]+<>/.test(content)) {
      content = content.replace(/<>([^<]+)<>/g, '<h2>$1</h2>');
      fs.writeFileSync(p, content);
      console.log('Fixed fragments in', file);
    }
  }
}
