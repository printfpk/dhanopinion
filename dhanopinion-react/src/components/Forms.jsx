import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RevealChar } from './Animations'

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

const luxuryEase = [0.25, 0.1, 0.25, 1];
const luxuryInputAnim = {
  whileFocus: { 
    borderColor: 'var(--gold)', 
    backgroundColor: 'rgba(255,255,255,0.08)'
  },
  transition: { duration: 0.3, ease: luxuryEase }
};
const luxuryBtnAnim = {
  whileHover: { opacity: 0.85 },
  whileTap: { scale: 0.99, opacity: 0.7 },
  transition: { duration: 0.2, ease: luxuryEase }
};
const luxuryToastAnim = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.4, ease: luxuryEase }
};

const handleFocus = (e) => e.target.style.borderColor = 'var(--gold)'
const handleBlur = (e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyZ351yBlkLrh4BC5tiWyGl6VRU8xWADN1Ih_4JweX2-XmVW2dLYpK-7h__t2YlcdXj7A/exec"

export function ContactForm() {
  const [contactData, setContactData] = useState({ name: '', email: '', phone: '', message: '' })
  const [contactStatus, setContactStatus] = useState('idle')
  const handleContactChange = (e) => { const { name, value } = e.target; setContactData(prev => ({ ...prev, [name]: value })) }

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactStatus('submitting');
    try {
      await fetch(SCRIPT_URL, { method: 'POST', mode: 'no-cors', body: JSON.stringify({ formType: 'contact', ...contactData }) });
      setContactStatus('success');
      setContactData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setContactStatus('idle'), 5000);
    } catch (error) {
      console.error("Error!", error);
      setContactStatus('error');
      setTimeout(() => setContactStatus('idle'), 5000);
    }
  }

  return (
    <motion.div {...f()} style={{ margin: '40px 0' }}>
      <div style={{ marginBottom: '32px' }}>
        <RevealChar as="h2" text="Contact Us" className="t-mega mb-6" delay={0.1} />
        <p className="t-body">
          Have a question? Send us a message or email us at{' '}
          <a href="mailto:response@dhanopinion.com" style={{ color: 'var(--gold)', textDecoration: 'none' }}>response@dhanopinion.com</a>.
        </p>
      </div>
      <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '24px', padding: '40px', border: '1px solid rgba(255,255,255,0.05)' }}>
        <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {[['contactName','Name','text','name'],['contactEmail','Email','email','email'],['contactPhone','Phone Number','tel','phone']].map(([id,label,type,name]) => (
            <div key={id} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label htmlFor={id} style={{ color: 'var(--pure)', fontSize: '14px', fontWeight: 500 }}>{label}</label>
              <motion.input {...luxuryInputAnim} type={type} id={id} name={name} value={contactData[name]} onChange={handleContactChange} style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} required {...(type === 'tel' ? { pattern: "[0-9]{10}", minLength: 10, maxLength: 10, title: "Please enter exactly 10 digits" } : {})} />
            </div>
          ))}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label htmlFor="message" style={{ color: 'var(--pure)', fontSize: '14px', fontWeight: 500 }}>Message</label>
            <motion.textarea {...luxuryInputAnim} id="message" name="message" value={contactData.message} onChange={handleContactChange} rows="5" style={{ ...inputStyle, resize: 'vertical' }} onFocus={handleFocus} onBlur={handleBlur} required />
          </div>
          <motion.button {...luxuryBtnAnim} type="submit" className="btn" style={{ width: '100%', padding: '16px', background: 'var(--pure)', color: 'var(--void)', fontWeight: 600, border: 'none', borderRadius: '9999px', cursor: 'pointer', transition: 'background 0.3s' }}>
            {contactStatus === 'submitting' ? 'Sending...' : 'Send Message'}
          </motion.button>
          <AnimatePresence>
            {contactStatus === 'success' && (
              <motion.div {...luxuryToastAnim} style={{ padding: '16px', background: 'rgba(76, 175, 80, 0.05)', border: '1px solid rgba(76, 175, 80, 0.2)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderRadius: '8px', color: '#4caf50', textAlign: 'center', fontWeight: 500, letterSpacing: '0.02em', marginTop: '16px' }}>
                Message sent successfully!
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 20 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2"/>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
        </svg>
        <a href="mailto:response@dhanopinion.com" style={{ fontSize: 15, textDecoration: 'none', transition: 'color 0.2s' }}
          onMouseOver={e => e.target.style.color = 'var(--gold)'}
          onMouseOut={e => e.target.style.color = 'var(--smoke)'}
        >
          response@dhanopinion.com
        </a>
      </div>
    </motion.div>
  )
}

export function FeedbackForm() {
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '', isUseful: '', knowFees: '', knowStocksPct: '', willingToPay: '', valuableThings: '', anythingElse: '' })
  const [feedbackStatus, setFeedbackStatus] = useState('idle')
  const handleChange = (e) => { const { name, value } = e.target; setFormData(prev => ({ ...prev, [name]: value })) }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedbackStatus('submitting');
    try {
      await fetch(SCRIPT_URL, { method: 'POST', mode: 'no-cors', body: JSON.stringify({ formType: 'feedback', ...formData }) });
      setFeedbackStatus('success');
      setFormData({ name: '', email: '', mobile: '', isUseful: '', knowFees: '', knowStocksPct: '', willingToPay: '', valuableThings: '', anythingElse: '' });
      setTimeout(() => setFeedbackStatus('idle'), 5000);
    } catch (error) {
      console.error("Error!", error);
      setFeedbackStatus('error');
      setTimeout(() => setFeedbackStatus('idle'), 5000);
    }
  }

  return (
    <motion.div {...f(0.2)} style={{ margin: '40px 0' }}>
      <div style={{ marginBottom: '32px' }}>
        <RevealChar as="h2" text="Leave Feedback" className="t-mega mb-6" delay={0.2} />
        <p className="t-body">
          If you have specific suggestions or expertise you would like to contribute, please let us know.
        </p>
      </div>
      <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '24px', padding: '40px', border: '1px solid rgba(255,255,255,0.05)' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {[['name','Name','text'],['mobile','Mobile','tel']].map(([name,label,type]) => (
              <div key={name} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label htmlFor={name} style={{ color: 'var(--pure)', fontSize: '14px', fontWeight: 500 }}>{label}</label>
                <motion.input {...luxuryInputAnim} type={type} id={name} name={name} value={formData[name]} onChange={handleChange} style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} required {...(type === 'tel' ? { pattern: "[0-9]{10}", minLength: 10, maxLength: 10, title: "Please enter exactly 10 digits" } : {})} />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label htmlFor="email" style={{ color: 'var(--pure)', fontSize: '14px', fontWeight: 500 }}>Email</label>
            <motion.input {...luxuryInputAnim} type="email" id="email" name="email" value={formData.email} onChange={handleChange} style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} required />
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
                  <label key={v} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '15px' }}>
                    <input type="radio" name={q.name} value={v} checked={formData[q.name] === v} onChange={handleChange} style={{ accentColor: 'var(--gold)', width: '16px', height: '16px' }} required />
                    {v}
                  </label>
                ))}
              </div>
            </div>
          ))}
          {[['valuableThings','What else would be valuable to you?'],['anythingElse','Anything else you would like to share?']].map(([name,label]) => (
            <div key={name} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label htmlFor={name} style={{ color: 'var(--pure)', fontSize: '14px', fontWeight: 500 }}>{label}</label>
              <motion.textarea {...luxuryInputAnim} id={name} name={name} value={formData[name]} onChange={handleChange} rows="2" style={{ ...inputStyle, resize: 'vertical' }} onFocus={handleFocus} onBlur={handleBlur} required />
            </div>
          ))}
          <motion.button {...luxuryBtnAnim}
            type="submit"
            className="btn"
            style={{ width: '100%', padding: '16px', background: 'var(--pure)', color: 'var(--void)', fontWeight: 600, border: 'none', borderRadius: '9999px', cursor: 'pointer', transition: 'background 0.3s' }}
          >
            {feedbackStatus === 'submitting' ? 'Submitting...' : 'Submit Feedback'}
          </motion.button>
          <AnimatePresence>
            {feedbackStatus === 'success' && (
              <motion.div {...luxuryToastAnim} style={{ padding: '16px', background: 'rgba(76, 175, 80, 0.05)', border: '1px solid rgba(76, 175, 80, 0.2)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderRadius: '8px', color: '#4caf50', textAlign: 'center', fontWeight: 500, letterSpacing: '0.02em', marginTop: '16px' }}>
                Feedback submitted successfully!
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </motion.div>
  )
}
