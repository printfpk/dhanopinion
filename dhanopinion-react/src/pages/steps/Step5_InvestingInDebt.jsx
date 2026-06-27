import PostLayout from '../../components/PostLayout'

export default function Step5_InvestingInDebt() {
  const tdStyle = { padding: '12px 16px', fontSize: 15, borderBottom: '1px solid var(--hairline)', textAlign: 'center' }
  const thStyle = { padding: '12px 16px', color: 'var(--pure)', fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)', textAlign: 'center' }

  const schemes = [
    { scheme: 'PPF', gross: '~7.1%', tax: 'Fully tax-free', r10: '7.1', r20: '7.1', r30: '7.1', highlight: true },
    { scheme: 'SCSS', gross: '~8.2%', tax: 'Interest taxable', r10: '7.38', r20: '6.56', r30: '5.74', highlight: false },
    { scheme: 'NSC', gross: '~7.7%', tax: 'Interest taxable', r10: '6.93', r20: '6.16', r30: '5.39', highlight: false },
  ]

  return (
    <PostLayout title="Step 5 – Investing in Debt (Fixed Income)">
      <h2 className="t-h2" style={{ marginBottom: '16px' }}>Government-backed schemes</h2>
      <p className="t-body mb-5">
        Prioritize government schemes for fixed income investing. An overview of the popular schemes:
      </p>

      <div style={{ overflowX: 'auto', marginBottom: '36px', borderRadius: '12px', border: '1px solid var(--hairline)', background: 'rgba(255,255,255,0.02)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 560 }}>
          <thead>
            <tr>
              <th style={{ ...thStyle, textAlign: 'left' }}>Scheme</th>
              <th style={thStyle}>Gross Return</th>
              <th style={thStyle}>Tax Treatment (New Regime)</th>
              <th style={thStyle}>Post-Tax Return (10%)</th>
              <th style={thStyle}>Post-Tax Return (20%)</th>
              <th style={thStyle}>Post-Tax Return (30%)</th>
            </tr>
          </thead>
          <tbody>
            {schemes.map((r, i) => (
              <tr key={i}
                style={{ background: r.highlight ? 'rgba(234,218,134,0.04)' : 'transparent' }}
                onMouseOver={e => e.currentTarget.style.background = r.highlight ? 'rgba(234,218,134,0.08)' : 'rgba(255,255,255,0.03)'}
                onMouseOut={e => e.currentTarget.style.background = r.highlight ? 'rgba(234,218,134,0.04)' : 'transparent'}
              >
                <td style={{ ...tdStyle, textAlign: 'left', fontWeight: r.highlight ? 600 : 400, color: r.highlight ? 'var(--gold)' : 'var(--smoke)' }}>{r.scheme}</td>
                <td style={tdStyle}>{r.gross}</td>
                <td style={tdStyle}>{r.tax}</td>
                <td style={tdStyle}>{r.r10}</td>
                <td style={tdStyle}>{r.r20}</td>
                <td style={tdStyle}>{r.r30}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="t-h2" style={{ marginBottom: '16px' }}>NPS (National Pension System)</h2>
      <p className="t-body mb-5">
        NPS can serve the need for both equity as well as fixed income investing since it follows an age-based allocation system. Some thumb rules:
      </p>

      <ul style={{ listStyle: 'none', padding: 0, marginBottom: '24px' }}>
        <li style={{ marginBottom: '12px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <span style={{ color: 'var(--gold)', fontWeight: 700, minWidth: '8px' }}>•</span>
          <span className="t-body">
            NPS permits investors to choose a level of equity exposure lower than its recommended exposure for the age, but does not permit a higher exposure. Hence, you could also choose a lower exposure to equity within NPS to reach your optimum allocation.
          </span>
        </li>
        <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <span style={{ color: 'var(--gold)', fontWeight: 700, minWidth: '8px' }}>•</span>
          <span className="t-body">
            If NPS allocation to <strong>debt</strong> is <strong>higher</strong> than your preference, choose equity funds outside NPS to get a higher exposure than provided by NPS.
          </span>
        </li>
      </ul>
    </PostLayout>
  )
}
