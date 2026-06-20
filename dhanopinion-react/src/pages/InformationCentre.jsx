import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { RevealChar } from '../components/Animations'

import { allArticles } from '../data/articles'

const ITEMS_PER_PAGE = 10;

export default function InformationCentre() {
  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState('Category...')
  const [dateRange, setDateRange] = useState('Select Date Range')
  const [currentPage, setCurrentPage] = useState(1)

  const filtered = useMemo(() => {
    return allArticles.filter(a => {
      if (keyword && !a.title.toLowerCase().includes(keyword.toLowerCase())) return false;
      if (category !== 'Category...' && a.category !== category) return false;
      if (dateRange !== 'Select Date Range' && !a.date.includes(dateRange)) return false;
      return true;
    });
  }, [keyword, category, dateRange])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  // Update current page if filters change
  useMemo(() => { setCurrentPage(1) }, [filtered.length])

  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const categories = ['Category...', ...new Set(allArticles.map(a => a.category))].sort()
  const dates = ['Select Date Range', 'January', 'April', 'August', 'September', 'October']

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  }

  return (
    <>
      <section className="sec" style={{ background: 'var(--black)', borderBottom: '1px solid var(--hairline)' }}>
        <div className="wrap pt-8 pb-8">

          <RevealChar as="h1" text="Information Centre" className="t-mega mb-5" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="t-body-lg" style={{ maxWidth: 800, marginTop: 24, color: 'var(--pure)' }}>Educational resources to deepen your investment knowledge.</p>
            <p className="t-body" style={{ maxWidth: 800, marginTop: 16, color: 'rgba(255, 255, 255, 0.7)' }}>
              Here you will find our comprehensive collection of articles, research, and analysis covering various aspects of investing. You can use the filters below to navigate specific categories or search by keyword to find exactly what you are looking for.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Container mirroring the dark blue layout of the screenshot */}
      <section className="sec" style={{ background: 'var(--void)' }}>
        <div className="wrap" style={{ display: 'flex', gap: '4rem', alignItems: 'flex-start' }}>

          {/* Sidebar */}
          <div className="filters-sidebar" style={{ width: '300px', flexShrink: 0, padding: '1rem 0', position: 'sticky', top: '100px' }}>
            <h3 style={{ color: 'var(--pure)', marginBottom: '1.5rem', fontSize: '18px', fontWeight: 300, fontFamily: 'var(--font-heading)' }}>Filters</h3>

            <div style={{ marginBottom: '2rem' }}>
              <input
                type="text"
                placeholder="Input Keyword..."
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                style={{ width: '100%', padding: '14px 16px', background: 'var(--pure)', border: 'none', borderRadius: '4px', fontSize: '15px', outline: 'none', color: 'var(--black)' }}
              />
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', color: 'var(--gold)', marginBottom: '1rem', fontSize: '16px' }}>Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                style={{ width: '100%', padding: '14px 16px', background: 'var(--pure)', border: 'none', borderRadius: '4px', fontSize: '15px', outline: 'none', cursor: 'pointer', color: 'var(--black)' }}
              >
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', color: 'var(--gold)', marginBottom: '1rem', fontSize: '16px' }}>Date</label>
              <select
                value={dateRange}
                onChange={e => setDateRange(e.target.value)}
                style={{ width: '100%', padding: '14px 16px', background: 'var(--pure)', border: 'none', borderRadius: '4px', fontSize: '15px', outline: 'none', cursor: 'pointer', color: 'var(--black)' }}
              >
                {dates.map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
          </div>

          {/* List Area */}
          <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ minHeight: '600px' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage + category + keyword + dateRange}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  {paginated.map((a) => (
                    <div key={a.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <Link
                        to={a.to}
                        style={{ display: 'block', padding: '24px 0', textDecoration: 'none', transition: 'padding-left 0.3s ease' }}
                        className="article-link-hover"
                      >
                        <h3 style={{ fontSize: '17px', fontFamily: 'var(--font-heading)', color: 'var(--pure)', fontWeight: 300, marginBottom: '8px', lineHeight: 1.4 }}>
                          {a.title}
                        </h3>
                        <p style={{ fontSize: '12px', color: '#eada86', fontWeight: 600, margin: 0 }}>
                          {a.date}
                        </p>
                      </Link>
                    </div>
                  ))}
                  {filtered.length === 0 && (
                    <div style={{ color: 'var(--smoke)', padding: '2rem 0' }}>No articles match your filters.</div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginTop: '40px', paddingBottom: '40px' }}>
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  style={{ background: 'none', border: 'none', color: currentPage === 1 ? 'rgba(255,255,255,0.3)' : 'var(--pure)', cursor: currentPage === 1 ? 'default' : 'pointer', fontSize: '15px', fontWeight: 500 }}
                >
                  Prev
                </button>

                {[...Array(totalPages)].map((_, idx) => {
                  const p = idx + 1;
                  return (
                    <button
                      key={p}
                      onClick={() => handlePageChange(p)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: currentPage === p ? '#eada86' : 'var(--pure)',
                        cursor: 'pointer',
                        fontSize: '15px',
                        fontWeight: 600,
                        padding: '4px 8px'
                      }}
                    >
                      {p}
                    </button>
                  )
                })}

                <button
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  style={{ background: 'none', border: 'none', color: currentPage === totalPages ? 'rgba(255,255,255,0.3)' : 'var(--pure)', cursor: currentPage === totalPages ? 'default' : 'pointer', fontSize: '15px', fontWeight: 500 }}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
      <style>{`
        .article-link-hover:hover {
          padding-left: 8px !important;
        }
        .article-link-hover:hover h3 {
          color: #eada86 !important;
        }
        @media (max-width: 768px) {
          .sec > .wrap { flex-direction: column !important; }
          .filters-sidebar { width: 100% !important; position: static !important; }
        }
      `}</style>
    </>
  )
}
