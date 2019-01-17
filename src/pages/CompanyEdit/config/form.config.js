import { PROJECT_CONFIG } from '@common/config';
import serviceConfig from './service.provider.config';
import enterpriseConfig, { parseForm as enterParseForm } from './enterprise.config';

export default (CompanyType) => {
  let formConfig = [];
  switch (CompanyType) {
    case PROJECT_CONFIG.ENTERPRISE.value: formConfig = enterpriseConfig; break;
    case PROJECT_CONFIG.SERVICE.value: formConfig = serviceConfig; break;
    default: break;
  }
  return {
    formConfig,
    parseForm: enterParseForm,
  };
};
