import { initReducers } from '@applyStore';
import * as Action from '../action';

const { REQUEST_POSTS } = Action;

const initialState = {
  list: [],
};

const handlers = {
  [REQUEST_POSTS]: state => {
    return {
      ...state,
      list: [{}],
    };
  },
};

export default initReducers(handlers, initialState);
