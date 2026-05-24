import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HoverFlip, RevealChar } from '../components/Animations'

const f = (d = 0) => ({ initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 }, transition: { duration: 0.7, delay: d, ease: [0.16, 1, 0.3, 1] } })

const articles = [
  { title: 'Compound Interest & Exponential Growth', to: '/2023/08/03/compound-interest-and-exponential-growth/' },
  { title: 'There is Always Some Risk', to: '/2023/08/04/there-is-always-some-risk/' },
  { title: 'Asset Allocation', to: '/2023/08/05/asset-allocation/' },
  { title: 'Equity Investing', to: '/2023/08/06/equity-investing/' },
  { title: 'Defining Your Investment Horizon', to: '/2023/08/07/defining-your-investment-horizon-can-lead-to-better-planning/' },
  { title: 'Risk & Return — Equity', to: '/2023/08/08/risk-and-return-profile-of-equity/' },
  { title: 'Risk & Return — Fixed Income', to: '/2023/08/09/risk-and-return-profile-of-fixed-income/' },
  { title: 'Index Funds', to: '/2023/08/11/index-funds/' },
  { title: 'Competitive Financial Markets', to: '/2023/08/12/competitive-financial-markets-and-the-implications-for-investment-strategy/' },
  { title: 'Individual vs Institution', to: '/2023/08/13/individual-or-institution-who-you-are-changes-investment-choices/' },
  { title: "Don't Pick Stocks — Buy the Index", to: '/2023/08/14/dont-pick-stocks-buy-the-index/' },
  { title: 'Keep the Cost of Investing Low', to: '/2023/08/16/keep-the-cost-of-investing-low/' },
  { title: 'Taxes & Investment Outcomes', to: '/2023/08/17/taxes-and-investment-outcomes/' },
  { title: 'Diversification Reduces Risk', to: '/2023/04/09/diversification-reduces-risk/' },
]

export default function InformationCentre() {
  return (
    <>
      <section style={{ minHeight: '55vh', display: 'flex', alignItems: 'center', background: 'var(--black)', borderBottom: '1px solid var(--hairline)' }}>
        <div className="wrap">
          <motion.p {...f()} className="t-overline mb-5">LEARN</motion.p>
          <RevealChar as="h1" text="INFORMATION \n CENTRE" highlight="CENTRE" className="t-mega mb-5" />
          <motion.p {...f(0.2)} className="t-body-lg" style={{ maxWidth: 520, marginTop: 24 }}>Educational resources to deepen your investment knowledge.</motion.p>
        </div>
      </section>
      <section className="sec" style={{ background: 'var(--void)' }}>
        <div className="wrap">
          {articles.map((a, i) => (
            <motion.div key={i} {...f(Math.min(i * 0.04, 0.3))}>
              <Link to={a.to} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 0', borderBottom: '1px solid var(--hairline)', textDecoration: 'none', color: 'inherit', gap: 16 }}>
                <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--steel)', fontWeight: 600, minWidth: 24 }}>{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="t-h3" style={{ fontSize: 17 }}><HoverFlip text={a.title} /></h3>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--gold)', flexShrink: 0 }}>
                  <HoverFlip text="READ →" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  )
}
