import * as service from '../service/index';

const namespace = '@user-list-manage';
export const GET_LIST = `${namespace}-GET_LIST`;
export const GET_DETAILS = `${namespace}-GET_DETAILS`;

export const getList = (body, context) => async dispatch => {
  const res = await service.getUserList(body, context);
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
    promise = await service.getUserDetails(body, context).then(res => res.data);
  }
  const data = await promise;
  return data;
};

export const save = (body, context) => async () => {
  const res = await service.save(body, context);
  return res;
};

export const deleteUser = (body, context) => async () => {
  const res = await service.deleteUser(body, context);
  return res;
};

export const getOrgList = (body, context) => async () => {
  const res = await service.orgList(body, context);
  return res;
};
