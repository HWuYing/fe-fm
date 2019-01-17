import * as rexRules from '@tools';

export default (app, rootConext) => {
  const { title, renderSelectPlan } = rootConext;

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
      label: '副标题',
      entry: {
        key: 'input',
      },
      filedDecorator: {
        key: 'subTitle',
        rules: [rexRules.inputRequired],
      },
    },
    {
      label: '更多链接',
      entry: {
        key: 'input',
      },
      filedDecorator: {
        key: 'moreUrl',
        rules: [],
      },
    },
    {
      label: '更多标题',
      entry: {
        key: 'input',
      },
      filedDecorator: {
        key: 'moreTitle',
        rules: [],
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
    {
      entry: () => null,
      render: renderSelectPlan,
    },
  ];
};
