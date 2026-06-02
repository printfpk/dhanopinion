import { useState, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HoverFlip } from './Animations'
import { allArticles } from '../data/articles'

const links = [
  { label: 'Easy Wins', to: '/easy-wins' },
  { label: 'Strategy', to: '/simple-investment-strategy' },
  { label: 'Philosophy', to: '/investment-philosophy' },
  { label: 'Case Studies', to: '/case-studies' },
  { label: 'Learn', to: '/information-centre' },
  { label: 'About', to: '/about-us' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [waitlistOpen, setWaitlistOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { pathname } = useLocation()

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return []
    const query = searchQuery.toLowerCase()
    return allArticles.filter(a =>
      a.title.toLowerCase().includes(query) ||
      a.category.toLowerCase().includes(query)
    ).slice(0, 5)
  }, [searchQuery])

  return (
    <>
      <nav className="custom-navbar" style={{
        position: 'fixed', top: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 100,
        backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid var(--gold)', borderRadius: 9999,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        height: 64, width: '90%', maxWidth: 1200
      }}>
        <div className="wrap" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline', gap: 6, color: 'var(--pure)' }}>
            <HoverFlip text="DHAN OPINION" delayOffset={0} />
          </Link>

          {/* Desktop links */}
          <div className="nav-desktop">
            {links.map(l => (
              <Link key={l.to} to={l.to} style={{
                fontSize: 12, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase',
                color: pathname.startsWith(l.to) ? 'var(--orange)' : 'var(--pure)',
                textDecoration: 'none', padding: '0 10px', display: 'flex'
              }}>
                <HoverFlip text={l.label} />
              </Link>
            ))}

            {/* NPS Highlight Link */}
            <Link to="/2023/08/20/national-pension-system-nps/" style={{
              fontSize: 12, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase',
              color: 'var(--gold)', textDecoration: 'none', padding: '0 10px', display: 'flex'
            }}>
              <HoverFlip text="NPS Guide" />
            </Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
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

            {/* Consulting Waitlist Button */}
            <button
              onClick={() => setWaitlistOpen(true)}
              className="nav-desktop-btn"
              style={{
                background: 'var(--gold)', color: 'var(--black)', border: 'none', borderRadius: 999,
                padding: '8px 16px', fontSize: 12, fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase',
                cursor: 'pointer', transition: 'background 0.3s'
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#e6bc65'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--gold)'; }}
            >
              Consulting
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
              background: 'rgba(0,0,0,0.97)', display: 'flex', flexDirection: 'column',
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
                <Link to={l.to} onClick={() => setOpen(false)} style={{
                  display: 'block', padding: '16px 0',
                  fontSize: 28, fontWeight: 700, letterSpacing: '-.02em',
                  color: pathname.startsWith(l.to) ? 'var(--gold)' : 'var(--pure)',
                  textDecoration: 'none', borderBottom: '1px solid var(--hairline)',
                }}>
                  {l.label}
                </Link>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.4 }}>
              <Link to="/2023/08/20/national-pension-system-nps/" onClick={() => setOpen(false)} style={{
                display: 'block', padding: '16px 0',
                fontSize: 28, fontWeight: 700, letterSpacing: '-.02em',
                color: 'var(--gold)',
                textDecoration: 'none', borderBottom: '1px solid var(--hairline)',
              }}>
                NPS Guide
              </Link>
            </motion.div>
            <motion.button
              onClick={() => { setOpen(false); setWaitlistOpen(true); }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              style={{
                marginTop: 32, background: 'var(--pure)', color: 'var(--charcoal)', border: 'none',
                padding: '16px', borderRadius: 8, fontSize: 16, fontWeight: 600, width: '100%', cursor: 'pointer'
              }}
            >
              Join Consulting Waitlist
            </motion.button>
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
              background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
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
                placeholder="Search articles..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  width: '100%', background: 'transparent', border: 'none', borderBottom: '2px solid var(--gold)',
                  color: 'var(--pure)', fontSize: 32, outline: 'none', padding: '16px 0', fontWeight: 300
                }}
              />
              <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
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
                    <div style={{ fontSize: 12, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 4 }}>{result.category}</div>
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

      {/* Waitlist Modal */}
      <AnimatePresence>
        {waitlistOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000,
              background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              style={{
                background: 'var(--charcoal)', border: '1px solid var(--hairline)', borderRadius: 16,
                padding: 48, width: '90%', maxWidth: 500, position: 'relative', textAlign: 'center'
              }}
            >
              <button
                onClick={() => setWaitlistOpen(false)}
                style={{ position: 'absolute', right: 24, top: 24, background: 'none', border: 'none', color: 'var(--mist)', cursor: 'pointer', fontSize: 24 }}
              >
                &times;
              </button>
              <h3 style={{ fontSize: 28, fontWeight: 700, color: 'var(--pure)', marginBottom: 16 }}>Personal Consulting</h3>
              <p style={{ color: 'var(--mist)', lineHeight: 1.6, marginBottom: 32 }}>
                Due to high demand, our 1-on-1 personal consulting services are currently at capacity.
                Join our exclusive waitlist to be notified as soon as a spot opens up.
              </p>
              <form onSubmit={e => { e.preventDefault(); alert("Thanks! You've been added to the waitlist."); setWaitlistOpen(false); }} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <input required type="text" placeholder="Full Name" style={{ padding: '16px', background: 'var(--void)', border: '1px solid var(--hairline)', borderRadius: 8, color: 'var(--pure)', outline: 'none' }} />
                <input required type="email" placeholder="Email Address" style={{ padding: '16px', background: 'var(--void)', border: '1px solid var(--hairline)', borderRadius: 8, color: 'var(--pure)', outline: 'none' }} />
                <button type="submit" style={{ background: 'var(--gold)', color: 'var(--black)', fontWeight: 600, border: 'none', padding: '16px', borderRadius: 8, cursor: 'pointer', fontSize: 16 }}>
                  Join the Waitlist
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-navbar {
          background-color: rgba(20, 20, 20, 0.85) !important;
          transition: background-color 0.3s ease, border-color 0.3s ease;
        }
        .custom-navbar:hover {
          background-color: rgba(20, 20, 20, 0.95) !important;
          border-color: #f2c76a !important;
        }
        .nav-desktop { display:none }
        .nav-desktop-btn { display:none }
        .nav-burger { display:flex }
        @media(min-width:1024px) {
          .nav-desktop { display:flex; align-items:center }
          .nav-desktop-btn { display:block }
          .nav-burger { display:none !important }
        }
      `}</style>
    </>
  )
}
