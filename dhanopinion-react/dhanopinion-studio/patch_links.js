
// For Sanity V3 exec, we can just import the client from '@sanity/client' and use getCliClient
import { getCliClient } from 'sanity/cli'

const clientV3 = getCliClient({ apiVersion: '2024-07-11' })

async function run() {
  const doc = await clientV3.getDocument('stepsToSuccessSingleton')
  
  const step4Index = doc.steps.findIndex(s => s.num === '04')
  if (step4Index === -1) {
    console.error("Could not find step 04")
    return
  }

  const content = doc.steps[step4Index].content

  // Find the list items we need to link
  const linkTargets = [
    { text: "Index Investing Strategy", url: "/2023/08/11/index-funds" },
    { text: "When investing in a Mutual Fund, choose a Direct MF over a Regular MF", url: "/2023/08/18/when-investing-in-a-mutual-fund-choose-a-direct-mf-over-a-regular-mf" },
    { text: "Active and Passive Investment Management", url: "/2023/08/10/active-and-passive-investment-management" }
  ]

  let changed = false;

  content.forEach(block => {
    if (block._type === 'block' && block.listItem === 'bullet') {
      const textSpan = block.children[0]
      if (textSpan && textSpan._type === 'span') {
        const match = linkTargets.find(t => textSpan.text.includes(t.text))
        if (match) {
          const markKey = Math.random().toString(36).substring(7)
          
          if (!block.markDefs) block.markDefs = []
          
          // Add the mark definition for the link
          block.markDefs.push({
            _key: markKey,
            _type: 'link',
            href: match.url
          })
          
          // Add the mark to the span
          if (!textSpan.marks) textSpan.marks = []
          textSpan.marks.push(markKey)
          changed = true;
          console.log(`Added link to: ${match.text}`)
        }
      }
    }
  })

  if (changed) {
    await clientV3.patch('stepsToSuccessSingleton')
      .set({ [`steps[${step4Index}].content`]: content })
      .commit()
    console.log("Successfully patched links!")
  } else {
    console.log("No links needed patching.")
  }
}

run().catch(console.error)
