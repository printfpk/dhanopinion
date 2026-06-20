import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
}

const team = [
  {
    name: 'Contributor 1',
    role: 'Investment Strategy & Research',
    bio: 'Brings deep expertise in financial markets, asset allocation, and investment philosophy. Focused on translating complex investment concepts into simple, actionable guidance for individual investors.'
  },
  {
    name: 'Contributor 2',
    role: 'Financial Analysis & Education',
    bio: 'Specialises in financial analysis, investor education, and building tools that help people understand their investment choices, costs, and outcomes in a transparent and unbiased way.'
  }
]

export default function AboutUs() {
  const [expanded, setExpanded] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '', isUseful: '', knowFees: '', knowStocksPct: '', willingToPay: '', valuableThings: '', anythingElse: '' })
  const [contactData, setContactData] = useState({ name: '', email: '', message: '' })

  const handleChange = (e) => { const { name, value } = e.target; setFormData(prev => ({ ...prev, [name]: value })) }
  const handleContactChange = (e) => { const { name, value } = e.target; setContactData(prev => ({ ...prev, [name]: value })) }
  const handleSubmit = (e) => { e.preventDefault(); console.log('Feedback:', formData) }
  const handleContactSubmit = (e) => { e.preventDefault(); console.log('Contact:', contactData) }
  const handleFocus = (e) => e.target.style.borderColor = 'var(--gold)'
  const handleBlur = (e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'

  useEffect(() => {
    if (window.location.hash === '#contact') {
      setTimeout(() => {
        const el = document.getElementById('contact')
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 400)
    }
  }, [])

  return (
    <>
      {/* ── Hero ── */}
      <section style={{ background: 'var(--black)', padding: '80px 0 60px', borderBottom: '1px solid var(--hairline)' }}>
        <div className="wrap">
          <RevealChar as="h1" text="About Us" className="t-mega mb-6" />
        </div>
      </section>

      {/* ── Intro paragraph with Read More ── */}
      <section className="sec" style={{ background: 'var(--void)', borderBottom: '1px solid var(--hairline)' }}>
        <div className="wrap" style={{ maxWidth: 860 }}>
          <motion.div {...f(0.1)}>
            <p className="t-body mb-5">
              Personal Financial Advice is a huge area of activity. It can have a significant impact on household wealth and wellbeing. It is our experience and observation that things are often not working very well.
            </p>

            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <p className="t-body mb-5">
                    People find it difficult to understand and make investment decisions. They end up with too little or too much risk relative to what they would have chosen if they had the expertise to make the best decisions for themselves. They often incur a lot of costs and fees in the process, do not know what they paying and what results they are getting for the payments.
                  </p>
                  <p className="t-body mb-5">
                    Unfortunately there is often a conflict of interest between the product providers and advisors and the clients – because the products that generate the highest profits for the providers are not the best for the clients and the best solutions generate very low profits to the providers.
                  </p>
                  <p className="t-body mb-5">
                    DhanOpinion is an experiment to see if we can contribute to making the investment process and outcomes better for people. The objective is to provide simple effective guidance at low cost. We think we can leverage our education, training and experience to provide something of value to a large number of people in an efficient way.
                  </p>
                  <p className="t-body mb-5">
                    If you find DhanOpinion useful, please let us know. If there is something you would like us to analyze, that would be useful to you and many others, let us know and we will consider doing the analysis.
                  </p>
                  <p className="t-body mb-5">
                    We think that we should be able to use technology and our domain expertise to improve the product over time. If you have any specific suggestions or expertise that you would like to contribute to the effort please let us know. It will help us greatly if you can fill in the brief questionnaire below:
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => setExpanded(v => !v)}
              style={{
                background: 'none',
                border: '1px solid var(--hairline)',
                color: 'var(--gold)',
                padding: '10px 24px',
                fontSize: '14px',
                fontWeight: 600,
                letterSpacing: '0.05em',
                cursor: 'pointer',
                borderRadius: '4px',
                transition: 'all 0.3s',
                marginTop: 8
              }}
              onMouseOver={e => { e.target.style.background = 'var(--gold)'; e.target.style.color = 'var(--black)' }}
              onMouseOut={e => { e.target.style.background = 'none'; e.target.style.color = 'var(--gold)' }}
            >
              {expanded ? 'Read Less ↑' : 'Read More ↓'}
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── Team Section ── */}
      <section className="sec" style={{ background: 'var(--black)', borderBottom: '1px solid var(--hairline)' }}>
        <div className="wrap">
          <motion.div {...f(0.05)} className="tc mb-8">
            <RevealChar as="h2" text="The Team" className="t-h1 mb-3" />
            <p className="t-body" style={{ color: 'var(--smoke)', maxWidth: 500, margin: '0 auto' }}>
              The people behind DhanOpinion.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32, maxWidth: 900, margin: '0 auto' }}>
            {team.map((m, i) => (
              <motion.div
                key={i}
                {...f(0.1 + i * 0.15)}
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid var(--hairline)',
                  borderRadius: 12,
                  padding: '36px 32px',
                  textAlign: 'center'
                }}
              >
                {/* Avatar placeholder */}
                <div style={{
                  width: 72,
                  height: 72,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--gold) 0%, rgba(234,218,134,0.3) 100%)',
                  margin: '0 auto 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 26,
                  fontWeight: 300,
                  color: 'var(--black)',
                  fontFamily: 'var(--font-heading)'
                }}>
                  {m.name[0]}
                </div>
                <h3 className="t-h3 mb-1" style={{ color: 'var(--pure)' }}>{m.name}</h3>
                <p style={{ fontSize: 12, color: 'var(--gold)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>{m.role}</p>
                <p className="t-body" style={{ color: 'var(--smoke)', fontSize: 15, lineHeight: 1.7 }}>{m.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Forms Section: Contact & Feedback ── */}
      <section id="contact" style={{ background: 'var(--void)', padding: '60px 0', borderBottom: '1px solid var(--hairline)' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '64px' }}>

            {/* Contact Us */}
            <motion.div {...f()}>
              <div style={{ marginBottom: '32px' }}>
                <RevealChar as="h2" text="Contact Us" className="t-h2 mb-4" delay={0.1} />
                <p className="t-body" style={{ color: 'var(--smoke)' }}>
                  Have a question? Send us a message or email us at{' '}
                  <a href="mailto:response@dhanopinion.com" style={{ color: 'var(--gold)', textDecoration: 'none' }}>response@dhanopinion.com</a>.
                </p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '24px', padding: '40px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {[['contactName','Name','text','name'],['contactEmail','Email','email','email']].map(([id,label,type,name]) => (
                    <div key={id} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label htmlFor={id} style={{ color: 'var(--pure)', fontSize: '14px', fontWeight: 500 }}>{label}</label>
                      <input type={type} id={id} name={name} value={contactData[name]} onChange={handleContactChange} style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                    </div>
                  ))}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label htmlFor="message" style={{ color: 'var(--pure)', fontSize: '14px', fontWeight: 500 }}>Message</label>
                    <textarea id="message" name="message" value={contactData.message} onChange={handleContactChange} rows="5" style={{ ...inputStyle, resize: 'vertical' }} onFocus={handleFocus} onBlur={handleBlur} />
                  </div>
                  <button type="submit" className="btn" style={{ width: '100%', padding: '16px', background: 'var(--gold)', color: 'var(--black)', fontWeight: 600, border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                    Send Message
                  </button>
                </form>
              </div>
              {/* Email display like reference website */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 20 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                <a href="mailto:response@dhanopinion.com" style={{ color: 'var(--smoke)', fontSize: 15, textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseOver={e => e.target.style.color = 'var(--gold)'}
                  onMouseOut={e => e.target.style.color = 'var(--smoke)'}
                >
                  response@dhanopinion.com
                </a>
              </div>
            </motion.div>

            {/* Feedback Form */}
            <motion.div {...f(0.2)}>
              <div style={{ marginBottom: '32px' }}>
                <RevealChar as="h2" text="Leave Feedback" className="t-h2 mb-4" delay={0.2} />
                <p className="t-body" style={{ color: 'var(--smoke)' }}>
                  If you have specific suggestions or expertise you would like to contribute, please let us know.
                </p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '24px', padding: '40px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    {[['name','Name','text'],['mobile','Mobile','tel']].map(([name,label,type]) => (
                      <div key={name} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label htmlFor={name} style={{ color: 'var(--pure)', fontSize: '14px', fontWeight: 500 }}>{label}</label>
                        <input type={type} id={name} name={name} value={formData[name]} onChange={handleChange} style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label htmlFor="email" style={{ color: 'var(--pure)', fontSize: '14px', fontWeight: 500 }}>Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                  </div>
                  {[
                    { name: 'isUseful', label: 'Is DhanOpinion useful?' },
                    { name: 'knowFees', label: 'Do you know how much you are paying for your investments?' },
                    { name: 'knowStocksPct', label: 'Do you know what percentage of your investments are in stocks?' },
                    { name: 'willingToPay', label: 'Would you be willing to pay anything to cover costs?' }
                  ].map((q) => (
                    <div key={q.name} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <label style={{ color: 'var(--pure)', fontSize: '14px', fontWeight: 500 }}>{q.label}</label>
                      <div style={{ display: 'flex', gap: '24px' }}>
                        {['Yes','No'].map(v => (
                          <label key={v} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--smoke)', cursor: 'pointer', fontSize: '15px' }}>
                            <input type="radio" name={q.name} value={v} checked={formData[q.name] === v} onChange={handleChange} style={{ accentColor: 'var(--gold)', width: '16px', height: '16px' }} />
                            {v}
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                  {[['valuableThings','What else would be valuable to you?'],['anythingElse','Anything else you would like to share?']].map(([name,label]) => (
                    <div key={name} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label htmlFor={name} style={{ color: 'var(--pure)', fontSize: '14px', fontWeight: 500 }}>{label}</label>
                      <textarea id={name} name={name} value={formData[name]} onChange={handleChange} rows="2" style={{ ...inputStyle, resize: 'vertical' }} onFocus={handleFocus} onBlur={handleBlur} />
                    </div>
                  ))}
                  <button
                    type="submit"
                    className="btn"
                    style={{ width: '100%', padding: '16px', background: 'rgba(255,255,255,0.05)', color: 'var(--pure)', border: '1px solid rgba(255,255,255,0.1)', fontWeight: 600, borderRadius: '8px', cursor: 'pointer', transition: 'all 0.3s' }}
                    onMouseOver={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = 'var(--black)'; e.currentTarget.style.borderColor = 'var(--gold)' }}
                    onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'var(--pure)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
                  >
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
