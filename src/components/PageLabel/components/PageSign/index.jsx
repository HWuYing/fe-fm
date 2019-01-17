import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs } from 'antd';
import { component } from '@particulate';
import SignMenu from '../SignMenu';
import {
  removePage,
  switchPage,
  removeRightPage,
  removeAllPage,
  removeOtherPage,
} from '../../action';
import styles from './index.less';

const { TabPane } = Tabs;
const { saveRef } = component;

@connect(
  ({ pageLabel: { index, labels, contents } }) => ({
    index,
    labels,
    contents,
  }),
  {
    switchPage,
    removePage,
    removeRightPage,
    removeAllPage,
    removeOtherPage,
  }
)
class PageSign extends Component {
  constructor(props, context) {
    super(props, context);
    this.eventList = [];
  }

  componentDidMount() {
    const { $eventbus } = this;
    this.eventList.push($eventbus.$on('@PAGE_LABEL_SWITCH', (...arg) => this.onSwitchPage(...arg)));
    this.eventList.push($eventbus.$on('@PAGE_LABEL_REMOVE', (...arg) => this.onRemove(...arg)));
    this.tabs.addEventListener('contextmenu', this.contextmenu, false);
  }

  componentWillUnmount() {
    this.tabs.removeEventListener('contextmenu', this.contextmenu);
  }

  onMenuSwitch() {
    const {
      index: { menu },
    } = this.props;
    this.$eventbus.$emit('CHANGE_MENU_SELECTED', menu);
  }

  onRemove(menu) {
    const { removePage: remove } = this.props;
    remove(menu);
  }

  onSwitchPage(menu) {
    const { switchPage: sPage } = this.props;
    setTimeout(() => sPage(menu));
  }

  onRefresh(menu) {
    this.$eventbus.$emit('@PAGE_LABEL_REFRESH', menu);
  }

  onOtherPage() {
    const { removeOtherPage: removeOther } = this.props;
    removeOther();
    setTimeout(() => this.onMenuSwitch());
  }

  onAllPage() {
    const { removeAllPage: removeAll } = this.props;
    removeAll();
    setTimeout(() => this.onMenuSwitch());
  }

  onRightPage() {
    const { removeRightPage: removeRight } = this.props;
    removeRight();
    setTimeout(() => this.onMenuSwitch());
  }

  getPageSign() {
    const { getPageSign } = this.props;
    if (getPageSign) getPageSign(this);
  }

  contextmenu = (e) => {
    e.preventDefault();
    this.signmenu.onMenuClick(e);
  };

  render() {
    const { index, labels } = this.props;

    return (
      <div className={styles['page-sign']} ref={() => this.getPageSign()}>
        <div className={styles['sign-env']} ref={saveRef(this, 'tabs')}>
          <Tabs
            onChange={key => this.onSwitchPage({ path: key })}
            onEdit={key => this.onRemove({ path: key })}
            activeKey={index.hash}
            type="editable-card"
            hideAdd="true"
            animated={false}
          >
            {labels.map((label, kIndex) => (
              <TabPane tab={label.name} key={label.hash} closable={kIndex !== 0} />
            ))}
          </Tabs>
        </div>
        <SignMenu
          ref={saveRef(this, 'signmenu')}
          onRefresh={(...arg) => this.onRefresh(...arg)}
          onOtherPage={(...arg) => this.onOtherPage(...arg)}
          onAllPage={(...arg) => this.onAllPage(...arg)}
          onRightPage={(...arg) => this.onRightPage(...arg)}
        />
      </div>
    );
  }
}

export default PageSign;
