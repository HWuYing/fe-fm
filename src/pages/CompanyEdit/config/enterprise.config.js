import { PROJECT_CONFIG, PAGE_EDIT_TYPE } from '@common/config';
import * as rexRules from '@tools';
import { COMPANY_LEVEL } from '../enum';

export const parseForm = fields => {
  const { region:fieldRegion } = fields;
  const mergeField = fieldRegion.reduce((o, a) => {
    o.region.push(a.id);
    o.linkAddress.push(a.name);
    return o;
  }, {
    region: [],
    linkAddress: [],
  });
  return {
    ...fields,
    region: mergeField.region.join(','),
    linkAddress: mergeField.linkAddress.join(''),
  };
};

export default (app, { enumObj }) => {
  const isQuery = enumObj.value === PAGE_EDIT_TYPE.SEE.value;
  const isAudit = enumObj.value === PAGE_EDIT_TYPE.AUDIT.value;
  const isAdd = enumObj.value === PAGE_EDIT_TYPE.ADD.value;
  return [{
    col: 2,
    decorator: [{
      item: {
        label: '注册手机',
      },
      author: {
        '!system': [PROJECT_CONFIG.ENTERPRISE.platform],
      },
      entry: {
        key: 'input',
        disabled: !isAdd,
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
        disabled: !isAdd,
      },
      filedDecorator: {
        key: 'name',
        rules: [rexRules.inputRequired],
      },
    }, {
      label: '企业等级',
      entry: {
        key: 'select',
        children: {
          ...COMPANY_LEVEL,
        },
        placeholder: '请输入企业名称',
        disabled: !isAdd,
      },
      filedDecorator: {
        key: 'companyLevel',
        rules: [rexRules.inputRequired],
      },
    }, {
      label: '企业地址',
      entry: {
        key: 'regionCascader',
        disabled: isQuery || isAudit,
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
        disabled: isQuery || isAudit,
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
        disabled: isQuery || isAudit,
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
        disabled: isQuery || isAudit,
      },
      filedDecorator: { key: 'taxpayerIdentityNumber' },
    }, {
      label: '开户行',
      entry: {
        key: 'input',
        placeholder: '请输入开户行',
        disabled: isQuery || isAudit,
      },
      filedDecorator: { key: 'bank' },
    }, {
      item: {
        label: '银行账号',
      },
      entry: {
        key: 'input',
        placeholder: '请输入银行账号',
        disabled: isQuery || isAudit,
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
        ...(isQuery || isAudit ? {
          maxLength: -1,
        } : {}),
      },
      filedDecorator: {
        key: 'businessLicence',
        rules: [rexRules.validFileLength(6), rexRules.inputRequired],
      },
    }, {
      label: '企业简介',
      entry: {
        key: 'textArea',
        placeholder: '请输入门店简介',
        disabled: isQuery || isAudit,
        rows: 4,
      },
      filedDecorator: { key: 'description' },
    }, {
      label: '账号状态',
      author: [{
        system: [
          PROJECT_CONFIG.ERP.platform,
          PROJECT_CONFIG.STORE.platform,
        ],
      }],
      entry: {
        key: 'switch',
        disabled: isQuery,
        checkedChildren: '开',
        unCheckedChildren: '关',
      },
      filedDecorator: {
        key: 'accountStatusFlag',
        initialValue: 1,
      },
    }],
  }];
};
