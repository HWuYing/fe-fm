import * as service from '../service/index';

const namespace = '@user-group-manage';
export const GET_LIST = `${namespace}-GET_LIST`;
export const GET_DETAILS = `${namespace}-GET_DETAILS`;

export const getList = (body, context) => async dispatch => {
  const res = await service.getOrgList(body, context);
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
  const { id, parent, orgType } = body;
  let promise = Promise.resolve({ parent, ...(orgType.toString() === '-1' ?  {} : { orgType } ) });
  if (id.toString() !== '0') {
    promise = await service.getOrgDetails(body, context).then(res => res.data);
  }
  const data = await promise;
  return data;
};

export const save = (body, context) => async () => {
  const res = await service.save(body, context);
  return res;
};

export const deleteOrg = (body, context) => async () => {
  const res = await service.deleteOrg(body, context);
  return res;
};
