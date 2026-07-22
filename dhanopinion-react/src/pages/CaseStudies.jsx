import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { RevealChar } from '../components/Animations'
import { client } from '../sanityClient'

export default function CaseStudies() {
  const [minAge, setMinAge] = useState(0)
  const [minEquity, setMinEquity] = useState(0)
  const [risk, setRisk] = useState('Risk Taking Ability')
  const [cases, setCases] = useState([])
  const [pageTitle, setPageTitle] = useState('Case Studies')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client.fetch(`*[_type == "caseStudiesPage"][0]{
      title,
      cases[] {
        id,
        title,
        desc,
        age,
        equity,
        risk
      }
    }`).then(data => {
      if (data) {
        if (data.title) setPageTitle(data.title)
        if (data.cases) setCases(data.cases)
      }
      setLoading(false)
    }).catch(err => {
      console.error(err)
      setLoading(false)
    })
  }, [])

  const handleReset = () => {
    setMinAge(0)
    setMinEquity(0)
    setRisk('Risk Taking Ability')
  }

  const filtered = cases.filter(c => {
    if (c.age < minAge) return false
    if (c.equity < minEquity) return false
    if (risk !== 'Risk Taking Ability' && c.risk !== risk) return false
    return true
  })

  if (loading) return null;

  return (
    <>
      <section className="sec" style={{ background: 'var(--black)', borderBottom: '1px solid var(--hairline)' }}>
        <div className="wrap pt-8 pb-8">

          <RevealChar as="h1" text={pageTitle} className="t-mega mb-5" />
        </div>
      </section>

      <section className="sec" style={{ background: 'var(--void)' }}>
        <div className="wrap" style={{ display: 'flex', gap: '4rem', alignItems: 'flex-start' }}>
          
          {/* Sidebar */}
          <div className="filters-sidebar" style={{ width: '300px', flexShrink: 0, padding: '2rem', background: 'var(--iron)', borderRadius: '12px', position: 'sticky', top: '100px' }}>
            <h3 style={{ color: 'var(--pure)', marginBottom: '2rem', fontSize: '18px', fontWeight: 300, fontFamily: 'var(--font-heading)' }}>Filters</h3>
            
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', color: 'var(--gold)', marginBottom: '1rem', fontSize: '14px' }}>Age</label>
              <input 
                type="range" 
                min="0" max="100" 
                value={minAge} 
                onChange={e => setMinAge(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--pure)' }}
              />
              <div style={{ textAlign: 'center', marginTop: '0.5rem', color: 'var(--pure)', fontSize: '14px' }}>
                {minAge} — 100
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', color: 'var(--gold)', marginBottom: '1rem', fontSize: '14px' }}>Percentage equity exposure</label>
              <input 
                type="range" 
                min="0" max="100" 
                value={minEquity} 
                onChange={e => setMinEquity(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--pure)' }}
              />
              <div style={{ textAlign: 'center', marginTop: '0.5rem', color: 'var(--pure)', fontSize: '14px' }}>
                {minEquity} — 100
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', color: 'var(--gold)', marginBottom: '1rem', fontSize: '14px' }}>Risk Taking Ability</label>
              <select 
                value={risk} 
                onChange={e => setRisk(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', background: 'var(--pure)', border: 'none', borderRadius: '4px', fontSize: '14px', outline: 'none', cursor: 'pointer', color: 'var(--black)' }}
              >
                <option>Risk Taking Ability</option>
                <option>Low</option>
                <option>High</option>
              </select>
            </div>

            <button 
              onClick={handleReset}
              style={{ width: '100%', padding: '0.75rem', background: 'var(--pure)', color: 'var(--black)', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 500, fontSize: '14px', transition: 'opacity 0.2s' }}
              onMouseOver={e => e.currentTarget.style.opacity = 0.8}
              onMouseOut={e => e.currentTarget.style.opacity = 1}
            >
              Reset
            </button>
          </div>

          {/* List */}
          <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${minAge}-${minEquity}-${risk}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {filtered.map((c, i) => (
                  <div 
                    key={c.id}
                    style={{ borderBottom: '1px solid var(--hairline)', paddingBottom: '2rem', marginBottom: '2rem' }}
                  >
                    <h3 style={{ color: 'var(--pure)', fontSize: '20px', fontWeight: 300, fontFamily: 'var(--font-heading)', fontStyle: 'italic', marginBottom: '1rem' }}>{c.title}</h3>
                    <p className="t-body" style={{ color: 'var(--pure)', marginBottom: '1.5rem', lineHeight: 1.6 }}>{c.desc}</p>
                    <Link to={`/case_study/${c.id}`}
                      style={{ display: 'inline-block', padding: '0.6rem 1.5rem', background: 'var(--pure)', color: 'var(--black)', borderRadius: '6px', fontSize: '14px', fontWeight: 500, textDecoration: 'none', transition: 'opacity 0.2s' }}
                      onMouseOver={e => e.currentTarget.style.opacity = 0.8}
                      onMouseOut={e => e.currentTarget.style.opacity = 1}
                      target="_blank" rel="noopener noreferrer"
                    >
                      Read More
                    </Link>
                  </div>
                ))}
                {filtered.length === 0 && (
                  <div style={{ padding: '2rem 0' }}>No case studies match your filters.</div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
      <style>{`
        @media (max-width: 768px) {
          .sec > .wrap { flex-direction: column !important; }
          .filters-sidebar { width: 100% !important; position: static !important; }
        }
      `}</style>
    </>
  )
}
