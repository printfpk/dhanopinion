import PostLayout from '../../components/PostLayout'

export default function Step5_InvestingInDebt() {
  const tdStyle = { padding: '12px 16px', fontSize: 15, borderBottom: '1px solid var(--hairline)' }
  const thStyle = { padding: '12px 16px', color: 'var(--pure)', fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)' }

  return (
    <PostLayout title="Investing in Debt (Fixed Income)" preTitle="Step 05" prevLink="/steps/step-4-investing-in-equity" nextLink="/steps/step-6-ongoing">
      <h2 className="t-h2 mb-4">Government-backed schemes</h2>
      <p className="t-body mb-4">
        Prioritize government schemes for fixed income investing.
      </p>
      <p className="t-body mb-4">
        An overview of the popular schemes:
      </p>

      <div className="table-container mb-5">
        <table>
          <thead>
            <tr>
              <th style={thStyle}>Scheme</th>
              <th style={thStyle}>Gross Return</th>
              <th style={thStyle}>Tax Treatment (New Regime)</th>
              <th style={thStyle}>Effective Post-Tax Return (10% / 20% / 30%)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tdStyle}>PPF</td>
              <td style={tdStyle}>~7.1%</td>
              <td style={tdStyle}>Fully tax-free</td>
              <td style={tdStyle}>7.1 / 7.1 / 7.1</td>
            </tr>
            <tr>
              <td style={tdStyle}>SCSS</td>
              <td style={tdStyle}>~8.2%</td>
              <td style={tdStyle}>Interest taxable</td>
              <td style={tdStyle}>7.38 / 6.56 / 5.74</td>
            </tr>
            <tr>
              <td style={tdStyle}>NSC</td>
              <td style={tdStyle}>~7.7%</td>
              <td style={tdStyle}>Interest taxable</td>
              <td style={tdStyle}>6.93 / 6.16 / 5.39</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="t-h2 mb-4">NPS (National Pension System)</h2>
      <p className="t-body mb-4">
        NPS can serve the need for both equity as well as fixed income investing since it follows an age-based allocation system.
      </p>
      <p className="t-body mb-4">
        Some thumb rules:
      </p>
      <p className="t-body mb-4">
        NPS permits investors to choose a level of equity exposure lower than its recommended exposure for the age, but does not permit a higher exposure. Hence, you could also choose a lower exposure to equity within NPS to reach your optimum allocation.
      </p>
      <p className="t-body mb-5">
        If NPS allocation to debt is higher than your preference, choose equity funds outside NPS to get a higher exposure than provided by NPS.
      </p>
    </PostLayout>
  )
}
