import { fetch } from '@util';

const { post, get } = fetch;

export const saveDecor = async (body, context) => post('/decor/save', { body, context });

export const saveProvider = async (body, context) => post('/provider/save', { body, context });

export const getDetailDecor = async (body, context) => {
  const { id } = body;
  if (!id || id.toString() === '0') return { data: {} };
  return get(`/decor/detail/${body.id}`, { context });
};

export const getDetailProvider = async (body, context) => {
  const { id } = body;
  if (!id || id.toString() === '0') return { data: {} };
  return get(`/provider/detail/${body.id}`, { context });
};

export const getDecorList = async (body, context) => post('/decor/list', { body, context });

export const getProviderList = async (body, context) => post('/provider/list', { body, context });

export const companyChgStatus = async (body, context) => post('/company/chgStatus', { body, context });

export const openDistribute = async (body, context) => post('/company/distribute/open', { body, context });

export const closeDistribute = async (body, context) => post('/company/distribute/close', { body, context });
