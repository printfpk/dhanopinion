import { motion } from 'framer-motion'
import { RevealChar } from '../../components/Animations'
import PostLayout from '../../components/PostLayout'

export default function CaseStudy3() {
  return (
    <PostLayout title="Case 3 — Jyoti Sharma, Pensioner">
      <p className="t-body mb-5" style={{ marginTop: 24 }}>Jyoti Sharma is 92 years old. She is widowed. She has a pension of ₹75,000 per year adjusted for inflation. She owns a house which she used to live in and is now rented, generating a rent of ₹30,000 per month (₹3,60,000 per year).</p>
      <p className="t-body mb-7">Current portfolio: Her total annual income is ₹4,35,000, which comfortably covers her living expenses. She has accumulated savings sitting in standard bank savings accounts. Goals: Absolute capital preservation, high liquidity for potential medical emergencies, and ensuring a smooth transfer of wealth to her heirs. Risk tolerance: extremely low.</p>

      <div style={{ borderTop: '1px solid var(--hairline)', padding: '32px 0' }}>
        <h3 className="t-h2 mb-5">Easy Wins Identified</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 24 }}>
          {[
            { n: '01', t: 'Optimize Idle Cash', d: 'Move excess funds from 3% savings accounts into high-quality liquid mutual funds or Senior Citizen Savings Schemes (SCSS) yielding 7-8%, without locking the money away completely.' },
            { n: '02', t: 'Simplify Administration', d: 'Ensure all bank accounts, mutual funds, and property deeds have updated nominations to prevent legal hurdles for her heirs later.' },
          ].map((w, i) => (
            <div key={i} style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--gold)', fontWeight: 600, minWidth: 24, paddingTop: 3 }}>{w.n}</span>
              <div>
                <h4 className="t-h3 mb-2" style={{ color: 'var(--pure)' }}>{w.t}</h4>
                <p className="t-caption" style={{ lineHeight: 1.6 }}>{w.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--hairline)', padding: '32px 0' }}>
        <h3 className="t-h2 mb-5">Asset Allocation</h3>
        <p className="t-body mb-5" style={{ marginTop: 24 }}>Current equity allocation is 0%. Recommended: <strong style={{ color: 'var(--gold)' }}>10-15% equity (optional)</strong> or remain at 0%. At 92, wealth preservation is paramount. The primary risk is a sudden, large medical expense. Her inflation-adjusted pension and rental income mean she doesn't strictly need equity to combat inflation for daily living.</p>
      </div>

      <div style={{ borderTop: '1px solid var(--hairline)', padding: '32px 0' }}>
        <h3 className="t-h2 mb-5">Investment Recommendations</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 24 }}>
          {[
            'Maintain a large emergency buffer (at least ₹10-15 lakhs) in highly accessible sweep-in fixed deposits or liquid funds for medical needs.',
            'Maximize the Senior Citizen Savings Scheme (SCSS) limit for stable, high-yielding quarterly income.',
            'Consolidate banking relationships to a single reliable bank to make management easier for her.',
            'Draft or update a formal Will and verify all financial nominations.'
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--gold)', fontSize: 14, fontWeight: 700, minWidth: 16 }}>→</span>
              <p className="t-body" style={{ color: 'var(--mist)' }}>{r}</p>
            </div>
          ))}
        </div>
      </div>
    </PostLayout>
  )
}
