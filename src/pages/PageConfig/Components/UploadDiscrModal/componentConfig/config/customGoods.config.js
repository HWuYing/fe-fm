import * as rexRules from '@tools';

export default () => {
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
          label: '商品标题',
          entry: {
            key: 'input',
          },
          filedDecorator: {
            key: 'title',
            rules: [rexRules.inputRequired],
          },
        },
      ],
    },
  ];
};
