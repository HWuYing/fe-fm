import * as service from '../service/index';

const namespace = '@user-authority-manage';
export const GET_LIST = `${namespace}-GET_LIST`;
export const GET_DETAILS = `${namespace}-GET_DETAILS`;

export const getList = (body, context) => async dispatch => {
  const res = await service.getAuthorList(body, context);
  const { data, total } = res;
  dispatch({
    type: GET_LIST,
    payload: {
      data,
      total,
    },
  });
  return res;
};

export const getDetails = (body, context) => async () => {
  const { id } = body;
  let promise = Promise.resolve({});
  if (id.toString() !== '0') {
    promise = await service.getAuthorDetails(body, context).then(res => res.data);
  }
  const data = await promise;
  return data;
};

export const save = (body, context) => async () => {
  const res = await service.save(body, context);
  return res;
};

export const deleteRol = (body, context) => async () => {
  const res = await service.deleteRol(body, context);
  return res;
};

export const getAuthMenuList = (body, context) => async () => {
  const res = await service.authMenuList(body, context);
  return res;
};

export const getOrgList = (body, context) => async () => {
  const res = await service.orgList(body, context);
  return res;
};
