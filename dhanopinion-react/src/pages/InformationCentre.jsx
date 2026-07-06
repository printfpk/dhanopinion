import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './datepicker.css'
import { RevealChar } from '../components/Animations'

import { allArticles } from '../data/articles'

export default function InformationCentre() {
  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState('Category...')
  const [dateRange, setDateRange] = useState([null, null])
  const [startDate, endDate] = dateRange

  const formatDateForCompare = (dateString) => {
    const d = new Date(dateString);
    if (isNaN(d)) return '';
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const filtered = useMemo(() => {
    return allArticles.filter(a => {
      if (keyword) {
        const lowerKw = keyword.toLowerCase();
        const matchesTitle = a.title.toLowerCase().includes(lowerKw);
        const matchesContent = a.textContent ? a.textContent.toLowerCase().includes(lowerKw) : false;
        if (!matchesTitle && !matchesContent) return false;
      }
      if (category !== 'Category...' && (!a.category || !a.category.includes(category))) return false;
      
      if (startDate && endDate) {
        const articleDate = new Date(a.date);
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
  }, [keyword, category, startDate, endDate])

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
          <RevealChar as="h1" text="Information Centre" className="t-mega" />
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
                        <h3 style={{ fontSize: '17px', fontFamily: 'var(--font-heading)', color: 'var(--pure)', fontWeight: 300, marginBottom: '8px', lineHeight: 1.4 }}>
                          {a.title}
                        </h3>
                        <p style={{ fontSize: '12px', color: 'var(--gold)', fontWeight: 400, margin: 0 }}>
                          {a.date}
                        </p>
                      </Link>
                    </div>
                  ))}
                  {filtered.length === 0 && (
                    <div style={{ padding: '2rem 0' }}>No articles match your filters.</div>
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
