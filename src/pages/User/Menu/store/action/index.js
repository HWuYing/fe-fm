import * as service from '../service/index';

const namespace = '@user-menu-manage';
export const GET_LIST = `${namespace}-GET_LIST`;
export const GET_DETAILS = `${namespace}-GET_DETAILS`;
export const SET_ACTION = `${namespace}-SET_ACTION`;

export const setSearch = search => ({
  type: SET_ACTION,
  data: search,
});

export const getList = (body, context) => async dispatch => {
  const res = await service.getMenuList(body, context);
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
  const { id, parent, menuType } = body;
  let promise = Promise.resolve({ parent, menuType });
  if (id.toString() !== '0') {
    promise = await service.getMenuDetails(body, context).then(res => res.data);
  }
  const data = await promise;
  return data;
};

export const save = (body, context) => async () => {
  const res = await service.save(body, context);
  return res;
};

export const menuDelete = (body, context) => async () => {
  const res = await service.menuDelete(body, context);
  return res;
};
