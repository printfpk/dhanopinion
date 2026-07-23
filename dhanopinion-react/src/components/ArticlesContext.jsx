import React, { createContext, useState, useEffect } from 'react';
import { client } from '../sanityClient';

export const ArticlesContext = createContext();

const ARTICLE_ORDER = [
  { title: 'There is always some risk',                                                              date: 'August 31, 2025' },
  { title: 'Diversification reduces risk',                                                           date: 'November 29, 2025' },
  { title: 'Compounding can deliver exponential growth',                                             date: 'March 25, 2026' },
  { title: 'Inflation, Real Value and the Money Illusion',                                           date: 'March 26, 2026' },
  { title: 'Asset Allocation',                                                                       date: 'March 27, 2026' },
  { title: 'Defining your investment horizon can lead to better planning',                           date: 'March 29, 2026' },
  { title: 'Equity - Risk and Return profile',                                                  date: 'March 30, 2025' },
  { title: 'Fixed Income \u2013 Risk and Return profile',                                            date: 'March 31, 2026' },
  { title: 'Active and Passive Investment Management',                                               date: 'April 1, 2026' },
  { title: 'Index Investing Strategy',                                                               date: 'April 2, 2026' },
  { title: 'Competitive Financial Markets and the implications for investment strategy',              date: 'April 3, 2026' },
  { title: 'Keep the cost of investing low',                                                         date: 'April 7, 2026' },
  { title: 'Taxes and their impact on investment outcomes',                                          date: 'April 8, 2026' },
  { title: 'When investing in a Mutual Fund, choose a Direct MF over a Regular MF',                 date: 'April 9, 2026' },
  { title: 'A liquid mutual fund is better for short-term needs than a bank savings account',        date: 'April 10, 2026' },
  { title: 'National Pension System (NPS)',                                                          date: 'April 11, 2026' },
  { title: 'Bank Fixed Deposits',                                                               date: 'April 12, 2026' },
  { title: 'Government Bonds',                                                                       date: 'April 13, 2026' },
  { title: 'Government Savings Schemes',                                                             date: 'April 14, 2026' },
  { title: 'Senior Citizen Saving Scheme (SCSS)',                                                    date: 'April 23, 2026' },
  { title: 'Public Provident Fund',                                                            date: 'May 23, 2026' },
  { title: 'Equity Linked Saving Scheme (ELSS)',                                                     date: 'July 20, 2026' },
];

export const ArticlesProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    client.fetch(`*[_type == "post"] {
      _id,
      title,
      publishedAt,
      "category": categories[]->title,
      "to": slug.current,
      "textContent": pt::text(body)
    }`)
      .then(res => {
        const formatted = res.map(p => {
          const titleLower = (p.title || '').toLowerCase();
          const match = ARTICLE_ORDER.find(o => o.title.toLowerCase() === titleLower);
          return {
            id: p._id,
            title: p.title || 'Untitled',
            date: match
              ? match.date
              : p.publishedAt
                ? new Date(p.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                : '',
            rawDate: p.publishedAt,
            category: p.category || [],
            to: p.to ? `/post/${p.to}` : '#',
            textContent: p.textContent || ''
          };
        });

        const sorted = [...formatted].sort((a, b) => {
          const ai = ARTICLE_ORDER.findIndex(o => o.title.toLowerCase() === a.title.toLowerCase());
          const bi = ARTICLE_ORDER.findIndex(o => o.title.toLowerCase() === b.title.toLowerCase());
          if (ai !== -1 && bi !== -1) return ai - bi;
          if (ai !== -1) return -1;
          if (bi !== -1) return 1;
          return (a.rawDate || '').localeCompare(b.rawDate || '');
        });

        setArticles(sorted);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <ArticlesContext.Provider value={{ articles, isLoading }}>
      {children}
    </ArticlesContext.Provider>
  );
};
