import React from 'react';
import ReactDOM from 'react-dom';
import deepForceUpdate from 'react-deep-force-update';
import applyComponent from '@applyComponent';
import history, { historyListen, executeListen } from '@util/history';
import { SYSTEM } from '@common/config';
import '../global';
import './loadAntdStyles';
import App from '../App';

let currentLocation = history.location;
let appInstance;


async function onLocationChange(location, action) {
  await applyComponent({ location, action });
  if (!appInstance) {
    appInstance = ReactDOM.render(<App history={history} author={{system: SYSTEM}} />,
      document.getElementById('app')
    );
  }
  executeListen(location, action);
  currentLocation = location;
}
historyListen.call(history, onLocationChange);
window.getToken = () => localStorage.getItem('token');
window.PLATFORM = SYSTEM;
onLocationChange(currentLocation);

if (module.hot) {
  module.hot.accept('../App', () => {
    if (appInstance && appInstance.updater.isMounted(appInstance)) {
      deepForceUpdate(appInstance);
    }

    onLocationChange(currentLocation);
  });
}
