const fs=require('fs'); 
const content = fs.readFileSync('../src/pages/posts/Post_inflation_real_value_and_the_money_illusion.jsx', 'utf-8'); 
const bodyMatch = content.match(/<PostLayout[^>]*>([\s\S]*?)<\/PostLayout>/); 
let htmlContent = bodyMatch[1]; 

console.log("=== ORIGINAL ===");
console.log(htmlContent.substring(0, 500));

htmlContent = htmlContent.replace(/<p className="post-date"[^>]*>[\s\S]*?<\/p>/, ''); 
htmlContent = htmlContent.replace(/<MediaSkeleton[^>]*\/>/g, ''); 
htmlContent = htmlContent.replace(/className=/g, 'class='); 
htmlContent = htmlContent.replace(/<\/?\s*>/g, ''); 

console.log("=== TRANSFORMED ===");
console.log(htmlContent);
