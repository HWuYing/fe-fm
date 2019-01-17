/* eslint-disable no-undef */
import { API_VERSION } from '../../config';

export const login = `/${API_VERSION}/login`;
export const loginOut = `/${API_VERSION}/loginOut`;
export const userList = `/user/${API_VERSION}/pageList`;
export const getDetails = id => `/user/${API_VERSION}/detail/${id}`;
export const userSave = `/user/${API_VERSION}/save`;
export const userDelete = `/user/${API_VERSION}/delete`;
// 修改密码
export const changePwd = `user/${API_VERSION}/chgPassword`;
