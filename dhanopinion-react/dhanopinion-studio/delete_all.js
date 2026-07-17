import { getCliClient } from 'sanity/cli'

async function deleteAll() {
  const client = getCliClient()
  console.log('Deleting all posts...')
  const docs = await client.fetch('*[_type == "post"]')
  console.log(`Found ${docs.length} documents.`)
  const transaction = client.transaction()
  docs.forEach(doc => {
    transaction.delete(doc._id)
  })
  await transaction.commit()
  console.log('Deleted all posts.')
}

deleteAll().catch(console.error)
