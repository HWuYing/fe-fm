import React, { Component } from 'react';
import { Layout } from 'antd';
import { ActionComponent, RoutePath } from '@applyComponent';
import { GlobalHeader, PageLabel, SideMenu } from '../../components';
import { getMenu } from '../../components/Menu/action';
import styles from './index.less';
import { globalAction } from '../../global';

const { Header, Sider, Content } = Layout;

@RoutePath('/')
@ActionComponent(async context => Promise.all([
  context.dispatch(getMenu(null, context)),
  context.dispatch(globalAction.getUser(null, context)),
]))
class MainLayout extends Component {
  static components = [PageLabel, GlobalHeader];

  constructor(props, context) {
    super(props, context);
    this.state = {
      collapsed: false,
    };
    this.eventList = [];
  }

  componentDidMount() {
    const { $eventbus } = this;
    this.eventList.push($eventbus.$on('ON_SIDER_TOGGER', () => this.onToggle()));
  }

  componentWillUnmount() {
    this.eventList.forEach(fn => fn());
  }

  onCloseSider() {
    this.setState({
      collapsed: true,
    });
  }

  onOpenSider() {
    this.setState({
      collapsed: false,
    });
  }

  onToggle() {
    const { collapsed } = this.state;
    this.setState({
      collapsed: !collapsed,
    })
  }

  render() {
    const { props } = this;
    const { collapsed } = this.state;
    return (
      <Layout className={styles['layout-content']}>
        <Header>
          <GlobalHeader collapsed={collapsed} />
        </Header>
        <Layout className="flex-row">
          <Sider
            collapsible
            trigger={null}
            width={200}
            collapsed={collapsed}
            className={styles['left-slider']}
          >
            <SideMenu collapsed={collapsed} />
          </Sider>
          <Content>
            <PageLabel {...props} />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default MainLayout;
