const { createClient } = require('@sanity/client');
const client = createClient({ projectId: 'gg3p2wwe', dataset: 'production', useCdn: false, apiVersion: '2024-07-11' });
client.fetch('*[_type == "post" && slug.current match "2023 08 08 risk and return profile of equity*"][0] { body }').then(res => {
  const h1s = res.body.filter(b => b.style === 'h1');
  console.log('H1 blocks:', JSON.stringify(h1s, null, 2));
}).catch(console.error);
