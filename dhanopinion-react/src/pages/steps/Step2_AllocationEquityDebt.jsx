import PostLayout from '../../components/PostLayout'

export default function Step2_AllocationEquityDebt() {
  return (
    <PostLayout title="Allocation between Equity and Debt" preTitle="Step 02" prevLink="/steps/step-1-debt-check" nextLink="/steps/step-3-emergency-funds">
      <p className="t-body mb-5">
        OK! You have cleared the first hurdle of the debt check and decided that you are ready to invest.
      </p>
      <p className="t-body mb-5">
        Your portfolio should balance equity (stocks, mutual funds) and debt (bonds, fixed income, government schemes). But how much to invest in debt and how much in equity is a personal choice. This decision is known as the allocation decision which is what you need to make at this stage.
      </p>
      <p className="t-body mb-5">
        This allocation, or division, is also referred to as the growth vs. income decision. How much money are you willing to squirrel away into growth investments that will, hopefully, deliver superior returns over an extended period of time, and how much will you invest in income-generating investments that deliver predictable, if lower, returns, on a regular basis?
      </p>
      <p className="t-body mb-4">
        While the exact numbers might vary, most experts agree that the two variables that should influence the decision are the investor’s age and risk tolerance:
      </p>
      <ul style={{ paddingLeft: '20px', marginBottom: '24px' }}>
        <li className="t-body" style={{ marginBottom: '8px' }}>
          The lower the age of the investor, the higher the allocation to equity
        </li>
        <li className="t-body">
          The lower the risk tolerance of the investor, the lower the allocation to equity.
        </li>
      </ul>
      <p className="t-body mb-5">
        Allocation numbers are not cast in stone. They should anyway be adjusted periodically for changing age and risk tolerance levels. They can also be adjusted for any other factor the investor wishes to take into account.
      </p>
      <p className="t-body mb-5">
        For allocation strategies, read our article on Allocation.
      </p>
    </PostLayout>
  )
}
