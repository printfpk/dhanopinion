import { motion } from 'framer-motion'
import { RevealChar } from '../../components/Animations'
import PostLayout from '../../components/PostLayout'

export default function CaseStudy2() {
  return (
    <PostLayout title="Case 2 — Sunil, Chief Marketing Officer">
      <p className="t-body mb-5" style={{ marginTop: 24 }}>Sunil, an MNC senior manager, has just got promoted to Chief Marketing Officer. He is 47, and his wife Anita, 45, is a homemaker. They have two school-going children, a son (14) and a daughter (12).</p>
      <p className="t-body mb-7">Current portfolio: Sunil earns a high salary and has accumulated significant savings, largely parked in traditional fixed deposits, real estate, and a few disjointed mutual funds. Goals: Fund his children's higher education in the next 4-6 years, their eventual marriages, and build a robust retirement corpus for himself and Anita. Risk tolerance: moderately high, given his high stable income.</p>

      <div style={{ borderTop: '1px solid var(--hairline)', padding: '32px 0' }}>
        <h3 className="t-h2 mb-5">Easy Wins Identified</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 24 }}>
          {[
            { n: '01', t: 'Consolidate Fragmented Funds', d: 'Sunil has over 15 different mutual funds. Consolidating these into 3-4 broad index funds and flexi-cap funds will drastically reduce tracking hassle and lower average expense ratios.' },
            { n: '02', t: 'Tax Optimization', d: 'Shift surplus funds from highly-taxed fixed deposits into debt mutual funds for better indexation benefits over the long term, significantly improving post-tax yields.' },
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
        <p className="t-body mb-5" style={{ marginTop: 24 }}>Current equity allocation is around 30%, heavily skewed towards physical real estate. Recommended: <strong style={{ color: 'var(--gold)' }}>60% equity</strong>. At 47, Sunil is entering his peak earning years. While children's education requires some liquidity soon, his retirement is still 13+ years away, requiring strong equity growth to combat lifestyle inflation.</p>
      </div>

      <div style={{ borderTop: '1px solid var(--hairline)', padding: '32px 0' }}>
        <h3 className="t-h2 mb-5">Investment Recommendations</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 24 }}>
          {[
            'Earmark highly liquid debt funds specifically for the son\'s upcoming college expenses (4 years away).',
            'Route new monthly savings aggressively into Nifty 50 and Nifty Next 50 direct index funds.',
            'Maximize Tier 1 NPS contributions for additional tax benefits and locked-in retirement growth.',
            'Ensure adequate term life insurance is in place to protect the family\'s lifestyle in case of unforeseen events.'
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
