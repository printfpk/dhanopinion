import PostLayout from '../../components/PostLayout'

export default function Step1_DebtCheck() {
  return (
    <PostLayout title="Debt Check" preTitle="Step 01" nextLink="/steps/step-2-allocation-equity-debt">
      <p className="t-body mb-5">
        Before investing, it is important to evaluate your debt situation. Paying high interest on debt while expecting lower returns from investments is counterproductive.
      </p>
      <p className="t-body mb-5">
        <strong>Do you currently have debt which has a cost of 10% p.a. interest or higher?</strong>
      </p>
      <p className="t-body mb-5">
        <strong>If Yes,</strong> paying down debt may be better than investing as investment returns are unlikely to exceed 10% p.a. sustainably.
      </p>
      <p className="t-body mb-5">
        <strong>If No,</strong> you can move to the next step and initiate the investing journey.
      </p>
      <p className="t-body mb-5">
        At the same time, you should bear in mind that the 10% indicative threshold is for growth-oriented investments such as equity. If your primary investment target is debt investments, then you should use 7% as the benchmark instead of 10%, to determine if you should pare down debt or invest.
      </p>
      <div style={{ background: 'rgba(212,168,83,0.06)', border: '1px solid rgba(212,168,83,0.2)', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
        <p style={{ color: 'var(--gold)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '12px', marginBottom: '16px' }}>Notes:</p>
        <ul style={{ paddingLeft: '20px', margin: 0 }}>
          <li className="t-body" style={{ marginBottom: '12px' }}>
            Please ensure that tax implications are factored in. In case of some debt servicing payments, financial benefits such as setoffs against income may be available, lowering your tax liability.
          </li>
          <li className="t-body">
            The 10% and 7% numbers used are indicative and relevant to the economic environment in Q2 of 2026. If the economic environment changes, eg. inflation rises, increasing the cost of money, the indicative rates used should change as well.
          </li>
        </ul>
      </div>
    </PostLayout>
  )
}
