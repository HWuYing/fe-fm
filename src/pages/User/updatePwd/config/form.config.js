import * as rexRules from '@tools';

export default () => {
  return [
    {
      label: '账号',
      entry: {
        key: 'text',
      },
      filedDecorator: {
        key: 'tel',
      },
    }, {
      label: '旧登录密码',
      entry: {
        key: 'input',
        type: 'password',
        placeholder: '请输入旧登录密码',
      },
      filedDecorator: {
        key: 'oldPassword',
        rules: [rexRules.minLength(6)],
      },
    }, {
      label: '新登录密码',
      entry: {
        key: 'input',
        type: 'password',
        placeholder: '请输入新登录密码',
      },
      filedDecorator: {
        key: 'newPassword',
        rules: [rexRules.minLength(6)],
      },
    }, {
      label: '新确认密码',
      entry: {
        key: 'input',
        type: 'password',
        placeholder: '请确认新密码',
      },
      filedDecorator: {
        key: 'confirmPassword',
        rules: [rexRules.minLength(6)],
      },
    }];
};
