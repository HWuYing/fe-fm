/* eslint-disable no-undef */
/* eslint-disable no-unused-vars  */
import { API_VERSION } from '../../config';

export const getMenuList = `/menu/${API_VERSION}/list`;
export const menuSave = `/menu/${API_VERSION}/save`;
export const getMenuDetails = id => `/menu/${API_VERSION}/detail/${id}`;
export const menuDelete = `/menu/${API_VERSION}/delete`;
export const authMenuList = `/menu/${API_VERSION}/list`;
