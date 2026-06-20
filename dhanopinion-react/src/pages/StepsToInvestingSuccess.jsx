import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HoverFlip, RevealChar } from '../components/Animations'
import { useRef } from 'react'

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
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <>
      <style>{`
        .timeline-container {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
          padding: 80px 20px;
        }
        .timeline-line-bg {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 2px;
          background: var(--hairline);
          transform: translateX(-50%);
        }
        .timeline-line-fill {
          position: absolute;
          top: 0;
          left: 50%;
          width: 2px;
          background: var(--gold);
          transform: translateX(-50%);
          transform-origin: top;
        }
        .step-row {
          display: flex;
          justify-content: flex-end;
          padding-right: 50%;
          position: relative;
          margin-bottom: 120px;
          width: 100%;
        }
        .step-row:nth-child(even) {
          justify-content: flex-start;
          padding-right: 0;
          padding-left: 50%;
        }
        .step-content {
          width: 85%;
          position: relative;
        }
        .step-row:nth-child(odd) .step-content {
          padding-right: 60px;
          text-align: right;
        }
        .step-row:nth-child(even) .step-content {
          padding-left: 60px;
          text-align: left;
        }
        .step-dot {
          position: absolute;
          top: 30px;
          width: 16px;
          height: 16px;
          background: var(--black);
          border: 2px solid var(--gold);
          border-radius: 50%;
          z-index: 2;
          transition: background 0.3s;
        }
        .step-row:nth-child(odd) .step-dot {
          right: -8px;
        }
        .step-row:nth-child(even) .step-dot {
          left: -8px;
        }
        .step-card {
          background: rgba(30, 30, 30, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          padding: 40px;
          border-radius: 24px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.4s, transform 0.4s;
        }
        .step-card:hover {
          border-color: rgba(212, 168, 83, 0.2);
          transform: translateY(-5px);
        }
        .step-num {
          position: absolute;
          top: -20px;
          font-size: 140px;
          font-weight: 800;
          color: transparent;
          -webkit-text-stroke: 1px rgba(212, 168, 83, 0.1);
          font-family: var(--font-mono);
          z-index: 0;
          pointer-events: none;
        }
        .step-row:nth-child(odd) .step-num {
          right: -10px;
        }
        .step-row:nth-child(even) .step-num {
          left: -10px;
        }
        @media (max-width: 768px) {
          .timeline-line-bg, .timeline-line-fill {
            left: 30px;
          }
          .step-row {
            padding-right: 0 !important;
            padding-left: 60px !important;
            justify-content: flex-start !important;
            margin-bottom: 80px;
          }
          .step-content {
            width: 100%;
            padding-right: 0 !important;
            padding-left: 20px !important;
            text-align: left !important;
          }
          .step-dot {
            left: -38px !important;
            right: auto !important;
          }
          .step-num {
            left: -10px !important;
            right: auto !important;
            font-size: 100px;
            top: -10px;
          }
          .step-card {
            padding: 30px 20px;
          }
        }
      `}</style>
      
      <section className="sec" style={{ background: 'var(--void)', padding: "clamp(80px, 10vw, 140px) 0", position: 'relative', overflow: 'hidden' }}>
        {/* Ambient background glow */}
        <div style={{ position: 'absolute', top: '10%', left: '20%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(212, 168, 83, 0.05) 0%, transparent 70%)', pointerEvents: 'none', filter: 'blur(80px)', zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(212, 168, 83, 0.03) 0%, transparent 70%)', pointerEvents: 'none', filter: 'blur(80px)', zIndex: 0 }} />

        <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
          <div className="tc mb-8">
            <RevealChar as="h1" text="The Journey to Success" className="t-mega mb-6" style={{ lineHeight: 0.95 }} />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="t-body-lg mb-4"
              style={{ color: 'var(--smoke)', maxWidth: 700, margin: '0 auto' }}
            >
              Follow these key steps in the Dhanopinion investing strategy. We start from the absolute basics—managing debt—and walk you through building a resilient, low-cost portfolio.
            </motion.p>
            <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} className="hairline-gold" style={{ margin: '40px auto 0' }} />
          </div>

          <div className="timeline-container" ref={containerRef}>
            <div className="timeline-line-bg" />
            <motion.div className="timeline-line-fill" style={{ height: lineHeight }} />

            {steps.map((step, index) => {
              const isEven = index % 2 === 0; // 0-indexed: 0 is even (left side conceptually, but nth-child(odd) is 1-indexed)
              // We'll use viewport-triggered animations for the steps
              return (
                <motion.div
                  key={index}
                  className="step-row"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="step-content">
                    <motion.div 
                      className="step-dot"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1, backgroundColor: 'var(--gold)' }}
                      viewport={{ once: true, margin: "-150px" }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    />
                    
                    <div className="step-card">
                      <div className="step-num">{step.num}</div>
                      <div style={{ position: 'relative', zIndex: 1 }}>
                        <h3 className="t-h2 mb-4" style={{ color: 'var(--pure)' }}>{step.title}</h3>
                        <p className="t-body" style={{ color: 'var(--smoke)', marginBottom: step.link ? '24px' : '0' }}>{step.desc}</p>
                        {step.link && (
                          <div style={{ display: 'inline-block' }}>
                            <Link to={step.link} className="btn btn-ghost btn-sm" style={{ borderColor: 'rgba(212, 168, 83, 0.4)', color: 'var(--gold)' }}>
                              <HoverFlip text="READ MORE" />
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  )
}
