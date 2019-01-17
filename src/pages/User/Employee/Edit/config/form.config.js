import * as rexRules from '@tools';

export default (app, rootContext) => {
  const { orgList } = rootContext;
  return [
    {
      label: '昵称',
      entry: {
        key: 'input',
        placeholder: '请输入用户昵称',
      },
      filedDecorator: {
        key: 'nickName',
        rules: [rexRules.minLength(2)],
      },
    }, {
      label: '用户名',
      entry: {
        key: 'input',
        maxLength: '11',
        placeholder: '请输入用户名',
      },
      filedDecorator: {
        key: 'tel',
        rules: [rexRules.inputRequired, rexRules.phone],
      },
    }, {
      label: '用户密码',
      entry: {
        key: 'input',
        maxLength: '6',
        placeholder: '请输入用户密码',
      },
      filedDecorator: {
        key: 'password',
        rules: [rexRules.inputRequired, rexRules.minLength(6)],
      },
    }, {
      label: '用户邮箱',
      entry: {
        key: 'input',
        type: 'email',
        placeholder: '请输入用户邮箱',
      },
      filedDecorator: {
        key: 'email',
        rules: [rexRules.email],
      },
    }, {
      item: {
        label: '用户机构',
      },
      entry: {
        key: 'treeSelect',
        titleName: 'name',
        valueName: 'id',
        placeholder: '请选择机构',
        children: orgList || [],
      },
      filedDecorator: {
        key: 'orgId',
        rules: [rexRules.selectRequired],
      },
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
    }, {
      label: '发送渠道',
      entry: {
        key: 'radioGroup',
        children: [
          { label: '不发送', value: 1 },
          { label: '短信', value: 2 },
        ],
      },
      filedDecorator: {
        key: 'notifyChannel',
        initialValue: '1',
      },
    },
  ];
};
