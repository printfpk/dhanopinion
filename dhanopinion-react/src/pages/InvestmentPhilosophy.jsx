import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HoverFlip, RevealChar } from '../components/Animations'
import philosophyImage from '../assets/investment_philosophy.png'
import MediaSkeleton from '../components/MediaSkeleton'
import { useState, useEffect } from 'react'
import { client } from '../sanityClient'

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
  { text: "Everything has risk.", link: "/2023/08/04/there-is-always-some-risk/" },
  { text: "Compounded returns result in exponential growth and over long periods small returns result in large amounts of accumulated value. In other words, small differences in rates of return over long periods will result in large differences in accumulated value.", link: "/2023/08/03/compound-interest-and-exponential-growth/" },
  { text: "Inflation reduces the value of money. Over long periods, the loss is significant.", link: "/2023/08/25/inflation-real-value-and-the-money-illusion/" },
  { text: "Diversification reduces risk.", link: "/2023/04/09/diversification-reduces-risk/" },
  { text: "Markets are very competitive, and this makes it difficult to outperform the average market outcomes.", link: "/2023/08/10/competitive-financial-markets-and-the-implications-for-investment-strategy/" },
  { text: "Asset Allocation is the most important investment decision.", link: "/2023/08/05/asset-allocation/" },
  { text: "Equities historically outperform fixed income but come with the risk of large losses. Moving forward, equity returns may be lower than in the past, but still higher than fixed income returns.", link: "/2023/08/08/risk-and-return-profile-of-equity/" },
  { text: "Taxes have a significant impact on after-tax investment returns. Managing taxes can add a lot of value in the investment process.", link: "/2023/08/17/taxes-and-investment-outcomes/" },
  { text: "Defining and understanding your investment horizon can lead to better planning.", link: "/2023/08/07/defining-your-investment-horizon-can-lead-to-better-planning/" },
  { text: "Keep the cost of investing low.", link: "/2023/08/16/keep-the-cost-of-investing-low/" },
  { text: "Because markets are highly competitive, individual stock picking is less effective than buying the index.", link: "/2023/08/11/index-funds/" },
  { text: "Individuals and institutions - Who you are changes investment choices.", link: "/2023/08/10/competitive-financial-markets-and-the-implications-for-investment-strategy/" }
]

export default function InvestmentPhilosophy() {
  const [data, setData] = useState(null)

  useEffect(() => {
    client.fetch(`*[_type == "philosophyPage"][0]`)
      .then(res => setData(res))
      .catch(console.error)
  }, [])

  return (
    <>
      <section className="sec" style={{ background: 'var(--black)' }}>
        <div className="wrap">
          <div className="g-2" style={{ alignItems: 'center' }}>
            <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
              <RevealChar as="h1" text={data?.title || "Investment Philosophy"} className="t-mega mb-6" />
              <motion.p variants={fadeUp} className="t-body mb-7">
                {data?.introParagraph1 || "Underpinning any investment recommendation is an underlying investment philosophy. This section outlines our investment philosophy in a manner designed to make the underlying assumptions and process clear to you. If you agree with our investment philosophy, our approach is likely to be a good fit for you. If your view of the investment world is different, you should look at alternative solutions."}
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
                <MediaSkeleton type="img" loading="lazy" 
                  src={philosophyImage} 
                  alt="Investment Philosophy" 
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
            <h2 className="t-h1 mb-4" style={{ color: 'var(--pure)' }}>{data?.elementsTitle || "Core elements of our investment philosophy"}</h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}
          >
            {(data?.elements?.length > 0 ? data.elements : elements).map((item, i) => (
              <motion.div 
                key={i} 
                variants={fadeUp}
                className="list-row"
                onClick={() => {}} // Empty handler to enable :hover/:active on iOS Safari
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  gap: 'var(--sp-5)',
                  padding: 'var(--sp-4) var(--sp-5)',
                  borderBottom: '1px solid var(--hairline)'
                }}
              >
                <p className="t-body" style={{ margin: 0, flex: 1, color: 'var(--pure)' }}>
                  {item.text}
                </p>
                <div>
                  <Link to={item.link} className="btn btn-gold btn-sm row-action" style={{ whiteSpace: 'nowrap' }} target="_blank" rel="noopener noreferrer">
                    <HoverFlip text="Explore →" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  )
}
