const libPath = 'fe-library/lib';

module.exports = {
  resolve: {
    alias: {
      '@util': `${libPath}/util/server`, // path.join(cwd, 'src/util/server'),
    },
  },
};
