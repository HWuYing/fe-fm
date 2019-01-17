import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import { renderRoute } from '@applyComponent';
import '../pages';

class RouterConfig extends Component {
  render() {
    return <Switch>{renderRoute()}</Switch>;
  }
}

export default RouterConfig;
