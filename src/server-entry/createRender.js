import fs from 'fs';
import NativeModule from 'module';
import path from 'path';
import vm from 'vm';

const resolvedModules = {
  'react-dom/server': require('react-dom/server'),
  'react-dom': require('react-dom'),
  history: require('history'),
  '@babel/polyfill': require('@babel/polyfill'),
  redux: require('redux'),
  'redux-thunk': require('redux-thunk'),
  'react-router-redux': require('react-router-redux'),
  react: require('react'),
  'react-redux': require('react-redux'),
  'react-router': require('react-router'),
  'react-router-dom': require('react-router-dom'),
  'react-dnd': require('react-dnd'),
  'react-dnd-html5-backend': require('react-dnd-html5-backend'),
  'prop-types': require('prop-types'),
  antd: require('antd'),
  'antd/lib/locale-provider/zh_CN': require('antd/lib/locale-provider/zh_CN'),
  moment: require('moment'),
  querystring: require('querystring'),
  'node-fetch': require('node-fetch'),
  'ali-oss': require('ali-oss'),
};

export default entryPath => {
  let compiledWrapper;
  const r = function(file) {
    const filePosix = path.posix.join('.', file);
    if (resolvedModules[filePosix]) return resolvedModules[filePosix];
    /* eslint-disable import/no-dynamic-require */
    return require(filePosix);
  };

  function factoryVmScript() {
    if (compiledWrapper) return compiledWrapper;
    try {
      const code = fs.readFileSync(entryPath, 'utf-8');
      fs.existsSync(entryPath);
      const wrapper = NativeModule.wrap(code);
      const script = new vm.Script(wrapper, {
        filename: 'server-entry.js',
        displayErrors: true,
      });
      compiledWrapper = script.runInNewContext(global);
    } catch (e) {
      console.log(e);
    }
    return compiledWrapper;
  }

  return async (...arg) => {
    const wrapper = factoryVmScript();
    const m = { exports: {} };
    let html;
    wrapper.call(m.exports, m.exports, r, m);
    const renderPage = m.exports.default;
    try {
      html = await renderPage(...arg);
    } catch (e) {
      console.log(e);
      throw e;
    }
    return html;
  };
};
