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
    getDetails: action.getDetails,
    save: action.save,
  }
)
@reducer('userGroupManage', reducesConfig)
class MenuEdit extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      details: {},
    };
  }

  componentDidMount() {
    const {
      match: { params },
      getDetails,
    } = this.props;
    Promise.all([
      getDetails(params),
    ]).then(res => {
      const [details] = res;
      this.setState({
        details,
      });
    });
  }

  async onSubmit(fields) {
    const { save, pageTitle } = this.props;
    const { details } = this.state;
    const { $util: { closeAndSwitchRefresh }, fromMenu: { fromTitle, path } = {} } = this.props;
    await save({
      ...details,
      ...fields,
    });
    closeAndSwitchRefresh(pageTitle, {
      name: fromTitle,
      path,
    });
  }

  closeEdit() {
    const { pageTitle } = this.props;
    const { $util: { closeAndSwitch }, fromMenu: { fromTitle } = {} } = this.props;
    closeAndSwitch(pageTitle, fromTitle);
  }

  render() {
    const { details } = this.state;
    const isEdit = !!details.id;
    const isChildren = details.parent && details.parent.toString() !== '0';
    return (
      <PageLayout>
        <Form
          author={{}}
          style={{ marginLeft: '30px', width: '60%' }}
          layoutCol="1"
          rootContext={{ isEdit, isChildren }}
          layout="inline"
          getForm={saveRef(this, 'form')}
          fieldsStore={details}
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
