import { fetch } from '@util';

const { post, get, put } = fetch;

export const query = async (body, httpOptions) => get('/uiCategory/list', { httpOptions });

export const detail = async (body, httpOptions) =>
  get(`/uiCategory/details/${body}`, { httpOptions });

export const save = async (body, httpOptions) => post('/uiCategory/save', { httpOptions, body });
