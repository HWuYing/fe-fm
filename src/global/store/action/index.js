import * as service from '../service';

const namespace = 'global';

export const GET_USER = `${namespace}GET_USER`;
export const LOGIN_OUT = `${namespace}LOGIN_OUT`;

export const getUser = (body, context) => async (dispatch) => {
  const { data: user} = await service.fetchUser(body, context);
  dispatch({
    type: GET_USER,
    data: user,
  });
};

export const loginOut = (body, context) => async (dispatch) => {
  const result = await service.loginOut(body, context);
  dispatch({
    type: LOGIN_OUT,
    data: result.data,
  });
  return result;
};
