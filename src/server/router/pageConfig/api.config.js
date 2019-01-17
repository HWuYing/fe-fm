/* eslint-disable no-undef */
/* eslint-disable no-unused-vars  */
import { API_VERSION } from '../../config';

export const query = `/configmvg/${API_VERSION}/query`;
export const detail = id => `/configmvg/${API_VERSION}/detail/${id}`;
export const uplower = `/configmvg/${API_VERSION}/open`;
export const add = `/configmvg/${API_VERSION}/save`;
export const update = `/configmvg/${API_VERSION}/update`;
