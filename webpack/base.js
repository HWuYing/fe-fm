const path = require('path');

const cwd = process.cwd();
const libPath = 'fe-library/lib';

module.exports = {
  resolve: {
    alias: {
      '@enumGlobal': `${libPath}/enumGlobal`,
      '@libCommon': `${libPath}/common`,
      '@libGlobal': `${libPath}/global`,
      '@asyncModule': `${libPath}/util/tools/asyncModule`,
      '@core': `${libPath}/core`,
      '@mixin': `${libPath}/util/mixin`, // path.join(cwd, 'src/util/mixin'),
      '@common': path.join(cwd, 'src/common'),
      '@globalModel': path.join(cwd, 'src/global'),
      '@assets': path.join(cwd, 'src/assets'),
      '@particulate': `${libPath}/util/particulate`, // path.join(cwd, 'src/util/particulate'),
      '@fetch': `${libPath}/util/fetch`, // path.join(cwd, 'src/util/fetch'),
      '@tools': `${libPath}/util/tools`, // path.join(cwd, 'src/util/tools'),
      '@model': `${libPath}/model`,
      '@pages': path.join(cwd, 'src/pages'),
      '@modalModel': `${libPath}/modalModel`, // path.join(cwd, 'src/pageModel'),
      '@pageModel': `${libPath}/pageModel`, // path.join(cwd, 'src/pageModel'),
      '@components': `${libPath}/components`, // path.join(cwd, 'src/components'),
      '@layouts': `${libPath}/layouts`, // path.join(cwd, 'src/layouts'),
      '@applyStore': `${libPath}/util/applyStore`, // path.join(cwd, 'src/util/applyStore'),
      '@applyComponent': `${libPath}/util/applyComponent`, // path.join(cwd, 'src/util/applyComponent'),
    },
  },
};
