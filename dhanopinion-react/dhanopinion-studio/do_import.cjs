const { createClient } = require('@sanity/client')
const { sanityImport } = require('@sanity/import')
const fs = require('fs')

const client = createClient({
  projectId: 'gg3p2wwe',
  dataset: 'production',
  token: 'skgRADIen78xxR7HZkojakaFilHs3RbeFIhY9b5cdx5eCRLOOtL0gnQcKkARdjwjbD5SUrrjZEVkWG0qz',
  apiVersion: '2023-01-01',
  useCdn: false
})

const stream = fs.createReadStream('import.ndjson')
console.log('Starting Sanity Import...')

sanityImport(stream, {
  client: client,
  operation: 'createOrReplace',
  allowFailingAssets: true
}).then(({numDocs, warnings}) => {
  console.log('Successfully imported', numDocs, 'documents.')
  if (warnings && warnings.length > 0) {
    console.log('Warnings:', warnings)
  }
}).catch(console.error)
