import * as service from '../service/index';

export const getList = (param, httpOptions) => async () => {
  const res = await service.query(param, httpOptions);
  return res;
};

export const detail = (param, httpOptions) => async () => {
  if (param.type.toString() !== '1') {
    const res = await service.detail(param.id, httpOptions);
    const { data } = res;

    return data;
  } else {
    return {
      parentId: param.id.toString() === '0' ? '页面组件' : param.id,
      id: '',
    };
  }
};

export const save = (param, httpOptions) => async () => {
  const res = await service.save(param, httpOptions);
  return res;
};
