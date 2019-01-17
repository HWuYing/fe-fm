import { RoutePath } from '@applyComponent';
import StoreEdit from './container';

// 门店资料修改
const StoreEditRoute = RoutePath('/store/edit/:id')(StoreEdit);
// 门店编辑
const StoreEditRouteTwo = RoutePath('/store-manage/edit/:id')(StoreEdit);

export {
  StoreEditRoute,
  StoreEditRouteTwo,
}
