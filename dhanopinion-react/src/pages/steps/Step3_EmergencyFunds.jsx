import PostLayout from '../../components/PostLayout'

export default function Step3_EmergencyFunds() {
  const tdStyle = { padding: '12px 16px', fontSize: 15, borderBottom: '1px solid var(--hairline)' }
  const thStyle = { padding: '12px 16px', color: 'var(--pure)', fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)' }

  return (
    <PostLayout title="Emergency Funds" preTitle="Step 03" prevLink="/steps/step-2-allocation-equity-debt" nextLink="/steps/step-4-investing-in-equity">
      <p className="t-body mb-4">
        An unplanned pulling out from an investment can cause severe damage to the portfolio in several ways:
      </p>
      <ul style={{ paddingLeft: '20px', marginBottom: '24px' }}>
        <li className="t-body" style={{ marginBottom: '8px' }}>
          Liquidating equity investments in a downward spiral can impair the returns and limit the potential to bounce back during an upswing.
        </li>
        <li className="t-body">
          Liquidating debt investments can invite penalties and lower than assured returns.
        </li>
      </ul>
      <p className="t-body mb-4">
        Hence, it is recommended that a part of the investment intended for debt instruments be invested for such emergencies in suitable instruments. These typically include:
      </p>
      <ul style={{ paddingLeft: '20px', marginBottom: '24px' }}>
        <li className="t-body" style={{ marginBottom: '8px' }}>
          <strong>Bank Fixed Deposits</strong> – Can be liquidated immediately. Many banks also offer the service of liquidating an FD automatically to cover shortfalls in a linked Savings account.
        </li>
        <li className="t-body">
          <strong>Liquid or Overnight Mutual Funds</strong> – These can be liquidated within 24 hours and serve the ‘urgent but not immediate’ category of requirement.
        </li>
      </ul>
      <p className="t-body mb-4">
        Choose from the largest in the category to get the benefit of cost efficiency. Example (as of June 2025, Liquid Funds):
      </p>
      
      <div className="table-container mb-5">
        <table>
          <thead>
            <tr>
              <th style={thStyle}>Fund</th>
              <th style={thStyle}>Corpus (INR mn)</th>
              <th style={thStyle}>10-yr Annualized Return</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tdStyle}>SBI Liquid</td>
              <td style={tdStyle}>688,705</td>
              <td style={tdStyle}>6.28%</td>
            </tr>
            <tr>
              <td style={tdStyle}>HDFC Liquid</td>
              <td style={tdStyle}>643,976</td>
              <td style={tdStyle}>6.28%</td>
            </tr>
            <tr>
              <td style={tdStyle}>Aditya Birla Liquid</td>
              <td style={tdStyle}>568,403</td>
              <td style={tdStyle}>6.28%</td>
            </tr>
            <tr>
              <td style={tdStyle}>ICICI Pru Liquid</td>
              <td style={tdStyle}>499,999</td>
              <td style={tdStyle}>6.33%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="t-body mb-5">
        Define the emergency liquidity you could need, including how much could be required immediately and how much within the next 24-48 hours. Invest that in the two instruments above and the balance in other debt instruments shared in the section on fixed income investing.
      </p>
    </PostLayout>
  )
}
