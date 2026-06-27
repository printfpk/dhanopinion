import PostLayout from '../../components/PostLayout'

export default function Step1_DebtCheck() {
  const tdStyle = { padding: '12px 16px', fontSize: 15, borderBottom: '1px solid var(--hairline)' }
  const thStyle = { padding: '12px 16px', color: 'var(--pure)', fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)' }

  return (
    <PostLayout title="Step 1 – Debt Check">
      <p className="t-body mb-5">
        Before investing, it is important to evaluate your debt situation. Paying high interest on debt while expecting lower returns from investments is counterproductive.
      </p>

      <p className="t-body mb-5">
        <strong>Do you currently have debt which has a cost of 10% p.a. interest or higher?</strong>
      </p>

      <ul style={{ listStyle: 'none', padding: 0, marginBottom: '24px' }}>
        <li style={{ marginBottom: '12px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <span style={{ minWidth: '40px' }}>If Yes,</span>
          <span className="t-body">paying down debt may be better than investing as investment returns are unlikely to exceed 10% p.a. sustainably.</span>
        </li>
        <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <span style={{ minWidth: '40px' }}>If No,</span>
          <span className="t-body">you can move to the next step and initiate the investing journey.</span>
        </li>
      </ul>

      <p className="t-body mb-5">
        At the same time, you should bear in mind that the 10% indicative threshold is for growth-oriented investments such as equity. If your primary investment target is debt investments, then you should use 7% as the benchmark instead of 10%, to determine if you should pare down debt or invest.
      </p>

      <div style={{ background: 'rgba(212,168,83,0.06)', border: '1px solid rgba(212,168,83,0.2)', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
        <p style={{ color: 'var(--gold)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '12px', marginBottom: '16px' }}>Notes</p>
        <ul style={{ paddingLeft: '20px', margin: 0 }}>
          <li className="t-body" style={{ marginBottom: '12px' }}>
            Please ensure that tax implications are factored in. In case of some debt servicing payments, financial benefits such as setoffs against income may be available, lowering your tax liability.
          </li>
          <li className="t-body">
            The 10% and 7% numbers used are indicative and relevant to the economic environment in Q2 of 2026. If the economic environment changes, e.g. inflation rises, increasing the cost of money, the indicative rates used should change as well.
          </li>
        </ul>
      </div>
    </PostLayout>
  )
}
