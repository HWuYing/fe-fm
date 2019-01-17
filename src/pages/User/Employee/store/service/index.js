import { fetch } from '@util';

const { post, get } = fetch;

export const getUserList = async (body, context) => get('/user/list', { context, body });

export const getUserDetails = async (body, context) =>
  get(`/user/get/${body.id}`, { context });

export const save = async (body, context) => post(`/user/save`, { body, context });

export const deleteUser = async (body, context) =>
  fetch.post(`/user/delete`, { body, context });


export const orgList = async (body, context) => get('/org/list', { body, context });
