import PostLayout from '../../components/PostLayout'

export default function Post_government_savings_schemes() {
  const tdStyle = { padding: '12px 16px', fontSize: 15, borderBottom: '1px solid var(--hairline)' }
  const thStyle = { padding: '12px 16px', color: 'var(--pure)', fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)' }
  const trHover = { transition: 'background 0.2s' }

  const rows = [
    { scheme: 'Public Provident Fund (PPF)', target: 'All individuals. Account can be opened till the age of 75.', returns: '7.1% (compounded yearly)', tenure: '15 years' },
    { scheme: 'National Savings Certificate (NSC)', target: 'All individuals', returns: '7.7%', tenure: '5 years' },
    { scheme: 'Sukanya Samriddhi Yojana (SSY)', target: 'Girl child (age <10)', returns: '8.2%', tenure: 'Till age 21 or marriage at 18' },
    { scheme: 'Senior Citizens Savings Scheme (SCSS)', target: 'Age 60+ (or 55+ retired)', returns: '8.2% (paid out quarterly)', tenure: '5 years (extendable)' },
    { scheme: 'Kisan Vikas Patra (KVP)', target: 'All individuals', returns: '7.5% (principal doubles on maturity)', tenure: '115 months' },
    { scheme: 'National Pension System (NPS)', target: 'All Indian citizens (18–70)', returns: 'Market-linked', tenure: 'Purchase annuity on attaining the age of 60, or delay it.' },
    { scheme: 'RBI Floating Rate Savings Bonds', target: 'All individuals', returns: '~8.05% (Jul–Dec 2025)', tenure: '7 years' },
  ]

  return (
    <PostLayout title="Government Savings Schemes">
      <p style={{ color: 'var(--post-title)', fontWeight: '600' }}>April 14, 2026</p>
      
      <p className="t-body mb-5">
        The government offers a number of investment options for the individual investor. On account of a lack of awareness about these schemes (many money managers may not suggest these schemes as they do not receive a commission) as well as hesitation in dealing with a machinery that is considered bureaucratic and slow, many eligible people do not invest in them.
      </p>
      <p className="t-body mb-5">
        The loss is their own as these schemes offer great returns, better than fixed income schemes like fixed deposits and bonds, the highest level of security, and tax benefits as well. With online access to account opening and closing gradually expanding, it is also becoming easier to invest in these schemes.
      </p>
      <p className="t-body mb-6">
        A short list of schemes that you should consider, along with their key features, as currently applicable, are shared below. We hope this will encourage more of you to consider investing in government schemes. The returns, tax implications and features are subject to change. As always, please read the scheme documents to ensure that they are beneficial for your situation.
      </p>

      <p className="t-body mb-4">
        <strong>Table: Government savings schemes for individuals</strong>
      </p>

      {/* Table */}
      <div style={{ overflowX: 'auto', marginBottom: 'var(--sp-8)', borderRadius: 12, border: '1px solid var(--hairline)', background: 'rgba(255,255,255,0.02)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 580 }}>
          <thead>
            <tr>
              <th style={{ ...thStyle, textAlign: 'left' }}>Scheme</th>
              <th style={{ ...thStyle, textAlign: 'left' }}>Target Group</th>
              <th style={{ ...thStyle, textAlign: 'left' }}>Returns (Indicative)</th>
              <th style={{ ...thStyle, textAlign: 'left' }}>Tenure</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} style={{ ...trHover, background: 'transparent' }}
                onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                onMouseOut={e => e.currentTarget.style.background = 'transparent'}
              >
                <td style={{ ...tdStyle, color: 'var(--pure)', fontWeight: 500 }}>{r.scheme}</td>
                <td style={{ ...tdStyle, color: 'var(--smoke)' }}>{r.target}</td>
                <td style={{ ...tdStyle, color: 'var(--smoke)' }}>{r.returns}</td>
                <td style={{ ...tdStyle, color: 'var(--smoke)' }}>{r.tenure}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="t-body mb-5">
        The National Savings Institute publishes the applicable rates for different schemes on its website.<br/>
        An overview of the schemes is also available here.
      </p>

      <p className="t-body mb-5">
        With this list, you can pick the one with the highest rates subject to your liquidity preferences and taxability, till you get to the maximum and then move to the next option.
      </p>
      <p className="t-body mb-8">
        Details of the National Pension System (NPS), Public Provident Fund (PPF), and Senior Citizens’ Saving Scheme (SCSS) can be accessed on this website by clicking on the names of these schemes here.
      </p>

      <h3 className="t-h3 mt-10 mb-4">Things to note</h3>
      <ul className="list-disc pl-5 mb-5 space-y-2">
        <li>While it is recommended that you go through the scheme details to ensure it suits your requirements, the following are a quick reckoner which apply to most:</li>
        <li>Extremely low or negligible risk as offered by the government of India</li>
        <li>Available through Post Offices, public sector banks and designated private banks</li>
        <li>Age and other restrictions may apply to account opening as well as to withdrawal and closure</li>
        <li>Minimum and maximum annual investment amounts are applicable to most</li>
        <li>Check for tax benefits available on the amount invested and the interest earned, especially under the old income tax system</li>
        <li>Interest rates are subject to change on a quarterly or annual basis</li>
      </ul>
    </PostLayout>
  )
}
