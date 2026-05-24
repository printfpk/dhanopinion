import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HoverFlip } from './Animations'

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
  const { pathname } = useLocation()

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        height: 64,
      }}>
        <div className="wrap" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline', gap: 6 }}>
            <HoverFlip text="DHAN OPINION" delayOffset={0} />
          </Link>

          {/* Desktop links */}
          <div className="nav-desktop">
            {links.map(l => (
              <Link key={l.to} to={l.to} style={{
                fontSize: 12, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase',
                color: pathname.startsWith(l.to) ? 'var(--gold)' : 'var(--smoke)',
                textDecoration: 'none', padding: '0 14px', display: 'flex'
              }}>
                <HoverFlip text={l.label} />
              </Link>
            ))}
          </div>

          {/* Hamburger */}
          <button onClick={() => setOpen(!open)} className="nav-burger" style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: 8,
            display: 'flex', flexDirection: 'column', gap: 5,
          }}>
            <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }} style={{ display: 'block', width: 22, height: 1.5, background: 'var(--pure)', transformOrigin: 'center' }} />
            <motion.span animate={{ opacity: open ? 0 : 1 }} style={{ display: 'block', width: 22, height: 1.5, background: 'var(--pure)' }} />
            <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }} style={{ display: 'block', width: 22, height: 1.5, background: 'var(--pure)', transformOrigin: 'center' }} />
          </button>
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
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav-desktop { display:none }
        .nav-burger { display:flex }
        @media(min-width:900px) {
          .nav-desktop { display:flex; align-items:center }
          .nav-burger { display:none !important }
        }
      `}</style>
    </>
  )
}
