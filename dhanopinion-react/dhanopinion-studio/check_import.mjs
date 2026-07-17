import fs from 'fs';

const data = fs.readFileSync('import.ndjson', 'utf-8').split('\n').filter(Boolean).map(JSON.parse);
const article11 = data.find(d => d._id === 'article-11');

if (article11) {
  const tableBlock = article11.body.find(b => b._type === 'table');
  console.log("Root level table block:", JSON.stringify(tableBlock, null, 2));

let invalidTable = null;
for (const article of data) {
  if (!article.body) continue;
  for (const block of article.body) {
    if (block._type === 'block' && block.children) {
      const badChild = block.children.find(c => c._type === 'table');
      if (badChild) {
        invalidTable = { articleId: article._id, badChild };
        break;
      }
    }
  }
}

if (invalidTable) {
  console.log("FOUND INVALID TABLE INSIDE CHILDREN!", JSON.stringify(invalidTable, null, 2));
} else {
  console.log("No tables found inside children in ANY article!");
}
} else {
  console.log("Could not find article-11");
}
