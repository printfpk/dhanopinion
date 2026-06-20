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

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)', marginBottom: 'var(--sp-8)' }}
        >
          <motion.p variants={fadeUp} className="t-body">
            We know that a mutual fund is a pooled investment account that is managed through professional fund managers for the purpose of earning better returns than what individuals may be able to earn on their own. There can be various investment targets for mutual funds depending on their investment objectives. One MF may be focused on the banking sector while another’s goal might be to invest in the technology sector.
          </motion.p>
          <motion.p variants={fadeUp} className="t-body">
            Every mutual fund scheme can be invested in directly through the fund house, or through a mutual fund distributor, such as your bank, who is an intermediary.
          </motion.p>
          <motion.p variants={fadeUp} className="t-body">
            Many investors buy regular mutual funds which are sold through financial intermediaries such as banks. The expense ratio of these funds includes the fees and commissions paid out to these intermediaries. The intermediary provides suggestions to an investor and allows him to choose from a basket of funds that they sell. The investment and disinvestment process is also handled by them.
          </motion.p>
          <motion.p variants={fadeUp} className="t-body">
            The other type of mutual fund investment is a direct investment. This investment is done directly with the fund house once an investor has determined the fund he wishes to invest in. He needs to evaluate the various options on his own.
          </motion.p>
          <motion.p variants={fadeUp} className="t-body">
            On account of a lower cost structure, these funds are able to pass on a greater share of the earnings back to the investor. Over a long period of time, this difference compounds into a large margin.
          </motion.p>
          <motion.p variants={fadeUp} className="t-body">
            The difference between the two types of investments arises on account of the total expense ratio (TER) which is loaded on to the fund. It is much higher in case of a regular fund, thereby reducing the returns available to the investor. Through the principle of compounding, over time, the difference expands. The TER difference between the two will vary based on the type of fund. Expenses for equity funds are higher, as is the difference.
          </motion.p>
          <motion.p variants={fadeUp} className="t-body">
            It must be kept in mind that the intermediaries provide services to investors such as advice and statements, KYC completion from time to time which may be of use to some investors and they may not mind bearing the extra cost.
          </motion.p>
          <motion.p variants={fadeUp} className="t-body">
            <strong>Recommendation:</strong><br />
            If you are invested in regular MFs, make the move to direct MFs today. Your returns will improve as a result.
          </motion.p>
          <motion.p variants={fadeUp} className="t-body">
            <strong>Note:</strong> A move from regular to a direct MF will amount to a sale and purchase transaction and attract applicable capital gains tax and other provisions. Hence, please evaluate the implications prior to initiating the move.
          </motion.p>
          <motion.p variants={fadeUp} className="t-body">
            In addition, some services like advice that you were receiving from the distributor will not be available. You will also need to complete the investment related formalities yourself. The focus of MFs is on generating returns, not so much on customer service. However, they will send you account statements if you are a direct investor.
          </motion.p>
          <motion.p variants={fadeUp} className="t-body">
            <strong>How will you know whether your MF is direct or regular?</strong>
          </motion.p>
          <motion.p variants={fadeUp} className="t-body">
            Direct funds say so in the name. In your statement, the word ‘Direct’ should be a part of the name of the MF scheme. if they don’t say anything, they are regular which sounds good but really means High Fee Class.
          </motion.p>
          <motion.p variants={fadeUp} className="t-body">
            Another way to check is the ‘Advisor’ field on the statement. Direct MFs will display ARN followed by a number.
          </motion.p>
          <motion.p variants={fadeUp} className="t-body">
            <strong>How do I invest directly?</strong>
          </motion.p>
          <motion.p variants={fadeUp} className="t-body">
            You need to invest through the website of the MF or through branch offices if they have them. Going through a bank or another distributor will get you a regular MF.
          </motion.p>
          <motion.p variants={fadeUp} className="t-body">
            Website of the some of the largest public sector Mutual Funds:<br />
            <a href="https://www.sbimf.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)', textDecoration: 'none' }}>https://www.sbimf.com/</a><br />
            <a href="https://www.utimf.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)', textDecoration: 'none' }}>https://www.utimf.com/</a><br />
            <a href="https://www.licmf.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)', textDecoration: 'none' }}>https://www.licmf.com/</a>
          </motion.p>
          <motion.p variants={fadeUp} className="t-body">
            <strong>What is the difference in earning between a regular and a direct MF?</strong>
          </motion.p>
          <motion.p variants={fadeUp} className="t-body">
            The difference is exactly equal to the extra fees charged. The difference is smallest for index funds and liquid funds and highest for hybrid funds and equity funds.
          </motion.p>
        </motion.div>
        
    </PostLayout>
  )
}
