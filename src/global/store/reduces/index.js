import * as action from '../action';

const initialState = {
  user: {},
};

const handlers = {
  [action.GET_USER]: (state, { data }) => {
    return {
      ...state,
      user: data,
    }
  },
  [action.LOGIN_OUT]: (state) => {
    return {
      ...state,
      user: {},
    }
  },
};

export {
  handlers,
  initialState,
};
