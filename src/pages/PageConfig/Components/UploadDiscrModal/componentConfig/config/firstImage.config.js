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
          item: {
            label: '图片渲染宽',
          },
          entry: {
            key: 'input',
          },
          filedDecorator: {
            key: 'width',
            rules: [],
          },
        },
        {
          item: {
            label: '图片渲染高',
          },
          entry: {
            key: 'input',
          },
          filedDecorator: {
            key: 'height',
            rules: [],
          },
        },
      ],
    },
  ];
};
