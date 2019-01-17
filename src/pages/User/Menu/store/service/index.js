import { fetch } from '@util';

const { post, get } = fetch;

export const getMenuList = async (body, context) => post('/menu/list', { context, body });
export const getMenuDetails = async (body, context) =>
  get(`/menu/details/${body.id}`, { context });
export const save = async (body, context) => post(`/menu/save`, { body, context });
export const menuDelete = async (body, context) =>
  fetch.post(`/menu/delete`, { body, context });
