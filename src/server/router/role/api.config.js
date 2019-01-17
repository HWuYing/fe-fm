/* eslint-disable no-undef */
import { API_VERSION } from '../../config';

export const roleList = `/role/${API_VERSION}/pageList`;
export const details = (id) => `/role/${API_VERSION}/detail/${id}`;
export const save = `/role/${API_VERSION}/save`;
export const deleteRole = `/role/${API_VERSION}/delete`;
