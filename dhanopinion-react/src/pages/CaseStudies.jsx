import { motion } from 'framer-motion'
import { RevealChar } from '../components/Animations'

const f = (d = 0) => ({ initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 }, transition: { duration: 0.7, delay: d, ease: [0.16, 1, 0.3, 1] } })

export default function CaseStudies() {
  return (
    <>
      <section style={{ minHeight: '55vh', display: 'flex', alignItems: 'center', background: 'var(--black)', borderBottom: '1px solid var(--hairline)' }}>
        <div className="wrap">
          <p className="t-overline mb-5">CASE STUDIES</p>
          <RevealChar as="h1" text="CASE \n STUDY" highlight="STUDY" className="t-mega mb-5" />
          <p className="t-body-lg" style={{ maxWidth: 520, marginTop: 24 }}>Real-world investment analysis and recommendations.</p>
        </div>
      </section>

      <section className="sec" style={{ background: 'var(--void)' }}>
        <div className="wrap-narrow">
          <motion.article {...f()}>
            <div className="hairline-gold mb-7" />
            <RevealChar as="h2" text="Case 1 — Rajeev Agarwal" highlight="Rajeev Agarwal" className="t-h1 mb-7" delay={0.1} />

            <p className="t-body mb-5" style={{ marginTop: 24 }}>Rajeev Agarwal is 30 years old, married to Aarti (29). They have a two-year-old daughter. Rajeev is an engineer at a multinational firm earning ₹15 lakhs per annum. Aarti is a housewife. They save ₹2 lakhs per year.</p>
            <p className="t-body mb-7">Current portfolio: ₹2 lakhs in an ICICI savings account for liquidity, ₹3 lakhs in ICICI Prudential Balanced Advantage Fund Growth. Goals: home purchase, retirement, daughter's education and marriage. Risk tolerance: average.</p>

            <div style={{ borderTop: '1px solid var(--hairline)', padding: '32px 0' }}>
              <RevealChar as="h3" text="Easy Wins Identified" className="t-h2 mb-5" delay={0.1} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 24 }}>
                {[
                  { n: '01', t: 'Switch to Direct Fund', d: 'The ICICI Prudential Balanced Advantage Fund has an expense ratio of 1.53%. Direct version: 0.91%. Savings: 0.62% p.a. or ₹1,860 per annum.' },
                  { n: '02', t: 'Use Liquid Funds', d: 'Move savings from 3% savings account to a liquid fund earning ~6.5%. Additional income: ₹7,420 per annum on ₹2,00,000.' },
                ].map((w, i) => (
                  <div key={i} style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--gold)', fontWeight: 600, minWidth: 24, paddingTop: 3 }}>{w.n}</span>
                    <div>
                      <h4 className="t-h3 mb-2">{w.t}</h4>
                      <p className="t-caption" style={{ lineHeight: 1.6 }}>{w.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--hairline)', padding: '32px 0' }}>
              <RevealChar as="h3" text="Asset Allocation" className="t-h2 mb-5" delay={0.1} />
              <p className="t-body mb-5" style={{ marginTop: 24 }}>Current equity allocation: 40% — quite low for their age. Recommended: <strong style={{ color: 'var(--gold)' }}>75% equity</strong>. Rajeev and Aarti are young — most of their capital is human capital embodied in future earnings capacity.</p>
            </div>

            <div style={{ borderTop: '1px solid var(--hairline)', padding: '32px 0' }}>
              <RevealChar as="h3" text="Investment Recommendations" className="t-h2 mb-5" delay={0.1} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 24 }}>
                {[
                  'Switch ₹2,00,000 savings account balances to ICICI Prudential Liquid Fund Direct Growth',
                  'Sell their Prudential Balanced Fund',
                  '₹50,000 into Tier 1 NPS (75% Equity, 25% Govt Securities, SBI as provider)',
                  '₹2,50,000 into SBI Nifty Index ETF Direct Class',
                ].map((r, i) => (
                  <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--gold)', fontSize: 14, fontWeight: 700, minWidth: 16 }}>→</span>
                    <p className="t-body" style={{ color: 'var(--mist)' }}>{r}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.article>
        </div>
      </section>
    </>
  )
}
