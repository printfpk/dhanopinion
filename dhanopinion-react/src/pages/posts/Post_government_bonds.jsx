import PostLayout from '../../components/PostLayout'

export default function Post_government_bonds() {
  const tdStyle = { padding: '12px 16px', fontSize: 15, borderBottom: '1px solid var(--hairline)' }
  const thStyle = { padding: '12px 16px', color: 'var(--pure)', fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)' }
  const trHover = { transition: 'background 0.2s' }

  const rows = [
    { scheme: 'SBI Magnum Gilt Fund - Direct Plan - Growth', aum: '12,148.74', y1: '8.66%', y5: '6.52%', y10: '8.65%' },
    { scheme: 'ICICI Prudential Gilt Fund - Direct Plan - Growth', aum: '7,275.51', y1: '10.21%', y5: '6.89%', y10: '8.82%' },
    { scheme: 'Kotak Gilt - Investment - PF and Trust - Direct Plan - Growth', aum: '3,809.82', y1: '7.99%', y5: '6.35%', y10: '8.44%' },
    { scheme: 'Kotak Gilt - Investment - Direct Plan - Growth', aum: '3,809.82', y1: '7.99%', y5: '6.35%', y10: '8.41%' },
    { scheme: 'Bandhan Government Securities Fund - Investment Plan - Direct Plan - Growth', aum: '3,123.96', y1: '7.45%', y5: '5.91%', y10: '8.48%' },
    { scheme: 'HDFC Gilt Fund - Direct Plan - Growth', aum: '3,045.35', y1: '9.40%', y5: '5.80%', y10: '7.45%' },
    { scheme: 'Aditya Birla Sun Life Government Securities Fund - Direct Plan - Growth', aum: '2,463.18', y1: '8.03%', y5: '6.09%', y10: '8.53%' },
    { scheme: 'Nippon India Gilt Fund- Direct Plan - Growth', aum: '2,063.18', y1: '8.67%', y5: '5.93%', y10: '8.83%' },
    { scheme: 'Nippon India Gilt Fund- Direct Plan - Automatic Capital App', aum: '2,063.18', y1: '8.67%', y5: '5.93%', y10: '8.83%' },
    { scheme: 'DSP Gilt Fund - Direct Plan - Growth', aum: '1,852.40', y1: '8.61%', y5: '6.48%', y10: '8.56%' },
  ]

  return (
    <PostLayout
      title="Government Bonds"
      date="April 13, 2026"
      author="Dhanopinion"
      readTime="6 min read"
      category="Government scheme"
    >
      <p className="post-date">April 13, 2026</p>
      <p>A Government Bond is a debt instrument issued by the Central or a State government for the purpose of mobilizing public money, usually for the purpose of financing infrastructure projects. The authority issuing the Bonds is responsible for redeeming them, or paying the interest and maturity proceeds of the instrument. As the purpose usually is to finance infrastructure development, the maturity periods can be long, usually between 5 and 40 years.</p>
      <p>They are also known as government securities (G-Secs) and GILTs. Individual investors can directly invest in these instruments, subject to the stipulations and requirements of each issue.</p>
      <p>They are investments that are guaranteed by the issuing government authority and could be considered as one of the safest forms of investment. Hence, they are ideal investments for risk-averse investors.</p>

      <h2>Types of Bonds</h2>
      <p>Both the central and state governments can issue bonds of different types:</p>

      <h3>Fixed-rate bonds</h3>
      <p>This is the most common type. The rate remains fixed during the period of existence of the bonds. The interest rate is known as the coupon rate.</p>
      <p>For investors buying and selling Bonds in the secondary market, the value can change based on market conditions. During inflationary conditions, if interest rates for competing investments rise, the face value of the bonds will decline to a level where the coupon rate, which is fixed, becomes competitive. And vice versa.</p>

      <h3>Floating Rate Bonds (FRBs)</h3>
      <p>The rate is not fixed for the entire tenure but keeps changing based on a pre-determined formula as well as the intervals at which the change would be effective.</p>

      <h3>Sovereign Gold Bonds (SGBs)</h3>
      <p>These bonds are a method of attracting investments from the public that would normally go into physical gold or gold assets such as jewellery, as has been the tradition in India. These bonds are pegged to the value of gold and also pay a small interest on the investment.</p>
      <p>Hence, investors will not only get value on maturity based on the appreciation (or depreciation) in gold prices, which they would be subject to even if they had invested in physical gold. In addition, they will also receive interest, which they would not in case of physical gold. These are also exempt from capital gains tax in the hands of individuals.</p>

      <h3>Inflation-Indexed Bonds</h3>
      <p>These are specifically meant for retail investors and seek to deliver a return that compensates them for the rise in prices during the currency of the bond. Mostly indexed to the Consumer Price Index (CPI), the purpose is to provide a constant return to investors, taking inflation into account.</p>

      <h3>Treasury Bills (T-Bills)</h3>
      <p>Bonds issued for under a year are known as T-Bills.</p>

      <h3>7.75% GOI Savings Bond</h3>
      <p>Designed as a high-return Bond as compared to several others in existence, this instrument is reserved for investment by resident individuals. Interest earnings from such bonds are taxable under the Income Tax Act 1961 as per the investors’ applicable income tax slab. The minimum amount at which these bonds are issued is Rs. 1000 and in multiples of Rs. 1000 thereof.</p>

      <h3>Tax free Bonds</h3>
      <p>Certain public sector entities get permission to issue tax-free bonds, for raising money for projects of particular importance. These are attractive investments for people with large taxable incomes as it gives them one source that is not taxable.</p>

      <h3>Zero coupon Bonds</h3>
      <p>These are issued at a discount, without any attached coupons. The face value is paid to the investor on redemption at maturity. The difference between the buying and selling prices becomes the earning for the investor.</p>

      <h3 className="t-h3 mt-10 mb-4">Advantages and disadvantages of investing in Government Bonds?</h3>
      <ul className="list-disc pl-5 mb-5 space-y-2">
        <li>Government Bonds are virtually risk-free as they are issued by the Central and State governments.</li>
        <li>Interest earned on Bonds are disbursed to holders at regular intervals, as specified in the terms of issuance usually 6 months. This becomes a source of regular income for investors without exposure to market-related movements.</li>
        <li>Liquid investment. It is a tradeable security and can be sold at prevailing prices without delay and without penalty.</li>
        <li>Bonds are subject to rate fluctuations.</li>
      </ul>

      <h3 className="t-h3 mt-10 mb-4">How can individuals buy and sell Government Bonds?</h3>
      <p>Individuals can invest in Bonds through multiple channels.</p>

      <h4 className="t-h4 mt-6 mb-3">Direct Investment</h4>
      <p>As Bonds are market securities, they can be bought and sold on the marketplace, similar to buying and selling stocks.</p>
      <p>While traditionally buying and selling of securities was conducted through brokers, with online trading gaining ground, interested individuals can open a trading account and a demat account (where the bought security will be deposited) through a broking house and conduct purchase and sale of Bonds.</p>

      <h4 className="t-h4 mt-6 mb-3">Directly through the NSE goBID bidding process</h4>
      <p>Individuals can participate in the non-competitive bidding (NCB) process through which bids can be placed online at the time of fresh issuance of Bonds. This is akin to investing in share IPOs. This can be done through the goBID web portal of the NSE. The government determines the yield based on the bids received. You will need to register/ create an account for this bidding.</p>

      <h4 className="t-h4 mt-6 mb-3">RBI Retail Direct</h4>
      <p>Since November 2021, individuals can invest in G-Secs through the Retail Direct Gilt (RDG) process of RBI, which allows you to participate in primary issuance.</p>

      <h4 className="t-h4 mt-6 mb-3">Focused Mutual Funds</h4>
      <p>Investment in Government Bonds can also be made through Mutual Funds that focus on this investment product. Though an indirect channel, this has gained popularity amongst individuals, just like Equity MFs have gained traction with individuals, against direct investment. These MFs are also referred to as GILT-edged MFs.</p>

      <h3 className="t-h3 mt-10 mb-4">Historical returns</h3>
      <p className="mb-6">
        Returns delivered by a few of the large GILT mutual funds as available on the <a href="https://www.moneycontrol.com" target="_blank" rel="noopener noreferrer">moneycontrol.com</a> website, as on 11<sup>th</sup> July, 2025:
      </p>

      {/* Table */}
      <div className="table-container">
<table>
          <thead>
            <tr>
              <th>Scheme Name</th>
              <th>AuM (Cr.)</th>
              <th>1Y</th>
              <th>5Y</th>
              <th>10Y</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} style={trHover}
                onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                onMouseOut={e => e.currentTarget.style.background = 'transparent'}
              >
                <td>{r.scheme}</td>
                <td>{r.aum}</td>
                <td>{r.y1}</td>
                <td>{r.y5}</td>
                <td>{r.y10}</td>
              </tr>
            ))}
          </tbody>
        </table>
</div>
      
      <h2>Conclusion</h2>
      <p>Government Bonds are a part of the Fixed Income type of investments that earn on the basis of pre-determined rates or formulae and are not dependent on market conditions. Hence, the usual suspects will be:</p>
      <ul className="list-disc pl-5 mb-5 space-y-2">
        <li>Government schemes such as PPF and SCSS</li>
        <li>Bank Fixed Deposits</li>
        <li>Corporate debentures</li>
      </ul>
      
      <p>Government Bonds are a good investment for a portion of the investible amount of individuals, where risk-avoidance is a primary condition.</p>
      <p>The Indian government has made it progressively simpler for individuals to invest through online channels in primary issues, as well as a robust secondary market through trading and demat accounts.</p>
    </PostLayout>
  )
}
