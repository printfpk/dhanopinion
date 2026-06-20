import PostLayout from '../../components/PostLayout'

export default function Post_why_keeping_money_in_a_liquid_mutual_fund_is_better_for_short_term_needs_than_keeping_it_in_a_savings_account() {
  return (
    <PostLayout title="Why keeping money in a liquid mutual fund is better for short term needs than keeping it in a savings account">

      <p className="t-body mb-5">
        While the individual investor will have a broad understanding of what a Mutual Fund is, he/she may not be aware of the range. A liquid fund or Liquid Mutual Fund, as the name suggests, invests in highly liquid, short tenure instruments in the money market.
      </p>
      <p className="t-body mb-5">
        Treasury bills, Certificate of Deposits (CDs), term deposits, commercial papers are some examples. The objective is to optimize returns while maintaining liquidity and security of the money invested. Redemption requests are normally processed within one working day, highlighting their sensitivity to investor liquidity needs.
      </p>
      <p className="t-body mb-5">
        Generating high returns is not the primary goal of these funds, which is generally reserved for equity funds. Liquid funds are categorized under debt funds. They park their funds in liquid investments that have a high credit rating and hence a low probability of default. They focus on disciplined investing, which includes ensuring that expenses are kept low while providing liquidity and capital protection to investors.
      </p>
      <p className="t-body mb-5">
        Liquid funds are known to offer better returns than a regular savings account. They are good for parking surplus money from a few days to a few months, and for keeping your emergency funds in, as they can be released at short notice.
      </p>
      <p className="t-body mb-5">
        Liquid funds provide better post-tax returns compared to keeping money in a savings account and is almost as liquid, except for the overnight redemption period. The money is invested in a number of securities as per the mandate of the fund, making it a low-risk investment. Money in a bank account is covered along with other deposit accounts by the standard insurance limit of 5 lacs.
      </p>
      <p className="t-body mb-5">
        In addition to parking money for short periods, say up to 3 months, liquid funds are useful when one needs a parking place for funds while a longer-term decision is being processed. It could be when a large sum has been received, such as sale proceeds of a property, or any other similar sudden inflow. Investors also use liquid funds while they scout for opportunities in equities, where they look for a dip to invest. Liquid funds are also used for investing in a staggered manner, like an SIP, in an equity fund.
      </p>
      <p className="t-body mb-8">
        What is more, liquid funds do not charge an exit load. With investments and redemptions going online, it has become progressively easier to invest in them and exit when you deem fit.
      </p>

      {/* Performance Stats */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--hairline)', borderRadius: 12, padding: '24px 28px', marginBottom: 'var(--sp-8)' }}>
        <h3 className="t-h3 mb-4" style={{ color: 'var(--gold)' }}>Performance of Liquid Funds</h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            'Category average for the trailing 1 year, in June 2023: 5.96%',
            'Category average for the trailing 5 years, in June 2023: 5.05%',
            'The interest rate for savings accounts in most banks has not exceeded 3% p.a. over the last three years.',
            'The maximum rate offered by SBI between 2000 and 2019 was 4% p.a.',
          ].map((s, i) => (
            <li key={i} className="t-body" style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--gold)', flexShrink: 0, marginTop: 2 }}>—</span>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Recommendation */}
      <div style={{ borderLeft: '4px solid var(--gold)', paddingLeft: 20, marginBottom: 'var(--sp-8)' }}>
        <h3 className="t-h3 mb-3">Recommendation</h3>
        <p className="t-body">Move excess funds from a bank savings account into a liquid mutual fund.</p>
      </div>

      {/* Which fund manager */}
      <h3 className="t-h3 mb-3">Which fund manager</h3>
      <p className="t-body">
        Choose a Direct Liquid Fund offered by one out of the following biggest providers – SBI, HDFC, ICICI, UTI and LIC. The benefit in choosing a big fund is that the expenses get absorbed over a larger corpus, reducing the dilution of return for each investor.
      </p>

    </PostLayout>
  )
}
