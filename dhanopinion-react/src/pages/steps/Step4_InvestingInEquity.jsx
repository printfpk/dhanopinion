import PostLayout from '../../components/PostLayout'
import { Link } from 'react-router-dom'

export default function Step4_InvestingInEquity() {
  const tdStyle = { padding: '12px 16px', fontSize: 15, borderBottom: '1px solid var(--hairline)', textAlign: 'center' }
  const thStyle = { padding: '12px 16px', color: 'var(--pure)', fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)', textAlign: 'center' }

  const indexFunds = [
    { fund: 'UTI Nifty 50 Index Fund – Direct Growth', corpus: '232,494', ret: '13.12%' },
    { fund: 'HDFC Nifty 50 Index Fund – Direct Growth', corpus: '204,093', ret: '13.04%' },
    { fund: 'ICICI Pru Nifty 50 Index Fund – Direct Growth', corpus: '135,350', ret: '12.96%' },
    { fund: 'SBI Nifty Index Fund – Direct Growth', corpus: '98,387', ret: '12.96%' },
  ]

  return (
    <PostLayout title="Step 4 – Investing in Equity (Stocks / Mutual Funds)">
      <p className="t-body mb-5">
        We recommend exposure to equity through mutual funds, not direct stock picking. This can be done either through equity mutual funds or the NPS (National Pension System) scheme.
      </p>

      <h2 className="t-h2" style={{ marginBottom: '16px', marginTop: '32px' }}>Equity Mutual Funds</h2>
      <p className="t-body mb-4">Keep the following in mind while choosing an equity fund:</p>
      <ul style={{ paddingLeft: '24px', marginBottom: '24px' }}>
        <li className="t-body" style={{ marginBottom: '10px' }}>
          Choose <strong>Direct Plans</strong>, not Regular Plans (to avoid distributor commissions).
        </li>
        <li className="t-body" style={{ marginBottom: '10px' }}>
          Choose <strong>Index Funds (Passive)</strong> over Active Funds.
        </li>
        <li className="t-body">
          Choose <strong>large funds from reputed houses</strong> (e.g., SBI, UTI, LIC, HDFC, ICICI, Axis) to bring down the cost burden per unit.
        </li>
      </ul>

      <p className="t-body mb-4" style={{ fontStyle: 'italic', fontSize: '14px' }}>Example (as of June 2025, Nifty-based index funds):</p>

      <div style={{ overflowX: 'auto', marginBottom: '36px', borderRadius: '12px', border: '1px solid var(--hairline)', background: 'rgba(255,255,255,0.02)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 500 }}>
          <thead>
            <tr>
              <th style={{ ...thStyle, textAlign: 'left' }}>Fund</th>
              <th style={thStyle}>Corpus (INR mn)</th>
              <th style={thStyle}>10-yr Annualized Return</th>
            </tr>
          </thead>
          <tbody>
            {indexFunds.map((r, i) => (
              <tr key={i} style={{ background: 'transparent' }}
                onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                onMouseOut={e => e.currentTarget.style.background = 'transparent'}
              >
                <td style={{ ...tdStyle, textAlign: 'left' }}>{r.fund}</td>
                <td style={tdStyle}>{r.corpus}</td>
                <td style={{ ...tdStyle, color: 'var(--gold)' }}>{r.ret}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="t-h2" style={{ marginBottom: '16px' }}>Investing through NPS (National Pension System)</h2>
      <p className="t-body mb-5">
        NPS has its own system of allocation of investor funds between debt and equity based on age. Hence, within one investment scheme you could potentially meet your allocation goals for exposure to equity as well as debt. In case the NPS allocation is different from your own preferred allocation, you could select the non-NPS investments in a manner that enables you to reach your target allocation. For example:
      </p>

      <ul style={{ listStyle: 'none', padding: 0, marginBottom: '24px' }}>
        <li style={{ marginBottom: '12px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <span style={{ color: 'var(--gold)', fontWeight: 700, minWidth: '8px' }}>•</span>
          <span className="t-body">If NPS allocation to equity is <strong>lower</strong> than your preference, choose equity funds to get a higher exposure than provided by NPS.</span>
        </li>
        <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <span style={{ color: 'var(--gold)', fontWeight: 700, minWidth: '8px' }}>•</span>
          <span className="t-body">If NPS allocation to equity is <strong>higher</strong> than your preference, choose debt schemes outside NPS to get a higher exposure than provided by NPS.</span>
        </li>
      </ul>

      <p className="t-body mb-5">
        At the same time, NPS permits investors to choose a level of equity exposure lower than its recommended exposure for the age, but does not permit a higher exposure. Hence, you could also choose a lower exposure to equity within NPS if you so prefer. Allocate maximum permissible equity exposure under NPS for your age and choose passive funds within NPS to minimize costs.
      </p>

      <p className="t-body">
        Read our knowledge article on the{' '}
        <Link to="/2023/08/20/national-pension-system-nps" style={{ color: 'var(--gold)', textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
          NPS scheme
        </Link>{' '}for more information.
      </p>
    </PostLayout>
  )
}
