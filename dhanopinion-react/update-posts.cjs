const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, 'src', 'pages', 'posts');
const assetsDir = path.join(__dirname, 'src', 'assets', 'posts');

// Read all post component files
const postFiles = fs.readdirSync(postsDir).filter(f => f.endsWith('.jsx'));

postFiles.forEach(file => {
  const slug = file.replace('Post_', '').replace('.jsx', '').replace(/_/g, '-');
  const assetFile = path.join(assetsDir, `${slug}.html`);
  
  if (!fs.existsSync(assetFile)) {
    console.log(`Skipping ${file} - no asset file found for ${slug}`);
    return;
  }

  // Read the HTML to extract the title
  const html = fs.readFileSync(assetFile, 'utf8');
  const titleMatch = html.match(/<h1[^>]*>([^<]*(?:<[^/][^>]*>[^<]*)*)<\/h1>/i);
  let title = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  if (titleMatch) {
    title = titleMatch[1].replace(/<[^>]+>/g, '').trim();
  }

  // Extract just the main content body text
  // Find the elementor content area
  let bodyContent = html;
  
  // Remove header/nav
  bodyContent = bodyContent.replace(/<div[^>]*id="wrapper-navbar"[^>]*>[\s\S]*?<\/div><!--\s*#wrapper-navbar end\s*-->/gi, '');
  // Remove footer
  bodyContent = bodyContent.replace(/<div[^>]*data-elementor-type="footer"[\s\S]*$/gi, '');
  // Remove mobile nav
  bodyContent = bodyContent.replace(/<div[^>]*class="uicore-navigation-wrapper[\s\S]*$/gi, '');
  // Remove back-to-top
  bodyContent = bodyContent.replace(/<div[^>]*id="uicore-back-to-top"[\s\S]*?<\/div>/gi, '');
  // Remove popup
  bodyContent = bodyContent.replace(/<div[^>]*data-elementor-type="popup"[\s\S]*$/gi, '');
  // Remove scripts
  bodyContent = bodyContent.replace(/<script[\s\S]*?<\/script>/gi, '');
  // Remove style tags
  bodyContent = bodyContent.replace(/<style[\s\S]*?<\/style>/gi, '');

  const componentName = file.replace('.jsx', '');

  const newContent = `import PostLayout from '../../components/PostLayout'

export default function ${componentName}() {
  return (
    <PostLayout title="${title.replace(/"/g, '\\"')}">
      <div dangerouslySetInnerHTML={{ __html: \`${bodyContent.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\` }} />
    </PostLayout>
  )
}
`;

  fs.writeFileSync(path.join(postsDir, file), newContent);
  console.log(`Updated ${file} with title: ${title}`);
});

console.log('\\nDone updating all post pages!');
