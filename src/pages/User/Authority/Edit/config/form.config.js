import * as rexRules from '@tools';

export default (app, rootContext) => {
  const { orgList } = rootContext;
  return [
    {
      label: '角色名称',
      entry: {
        key: 'input',
        placeholder: '请输入角色名',
      },
      filedDecorator: {
        key: 'name',
        rules: [rexRules.inputRequired],
      },
    },
    {
      item: {
        label: '选择组织',
      },
      entry: {
        key: 'treeSelect',
        multiple: true,
        titleName: 'name',
        valueName: 'id',
        children: orgList || [],
        placeholder: '请选择选择组织',
      },
      filedDecorator: {
        key: 'orgIds',
      },
    },
    {
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
