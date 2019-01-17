module.exports = {
  'apps': [{
    name: 'fe-erp',
    script: './build/server.js',
    env: {
      NODE_ENV: 'production',
    },
    instances: '1',
    exp_backoff_restart_delay: '20',
    max_memory_restart: '1G',
  }],
};
