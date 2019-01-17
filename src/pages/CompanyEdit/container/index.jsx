import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message, Button } from 'antd';
import { reducer } from '@applyStore';
import { particulate, Authorized, RejectModal } from '@components';
import { BasicPage } from '@pageModel';
import { component } from '@particulate';
import { PAGE_EDIT_TYPE, PROJECT_CONFIG } from '@common/config';
import { COMPANY_STATUS } from '../enum';
import { reducers, action } from '../store';
import formConfig from '../config/form.config';

const { saveRef } = component;
const { createForm } = particulate;

@connect(() => ({}), {
  saveDecor: action.saveDecor,
  saveProvider: action.saveProvider,
  getDetailDecor: action.getDetailDecor,
  getDetailProvider: action.getDetailProvider,
  changeCompanyStatus: action.changeCompanyStatus,
})
@reducer('companyManage', reducers)
class MenuEdit extends Component {
  constructor(props, context) {
    super(props, context);
    const { editType, companyType } = props;
    const config = formConfig(companyType);
    this.enumObj = PAGE_EDIT_TYPE[Object.keys(PAGE_EDIT_TYPE).filter((key) => PAGE_EDIT_TYPE[key].value === editType)[0]];
    this.Page = BasicPage(createForm(config.formConfig, config.parseForm, {
      author: {
        companyType,
      },
    }), {
      style: { marginRight: '20%' },
    });
    this.state = {
      details: {},
    };
  }

  componentDidMount() {
    const {  match: { params } } = this.props;
    this.getAction().getDetail(params).then(({ data }) => {
      const detail = this.parseDetails(data);
      this.setState({
        details: detail,
      }, () => {
        if (this.form) this.form.setFormFieldsValue(detail);
      });
    });
  }

  async onSubmit(fields) {
    const { $util: { closeAndSwitchRefresh }, pageTitle, fromMenu: {
      fromTitle,
    }={}} = this.props;
    const { details } = this.state;
    const { resultMsg } = await this.getAction().save({
      ...details,
      ...fields,
    });
    message.success(resultMsg);
    closeAndSwitchRefresh(pageTitle, fromTitle);
  }

  async onStatusFlag(statusFlag, mergeFields) {
    const { changeCompanyStatus, $util: { closeAndSwitchRefresh }, pageTitle, fromMenu: {
      fromTitle,
    } = {}} = this.props;
    const { details } = this.state;
    const { resultMsg } = await changeCompanyStatus({
      id: details.id,
      statusFlag,
      ...mergeFields,
    });
    message.success(resultMsg);
    closeAndSwitchRefresh(pageTitle, fromTitle);
  }

  onClose() {
    const { $util: { closeAndSwitch }, pageTitle, fromMenu: {
      fromTitle,
    } = {}} = this.props;
    closeAndSwitch(pageTitle, fromTitle);
  }

  getAction() {
    const { saveDecor, saveProvider, getDetailDecor, getDetailProvider, companyType } = this.props;
    let save;
    let getDetail;
    switch (companyType) {
      case PROJECT_CONFIG.ENTERPRISE.value: getDetail=getDetailDecor; save = saveDecor; break;
      case PROJECT_CONFIG.SERVICE.value: getDetail = getDetailProvider; save = saveProvider;break;
      default: break;
    }
    return {
      save,
      getDetail,
    };
  }

  parseDetails = detail => {
    return {
      ...detail,
      region: detail.region ? detail.region.split(',').map(val => ({
        id: val,
      })) : [],
    };
  };

  render() {
    const { companyType } = this.props;
    const { details } = this.state;
    const { enumObj, Page } = this;
    return (
      <Page
        layout="inline"
        fieldsStore={details}
        getForm={saveRef(this, 'form')}
        rootContext={{ enumObj }}
        onSubmit={(...arg) => this.onSubmit(...arg)}
      >
        <Authorized target="div" style={{textAlign: 'center'}} author={{ companyType, type: enumObj.value }}>
          <Button style={{marginRight: '10px'}} onClick={() => this.onClose()}>返回</Button>
          <Button
            author={{
              '!system': PROJECT_CONFIG.ERP.platform,
              '!type': [
                PAGE_EDIT_TYPE.SEE.value,
                PAGE_EDIT_TYPE.AUDIT.value,
              ],
            }}
            type="primary"
            onClick={() => this.form.onSubmit()}
          >
            保存
          </Button>
          <Button
            type="primary"
            style={{marginRight: '10px'}}
            author={{
              system: PROJECT_CONFIG.ERP.platform,
              type: PAGE_EDIT_TYPE.AUDIT.value,
            }}
            onClick={() => this.onStatusFlag(COMPANY_STATUS.THROUGH_AUDIT.value)}
          >
            审核通过
          </Button>
          <RejectModal
            author={{
              type: PAGE_EDIT_TYPE.AUDIT.value,
              system: PROJECT_CONFIG.ERP.platform,
            }}
            title="拒绝审核"
            style={{marginRight: '10px'}}
            refusalKey="failReason"
            onConfirm={(fields) => this.onStatusFlag(COMPANY_STATUS.FAILURE_AUDIT.value, fields)}
          >
            <Button type="primary">审核不通过</Button>
          </RejectModal>
        </Authorized>
      </Page>
    );
  }
}

export default MenuEdit;
