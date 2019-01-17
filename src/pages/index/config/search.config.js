export default [
  {
    col: 2,
    decorator: [
      {
        item: {
          label: '门店名称',
          layoutSpan: 16,
        },
        entry: { key: 'input' },
        filedDecorator: { key: 'shopName' },
      },
      {
        author: 'WANQIAN_SYSTEM',
        label: '门店等级',
        entry: {
          key: 'select',
          children: [{ label: 'A+', value: 'A+' }],
        },
        filedDecorator: { key: 'level' },
      },
    ],
  },
  {
    col: 3,
    decorator: [
      {
        label: '用户状态',
        entry: {
          key: 'select',
          children: [],
        },
        filedDecorator: { key: 'statusFlag' },
      },
      {
        label: '电话号码',
        entry: {
          key: 'select',
          children: [],
        },
        filedDecorator: { key: 'tel' },
      },
    ],
  },
];
