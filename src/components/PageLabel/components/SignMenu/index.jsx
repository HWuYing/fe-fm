import React, { Component } from 'react';
import ReactDom, { unmountComponentAtNode } from 'react-dom';
import styles from './index.less';

class SignMenu extends Component {
  constructor(props, context) {
    super(props, context);
    this.node = null;
    this.container = null;
    this.state = {
      style: {
        left: 0,
        top: 0,
      },
      activeName: '',
    };
  }

  componentDidMount() {
    const container = document.body;
    this.container = container;
    this.node = document.createElement('div');
    container.appendChild(this.node);
    this.renderPortal();
  }

  componentDidUpdate() {
    this.renderPortal();
  }

  componentWillUnmount() {
    unmountComponentAtNode(this.node);
    this.container.removeChild(this.node);
  }

  onRefresh() {
    const { onRefresh } = this.props;
    if (onRefresh) onRefresh();
  }

  onOtherPage() {
    const { onOtherPage } = this.props;
    if (onOtherPage) onOtherPage();
  }

  onAllPage() {
    const { onAllPage } = this.props;
    if (onAllPage) onAllPage();
  }

  onRightPage() {
    const { onRightPage } = this.props;
    if (onRightPage) onRightPage();
  }

  onMenuClick(e) {
    e.target.click();
    setTimeout(() => this.resetMenu(e));
  }

  onClick(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      activeName: styles['sign-menu-hidden'],
    });
  }

  resetMenu(e) {
    const { clientX, clientY } = e;
    this.setState({
      style: {
        left: `${clientX - 10}px`,
        top: `${clientY - 10}px`,
      },
      activeName: styles['sign-menu-active'],
    }, () => {
      setTimeout(
        () =>
          this.setState({
            activeName: '',
          }),
        100
      );
    });
  }

  renderContent() {
    const {
      state: { style, activeName },
    } = this;
    return (
      <div
        onClick={(...arg) => this.onClick(...arg)}
        style={style}
        className={`${styles['sign-menu']} ${activeName}`}
      >
        <a onClick={() => this.onRefresh()}>重新加载</a>
        <a onClick={() => this.onAllPage()}>关闭所有标签</a>
        <a onClick={() => this.onOtherPage()}>关闭其它标签</a>
        <a onClick={() => this.onRightPage()}>关闭右侧标签</a>
      </div>
    );
  }

  renderPortal() {
    ReactDom.unstable_renderSubtreeIntoContainer(this, this.renderContent(), this.node);
  }

  render() {
    return null;
  }
}

export default SignMenu;
