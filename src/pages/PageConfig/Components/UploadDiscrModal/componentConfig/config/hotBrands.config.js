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
          label: '品牌名称',
          entry: {
            key: 'input',
            disabled: true,
          },
          filedDecorator: {
            key: 'name',
            rules: [rexRules.inputRequired],
          },
        },
      ],
    },
  ];
};
