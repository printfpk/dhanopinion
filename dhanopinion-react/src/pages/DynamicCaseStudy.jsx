import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { PortableText } from '@portabletext/react'
import { client } from '../sanityClient'
import PostLayout from '../components/PostLayout'
import PageLoader from '../components/PageLoader'

export default function DynamicCaseStudy() {
  const { id } = useParams()
  const [caseData, setCaseData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCaseStudy = async () => {
      try {
        const pageData = await client.fetch(
          `*[_type == "caseStudiesPage"][0] { 
            cases[] {
              id,
              title,
              content
            }
          }`
        )
        if (pageData && pageData.cases) {
          const foundCase = pageData.cases.find(c => c.id === id)
          setCaseData(foundCase)
        }
      } catch (err) {
        console.error("Error fetching case study:", err)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchCaseStudy()
  }, [id])

  if (loading) {
    return <PageLoader />
  }

  if (!caseData) {
    return (
      <PostLayout title="Not Found">
        <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--pure)' }}>
          Case Study not found. <Link to="/case-studies" style={{ color: 'var(--gold)' }}>Return to Case Studies</Link>
        </div>
      </PostLayout>
    )
  }

  const customComponents = {
    block: {
      h2: ({ children }) => <h2 style={{ marginTop: '2rem' }}>{children}</h2>,
    }
  }

  return (
    <PostLayout title={caseData.title}>
      {caseData.content ? (
        <PortableText value={caseData.content} components={customComponents} />
      ) : (
        <p style={{ textAlign: 'center', marginTop: 32, opacity: 0.5 }}>
          Data coming soon.
        </p>
      )}
    </PostLayout>
  )
}
