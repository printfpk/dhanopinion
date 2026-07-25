import { getCliClient } from 'sanity/cli'

const client = getCliClient()

const generateKey = () => Math.random().toString(36).substring(2, 10);

const contactFields = [
  { _key: generateKey(), name: 'contactName', label: 'Name', inputType: 'text', required: true },
  { _key: generateKey(), name: 'contactEmail', label: 'Email', inputType: 'email', required: true },
  { _key: generateKey(), name: 'contactPhone', label: 'Phone Number', inputType: 'tel', required: true },
  { _key: generateKey(), name: 'message', label: 'Message', inputType: 'textarea', required: true },
];

const feedbackFields = [
  { _key: generateKey(), name: 'name', label: 'Name', inputType: 'text', required: true },
  { _key: generateKey(), name: 'mobile', label: 'Mobile', inputType: 'tel', required: true },
  { _key: generateKey(), name: 'email', label: 'Email', inputType: 'email', required: true },
  { _key: generateKey(), name: 'isUseful', label: 'Is DhanOpinion useful?', inputType: 'radio', options: ['Yes', 'No'], required: true },
  { _key: generateKey(), name: 'knowFees', label: 'Do you know how much you are paying for your investments?', inputType: 'radio', options: ['Yes', 'No'], required: true },
  { _key: generateKey(), name: 'knowStocksPct', label: 'Do you know what percentage of your investments are in stocks?', inputType: 'radio', options: ['Yes', 'No'], required: true },
  { _key: generateKey(), name: 'willingToPay', label: 'Would you be willing to pay anything to cover costs?', inputType: 'radio', options: ['Yes', 'No'], required: true },
  { _key: generateKey(), name: 'valuableThings', label: 'What else would be valuable to you?', inputType: 'textarea', required: true },
  { _key: generateKey(), name: 'anythingElse', label: 'Anything else you would like to share?', inputType: 'textarea', required: true },
];

async function migrateForms() {
  console.log('Fetching documents with portable text...');
  // Find standard pages, information centre pages, simple strategy pages, etc. 
  // We'll just fetch all documents that have a 'body' array (Portable Text).
  const docs = await client.fetch(`*[_type in ["page", "easyWinsPage", "simpleStrategyPage", "philosophyPage", "informationCentrePage", "caseStudiesPage", "stepsToSuccessPage", "homePage", "post"] && defined(body)]`);
  
  let migratedCount = 0;

  for (const doc of docs) {
    let hasChanges = false;
    const newBody = doc.body.map(block => {
      if (block._type === 'formBlock') {
        if (block.formType === 'contact') {
          console.log(`Migrating Contact Form in document: ${doc.title || doc._id}`);
          hasChanges = true;
          return {
            ...block,
            formType: 'custom',
            title: 'Contact Us',
            subtitle: 'Have a question? Send us a message or email us at response@dhanopinion.com.',
            submitButtonText: 'Send Message',
            destinationEmail: 'response@dhanopinion.com',
            fields: contactFields.map(f => ({ ...f, _key: generateKey() }))
          };
        } else if (block.formType === 'feedback') {
          console.log(`Migrating Feedback Form in document: ${doc.title || doc._id}`);
          hasChanges = true;
          return {
            ...block,
            formType: 'custom',
            title: 'Leave Feedback',
            subtitle: 'If you have specific suggestions or expertise you would like to contribute, please let us know.',
            submitButtonText: 'Submit Feedback',
            fields: feedbackFields.map(f => ({ ...f, _key: generateKey() }))
          };
        }
      }
      return block;
    });

    if (hasChanges) {
      console.log(`Patching document: ${doc._id}`);
      await client.patch(doc._id).set({ body: newBody }).commit();
      migratedCount++;
    }
  }

  console.log(`Migration complete! Updated ${migratedCount} documents.`);
}

migrateForms().catch(console.error);
