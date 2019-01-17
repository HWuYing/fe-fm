/* eslint-disable no-undef */
/* eslint-disable no-unused-vars  */
import { API_VERSION } from '../../config';

export const query = `/uiComponent/${API_VERSION}/query`;
export const detail = id => `/uiComponent/${API_VERSION}/detail/${id}`;
export const add = `/uiComponent/${API_VERSION}/save`;
