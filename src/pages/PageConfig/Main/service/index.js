import { fetch } from '@util';

const { post, get } = fetch;

export const getSelectSku = async (body, httpOptions) =>
  post('/sku/queryPage', { httpOptions, body });

export const getAppSku = async (body, httpOptions) =>
  post('/sku/queryAppPage', { httpOptions, body });

export const getBrands = async (body, httpOptions) =>
  post('/sku/queryBrands', { httpOptions, body });

export const getPlanList = async (body, httpOptions) =>
  post('/plan/queryPage', { httpOptions, body });

export const query = async (body, httpOptions) => post('/pageConfig/list', { httpOptions, body });

export const update = async (body, httpOptions) =>
  post('/pageConfig/update', { httpOptions, body });

export const save = async (body, httpOptions) => post('/pageConfig/save', { httpOptions, body });

export const detail = async (body, httpOptions) =>
  get(`/pageConfig/details/${body}`, { httpOptions });

export const uplower = async (body, httpOptions) =>
  post('/pageConfig/uplower', { httpOptions, body });
