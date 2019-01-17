import { initReducers } from '@applyStore';
import { PROJECT_CONFIG } from '@common/config';
import * as Action from '../action/index';

const initialState = {
  list: [],
  total: 0,
  search: {
    menuType: PROJECT_CONFIG.ERP.value,
  },
};

const handlers = {
  [Action.SET_ACTION](state, { data }) {
    return {
      ...state,
      search: data,
    }
  },
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
