import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createUtil } from '@mixin/util';
import applyComponent, { ActionComponent } from '@applyComponent';
import { reducer } from '@applyStore';
import loadMicro, { getMicroCatch } from '@util/loadMicro';
import { component } from '@particulate';
import PageSign from '../components/PageSign';
import PageComponent from '../components/Page';
import reducersConfig from '../reducers';
import { addPage as add, switchPage, removePage, replacePage } from '../action';
import styles from './index.less';

const { saveRef } = component;

async function preLoadPage(menu, context) {
  const pathname = menu.path;
  let microStore;
  let returnContext = await loadMicro(menu, context);
  if (returnContext) return returnContext;
  if (menu.hasKey) microStore = getMicroCatch(menu.hasKey).store;
  const list = await applyComponent({ ...context, location: { pathname } }, microStore);
  (list || []).some(item => {
    const {
      location: { pathname: path },
    } = item.context;
    if (pathname.indexOf(path) !== -1){
      returnContext = {
        path: pathname,
        ...item.context,
      };
    }
    return !!returnContext;
  });
  return returnContext;
}

@ActionComponent(async (context) => {
  const { store, dispatch } = context;
  const state = store.getState();
  const {
    menu: { selected },
  } = state;
  if (selected) {
    const sContext = await preLoadPage(selected, context);
    dispatch(add(selected, sContext));
  }
})
@reducer('pageLabel', reducersConfig)
@connect(
  ({ pageLabel: { index, contents } , global: { user } }) => ({
    index,
    contents,
    user,
  }),
  {
    addPage: add,
    switchPage,
    removePage,
    replacePage,
  }
)
class PageLabel extends Component {
  static childContextTypes = {
    userInfo: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this.eventList = {};
  }

  getChildContext() {
    const { user } = this.props;
    return {
      userInfo: user,
    };
  }

  componentWillMount() {
    const { eventList } = this;
    // 刷新页面
    eventList['@PAGE_LABEL_REFRESH'] = this.$eventbus.$on('@PAGE_LABEL_REFRESH', (...arg) =>
      this.onRefresh(...arg)
    );
    eventList.MENU_ITEM_ACTIVE = this.$eventbus.$on('MENU_ITEM_ACTIVE', (...arg) =>
      this.onPage(...arg)
    );
    eventList['@PAGE_LABEL_ON_PAGE'] = this.$eventbus.$on('@PAGE_LABEL_ON_PAGE', (...arg) =>
      this.onPage(...arg)
    );
  }

  componentWillUnmount() {
    Object.keys(this.eventList).forEach(key => {
      this.eventList[key]();
    });
  }

  onPage(menu, fromMenu) {
    const { addPage } = this.props;
    preLoadPage(menu).then(context => {
      addPage(menu, context, fromMenu);
    });
  }

  onRefresh(menu) {
    const { index, replacePage: replace, contents } = this.props;
    const page = contents[index.key].Page;
    replace(() => null, menu);
    setTimeout(() => {
      preLoadPage(menu || index.menu).then((context) => {
        replace(page, index.menu, context);
      });
    });
  }

  renderContent(contents) {
    const { index = {}, history } = this.props;
    const pageList = contents.map(content => {
      const { Page, hash, context, pageTitle, fromMenu, host } = content;
      const { path, location={} } = context;
      const $util = createUtil(host, {
        fromTitle: pageTitle,
        path,
        pathname: location.pathname,
        host,
      });
      return (
        <PageComponent key={hash} className={styles['label-content']} data-hidden-label={hash !== index.hash}>
          <Page
            history={history}
            {...context}
            pageTitle={pageTitle}
            $util={$util}
            fromMenu={fromMenu}
          />
        </PageComponent>
      );
    });
    return pageList;
  }

  renderMicro(host, contents) {
    const { AppMicro } = getMicroCatch(host);
    return (
      <AppMicro key={host}>
        { this.renderContent(contents) }
      </AppMicro>
    );
  }

  renderContentControl() {
    const { contents } = this.props;
    const microObj = contents.reduce((obj, context) => {
      const { host } = context;
      let microList = obj.default;
      if (host) {
        if (!obj[host]) Object.assign(obj, { [host]: []});
        microList = obj[host];
      }
      microList.push(context);
      return obj;
    }, {
      'default': [],
    });
    return Object.keys(microObj).map(key => {
      if (key !== 'default') return this.renderMicro(key, microObj[key]);
      return this.renderContent(microObj[key], this.$util);
    });
  }

  render() {
    return (
      <div className={styles['page-label']}>
        <PageSign getPageSign={saveRef(this, 'pageSign')} />
        <div ref={saveRef(this, 'body')} className={styles['content-list']}>{this.renderContentControl()}</div>
        <div className={styles['page-footer']} />
      </div>
    );
  }
}

export default PageLabel;
