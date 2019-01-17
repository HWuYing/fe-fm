import * as service from '../service/index';

const namespace='fe-store-manage';

export const GET_STORE_LIST = `${namespace}GET_STORE_LIST`;
export const GET_STORE_DETAILS = `${namespace}GET_STORE_DETAILS`;
export const SAVE_STORE = `${namespace}SAVE_STORE`;
export const GET_DECOR_LIST = `${namespace}GET_DECOR_LIST`;
export const GET_INVITATION_CODE = `${namespace}GET_INVITATION_CODE`;

export const save = (body, context) => async () => {
  const result = await service.save(body, context);
  return result;
};

export const getDetail = (body, context) => async dispatch => {
  const { data } = await service.getDetail(body, context);
  dispatch({
    type: GET_STORE_DETAILS,
    data,
  });
};
