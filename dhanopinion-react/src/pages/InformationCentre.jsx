import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './datepicker.css'
import { RevealChar } from '../components/Animations'
import { client } from '../sanityClient'
import { allArticles } from '../data/articles'

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
  const [articles, setArticles] = useState([])

  const ARTICLE_ORDER = [
    { title: 'There is always some risk',                                                              date: 'August 31, 2025' },
    { title: 'Diversification reduces risk',                                                           date: 'November 29, 2025' },
    { title: 'Compounding can deliver exponential growth',                                             date: 'March 25, 2026' },
    { title: 'Inflation, Real Value and the Money Illusion',                                           date: 'March 26, 2026' },
    { title: 'Asset Allocation',                                                                       date: 'March 27, 2026' },
    { title: 'Defining your investment horizon can lead to better planning',                           date: 'March 29, 2026' },
    { title: 'Equity - Risk and Return profile',                                                  date: 'March 30, 2025' },
    { title: 'Fixed Income \u2013 Risk and Return profile',                                            date: 'March 31, 2026' },
    { title: 'Active and Passive Investment Management',                                               date: 'April 1, 2026' },
    { title: 'Index Investing Strategy',                                                               date: 'April 2, 2026' },
    { title: 'Competitive Financial Markets and the implications for investment strategy',              date: 'April 3, 2026' },
    { title: 'Keep the cost of investing low',                                                         date: 'April 7, 2026' },
    { title: 'Taxes and their impact on investment outcomes',                                          date: 'April 8, 2026' },
    { title: 'When investing in a Mutual Fund, choose a Direct MF over a Regular MF',                 date: 'April 9, 2026' },
    { title: 'A liquid mutual fund is better for short-term needs than a bank savings account',        date: 'April 10, 2026' },
    { title: 'National Pension System (NPS)',                                                          date: 'April 11, 2026' },
    { title: 'Bank Fixed Deposits',                                                               date: 'April 12, 2026' },
    { title: 'Government Bonds',                                                                       date: 'April 13, 2026' },
    { title: 'Government Savings Schemes',                                                             date: 'April 14, 2026' },
    { title: 'Senior Citizen Saving Scheme (SCSS)',                                                    date: 'April 23, 2026' },
    { title: 'Public Provident Fund',                                                            date: 'May 23, 2026' },
    { title: 'Equity Linked Saving Scheme (ELSS)',                                                     date: 'July 20, 2026' },
  ]

  useEffect(() => {
    // Fetch Page Data (Titles etc)
    client.fetch(`*[_type == "informationCentrePage"][0]`)
      .then(res => {
        if (res) {
          setPageData(prev => ({ ...prev, ...res }))
        }
      })
      .catch(console.error)

    // Fetch all articles, then apply custom sort order + hardcoded dates
    client.fetch(`*[_type == "post"] {
      _id,
      title,
      publishedAt,
      "category": categories[]->title,
      "to": slug.current,
      "textContent": pt::text(body)
    }`).then(res => {
        const formatted = res.map(p => {
          const titleLower = (p.title || '').toLowerCase()
          const match = ARTICLE_ORDER.find(o => o.title.toLowerCase() === titleLower)
          return {
            id: p._id,
            title: p.title || 'Untitled',
            // Use hardcoded date if available, else fall back to Sanity date
            date: match
              ? match.date
              : p.publishedAt
                ? new Date(p.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                : '',
            rawDate: p.publishedAt,
            category: p.category || [],
            to: p.to ? `/post/${p.to}` : '#',
            textContent: p.textContent || ''
          }
        })

        // Sort by custom order, unknowns go to end sorted by date
        const sorted = [...formatted].sort((a, b) => {
          const ai = ARTICLE_ORDER.findIndex(o => o.title.toLowerCase() === a.title.toLowerCase())
          const bi = ARTICLE_ORDER.findIndex(o => o.title.toLowerCase() === b.title.toLowerCase())
          if (ai !== -1 && bi !== -1) return ai - bi
          if (ai !== -1) return -1
          if (bi !== -1) return 1
          return (a.rawDate || '').localeCompare(b.rawDate || '')
        })

        setArticles(sorted)
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
    return articles.filter(a => {
      if (keyword) {
        const lowerKw = keyword.toLowerCase();
        const matchesTitle = a.title.toLowerCase().includes(lowerKw);
        const matchesContent = a.textContent ? a.textContent.toLowerCase().includes(lowerKw) : false;
        if (!matchesTitle && !matchesContent) return false;
      }
      if (category !== 'Category...' && (!a.category || !a.category.includes(category))) return false;
      
      if (startDate && endDate) {
        const articleDate = new Date(a.rawDate || a.date);
        // Normalize time for comparison
        articleDate.setHours(0, 0, 0, 0);
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        
        if (articleDate < start || articleDate > end) return false;
      }
      return true;
    });
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
