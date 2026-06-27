import PostLayout from '../../components/PostLayout'

export default function Step6_OngoingReview() {
  return (
    <PostLayout title="Step 6 – Ongoing">
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ marginBottom: '20px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <i className="fa-solid fa-check-circle" style={{ color: 'var(--gold)', marginTop: '4px', fontSize: '18px' }}></i>
          <span className="t-body">
            Ensure that tax implications are factored in, at the time of investment, on the income that is generated, and on liquidation or encashment.
          </span>
        </li>
        <li style={{ marginBottom: '20px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <i className="fa-solid fa-check-circle" style={{ color: 'var(--gold)', marginTop: '4px', fontSize: '18px' }}></i>
          <span className="t-body">
            Review allocation and investments periodically, but at least annually, and rebalance. Market fluctuations may cause deviations.
          </span>
        </li>
        <li style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <i className="fa-solid fa-check-circle" style={{ color: 'var(--gold)', marginTop: '4px', fontSize: '18px' }}></i>
          <span className="t-body">
            At any point of time, do not hesitate to reach out to an expert for guidance. You can reach the Dhanopinion investment advisors at{' '}
            <a href="mailto:contact@dhanopinion.com" style={{ color: 'var(--gold)', textDecoration: 'none' }}>
              contact@dhanopinion.com
            </a>.
          </span>
        </li>
      </ul>
    </PostLayout>
  )
}
