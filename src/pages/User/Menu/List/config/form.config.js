import { PROJECT_CONFIG } from '@common/config';

export default (app, context) => {
  const { search: { menuType } } = context;
  return [{
    item: {
      label: '系统分类',
    },
    entry: {
      key: 'select',
      children: PROJECT_CONFIG,
      placeholder: '请选择系统分类',
    },
    filedDecorator: {
      key: 'menuType',
      initialValue: menuType,
    },
  }];
}
