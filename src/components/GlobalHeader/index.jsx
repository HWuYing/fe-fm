import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Dropdown, Menu, Badge } from 'antd';
import { connect } from 'react-redux';
import { PROJECT_CONFIG, PAGE_EDIT_TYPE } from '@common/config';
import { TopMenu } from '../Menu';
import { globalAction } from '../../global';
import logo from '../../assets/logo-icon.png';
import systemImg from '../../assets/system-name.png';
import headImg from '../../assets/head-img.png';
import styles from './index.less';

const MenuItem = Menu.Item;

@connect(({ global: {user} }) => ({ user }), {
  loginOut: globalAction.loginOut,
  getUser: globalAction.getUser,
})
class GlobalHeader  extends Component {
  static contextTypes = {
    author: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this.state = { };
  }

  onMenuClick(e) {
    const { key } = e;
    switch (key) {
      case 'loginOut': this.loginOut() ;break;
      case 'editMaterial': this.editMaterial() ;break;
      case 'editPwd': this.editPwd() ;break;
      default: break;
    }
  }

  async loginOut() {
    const { loginOut } = this.props;
    await loginOut();
    localStorage.removeItem('token');
    window.location.assign('/login');
  }

  async editMaterial() {
    const { author: { system } } = this.context;
    const { user } = this.props;
    const { $util: { closeAndOpen } } = this;
    let editPath;
    let pageTitle;
    switch (system) {
      case PROJECT_CONFIG.STORE.platform:
        editPath=`/store/edit/${user.companyId}?type=${PAGE_EDIT_TYPE.EDIT.value}`;
        pageTitle=`门店`;
        break;
      case PROJECT_CONFIG.ENTERPRISE.platform:
        editPath=`/enterprise/edit/${user.companyId}`;
        pageTitle=`装企`;
        break;
      case PROJECT_CONFIG.SERVICE.platform:
        editPath=`/service-provider-manage/edit/${user.companyId}`;
        pageTitle=`服务商`;
        break;
      default: break;
    }
    closeAndOpen('资料管理', {
      name: `${pageTitle}资料管理`,
      path: editPath,
    });
  }

  async editPwd() {
    const { $util: { closeAndOpen } } = this;
    closeAndOpen('资料管理', {
      name: `修改密码`,
      path: `/user-manage/update-pwd`,
    });
  }

  renderDropDownMenu() {
    const { author: { system } } = this.context;
    return (
      <Menu onClick={(...arg) => this.onMenuClick(...arg)} style={{ width: '200px', padding: '6px 10px' }}>
        <MenuItem key="editPwd">
          <Icon title="修改密码" className={styles['login-out-icon']} type="edit" />
          <span>修改密码</span>
        </MenuItem>
        { system !== PROJECT_CONFIG.ERP.platform && (
          <MenuItem key="editMaterial">
            <Icon title="修改资料" className={styles['login-out-icon']} type="edit" />
            <span>修改资料</span>
          </MenuItem>
        ) }
        <MenuItem key="loginOut">
          <Icon title="退出" className={styles['login-out-icon']} type="poweroff" />
          <span>退出登录</span>
        </MenuItem>
      </Menu>
    )
  }

  render() {
    const { collapsed } = this.props;
    return (
      <div className={[styles['header-container'], 'flex'].join(' ')}>
        <div className="flex flex-1">
          <div className={[styles['system-name-container'], 'flex', 'align-item-center', collapsed ? styles.collapsed : ''].join(' ')}>
            <div className={styles['logo-container']}><img src={logo} alt="logo" /></div>
            <div data-hidden-label={collapsed} className={styles['system-name']}><img src={systemImg} alt="系统名" /></div>
          </div>
          <a onClick={() => this.$eventbus.$emit('ON_SIDER_TOGGER')}>
            <Icon
              className={styles['menu-toggle-icon']}
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
            />
          </a>
          <TopMenu className="flex-1" />
        </div>
        <div className={[styles['header-tools'], 'flex', 'align-item-center'].join(' ')}>
          <div style={{ marginLeft: '15px' }}>
            <Badge count="0" title="消息通知">
              <a><Icon className={styles['login-out-icon']} type="message" /></a>
            </Badge>
          </div>
          <Dropdown
            overlay={this.renderDropDownMenu()}
            trigger={['click']}
          >
            <a className={styles['head-portrait']}>
              <img src={headImg} alt="默认头像" />
            </a>
          </Dropdown>
        </div>
      </div>
    );
  }
}
export default GlobalHeader;
