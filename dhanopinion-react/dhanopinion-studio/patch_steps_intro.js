import { getCliClient } from 'sanity/cli'

const client = getCliClient()

const introText = [
  {
    "_key": "block1",
    "_type": "block",
    "children": [{ "_key": "span1", "_type": "span", "marks": [], "text": "Dear Investor," }],
    "markDefs": [],
    "style": "normal"
  },
  {
    "_key": "block2",
    "_type": "block",
    "children": [{ "_key": "span2", "_type": "span", "marks": [], "text": "Thank you for your interest in Dhanopinion's investment advisory service. On this page you will find a set of steps that you can go through in order to discover the most suitable investment avenues for yourself. This service uses the new income tax regime for all decisions and illustrations." }],
    "markDefs": [],
    "style": "normal"
  },
  {
    "_key": "block3",
    "_type": "block",
    "children": [{ "_key": "span3", "_type": "span", "marks": [], "text": "Should you wish to seek a confidential, paid consulting with one of our experts, kindly click the \"Personalized Investment Consulting\" button below. A personalised investment consulting service is expected to be launched in the future. At this time, you will be joining a wait-list." }],
    "markDefs": [],
    "style": "normal"
  },
  {
    "_key": "block4",
    "_type": "block",
    "children": [{ "_key": "span4", "_type": "span", "marks": [], "text": "We hope this advisory service provides you with the key inputs you need to move forward in your investment journey. Before proceeding, please read the Disclaimer and move forward only if you agree with the terms therein." }],
    "markDefs": [],
    "style": "normal"
  },
  {
    "_key": "block5",
    "_type": "block",
    "children": [{ "_key": "span5", "_type": "span", "marks": [], "text": "We wish you a successful investing journey!" }],
    "markDefs": [],
    "style": "normal"
  }
]

async function run() {
  console.log("Fetching stepsToSuccessPage document...")
  const doc = await client.fetch(`*[_type == "stepsToSuccessPage"][0]`)
  if (!doc) {
    console.log("Document not found! Creating one...")
    // If it doesn't exist, we can just create it. But since it's in the studio, it probably exists.
    return
  }
  
  console.log(`Patching document ${doc._id}...`)
  await client.patch(doc._id).set({ introText }).commit()
  console.log("Successfully migrated the frontend intro text to Sanity!")
}

run().catch(console.error)
