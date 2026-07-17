const { createClient } = require('@sanity/client');
const client = createClient({
  projectId: 'gg3p2wwe',
  dataset: 'production',
  apiVersion: '2024-07-11',
  useCdn: false,
});
client.fetch('*[_type=="post"]{title, publishedAt}').then(posts => {
  posts.forEach(p => console.log(p.title, "|||", p.publishedAt));
});
