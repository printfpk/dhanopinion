import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HoverFlip, RevealChar } from '../components/Animations'
import { SpreadCards } from '../components/SpreadCards'

const f = (d = 0) => ({ initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 }, transition: { duration: 0.7, delay: d, ease: [0.16, 1, 0.3, 1] } })

const wins = [
  { title: 'Shift to Direct Funds', desc: 'Choose a direct MF over a regular MF — save on fees every single year.', to: '/2023/08/18/when-investing-in-a-mutual-fund-choose-a-direct-mf-over-a-regular-mf/' },
  { title: 'Participate in NPS', desc: 'Tax benefits and low-cost investment options for retirement planning.', to: '/2023/08/20/national-pension-system-nps/' },
  { title: 'Switch to Liquid Funds', desc: 'Earn better returns on emergency funds than a savings account.', to: '/2023/08/19/why-keeping-money-in-a-liquid-mutual-fund-is-better-for-short-term-needs-than-keeping-it-in-a-savings-account/' },
  { title: 'Government Savings', desc: 'Move from fixed deposits to government small savings schemes.', to: '/2023/08/23/government-savings-schemes/' },
]

export default function EasyWins() {
  return (
    <>
      <div style={{ position: 'relative', overflowX: 'hidden' }}>
        {/* ══════ EASY WINS HERO ══════ */}
        <section
          className="sec"
          style={{
            background: "var(--charcoal)",
            position: "relative",
            zIndex: 1,
            paddingTop: "16px",
            paddingBottom: "clamp(24px, 4vw, 48px)",
            boxShadow: "var(--shadow-hard)",
          }}
        >
          <div className="wrap">
            <div 
              style={{ 
                display: "flex", 
                flexWrap: "wrap", 
                gap: "clamp(30px, 5vw, 60px)", 
                alignItems: "center" 
              }}
            >
              {/* LEFT: Text Content */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
                style={{ flex: "1 1 min(100%, 500px)" }}
              >
                <h1 
                  style={{ 
                    fontSize: "clamp(48px, 6vw, 72px)", 
                    fontWeight: 300,
                    fontFamily: "var(--font-heading)",
                    color: "var(--pure)", 
                    marginTop: 0, 
                    marginBottom: "32px",
                    letterSpacing: "-0.01em"
                  }}
                >
                  Easy Wins
                </h1>
                <p 
                  style={{ 
                    fontSize: "17px", 
                    lineHeight: 1.8, 
                    color: "var(--easy-text)", 
                    marginBottom: "24px",
                    fontWeight: 400
                  }}
                >
                  We share a few easy things that you can do to improve investment outcomes. With most investment decisions, there is a potential benefit and associated downside. One has to evaluate the benefits against the costs to decide what to do. With many decisions, whether you are better or worse off, depends upon whether equity market returns are better or worse than fixed income returns in the future over your holding horizon.
                </p>
                <p 
                  style={{ 
                    fontSize: "17px", 
                    lineHeight: 1.8, 
                    color: "var(--easy-text)", 
                    marginBottom: "40px",
                    fontWeight: 400
                  }}
                >
                  The Easy Wins are different in that these are opportunities for benefits without any significant associated downside. These are actions that you can take where we are very confident that you will be better off for taking these actions, whether markets go up or down.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    document.getElementById('cards-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  style={{
                    background: "var(--easy-btn)",
                    color: "var(--black)",
                    border: "none",
                    padding: "16px 36px",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: 600,
                    cursor: "pointer",
                    boxShadow: "var(--easy-btn-shadow)",
                  }}
                >
                  Know More
                </motion.button>
              </motion.div>

              {/* RIGHT: Rupee Image */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
                style={{ flex: "1 1 min(100%, 500px)", display: "flex", justifyContent: "center", alignItems: "center" }}
              >
                <motion.img
                  src="https://dhanopinion.com/wp-content/uploads/2023/07/Rupee-1.png"
                  alt="Rupee"
                  animate={{ y: [0, -14, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    width: "100%",
                    maxWidth: "260px",
                    objectFit: "contain",
                    filter: "drop-shadow(0 20px 60px rgba(212,168,83,0.25))",
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                />
              </motion.div>
            </div>
          </div>
        </section>

        <section id="cards-section" className="sec" style={{ background: 'var(--bg-pure)', position: 'relative', zIndex: 1, boxShadow: 'var(--shadow-hard-2)' }}>
          <div className="wrap">
            <SpreadCards
              items={wins}
              cols={4}
              className="g-4"
              renderCard={(item) => (
                <Link to={item.to} className="card starting-card" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', height: '100%', minHeight: 240, padding: '36px 28px 28px', alignItems: 'flex-start' }}>
                  <h3 className="t-h3" style={{ marginBottom: 8, color: '#1a1714' }}><HoverFlip text={item.title} /></h3>
                  <p className="card-desc" style={{ flex: 1, opacity: 0.9, fontSize: 14, lineHeight: 1.65, color: '#5a4f45', margin: '10px 0 0' }}>{item.desc}</p>
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
