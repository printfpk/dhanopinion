import { motion, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HoverFlip, RevealChar } from '../components/Animations'
import { useRef, useState, useEffect } from 'react'

const steps = [
  {
    num: "01",
    title: "Step 1 – Debt Check",
    desc: "Before investing, it is important to evaluate your debt situation. Paying high interest on debt while expecting lower returns from investments is counterproductive.",
    icon: "fa-solid fa-landmark",
    link: "/steps/step-1-debt-check"
  },
  {
    num: "02",
    title: "Step 2 – Allocation between Equity and Debt",
    desc: "OK! You have cleared the first hurdle of the debt check and decided that you are ready to invest. Your portfolio should balance equity (stocks, mutual funds) and debt (bonds, fixed income, government schemes). But how much to invest in debt and how much in equity is a personal choice.",
    icon: "fa-solid fa-chart-pie",
    link: "/steps/step-2-allocation-equity-debt"
  },
  {
    num: "03",
    title: "Step 3 – Emergency Funds",
    desc: "An unplanned pulling out from an investment can cause severe damage to the portfolio in several ways: Liquidating equity investments in a downward spiral can impair the returns and limit the potential to bounce back during an upswing. Liquidating debt investments can invite penalties and lower than assured returns.",
    icon: "fa-solid fa-shield-halved",
    link: "/steps/step-3-emergency-funds"
  },
  {
    num: "04",
    title: "Step 4 – Investing in Equity (Stocks / Mutual Funds)",
    desc: "We recommend exposure to equity through mutual funds, not direct stock picking. This can be done either through equity mutual funds or the NPS (National Pension System) scheme.",
    icon: "fa-solid fa-arrow-trend-up",
    link: "/steps/step-4-investing-in-equity"
  },
  {
    num: "05",
    title: "Step 5 – Investing in Debt (Fixed Income)",
    desc: "Prioritize government schemes for fixed income investing. NPS can serve the need for both equity as well as fixed income investing since it follows an age-based allocation system.",
    icon: "fa-solid fa-building-columns",
    link: "/steps/step-5-investing-in-debt"
  },
  {
    num: "06",
    title: "Step 6 – Ongoing",
    desc: "Ensure that tax implications are factored in, at the time of investment, on the income that is generated, and on liquidation or encashment. Review allocation and investments periodically, but at least annually, and rebalance.",
    icon: "fa-solid fa-rotate",
    link: "/steps/step-6-ongoing"
  }
]

