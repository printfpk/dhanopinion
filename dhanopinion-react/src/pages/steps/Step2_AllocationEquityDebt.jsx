import PostLayout from '../../components/PostLayout'
import { Link } from 'react-router-dom'

export default function Step2_AllocationEquityDebt() {
  return (
    <PostLayout title="Step 2 – Allocation between Equity and Debt">
      <p className="t-body mb-5">
        OK! You have cleared the first hurdle of the debt check and decided that you are ready to invest. Your portfolio should balance <strong>equity (stocks, mutual funds)</strong> and <strong>debt (bonds, fixed income, government schemes)</strong>. But how much to invest in debt and how much in equity is a personal choice.
      </p>
      <p className="t-body mb-5">
        This decision is known as the <strong>allocation decision</strong> which is what you need to make at this stage. This allocation, or division, is also referred to as the <strong>growth vs. income decision</strong>. How much money are you willing to squirrel away into growth investments that will, hopefully, deliver superior returns over an extended period of time, and how much will you invest in income-generating investments that deliver predictable, if lower, returns, on a regular basis?
      </p>
      <p className="t-body mb-5">
        While the exact numbers might vary, most experts agree that the two variables that should influence the decision are the investor's age and risk tolerance:
      </p>

      <ul style={{ paddingLeft: '24px', marginBottom: '24px' }}>
        <li className="t-body" style={{ marginBottom: '12px' }}>
          The lower the age of the investor, the <strong>higher</strong> the allocation to equity.
        </li>
        <li className="t-body">
          The lower the risk tolerance of the investor, the <strong>lower</strong> the allocation to equity.
        </li>
      </ul>

      <p className="t-body mb-5">
        Allocation numbers are not cast in stone. They should anyway be adjusted periodically for changing age and risk tolerance levels. They can also be adjusted for any other factor the investor wishes to take into account.
      </p>

      <p className="t-body mb-5">
        For allocation strategies, read our article on{' '}
        <Link to="/2023/08/05/asset-allocation" style={{ color: 'var(--gold)', textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
          Allocation
        </Link>.
      </p>
    </PostLayout>
  )
}
