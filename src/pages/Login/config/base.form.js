import React from 'react';
import { Icon } from 'antd';

const layout = {
  labelCol: null,
  wrapperCol: null,
};

export default (form, { styles }) => {
  return [
    {
      item: layout,
      entry: {
        key: 'input',
        size: 'large',
        placeholder: '输入您的手机号',
        prefix: <Icon type="user" className={styles['input-icon']} />,
      },
      filedDecorator: {
        key: 'tel',
        rules: [
          {
            required: true,
            message: '用户名不能为空!',
          },
        ],
      },
    },
    {
      item: layout,
      entry: {
        key: 'input',
        type: 'password',
        size: 'large',
        placeholder: '输入密码',
        prefix: <Icon type="lock" className={styles['input-icon']} />,
      },
      filedDecorator: {
        key: 'password',
        rules: [
          {
            required: true,
            message: '密码不能为空!',
          },
        ],
      },
    },
  ];
};
