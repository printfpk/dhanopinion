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
      <p className="post-date">April 14, 2026</p>
      
      <p>
        The government offers a number of investment options for the individual investor. On account of a lack of awareness about these schemes (many money managers may not suggest these schemes as they do not receive a commission) as well as hesitation in dealing with a machinery that is considered bureaucratic and slow, many eligible people do not invest in them.
      </p>
      <p>
        The loss is their own as these schemes offer great returns, better than fixed income schemes like fixed deposits and bonds, the highest level of security, and tax benefits as well. With online access to account opening and closing gradually expanding, it is also becoming easier to invest in these schemes.
      </p>
      <p>
        A short list of schemes that you should consider, along with their key features, as currently applicable, are shared below. We hope this will encourage more of you to consider investing in government schemes. The returns, tax implications and features are subject to change. As always, please read the scheme documents to ensure that they are beneficial for your situation.
      </p>

      <p>
        <strong>Table: Government savings schemes for individuals</strong>
      </p>

      {/* Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Scheme</th>
              <th>Target Group</th>
              <th>Returns (Indicative)</th>
              <th>Tenure</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}
                onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                onMouseOut={e => e.currentTarget.style.background = 'transparent'}
              >
                <td>{r.scheme}</td>
                <td>{r.target}</td>
                <td>{r.returns}</td>
                <td>{r.tenure}</td>
              </tr>
            ))}
          </tbody>
        </table>
</div>

      <p>
        The <a href="https://www.nsiindia.gov.in/(S(gnfsjb45ru0l0pra3kz4vt45))/InternalPage.aspx?Id_Pk=132" target="_blank" rel="noopener noreferrer">National Savings Institute</a> publishes the applicable rates for different schemes on its website.<br/>
        An overview of the schemes is also available <a href="https://www.nsiindia.gov.in/(S(zlus4x55qtazutywewljk0fl))/InternalPage.aspx?Id_Pk=188" target="_blank" rel="noopener noreferrer">here</a>.
      </p>

      <p>
        With this list, you can pick the one with the highest rates subject to your liquidity preferences and taxability, till you get to the maximum and then move to the next option.
      </p>
      <p>
        Details of the <a href="/2023/08/20/national-pension-system-nps/">National Pension System (NPS)</a>, <a href="/2023/10/01/public-provident-fund/">Public Provident Fund (PPF)</a>, and <a href="/2023/09/01/senior-citizen-saving-scheme/">Senior Citizens’ Saving Scheme (SCSS)</a> can be accessed on this website by clicking on the names of these schemes here.
      </p>

      <h2>Things to note</h2>
      <ul>
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
