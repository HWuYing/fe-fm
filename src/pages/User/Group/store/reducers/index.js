import { initReducers } from '@applyStore';
import * as Action from '../action/index';

const initialState = {
  list: [],
  total: 0,
};

const handlers = {
  [Action.GET_LIST](
    state,
    {
      payload: { data, total },
    }
  ) {
    return {
      ...state,
      list: data,
      total,
    };
  },
};

export default initReducers(handlers, initialState);
