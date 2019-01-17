import * as service from '../service/index';

const namespace = '@user-pwd-manage';

export const changePassword = (body, context) => async () => service.changePassword(body, context);
