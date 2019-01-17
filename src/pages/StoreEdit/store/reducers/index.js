import { initReducers } from '@applyStore';
import * as Action from '../action/index';

const initialState = {
  storeDetail: {},
};

const handlers = {
  [Action.GET_STORE_DETAILS](state, { data }) {
    return {
      ...state,
      storeDetail: data,
    };
  },
};

export default initReducers(handlers, initialState);
