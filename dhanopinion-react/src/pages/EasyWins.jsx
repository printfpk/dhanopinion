import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HoverFlip, RevealChar, AnimatedParagraph } from '../components/Animations'
import { SpreadCards } from '../components/SpreadCards'
import { useState, useEffect, useCallback } from 'react'
import { client } from '../sanityClient'
import useEmblaCarousel from 'embla-carousel-react'

const f = (d = 0) => ({ initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 }, transition: { duration: 0.7, delay: d, ease: [0.16, 1, 0.3, 1] } })

const wins = [
  { title: 'Shift to Direct Funds', desc: 'Choose a direct MF over a regular MF — save on fees every single year.', to: '/2023/08/18/when-investing-in-a-mutual-fund-choose-a-direct-mf-over-a-regular-mf/' },
  { title: 'Participate in NPS', desc: 'Tax benefits and low-cost investment options for retirement planning.', to: '/2023/08/20/national-pension-system-nps/' },
  { title: 'Switch to Liquid Funds', desc: 'Earn better returns on emergency funds than a savings account.', to: '/2023/08/19/why-keeping-money-in-a-liquid-mutual-fund-is-better-for-short-term-needs-than-keeping-it-in-a-savings-account/' },
  { title: 'Leverage Government Schemes', desc: 'Move from fixed deposits to government small savings schemes.', to: '/2023/08/23/government-savings-schemes/' },
]

export default function EasyWins() {
  const [data, setData] = useState(null)

  useEffect(() => {
    client.fetch(`*[_type == "easyWinsPage"][0]`)
      .then(res => setData(res))
      .catch(console.error)
  }, [])

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: true, align: 'start' })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <>
      <div style={{ position: 'relative', overflowX: 'hidden' }}>
        {/* ══════ EASY WINS HERO ══════ */}
        <section
          id="easy-wins-hero"
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
              <div style={{ flex: "1 1 min(100%, 500px)" }}>
                <RevealChar
                  as="h1"
                  text={data?.title || "Easy Wins"}
                  className="no-split"
                  style={{
                    fontSize: "clamp(48px, 6vw, 72px)",
                    fontWeight: 300,
                    fontFamily: "var(--font-heading)",
                    color: "var(--pure)",
                    marginTop: 0,
                    marginBottom: "32px",
                    letterSpacing: "-0.01em"
                  }}
                />
                <p
                  style={{
                    fontSize: "17px",
                    lineHeight: 1.8,
                    color: "var(--easy-text)",
                    marginBottom: "24px",
                    fontWeight: 400
                  }}
                >
                  {data?.introParagraph1 || "We share a few easy things that you can do to improve investment outcomes. With most investment decisions, there is a potential benefit and associated downside. One has to evaluate the benefits against the costs to decide what to do. With many decisions, whether you are better or worse off, depends upon whether equity market returns are better or worse than fixed income returns in the future over your holding horizon."}
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
                  {data?.introParagraph2 || "The Easy Wins are different in that these are opportunities for benefits without any significant associated downside. These are actions that you can take where we are very confident that you will be better off for taking these actions, whether markets go up or down."}
                </p>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      document.getElementById('cards-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    style={{
                      background: "var(--pure)",
                      color: "var(--black)",
                      border: "none",
                      padding: "16px 36px",
                      borderRadius: "8px",
                      fontSize: "16px",
                      fontWeight: 600,
                      cursor: "pointer",
                      boxShadow: "none",
                    }}
                  >
                    Know More
                  </motion.button>
                </motion.div>
              </div>

              {/* RIGHT: Rupee Image */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
                className="easywin-image-wrapper"
                style={{ flex: "1 1 min(100%, 500px)", display: "flex", justifyContent: "center", alignItems: "center" }}
              >
                <motion.img
                  className="easywin-img"
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

            <div className="embla" ref={emblaRef} style={{ overflow: 'hidden', paddingBottom: '24px' }}>
              <div className="embla__container" style={{ display: 'flex', marginLeft: 'calc(var(--sp-5) * -1)' }}>
                {[...(data?.cards?.length > 0 ? data.cards : wins), ...(data?.cards?.length > 0 ? data.cards : wins)].map((item, index) => (
                  <div key={index} className="embla__slide" style={{ minWidth: '0' }}>
                    <Link to={item.to} className="card starting-card easy-wins-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }} target="_blank" rel="noopener noreferrer">
                      <h3 className="t-h3" style={{ height: '52px', marginBottom: 8, color: '#1a1714', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.title}</h3>
                      <p className="card-desc" style={{ height: '70px', opacity: 0.9, fontSize: 14, lineHeight: 1.65, color: '#5a4f45', margin: '10px 0 0', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.desc}</p>
                      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--orange)', marginTop: 24 }}><HoverFlip text="READ MORE →" /></span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 40 }}
            >
              <motion.button
                initial="initial"
                whileHover="hover"
                whileTap="hover"
                style={{
                  background: '#000',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50%',
                  width: 48,
                  height: 48,
                  fontSize: 20,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingBottom: 2
                }}
                variants={{
                  initial: { backgroundColor: '#000', scale: 1 },
                  hover: { backgroundColor: 'var(--orange)', scale: 1.05 }
                }}
                onClick={scrollPrev}
              >
                <motion.span variants={{ initial: { x: 0 }, hover: { x: -4 } }} transition={{ type: 'spring', stiffness: 400, damping: 10 }}>
                  ←
                </motion.span>
              </motion.button>
              <motion.button
                initial="initial"
                whileHover="hover"
                whileTap="hover"
                style={{
                  background: '#000',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50%',
                  width: 48,
                  height: 48,
                  fontSize: 20,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingBottom: 2
                }}
                variants={{
                  initial: { backgroundColor: '#000', scale: 1 },
                  hover: { backgroundColor: 'var(--orange)', scale: 1.05 }
                }}
                onClick={scrollNext}
              >
                <motion.span variants={{ initial: { x: 0 }, hover: { x: 4 } }} transition={{ type: 'spring', stiffness: 400, damping: 10 }}>
                  →
                </motion.span>
              </motion.button>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}
