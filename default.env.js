const processEnv = process.env;

const defaultEnv = {
  admin: {
    __PORT__: 3000,
    __PLATFORM__: 'ADMIN_SYSTEM',
    __SYSTEM_NAME__: '平台管理系统',
  },
  decor: {
    __PORT__: 3001,
    __PLATFORM__: 'DECOR_SYSTEM',
    __SYSTEM_NAME__: '装企管理系统',
  },
  store: {
    __PORT__: 3002,
    __PLATFORM__: 'STORE_SYSTEM',
    __SYSTEM_NAME__: '运营商管理系统',
  },
  service: {
    __PORT__: 3003,
    __PLATFORM__: 'PROVIDER_SYSTEM',
    __SYSTEM_NAME__: '服务商管理系统',
  },
}[processEnv.systemFE || 'admin'];

module.exports = {
  __JAVA_HOST__: 'http://192.168.122.171:8080', // http://testerp.wanqian.store/erp/', // java api地址
  __PORT__: 3000, // 服务器监听端口
  REDIS_HOST: 'localhost', // redis服务器地址
  REDIS_PORT: 6379, // redis 服务器端口
  __API_VERSION__: 1, // api版本
  __PLATFORM__: 'ADMIN_SYSTEM', // 系统分类 平台管理 ADMIN_SYSTEM 装企 DECOR_SYSTEM ；门店 STORE_SYSTEM
  __SYSTEM_NAME__: '平台管理系统',
  ...defaultEnv,
};
