import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import EasyWins from './pages/EasyWins'
import SimpleInvestmentStrategy from './pages/SimpleInvestmentStrategy'
import InvestmentPhilosophy from './pages/InvestmentPhilosophy'
import CaseStudies from './pages/CaseStudies'
import CaseStudy1 from './pages/posts/CaseStudy1'
import CaseStudy2 from './pages/posts/CaseStudy2'
import CaseStudy3 from './pages/posts/CaseStudy3'
import InformationCentre from './pages/InformationCentre'
import StepsToInvestingSuccess from './pages/StepsToInvestingSuccess'
import AboutUs from './pages/AboutUs'
import Disclaimer from './pages/Disclaimer'

import Post_there_is_always_some_risk_2 from './pages/posts/Post_there_is_always_some_risk_2'
import Post_diversification_reduces_risk from './pages/posts/Post_diversification_reduces_risk'
import Post_compound_interest_and_exponential_growth from './pages/posts/Post_compound_interest_and_exponential_growth'
import Post_there_is_always_some_risk from './pages/posts/Post_there_is_always_some_risk'
import Post_asset_allocation from './pages/posts/Post_asset_allocation'
import Post_equity_investing from './pages/posts/Post_equity_investing'
import Post_defining_your_investment_horizon_can_lead_to_better_planning from './pages/posts/Post_defining_your_investment_horizon_can_lead_to_better_planning'
import Post_risk_and_return_profile_of_equity from './pages/posts/Post_risk_and_return_profile_of_equity'
import Post_risk_and_return_profile_of_fixed_income from './pages/posts/Post_risk_and_return_profile_of_fixed_income'
import Post_active_and_passive_investment_management from './pages/posts/Post_active_and_passive_investment_management'
import Post_index_funds from './pages/posts/Post_index_funds'
import Post_competitive_financial_markets_and_the_implications_for_investment_strategy from './pages/posts/Post_competitive_financial_markets_and_the_implications_for_investment_strategy'
import Post_individual_or_institution_who_you_are_changes_investment_choices from './pages/posts/Post_individual_or_institution_who_you_are_changes_investment_choices'
import Post_dont_pick_stocks_buy_the_index from './pages/posts/Post_dont_pick_stocks_buy_the_index'
import Post_keep_the_cost_of_investing_low from './pages/posts/Post_keep_the_cost_of_investing_low'
import Post_taxes_and_investment_outcomes from './pages/posts/Post_taxes_and_investment_outcomes'
import Post_when_investing_in_a_mutual_fund_choose_a_direct_mf_over_a_regular_mf from './pages/posts/Post_when_investing_in_a_mutual_fund_choose_a_direct_mf_over_a_regular_mf'
import Post_why_keeping_money_in_a_liquid_mutual_fund_is_better_for_short_term_needs_than_keeping_it_in_a_savings_account from './pages/posts/Post_why_keeping_money_in_a_liquid_mutual_fund_is_better_for_short_term_needs_than_keeping_it_in_a_savings_account'
import Post_national_pension_system_nps from './pages/posts/Post_national_pension_system_nps'
import Post_government_savings_schemes from './pages/posts/Post_government_savings_schemes'
import Post_inflation_real_value_and_the_money_illusion from './pages/posts/Post_inflation_real_value_and_the_money_illusion'
import Post_government_bonds from './pages/posts/Post_government_bonds'
import Post_senior_citizen_saving_scheme from './pages/posts/Post_senior_citizen_saving_scheme'
import Post_public_provident_fund from './pages/posts/Post_public_provident_fund'
import Post_bank_fixed_deposits from './pages/posts/Post_bank_fixed_deposits'
import Post_equity_linked_saving_scheme from './pages/posts/Post_equity_linked_saving_scheme'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="easy-wins" element={<EasyWins />} />
        <Route path="easy-wins/" element={<EasyWins />} />
        <Route path="simple-investment-strategy" element={<SimpleInvestmentStrategy />} />
        <Route path="simple-investment-strategy/" element={<SimpleInvestmentStrategy />} />
        <Route path="investment-philosophy" element={<InvestmentPhilosophy />} />
        <Route path="investment-philosophy/" element={<InvestmentPhilosophy />} />
        <Route path="case-studies" element={<CaseStudies />} />
        <Route path="case-studies/" element={<CaseStudies />} />
        <Route path="case_study/case-1/*" element={<CaseStudy1 />} />
        <Route path="case_study/case-2/*" element={<CaseStudy2 />} />
        <Route path="case_study/case-3/*" element={<CaseStudy3 />} />
        <Route path="information-centre" element={<InformationCentre />} />
        <Route path="information-centre/" element={<InformationCentre />} />
        <Route path="steps-to-investing-success" element={<StepsToInvestingSuccess />} />
        <Route path="steps-to-investing-success/" element={<StepsToInvestingSuccess />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="about-us/" element={<AboutUs />} />
        <Route path="disclaimer" element={<Disclaimer />} />
        <Route path="disclaimer/" element={<Disclaimer />} />

        {/* Blog posts */}
        <Route path="2023/01/09/there-is-always-some-risk-2/*" element={<Post_there_is_always_some_risk_2 />} />
        <Route path="2023/04/09/diversification-reduces-risk/*" element={<Post_diversification_reduces_risk />} />
        <Route path="2023/08/03/compound-interest-and-exponential-growth/*" element={<Post_compound_interest_and_exponential_growth />} />
        <Route path="2023/08/04/there-is-always-some-risk/*" element={<Post_there_is_always_some_risk />} />
        <Route path="2023/08/05/asset-allocation/*" element={<Post_asset_allocation />} />
        <Route path="2023/08/06/equity-investing/*" element={<Post_equity_investing />} />
        <Route path="2023/08/07/defining-your-investment-horizon-can-lead-to-better-planning/*" element={<Post_defining_your_investment_horizon_can_lead_to_better_planning />} />
        <Route path="2023/08/08/risk-and-return-profile-of-equity/*" element={<Post_risk_and_return_profile_of_equity />} />
        <Route path="2023/08/09/risk-and-return-profile-of-fixed-income/*" element={<Post_risk_and_return_profile_of_fixed_income />} />
        <Route path="2023/08/10/active-and-passive-investment-management/*" element={<Post_active_and_passive_investment_management />} />
        <Route path="2023/08/11/index-funds/*" element={<Post_index_funds />} />
        <Route path="2023/08/10/competitive-financial-markets-and-the-implications-for-investment-strategy/*" element={<Post_competitive_financial_markets_and_the_implications_for_investment_strategy />} />
        <Route path="2023/08/13/individual-or-institution-who-you-are-changes-investment-choices/*" element={<Post_individual_or_institution_who_you_are_changes_investment_choices />} />
        <Route path="2023/08/14/dont-pick-stocks-buy-the-index/*" element={<Post_dont_pick_stocks_buy_the_index />} />
        <Route path="2023/08/16/keep-the-cost-of-investing-low/*" element={<Post_keep_the_cost_of_investing_low />} />
        <Route path="2023/08/17/taxes-and-investment-outcomes/*" element={<Post_taxes_and_investment_outcomes />} />
        <Route path="2023/08/18/when-investing-in-a-mutual-fund-choose-a-direct-mf-over-a-regular-mf/*" element={<Post_when_investing_in_a_mutual_fund_choose_a_direct_mf_over_a_regular_mf />} />
        <Route path="2023/08/19/why-keeping-money-in-a-liquid-mutual-fund-is-better-for-short-term-needs-than-keeping-it-in-a-savings-account/*" element={<Post_why_keeping_money_in_a_liquid_mutual_fund_is_better_for_short_term_needs_than_keeping_it_in_a_savings_account />} />
        <Route path="2023/08/20/national-pension-system-nps/*" element={<Post_national_pension_system_nps />} />
        <Route path="2023/08/23/government-savings-schemes/*" element={<Post_government_savings_schemes />} />
        <Route path="2023/08/25/inflation-real-value-and-the-money-illusion/*" element={<Post_inflation_real_value_and_the_money_illusion />} />
        <Route path="2023/08/22/government-bonds/*" element={<Post_government_bonds />} />
        <Route path="2023/09/01/senior-citizen-saving-scheme/*" element={<Post_senior_citizen_saving_scheme />} />
        <Route path="2023/10/01/public-provident-fund/*" element={<Post_public_provident_fund />} />
        <Route path="2023/10/02/bank-fixed-deposits/*" element={<Post_bank_fixed_deposits />} />
        <Route path="2023/10/03/equity-linked-saving-scheme/*" element={<Post_equity_linked_saving_scheme />} />
      </Route>
    </Routes>
  )
}

export default App
