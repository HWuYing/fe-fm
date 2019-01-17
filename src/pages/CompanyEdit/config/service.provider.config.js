import React from 'react';
import { PROJECT_CONFIG, PAGE_EDIT_TYPE } from '@common/config';
import * as rexRules from '@tools';
import { SERVER_COMPANY_TYPE } from '../enum';

export const parseForm = fields => {
  const { region: fieldRegion } = fields;
  const mergeField = fieldRegion.reduce((o, a) => {
    o.region.push(a.id);
    return o;
  }, {
    region: [],
  });
  return {
    ...fields,
    region: mergeField.region.join(','),
  };
};

export default (app, { enumObj }) => {
  const isQuery = enumObj.value === PAGE_EDIT_TYPE.SEE.value;
  const isAudit = enumObj.value === PAGE_EDIT_TYPE.AUDIT.value;
  const isAdd = enumObj.value === PAGE_EDIT_TYPE.ADD.value;
  const authorValidate = (key, value) => {
    let first = true;
    return () => {
      const fieldValue = app.props.form.getFieldsValue()[key];
      const status = fieldValue && fieldValue.toString() === value || first;
      first = false;
      return status;
    }
  };

  return [{
    col: 1,
    decorator: [{
      item: {
        label: '注册手机',
      },
      author: {
        '!system': [PROJECT_CONFIG.SERVICE.platform],
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
      item: {
        label: '相关推荐人',
      },
      entry: {
        col: 3,
        key: 'moreEntry',
        childrenEntry: [{
          entry: {
            key: 'select',
            disabled: !isAdd,
            children: [
              { label: '无', value: '2' },
              { label: '有', value: '1' },
            ],
          },
          filedDecorator: {
            key: 'marketingDirectorFlag',
            initialValue: '2',
          },
        }, {
          author: authorValidate('marketingDirectorFlag', '1'),
          entry: {
            key: 'input',
            disabled: !isAdd,
            placeholder: '请填入营销总监账号',
          },
          filedDecorator: {
            key: 'marketingDirectorTel',
            rules: [rexRules.inputRequired],
          },
        }, {
          author: authorValidate('marketingDirectorFlag', '1'),
          entry: {
            key: 'input',
            disabled: !isAdd,
            placeholder: '请填入分拥比例',
          },
          filedDecorator: {
            key: 'districtRate',
            rules: [rexRules.inputRequired, rexRules.minZoreToMaxOneHundred],
          },
          render: (props, decoratorNode, fileEle, form) => {
            return (
              <div className="flex flex-row">
                <div className="flex-1">
                  {decoratorNode(fileEle({ form }))}
                </div>
                <div style={{ marginLeft: '10px' }}>%</div>
              </div>
            );
          },
        }],
      },
    }, {
      label: '服务商类型',
      entry: {
        key: 'select',
        children: {
          ...SERVER_COMPANY_TYPE,
        },
        placeholder: '请选择服务商类型',
        disabled: !isAdd,
      },
      filedDecorator: {
        key: 'providerType',
        rules: [rexRules.inputRequired],
      },
    }, {
      label: '企业名称',
      entry: {
        key: 'input',
        placeholder: '请输入企业名称',
        disabled: isQuery || isAudit,
      },
      filedDecorator: {
        key: 'name',
        rules: [rexRules.inputRequired],
      },
    }, {
      label: '公司地址',
      entry: {
        col: 2,
        key: 'moreEntry',
        childrenEntry: [{
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
          entry: {
            key: 'input',
            disabled: isQuery || isAudit,
            placeholder: '请输入详细地址',
          },
          filedDecorator: {
            key: 'linkAddress',
          },
        }],
      },
    }, {
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
        maxLength: 1000,
        placeholder: '请输入企业简介',
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
