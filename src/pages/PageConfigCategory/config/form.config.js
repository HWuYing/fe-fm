import * as rexRules from '@tools';

export default (app, rootContext) => {
  const {
    params: { level },
  } = rootContext;

  return [
    {
      item: {
        label: '组件名称',
      },
      entry: {
        key: 'input',
        placeholder: '请输入',
      },
      filedDecorator: {
        key: 'name',
        rules: [rexRules.inputRequired, rexRules.maxLength(10)],
      },
    },
    {
      item: {
        label: '组件ID',
      },
      entry: {
        key: 'input',
        placeholder: '请输入',
      },
      filedDecorator: {
        key: 'componentId',
        rules: [rexRules.inputRequired, rexRules.maxLength(30)],
      },
    },
    {
      label: '上级分类',
      entry: {
        key: 'connectTreeSelect',
        showSearch: true,
        disabled: true,
        titleName: 'name',
        valueName: 'id',
        serviceApi: 'queryPageUICategory',
        storeKey: 'pageUICategoryEnum',
        mappingTo: 'children',
        treeDefaultExpandAll: true,
        filterOption: (input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
      },
      filedDecorator: {
        key: 'parentId',
        rules: [rexRules.selectRequired],
      },
    },
    ...(level.toString() === '2'
      ? [
          {
            item: {
              label: '配置模版',
            },
            entry: {
              key: 'upload',
            },
            filedDecorator: {
              key: 'image',
              rules: [rexRules.validFileLength(1)],
            },
          },
          {
            item: {
              label: '映射函数',
            },
            entry: {
              key: 'input',
            },
            filedDecorator: {
              key: 'method',
              rules: [],
            },
          },
        ]
      : []),
    {
      item: {
        label: '描述',
      },
      entry: {
        key: 'textArea',
        placeholder: '请输入备注',
        rows: 4,
      },
      filedDecorator: {
        key: 'description',
      },
    },
  ];
};
