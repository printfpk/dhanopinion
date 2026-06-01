import PostLayout from '../../components/PostLayout'

export default function Post_government_savings_schemes() {
  return (
    <PostLayout
      title="Government Savings Schemes"
      date="August 23, 2023"
      author="Dhanopinion"
      readTime="4 min read"
      category="Government scheme"
    >
      <p>The government offers a number of investment options for the individual investor. On account of a lack of awareness about these schemes (many money managers may not suggest these schemes as they do not receive a commission) as well as hesitation in dealing with a machinery that is considered bureaucratic and slow, many eligible people do not invest in them.</p>
      
      <p>The loss is their own as these schemes offer great returns, better than fixed income schemes like fixed deposits and bonds, the highest level of security, and tax benefits as well. With online access to account opening and closing gradually expanding, it is also becoming easier to invest in these schemes.</p>
      
      <p>A short list of schemes that you should consider, along with the rate of interest in May 2023, is shared below. We hope this will encourage more of you to consider investing in government schemes. However, as always, please read the scheme documents to ensure that they are beneficial for your situation.</p>
      
      <div className="overflow-x-auto my-10 border border-white/10 rounded-xl bg-black/20">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-white/5 border-b border-white/10 text-white">
            <tr>
              <th className="p-4 font-semibold">Savings Scheme</th>
              <th className="p-4 font-semibold">Rate</th>
              <th className="p-4 font-semibold">Tax Deduction on principal?</th>
              <th className="p-4 font-semibold">Interest Taxable?</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-[var(--smoke)]">
            <tr className="hover:bg-white/5 transition-colors">
              <td className="p-4">Post Office Savings Account</td>
              <td className="p-4">4.0%</td>
              <td className="p-4">No</td>
              <td className="p-4">Yes</td>
            </tr>
            <tr className="hover:bg-white/5 transition-colors">
              <td className="p-4">Post Office Recurring Deposit</td>
              <td className="p-4">6.2%</td>
              <td className="p-4">No</td>
              <td className="p-4">Yes</td>
            </tr>
            <tr className="hover:bg-white/5 transition-colors">
              <td className="p-4">Post Office Monthly Income Scheme</td>
              <td className="p-4">7.4%</td>
              <td className="p-4">No</td>
              <td className="p-4">Yes</td>
            </tr>
            <tr className="hover:bg-white/5 transition-colors">
              <td className="p-4">Post Office Time Deposit (1 year)</td>
              <td className="p-4">6.8%</td>
              <td className="p-4">No</td>
              <td className="p-4">Yes</td>
            </tr>
            <tr className="hover:bg-white/5 transition-colors">
              <td className="p-4">Post Office Time Deposit (2 year)</td>
              <td className="p-4">6.9%</td>
              <td className="p-4">No</td>
              <td className="p-4">Yes</td>
            </tr>
            <tr className="hover:bg-white/5 transition-colors">
              <td className="p-4">Post Office Time Deposit (3 year)</td>
              <td className="p-4">7.0%</td>
              <td className="p-4">No</td>
              <td className="p-4">Yes</td>
            </tr>
            <tr className="hover:bg-white/5 transition-colors">
              <td className="p-4">Post Office Time Deposit (5 year)*</td>
              <td className="p-4">7.5%</td>
              <td className="p-4">Yes</td>
              <td className="p-4">Yes</td>
            </tr>
            <tr className="hover:bg-white/5 transition-colors">
              <td className="p-4">Kisan Vikas Patra (KVP)</td>
              <td className="p-4">7.5%</td>
              <td className="p-4">No</td>
              <td className="p-4">Yes</td>
            </tr>
            <tr className="hover:bg-white/5 transition-colors">
              <td className="p-4 text-white font-medium">Public Provident Fund (PPF)</td>
              <td className="p-4 text-[var(--gold)]">7.1%</td>
              <td className="p-4">Yes</td>
              <td className="p-4 text-green-400">No</td>
            </tr>
            <tr className="hover:bg-white/5 transition-colors">
              <td className="p-4 text-white font-medium">Sukanya Samriddhi Yojana</td>
              <td className="p-4 text-[var(--gold)]">8.0%</td>
              <td className="p-4">Yes</td>
              <td className="p-4 text-green-400">No</td>
            </tr>
            <tr className="hover:bg-white/5 transition-colors">
              <td className="p-4 text-white font-medium">National Savings Certificate</td>
              <td className="p-4 text-[var(--gold)]">7.7%</td>
              <td className="p-4">Yes</td>
              <td className="p-4 text-green-400">No</td>
            </tr>
            <tr className="hover:bg-white/5 transition-colors">
              <td className="p-4">ELSS (Equity Linked Savings Scheme)</td>
              <td className="p-4">Market Linked</td>
              <td className="p-4">Yes</td>
              <td className="p-4">Yes#</td>
            </tr>
            <tr className="hover:bg-white/5 transition-colors">
              <td className="p-4">NPS (National Pension Scheme)</td>
              <td className="p-4">Market Linked</td>
              <td className="p-4">Yes</td>
              <td className="p-4">Yes**</td>
            </tr>
            <tr className="hover:bg-white/5 transition-colors">
              <td className="p-4 text-white font-medium">Senior Citizens’ Saving Scheme (SCSS)</td>
              <td className="p-4 text-[var(--gold)]">8.2%</td>
              <td className="p-4">Yes</td>
              <td className="p-4">Yes</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <p className="mt-8"><strong>Source:</strong> <a href="https://dea.gov.in/sites/default/files/RoI_Q12023-24_0.pdf" target="_blank" rel="noopener noreferrer" className="text-[var(--gold)] hover:underline">https://dea.gov.in/sites/default/files/RoI_Q12023-24_0.pdf</a></p>
      
      <p className="mt-4">With this list, you can pick the one with the highest rates subject to your liquidity preferences and taxability, till you get to the maximum and then move to the next option.</p>
      
      <p className="mt-4">Details of the National Pension System (NPS), Public Provident Fund (PPF), and Senior Citizens’ Saving Scheme can be accessed on this website by clicking on the names of these schemes here.</p>
    </PostLayout>
  )
}
