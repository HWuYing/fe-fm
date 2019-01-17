import * as service from '../service/index';

const namespace='fe-company-manage';

export const SAVE_DECOR = `${namespace}SAVE_DECOR`;
export const DETAIL_DECOR = `${namespace}DETAIL_DECOR`;
export const GET_DECOR_LIST = `${namespace}GET_DECOR_LIST`;
export const GET_PROVIDER_LIST = `${namespace}GET_PROVIDER_LIST`;
export const CHANGE_COMPANY_STATUS = `${namespace}CHANGE_COMPANY_STATUS`;
export const GET_INVITATION_CODE = `${namespace}GET_INVITATION_CODE`;

export const saveDecor = (body, context) => async () => {
  const result = await service.saveDecor(body, context);
  return result;
};

export const saveProvider = (body, context) => async () => {
  const result = await service.saveProvider(body, context);
  return result;
};

export const getDetailDecor = (body, context) => async () => {
  const result = await service.getDetailDecor(body, context);
  return result;
};

export const getDetailProvider = (body, context) => async () => {
  const result = await service.getDetailProvider(body, context);
  return result;
};

export const changeCompanyStatus = (body, context) => async () => {
  const result = await service.companyChgStatus(body, context);
  return result;
};
