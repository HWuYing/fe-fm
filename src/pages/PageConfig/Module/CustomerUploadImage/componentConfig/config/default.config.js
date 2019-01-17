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
