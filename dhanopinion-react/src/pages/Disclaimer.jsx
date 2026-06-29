import { motion } from 'framer-motion'
import { RevealChar } from '../components/Animations'

const f = (d = 0) => ({ initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 }, transition: { duration: 0.7, delay: d, ease: [0.16, 1, 0.3, 1] } })

export default function Disclaimer() {
  return (
    <>
      <section style={{ minHeight: '40vh', display: 'flex', alignItems: 'center', background: 'var(--black)', borderBottom: '1px solid var(--hairline)' }}>
        <div className="wrap">

          <RevealChar as="h1" text="Terms and Conditions and Disclaimer" className="t-mega" />
        </div>
      </section>
      <section className="sec" style={{ background: 'var(--void)' }}>
        <div className="wrap-narrow">
          <motion.div {...f()}>
            <div style={{ padding: '32px 0' }}>
              <p className="t-body mb-4">
                The use of the Dhanopinion.com website is subject to the terms and conditions set out below.
              </p>
              <p className="t-body mb-4">
                The owner of the website reserves the right to update these terms at any point in time at its sole discretion, without the need to notify anyone in advance.
              </p>
              <p className="t-body mb-4">
                You may not use the site and any information on the site for any business purpose or for any publication or for competing in any manner with the site itself, or for any unlawful purpose.
              </p>
              <p className="t-body mb-4">
                The information provided does not constitute investment advice. It is provided for general information only and is not tailored for individual use and situation.
              </p>
              <p className="t-body mb-4">
                No part of the information should be construed as providing an investment recommendation.
              </p>
              <p className="t-body mb-4">
                Under no circumstances will Dhanopinion or its owners be liable for any losses, loss of profits, loss of goodwill, loss of opportunity, loss of time, exemplary or special damage, or any indirect loss as a result of usage of the website.
              </p>
              <p className="t-body mb-4">
                While care is taken to ensure that the information presented is accurate, the same cannot be guaranteed. Hence, it is recommended that you take adequate steps to establish the veracity of information before taking a decision.
              </p>
              <p className="t-body mb-4">
                Past performance is not a guarantee for future results. Investments in the financial and securities market are subject to market risks. Satisfy yourself fully before investing.
              </p>
              <p className="t-body mb-4">
                Dhanopinion does not control the network or the service delivering the website to you over the internet. Hence, Dhanopinion does not bear any liability for any infringement or alteration during the transmission.
              </p>
              <p className="t-body">
                This presents opinions and a point of view that can be used to compare with alternative strategies. Dhanopinion is not a registered financial advisor and therefore you should not treat anything provided as financial advice that is regulated by any government regulatory authority. Consider this to be the type of financial guidance that would be provided by a self-help book on personal finances that is not covered by any regulatory authority.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
