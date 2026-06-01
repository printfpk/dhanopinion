import { motion } from 'framer-motion'
import PostLayout from '../../components/PostLayout'

export default function Post_when_investing_in_a_mutual_fund_choose_a_direct_mf_over_a_regular_mf() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  return (
    <PostLayout title="When investing in a Mutual Fund, choose a Direct MF over a Regular MF">
      <div className="sec wrap-narrow">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-8"
        >
          <p className="t-overline mb-3">Investment Strategy</p>
          <h1 className="t-h1 mb-4">When investing in a Mutual Fund, choose a Direct MF over a Regular MF</h1>
          <div className="hairline-gold mb-6"></div>
          <p className="t-caption">August 18, 2023</p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="g-2 mb-8"
          style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}
        >
          <motion.p variants={fadeUp} className="t-body-lg">
            We know that a mutual fund is a pooled investment account that is managed through professional fund managers for the purpose of earning better returns than what individuals may be able to earn on their own. There can be various investment targets for mutual funds depending on their investment objectives. One MF may be focused on the banking sector while another’s goal might be to invest in the technology sector.
          </motion.p>
          <motion.p variants={fadeUp} className="t-body">
            Every mutual fund scheme can be invested in directly through the fund house, or through a mutual fund distributor, such as your bank, who is an intermediary.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="g-2 mb-8"
        >
          <motion.div variants={fadeUp} className="card" style={{ height: '100%' }}>
            <h3 className="t-h3 mb-3" style={{ color: 'var(--gold)' }}>Regular Mutual Funds</h3>
            <p className="t-body">
              Many investors buy regular mutual funds which are sold through financial intermediaries such as banks. The expense ratio of these funds includes the fees and commissions paid out to these intermediaries. The intermediary provides suggestions to an investor and allows him to choose from a basket of funds that they sell. The investment and disinvestment process is also handled by them.
            </p>
          </motion.div>
          <motion.div variants={fadeUp} className="card" style={{ height: '100%' }}>
            <h3 className="t-h3 mb-3" style={{ color: 'var(--gold)' }}>Direct Mutual Funds</h3>
            <p className="t-body">
              The other type of mutual fund investment is a direct investment. This investment is done directly with the fund house once an investor has determined the fund he wishes to invest in. He needs to evaluate the various options on his own.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)', marginBottom: 'var(--sp-8)' }}
        >
          <motion.p variants={fadeUp} className="t-body">
            On account of a lower cost structure, these funds are able to pass on a greater share of the earnings back to the investor. Over a long period of time, this difference compounds into a large margin.
          </motion.p>
          <motion.p variants={fadeUp} className="t-body">
            The difference between the two types of investments arises on account of the total expense ratio (TER) which is loaded on to the fund. It is much higher in case of a regular fund, thereby reducing the returns available to the investor. Through the principle of compounding, over time, the difference expands. The TER difference between the two will vary based on the type of fund. Expenses for equity funds are higher, as is the difference.
          </motion.p>
          <motion.p variants={fadeUp} className="t-body">
            It must be kept in mind that the intermediaries provide services to investors such as advice and statements, KYC completion from time to time which may be of use to some investors and they may not mind bearing the extra cost.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="card mb-8"
          style={{ borderLeft: '4px solid var(--gold)' }}
        >
          <h2 className="t-h2 mb-4">Recommendation</h2>
          <p className="t-body-lg" style={{ color: 'var(--pure)' }}>
            If you are invested in regular MFs, make the move to direct MFs today. Your returns will improve as a result.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-8"
          style={{ background: 'var(--charcoal)', padding: 'var(--sp-5)', borderRadius: '0' }}
        >
          <motion.h3 variants={fadeUp} className="t-h3 mb-3" style={{ color: 'var(--orange)' }}>Note</motion.h3>
          <motion.p variants={fadeUp} className="t-body mb-3">
            A move from regular to a direct MF will amount to a sale and purchase transaction and attract applicable capital gains tax and other provisions. Hence, please evaluate the implications prior to initiating the move.
          </motion.p>
          <motion.p variants={fadeUp} className="t-body">
            In addition, some services like advice that you were receiving from the distributor will not be available. You will also need to complete the investment related formalities yourself. The focus of MFs is on generating returns, not so much on customer service. However, they will send you account statements if you are a direct investor.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-8"
        >
          <motion.h2 variants={fadeUp} className="t-h2 mb-4">How will you know whether your MF is direct or regular?</motion.h2>
          <motion.p variants={fadeUp} className="t-body mb-3">
            Direct funds say so in the name. In your statement, the word ‘Direct’ should be a part of the name of the MF scheme. if they don’t say anything, they are regular which sounds good but really means <strong>High Fee Class</strong>.
          </motion.p>
          <motion.p variants={fadeUp} className="t-body">
            Another way to check is the ‘Advisor’ field on the statement. Direct MFs will display ARN followed by a number.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-8"
        >
          <motion.h2 variants={fadeUp} className="t-h2 mb-4">How do I invest directly?</motion.h2>
          <motion.p variants={fadeUp} className="t-body mb-5">
            You need to invest through the website of the MF or through branch offices if they have them. Going through a bank or another distributor will get you a regular MF.
          </motion.p>
          
          <motion.div variants={fadeUp} className="card">
            <h3 className="t-h3 mb-4">Website of some of the largest public sector Mutual Funds:</h3>
            <ul style={{ listStyle: 'none' }}>
              <li className="list-row mb-2">
                <a href="https://www.sbimf.com/" target="_blank" rel="noopener noreferrer" className="t-body" style={{ display: 'block', padding: '8px 0' }}>https://www.sbimf.com/</a>
              </li>
              <li className="list-row mb-2">
                <a href="https://www.utimf.com/" target="_blank" rel="noopener noreferrer" className="t-body" style={{ display: 'block', padding: '8px 0' }}>https://www.utimf.com/</a>
              </li>
              <li className="list-row">
                <a href="https://www.licmf.com/" target="_blank" rel="noopener noreferrer" className="t-body" style={{ display: 'block', padding: '8px 0' }}>https://www.licmf.com/</a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeUp} className="t-h2 mb-4">What is the difference in earning between a regular and a direct MF?</motion.h2>
          <motion.p variants={fadeUp} className="t-body">
            The difference is exactly equal to the extra fees charged. The difference is smallest for index funds and liquid funds and highest for hybrid funds and equity funds.
          </motion.p>
        </motion.div>
        
      </div>
    </PostLayout>
  )
}
