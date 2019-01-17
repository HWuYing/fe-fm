import * as rexRules from '@tools';

export default (app, rootContext) => {
  const { title } = rootContext;

  return [
    {
      entry: {
        key: 'cardStyle',
        title,
      },
    },
    {
      label: '显示开关',
      entry: {
        key: 'switch',
      },
      filedDecorator: {
        key: 'isOpen',
        rules: [rexRules.inputRequired],
      },
    },
    {
      label: '标题',
      entry: {
        key: 'input',
      },
      filedDecorator: {
        key: 'title',
        rules: [rexRules.inputRequired],
      },
    },
    {
      label: '状态选择',
      entry: {
        key: 'select',
        children: [
          {
            label: '匹配前',
            value: '1',
          },
          {
            label: '已匹配',
            value: '2',
          },
        ],
      },
      filedDecorator: {
        key: 'matchStatus',
        rules: [rexRules.selectRequired],
      },
    },
    {
      item: {
        label: '限制个数',
      },
      entry: {
        key: 'input',
      },
      filedDecorator: {
        key: 'limit',
        rules: [],
      },
    },
  ];
};
