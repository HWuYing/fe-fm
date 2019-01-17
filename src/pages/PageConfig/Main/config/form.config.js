import * as rexRules from '@tools';

export default (app, rootContext) => {
  const { type } = rootContext;

  return [
    {
      col: 1,
      decorator: [
        {
          label: '页面别名',
          entry: {
            key: 'input',
            disabled: type.toString() === '2',
          },
          filedDecorator: {
            key: 'alias',
            rules: [rexRules.inputRequired],
          },
        },
      ],
    },
  ];
};
