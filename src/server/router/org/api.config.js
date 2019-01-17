/* eslint-disable no-undef */
import { API_VERSION } from '../../config';

export const list = `/org/${API_VERSION}/list`;
export const details = id => `/org/${API_VERSION}/detail/${id}`;
export const deleteOrg = `/org/${API_VERSION}/delete`;
export const save = `/org/${API_VERSION}/save`;
