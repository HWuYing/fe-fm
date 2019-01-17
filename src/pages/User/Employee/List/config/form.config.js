import { PROJECT_CONFIG } from '@common/config';
import { USER_TYPE } from '../../../config/enum.config';

export default () => [
  {
    label: '联系电话',
    entry: {
      key: 'input',
      placeholder: '请输入联系电话',
    },
    filedDecorator: {
      key: 'tel',
    },
  }, {
    label: '用户类型',
    author: {
      system: PROJECT_CONFIG.ERP.platform,
    },
    entry: {
      key: 'select',
      children: {
        ALL: { label: '全部', value: '' },
        ...USER_TYPE,
      },
      placeholder: '请选择用户类型',
    },
    filedDecorator: {
      key: 'userType',
    },
  },
];
