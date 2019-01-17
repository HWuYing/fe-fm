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
          label: '跳转链接',
          entry: {
            key: 'input',
          },
          filedDecorator: {
            key: 'url',
            rules: [rexRules.inputRequired],
          },
        },
      ],
    },
  ];
};
