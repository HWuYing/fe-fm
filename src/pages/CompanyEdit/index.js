import { component } from '@particulate';
import { RoutePath } from '@applyComponent';
import { PAGE_EDIT_TYPE, PROJECT_CONFIG } from '@common/config';
import CompanyEdit from './container';

// 装企管理 资料修改
const EnterpriseEditRoute = RoutePath('/enterprise/edit/:id')(
  component.cloneElement(CompanyEdit, {
    companyType: PROJECT_CONFIG.ENTERPRISE.value,
    editType: PAGE_EDIT_TYPE.EDIT.value,
  })
);

// 装企管理 添加
const EnterpriseAddRoute = RoutePath('/enterprise-manage/add/:id')(
  component.cloneElement(CompanyEdit, {
    companyType: PROJECT_CONFIG.ENTERPRISE.value,
    editType: PAGE_EDIT_TYPE.ADD.value,
  })
);

// 装企管理 编辑
const EnterpriseEditRouteTwo = RoutePath('/enterprise-manage/edit/:id')(
  component.cloneElement(CompanyEdit, {
    companyType: PROJECT_CONFIG.ENTERPRISE.value,
    editType: PAGE_EDIT_TYPE.EDIT.value,
  })
);

// 装企管理 查看
const EnterpriseSeeRoute = RoutePath('/enterprise-manage/see/:id')(
  component.cloneElement(CompanyEdit, {
    companyType: PROJECT_CONFIG.ENTERPRISE.value,
    editType: PAGE_EDIT_TYPE.SEE.value,
  })
);

// 装企管理 审核
const EnterpriseAuditRoute = RoutePath('/enterprise-manage/audit/:id')(
  component.cloneElement(CompanyEdit, {
    companyType: PROJECT_CONFIG.ENTERPRISE.value,
    editType: PAGE_EDIT_TYPE.AUDIT.value,
  })
);


// 服务商管理 资料修改
const ServiceProviderEditRoute = RoutePath('/service-provider/edit/:id')(
  component.cloneElement(CompanyEdit, {
    companyType: PROJECT_CONFIG.SERVICE.value,
    editType: PAGE_EDIT_TYPE.EDIT.value,
  })
);


// 服务商管理 添加
const ServiceProviderAddRoute = RoutePath('/service-provider-manage/add/:id')(
  component.cloneElement(CompanyEdit, {
    companyType: PROJECT_CONFIG.SERVICE.value,
    editType: PAGE_EDIT_TYPE.ADD.value,
  })
);

// 服务商管理 编辑
const ServiceProviderEditRouteTwo = RoutePath('/service-provider-manage/edit/:id')(
  component.cloneElement(CompanyEdit, {
    companyType: PROJECT_CONFIG.SERVICE.value,
    editType: PAGE_EDIT_TYPE.EDIT.value,
  })
);

// 服务商管理 查看
const ServiceProviderSeeRoute = RoutePath('/service-provider-manage/see/:id')(
  component.cloneElement(CompanyEdit, {
    companyType: PROJECT_CONFIG.SERVICE.value,
    editType: PAGE_EDIT_TYPE.SEE.value,
  })
);

// 服务商管理 审核
const ServiceProviderAuditRoute = RoutePath('/service-provider-manage/audit/:id')(
  component.cloneElement(CompanyEdit, {
    companyType: PROJECT_CONFIG.SERVICE.value,
    editType: PAGE_EDIT_TYPE.AUDIT.value,
  })
);
export {
  EnterpriseSeeRoute,
  EnterpriseEditRoute,
  EnterpriseAddRoute,
  EnterpriseAuditRoute,
  EnterpriseEditRouteTwo,

  ServiceProviderAddRoute,
  ServiceProviderEditRoute,
  ServiceProviderAuditRoute,
  ServiceProviderEditRouteTwo,
  ServiceProviderSeeRoute,
};
