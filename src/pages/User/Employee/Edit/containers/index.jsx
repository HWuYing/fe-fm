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
  () => ({}),
  {
    getOrgList: action.getOrgList,
    getDetails: action.getDetails,
    save: action.save,
  }
)
@reducer('userManage', reducesConfig)
class MenuEdit extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      details: {},
      orgList: [],
    };
  }

  componentDidMount() {
    const {
      match: { params },
      getDetails,
      getOrgList,
    } = this.props;
    Promise.all([
      getDetails(params),
      getOrgList({ pageNum: 1, pageSize: 1000 }),
    ]).then(res => {
      const [details, { data:orgList=[] }] = res;
      this.setState({
        details,
        orgList,
      });
    });
  }

  async onSubmit(fields) {
    const { save, pageTitle } = this.props;
    const { details } = this.state;
    const { orgId } = fields;
    await save({
      ...details,
      ...fields,
      orgId: Array.isArray(orgId) ? orgId.join(',') : orgId,
    });
    const { $util: { closeAndSwitchRefresh }, fromMenu: { fromTitle } = {} } = this.props;
    closeAndSwitchRefresh(pageTitle, fromTitle);
  }

  closeEdit() {
    const { pageTitle } = this.props;
    const { $util: { closeAndSwitch }, fromMenu: { fromTitle } = {} } = this.props;
    closeAndSwitch(pageTitle, fromTitle);
  }

  render() {
    const { orgList, details } = this.state;
    return (
      <PageLayout>
        <Form
          style={{ marginLeft: '30px', width: '60%' }}
          layoutCol="1"
          layout="inline"
          getForm={saveRef(this, 'form')}
          fieldsStore={details}
          rootContext={{ orgList }}
          onSubmit={(...arg) => this.onSubmit(...arg)}
        />
        <div style={{ textAlign: 'center', width: '60%'  }}>
          <Button type="primary" onClick={() => this.form.onSubmit()}>
            提交
          </Button>
          <Divider type="vertical" />
          <Button onClick={() => this.closeEdit()}>取消</Button>
        </div>
      </PageLayout>
    );
  }
}

export default MenuEdit;
