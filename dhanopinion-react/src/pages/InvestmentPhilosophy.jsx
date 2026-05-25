import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HoverFlip, RevealChar } from '../components/Animations'
import { SpreadCards } from '../components/SpreadCards'

const f = (d = 0) => ({ initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 }, transition: { duration: 0.7, delay: d, ease: [0.16, 1, 0.3, 1] } })

const principles = [
  { num: '01', title: 'Compound Interest', desc: 'The most powerful force in investing. Start early.', to: '/2023/08/03/compound-interest-and-exponential-growth/' },
  { num: '02', title: 'Diversification', desc: 'Spread risk across asset classes and geographies.', to: '/2023/04/09/diversification-reduces-risk/' },
  { num: '03', title: 'Risk Management', desc: 'Understand and manage — never avoid entirely.', to: '/2023/08/04/there-is-always-some-risk/' },
  { num: '04', title: 'Low Costs', desc: 'Every basis point saved compounds over decades.', to: '/2023/08/16/keep-the-cost-of-investing-low/' },
  { num: '05', title: 'Tax Efficiency', desc: 'Structure investments to minimize tax drag.', to: '/2023/08/17/taxes-and-investment-outcomes/' },
  { num: '06', title: 'Long Horizon', desc: 'Invest with patience. Resist the urge to time.', to: '/2023/08/07/defining-your-investment-horizon-can-lead-to-better-planning/' },
]

export default function InvestmentPhilosophy() {
  return (
    <>
      <div style={{ position: 'relative' }}>
        <section style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', background: 'var(--black)', position: 'sticky', top: 0, zIndex: 0 }}>
          <div className="wrap">
            <p className="t-overline mb-5">PHILOSOPHY</p>
            <RevealChar as="h1" text="INVESTMENT \n PHILOSOPHY" highlight="PHILOSOPHY" className="t-mega mb-5" />
            <p className="t-body-lg" style={{ maxWidth: 520, marginTop: 24 }}>Core principles that guide sound investment decisions for long-term wealth creation.</p>
          </div>
        </section>
        <section className="sec" style={{ background: 'var(--pure)', minHeight: '100vh', position: 'relative', zIndex: 1, boxShadow: '0 -24px 64px rgba(0,0,0,0.6)' }}>
          <div className="wrap">
            <SpreadCards
              items={principles}
              cols={3}
              className="g-3"
              renderCard={(p) => (
                <Link to={p.to} className="card" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--orange)', fontWeight: 600, marginBottom: 16 }}>{p.num}</span>
                  <h3 className="t-h3" style={{ marginBottom: 8 }}><HoverFlip text={p.title} /></h3>
                  <p className="t-caption" style={{ flex: 1, opacity: 0.9 }}>{p.desc}</p>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--orange)', marginTop: 20 }}><HoverFlip text="READ →" /></span>
                </Link>
              )}
            />
          </div>
        </section>
      </div>
    </>
  )
}
