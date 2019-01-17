import React from 'react';
import ReactDOM from 'react-dom/server';
import applyComponent from '@applyComponent';
import { SYSTEM } from '@common/config';
import App from '../App';

export default async (pathname, req, res) => {
  const location = { pathname };
  const context = {
    history: {
      location,
      listen: f => f,
      createHref: () => {},
    },
    author: {
      system: SYSTEM,
    },
  };
  const list = await applyComponent({
    location,
    req,
    res,
  });
  if (list.length === 0) {
    const error = new Error('资源没有找到');
    error.status = 404;
    throw error;
  }
  return ReactDOM.renderToString(<App {...context} />);
};
