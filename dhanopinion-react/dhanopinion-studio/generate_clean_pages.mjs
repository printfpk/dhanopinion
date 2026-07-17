import fs from 'fs';
import { JSDOM } from 'jsdom';
import { htmlToBlocks } from '@sanity/block-tools';
import { Schema } from '@sanity/schema';

const defaultSchema = Schema.compile({
  name: 'myBlog',
  types: [
    {
      type: 'object',
      name: 'page',
      fields: [{ name: 'body', type: 'array', of: [{ type: 'block' }, { type: 'formBlock' }] }]
    },
    {
      type: 'object',
      name: 'formBlock',
      fields: [{ name: 'formType', type: 'string' }]
    }
  ]
});
const blockContentType = defaultSchema.get('page').fields.find(f => f.name === 'body').type;

const pagesData = [
  {
    slug: 'about-us',
    title: 'About Us',
    html: `
      <h2>About Us</h2>
      <p>Personal Financial Advice is a huge area of activity. It can have a significant impact on household wealth and wellbeing. It is our experience and observation that things are often not working very well.</p>
      <p>People find it difficult to understand and make investment decisions. They end up with too little or too much risk relative to what they would have chosen if they had the expertise to make the best decisions for themselves. They often incur costs and fees in the process, but do not know what they are paying and what results they are getting for the payments.</p>
      <p>Unfortunately, there is often a conflict of interest between the product providers and advisors and the clients. The products that generate the highest profits for the providers are not the best investments for their clients, while the best investment solutions generate very low profits for the providers.</p>
      <p>DhanOpinion is an experiment to see if we can contribute to making the investment process and outcomes better for people. The objective is to provide simple effective guidance at low cost. We believe we can leverage our education, training and experience to provide something of value to a large number of people in an efficient way.</p>
      <p>If you find DhanOpinion useful, please let us know. If there is something you would like us to analyze that would be useful to you and many others, let us know and we will consider doing the analysis. If you have any specific suggestions or expertise that you would like to contribute to the effort please let us know. It will help us greatly if you can fill in the brief questionnaire below.</p>
      <!-- We will inject form blocks here later in code -->
    `
  },
  {
    slug: 'disclaimer',
    title: 'Terms and Conditions and Disclaimer',
    html: `
      <h2>Terms and Conditions and Disclaimer</h2>
      <p>The use of the Dhanopinion.com website is subject to the terms and conditions set out below.</p>
      <p>The owner of the website reserves the right to update these terms at any point in time at its sole discretion, without the need to notify anyone in advance.</p>
      <p>You may not use the site and any information on the site for any business purpose or for any publication or for competing in any manner with the site itself, or for any unlawful purpose.</p>
      <p>The information provided does not constitute investment advice. It is provided for general information only and is not tailored for individual use and situation.</p>
      <p>No part of the information should be construed as providing an investment recommendation.</p>
      <p>Under no circumstances will Dhanopinion or its owners be liable for any losses, loss of profits, loss of goodwill, loss of opportunity, loss of time, exemplary or special damage, or any indirect loss as a result of usage of the website.</p>
      <p>While care is taken to ensure that the information presented is accurate, the same cannot be guaranteed. Hence, it is recommended that you take adequate steps to establish the veracity of information before taking a decision.</p>
      <p>Past performance is not a guarantee for future results. Investments in the financial and securities market are subject to market risks. Satisfy yourself fully before investing.</p>
      <p>Dhanopinion does not control the network or the service delivering the website to you over the internet. Hence, Dhanopinion does not bear any liability for any infringement or alteration during the transmission.</p>
      <p>This presents opinions and a point of view that can be used to compare with alternative strategies. Dhanopinion is not a registered financial advisor and therefore you should not treat anything provided as financial advice that is regulated by any government regulatory authority. Consider this to be the type of financial guidance that would be provided by a self-help book on personal finances that is not covered by any regulatory authority.</p>
    `
  },
  {
    slug: 'easy-wins',
    title: 'Easy Wins',
    html: `
      <h2>Easy Wins</h2>
      <p>There are some simple actions that are obviously a good idea. They involve minimal time and effort. Once set up they run efficiently by themselves.</p>
      <h2>Ensure that cash in savings accounts are moved to fixed deposits.</h2>
      <p>Set up instructions with the bank so that any amount over a certain minimum in your savings accounts is swept into a fixed deposit automatically. Similarly when a cheque is presented and the balance in the savings account is inadequate, the fixed deposit is broken automatically and swept into the savings account to meet the payment.</p>
      <p>In the process, you receive fixed deposit rates of interest instead of savings account rates on idle cash. The impact will depend on the amount of cash kept in your account. Generally, you should not be keeping a large amount in your savings account and so the impact should not be very large. However, there is no disadvantage, and hence this is an easy win.</p>
      <h2>Manage the risk of a health emergency.</h2>
      <p>If you or your dependent falls ill, in addition to the problem of ill health, there can be a huge drain on savings. There may be a need to borrow money or to liquidate investments, which may be at a loss, to meet these expenses.</p>
      <p>These large lumpy expenses can be converted into a regular fixed recurring expense through the use of insurance. Insurance enables a person to substitute a small known cost (premium) for a possibly large unknown cost.</p>
    `
  },
  {
    slug: 'investment-philosophy',
    title: 'Investment Philosophy',
    html: `
      <h2>Investment Philosophy</h2>
      <p>Underpinning any investment recommendation is an underlying investment philosophy. This section outlines our investment philosophy in a manner designed to make the underlying assumptions and process clear to you. If you agree with our investment philosophy, our approach is likely to be a good fit for you. If your view of the investment world is different, you should look at alternative solutions.</p>
      <h2>Core elements of our investment philosophy</h2>
      <p>Everything has risk.</p>
      <p>Compounded returns result in exponential growth and over long periods small returns result in large amounts of accumulated value. In other words, small differences in rates of return over long periods will result in large differences in accumulated value.</p>
      <p>Inflation reduces the value of money. Over long periods, the loss is significant.</p>
      <p>Diversification reduces risk.</p>
      <p>Markets are very competitive, and this makes it difficult to outperform the average market outcomes.</p>
      <p>Asset Allocation is the most important investment decision.</p>
      <p>Equities historically outperform fixed income but come with the risk of large losses. Moving forward, equity returns may be lower than in the past, but still higher than fixed income returns.</p>
      <p>Taxes have a significant impact on after-tax investment returns. Managing taxes can add a lot of value in the investment process.</p>
      <p>Defining and understanding your investment horizon can lead to better planning.</p>
      <p>Keep the cost of investing low.</p>
      <p>Because markets are highly competitive, individual stock picking is less effective than buying the index.</p>
      <p>Individuals and institutions - Who you are changes investment choices.</p>
    `
  },
  {
    slug: 'simple-investment-strategy',
    title: 'Simple Investment Strategy',
    html: `
      <h2>Simple Investment Strategy</h2>
      <p>A simple approach to investing. Our recommended approach for the average individual investor is relatively simple to set up, is robust, and takes very little time to manage.</p>
      <h2>Characteristics of the approach</h2>
      <p>Relies on asset allocation</p>
      <p>Avoids market timing or stock selection</p>
      <p>Keeps costs low</p>
      <p>Automates and systematizes investments so you don’t need to do it actively</p>
      <h2>What does this mean for the investor?</h2>
      <p>They should identify the asset allocation between Equity and Fixed Income.</p>
      <p>They should choose an Index Fund for Equity and Government backed schemes for Fixed Income.</p>
      <p>They should systematize investments, e.g., through Systematic Investment Plans (SIP).</p>
      <p>They should review periodically, say annually, and rebalance.</p>
    `
  }
];

const docs = [];

for (const p of pagesData) {
  let blocks = htmlToBlocks(p.html, blockContentType, {
    parseHtml: html => new JSDOM(html).window.document
  });

  // Inject forms in About Us
  if (p.slug === 'about-us') {
    blocks.push({
      _type: 'formBlock',
      _key: 'formBlockContact',
      formType: 'contact'
    });
    blocks.push({
      _type: 'formBlock',
      _key: 'formBlockFeedback',
      formType: 'feedback'
    });
  }

  const doc = {
    _id: `page-${p.slug}`,
    _type: 'page',
    title: p.title,
    slug: { _type: 'slug', current: p.slug },
    body: blocks
  };
  
  docs.push(JSON.stringify(doc));
}

fs.writeFileSync('clean_pages.ndjson', docs.join('\n'));
console.log(`Generated clean_pages.ndjson with ${docs.length} pages`);
