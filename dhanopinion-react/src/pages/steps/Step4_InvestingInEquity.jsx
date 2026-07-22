import PostLayout from '../../components/PostLayout'
import { Link } from 'react-router-dom'

export default function Step4_InvestingInEquity() {
  const tdStyle = { padding: '12px 16px', fontSize: 15, borderBottom: '1px solid var(--hairline)' }
  const thStyle = { padding: '12px 16px', color: 'var(--pure)', fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)' }

  return (
    <PostLayout title="Investing in Equity (Stocks / Mutual Funds)" preTitle="Step 04" prevLink="/steps/step-3-emergency-funds" nextLink="/steps/step-5-investing-in-debt">
      <p className="t-body mb-5">
        We recommend exposure to equity through mutual funds, not direct stock picking. This can be done either through equity mutual funds or the NPS (National Pension System) scheme.
      </p>

      <h2 className="t-h2 mb-4">Equity Mutual Funds</h2>
      <p className="t-body mb-4">
        Keep the following in mind while choosing an equity fund:
      </p>
      <ul style={{ paddingLeft: '20px', marginBottom: '24px' }}>
        <li className="t-body" style={{ marginBottom: '8px' }}>
          Choose Direct Plans, not Regular Plans (to avoid distributor commissions).
        </li>
        <li className="t-body" style={{ marginBottom: '8px' }}>
          Choose Index Funds (Passive) over Active Funds.
        </li>
        <li className="t-body">
          Choose large funds from reputed houses (e.g., SBI, UTI, LIC, HDFC, ICICI, Axis) to bring down the cost burden per unit.
        </li>
      </ul>

      <p className="t-body mb-4">
        Example (as of June 2025, Nifty-based index funds):
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
              <td style={tdStyle}>UTI Nifty 50 Index Fund – Direct Growth</td>
              <td style={tdStyle}>232,494</td>
              <td style={tdStyle}>13.12%</td>
            </tr>
            <tr>
              <td style={tdStyle}>HDFC Nifty 50 Index Fund – Direct Growth</td>
              <td style={tdStyle}>204,093</td>
              <td style={tdStyle}>13.04%</td>
            </tr>
            <tr>
              <td style={tdStyle}>ICICI Pru Nifty 50 Index Fund – Direct Growth</td>
              <td style={tdStyle}>135,350</td>
              <td style={tdStyle}>12.96%</td>
            </tr>
            <tr>
              <td style={tdStyle}>SBI Nifty Index Fund – Direct Growth</td>
              <td style={tdStyle}>98,387</td>
              <td style={tdStyle}>12.96%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="t-h2 mb-4">Investing through NPS (National Pension System)</h2>
      <p className="t-body mb-5">
        NPS has its own system of allocation of investor funds between debt and equity based on age. Hence, within one investment scheme you could potentially meet your allocation goals for exposure to equity as well as debt.
      </p>
      <p className="t-body mb-4">
        In case the NPS allocation is different from your own preferred allocation, you could select the non-NPS investments in a manner that enables you to reach your target allocation.
      </p>
      <p className="t-body mb-4">
        For example:
      </p>
      <p className="t-body mb-4">
        If NPS allocation to equity is lower than your preference, choose equity funds to get a higher exposure than provided by NPS.
      </p>
      <p className="t-body mb-5">
        If NPS allocation to equity is higher than your preference, choose debt schemes outside NPS to get a higher exposure than provided by NPS. At the same time, NPS permits investors to choose a level of equity exposure lower than its recommended exposure for the age, but does not permit a higher exposure. Hence, you could also choose a lower exposure to equity within NPS if you so prefer.
      </p>
      <p className="t-body mb-5">
        Allocate maximum permissible equity exposure under NPS for your age and choose passive funds within NPS to minimize costs.
      </p>
      <p className="t-body mb-5">
        Read our knowledge article on the NPS scheme for more information.
      </p>

      <p className="t-body mb-4">
        Refer to the following articles in our Information Centre know more about the strategies recommended here:
      </p>
      <ul style={{ paddingLeft: '20px', marginBottom: '32px' }}>
        <li className="t-body" style={{ marginBottom: '8px' }}>
          <Link to="/2023/08/11/index-funds/">Index Investing Strategy</Link>
        </li>
        <li className="t-body" style={{ marginBottom: '8px' }}>
          <Link to="/2023/08/18/when-investing-in-a-mutual-fund-choose-a-direct-mf-over-a-regular-mf/">When investing in a Mutual Fund, choose a Direct MF over a Regular MF</Link>
        </li>
        <li className="t-body">
          <Link to="/2023/08/10/active-and-passive-investment-management/">Active and Passive Investment Management</Link>
        </li>
      </ul>
    </PostLayout>
  )
}
