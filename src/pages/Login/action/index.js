import * as service from '../service';

export const LOGIN = 'LOGIN';

export const login = param => async dispatch =>
  service.login(param).then(result => {
    dispatch({
      type: LOGIN,
      data: result,
    });
    return result;
  });
