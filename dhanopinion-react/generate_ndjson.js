import fs from 'fs';
import { allArticles } from './src/data/articles.js';

const ndjson = allArticles.map(article => {
  // Generate a random key for portable text blocks
  const generateKey = () => Math.random().toString(36).substring(2, 9);
  
  // Clean up the text content (removing the JSX import strings)
  let cleanText = article.textContent || '';
  cleanText = cleanText.replace(/PostLayout from '[^']+'/g, '').trim();
  cleanText = cleanText.replace(/MediaSkeleton from '[^']+'/g, '').trim();
  cleanText = cleanText.replace(/return \(/g, '').trim();

  // Create the sanity document structure
  const doc = {
    _id: `article-${article.id}`,
    _type: 'post',
    title: article.title,
    slug: {
      _type: 'slug',
      current: article.to.replace(/^\/|\/$/g, '').replace(/\//g, '-') // convert /2023/08/04/slug/ to 2023-08-04-slug
    },
    publishedAt: new Date(article.date).toISOString(),
    body: [
      {
        _type: 'block',
        _key: generateKey(),
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: generateKey(),
            text: cleanText,
            marks: []
          }
        ]
      }
    ]
  };

  return JSON.stringify(doc);
}).join('\n');

fs.writeFileSync('./dhanopinion-studio/import.ndjson', ndjson);
console.log(`Generated import.ndjson with ${allArticles.length} articles.`);
