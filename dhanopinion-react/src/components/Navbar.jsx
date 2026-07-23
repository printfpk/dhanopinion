import { useState, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HoverFlip } from './Animations'
import { useTheme } from './ThemeContext'
import { useContext } from 'react'
import { ArticlesContext } from './ArticlesContext'
import { filterArticles } from '../utils/searchUtils'
import { globalSearchIndex } from '../data/searchIndex'

const links = [
  { label: 'Easy Wins', to: '/easy-wins' },
  { label: 'Simple Investment Strategy', to: '/simple-investment-strategy' },
  { label: 'Investment Philosophy', to: '/investment-philosophy' },
  { label: 'Case Studies', to: '/case-studies' },
  { label: 'Steps to Success', to: '/steps-to-investing-success' },
  { label: 'Information Centre', to: '/information-centre' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { pathname } = useLocation()
  const { theme, toggleTheme } = useTheme()
  const { articles } = useContext(ArticlesContext)

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return []
    
    const lowerQuery = searchQuery.toLowerCase()
    
    // Filter static global sections
    const staticResults = globalSearchIndex.filter(item => 
      item.title.toLowerCase().includes(lowerQuery) || 
      item.content.toLowerCase().includes(lowerQuery)
    )

    // Filter articles
    const articleResults = filterArticles(articles, { keyword: searchQuery })

    return [...staticResults, ...articleResults]
  }, [searchQuery, articles])

  return (
    <>
      <nav className="custom-navbar" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid var(--hairline)',
        boxShadow: 'var(--shadow-nav)',
        width: '100%'
      }}>
        {/* Single row: Logo + Desktop Nav + Icons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', margin: '0 auto', maxWidth: 1400, height: 72 }}>
          {/* Logo */}
          <Link to="/" className="nav-logo-link" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', position: 'relative', width: '300px', height: '68px', overflow: 'hidden', flexShrink: 0 }}>
            <img
              className="nav-logo-img"
              src={theme === 'dark' ? '/assets/images/dhan-logo-dark.png' : '/assets/images/dhan-logo-light.png'}
              alt="Dhan Opinion"
              style={{ position: 'absolute', top: '50%', left: '0', transform: 'translateY(-48%)', width: '300px', height: 'auto' }}
            />
          </Link>

          <div className="nav-desktop-links" style={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'nowrap' }}>
            {links.map(l => (
              <Link key={l.to} to={l.to} className="desktop-nav-link" style={{
                fontSize: 13, fontWeight: 500, letterSpacing: '.05em', textTransform: 'uppercase',
                color: pathname.startsWith(l.to) ? 'var(--orange)' : 'var(--pure)',
                textDecoration: 'none', padding: '8px 12px', display: 'flex', alignItems: 'center', whiteSpace: 'nowrap'
              }}>
                <span className="dot"></span>
                <span className="text">{l.label}</span>
              </Link>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              style={{
                background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--pure)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              style={{
                background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--pure)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
              title="Toggle Theme"
            >
              {theme === 'dark' ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              )}
            </button>

            {/* Hamburger */}
            <button onClick={() => setOpen(!open)} className="nav-burger" style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: 8,
              display: 'flex', flexDirection: 'column', gap: 5,
            }}>
              <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }} style={{ display: 'block', width: 22, height: 2, background: 'var(--pure)', transformOrigin: 'center' }} />
              <motion.span animate={{ opacity: open ? 0 : 1 }} style={{ display: 'block', width: 22, height: 2, background: 'var(--pure)' }} />
              <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }} style={{ display: 'block', width: 22, height: 2, background: 'var(--pure)', transformOrigin: 'center' }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed', top: 64, left: 0, right: 0, bottom: 0, zIndex: 99,
              background: 'var(--menu-bg)', display: 'flex', flexDirection: 'column',
              padding: '48px 32px',
            }}
          >
            {links.map((l, i) => (
              <motion.div
                key={l.to}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link to={l.to} onClick={() => setOpen(false)} className="mobile-nav-link" style={{
                  display: 'flex', alignItems: 'center', padding: '16px 0',
                  fontSize: 28, fontWeight: 500, letterSpacing: '-.02em',
                  color: pathname.startsWith(l.to) ? 'var(--gold)' : 'var(--pure)',
                  textDecoration: 'none', borderBottom: '1px solid var(--hairline)',
                }}>
                  <span className="dot"></span>
                  <span className="text">{l.label}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000,
              background: 'var(--modal-bg)', backdropFilter: 'blur(10px)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '15vh'
            }}
          >
            <div style={{ width: '90%', maxWidth: 600, position: 'relative' }}>
              <button
                onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                style={{ position: 'absolute', right: 0, top: -40, background: 'none', border: 'none', color: 'var(--pure)', cursor: 'pointer', fontSize: 14, letterSpacing: '.1em', textTransform: 'uppercase' }}
              >
                Close (ESC)
              </button>
              <input
                type="text" autoFocus
                placeholder="Search everything..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  width: '100%', background: 'transparent', border: 'none', borderBottom: '2px solid var(--gold)',
                  color: 'var(--pure)', fontSize: 32, outline: 'none', padding: '16px 0', fontWeight: 300
                }}
              />
              <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 16, maxHeight: '60vh', overflowY: 'auto', paddingRight: '8px' }}>
                {searchResults.map(result => (
                  <Link
                    key={result.id} to={result.to}
                    onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                    style={{
                      background: 'rgba(255,255,255,0.05)', padding: 16, borderRadius: 8, textDecoration: 'none',
                      transition: 'background 0.2s', display: 'block'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                  >
                    <div style={{ fontSize: 12, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 4 }}>
                      {Array.isArray(result.category) ? result.category.join(', ') : result.category}
                    </div>
                    <div style={{ fontSize: 18, color: 'var(--pure)', fontWeight: 500 }}>{result.title}</div>
                  </Link>
                ))}
                {searchQuery && searchResults.length === 0 && (
                  <div style={{ color: 'var(--mist)', textAlign: 'center', marginTop: 32 }}>
                    No results found for "{searchQuery}"
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-navbar {
          background-color: var(--nav-bg) !important;
          transition: background-color 0.3s ease, border-color 0.3s ease;
        }
        .custom-navbar:hover {
          background-color: var(--nav-bg-hover) !important;
        }
        .nav-desktop-links { display:none !important; }
        .nav-burger { display:flex; }
        @media(min-width:1200px) {
          .nav-desktop-links { display:flex !important; }
          .nav-burger { display:none !important; }
        }
        
        .desktop-nav-link .dot {
          width: 5px;
          height: 5px;
          background-color: currentColor;
          border-radius: 50%;
          opacity: 0;
          transform: scale(0);
          transition: all 0.3s ease;
          margin-right: 0px;
        }
        .desktop-nav-link .text {
          transition: transform 0.3s ease;
        }
        .desktop-nav-link:hover .dot {
          opacity: 1;
          transform: scale(1);
          margin-right: 8px;
        }
        .desktop-nav-link:hover .text {
          transform: translateX(4px);
        }
        
        .mobile-nav-link .dot {
          width: 8px;
          height: 8px;
          background-color: currentColor;
          border-radius: 50%;
          opacity: 0;
          transform: scale(0);
          transition: all 0.3s ease;
          margin-right: 0px;
        }
        .mobile-nav-link .text {
          transition: transform 0.3s ease;
        }
        .mobile-nav-link:hover .dot {
          opacity: 1;
          transform: scale(1);
          margin-right: 12px;
        }
        .mobile-nav-link:hover .text {
          transform: translateX(8px);
        }
      `}</style>
    </>
  )
}
