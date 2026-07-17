import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { PortableText } from '@portabletext/react'
import { client, urlFor } from '../sanityClient'
import PostLayout from '../components/PostLayout'
import { motion } from 'framer-motion'
import { AnimatedParagraph } from '../components/Animations'
import PageLoader from '../components/PageLoader'

export default function DynamicPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await client.fetch(
          `*[_type == "post" && slug.current == $slug][0] { 
            title, 
            publishedAt, 
            body,
            "categories": categories[]->title
          }`,
          { slug }
        )
        setPost(fetchedPost)
      } catch (err) {
        console.error("Error fetching post:", err)
      } finally {
        setLoading(false)
      }
    }

    if (slug) fetchPost()
  }, [slug])

  if (loading) {
    return <PageLoader />
  }

  if (!post) {
    return (
      <PostLayout title="Not Found">
        <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--pure)' }}>
          Article not found. <Link to="/information-centre" style={{ color: 'var(--gold)' }}>Return to Information Centre</Link>
        </div>
      </PostLayout>
    )
  }

  const d = new Date(post.publishedAt)
  const dateStr = !isNaN(d) ? d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) : ''

  const TableComponent = ({ value }) => {
    if (!value || !value.rows || value.rows.length === 0) return null
    const [headerRow, ...bodyRows] = value.rows

    // Render cell content — support both \n-separated and space-concatenated multi-line cells.
    // Sanity's @sanity/table plugin stores multi-item cells as one flat string without any
    // separator, so we split before known sentence-starting keywords.
    const SPLIT_BEFORE = [
      'Minimum amount per contribution',
      'Minimum contribution per',
      'Minimum number of contributions',
      'Not mandatory to contribute',
      'Restricted to death',
      'Flexible withdrawal',
    ]
    const splitCellIntoLines = (cell) => {
      if (!cell) return []
      // First try \n split
      if (cell.includes('\n')) return cell.split('\n').filter(l => l.trim())
      // Build a regex that splits BEFORE any of the known keywords (except the very start)
      const escaped = SPLIT_BEFORE.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      const pattern = new RegExp(`(?<=.)(?=${escaped.join('|')})`)
      const parts = cell.split(pattern).map(s => s.trim()).filter(Boolean)
      return parts
    }

    const renderCell = (cell) => {
      if (!cell) return null
      const lines = splitCellIntoLines(cell)
      if (lines.length <= 1) return cell
      return lines.map((line, i) => (
        <p key={i} style={{ margin: i === 0 ? 0 : '0.75rem 0 0', lineHeight: 1.5 }}>{line}</p>
      ))
    }


    return (
      <div className="table-container" style={{ overflowX: 'auto', margin: '1.5rem 0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
          {headerRow && (
            <thead>
              <tr>
                {headerRow.cells.map((cell, i) => (
                  <th key={i} style={{
                    padding: '12px 16px',
                    color: 'var(--pure)',
                    fontSize: '13px',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    borderBottom: '1px solid rgba(255,255,255,0.12)',
                    background: 'rgba(255,255,255,0.04)',
                    textAlign: 'left',
                    whiteSpace: 'nowrap',
                  }}>
                    {renderCell(cell)}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {bodyRows.map((row, ri) => (
              <tr key={ri}
                onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                style={{ transition: 'background 0.2s' }}
              >
                {row.cells.map((cell, ci) => (
                  <td key={ci} style={{
                    padding: '12px 16px',
                    fontSize: '15px',
                    borderBottom: '1px solid var(--hairline)',
                  }}>
                    {renderCell(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  const ImageComponent = ({ value }) => {
    if (!value || !value.asset) return null
    const imageUrl = urlFor(value).width(800).auto('format').url()
    const alt = value.alt || ''
    const caption = value.caption || ''
    return (
      <figure style={{ margin: '2rem 0', textAlign: 'center' }}>
        <img
          src={imageUrl}
          alt={alt}
          style={{
            maxWidth: '100%',
            width: '100%',
            borderRadius: '8px',
            display: 'block',
            margin: '0 auto',
          }}
        />
        {caption && (
          <figcaption style={{
            marginTop: '0.5rem',
            fontSize: '13px',
            color: 'var(--ash)',
            fontStyle: 'italic',
          }}>
            {caption}
          </figcaption>
        )}
      </figure>
    )
  }

  const components = {
    types: {
      table: TableComponent,
      image: ImageComponent,
    },
    block: {
      h1: ({children}) => <h1 style={{ marginTop: '2rem', marginBottom: '1rem' }}>{children}</h1>,
      h2: ({children}) => <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>{children}</h2>,
      h3: ({children}) => <h3 style={{ marginTop: '1.5rem', marginBottom: '0.75rem' }}>{children}</h3>,
      h4: ({children}) => <h4 style={{ marginTop: '1.5rem', marginBottom: '0.75rem' }}>{children}</h4>,
      h5: ({children}) => <h5 style={{ marginTop: '1.5rem', marginBottom: '0.75rem' }}>{children}</h5>,
      h6: ({children}) => <h6 style={{ marginTop: '1.5rem', marginBottom: '0.75rem' }}>{children}</h6>,
      normal: ({children}) => (
        <AnimatedParagraph>
          {children}
        </AnimatedParagraph>
      ),
    }
  }

  return (
    <PostLayout title={post.title}>
      <div className="uicore-body-content">
        <div id="uicore-page">
          <div id="content" className="uicore-content">
            <header className="uicore uicore-page-title elementor-section elementor-section-boxed">
              <div className="uicore-overlay"></div>
              <div className="uicore elementor-container">
                <p className="uicore-animate ui-breadcrumb">
                  <span><Link to="/">Home</Link></span>
                  <i className="uicore-separator uicore-i-arrow"></i>
                  <span><Link to="/information-centre">Information Centre</Link></span>
                  <i className="uicore-separator uicore-i-arrow"></i>
                  <span>{post.title}</span>
                </p>
                <h1 className="uicore-title uicore-animate h2" style={{ color: '#000000', marginTop: 0, marginBottom: '0.5rem' }}>{post.title}</h1>
                <div className="uicore-animate uicore-entry-meta" style={{ color: 'var(--ash)' }}>
                  <span className="ui-blog-date ui-published">{dateStr}</span>
                  {post.categories && post.categories.length > 0 && (
                    <span style={{ marginLeft: '1rem', color: 'var(--gold)' }}>
                      • {post.categories.join(', ')}
                    </span>
                  )}
                </div>
              </div>
            </header>
            <div id="primary" className="content-area">
              <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem 2rem 3rem' }}>
                <p className="post-date">{dateStr}</p>
                <PortableText value={post.body} components={components} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PostLayout>
  )
}
