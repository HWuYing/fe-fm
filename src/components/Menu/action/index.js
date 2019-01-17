import { getMenu as fetchMenu } from '../service';

export const RESET_MENU = 'RESET_MENU';
export const RESET_OPEN_KEYS = 'RESET_OPEN_KEYS';
export const ACTIVE_ITEM = 'ACTIVE_ITEM';
export const ACTIVE_TOP_ITEM = 'ACTIVE_TOP_ITEM';

export const getMenu = (param, context) => async (dispatch) => {
  await fetchMenu(param, context).then(res => {
    dispatch(resetMenu(res.data));
    return res;
  });
};


export const resetMenu = (data) => ({
  type: RESET_MENU,
  data,
});

export const resetOpenKeys = (hash) => ({
  type: RESET_OPEN_KEYS,
  data: hash,
});

export const activeItem = (hash) => ({
  type: ACTIVE_ITEM,
  data: hash,
});

export const activeTopItem = (hash) => ({
  type: ACTIVE_TOP_ITEM,
  data: hash,
});
