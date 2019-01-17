import * as service from '../service/index';

export const getSelectSkuList = (param, httpOptions) => async () => {
  const res = await service.getSelectSku(param, httpOptions);
  const { data, total } = res;

  return { data, total };
};

export const getAppSkuList = (param, httpOptions) => async () => {
  const res = await service.getAppSku(param, httpOptions);
  return res;
};

export const getSkuBrands = (param, httpOptions) => async () => {
  const res = await service.getBrands(param, httpOptions);
  return res;
};

export const getPlan = (param, httpOptions) => async () => {
  const res = await service.getPlanList(param, httpOptions);
  const { data, total } = res;

  return { data, total };
};

export const getList = (param, httpOptions) => async () => {
  const res = await service.query(param, httpOptions);
  return res;
};

export const update = (param, httpOptions) => async () => {
  const res = await service.update(param, httpOptions);
  return res;
};

export const uplower = (param, httpOptions) => async () => {
  const res = await service.uplower(param, httpOptions);
  return res;
};

export const save = (param, httpOptions) => async () => {
  const res = await service.save(param, httpOptions);
  return res;
};

export const detail = (param, httpOptions) => async () => {
  const res = await service.detail(param, httpOptions);
  const { data } = res;

  return data;
};
