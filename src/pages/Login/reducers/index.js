import { initReducers } from '@applyStore';
import * as Action from '../action';

const initialState = {
  user: {},
};

const handlers = {
  [Action.LOGIN]: (state, { data }) => {
    return {
      ...state,
      user: data,
    };
  },
};

export default initReducers(handlers, initialState);
