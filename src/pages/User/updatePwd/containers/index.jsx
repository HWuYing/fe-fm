import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Divider, message } from 'antd';
import { reducer } from '@applyStore';
import { PageLayout } from '@layouts';
import { particulate } from '@components';
import { component } from '@particulate';
import { globalAction } from '../../../../global';
import reducesConfig from '../reducers';
import * as action from '../action';
import formConfig from '../config/form.config';

const { saveRef } = component;
const { createForm } = particulate;
const Form = createForm(formConfig);

@connect(({ global: { user }}) => ({ user }), {
  changePassword: action.changePassword,
  loginOut: globalAction.loginOut,
})
@reducer('passwordManage', reducesConfig)
class MenuEdit extends Component {
  async onSubmit(fields) {
    const { newPassword, confirmPassword } = fields;
    if (newPassword !== confirmPassword) return message.error('两次输入密码不一致');
    const { changePassword, loginOut } = this.props;
    const { resultMsg } = await changePassword(fields);
    message.success(resultMsg);
    await loginOut();
    localStorage.removeItem('token');
    window.location.assign('/login');
  }

  closeEdit() {
    const { $util: { closeAndSwitch }, pageTitle, fromMenu: { fromTitle } = {} } = this.props;
    closeAndSwitch(pageTitle, fromTitle);
  }

  render() {
    const { user } = this.props;
    return (
      <PageLayout>
        <Form
          style={{ marginLeft: '30px', width: '60%' }}
          layoutCol="1"
          layout="inline"
          fieldsStore={user}
          labelStyle={{ width: '110px' }}
          getForm={saveRef(this, 'form')}
          onSubmit={(...arg) => this.onSubmit(...arg)}
        />
        <div style={{ textAlign: 'center', width: '60%' }}>
          <Button type="primary" onClick={() => this.form.onSubmit()}>
            提交
          </Button>
          <Divider type="vertical"/>
          <Button onClick={() => this.closeEdit()}>取消</Button>
        </div>
      </PageLayout>
    );
  }
}

export default MenuEdit;
