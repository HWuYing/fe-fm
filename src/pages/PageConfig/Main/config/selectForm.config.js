import * as rexRules from '@tools';

export default () => {
  return [
    {
      col: 1,
      decorator: [
        {
          label: '组件选择',
          entry: {
            key: 'connectCascader',
            titleName: 'name',
            valueName: 'componentId',
            serviceApi: 'queryPageUICategory',
            storeKey: 'uICategoryEnum',
            mappingTo: 'children',
            labelInValue: true,
          },
          filedDecorator: {
            key: 'componentMap',
            rules: [rexRules.selectRequired],
          },
        },
      ],
    },
  ];
};
