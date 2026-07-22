import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';
import { htmlToBlocks } from '@sanity/block-tools';
import { Schema } from '@sanity/schema';

const defaultSchema = Schema.compile({
  name: 'myBlog',
  types: [
    {
      type: 'object',
      name: 'table',
      fields: [{ name: 'rows', type: 'array', of: [{ type: 'tableRow' }] }]
    },
    {
      type: 'object',
      name: 'tableRow',
      fields: [{ name: 'cells', type: 'array', of: [{ type: 'string' }] }]
    },
    {
      type: 'object',
      name: 'page',
      fields: [{ name: 'body', type: 'array', of: [{ type: 'block' }, { type: 'table' }] }]
    }
  ]
});
const blockContentType = defaultSchema.get('page').fields.find(f => f.name === 'body').type;

const stepsMeta = [
  { file: 'Step1_DebtCheck.jsx', key: 'step-01', num: "01", title: "Debt Check", desc: "Before investing, it is important to evaluate your debt situation. Paying high interest on debt while expecting lower returns from investments is counterproductive.", icon: "fa-solid fa-clipboard-check", link: "step-1-debt-check" },
  { file: 'Step2_AllocationEquityDebt.jsx', key: 'step-02', num: "02", title: "Allocation between Equity and Debt", desc: "OK! You have cleared the first hurdle of the debt check and decided that you are ready to invest. Your portfolio should balance equity (stocks, mutual funds) and debt (bonds, fixed income, government schemes). But how much to invest in debt and how much in equity is a personal choice.", icon: "fa-solid fa-chart-pie", link: "step-2-allocation-equity-debt" },
  { file: 'Step3_EmergencyFunds.jsx', key: 'step-03', num: "03", title: "Emergency Funds", desc: "An unplanned pulling out from an investment can cause severe damage to the portfolio in several ways: Liquidating equity investments in a downward spiral can impair the returns and limit the potential to bounce back during an upswing. Liquidating debt investments can invite penalties and lower than assured returns.", icon: "fa-solid fa-shield-halved", link: "step-3-emergency-funds" },
  { file: 'Step4_InvestingInEquity.jsx', key: 'step-04', num: "04", title: "Investing in Equity (Stocks / Mutual Funds)", desc: "We recommend exposure to equity through mutual funds, not direct stock picking. This can be done either through equity mutual funds or the NPS (National Pension System) scheme.", icon: "fa-solid fa-arrow-trend-up", link: "step-4-investing-in-equity" },
  { file: 'Step5_InvestingInDebt.jsx', key: 'step-05', num: "05", title: "Investing in Debt (Fixed Income)", desc: "Prioritize government schemes for fixed income investing. NPS can serve the need for both equity as well as fixed income investing since it follows an age-based allocation system.", icon: "fa-solid fa-building-columns", link: "step-5-investing-in-debt" },
  { file: 'Step6_OngoingReview.jsx', key: 'step-06', num: "06", title: "Ongoing", desc: "Ensure that tax implications are factored in, at the time of investment, on the income that is generated, and on liquidation or encashment. Review allocation and investments periodically, but at least annually, and rebalance.", icon: "fa-solid fa-rotate", link: "step-6-ongoing" }
];

const stepsArray = [];

for (const step of stepsMeta) {
  const filePath = path.join(process.cwd(), '../src/pages/steps', step.file);
  let rawContent = fs.readFileSync(filePath, 'utf-8');

  const returnMatch = rawContent.match(/<PostLayout[^>]*>([\s\S]*?)<\/PostLayout>/);
  if (!returnMatch) {
      console.error(`Could not find PostLayout block in ${step.file}`);
      continue;
  }
  
  let content = returnMatch[1];
  content = content.replace(/className=/g, 'class=');

  // We need a custom rule to handle tables properly for Sanity
  const rules = [
    {
      deserialize(el, next, block) {
        if (el.tagName && el.tagName.toLowerCase() === 'table') {
            const rows = [];
            const trs = el.querySelectorAll('tr');
            trs.forEach((tr, index) => {
                const cells = Array.from(tr.querySelectorAll('th, td')).map(td => td.textContent.trim());
                rows.push({
                    _type: 'tableRow',
                    _key: `row-${index}`,
                    cells
                });
            });
            return block({
                _type: 'table',
                rows
            });
        }
        if (el.tagName && el.tagName.toLowerCase() === 'div' && el.classList.contains('table-container')) {
            return next(el.childNodes);
        }
        return undefined;
      }
    }
  ];

  const blocks = htmlToBlocks(content, blockContentType, {
    parseHtml: html => new JSDOM(html).window.document,
    rules
  });

  stepsArray.push({
    _key: step.key,
    num: step.num,
    title: step.title,
    desc: step.desc,
    icon: step.icon,
    link: step.link,
    content: blocks
  });
}

const doc = {
  _id: 'stepsToSuccessSingleton',
  _type: 'stepsToSuccessPage',
  title: 'Steps to Investing Success',
  steps: stepsArray
};

fs.writeFileSync('steps_full_migration.ndjson', JSON.stringify(doc) + '\n');
console.log('Successfully generated steps_full_migration.ndjson');
