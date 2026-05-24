import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--void)', borderTop: '1px solid var(--hairline)', padding: '64px 0 40px' }}>
      <div className="wrap">
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ marginBottom: 16 }}>
              <span style={{ fontWeight: 800, fontSize: 16, color: 'var(--pure)', letterSpacing: '-.02em' }}>DHAN</span>
              <span style={{ fontWeight: 300, fontSize: 16, color: 'var(--gold)', letterSpacing: '-.02em', marginLeft: 4 }}>OPINION</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--ash)', lineHeight: 1.6, maxWidth: 280 }}>Simplifying investing for individuals through research-backed guidance.</p>
          </div>
          <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
            <div>
              <p className="t-overline" style={{ marginBottom: 16, fontSize: 10 }}>Navigate</p>
              {[
                { l: 'Easy Wins', t: '/easy-wins' },
                { l: 'Strategy', t: '/simple-investment-strategy' },
                { l: 'Philosophy', t: '/investment-philosophy' },
                { l: 'Case Studies', t: '/case-studies' },
              ].map(i => (
                <Link key={i.t} to={i.t} style={{ display: 'block', fontSize: 13, color: 'var(--smoke)', marginBottom: 10, textDecoration: 'none' }}>{i.l}</Link>
              ))}
            </div>
            <div>
              <p className="t-overline" style={{ marginBottom: 16, fontSize: 10 }}>More</p>
              <Link to="/information-centre" style={{ display: 'block', fontSize: 13, color: 'var(--smoke)', marginBottom: 10, textDecoration: 'none' }}>Learn</Link>
              <Link to="/about-us" style={{ display: 'block', fontSize: 13, color: 'var(--smoke)', marginBottom: 10, textDecoration: 'none' }}>About</Link>
              <Link to="/disclaimer" style={{ display: 'block', fontSize: 13, color: 'var(--smoke)', marginBottom: 10, textDecoration: 'none' }}>Disclaimer</Link>
              <a href="mailto:response@dhanopinion.com" style={{ display: 'block', fontSize: 13, color: 'var(--gold)', marginBottom: 10, textDecoration: 'none' }}>Contact</a>
            </div>
          </div>
        </div>
        <div className="hairline" style={{ marginBottom: 24 }} />
        <p style={{ fontSize: 11, color: 'var(--steel)', letterSpacing: '.04em' }}>© 2026 Dhanopinion. All Rights Reserved.</p>
      </div>
    </footer>
  )
}
