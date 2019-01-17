const libPath = "fe-library/lib";

module.exports = {
  resolve: {
    alias: {
      'node-fetch': 'whatwg-fetch',
      '@util': `${libPath}/util/client`, // path.join(cwd, 'src/util/client'),
    },
  },
};
