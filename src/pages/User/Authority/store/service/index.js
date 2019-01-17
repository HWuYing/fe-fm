import { fetch } from '@util';

const { post, get } = fetch;

export const getAuthorList = async (body, context) => get('/role/list', { context, body });

export const getAuthorDetails = async (body, context) =>
  get(`/role/details/${body.id}`, { context });

export const save = async (body, context) => post(`/role/save`, { body, context });

export const deleteRol = async (body, context) =>
  fetch.post(`/role/delete`, { body, context });

export const authMenuList = async (body, context) => get('/menu/auth/list', { body, context });

export const orgList = async (body, context) => get('/org/list', { body, context });
