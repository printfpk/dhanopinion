const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'gg3p2wwe',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-07-11',
  token: process.env.SANITY_AUTH_TOKEN || ''
});

async function deleteAllDrafts() {
  try {
    console.log("Fetching drafts...");
    // Just run a CLI command instead since we might not have a token
  } catch (err) {
    console.error(err);
  }
}

deleteAllDrafts();
