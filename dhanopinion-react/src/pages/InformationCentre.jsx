import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { RevealChar } from '../components/Animations'

const allArticles = [
  { id: 1, title: 'There is always some risk', date: 'January 9, 2023', category: 'Risk Management', to: '/2023/01/09/there-is-always-some-risk-2/' },
  { id: 2, title: 'Diversification reduces risk', date: 'April 9, 2023', category: 'Risk Management', to: '/2023/04/09/diversification-reduces-risk/' },
  { id: 3, title: 'Compound Interest and Exponential growth', date: 'August 3, 2023', category: 'Wealth Building', to: '/2023/08/03/compound-interest-and-exponential-growth/' },
  { id: 4, title: 'Inflation, Real Value and the Money Illusion', date: 'August 4, 2023', category: 'Economics', to: '/2023/08/25/inflation-real-value-and-the-money-illusion/' },
  { id: 5, title: 'Asset Allocation', date: 'August 5, 2023', category: 'Portfolio Strategy', to: '/2023/08/05/asset-allocation/' },
  { id: 6, title: 'Equity Investing', date: 'August 6, 2023', category: 'Investment Basics', to: '/2023/08/06/equity-investing/' },
  { id: 7, title: 'Defining your investment horizon can lead to better planning', date: 'August 7, 2023', category: 'Planning', to: '/2023/08/07/defining-your-investment-horizon-can-lead-to-better-planning/' },
  { id: 8, title: 'Risk and Return profile of Equity', date: 'August 8, 2023', category: 'Risk Management', to: '/2023/08/08/risk-and-return-profile-of-equity/' },
  { id: 9, title: 'Risk and Return profile of Fixed Income', date: 'August 9, 2023', category: 'Risk Management', to: '/2023/08/09/risk-and-return-profile-of-fixed-income/' },
  { id: 10, title: 'Active and Passive Investment Management', date: 'August 10, 2023', category: 'Portfolio Strategy', to: '/2023/08/10/test/' },
  { id: 11, title: 'Index Funds', date: 'August 11, 2023', category: 'Investment Basics', to: '/2023/08/11/index-funds/' },
  { id: 12, title: 'Competitive Financial Markets and the implications for investment strategy', date: 'August 12, 2023', category: 'Economics', to: '/2023/08/10/competitive-financial-markets-and-the-implications-for-investment-strategy/' },
  { id: 13, title: 'Individual or Institution - who you are changes investment choices', date: 'August 13, 2023', category: 'Planning', to: '/2023/08/13/individual-or-institution-who-you-are-changes-investment-choices/' },
  { id: 14, title: "Don't pick stocks, buy the index", date: 'August 14, 2023', category: 'Portfolio Strategy', to: '/2023/08/14/dont-pick-stocks-buy-the-index/' },
  { id: 15, title: 'Keep the cost of investing low', date: 'August 16, 2023', category: 'Wealth Building', to: '/2023/08/16/keep-the-cost-of-investing-low/' },
  { id: 16, title: 'Taxes and investment outcomes', date: 'August 17, 2023', category: 'Economics', to: '/2023/08/17/taxes-and-investment-outcomes/' },
  { id: 17, title: 'When investing in a Mutual Fund, choose a Direct MF over a Regular MF', date: 'August 18, 2023', category: 'Investment Basics', to: '/2023/08/18/when-investing-in-a-mutual-fund-choose-a-direct-mf-over-a-regular-mf/' },
  { id: 18, title: 'Why keeping money in a liquid mutual fund is better for short term needs than keeping it in a savings account', date: 'August 19, 2023', category: 'Wealth Building', to: '/2023/08/19/why-keeping-money-in-a-liquid-mutual-fund-is-better-for-short-term-needs-than-keeping-it-in-a-savings-account/' },
  { id: 19, title: 'National Pension System (NPS)', date: 'August 20, 2023', category: 'Planning', to: '/2023/08/20/national-pension-system-nps/' },
  { id: 20, title: 'Bank Fixed Deposits', date: 'August 21, 2023', category: 'Investment Basics', to: '#' },
  { id: 21, title: 'Government Bonds', date: 'August 22, 2023', category: 'Investment Basics', to: '/2023/08/22/government-bonds/' },
  { id: 22, title: 'Government Savings Schemes', date: 'August 23, 2023', category: 'Investment Basics', to: '/2023/08/23/government-savings-schemes/' },
  { id: 23, title: 'Senior Citizen Saving Scheme', date: 'September 1, 2023', category: 'Planning', to: '/2023/09/01/senior-citizen-saving-scheme/' },
  { id: 24, title: 'Public Provident Fund', date: 'October 1, 2023', category: 'Planning', to: '/2023/10/01/public-provident-fund/' },
]

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
      <section style={{ minHeight: '45vh', display: 'flex', alignItems: 'center', background: 'var(--black)', borderBottom: '1px solid var(--hairline)' }}>
        <div className="wrap pt-8 pb-8">
          <p className="t-overline mb-5">LEARN</p>
          <RevealChar as="h1" text="INFORMATION \n CENTRE" highlight="CENTRE" className="t-mega mb-5" />
          <p className="t-body-lg" style={{ maxWidth: 520, marginTop: 24 }}>Educational resources to deepen your investment knowledge.</p>
        </div>
      </section>

      {/* Main Container mirroring the dark blue layout of the screenshot */}
      <section className="sec" style={{ background: 'var(--void)' }}>
        <div className="wrap" style={{ display: 'flex', gap: '4rem', alignItems: 'flex-start' }}>

          {/* Sidebar */}
          <div className="filters-sidebar" style={{ width: '300px', flexShrink: 0, padding: '1rem 0', position: 'sticky', top: '100px' }}>
            <h3 style={{ color: 'var(--gold)', marginBottom: '1.5rem', fontSize: '18px', fontWeight: 500 }}>Filters</h3>

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
                        <h3 style={{ fontSize: '17px', color: 'var(--pure)', fontWeight: 600, marginBottom: '8px', lineHeight: 1.4 }}>
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
