import { RoutePath } from '@applyComponent';
import MenuList from './Menu/List/containers';
import MenuEdit from './Menu/Edit/containers';
import GroupList from './Group/List/containers';
import GroupEdit from './Group/Edit/containers';
import EmployeeList from './Employee/List/containers';
import EmployeeEdit from './Employee/Edit/containers';
import AuthorityList from './Authority/List/containers/index';
import AuthorityEdit from './Authority/Edit/containers/index';
import UpdatePwd from './updatePwd/containers';

const AuthorListRoute = RoutePath('/user-manage/authority-list')(AuthorityList);
const AuthorEditRoute = RoutePath('/user-manage/authority-edit/:id')(AuthorityEdit);
const EmployeeListRoute = RoutePath('/user-manage/user-list')(EmployeeList);
const EmployeeEditRoute = RoutePath('/user-manage/user-edit/:id')(EmployeeEdit);
const GroupListRoute = RoutePath('/user-manage/group-list')(GroupList);
const GroupEditRoute = RoutePath('/user-manage/group-edit/:id/:parent/:orgType')(GroupEdit);
const MenuListRoute = RoutePath('/user-manage/menu-list')(MenuList);
const MenuEditRoute = RoutePath('/user-manage/menu-edit/:parent/:id/:menuType')(MenuEdit);
// 登录用户修改密码
const UpdatePwdRoute = RoutePath('/user-manage/update-pwd')(UpdatePwd);

export {
  AuthorListRoute,
  AuthorEditRoute,
  EmployeeListRoute,
  EmployeeEditRoute,
  GroupListRoute,
  GroupEditRoute,
  MenuListRoute,
  MenuEditRoute,
  UpdatePwdRoute,
};
