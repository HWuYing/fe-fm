import { fetch } from '@util';

const { post, get } = fetch;

export const changePassword = async (body, context) => post('/user/chgPassword', { context, body });
