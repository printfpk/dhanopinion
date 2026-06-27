import PostLayout from '../../components/PostLayout'

export default function Post_government_savings_schemes() {
  const tdStyle = { padding: '12px 16px', fontSize: 15, borderBottom: '1px solid var(--hairline)' }
  const thStyle = { padding: '12px 16px', color: 'var(--pure)', fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)' }
  const trHover = { transition: 'background 0.2s' }

  const rows = [
    { name: 'Post Office Savings Account',         rate: '4.0%',           taxDed: 'No',  intTax: 'Yes', highlight: false },
    { name: 'Post Office Recurring Deposit',        rate: '6.2%',           taxDed: 'No',  intTax: 'Yes', highlight: false },
    { name: 'Post Office Monthly Income Scheme',    rate: '7.4%',           taxDed: 'No',  intTax: 'Yes', highlight: false },
    { name: 'Post Office Time Deposit (1 year)',    rate: '6.8%',           taxDed: 'No',  intTax: 'Yes', highlight: false },
    { name: 'Post Office Time Deposit (2 year)',    rate: '6.9%',           taxDed: 'No',  intTax: 'Yes', highlight: false },
    { name: 'Post Office Time Deposit (3 year)',    rate: '7.0%',           taxDed: 'No',  intTax: 'Yes', highlight: false },
    { name: 'Post Office Time Deposit (5 year)*',  rate: '7.5%',           taxDed: 'Yes', intTax: 'Yes', highlight: false },
    { name: 'Kisan Vikas Patra (KVP)',             rate: '7.5%',           taxDed: 'No',  intTax: 'Yes', highlight: false },
    { name: 'Public Provident Fund (PPF)',          rate: '7.1%',           taxDed: 'Yes', intTax: 'No',  highlight: true },
    { name: 'Sukanya Samriddhi Yojana',            rate: '8.0%',           taxDed: 'Yes', intTax: 'No',  highlight: true },
    { name: 'National Savings Certificate',        rate: '7.7%',           taxDed: 'Yes', intTax: 'No',  highlight: true },
    { name: 'ELSS (Equity Linked Savings Scheme)', rate: 'Market Linked',  taxDed: 'Yes', intTax: 'Yes#', highlight: false },
    { name: 'NPS (National Pension Scheme)',        rate: 'Market Linked',  taxDed: 'Yes', intTax: 'Yes**', highlight: false },
    { name: "Senior Citizens' Saving Scheme (SCSS)", rate: '8.2%',         taxDed: 'Yes', intTax: 'Yes', highlight: true },
  ]

  return (
    <PostLayout title="Leverage Government Schemes">
      <p className="t-body mb-5">
        The government offers a number of investment options for the individual investor. On account of a lack of awareness about these schemes (many money managers may not suggest these schemes as they do not receive a commission) as well as hesitation in dealing with a machinery that is considered bureaucratic and slow, many eligible people do not invest in them.
      </p>
      <p className="t-body mb-5">
        The loss is their own as these schemes offer great returns, better than fixed income schemes like fixed deposits and bonds, the highest level of security, and tax benefits as well. With online access to account opening and closing gradually expanding, it is also becoming easier to invest in these schemes.
      </p>
      <p className="t-body mb-6">
        A short list of schemes that you should consider, along with the rate of interest in May 2023, is shared below. We hope this will encourage more of you to consider investing in government schemes. However, as always, please read the scheme documents to ensure that they are beneficial for your situation.
      </p>

      <p className="t-body mb-4">
        <strong>Source: </strong>
        <a href="https://dea.gov.in/sites/default/files/RoI_Q12023-24_0.pdf" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)', textDecoration: 'none' }}>
          https://dea.gov.in/sites/default/files/RoI_Q12023-24_0.pdf
        </a>
      </p>

      {/* Table */}
      <div style={{ overflowX: 'auto', marginBottom: 'var(--sp-8)', borderRadius: 12, border: '1px solid var(--hairline)', background: 'rgba(255,255,255,0.02)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 580 }}>
          <thead>
            <tr>
              <th style={thStyle}>Savings Scheme</th>
              <th style={{ ...thStyle, textAlign: 'center' }}>Rate</th>
              <th style={{ ...thStyle, textAlign: 'center' }}>Tax Deduction on Principal?</th>
              <th style={{ ...thStyle, textAlign: 'center' }}>Interest Taxable?</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} style={{ ...trHover, background: r.highlight ? 'rgba(234,218,134,0.04)' : 'transparent' }}
                onMouseOver={e => e.currentTarget.style.background = r.highlight ? 'rgba(234,218,134,0.08)' : 'rgba(255,255,255,0.03)'}
                onMouseOut={e => e.currentTarget.style.background = r.highlight ? 'rgba(234,218,134,0.04)' : 'transparent'}
              >
                <td style={{ ...tdStyle, color: r.highlight ? 'var(--pure)' : 'var(--smoke)', fontWeight: r.highlight ? 500 : 400 }}>{r.name}</td>
                <td style={{ ...tdStyle, textAlign: 'center', color: r.highlight ? 'var(--gold)' : 'var(--smoke)', fontWeight: r.highlight ? 600 : 400 }}>{r.rate}</td>
                <td style={{ ...tdStyle, textAlign: 'center' }}>{r.taxDed}</td>
                <td style={{ ...tdStyle, textAlign: 'center', color: r.intTax === 'No' ? '#4ade80' : 'var(--smoke)' }}>{r.intTax}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="t-body mb-5">
        With this list, you can pick the one with the highest rates subject to your liquidity preferences and taxability, till you get to the maximum and then move to the next option.
      </p>
      <p className="t-body">
        Details of the National Pension System (NPS), Public Provident Fund (PPF), and Senior Citizens' Saving Scheme can be accessed on this website by clicking on the names of these schemes here.
      </p>
    </PostLayout>
  )
}
