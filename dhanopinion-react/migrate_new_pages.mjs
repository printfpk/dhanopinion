import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'gg3p2wwe', // from sanityClient.js in src
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-07-11',
  token: process.env.SANITY_TOKEN || 'skV4gWlYV34Otb3xQ2bJQKpP0xN6zJpY6sZ2c3sV4gWlYV34Otb3xQ2bJQKpP0xN6zJpY6sZ2c3s', // This is a placeholder, but actually we can just output NDJSON and import it!
});
