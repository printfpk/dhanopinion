const fs = require('fs');
const xml = fs.readFileSync('public/temp_docx/word/document.xml', 'utf8');
const rels = fs.readFileSync('public/temp_docx/word/_rels/document.xml.rels', 'utf8');

const matches = [...xml.matchAll(/r:(embed|id)="([^"]+)"/g)];
matches.forEach(m => {
  const rId = m[2];
  if (!rId.startsWith('rId')) return;
  const relMatch = new RegExp('Id="' + rId + '"[^>]*Target="([^"]+)"').exec(rels);
  const target = relMatch ? relMatch[1] : '';
  if (!target.includes('media/')) return;
  const idx = m.index;
  const ctx = xml.slice(Math.max(0, idx - 1000), idx + 1000).replace(/<[^>]+>/g, '');
  console.log('--- IMAGE:', target);
  console.log(ctx.slice(0, 150) + ' ... ' + ctx.slice(-150));
});
