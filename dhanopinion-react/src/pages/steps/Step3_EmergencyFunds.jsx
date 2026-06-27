import PostLayout from '../../components/PostLayout'
import { Link } from 'react-router-dom'

export default function Step3_EmergencyFunds() {
  const tdStyle = { padding: '12px 16px', fontSize: 15, borderBottom: '1px solid var(--hairline)', textAlign: 'center' }
  const thStyle = { padding: '12px 16px', color: 'var(--pure)', fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)', textAlign: 'center' }

  const liquidFunds = [
    { fund: 'SBI Liquid', corpus: '688,705', ret: '6.28%' },
    { fund: 'HDFC Liquid', corpus: '643,976', ret: '6.28%' },
    { fund: 'Aditya Birla Liquid', corpus: '568,403', ret: '6.28%' },
    { fund: 'ICICI Pru Liquid', corpus: '499,999', ret: '6.33%' },
  ]

  return (
    <PostLayout title="Step 3 – Emergency Funds">
      <p className="t-body mb-5">
        An unplanned pulling out from an investment can cause severe damage to the portfolio in several ways:
      </p>

      <ul style={{ paddingLeft: '24px', marginBottom: '24px' }}>
        <li className="t-body" style={{ marginBottom: '12px' }}>
          Liquidating equity investments in a downward spiral can impair the returns and limit the potential to bounce back during an upswing.
        </li>
        <li className="t-body">
          Liquidating debt investments can invite penalties and lower than assured returns.
        </li>
      </ul>

      <p className="t-body mb-5">
        Hence, it is recommended that a part of the investment intended for debt instruments be invested for such emergencies in suitable instruments. These typically include:
      </p>

      <ul style={{ listStyle: 'none', padding: 0, marginBottom: '24px' }}>
        <li style={{ marginBottom: '16px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <i className="fa-solid fa-building-columns" style={{ color: 'var(--gold)', marginTop: '4px' }}></i>
          <div>
            <strong style={{ color: 'var(--pure)' }}>Bank Fixed Deposits</strong>
            <p className="t-body" style={{ margin: '4px 0 0' }}>
              Can be liquidated immediately. Many banks also offer the service of liquidating an FD automatically to cover shortfalls in a linked Savings account.
            </p>
          </div>
        </li>
        <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <i className="fa-solid fa-money-bill-trend-up" style={{ color: 'var(--gold)', marginTop: '4px' }}></i>
          <div>
            <strong style={{ color: 'var(--pure)' }}>Liquid or Overnight Mutual Funds</strong>
            <p className="t-body" style={{ margin: '4px 0 0' }}>
              These can be liquidated within 24 hours and serve the 'urgent but not immediate' category of requirement. Choose from the largest in the category to get the benefit of cost efficiency.
            </p>
          </div>
        </li>
      </ul>

      <p className="t-body mb-4" style={{ fontStyle: 'italic', fontSize: '14px' }}>Example (as of June 2025, Liquid Funds):</p>

      <div style={{ overflowX: 'auto', marginBottom: '32px', borderRadius: '12px', border: '1px solid var(--hairline)', background: 'rgba(255,255,255,0.02)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 400 }}>
          <thead>
            <tr>
              <th style={{ ...thStyle, textAlign: 'left' }}>Fund</th>
              <th style={thStyle}>Corpus (INR mn)</th>
              <th style={thStyle}>10-yr Annualized Return</th>
            </tr>
          </thead>
          <tbody>
            {liquidFunds.map((r, i) => (
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

      <p className="t-body mb-5">
        Define the emergency liquidity you could need, including how much could be required immediately and how much within the next 24-48 hours. Invest that in the two instruments above and the balance in other debt instruments shared in the section on fixed income investing.
      </p>

      <p className="t-body">
        Read more:{' '}
        <Link to="/2023/08/19/why-keeping-money-in-a-liquid-mutual-fund-is-better-for-short-term-needs-than-keeping-it-in-a-savings-account" style={{ color: 'var(--gold)', textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
          Why Keeping Money in a Liquid Mutual Fund is Better for Short-Term Needs
        </Link>
      </p>
    </PostLayout>
  )
}
