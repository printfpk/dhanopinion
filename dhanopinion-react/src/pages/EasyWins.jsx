import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HoverFlip, RevealChar } from '../components/Animations'
import { SpreadCards } from '../components/SpreadCards'

const f = (d = 0) => ({ initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 }, transition: { duration: 0.7, delay: d, ease: [0.16, 1, 0.3, 1] } })

const wins = [
  { num: '01', title: 'Shift to Direct Funds', desc: 'Choose a direct MF over a regular MF — save on fees every single year.', to: '/2023/08/18/when-investing-in-a-mutual-fund-choose-a-direct-mf-over-a-regular-mf/' },
  { num: '02', title: 'Participate in NPS', desc: 'Tax benefits and low-cost investment options for retirement planning.', to: '/2023/08/20/national-pension-system-nps/' },
  { num: '03', title: 'Switch to Liquid Funds', desc: 'Earn better returns on emergency funds than a savings account.', to: '/2023/08/19/why-keeping-money-in-a-liquid-mutual-fund-is-better-for-short-term-needs-than-keeping-it-in-a-savings-account/' },
  { num: '04', title: 'Government Savings', desc: 'Move from fixed deposits to government small savings schemes.', to: '/2023/08/23/government-savings-schemes/' },
]

export default function EasyWins() {
  return (
    <>
      <div style={{ position: 'relative' }}>
        <section style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', background: 'var(--black)', position: 'sticky', top: 0, zIndex: 0 }}>
          <div className="wrap">
            <motion.p {...f()} className="t-overline mb-5">EASY WINS</motion.p>
            <RevealChar as="h1" text="EASY \n WINS" highlight="WINS" className="t-mega mb-5" />
            <motion.p {...f(0.3)} className="t-body-lg" style={{ maxWidth: 520, marginTop: 24 }}>Opportunities for benefits without any significant associated downside. Simple actions you can take today.</motion.p>
          </div>
        </section>
        <section className="sec" style={{ background: 'var(--pure)', minHeight: '100vh', position: 'relative', zIndex: 1, boxShadow: '0 -24px 64px rgba(0,0,0,0.6)' }}>
          <div className="wrap">
            <SpreadCards 
              items={wins} 
              cols={4}
              className="g-4"
              renderCard={(item) => (
                <Link to={item.to} className="card" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', height: '100%', minHeight: 240 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 24, color: 'var(--orange)', fontWeight: 600, marginBottom: 20, display: 'block' }}>{item.num}</span>
                  <h3 className="t-h3" style={{ marginBottom: 8 }}><HoverFlip text={item.title} /></h3>
                  <p className="t-caption" style={{ flex: 1, opacity: 0.9 }}>{item.desc}</p>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--orange)', marginTop: 24 }}><HoverFlip text="READ MORE →" /></span>
                </Link>
              )}
            />
          </div>
        </section>
      </div>
    </>
  )
}
