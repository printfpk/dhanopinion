// Patches the NPS post's table rows in Sanity to insert \n between contribution items
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'gg3p2wwe',
  dataset: 'production',
  apiVersion: '2024-07-11',
  useCdn: false,
});

// Map of known broken cell values -> correct values with \n separators
const FIXES = {
  'Minimum amount per contribution - \u20b9 500 Minimum contribution per Financial Year - \u20b9 1,000 Minimum number of contributions in a Financial Year \u2013 one':
    'Minimum amount per contribution - \u20b9 500\nMinimum contribution per Financial Year - \u20b9 1,000\nMinimum number of contributions in a Financial Year \u2013 one',
  'Minimum amount per contribution - \u20b9 250 Not mandatory to contribute every year':
    'Minimum amount per contribution - \u20b9 250\nNot mandatory to contribute every year',
};

async function main() {
  const posts = await client.fetch('*[_type == "post"]{_id, "slug": slug.current, body}');
  console.log('Fetched', posts.length, 'posts');

  for (const post of posts) {
    if (!post.body) continue;
    let changed = false;

    const newBody = post.body.map(block => {
      if (block._type !== 'table') return block;
      const newRows = block.rows.map(row => {
        const newCells = row.cells.map(cell => {
          if (FIXES[cell]) {
            console.log('  Fixing cell in', post.slug, ':', cell.substring(0, 50) + '...');
            changed = true;
            return FIXES[cell];
          }
          return cell;
        });
        return Object.assign({}, row, { cells: newCells });
      });
      return Object.assign({}, block, { rows: newRows });
    });

    if (changed) {
      console.log('Patching post:', post.slug, '(' + post._id + ')');
      await client.patch(post._id).set({ body: newBody }).commit();
      console.log('  Done');
    }
  }
  console.log('All done.');
}

main().catch(e => { console.error(e); process.exit(1); });
