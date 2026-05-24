import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HoverFlip, RevealChar } from '../components/Animations'
import { SpreadCards } from '../components/SpreadCards'

const f = (d = 0) => ({ initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 }, transition: { duration: 0.7, delay: d, ease: [0.16, 1, 0.3, 1] } })

const cards = [
  { title: 'Asset Allocation', to: '/2023/08/05/asset-allocation/' },
  { title: 'Index Funds', to: '/2023/08/11/index-funds/' },
  { title: 'Keep Costs Low', to: '/2023/08/16/keep-the-cost-of-investing-low/' },
]

export default function SimpleInvestmentStrategy() {
  return (
    <>
      <div style={{ position: 'relative' }}>
        <section style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', background: 'var(--black)', position: 'sticky', top: 0, zIndex: 0 }}>
          <div className="wrap">
            <motion.p {...f()} className="t-overline mb-5">STRATEGY</motion.p>
            <RevealChar as="h1" text="SIMPLE \n STRATEGY" highlight="STRATEGY" className="t-mega mb-5" />
            <motion.p {...f(0.3)} className="t-body-lg" style={{ maxWidth: 520, marginTop: 24 }}>A straightforward approach to building and managing your investment portfolio effectively.</motion.p>
          </div>
        </section>
        <section className="sec" style={{ background: 'var(--void)', position: 'relative', zIndex: 1, boxShadow: '0 -24px 64px rgba(0,0,0,0.6)' }}>
          <div className="wrap-narrow">
            <motion.div {...f()}>
              <div className="hairline-gold mb-6" />
              <RevealChar as="h2" text="Core Principles" className="t-h2 mb-5" delay={0.1} />
              <p className="t-body mb-5" style={{ marginTop: 24 }}>A simple investment strategy focuses on a few key principles proven to work over time. Rather than chasing complexity, evidence shows disciplined, basic approaches lead to better outcomes.</p>
              <p className="t-body">The strategy rests on four pillars: keeping costs low, diversifying broadly, choosing the right asset allocation for your risk tolerance, and maintaining discipline through market cycles.</p>
            </motion.div>
          </div>
        </section>
      </div>
      <section className="sec" style={{ background: 'var(--pure)', color: 'var(--black)', borderTop: '1px solid var(--hairline)' }}>
        <div className="wrap">
          <motion.p {...f()} className="t-overline mb-3 tc" style={{ color: 'var(--black)' }}>DEEP DIVES</motion.p>
          <RevealChar as="h2" text="Explore Further" className="t-h1 mb-7 tc" style={{ justifyContent: 'center', color: 'var(--black)' }} delay={0.1} />
          <div style={{ marginTop: 40 }}>
            <SpreadCards
              items={cards}
              cols={3}
              className="g-3"
              renderCard={(c) => (
                <Link to={c.to} className="card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                  <div className="hairline-gold mb-5" style={{ background: 'var(--orange)' }} />
                  <h3 className="t-h3 mb-3"><HoverFlip text={c.title} /></h3>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--orange)' }}><HoverFlip text="READ →" /></span>
                </Link>
              )}
            />
          </div>
        </div>
      </section>
    </>
  )
}
