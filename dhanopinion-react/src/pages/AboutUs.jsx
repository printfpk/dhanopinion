import { useState } from 'react'
import { motion } from 'framer-motion'
import { HoverFlip, RevealChar } from '../components/Animations'

const f = (d = 0) => ({ 
  initial: { opacity: 0, y: 40 }, 
  whileInView: { opacity: 1, y: 0 }, 
  viewport: { once: true, amount: 0.2 }, 
  transition: { duration: 0.8, delay: d, ease: [0.16, 1, 0.3, 1] } 
})

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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    // Handle submission logic here
  }

  return (
    <>
      <section style={{ minHeight: '65vh', display: 'flex', alignItems: 'center', background: 'var(--black)', position: 'relative', overflow: 'hidden' }}>
        {/* Subtle background glow effect */}
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

      <section className="sec" style={{ background: 'var(--void)', padding: '100px 0' }}>
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

            {/* Right Column: The Solution (DhanOpinion) */}
            <motion.div {...f(0.3)}>
              <div style={{ display: 'inline-flex', padding: '12px 24px', background: 'rgba(234, 218, 134, 0.05)', borderRadius: '100px', border: '1px solid rgba(234, 218, 134, 0.15)', marginBottom: '32px' }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Our Solution</span>
              </div>
              <h2 className="t-h2 mb-6" style={{ fontSize: '32px', lineHeight: 1.3 }}>Simple, effective guidance at low cost.</h2>
              <p className="t-body mb-6" style={{ color: 'var(--smoke)', fontSize: '18px', lineHeight: 1.7 }}>
                DhanOpinion is an experiment to see if we can contribute to making the investment process and outcomes better for people. We think we can leverage our education, training and experience to provide something of value to a large number of people in an efficient way.
              </p>
              
              <div style={{ marginTop: '48px', padding: '40px', background: 'var(--black)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', position: 'relative', overflow: 'hidden' }}>
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

      {/* Feedback Form Section */}
      <section style={{ background: 'var(--black)', padding: '100px 0', borderTop: '1px solid var(--hairline)', borderBottom: '1px solid var(--hairline)' }}>
        <div className="wrap-narrow">
          <motion.div {...f()}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <RevealChar as="h2" text="Your Feedback is Important" className="t-h2 mb-6" style={{ color: 'var(--gold)' }} delay={0.1} />
              <p className="t-body mx-auto" style={{ color: 'var(--smoke)', fontSize: '18px', lineHeight: 1.7, maxWidth: '700px' }}>
                If you have any specific suggestions or expertise that you would like to contribute to the effort please let us know. It will help us greatly if you can fill in the brief questionnaire below.
              </p>
            </div>
            
            <div style={{ background: '#ffffff', borderRadius: '24px', padding: '50px', boxShadow: '0 25px 50px rgba(0,0,0,0.5)', maxWidth: '800px', margin: '0 auto' }}>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                
                {/* Text Inputs */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label htmlFor="name" style={{ color: '#1a1a24', fontSize: '15px', fontWeight: 500 }}>Name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} style={{ background: '#f5f5f7', border: '1px solid transparent', borderRadius: '12px', padding: '16px', fontSize: '16px', color: '#1a1a24', outline: 'none', transition: 'border 0.3s' }} onFocus={(e) => e.target.style.border = '1px solid #1a1a24'} onBlur={(e) => e.target.style.border = '1px solid transparent'} />
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label htmlFor="email" style={{ color: '#1a1a24', fontSize: '15px', fontWeight: 500 }}>Email</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} style={{ background: '#f5f5f7', border: '1px solid transparent', borderRadius: '12px', padding: '16px', fontSize: '16px', color: '#1a1a24', outline: 'none', transition: 'border 0.3s' }} onFocus={(e) => e.target.style.border = '1px solid #1a1a24'} onBlur={(e) => e.target.style.border = '1px solid transparent'} />
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label htmlFor="mobile" style={{ color: '#1a1a24', fontSize: '15px', fontWeight: 500 }}>Mobile</label>
                  <input type="tel" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} style={{ background: '#f5f5f7', border: '1px solid transparent', borderRadius: '12px', padding: '16px', fontSize: '16px', color: '#1a1a24', outline: 'none', transition: 'border 0.3s' }} onFocus={(e) => e.target.style.border = '1px solid #1a1a24'} onBlur={(e) => e.target.style.border = '1px solid transparent'} />
                </div>

                {/* Radio Questions */}
                {[
                  { name: 'isUseful', label: 'Is DhanOpinion useful?' },
                  { name: 'knowFees', label: 'Do you know how much you are paying for your investments even though there may be no fees charged?' },
                  { name: 'knowStocksPct', label: 'Do you know what percentage of your investments are in stocks?' },
                  { name: 'willingToPay', label: 'Would you be willing to pay anything to cover the costs involved?' }
                ].map((q) => (
                  <div key={q.name} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <label style={{ color: '#1a1a24', fontSize: '15px', fontWeight: 500 }}>{q.label}</label>
                    <div style={{ display: 'flex', gap: '24px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1a1a24', cursor: 'pointer' }}>
                        <input type="radio" name={q.name} value="Yes" checked={formData[q.name] === 'Yes'} onChange={handleChange} style={{ accentColor: '#1a1a24', width: '18px', height: '18px' }} />
                        Yes
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1a1a24', cursor: 'pointer' }}>
                        <input type="radio" name={q.name} value="No" checked={formData[q.name] === 'No'} onChange={handleChange} style={{ accentColor: '#1a1a24', width: '18px', height: '18px' }} />
                        No
                      </label>
                    </div>
                  </div>
                ))}

                {/* Textareas */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label htmlFor="valuableThings" style={{ color: '#1a1a24', fontSize: '15px', fontWeight: 500 }}>What else would be valuable to you?</label>
                  <textarea id="valuableThings" name="valuableThings" value={formData.valuableThings} onChange={handleChange} rows="3" style={{ background: '#f5f5f7', border: '1px solid transparent', borderRadius: '12px', padding: '16px', fontSize: '16px', color: '#1a1a24', outline: 'none', transition: 'border 0.3s', resize: 'vertical' }} onFocus={(e) => e.target.style.border = '1px solid #1a1a24'} onBlur={(e) => e.target.style.border = '1px solid transparent'}></textarea>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label htmlFor="anythingElse" style={{ color: '#1a1a24', fontSize: '15px', fontWeight: 500 }}>Anything else you would like to share with us?</label>
                  <textarea id="anythingElse" name="anythingElse" value={formData.anythingElse} onChange={handleChange} rows="3" style={{ background: '#f5f5f7', border: '1px solid transparent', borderRadius: '12px', padding: '16px', fontSize: '16px', color: '#1a1a24', outline: 'none', transition: 'border 0.3s', resize: 'vertical' }} onFocus={(e) => e.target.style.border = '1px solid #1a1a24'} onBlur={(e) => e.target.style.border = '1px solid transparent'}></textarea>
                </div>

                <button type="submit" style={{ background: '#19152b', color: '#fff', border: 'none', padding: '18px', borderRadius: '12px', fontSize: '16px', fontWeight: 600, cursor: 'pointer', transition: 'background 0.3s', marginTop: '16px' }} onMouseOver={(e) => e.target.style.background = '#282343'} onMouseOut={(e) => e.target.style.background = '#19152b'}>
                  Send
                </button>
              </form>
            </div>
            
          </motion.div>
        </div>
      </section>
    </>
  )
}
