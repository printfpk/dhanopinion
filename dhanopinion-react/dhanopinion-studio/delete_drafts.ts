import { getCliClient } from 'sanity/cli'

const client = getCliClient()

async function deleteDrafts() {
  console.log("Fetching drafts...");
  const drafts = await client.fetch(`*[_id in path("drafts.**")]`);
  console.log(`Found ${drafts.length} drafts.`);
  
  if (drafts.length === 0) return;

  const transaction = client.transaction();
  drafts.forEach(draft => {
    transaction.delete(draft._id);
  });

  console.log("Deleting drafts...");
  await transaction.commit();
  console.log("Drafts deleted.");
}

deleteDrafts().catch(console.error);
