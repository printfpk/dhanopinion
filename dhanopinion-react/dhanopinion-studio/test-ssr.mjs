import { createServer } from 'vite';
import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import path from 'path';

async function test() {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    root: path.resolve(process.cwd(), '../')
  });

  try {
    const { default: PostComponent } = await vite.ssrLoadModule('/src/pages/posts/Post_compound_interest_and_exponential_growth.jsx');
    const html = renderToStaticMarkup(React.createElement(PostComponent));
    console.log(html);
  } catch (e) {
    console.error(e);
  } finally {
    vite.close();
  }
}

test();
