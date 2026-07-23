import { useState, useMemo, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './datepicker.css'
import { RevealChar } from '../components/Animations'
import { client } from '../sanityClient'
import { ArticlesContext } from '../components/ArticlesContext'
import { filterArticles } from '../utils/searchUtils'
export default function InformationCentre() {
  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState('Category...')
  const [dateRange, setDateRange] = useState([null, null])
  const [startDate, endDate] = dateRange

  const [pageData, setPageData] = useState({
    title: 'Information Centre',
    filtersTitle: 'Filters',
    searchPlaceholder: 'Input Keyword...',
    noResultsText: 'No articles match your filters.'
  })
  const { articles } = useContext(ArticlesContext)

  useEffect(() => {
    // Fetch Page Data (Titles etc)
    client.fetch(`*[_type == "informationCentrePage"][0]`)
      .then(res => {
        if (res) {
          setPageData(prev => ({ ...prev, ...res }))
        }
      })
      .catch(console.error)
  }, [])


  const formatDateForCompare = (dateString) => {
    const d = new Date(dateString);
    if (isNaN(d)) return '';
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const filtered = useMemo(() => {
    return filterArticles(articles, { keyword, category, startDate, endDate });
  }, [keyword, category, startDate, endDate, articles])

  const categories = [
    'Category...', 'Asset Allocation', 'Bank', 'Compounding', 'Direct funds', 'Goal', 
    'Government scheme', 'Index', 'Inflation', 'Interest', 'Investment Strategy', 
    'Investments', 'Liquid funds', 'Liquid MF', 'Mutual Fund', 'NPS', 
    'Pension', 'Regular MF', 'Risk and return', 'taxes'
  ];

  return (
    <>
      <section style={{ background: 'var(--black)', borderBottom: '1px solid var(--hairline)', padding: 'var(--sp-6) 0 var(--sp-4) 0' }}>
        <div className="wrap">
          <RevealChar as="h1" text={pageData.title} className="t-mega" />
        </div>
      </section>

      {/* Main Container mirroring the dark blue layout of the screenshot */}
      <section className="sec" style={{ background: 'var(--void)' }}>
        <div className="wrap info-centre-wrap" style={{ display: 'flex', gap: '4rem', alignItems: 'flex-start' }}>

          {/* Sidebar */}
          <div className="filters-sidebar info-centre-sidebar" style={{ width: '300px', flexShrink: 0, padding: '1rem 0', position: 'sticky', top: '100px' }}>
            <h3 style={{ color: 'var(--pure)', marginBottom: '1.5rem', fontSize: '18px', fontWeight: 300, fontFamily: 'var(--font-heading)' }}>{pageData.filtersTitle}</h3>

            <div style={{ marginBottom: '2rem' }}>
              <input
                type="text"
                placeholder={pageData.searchPlaceholder}
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
              <div className="custom-date-picker-input-container">
                <DatePicker
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(update) => setDateRange(update)}
                  placeholderText="Select Date Range"
                  dateFormat="dd MMM"
                />
              </div>
            </div>
          </div>

          {/* List Area */}
          <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ minHeight: '600px' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={category + keyword + (startDate ? startDate.toISOString() : '') + (endDate ? endDate.toISOString() : '')}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  {filtered.map((a) => (
                    <div key={a.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <Link to={a.to}
                        style={{ display: 'block', padding: '24px 0', textDecoration: 'none', transition: 'padding-left 0.3s ease' }}
                        className="article-link-hover"
                       target="_blank" rel="noopener noreferrer">
                        <h3 className="info-article-title" style={{ fontSize: '17px', fontFamily: 'var(--font-heading)', color: 'var(--pure)', fontWeight: 300, marginBottom: '8px', lineHeight: 1.4 }}>
                          {a.title}
                        </h3>
                        <p style={{ fontSize: '12px', color: 'var(--gold)', fontWeight: 400, margin: 0 }}>
                          {a.date}
                        </p>
                      </Link>
                    </div>
                  ))}
                  {filtered.length === 0 && (
                    <div style={{ padding: '2rem 0' }}>{pageData.noResultsText}</div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
      <style>{`
        .article-link-hover:hover {
          padding-left: 8px !important;
        }
        .article-link-hover:hover h3 {
          color: var(--gold) !important;
        }
        @media (max-width: 768px) {
          .sec > .wrap { flex-direction: column !important; }
          .filters-sidebar { width: 100% !important; position: static !important; }
        }
      `}</style>
    </>
  )
}
