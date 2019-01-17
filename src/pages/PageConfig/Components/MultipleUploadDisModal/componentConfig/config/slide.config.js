import * as rexRules from '@tools';

export default (app, rootContext) => {
  const { renderCascaderFormItem, renderGoodsSelect } = rootContext;

  return [
    {
      col: 1,
      decorator: [
        {
          label: '上传图片',
          entry: {
            key: 'upload',
            maxLength: 1,
          },
          filedDecorator: {
            key: 'image',
            rules: [rexRules.selectRequired, rexRules.validFileLength(1)],
          },
        },
        {
          entry: () => null,
          render: renderCascaderFormItem,
        },
        {
          entry: () => null,
          render: renderGoodsSelect,
        },
      ],
    },
  ];
};
