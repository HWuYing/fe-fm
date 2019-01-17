import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Divider } from 'antd';
import { PageLayout } from '@layouts';
import { particulate } from '@components';
import { component } from '@particulate';
import * as action from '../action/index';
import formConfig from '../config/form.config';

const { saveRef } = component;
const { createForm } = particulate;
const Form = createForm(formConfig);

@connect(
  ({}) => ({}),
  {
    getDetails: action.detail,
    save: action.save,
  }
)
class CategoryEdit extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      dataSource: null,
    };
  }

  async componentDidMount() {
    const {
      match: { params },
      getDetails,
    } = this.props;

    const dataSource = await getDetails(params);
    this.setState({
      dataSource,
    });
  }

  async onSubmit(fields) {
    const {
      pageTitle,
      match: {
        params: { level },
      },
    } = this.props;
    const { dataSource } = this.state;

    await this.props.save({
      ...dataSource,
      ...fields,
      parentId: level.toString() !== '1' ? fields.parentId : 0,
      level,
    });
    this.props.$util.closeAndSwitchRefresh(pageTitle, 'UI分类管理');
  }

  closeEdit() {
    const { pageTitle } = this.props;
    this.props.$util.closeAndSwitch(pageTitle, 'UI分类管理');
  }

  render() {
    const { dataSource } = this.state;
    const {
      match: { params },
    } = this.props;

    if (!dataSource) return null;

    return (
      <PageLayout>
        <Form
          style={{ marginLeft: '30px', width: '60%' }}
          layoutCol="1"
          layout="inline"
          getForm={saveRef(this, 'form')}
          fieldsStore={dataSource}
          rootContext={{ params }}
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

export default CategoryEdit;
