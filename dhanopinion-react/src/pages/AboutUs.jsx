import { motion } from 'framer-motion'
import { HoverFlip, RevealChar } from '../components/Animations'

const f = (d = 0) => ({ initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 }, transition: { duration: 0.7, delay: d, ease: [0.16, 1, 0.3, 1] } })

export default function AboutUs() {
  return (
    <>
      <section style={{ minHeight: '55vh', display: 'flex', alignItems: 'center', background: 'var(--black)', borderBottom: '1px solid var(--hairline)' }}>
        <div className="wrap">
          <motion.p {...f()} className="t-overline mb-5">ABOUT</motion.p>
          <RevealChar as="h1" text="ABOUT \n US" highlight="US" className="t-mega mb-5" />
        </div>
      </section>
      <section className="sec" style={{ background: 'var(--void)' }}>
        <div className="wrap-narrow">
          <motion.div {...f()}>
            <div className="hairline-gold mb-7" />
            <RevealChar as="h2" text="Our Mission" className="t-h2 mb-5" delay={0.1} />
            <p className="t-body mb-5" style={{ marginTop: 24 }}>Dhanopinion is dedicated to helping individuals navigate the complex world of investing. We believe that with the right knowledge and framework, anyone can make better investment decisions.</p>
            <p className="t-body mb-5">Our approach is based on rigorous research, academic evidence, and practical experience. We focus on providing opinions on effective strategies rather than trying to predict markets or recommend specific securities.</p>
            <p className="t-body mb-7">We believe in keeping it simple. The best investment strategies are not necessarily the most complex ones — in fact, simplicity often leads to better outcomes.</p>
          </motion.div>
          <motion.div {...f(0.15)} style={{ borderTop: '1px solid var(--hairline)', paddingTop: 48 }}>
            <RevealChar as="h2" text="Get In Touch" className="t-h2 mb-5" delay={0.1} />
            <p className="t-body mb-5" style={{ marginTop: 24 }}>Have questions or want to learn more? We'd love to hear from you.</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
              <span style={{ color: 'var(--gold)' }}>→</span>
              <a href="mailto:response@dhanopinion.com" style={{ fontSize: 17, color: 'var(--gold)', fontWeight: 500 }}><HoverFlip text="response@dhanopinion.com" /></a>
            </div>
            <a href="mailto:response@dhanopinion.com" className="btn btn-gold"><HoverFlip text="Write to us" /></a>
          </motion.div>
        </div>
      </section>
    </>
  )
}
