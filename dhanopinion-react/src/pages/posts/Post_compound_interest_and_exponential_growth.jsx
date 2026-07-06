import PostLayout from '../../components/PostLayout'

export default function Post_compound_interest_and_exponential_growth() {
  const tdStyle = { padding: '12px 16px', fontSize: 15, borderBottom: '1px solid var(--hairline)' }
  const thStyle = { padding: '12px 16px', color: 'var(--pure)', fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)' }
  const trHover = { transition: 'background 0.2s' }

  const rows1 = [
    { rate: '1%', y1: '1.01', y2: '1.02', y3: '1.03', y5: '1.05', y10: '1.10', y25: '1.25', y50: '1.50', y100: '2.00' },
    { rate: '5%', y1: '1.05', y2: '1.10', y3: '1.15', y5: '1.25', y10: '1.50', y25: '2.25', y50: '3.50', y100: '6.00' },
    { rate: '10%', y1: '1.10', y2: '1.20', y3: '1.30', y5: '1.50', y10: '2.00', y25: '3.50', y50: '6.00', y100: '11.00' },
    { rate: '25%', y1: '1.25', y2: '1.50', y3: '1.75', y5: '2.25', y10: '3.50', y25: '7.25', y50: '13.50', y100: '26.00' },
  ]

  const rows2 = [
    { rate: '1%', y1: '1.01', y2: '1.02', y3: '1.03', y5: '1.05', y10: '1.10', y25: '1.28', y50: '1.64', y100: '2.70' },
    { rate: '5%', y1: '1.05', y2: '1.10', y3: '1.16', y5: '1.28', y10: '1.63', y25: '3.39', y50: '11.5', y100: '131.5' },
    { rate: '10%', y1: '1.10', y2: '1.21', y3: '1.33', y5: '1.61', y10: '2.59', y25: '10.83', y50: '117', y100: '13,781' },
    { rate: '25%', y1: '1.25', y2: '1.56', y3: '1.95', y5: '3.05', y10: '9.31', y25: '264.70', y50: '70,065', y100: '4,90,90,93,465' },
  ]

  return (
    <PostLayout title="Compounding can deliver exponential growth">
      <p className="post-date">March 25, 2026</p>

      <h2>Compound interest is an exponential growth phenomenon</h2>
      <p>
        We are generally used to thinking in linear terms and not very good at understanding the accumulated effect of small differences in growth rates over long periods of time. The tables below give us the impact of different rates of return over different time horizons, and the difference between simple and compound interest.
      </p>

      <h3>Simple interest effect over different periods of time</h3>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Interest rate \ Years 🡪</th>
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>5</th>
              <th>10</th>
              <th>25</th>
              <th>50</th>
              <th>100</th>
            </tr>
          </thead>
          <tbody>
            {rows1.map((r, i) => (
              <tr key={i}
                onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                onMouseOut={e => e.currentTarget.style.background = 'transparent'}
              >
                <td>{r.rate}</td>
                <td>{r.y1}</td>
                <td>{r.y2}</td>
                <td>{r.y3}</td>
                <td>{r.y5}</td>
                <td>{r.y10}</td>
                <td>{r.y25}</td>
                <td>{r.y50}</td>
                <td>{r.y100}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>
        At a return of 1% simple interest p.a., an amount becomes 1.5 times the initial amount in 50 years and twice the original amount in 100 years.<br />
        At a 5% simple interest return, an amount becomes 3.5 times the initial amount in 50 years and six times the original amount in 100 years.
      </p>

      <h3>Compound interest effect over different periods of time</h3>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Interest rate \ Years 🡪</th>
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>5</th>
              <th>10</th>
              <th>25</th>
              <th>50</th>
              <th>100</th>
            </tr>
          </thead>
          <tbody>
            {rows2.map((r, i) => (
              <tr key={i}
                onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                onMouseOut={e => e.currentTarget.style.background = 'transparent'}
              >
                <td>{r.rate}</td>
                <td>{r.y1}</td>
                <td>{r.y2}</td>
                <td>{r.y3}</td>
                <td>{r.y5}</td>
                <td>{r.y10}</td>
                <td>{r.y25}</td>
                <td>{r.y50}</td>
                <td>{r.y100}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>
        At a return of 1% compound interest p.a., an amount becomes 1.64 times the initial amount in 50 years and 2.7 times the original amount in 100 years.<br />
        At a 5% compound interest return, an amount becomes 11.5 times the initial amount in 50 years and 131.5 times the original amount in 100 years.
      </p>

      <p>What do we see?</p>
      <p>
        Money invested on compounding terms amounts to a whole lot more than the money invested on simple interest.
      </p>

      <p>Why does this happen when the rate is the same?</p>
      <p>
        The primary reason is that simple interest, once earned, does not get reinvested. It is probably drawn out for expenditure. When invested on compounding basis, the earnings get ploughed back into the investment and generate returns in addition to the returns generated by the principal. In a few years, the interest starts becoming bigger than the principal and generating a whole lot more money.
      </p>

      <p>
        There are two variables on which this works:<br />
        – The duration; the longer the investment period the greater the benefit<br />
        – The rate of return; the higher the rate the greater the benefit
      </p>

      <p>
        In our example, at the rate of 1% per annum, the amount is almost the same after 10 years, a little higher at the end of 100 years.<br />
        When invested at 10% p.a., the difference starts becoming visible earlier. After 5 years, ₹ 1 amounts to ₹ 1.50 using simple interest and ₹ 1.61 using compound interest. From here onwards, compound interest keeps pulling away. After 50 years, simple interest yields ₹ 6 while compound interest yields ₹ 11.74.
      </p>
      <p>
        As the rate and amount increase, the difference expands.
      </p>

      <h2>Recommendation</h2>
      <p>
        Start investing early and give your money a chance to grow. Allow the earnings, as they accrue, to generate returns as well.
      </p>
    </PostLayout>
  )
}
