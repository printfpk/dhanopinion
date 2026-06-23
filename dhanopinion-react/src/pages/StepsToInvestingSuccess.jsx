import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HoverFlip, RevealChar } from '../components/Animations'
import { useRef } from 'react'

const cinematicJourney = [
  {
    num: "01",
    title: "Defining Your Investment Horizon Can Lead To Better Planning",
    desc: "Every great journey begins with a destination in mind. By clearly defining your investment horizon, you anchor your financial decisions to real-world goals, allowing you to weather short-term storms with unwavering confidence.",
    link: "/2023/08/07/defining-your-investment-horizon-can-lead-to-better-planning/",
    icon: "fa-solid fa-compass"
  },
  {
    num: "02",
    title: "A Liquid Mutual Fund Is Better For Short-term Needs Than A Bank Savings Account",
    desc: "Before you seek growth, you must build a fortress. Securing an emergency fund in a liquid mutual fund ensures your wealth is protected from immediate life shocks, providing a stable foundation for the future.",
    link: "/2023/08/19/why-keeping-money-in-a-liquid-mutual-fund-is-better-for-short-term-needs-than-keeping-it-in-a-savings-account/",
    icon: "fa-solid fa-piggy-bank"
  },
  {
    num: "03",
    title: "There Is Always Some Risk",
    desc: "To achieve greatness, one must step into the unknown. Acknowledging and embracing the inherent risks of the financial world is the first step toward mastering them. Risk is not to be feared, but to be managed.",
    link: "/2023/08/04/there-is-always-some-risk/",
    icon: "fa-solid fa-shield-halved"
  },
  {
    num: "04",
    title: "Asset Allocation",
    desc: "The true art of investing lies in balance. By meticulously dividing your capital across different asset classes, you create a resilient portfolio designed to capture growth while cushioning inevitable falls.",
    link: "/2023/08/05/asset-allocation/",
    icon: "fa-solid fa-chart-pie"
  },
  {
    num: "05",
    title: "Leverage Government Schemes",
    desc: "A wise investor utilizes every tool at their disposal. Government schemes offer unparalleled stability and tax advantages, serving as the unbreakable bedrock of the fixed-income portion of your portfolio.",
    link: "/2023/08/23/government-savings-schemes/",
    icon: "fa-solid fa-building-columns"
  },
  {
    num: "06",
    title: "Don't Pick Stocks, Buy The Index",
    desc: "Leave the illusion of prediction to the gamblers. By purchasing broad-market index funds, you effortlessly align yourself with the unstoppable upward march of global human progress and innovation.",
    link: "/2023/08/14/dont-pick-stocks-buy-the-index/",
    icon: "fa-solid fa-arrow-trend-up"
  },
  {
    num: "07",
    title: "Compound Interest And Exponential Growth",
    desc: "The final step is the hardest: patience. Time is the ultimate multiplier. Let the magic of compounding transform your disciplined savings into a legacy of exponential, generational wealth.",
    link: "/2023/08/03/compound-interest-and-exponential-growth/",
    icon: "fa-solid fa-seedling"
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
        
        .blank-side-icon {
          position: absolute;
          top: 50%;
          font-size: 140px;
          color: rgba(212, 168, 83, 0.1);
          z-index: 0;
          pointer-events: none;
          transition: transform 0.5s ease, color 0.5s ease;
        }
        .step-row:hover .blank-side-icon {
          color: rgba(212, 168, 83, 0.25);
          transform: translateY(-50%) scale(1.1);
        }
        .step-row:nth-child(odd) .blank-side-icon {
          right: 25%;
          transform: translate(50%, -50%);
        }
        .step-row:nth-child(even) .blank-side-icon {
          left: 25%;
          transform: translate(-50%, -50%);
        }

        .scroll-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          margin: 40px auto;
          color: var(--gold);
          font-weight: 600;
          letter-spacing: 2px;
          animation: bounce 2s infinite;
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
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
          .blank-side-icon {
            display: none;
          }
        }
      `}</style>
      
      <section className="sec" style={{ background: 'var(--void)', paddingTop: "clamp(40px, 5vw, 60px)", paddingBottom: "clamp(80px, 10vw, 140px)", position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '10%', left: '20%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(212, 168, 83, 0.05) 0%, transparent 70%)', pointerEvents: 'none', filter: 'blur(80px)', zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(212, 168, 83, 0.03) 0%, transparent 70%)', pointerEvents: 'none', filter: 'blur(80px)', zIndex: 0 }} />

        <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
          <div className="tc mb-8">
            <RevealChar as="h1" text="The Journey to Success" className="t-mega mb-6" style={{ lineHeight: 0.95 }} />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="t-body mb-4"
              style={{ color: 'var(--smoke)', maxWidth: 800, margin: '0 auto', textAlign: 'left', lineHeight: 1.8 }}
            >
              <p className="mb-4">Dear Investor,</p>
              <p className="mb-4">Thank you for your interest in Dhanopinion’s investment advisory service. On this page you will find a set of steps that Dhanopinion recommends you go through in order to discover the most suitable investment avenues for yourself. You can use this service in complete confidentiality—we do not collect personal details such as your name, phone number, or email address.</p>
              <p className="mb-4">At any stage, if you wish to discuss your situation with one of our advisors and receive specific, personalized advice, please click the "Connect to Advisor" button. You’ll then be asked to share your contact details so our team can reach you. You can also write to us at <a href="mailto:contact@dhanopinion.com" style={{ color: 'var(--gold)', textDecoration: 'none' }}>contact@dhanopinion.com</a>.</p>
              <p className="mb-4">This service uses the new income tax regime for all decisions and illustrations, as over 70% of returns for FY 24-25 were filed under it and adoption is expected to grow.</p>
              <p className="mb-4">We hope this advisory service provides you with the key inputs you need to move forward in your investment journey. Before proceeding, please read the Terms & Conditions and move forward only if you agree with them.</p>
              <p className="mb-6">We wish you a successful investing journey!</p>
              <div className="tc">
                <Link to="/consulting-waitlist" className="btn btn-gold" style={{ display: 'inline-block' }}>
                  <HoverFlip text="Connect to Advisor" />
                </Link>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} className="hairline-gold" style={{ margin: '40px auto 0' }} />
          </div>

          <div className="scroll-indicator">
            <span style={{ fontSize: '12px' }}>SCROLL FOR MORE STEPS</span>
            <i className="fa-solid fa-chevron-down"></i>
          </div>

          <div className="timeline-container" ref={containerRef}>
            <div className="timeline-line-bg" />
            <motion.div className="timeline-line-fill" style={{ height: lineHeight }} />

            {cinematicJourney.map((step, index) => {
              return (
                <motion.div
                  key={index}
                  className="step-row"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="blank-side-icon">
                    <i className={step.icon}></i>
                  </div>
                  
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
                        <div className="mb-4" style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start' }}>
                          <span style={{ color: 'var(--gold)', fontFamily: 'var(--font-mono)', fontSize: '18px', fontWeight: 600, letterSpacing: '2px' }}>STEP {step.num}</span>
                        </div>
                        <h3 className="t-h2 mb-4" style={{ color: 'var(--pure)' }}>{step.title}</h3>
                        <p className="t-body" style={{ color: 'var(--smoke)', marginBottom: step.link ? '24px' : '0', lineHeight: 1.8 }}>{step.desc}</p>
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
