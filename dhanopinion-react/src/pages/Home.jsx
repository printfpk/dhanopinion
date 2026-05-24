import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Suspense } from 'react'
import { HoverFlip, RevealChar } from '../components/Animations'
import { SpreadCards } from '../components/SpreadCards'
import ParticleSphere from '../components/ParticleSphere'

const fade = (d = 0) => ({ initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: { duration: 0.8, delay: d, ease: [0.16, 1, 0.3, 1] } })
const fadeX = (x, d = 0) => ({ initial: { opacity: 0, x }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true, amount: 0.2 }, transition: { duration: 0.8, delay: d, ease: [0.16, 1, 0.3, 1] } })

const startingPoints = [
  { icon: '🏆', label: 'Easy Wins', desc: 'Quick actions with no downside to improve your investment outcomes immediately.', to: '/easy-wins' },
  { icon: '⚡', label: 'Strategy', desc: 'A straightforward approach to building a portfolio that works.', to: '/simple-investment-strategy' },
  { icon: '◆', label: 'Philosophy', desc: 'Core principles behind every sound investment decision.', to: '/investment-philosophy' },
  { icon: '▣', label: 'Learn', desc: 'Deepen your knowledge with our research-backed articles.', to: '/information-centre' },
]

export default function Home() {
  return (
    <>
      <div style={{ position: 'relative' }}>
        <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'sticky', top: 0, overflow: 'hidden', background: 'var(--black)', zIndex: 0 }}>
          {/* Subtle atmospheric glow */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', width: '50vw', height: '50vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,0,0.07) 0%, transparent 70%)', top: '-10vw', right: '0', filter: 'blur(80px)' }} />
            <div style={{ position: 'absolute', width: '30vw', height: '30vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,168,83,0.05) 0%, transparent 70%)', bottom: '-5vw', left: '-5vw', filter: 'blur(60px)' }} />
          </div>

          <div className="wrap" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: 40, minHeight: '100vh' }}>
              {/* ── LEFT: text ── */}
              <div>
                <motion.p {...fade()} className="t-overline" style={{ marginBottom: 32 }}>SIMPLIFY INVESTING</motion.p>
                <RevealChar as="h1" text="INVESTING \n IS DIFFICULT" highlight="DIFFICULT" className="t-mega" style={{ marginBottom: 32 }} />
                <motion.p {...fade(0.3)} className="t-body-lg" style={{ maxWidth: 460, marginBottom: 40, color: 'var(--smoke)' }}>
                  It need not be. Leverage our research-backed resources and make better investment decisions — simply.
                </motion.p>
                <motion.div {...fade(0.4)} style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  <Link to="/easy-wins" className="btn btn-gold"><HoverFlip text="Get Started" /></Link>
                  <Link to="/investment-philosophy" className="btn btn-ghost"><HoverFlip text="Explore" /></Link>
                </motion.div>
              </div>

              {/* ── RIGHT: 3D particle sphere ── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                style={{ height: '70vh', position: 'relative' }}
              >
                <Suspense fallback={null}>
                  <ParticleSphere />
                </Suspense>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════ THE CHALLENGE ══════ */}
        <section className="sec" style={{ background: 'var(--charcoal)', position: 'relative', zIndex: 1, boxShadow: '0 -24px 64px rgba(0,0,0,0.8)' }}>
          <div className="wrap">
            <div className="g-2" style={{ alignItems: 'center' }}>
              <div>
                <motion.p {...fade()} className="t-overline mb-5">THE CHALLENGE</motion.p>
                <RevealChar as="h2" text="Investment strategy is hard" highlight="hard" className="t-display mb-5" delay={0.1} />
                <motion.p {...fade(0.4)} className="t-body" style={{ maxWidth: 440 }}>
                  It is difficult for large institutions, and it is even more difficult for individuals because they lack resources, expertise, and time.
                </motion.p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {[
                  { num: '01', title: 'Complex Choices', desc: 'Tens of thousands of possible choices to make.' },
                  { num: '02', title: 'Uncertain Results', desc: 'Chance and luck play a role in every outcome.' },
                  { num: '03', title: 'Limited Resources', desc: 'Individuals lack what institutions have.' },
                ].map((item, i) => (
                  <motion.div key={i} {...fade(i * 0.1 + 0.3)} style={{ padding: '28px 0', borderBottom: '1px solid var(--hairline)', display: 'flex', gap: 24, alignItems: 'flex-start' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--gold)', fontWeight: 600, minWidth: 28 }}>{item.num}</span>
                    <div>
                      <h3 className="t-h3" style={{ marginBottom: 4 }}><HoverFlip text={item.title} /></h3>
                      <p className="t-caption">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <div style={{ position: 'relative' }}>
        {/* ══════ OUR MISSION ══════ */}
        <section style={{ padding: 'var(--sp-9) 0', background: 'var(--black)', position: 'sticky', top: 0, zIndex: 0, height: '100vh', display: 'flex', alignItems: 'center' }}>
          <div className="wrap tc">
            <motion.p {...fade()} className="t-overline mb-5">OUR MISSION</motion.p>
            <RevealChar as="h2" text="We give opinions on effective strategies to help you" highlight="to help you" className="t-h1 mb-6" style={{ maxWidth: 700, margin: '0 auto var(--sp-6)', justifyContent: 'center' }} delay={0.1} />
            <motion.div {...fade(0.6)} className="hairline-gold" style={{ margin: '0 auto' }} />
          </div>
        </section>

        {/* ══════ STARTING POINTS ══════ */}
        <section className="sec" style={{ background: 'var(--pure)', color: 'var(--black)', position: 'relative', zIndex: 1, boxShadow: '0 -24px 64px rgba(0,0,0,0.6)' }}>
          <div className="wrap">
            <motion.p {...fade()} className="t-overline mb-3 tc" style={{ color: 'var(--black)' }}>GET STARTED</motion.p>
            <RevealChar as="h2" text="Choose your path" className="t-display mb-8 tc" style={{ justifyContent: 'center', color: 'var(--black)' }} delay={0.1} />
            <div style={{ marginTop: 40 }}>
              <SpreadCards
                items={startingPoints}
                cols={4}
                className="g-4"
                renderCard={(s) => (
                  <Link to={s.to} className="card" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', height: '100%', minHeight: 220 }}>
                    <span style={{ fontSize: 28, marginBottom: 20, display: 'block', color: 'var(--orange)' }}>{s.icon}</span>
                    <h3 className="t-h3" style={{ marginBottom: 8 }}><HoverFlip text={s.label} /></h3>
                    <p className="t-caption" style={{ flex: 1, opacity: 0.9 }}>{s.desc}</p>
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--orange)', marginTop: 20 }}><HoverFlip text="EXPLORE →" /></span>
                  </Link>
                )}
              />
            </div>
          </div>
        </section>
      </div>

      {/* ══════ WHAT YOU CAN EXPECT ══════ */}
      <section className="sec" style={{ background: 'var(--black)', borderTop: '1px solid var(--hairline)' }}>
        <div className="wrap">
          <div className="g-2" style={{ alignItems: 'center' }}>
            <div>
              <motion.p {...fade()} className="t-overline mb-5">BENEFITS</motion.p>
              <RevealChar as="h2" text="What you can expect" className="t-h1" delay={0.1} />
            </div>
            <div>
              {[
                { mark: '→', text: 'A better match between your goals and your strategy' },
                { mark: '→', text: 'Reduced complexity in investment choices' },
                { mark: '→', text: 'Improved returns — a little' },
              ].map((b, i) => (
                <motion.div key={i} {...fadeX(30, i * 0.1 + 0.3)} style={{ display: 'flex', gap: 16, padding: '20px 0', borderBottom: '1px solid var(--hairline)', alignItems: 'center' }}>
                  <span style={{ color: 'var(--gold)', fontSize: 16, fontWeight: 700 }}>{b.mark}</span>
                  <span style={{ color: 'var(--mist)', fontSize: 15 }}>{b.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════ WHAT YOU SHOULD NOT EXPECT ══════ */}
      <section className="sec" style={{ background: 'var(--void)', borderTop: '1px solid var(--hairline)' }}>
        <div className="wrap">
          <div className="g-2" style={{ alignItems: 'center' }}>
            <div>
              <motion.p {...fade()} className="t-overline mb-5">REALISTIC EXPECTATIONS</motion.p>
              <RevealChar as="h2" text="What you should not expect" highlight="not" className="t-h1" delay={0.1} />
            </div>
            <div>
              {['Market-beating returns consistently', 'Timing the market perfectly', 'Zero risk or guaranteed outcomes', 'Complex trading strategies'].map((t, i) => (
                <motion.div key={i} {...fadeX(30, i * 0.1 + 0.3)} style={{ display: 'flex', gap: 16, padding: '18px 0', borderBottom: '1px solid var(--hairline)', alignItems: 'center' }}>
                  <span style={{ color: 'var(--ash)', fontSize: 14 }}>✕</span>
                  <span style={{ color: 'var(--smoke)', fontSize: 15 }}>{t}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════ WHO IS IT FOR ══════ */}
      <section className="sec" style={{ background: 'var(--black)', borderTop: '1px solid var(--hairline)' }}>
        <div className="wrap">
          <motion.p {...fade()} className="t-overline mb-5 tc">TARGET AUDIENCE</motion.p>
          <RevealChar as="h2" text="Who is it for?" className="t-h1 mb-7 tc" style={{ justifyContent: 'center' }} delay={0.1} />
          <motion.p {...fade(0.4)} className="t-body tc mb-7" style={{ maxWidth: 560, margin: '0 auto var(--sp-7)' }}>
            Anyone interested in investing. However, particularly individuals looking for guidance on:
          </motion.p>
          <div className="g-4">
            {['Financial Planning', 'Asset Allocation', 'Fund Selection', 'Tax Optimization'].map((t, i) => (
              <motion.div key={i} {...fade(i * 0.08 + 0.4)} style={{ padding: '32px 24px', border: '1px solid var(--hairline)', textAlign: 'center' }}>
                <h3 className="t-h3"><HoverFlip text={t} /></h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ CTA — Teal Band (Superhuman) ══════ */}
      <section className="teal-band">
        <div className="wrap tc">
          <RevealChar as="h2" text="Ready to begin?" className="t-display mb-5" style={{ color: 'var(--pure)', justifyContent: 'center' }} delay={0.1} />
          <motion.p {...fade(0.4)} style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', marginBottom: 32, maxWidth: 400, margin: '0 auto 32px' }}>
            Start your journey toward simpler, more effective investing.
          </motion.p>
          <motion.div {...fade(0.5)}>
            <a href="mailto:response@dhanopinion.com" className="btn btn-white"><HoverFlip text="Get in touch" /></a>
          </motion.div>
        </div>
      </section>
    </>
  )
}
