import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RevealChar } from '../components/Animations'
import { client } from '../sanityClient'
import { PortableText } from '@portabletext/react'
import { PortableTextComponents } from '../components/PortableTextComponents'

const f = (d = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, delay: d, ease: [0.16, 1, 0.3, 1] }
})

export default function AboutUs() {
  const [expanded, setExpanded] = useState(false)
  const [pageData, setPageData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client.fetch(`*[_type == "page" && slug.current == "about-us"][0]`)
      .then(data => {
        setPageData(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (!loading && window.location.hash === '#contact') {
      setTimeout(() => {
        const el = document.getElementById('contact')
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 400)
    }
  }, [loading])

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--black)' }}>
        <p style={{ color: 'var(--gold)', letterSpacing: '0.1em' }}>LOADING...</p>
      </div>
    )
  }

  if (!pageData) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--black)' }}>
        <p style={{ color: 'var(--pure)', letterSpacing: '0.1em' }}>Page not found.</p>
      </div>
    )
  }

  const title = pageData.title || 'About Us'
  
  // Separate text blocks and form blocks
  const body = pageData.body || []
  const textBlocks = body.filter(b => b._type === 'block' && b.style !== 'h2')
  const firstParagraph = textBlocks.slice(0, 1)
  const remainingParagraphs = textBlocks.slice(1)
  const formBlocks = body.filter(b => b._type === 'formBlock')

  return (
    <>
      {/* ── Hero ── */}
      <section style={{ background: 'var(--black)', padding: '80px 0 60px', borderBottom: '1px solid var(--hairline)' }}>
        <div className="wrap">
          <RevealChar as="h1" text={title} className="t-mega mb-6" />
        </div>
      </section>

      {/* ── Intro paragraph with Read More ── */}
      <section className="sec" style={{ background: 'var(--void)', borderBottom: '1px solid var(--hairline)' }}>
        <div className="wrap" style={{ maxWidth: 860 }}>
          <motion.div {...f(0.1)}>
            <PortableText value={firstParagraph} components={PortableTextComponents} />

            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <PortableText value={remainingParagraphs} components={PortableTextComponents} />
                </motion.div>
              )}
            </AnimatePresence>

            {remainingParagraphs.length > 0 && (
              <button
                onClick={() => setExpanded(v => !v)}
                style={{
                  background: 'none',
                  border: '1px solid var(--hairline)',
                  color: 'var(--gold)',
                  padding: '10px 24px',
                  fontSize: '14px',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  transition: 'all 0.3s',
                  marginTop: 8
                }}
                onMouseOver={e => { e.target.style.background = 'var(--gold)'; e.target.style.color = 'var(--black)' }}
                onMouseOut={e => { e.target.style.background = 'none'; e.target.style.color = 'var(--gold)' }}
              >
                {expanded ? 'Read Less ↑' : 'Read More ↓'}
              </button>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── Forms Section: Contact & Feedback ── */}
      {formBlocks.length > 0 && (
        <section id="contact" style={{ background: 'var(--void)', padding: '60px 0', borderBottom: '1px solid var(--hairline)' }}>
          <div className="wrap">
            <div className="about-forms-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '64px' }}>
              <PortableText value={formBlocks} components={PortableTextComponents} />
            </div>
          </div>
        </section>
      )}
    </>
  )
}
