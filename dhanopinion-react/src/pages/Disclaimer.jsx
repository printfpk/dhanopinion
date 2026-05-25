import { motion } from 'framer-motion'
import { RevealChar } from '../components/Animations'

const f = (d = 0) => ({ initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 }, transition: { duration: 0.7, delay: d, ease: [0.16, 1, 0.3, 1] } })

export default function Disclaimer() {
  return (
    <>
      <section style={{ minHeight: '40vh', display: 'flex', alignItems: 'center', background: 'var(--black)', borderBottom: '1px solid var(--hairline)' }}>
        <div className="wrap">
          <p className="t-overline mb-5">LEGAL</p>
          <RevealChar as="h1" text="DISCLAIMER" className="t-mega" />
        </div>
      </section>
      <section className="sec" style={{ background: 'var(--void)' }}>
        <div className="wrap-narrow">
          <motion.div {...f()}>
            {[
              { t: 'General', d: 'The content on this website is for educational and informational purposes only and should not be construed as professional financial advice. All opinions expressed are those of the authors and do not constitute a recommendation to buy, sell, or hold any security.' },
              { t: 'No Financial Advice', d: 'Nothing on this website constitutes financial, investment, legal, or tax advice. You should consult with a qualified financial advisor before making any investment decisions.' },
              { t: 'Past Performance', d: 'Past performance is not indicative of future results. All investments carry risk, including the potential loss of principal.' },
              { t: 'Accuracy', d: 'While we strive to provide accurate and up-to-date information, we make no representations or warranties of any kind about the completeness, accuracy, or reliability of the information contained on this website.' },
              { t: 'External Links', d: 'This website may contain links to external sites. We are not responsible for the content or privacy practices of such other sites.' },
            ].map((s, i) => (
              <div key={i} style={{ padding: '32px 0', borderBottom: '1px solid var(--hairline)' }}>
                <h3 className="t-h3 mb-3">{s.t}</h3>
                <p className="t-body">{s.d}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  )
}
