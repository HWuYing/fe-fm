/* eslint-disable no-undef */
import { API_VERSION } from '../../../config';

export const save = `/decor/${API_VERSION}/save`;
export const detail = id => `/decor/${API_VERSION}/detail/${id}`;
