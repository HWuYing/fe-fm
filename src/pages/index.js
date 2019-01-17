import { RouteLoader, RoutePath } from '@applyComponent';

import Login from './Login/containers';
import { MainLayout } from '../layouts';
import Index from './index/containers';
import PageConfig from './PageConfig/Main/container/index';
import PageConfigList from './PageConfig/Main/container/list';
import PageConfigCategoryList from './PageConfigCategory/containers/index';
import PageConfigCategoryEdit from './PageConfigCategory/containers/edit';

const PageConfigEdit = RoutePath('/system/page-config/:id/:pagetype/:type')(PageConfig);
const PageConfigIndex = RoutePath('/system/page-config-list')(PageConfigList);
const PCCList = RoutePath('/system/page-ui-list')(PageConfigCategoryList);
const PCCEdit = RoutePath('/system/page-ui-edit/:id/:type/:level')(PageConfigCategoryEdit);

export { Login, MainLayout, Index, PageConfigIndex, PageConfigEdit, PCCList, PCCEdit };
export * from './User';
export * from './CompanyEdit';
export * from './StoreEdit';
