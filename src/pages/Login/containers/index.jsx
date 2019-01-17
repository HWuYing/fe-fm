import React, { Component } from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { RoutePath } from '@applyComponent';
import { createForm, Authorized } from '@components';
import { component } from '@particulate';
import { reducer } from '@applyStore';
import { SYSTEM_NAME } from '@common/config';
import { UserLayout } from '../../../layouts';
import baseForm from '../config/base.form';
import reducersPage from '../reducers';
import * as action from '../action';
import styles from './index.less';

const Form = createForm(baseForm);
const { saveRef } = component;

@RoutePath('/login')
@connect(
  ({ user }) => ({
    user,
  }),
  {
    login: action.login,
  }
)
@reducer('user', reducersPage)
class Login extends Component {
  constructor(props, context) {
    super(props, context);
    this.mapEvent = {};
  }

  componentWillMount() {
    this.mapEvent.KEY_DOWN = this.$eventbus.$on('KEY_DOWN', (...arg) => this.onKeyDown(...arg));
  }

  componentWillUnmount() {
    Object.keys(this.mapEvent).forEach(key => {
      this.mapEvent[key]();
    });
  }

  onKeyDown(e) {
    const { form } = this;
    const { keyCode } = e;
    if (keyCode && keyCode.toString() === '13') form.onSubmit();
  }

  onSubmit(fields) {
    const { login, history } = this.props;
    login({
      ...fields,
      loginType: 1,
    }).then(({ data: { token } }) => {
      localStorage.setItem('token', token);
      history.push('/');
    });
  }

  render() {
    return (
      <UserLayout>
        <div className={styles['login-info']}>
          {/*<div className={styles.title}>*/}
            {/*<h1 className="flex flex-row align-item-center">*/}
              {/*<div className={[styles.name, 'f22'].join(' ')}>登录</div>*/}
            {/*</h1>*/}
          {/*</div>*/}
          <Form
            onSubmit={(...arg) => this.onSubmit(...arg)}
            getForm={saveRef(this, 'form')}
            layoutCol="1"
            rootContext={{ styles }}
          >
            <div style={{ height: '10px' }} />
            <Button size="large" className={styles['login-btn']} type="primary" htmlType="submit">
              登录
            </Button>
          </Form>
          <div className="flex flex-row">
            <div className="flex-1" />
            <Authorized target="div" className={styles['link-list']}>
              <a author="aaa" href="/login">忘记密码?</a>
            </Authorized>
          </div>
        </div>
      </UserLayout>
    );
  }
}

export default Login;
