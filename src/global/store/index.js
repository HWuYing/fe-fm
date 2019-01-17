import { factoryGlobalReduces } from '@libGlobal';
import * as action from './action';
import * as reduces from './reduces';

const globalAction = factoryGlobalReduces(reduces, action);

export {
  globalAction,
}
