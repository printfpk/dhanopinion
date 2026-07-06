const fs = require('fs');
const path = require('path');

const articlesFilePath = path.join(__dirname, 'src/data/articles.js');
let articlesContent = fs.readFileSync(articlesFilePath, 'utf8');

// The categories from the screenshot
const allCategories = [
  "Asset Allocation", "Bank", "Compounding", "Direct funds", "Goal", 
  "Government scheme", "Index", "Inflation", "Interest", "Investment Strategy", 
  "Investments", "Liquid funds", "Liquid MF", "Mutual Fund", "NPS", 
  "Pension", "Regular MF", "Risk and return", "taxes"
];

// Helper to map old categories to new ones
const categoryMapping = {
  1: ["Risk and return", "Investments"], // There is always some risk
  2: ["Risk and return", "Investments"], // Diversification reduces risk
  3: ["Compounding", "Investments"], // Compounding
  4: ["Inflation", "Investments"], // Inflation
  5: ["Asset Allocation", "Investment Strategy"], // Asset Allocation
  7: ["Goal", "Investment Strategy"], // Horizon
  8: ["Risk and return", "Investments"], // Equity Risk
  9: ["Risk and return", "Investments"], // Fixed Income Risk
  10: ["Investment Strategy", "Investments"], // Active Passive
  11: ["Index", "Investment Strategy"], // Index Funds
  12: ["Investment Strategy", "Risk and return"], // Competitive Markets
  15: ["Investment Strategy", "Investments"], // Cost
  16: ["taxes", "Investments"], // Taxes
  17: ["Direct funds", "Regular MF", "Mutual Fund"], // Direct vs Regular
  18: ["Liquid funds", "Liquid MF", "Mutual Fund"], // Liquid MF
  19: ["NPS", "Pension", "Government scheme"], // NPS
  25: ["Bank", "Interest", "Investments"], // Bank FD
  21: ["Government scheme", "Interest"], // Gov Bonds
  22: ["Government scheme", "Investments"], // Gov Savings
  23: ["Government scheme", "Pension"], // SCSS
  24: ["Government scheme", "Investments"], // PPF
  26: ["Mutual Fund", "taxes", "Investments"] // ELSS
};

// We will parse the array and replace category strings with arrays.
const match = articlesContent.match(/export const allArticles = \[([\s\S]*?)\];/);
if (match) {
  const arrayContent = match[1];
  
  const updatedContent = arrayContent.replace(/\{([^}]+)\}/g, (fullMatch, objectContent) => {
    // Extract ID
    const idMatch = objectContent.match(/id:\s*(\d+)/);
    const id = idMatch ? parseInt(idMatch[1]) : null;
    
    // Extract file path
    const toMatch = objectContent.match(/to:\s*'([^']+)'/);
    const toPath = toMatch ? toMatch[1] : '';
    
    // Read the file to get content for searching
    let textContent = '';
    if (toPath) {
      // Map path to local jsx
      const filename = 'Post_' + toPath.split('/').filter(Boolean).slice(3).join('_').replace(/-/g, '_') + '.jsx';
      const jsxPath = path.join(__dirname, 'src/pages/posts', filename);
      if (fs.existsSync(jsxPath)) {
        const jsxContent = fs.readFileSync(jsxPath, 'utf8');
        // Strip out imports and html tags
        let stripped = jsxContent.replace(/import.*?;?/g, '').replace(/export default function.*?\s*\{/g, '');
        stripped = stripped.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().replace(/'/g, "\\'");
        textContent = stripped;
      }
    }

    // Replace category
    let newObject = objectContent;
    if (id && categoryMapping[id]) {
      const cats = JSON.stringify(categoryMapping[id]).replace(/"/g, "'");
      newObject = newObject.replace(/category:\s*'[^']+'/, `category: ${cats}`);
    }
    
    // Add textContent property
    if (!newObject.includes('textContent:')) {
      newObject += `, textContent: '${textContent.substring(0, 3000)}'`; // Truncate to save memory if too large
    }
    
    return `{${newObject}}`;
  });

  const finalResult = articlesContent.replace(match[0], `export const allArticles = [${updatedContent}];`);
  fs.writeFileSync(articlesFilePath, finalResult);
  console.log("Updated articles.js");
}
