import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HoverFlip, RevealChar } from '../components/Animations'

const steps = [
  {
    num: "01",
    title: "Evaluate and Manage Debt",
    desc: "Before investing, always evaluate your existing debt. Pay off high-interest loans (like credit cards and personal loans) first. The guaranteed return of eliminating high-interest debt is almost impossible to beat in the financial markets.",
    link: null
  },
  {
    num: "02",
    title: "Secure an Emergency Fund",
    desc: "Set aside 6 to 12 months of living expenses. Keep this money in a liquid mutual fund rather than a regular savings account to earn slightly better returns while maintaining accessibility.",
    link: "/2023/08/19/why-keeping-money-in-a-liquid-mutual-fund-is-better-for-short-term-needs-than-keeping-it-in-a-savings-account/"
  },
  {
    num: "03",
    title: "Define Risk and Horizon",
    desc: "Understand your investment horizon and evaluate your true risk tolerance. If a severe market drop would cause you to panic and sell, you need to reduce your equity exposure accordingly.",
    link: "/2023/08/08/risk-and-return-profile-of-equity/"
  },
  {
    num: "04",
    title: "Determine Asset Allocation",
    desc: "Decide how much of your capital to allocate to Equities (for growth) and Fixed Income (for stability). This is the single most important decision in your investment journey.",
    link: "/2023/08/05/asset-allocation/"
  },
  {
    num: "05",
    title: "Execute Fixed Income",
    desc: "For the fixed income portion of your allocation, prioritize Government Small Savings Schemes (like PPF or SCSS) and the National Pension System (NPS) for retirement goals.",
    link: "/2023/08/23/government-savings-schemes/"
  },
  {
    num: "06",
    title: "Execute Equities",
    desc: "For your equity exposure, do not try to pick individual stocks or time the market. Buy broad-market Index Funds through Direct Mutual Funds to minimize costs.",
    link: "/2023/08/11/index-funds/"
  },
  {
    num: "07",
    title: "Keep Costs Low & Be Patient",
    desc: "Taxes and fees significantly impact long-term compounding. Stick to your allocation, minimize unnecessary trading, and let the power of compound interest work over time.",
    link: "/2023/08/03/compound-interest-and-exponential-growth/"
  }
];

export default function StepsToInvestingSuccess() {
  return (
    <>
      <section className="sec" style={{ background: 'var(--void)', padding: "clamp(80px, 10vw, 140px) 0", position: 'relative', overflow: 'hidden' }}>
        {/* Ambient background glow */}
        <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '80%', height: '80%', background: 'radial-gradient(circle, rgba(212, 168, 83, 0.08) 0%, transparent 60%)', pointerEvents: 'none', filter: 'blur(60px)' }} />

        <div className="wrap">
          <div className="tc mb-8" style={{ position: 'relative', zIndex: 1 }}>
            <p className="t-overline mb-4" style={{ color: "var(--gold)" }}>YOUR ROADMAP</p>
            <RevealChar as="h1" text="Steps to Investing Success" className="t-mega mb-6" style={{ lineHeight: 0.95 }} />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="t-body-lg mb-4"
              style={{ color: 'rgba(255, 255, 255, 0.7)', maxWidth: 700, margin: '0 auto' }}
            >
              Follow these key steps in the Dhanopinion investing strategy. We start from the absolute basics—managing debt—and walk you through building a resilient, low-cost portfolio.
            </motion.p>
            <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} className="hairline-gold" style={{ margin: '40px auto 0' }} />
          </div>

          <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                className="card"
                style={{
                  display: 'flex',
                  gap: 'clamp(20px, 4vw, 32px)',
                  position: 'relative',
                  overflow: 'hidden',
                  background: 'linear-gradient(145deg, rgba(30, 30, 30, 0.6) 0%, rgba(20, 20, 20, 0.6) 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  alignItems: 'flex-start',
                  padding: 'clamp(24px, 5vw, 40px)'
                }}
              >
                <div style={{
                  fontSize: 'clamp(48px, 8vw, 64px)',
                  fontWeight: 800,
                  color: 'transparent',
                  WebkitTextStroke: '1px rgba(212, 168, 83, 0.4)',
                  lineHeight: 0.8,
                  fontFamily: 'var(--font-mono)'
                }}>
                  {step.num}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 className="t-h2" style={{ marginBottom: '16px', color: 'var(--pure)' }}>{step.title}</h3>
                  <p className="t-body" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: step.link ? '24px' : '0' }}>{step.desc}</p>
                  {step.link && (
                    <Link to={step.link} className="btn btn-ghost btn-sm" style={{ borderColor: 'rgba(212, 168, 83, 0.4)', color: 'var(--gold)' }}>
                      <HoverFlip text="READ MORE" />
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
