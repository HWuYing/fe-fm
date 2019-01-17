import { PROJECT_CONFIG } from '@common/config';
import * as rexRules from '@tools';
import { LEVEL, EDIT_TYPE } from '../enum';

export default (app, { enumObj }) => {
  const isQuery = enumObj.value === EDIT_TYPE.SEE.value;
  const isEdit = enumObj.value === EDIT_TYPE.EDIT.value;
  return [{
    col: 2,
    decorator: [{
      item: {
        label: '注册手机',
      },
      author: PROJECT_CONFIG.ERP.platform,
      entry: {
        key: 'input',
        disabled: isQuery || isEdit,
        placeholder: '请输入手机号码',
      },
      filedDecorator: {
        key: 'tel',
        rules: [rexRules.inputRequired, rexRules.mobile],
      },
    }, {
      label: '企业名称',
      entry: {
        key: 'input',
        placeholder: '请输入企业名称',
        disabled: isQuery || isEdit,
      },
      filedDecorator: {
        key: 'name',
        rules: [rexRules.inputRequired],
      },
    }, {
      label: '门店等级',
      entry: {
        key: 'select',
        placeholder: '请选择门店等级',
        disabled: true,
        children: LEVEL,
      },
      filedDecorator: {
        key: 'companyLevel',
        initialValue: LEVEL.B.value,
        rules: [rexRules.selectRequired],
      },
    }, {
      label: '门店名称',
      entry: {
        key: 'input',
        placeholder: '请输入门店名称',
        disabled: isQuery,
      },
      filedDecorator: {
        key: 'shopName',
        rules: [rexRules.inputRequired],
      },
    }, {
      label: '公司地址',
      entry: {
        key: 'regionCascader',
        disabled: isQuery,
        changeOnSelect: true,
        titleName: 'name',
        valueName: 'id',
        labelInValue: true,
        placeholder: '请选择公司地址',
      },
      filedDecorator: {
        key: 'region',
        rules: [rexRules.selectRequired],
      },
    }, {
      label: '联系人',
      entry: {
        key: 'input',
        placeholder: '请输入联系姓名',
        disabled: isQuery,
      },
      filedDecorator: {
        key: 'linkMan',
        rules: [rexRules.inputRequired],
      },
    }, {
      label: '联系电话',
      entry: {
        key: 'input',
        placeholder: '请输入联系电话',
        disabled: isQuery,
      },
      filedDecorator: {
        key: 'linkTel',
        rules: [rexRules.inputRequired, rexRules.mobile],
      },
    }, {
      item: {
        label: '纳税人识别号',
      },
      entry: {
        key: 'input',
        placeholder: '请输入纳税人识别号',
        disabled: isQuery,
      },
      filedDecorator: { key: 'taxpayerIdentityNumber' },
    }, {
      label: '开户行',
      entry: {
        key: 'input',
        placeholder: '请输入开户行',
        disabled: isQuery,
      },
      filedDecorator: { key: 'bank' },
    }, {
      item: {
        label: '银行账号',
      },
      entry: {
        key: 'input',
        placeholder: '请输入银行账号',
        disabled: isQuery,
      },
      filedDecorator: { key: 'bankNumber' },
    }],
  }, {
    col: 1,
    decorator: [{
      item: {
        label: '营业执照',
        layoutSpan: 16,
      },
      entry: {
        key: 'upload',
        ...(isQuery ? {
          maxLength: -1,
        } : {}),
      },
      filedDecorator: { key: 'businessLicence' },
    }, {
      label: '门店简介',
      entry: {
        key: 'textArea',
        placeholder: '请输入门店简介',
        disabled: isQuery,
        rows: 4,
      },
      filedDecorator: { key: 'description' },
    }, {
      label: '状态',
      author: PROJECT_CONFIG.ERP.platform,
      entry: {
        key: 'switch',
        disabled: isQuery,
        checkedChildren: '开',
        unCheckedChildren: '关',
      },
      filedDecorator: {
        key: 'statusFlag',
        initialValue: 1,
      },
    }],
  }];
};