export default function StepsToInvestingSuccess() {
  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [scrollRange, setScrollRange] = useState(0)

  const scrollProgress = useMotionValue(0)
  
  // Apply a premium buttery smooth physics spring to the raw scroll input
  const smoothProgress = useSpring(scrollProgress, {
    stiffness: 150,
    damping: 25,
    mass: 0.5,
    restDelta: 0.0001
  })

  // Measure the total scrollable width of the track
  useEffect(() => {
    const updateRange = () => {
      if (trackRef.current) {
        setScrollRange(trackRef.current.scrollWidth - window.innerWidth)
      }
    }
    updateRange()
    window.addEventListener('resize', updateRange)
    return () => window.removeEventListener('resize', updateRange)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const containerH = el.offsetHeight
      const vh = window.innerHeight
      const navOffset = 72 // To account for the navbar padding

      const scrolledInto = navOffset - rect.top
      const total = containerH - vh

      let progress = scrolledInto / total
      progress = Math.max(0, Math.min(1, progress))
      
      scrollProgress.set(progress)

      const idx = Math.min(
        Math.max(0, Math.round(progress * (steps.length - 1))),
        steps.length - 1
      )
      
      setActiveIndex(idx)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // run once on mount in case already scrolled
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const x = useTransform(smoothProgress, [0, 1], [0, -scrollRange])

  return (
    <>
      {/* ── Intro ── */}
      <section className="sec" style={{
        background: 'var(--void)',
        paddingTop: 'clamp(40px, 5vw, 60px)',
        paddingBottom: 'clamp(30px, 4vw, 50px)',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--hairline)'
      }}>
        <div style={{ position: 'absolute', top: '10%', left: '20%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(212,168,83,0.05) 0%, transparent 70%)', pointerEvents: 'none', filter: 'blur(80px)', zIndex: 0 }} />
        <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
          <div className="tc mb-0">
            <RevealChar as="h1" text="Steps to Success" className="t-mega mb-6" style={{ lineHeight: 0.95 }} />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="t-body mb-0"
              style={{ maxWidth: 800, margin: '0 auto', textAlign: 'left', lineHeight: 1.8 }}
            >
              <p className="mb-4">Dear Investor,</p>
              <p className="mb-4">Thank you for your interest in Dhanopinion’s investment advisory service. On this page you will find a set of steps that you can go through in order to discover the most suitable investment avenues for yourself. This service uses the new income tax regime for all decisions and illustrations.</p>
              <p className="mb-4">Should you wish to seek a confidential, paid consulting with one of our experts, kindly click the “Personalized Investment Consulting” button below. A personalised investment consulting service is expected to be launched in the future. At this time, you will be joining a wait-list.</p>
              <p className="mb-4">We hope this advisory service provides you with the key inputs you need to move forward in your investment journey. Before proceeding, please read the Disclaimer and move forward only if you agree with the terms therein.</p>
              <p className="mb-0">We wish you a successful investing journey!</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: 'var(--gold)', marginTop: '20px' }}
          >
            <span style={{ fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700 }}>Jump to Success Steps</span>
            <motion.i
              className="fa-solid fa-chevron-down"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </div>
      </section>

      {/* ── Sticky scroll container ── */}
      <div
        ref={containerRef}
        style={{ height: `${steps.length * 100}vh`, position: 'relative' }}
      >
        <div style={{
          position: 'sticky',
          top: '72px', // stick just below the navbar
          height: 'calc(100vh - 72px)',
          background: 'var(--black)',
          overflow: 'hidden'
        }}>
          {/* Ambient glow */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
            background: 'radial-gradient(circle at 65% 35%, var(--gold-glow), transparent 60%)'
          }} />

          {/* Grid texture */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
            backgroundImage: 'linear-gradient(var(--hairline) 1px, transparent 1px), linear-gradient(90deg, var(--hairline) 1px, transparent 1px)',
            backgroundSize: '80px 80px', opacity: 0.5
          }} />

          {/* Progress dots */}
          <div style={{
            position: 'absolute', top: '28px', left: '50%', transform: 'translateX(-50%)',
            display: 'flex', gap: '10px', zIndex: 10
          }}>
            {steps.map((_, i) => (
              <div key={i} style={{
                height: '8px',
                width: i === activeIndex ? '28px' : '8px',
                borderRadius: '9999px',
                background: i === activeIndex ? 'var(--gold)' : 'var(--hairline)',
                transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)'
              }} />
            ))}
          </div>

          {/* The cards — horizontal scroll */}
          <motion.div 
            ref={trackRef}
            style={{
              x,
              display: 'flex',
              width: 'max-content',
              height: '100%',
              position: 'relative',
              zIndex: 5,
              gap: 'clamp(24px, 4vw, 60px)',
              padding: '0 max(24px, calc(50vw - 420px))',
              alignItems: 'center'
            }}
          >
            {steps.map((step, index) => (
              <div key={index} style={{
                width: '100vw',
                maxWidth: '840px',
                flexShrink: 0
              }}>
                <div style={{
                  width: '100%',
                  maxWidth: '840px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid var(--hairline)',
                  borderRadius: '24px',
                  padding: 'clamp(32px, 5vw, 60px)',
                  position: 'relative',
                  overflow: 'hidden',
                  backdropFilter: 'blur(16px)'
                }}>
                  {/* Corner glow */}
                  <div style={{
                    position: 'absolute', top: '-80px', right: '-80px',
                    width: '300px', height: '300px',
                    background: 'var(--gold-glow)', filter: 'blur(60px)',
                    borderRadius: '50%', pointerEvents: 'none'
                  }} />

                  {/* Ghost number */}
                  <div style={{
                    position: 'absolute', bottom: '-16px', right: '16px',
                    fontSize: 'clamp(90px, 14vw, 180px)', fontWeight: 900,
                    color: 'transparent', WebkitTextStroke: '1px var(--hairline)',
                    fontFamily: 'var(--font-heading)', lineHeight: 1,
                    pointerEvents: 'none', userSelect: 'none', zIndex: 0
                  }}>
                    {step.num}
                  </div>

                  <div style={{ position: 'relative', zIndex: 1 }}>
                    {/* Top row */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: 'var(--font-body)' }}>
                        Step {step.num}
                      </span>
                      <div style={{
                        width: '48px', height: '48px', borderRadius: '50%',
                        background: 'var(--gold-glow)', border: '1px solid rgba(212,168,83,0.3)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '18px', color: 'var(--gold)'
                      }}>
                        <i className={step.icon}></i>
                      </div>
                    </div>

                    <div style={{ width: '44px', height: '2px', background: 'var(--gold)', marginBottom: '20px', borderRadius: '2px' }} />

                    <h2 className="t-h1" style={{ marginBottom: '20px', lineHeight: 1.2 }}>{step.title}</h2>

                    <p className="t-body" style={{ lineHeight: 1.85, marginBottom: step.link ? '28px' : '0' }}>
                      {step.desc}
                    </p>

                    {step.link && (
                      <Link to={step.link} className="btn btn-ghost btn-sm" style={{ borderColor: 'rgba(212,168,83,0.4)', color: 'var(--gold)' }} target="_blank" rel="noopener noreferrer">
                        <HoverFlip text="READ FULL STEP" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Step counter */}
          <div style={{
            position: 'absolute', bottom: '28px', left: '50%', transform: 'translateX(-50%)',
            color: 'var(--ash)', fontSize: '13px', letterSpacing: '0.08em', fontWeight: 500, zIndex: 10
          }}>
            {activeIndex + 1} / {steps.length}
          </div>
        </div>
      </div>


    </>
  )
}
