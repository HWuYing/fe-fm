import { initReducers } from '@applyStore';
import * as Action from '../action/index';

const initialState = {
  decorMap: {},
  providerMap: {},
  invitationCode: {},
};

const handlers = {
  [Action.GET_DECOR_LIST](state, { data, total, enumKey }) {
    const { decorMap } = state;
    return {
      ...state,
      decorMap: {
        ...decorMap,
        [enumKey]: {
          list: data,
          total,
        },
      },
    };
  },
  [Action.GET_PROVIDER_LIST](state, { data, total, enumKey }) {
    const { providerMap } = state;
    return {
      ...state,
      providerMap: {
        ...providerMap,
        [enumKey]: {
          list: data,
          total,
        },
      },
    };
  },
  [Action.GET_INVITATION_CODE](state, { data }) {
    return {
      ...state,
      invitationCode: data,
    }
  },
};

export default initReducers(handlers, initialState);
