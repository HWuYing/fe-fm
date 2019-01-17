import { fetch } from '@util';

const { post, get } = fetch;

export const save = async (body, context) => post('/store/save', { body, context });

export const getDetail = async (body, context) => {
  const { id } = body;
  if (!id || id.toString() === '0') return { data: {} };
  return get(`/store/detail/${body.id}`, { context });
};
