import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { PortableText } from '@portabletext/react'
import { client } from '../sanityClient'
import PostLayout from '../components/PostLayout'
import PageLoader from '../components/PageLoader'

export default function DynamicStep() {
  const { stepSlug } = useParams()
  const [stepData, setStepData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStep = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "stepsToSuccessPage"][0]{
            steps[]{
              num,
              title,
              link,
              content
            }
          }`
        )
        
        if (data && data.steps) {
          // Find the exact step from the array
          const currentIndex = data.steps.findIndex(s => s.link === stepSlug)
          
          if (currentIndex !== -1) {
            const currentStep = data.steps[currentIndex]
            const prevStep = currentIndex > 0 ? data.steps[currentIndex - 1] : null
            const nextStep = currentIndex < data.steps.length - 1 ? data.steps[currentIndex + 1] : null
            
            setStepData({
              ...currentStep,
              prevLink: prevStep ? `/steps/${prevStep.link}` : null,
              nextLink: nextStep ? `/steps/${nextStep.link}` : null
            })
          }
        }
      } catch (err) {
        console.error("Error fetching step:", err)
      } finally {
        setLoading(false)
      }
    }

    if (stepSlug) fetchStep()
  }, [stepSlug])

  if (loading) return <PageLoader />

  if (!stepData) {
    return (
      <PostLayout title="Not Found">
        <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--pure)' }}>
          Step not found. <Link to="/steps-to-success" style={{ color: 'var(--gold)' }}>Return to Steps to Success</Link>
        </div>
      </PostLayout>
    )
  }

  // Custom component map to handle Sanity PortableText tables
  const components = {
    types: {
      table: ({ value }) => {
        if (!value || !value.rows || value.rows.length === 0) return null;
        return (
          <div className="table-container mb-5">
            <table>
              <thead>
                <tr>
                  {value.rows[0].cells.map((cell, idx) => (
                    <th key={idx} style={{ padding: '12px 16px', color: 'var(--pure)', fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)' }}>
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {value.rows.slice(1).map((row, rowIdx) => (
                  <tr key={rowIdx}>
                    {row.cells.map((cell, cellIdx) => (
                      <td key={cellIdx} style={{ padding: '12px 16px', fontSize: 15, borderBottom: '1px solid var(--hairline)' }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      }
    },
    block: {
      normal: ({ children }) => <p className="t-body mb-5">{children}</p>,
      h2: ({ children }) => <h2 className="mb-4" style={{ color: 'var(--gold)' }}>{children}</h2>,
      h3: ({ children }) => <h3 className="mb-3">{children}</h3>,
      blockquote: ({ children }) => (
        <div style={{ background: 'rgba(212,168,83,0.06)', border: '1px solid rgba(212,168,83,0.2)', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          {children}
        </div>
      )
    },
    list: {
      bullet: ({ children }) => <ul style={{ paddingLeft: '20px', marginBottom: '24px' }}>{children}</ul>,
      number: ({ children }) => <ol style={{ paddingLeft: '20px', marginBottom: '24px' }}>{children}</ol>
    },
    listItem: {
      bullet: ({ children }) => <li className="t-body" style={{ marginBottom: '12px' }}>{children}</li>,
      number: ({ children }) => <li className="t-body" style={{ marginBottom: '12px' }}>{children}</li>
    }
  }

  return (
    <PostLayout 
      title={stepData.title} 
      preTitle={`Step ${stepData.num}`} 
      prevLink={stepData.prevLink} 
      nextLink={stepData.nextLink}
    >
      <PortableText value={stepData.content} components={components} />
    </PostLayout>
  )
}
