import fs from 'fs';

const docs = [];

const easyWins = {
  _id: 'easyWinsSingleton',
  _type: 'easyWinsPage',
  title: 'Easy Wins',
  introParagraph1: 'We share a few easy things that you can do to improve investment outcomes. With most investment decisions, there is a potential benefit and associated downside. One has to evaluate the benefits against the costs to decide what to do. With many decisions, whether you are better or worse off, depends upon whether equity market returns are better or worse than fixed income returns in the future over your holding horizon.',
  introParagraph2: 'The Easy Wins are different in that these are opportunities for benefits without any significant associated downside. These are actions that you can take where we are very confident that you will be better off for taking these actions, whether markets go up or down.',
  cards: [
    { _key: '1', title: 'Shift to Direct Funds', desc: 'Choose a direct MF over a regular MF — save on fees every single year.', to: '/2023/08/18/when-investing-in-a-mutual-fund-choose-a-direct-mf-over-a-regular-mf/' },
    { _key: '2', title: 'Participate in NPS', desc: 'Tax benefits and low-cost investment options for retirement planning.', to: '/2023/08/20/national-pension-system-nps/' },
    { _key: '3', title: 'Switch to Liquid Funds', desc: 'Earn better returns on emergency funds than a savings account.', to: '/2023/08/19/why-keeping-money-in-a-liquid-mutual-fund-is-better-for-short-term-needs-than-keeping-it-in-a-savings-account/' },
    { _key: '4', title: 'Leverage Government Schemes', desc: 'Move from fixed deposits to government small savings schemes.', to: '/2023/08/23/government-savings-schemes/' }
  ]
};
docs.push(JSON.stringify(easyWins));

const simpleStrategy = {
  _id: 'simpleStrategySingleton',
  _type: 'simpleStrategyPage',
  title: 'A Simple Investment Strategy',
  introParagraph1: 'Investing can be very complex. However it is possible to create simple investment strategies that can be surprisingly effective.',
  introParagraph2: 'Here we suggest a simple investment strategy that is easy to understand and that is likely to be more effective than most complex investment strategies recommended to individual investors.',
  elementsTitle: 'Elements of a simple investment strategy',
  elements: [
    { _key: '1', n: "01", text: "Start saving early if you can, even if the amounts of saving are small.", link: "/2023/08/03/compound-interest-and-exponential-growth/" },
    { _key: '2', n: "02", text: "Investment in stocks – Do not pick individual stocks or securities.", link: "/2023/08/11/index-funds/" },
    { _key: '3', n: "03", text: "Focus on deciding how much to put into equities and how much to put into fixed income assets. This is Asset Allocation and has the biggest impact on your future gains and losses.", link: "/2023/08/05/asset-allocation/" },
    { _key: '4', n: "04", text: "Use the National Pension Scheme for your long-term investment goals.", link: "/2023/08/20/national-pension-system-nps/" },
    { _key: '5', n: "05", text: "Exposure to asset classes – Use Index funds for your equity risk exposure.", link: "/2023/08/11/index-funds/" },
    { _key: '6', n: "06", text: "Exposure to asset classes – Use Government Small savings Schemes for your fixed income exposures.", link: "/2023/08/23/government-savings-schemes/" },
    { _key: '7', n: "07", text: "Invest in Direct Mutual Funds and avoid Regular Funds.", link: "/2023/08/18/when-investing-in-a-mutual-fund-choose-a-direct-mf-over-a-regular-mf/" },
    { _key: '8', n: "08", text: "Keep your savings for emergency needs in a liquid mutual fund instead of a bank savings account.", link: "/2023/08/19/why-keeping-money-in-a-liquid-mutual-fund-is-better-for-short-term-needs-than-keeping-it-in-a-savings-account/" }
  ]
};
docs.push(JSON.stringify(simpleStrategy));

const philosophy = {
  _id: 'philosophySingleton',
  _type: 'philosophyPage',
  title: 'Investment Philosophy',
  introParagraph1: 'Underpinning any investment recommendation is an underlying investment philosophy. This section outlines our investment philosophy in a manner designed to make the underlying assumptions and process clear to you. If you agree with our investment philosophy, our approach is likely to be a good fit for you. If your view of the investment world is different, you should look at alternative solutions.',
  elementsTitle: 'Core elements of our investment philosophy',
  elements: [
    { _key: '1', text: "Everything has risk.", link: "/2023/08/04/there-is-always-some-risk/" },
    { _key: '2', text: "Compounded returns result in exponential growth and over long periods small returns result in large amounts of accumulated value. In other words, small differences in rates of return over long periods will result in large differences in accumulated value.", link: "/2023/08/03/compound-interest-and-exponential-growth/" },
    { _key: '3', text: "Inflation reduces the value of money. Over long periods, the loss is significant.", link: "/2023/08/25/inflation-real-value-and-the-money-illusion/" },
    { _key: '4', text: "Diversification reduces risk.", link: "/2023/04/09/diversification-reduces-risk/" },
    { _key: '5', text: "Markets are very competitive, and this makes it difficult to outperform the average market outcomes.", link: "/2023/08/10/competitive-financial-markets-and-the-implications-for-investment-strategy/" },
    { _key: '6', text: "Asset Allocation is the most important investment decision.", link: "/2023/08/05/asset-allocation/" },
    { _key: '7', text: "Equities historically outperform fixed income but come with the risk of large losses. Moving forward, equity returns may be lower than in the past, but still higher than fixed income returns.", link: "/2023/08/08/risk-and-return-profile-of-equity/" },
    { _key: '8', text: "Taxes have a significant impact on after-tax investment returns. Managing taxes can add a lot of value in the investment process.", link: "/2023/08/17/taxes-and-investment-outcomes/" },
    { _key: '9', text: "Defining and understanding your investment horizon can lead to better planning.", link: "/2023/08/07/defining-your-investment-horizon-can-lead-to-better-planning/" },
    { _key: '10', text: "Keep the cost of investing low.", link: "/2023/08/16/keep-the-cost-of-investing-low/" },
    { _key: '11', text: "Because markets are highly competitive, individual stock picking is less effective than buying the index.", link: "/2023/08/11/index-funds/" },
    { _key: '12', text: "Individuals and institutions - Who you are changes investment choices.", link: "/2023/08/10/competitive-financial-markets-and-the-implications-for-investment-strategy/" }
  ]
};
docs.push(JSON.stringify(philosophy));

fs.writeFileSync('complex_pages.ndjson', docs.join('\n'));
console.log(`Generated complex_pages.ndjson`);
