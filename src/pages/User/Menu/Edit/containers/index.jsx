import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Divider } from 'antd';
import { reducer } from '@applyStore';
import { PageLayout } from '@layouts';
import { particulate } from '@components';
import { component } from '@particulate';
import reducesConfig from '../../store/reducers/index';
import * as action from '../../store/action/index';
import formConfig from '../config/form.config';

const { saveRef } = component;
const { createForm } = particulate;
const Form = createForm(formConfig);

@connect(
  ({ menuManage: { details, list } }) => ({
    details,
    list,
  }),
  {
    getList: action.getList,
    getDetails: action.getDetails,
    save: action.save,
  }
)
@reducer('menuManage', reducesConfig)
class MenuEdit extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      details: {},
      menuList: [],
    };
  }

  componentDidMount() {
    const {
      match: { params },
      getDetails,
      getList,
    } = this.props;
    const { menuType } = params;
    Promise.all([getDetails(params), getList({ menuType })]).then(res => {
      const [details, list] = res;
      this.setState({
        details,
        menuList: list.data,
      });
    });
  }

  async onSubmit(fields) {
    const { save, pageTitle } = this.props;
    const { details } = this.state;
    const { $util: { closeAndSwitchRefresh }, fromMenu } = this.props;
    await save({
      ...details,
      ...fields,
    });
    closeAndSwitchRefresh(pageTitle, fromMenu);
  }

  closeEdit() {
    const { pageTitle } = this.props;
    const { $util: { closeAndSwitch }, fromMenu: { fromTitle } = {} } = this.props;
    closeAndSwitch(pageTitle, fromTitle);
  }

  render() {
    const { menuList, details } = this.state;
    return (
      <PageLayout>
        <Form
          style={{ marginLeft: '30px', width: '60%' }}
          layoutCol="1"
          layout="inline"
          getForm={saveRef(this, 'form')}
          fieldsStore={details}
          rootContext={{ treeData: menuList }}
          onSubmit={(...arg) => this.onSubmit(...arg)}
        >
          <div style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Divider type="vertical" />
            <Button onClick={() => this.closeEdit()}>取消</Button>
          </div>
        </Form>
      </PageLayout>
    );
  }
}

export default MenuEdit;
