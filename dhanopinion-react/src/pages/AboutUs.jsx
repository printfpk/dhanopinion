import { useState } from 'react'
import { motion } from 'framer-motion'
import { RevealChar } from '../components/Animations'

const f = (d = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, delay: d, ease: [0.16, 1, 0.3, 1] }
})

const inputStyle = {
  background: 'rgba(0,0,0,0.3)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '8px',
  padding: '14px 16px',
  fontSize: '15px',
  color: 'var(--pure)',
  outline: 'none',
  transition: 'border-color 0.3s',
  width: '100%'
};

export default function AboutUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    isUseful: '',
    knowFees: '',
    knowStocksPct: '',
    willingToPay: '',
    valuableThings: '',
    anythingElse: ''
  })

  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleContactChange = (e) => {
    const { name, value } = e.target
    setContactData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Feedback:", formData)
  }

  const handleContactSubmit = (e) => {
    e.preventDefault()
    console.log("Contact:", contactData)
  }

  const handleFocus = (e) => e.target.style.borderColor = 'var(--gold)';
  const handleBlur = (e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)';

  return (
    <>
      <section style={{ minHeight: '65vh', display: 'flex', alignItems: 'center', background: 'var(--black)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-20%', left: '10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(234, 218, 134, 0.05) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(40px)' }} />
        <div style={{ position: 'absolute', bottom: '-10%', right: '5%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(50px)' }} />

        <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: 'easeOut' }}>
            <p className="t-overline mb-5" style={{ color: 'var(--gold)', letterSpacing: '0.2em' }}>OUR STORY</p>
          </motion.div>
          <RevealChar as="h1" text="ABOUT \n US" highlight="US" className="t-mega mb-5" />
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}
            className="t-h4" style={{ color: 'var(--smoke)', maxWidth: '600px', fontWeight: 400, lineHeight: 1.6 }}
          >
            An experiment to see if we can contribute to making the investment process and outcomes better for people.
          </motion.p>
        </div>
      </section>

      {/* The Team Section */}
      <section className="sec" style={{ background: 'var(--void)', padding: '100px 0' }}>
        <div className="wrap">
          <div className="tc mb-8">
            <RevealChar as="h2" text="The Team" className="t-h2 mb-4" />
            <p className="t-body" style={{ color: 'var(--smoke)', maxWidth: '600px', margin: '0 auto' }}>
              The people behind DhanOpinion.
            </p>
            <motion.div initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="hairline-gold" style={{ margin: '32px auto 0' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', maxWidth: '600px', margin: '0 auto' }}>

            {/* The DhanOpinion Team */}
            <motion.div {...f(0.1)} className="card" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
              <h3 className="t-h3 mb-2" style={{ color: 'var(--pure)' }}>The DhanOpinion Team</h3>
              <p className="t-overline mb-4" style={{ color: 'var(--gold)' }}>EXPERTS & EDUCATORS</p>
              <p className="t-body" style={{ color: 'var(--smoke)', fontSize: '16px', lineHeight: 1.7 }}>
                DhanOpinion is an experiment to see if we can contribute to making the investment process and outcomes better for people. We leverage our education, training, and experience to provide simple, effective guidance and unbiased views to a large number of people in an efficient way.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* The Challenge & Solution Section */}
      <section className="sec" style={{ background: 'var(--black)', padding: '100px 0', borderTop: '1px solid var(--hairline)' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '80px', alignItems: 'start' }}>
            {/* Left Column: The Problem */}
            <motion.div {...f(0.1)} style={{ paddingRight: '20px' }}>
              <div style={{ display: 'inline-flex', padding: '12px 24px', background: 'rgba(255,255,255,0.03)', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '32px' }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--smoke)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>The Challenge</span>
              </div>
              <h2 className="t-h2 mb-6" style={{ fontSize: '32px', lineHeight: 1.3 }}>Things are often not working very well.</h2>
              <p className="t-body mb-6" style={{ color: 'var(--smoke)', fontSize: '18px', lineHeight: 1.7 }}>
                Personal Financial Advice is a huge area of activity. It can have a significant impact on household wealth and wellbeing.
              </p>
              <p className="t-body mb-6" style={{ color: 'var(--smoke)', fontSize: '18px', lineHeight: 1.7 }}>
                People find it difficult to understand and make investment decisions. They end up with too little or too much risk relative to what they would have chosen if they had the expertise to make the best decisions for themselves. They often incur a lot of costs and fees in the process, do not know what they paying and what results they are getting for the payments.
              </p>
              <div style={{ padding: '24px', background: 'rgba(255,50,50,0.04)', borderLeft: '4px solid rgba(255,50,50,0.4)', borderRadius: '0 12px 12px 0', marginTop: '32px' }}>
                <p className="t-body" style={{ color: 'var(--pure)', fontSize: '16px', lineHeight: 1.6, margin: 0, fontStyle: 'italic' }}>
                  Unfortunately there is often a conflict of interest between the product providers and advisors and the clients – because the products that generate the highest profits for the providers are not the best for the clients and the best solutions generate very low profits to the providers.
                </p>
              </div>
            </motion.div>

            {/* Right Column: The Solution */}
            <motion.div {...f(0.3)}>
              <div style={{ display: 'inline-flex', padding: '12px 24px', background: 'rgba(234, 218, 134, 0.05)', borderRadius: '100px', border: '1px solid rgba(234, 218, 134, 0.15)', marginBottom: '32px' }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Our Solution</span>
              </div>
              <h2 className="t-h2 mb-6" style={{ fontSize: '32px', lineHeight: 1.3 }}>Simple, effective guidance at low cost.</h2>
              <p className="t-body mb-6" style={{ color: 'var(--smoke)', fontSize: '18px', lineHeight: 1.7 }}>
                DhanOpinion is an experiment to see if we can contribute to making the investment process and outcomes better for people. We think we can leverage our education, training and experience to provide something of value to a large number of people in an efficient way.
              </p>

              <div style={{ marginTop: '48px', padding: '40px', background: 'var(--void)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '2px', background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />
                <h3 className="t-h3 mb-4" style={{ fontSize: '24px', color: 'var(--gold)' }}>Mission Statement</h3>
                <p className="t-body" style={{ color: 'var(--pure)', fontSize: '17px', lineHeight: 1.6, margin: 0 }}>
                  Dhanopinion seeks to make a difference to the individual investor in India by providing an unbiased view on financial investments. Consumers may agree or disagree with the views expressed on this site. They are free to take their own investing decisions.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Forms Section: Contact & Feedback */}
      <section style={{ background: 'var(--void)', padding: '100px 0', borderTop: '1px solid var(--hairline)', borderBottom: '1px solid var(--hairline)' }}>
        <div className="wrap">

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '64px' }}>

            {/* Contact Us Form */}
            <motion.div {...f()}>
              <div style={{ marginBottom: '32px' }}>
                <RevealChar as="h2" text="Contact Us" className="t-h2 mb-4" style={{ color: 'var(--gold)' }} delay={0.1} />
                <p className="t-body" style={{ color: 'var(--smoke)' }}>
                  Have a question or want to reach out directly? Send us a message below or email us at <a href="mailto:response@dhanopinion.com" style={{ color: 'var(--gold)', textDecoration: 'none' }}>response@dhanopinion.com</a>.
                </p>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '24px', padding: '40px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label htmlFor="contactName" style={{ color: 'var(--pure)', fontSize: '14px', fontWeight: 500 }}>Name</label>
                    <input type="text" id="contactName" name="name" value={contactData.name} onChange={handleContactChange} style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label htmlFor="contactEmail" style={{ color: 'var(--pure)', fontSize: '14px', fontWeight: 500 }}>Email</label>
                    <input type="email" id="contactEmail" name="email" value={contactData.email} onChange={handleContactChange} style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label htmlFor="message" style={{ color: 'var(--pure)', fontSize: '14px', fontWeight: 500 }}>Message</label>
                    <textarea id="message" name="message" value={contactData.message} onChange={handleContactChange} rows="5" style={{ ...inputStyle, resize: 'vertical' }} onFocus={handleFocus} onBlur={handleBlur}></textarea>
                  </div>
                  <button type="submit" className="btn" style={{ width: '100%', marginTop: '8px', padding: '16px', background: 'var(--gold)', color: 'var(--black)', fontWeight: 600, border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                    Send Message
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Feedback Form */}
            <motion.div {...f(0.2)}>
              <div style={{ marginBottom: '32px' }}>
                <RevealChar as="h2" text="Leave Feedback" className="t-h2 mb-4" style={{ color: 'var(--gold)' }} delay={0.2} />
                <p className="t-body" style={{ color: 'var(--smoke)' }}>
                  If you have specific suggestions or expertise you would like to contribute, please let us know.
                </p>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '24px', padding: '40px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label htmlFor="name" style={{ color: 'var(--pure)', fontSize: '14px', fontWeight: 500 }}>Name</label>
                      <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label htmlFor="mobile" style={{ color: 'var(--pure)', fontSize: '14px', fontWeight: 500 }}>Mobile</label>
                      <input type="tel" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label htmlFor="email" style={{ color: 'var(--pure)', fontSize: '14px', fontWeight: 500 }}>Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                  </div>

                  {/* Radio Questions */}
                  {[
                    { name: 'isUseful', label: 'Is DhanOpinion useful?' },
                    { name: 'knowFees', label: 'Do you know how much you are paying for your investments?' },
                    { name: 'knowStocksPct', label: 'Do you know what percentage of your investments are in stocks?' },
                    { name: 'willingToPay', label: 'Would you be willing to pay anything to cover costs?' }
                  ].map((q) => (
                    <div key={q.name} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <label style={{ color: 'var(--pure)', fontSize: '14px', fontWeight: 500 }}>{q.label}</label>
                      <div style={{ display: 'flex', gap: '24px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--smoke)', cursor: 'pointer', fontSize: '15px' }}>
                          <input type="radio" name={q.name} value="Yes" checked={formData[q.name] === 'Yes'} onChange={handleChange} style={{ accentColor: 'var(--gold)', width: '16px', height: '16px' }} />
                          Yes
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--smoke)', cursor: 'pointer', fontSize: '15px' }}>
                          <input type="radio" name={q.name} value="No" checked={formData[q.name] === 'No'} onChange={handleChange} style={{ accentColor: 'var(--gold)', width: '16px', height: '16px' }} />
                          No
                        </label>
                      </div>
                    </div>
                  ))}

                  {/* Textareas */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                    <label htmlFor="valuableThings" style={{ color: 'var(--pure)', fontSize: '14px', fontWeight: 500 }}>What else would be valuable to you?</label>
                    <textarea id="valuableThings" name="valuableThings" value={formData.valuableThings} onChange={handleChange} rows="2" style={{ ...inputStyle, resize: 'vertical' }} onFocus={handleFocus} onBlur={handleBlur}></textarea>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label htmlFor="anythingElse" style={{ color: 'var(--pure)', fontSize: '14px', fontWeight: 500 }}>Anything else you would like to share?</label>
                    <textarea id="anythingElse" name="anythingElse" value={formData.anythingElse} onChange={handleChange} rows="2" style={{ ...inputStyle, resize: 'vertical' }} onFocus={handleFocus} onBlur={handleBlur}></textarea>
                  </div>

                  <button type="submit" className="btn" style={{ width: '100%', marginTop: '8px', padding: '16px', background: 'rgba(255,255,255,0.05)', color: 'var(--pure)', border: '1px solid rgba(255,255,255,0.1)', fontWeight: 600, borderRadius: '8px', cursor: 'pointer', transition: 'all 0.3s' }} onMouseOver={(e) => { e.target.style.background = 'var(--gold)'; e.target.style.color = 'var(--black)'; e.target.style.borderColor = 'var(--gold)'; }} onMouseOut={(e) => { e.target.style.background = 'rgba(255,255,255,0.05)'; e.target.style.color = 'var(--pure)'; e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }}>
                    Submit Feedback
                  </button>
                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  )
}
