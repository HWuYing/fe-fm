export default [
  {
    col: 2,
    decorator: [
      {
        label: '预算区间',
        entry: {
          key: 'connectSelect',
          labelName: 'name',
          valueName: 'id',
          placeholder: '请选择',
          serviceApi: 'queryBudgetArea',
          storeKey: 'housingBudgetArea',
          mappingTo: 'children',
        },
        filedDecorator: {
          key: 'budgetId',
        },
      },
      {
        label: '方案风格',
        entry: {
          key: 'connectSelect',
          labelName: 'name',
          valueName: 'id',
          placeholder: '请选择',
          serviceApi: 'queryHousingStyle',
          storeKey: 'housingStyle',
          mappingTo: 'children',
        },
        filedDecorator: {
          key: 'styleId',
        },
      },
      {
        item: {
          label: '方案名称',
        },
        entry: {
          key: 'input',
          placeholder: '请输入',
        },
        filedDecorator: { key: 'name' },
      },
    ],
  },
];
