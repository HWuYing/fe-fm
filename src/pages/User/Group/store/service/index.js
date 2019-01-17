import { fetch } from '@util';

const { post, get } = fetch;

export const getOrgList = async (body, context) => get('/org/list', { context, body });

export const getOrgDetails = async (body, context) =>
  get(`/org/get/${body.id}`, { context });

export const save = async (body, context) => post(`/org/save`, { body, context });

export const deleteOrg = async (body, context) =>
  fetch.post(`/org/delete`, { body, context });

