import { fetch } from '@util';

const { post } = fetch;

export const getMenu = async (body, context) => post('/menu/author', { context, body });
