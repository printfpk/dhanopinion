import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'gg3p2wwe',
  dataset: 'production',
  token: 'skgRADIen78xxR7HZkojakaFilHs3RbeFIhY9b5cdx5eCRLOOtL0gnQcKkARdjwjbD5SUrrjZEVkWG0qz',
  apiVersion: '2023-01-01',
  useCdn: false
})

async function run() {
  const query = `*[_type == "post" && defined(body)]`
  const posts = await client.fetch(query)
  let updatedCount = 0

  for (const post of posts) {
    let needsUpdate = false
    const newBody = post.body.map(element => {
      if (element._type === 'span') {
        needsUpdate = true
        return {
          _type: 'block',
          _key: element._key || Math.random().toString(36).substring(2, 9),
          style: 'normal',
          markDefs: [],
          children: [
            {
              _type: 'span',
              _key: Math.random().toString(36).substring(2, 9),
              text: element.text || '',
              marks: []
            }
          ]
        }
      }
      return element
    })

    if (needsUpdate) {
      console.log(`Fixing post: ${post._id} - ${post.title}`)
      await client
        .patch(post._id)
        .set({ body: newBody })
        .commit()
      updatedCount++
    }
  }

  console.log(`Updated ${updatedCount} posts.`)
}

run().catch(console.error)
