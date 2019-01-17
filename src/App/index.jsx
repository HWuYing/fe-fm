import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { LocaleProvider, message, notification } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import store, { ApplyProvider } from '@applyStore';
import mixin from '@mixin';
import { Loading, Error } from '@components';
import { ConnectedRouter } from 'react-router-redux';
import RouterConfig from './router';
import './default.less';

mixin(Component);

class App extends Component {
  static childContextTypes = {
    author: PropTypes.object,
  };

  getChildContext() {
    const { author } = this.props;
    return {
      author,
    };
  }

  componentDidMount() {
    message.config({
      getContainer: () => this.container.ownerDocument.body,
    });

    notification.config({
      getContainer: () => this.container.ownerDocument.body,
    });
  }

  render() {
    const { props } = this;
    return (
      <Fragment>
        <div ref={d => (this.container = d)} style={{ display: 'none' }} />
        <ApplyProvider store={store}>
          <LocaleProvider locale={zhCN}>
            <ConnectedRouter {...props}>
              <RouterConfig {...props} />
            </ConnectedRouter>
          </LocaleProvider>
        </ApplyProvider>
        <Loading />
        <Error history={props.history} />
      </Fragment>
    );
  }
}

export default App;
