import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Menu, Icon } from 'antd';
import { reducer } from '@applyStore';
import reducersConfig from '../reducers';
import { resetOpenKeys, activeItem } from '../action';
import styles from './index.less';

const { SubMenu, Item } = Menu;

@reducer('menu', reducersConfig)
@connect(
  ({ menu }) => ({
    sideMenu: menu.sideMenu,
    openKeys: menu.openKeys,
    selected: menu.selected,
  }),
  {
    resetOpenKeys,
    activeItem,
  }
)
class SideMenu extends Component {
  constructor(props, context) {
    super(props, context);
    this.eventList = [];
  }

  componentWillMount() {
    this.eventList.push(
      this.$eventbus.$on('CHANGE_MENU_SELECTED', (...arg) => this.onChangeSelected(...arg))
    );
  }

  componentDidMount() {
    this.onMenuItemEventBus();
  }

  componentWillUnmount() {
    this.eventList.forEach(fn => fn());
  }

  onChangeSelected(menu) {
    this.onOpenClick({ key: menu.pathHash });
    this.onMenuItemClick({ key: menu.pathHash });
  }

  onMenuItemEventBus() {
    setTimeout(() => {
      const { selected } = this.props;
      if (selected) this.$eventbus.$emit('MENU_ITEM_ACTIVE', selected);
    });
  }

  onMenuItemClick({ key }) {
    const { activeItem: active } = this.props;
    active(key);
    this.onMenuItemEventBus();
  }

  onOpenClick({ key }) {
    const { resetOpenKeys: onOpenKeys, openKeys } = this.props;
    const cursor = openKeys.indexOf(key);
    let openKey = key;
    if (cursor !== -1) {
      openKey = openKeys[cursor - 1];
    }
    onOpenKeys(openKey);
  }

  renderTitle = option => {
    const { icon, name } = option;
    return (
      <Fragment>
        {icon ? <Icon className={styles['item-icon']} type={icon} /> : null}
        <span>{name}</span>
      </Fragment>
    );
  };

  renderMenuItem(option) {
    const { pathHash } = option;
    return <Item key={pathHash}>{this.renderTitle(option)}</Item>;
  }

  renderChildren(children) {
    return (children || []).map(option => {
      if (!option.children || !option.children.length) {
        return this.renderMenuItem(option);
      } else {
        return (
          <SubMenu
            className={styles['sider-submenu']}
            key={option.pathHash}
            onTitleClick={(...arg) => this.onOpenClick(...arg)}
            title={this.renderTitle(option)}
          >
            {this.renderChildren(option.children)}
          </SubMenu>
        );
      }
    });
  }

  render() {
    const {
      openKeys,
      selected={},
      sideMenu: { list },
      theme = 'default',
      collapsed=false,
    } = this.props;
    const mergeProps = collapsed ? {} : { openKeys };
    return (
      <div className={`${styles['side-menu']} ${styles[`side-${theme}`]}`}>
        <Menu
          selectedKeys={[selected.pathHash]}
          {...mergeProps}
          onClick={(...arg) => this.onMenuItemClick(...arg)}
          mode="inline"
        >
          {this.renderChildren(list)}
        </Menu>
      </div>
    );
  }
}

export default SideMenu;
