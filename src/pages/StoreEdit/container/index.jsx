import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message, Button } from 'antd';
import { reducer } from '@applyStore';
import { particulate, Authorized } from '@components';
import { BasicPage } from '@pageModel';
import { getQueryKey } from '@tools';
import { component } from '@particulate';
import { PAGE_EDIT_TYPE } from '@common/config';
import { reducers, action } from '../store';
import formConfig from '../config/form.config';

const { saveRef } = component;
const { createForm } = particulate;
const Page = BasicPage(createForm(formConfig), {
  style: { marginRight: '20%' },
});

@connect(({ storeManage: { storeDetail } }) => ({ details: storeDetail }), {
  saveStore: action.save,
  getDetail: action.getDetail,
})
@reducer('storeManage', reducers)
class MenuEdit extends Component {
  constructor(props, context) {
    super(props, context);
    const { location: { search } } = props;
    const enumValue = getQueryKey(search, 'type');
    this.enumObj = PAGE_EDIT_TYPE[Object.keys(PAGE_EDIT_TYPE).filter((key) => PAGE_EDIT_TYPE[key].value === enumValue)[0]];
  }

  componentDidMount() {
    const {  match: { params }, getDetail } = this.props;
    getDetail(params);
  }

  async onSubmit(fields) {
    const { details, saveStore, $util: { closeAndSwitchRefresh }, pageTitle, fromMenu: {
      fromTitle='',
    }={}} = this.props;
    const { region:fieldRegion } = fields;
    const mergeField = fieldRegion.reduce((o, a) => {
      o.region.push(a.id);
      o.linkAddress.push(a.name);
      return o;
    }, {
      region: [],
      linkAddress: [],
    });
    const { resultMsg } = await saveStore({
      ...details,
      ...fields,
      region: mergeField.region.join(','),
      linkAddress: mergeField.linkAddress.join(''),
    });
    message.success(resultMsg);
    closeAndSwitchRefresh(pageTitle, fromTitle);
  }

  onClose() {
    const { $util: { closeAndSwitch }, pageTitle, fromMenu: {
      fromTitle='',
    }={}} = this.props;
    closeAndSwitch(pageTitle, fromTitle);
  }

  render() {
    const { details } = this.props;
    const { enumObj } = this;
    const fieldsStore = {
      ...details,
      region: details.region ? details.region.split(',').map(val => ({
        id: val,
      })) : [],
    };
    return (
      <Page
        layout="inline"
        fieldsStore={fieldsStore}
        getForm={saveRef(this, 'form')}
        rootContext={{ enumObj }}
        onSubmit={(...arg) => this.onSubmit(...arg)}
      >
        <Authorized target="div" style={{textAlign: 'center'}} author={{enumValue: enumObj.value}}>
          <Button style={{marginRight: '10px'}} onClick={() => this.onClose()}>返回</Button>
          <Button
            author={{
              '!enumValue': PAGE_EDIT_TYPE.SEE.value,
            }}
            type="primary"
            onClick={() => this.form.onSubmit()}
          >
            保存
          </Button>
        </Authorized>
      </Page>
    );
  }
}

export default MenuEdit;
