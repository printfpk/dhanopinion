const { createClient } = require('@sanity/client');
const client = createClient({ projectId: 'gg3p2wwe', dataset: 'production', useCdn: false, apiVersion: '2024-07-11' });

async function test() {
  try {
    const fetchedPosts = await client.fetch(`*[_type == "post"] | order(publishedAt desc) { 
            _id, 
            title, 
            "slug": slug.current, 
            publishedAt, 
            "categories": categories[]->title,
            "textContent": pt::text(body) 
          }`);
    console.log(fetchedPosts[0]);
  } catch (err) {
    console.error(err);
  }
}
test();
