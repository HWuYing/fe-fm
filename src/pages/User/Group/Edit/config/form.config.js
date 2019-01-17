import * as rexRules from '@tools';
import { PROJECT_CONFIG } from '@common/config';
import { ORDER_TYPE } from '../../../config/enum.config';

export default (app, rootContext) => {
  const { isEdit, isChildren } = rootContext;
  const disable = isEdit || isChildren;
  return [
    {
      label: '组织类型',
      entry: {
        key: 'select',
        disabled: isEdit || isChildren,
        placeholder: '请选择组织类型',
        children: Object.keys(ORDER_TYPE).reduce((o, key) => Object.assign(o, !disable && key === 'IN_COMPANY' ? {} : {
          [key]: ORDER_TYPE[key],
        }), {}),
      },
      filedDecorator: {
        key: 'orgType',
        rules: [rexRules.selectRequired],
      },
    }, {
      label: '组织名称',
      entry: {
        key: 'input',
        maxLength: '11',
        placeholder: '请输入组织名称',
      },
      filedDecorator: {
        key: 'name',
        rules: [rexRules.inputRequired],
      },
    }, {
      label: '组织别名',
      entry: {
        key: 'input',
        maxLength: '11',
        placeholder: '请输入组织别名',
      },
      filedDecorator: {
        key: 'alias',
        rules: [rexRules.inputRequired],
      },
      author: PROJECT_CONFIG.ERP.platform,
    }, {
      label: '联系人',
      entry: {
        key: 'input',
        maxLength: '11',
        placeholder: '请输入联系人',
      },
      filedDecorator: {
        key: 'linkMan',
        rules: [rexRules.inputRequired, rexRules.minLength(2)],
      },
      author: PROJECT_CONFIG.ERP.platform,
    }, {
      label: '联系电话',
      entry: {
        key: 'input',
        maxLength: '11',
        placeholder: '请输入联系电话',
      },
      filedDecorator: {
        key: 'linkTel',
        rules: [rexRules.inputRequired, rexRules.phone],
      },
    }, {
      label: '联系地址',
      entry: {
        key: 'input',
        maxLength: '11',
        placeholder: '请输入联系地址',
      },
      filedDecorator: {
        key: 'linkAddress',
        rules: [rexRules.inputRequired],
      },
      author: PROJECT_CONFIG.ERP.platform,
    }, {
      item: {
        label: '状态',
      },
      entry: {
        key: 'switch',
        checkedChildren: '开',
        unCheckedChildren: '关',
      },
      filedDecorator: {
        key: 'statusFlag',
        initialValue: 1,
      },
    },
  ];
};
