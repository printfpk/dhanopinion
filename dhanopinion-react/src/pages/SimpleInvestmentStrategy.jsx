import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HoverFlip, RevealChar } from '../components/Animations'
import chessImage from '../assets/investment_chess_strategy.png'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
}

const elements = [
  { n: "01", text: "Start saving early if you can, even if the amounts of saving are small.", link: "/2023/08/03/compound-interest-and-exponential-growth/" },
  { n: "02", text: "Investment in stocks – Do not pick individual stocks or securities.", link: "/2023/08/14/dont-pick-stocks-buy-the-index/" },
  { n: "03", text: "Investment in stocks – Do not time investments by predicting the short-term movement of markets.", link: "/2023/08/10/competitive-financial-markets-and-the-implications-for-investment-strategy/" },
  { n: "04", text: "Focus on deciding how much to put into equities and how much to put into fixed income assets. This is Asset Allocation and has the biggest impact on your future gains and losses.", link: "/2023/08/05/asset-allocation/" },
  { n: "05", text: "Think about what you will do if markets drop and your investments lose value – if you are likely to sell to avoid further losses, you may be taking too much risk and should consider reducing your risk now, before markets go down.", link: "/2023/08/08/risk-and-return-profile-of-equity/" },
  { n: "06", text: "Use the National Pension Scheme for your long-term investment goals.", link: "/2023/08/20/national-pension-system-nps/" },
  { n: "07", text: "Exposure to asset classes – Use Index funds for your equity risk exposure.", link: "/2023/08/11/index-funds/" },
  { n: "08", text: "Exposure to asset classes – Use Government Small savings Schemes for your fixed income exposures.", link: "/2023/08/23/government-savings-schemes/" },
  { n: "09", text: "Invest in Direct Mutual Funds and avoid Regular Funds.", link: "/2023/08/18/when-investing-in-a-mutual-fund-choose-a-direct-mf-over-a-regular-mf/" },
  { n: "10", text: "Keep your savings for emergency needs in a liquid mutual fund instead of a bank savings account.", link: "/2023/08/19/why-keeping-money-in-a-liquid-mutual-fund-is-better-for-short-term-needs-than-keeping-it-in-a-savings-account/" },
]

export default function SimpleInvestmentStrategy() {
  return (
    <>
      <section className="sec" style={{ background: 'var(--black)' }}>
        <div className="wrap">
          <div className="g-2" style={{ alignItems: 'center' }}>
            <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
              <RevealChar as="h1" text="A Simple Investment Strategy" className="t-mega mb-6" />
              <motion.p variants={fadeUp} className="t-body mb-4">
                Investing can be very complex. However it is possible to create simple investment strategies that can be surprisingly effective.
              </motion.p>
              <motion.p variants={fadeUp} className="t-body mb-7">
                Here we suggest a simple investment strategy that is easy to understand and that is likely to be more effective than most complex investment strategies recommended to individual investors.
              </motion.p>
              <motion.div variants={fadeUp}>
                <a href="#elements" className="btn btn-gold">
                  <HoverFlip text="KNOW MORE" />
                </a>
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div style={{ position: 'relative', padding: 'var(--sp-4)' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'var(--gold-glow)', borderRadius: '4px', filter: 'blur(40px)', zIndex: 0 }}></div>
                <img 
                  src={chessImage} 
                  alt="Chess Strategy" 
                  style={{ width: '100%', height: 'auto', borderRadius: '4px', position: 'relative', zIndex: 1, boxShadow: 'var(--shadow-hard-4)' }} 
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="elements" className="sec" style={{ background: 'var(--charcoal)', borderTop: '1px solid var(--hairline)' }}>
        <div className="wrap">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="mb-8 tc"
          >
            <h2 className="t-h1 mb-4" style={{ color: 'var(--pure)' }}>Here are the elements of the simple investment strategy</h2>
            <div className="hairline-gold" style={{ margin: '0 auto' }}></div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}
          >
            {elements.map((item, i) => (
              <motion.div 
                key={i} 
                variants={fadeUp}
                className="list-row"
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  gap: 'var(--sp-5)',
                  padding: 'var(--sp-4) var(--sp-5)',
                  borderBottom: '1px solid var(--hairline)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-4)', flex: 1 }}>
                  <p className="t-body" style={{ margin: 0, color: 'var(--pure)' }}>
                    {item.text}
                  </p>
                </div>
                <div>
                  {item.link ? (
                    <Link to={item.link} className="btn btn-gold btn-sm row-action" style={{ whiteSpace: 'nowrap' }}>
                      <HoverFlip text="Know More" />
                    </Link>
                  ) : (
                    <span className="btn btn-sm row-action" style={{ whiteSpace: 'nowrap', opacity: 0.35, cursor: 'default', border: '1px solid var(--hairline)', color: 'var(--smoke)' }}>
                      Coming Soon
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  )
}
