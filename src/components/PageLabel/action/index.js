export const ADD_PAGE = 'ADD_PAGE';
export const SWITCH_PAGE = 'SWITCH_PAGE';
export const REMOVE_PAGE = 'REMOVE_PAGE';
export const REPLACE_PAGE = 'REPLACE_PAGE';
export const REMOVE_ALL = 'REMOVE_ALL';
export const REMOVE_OTHER = 'REMOVE_OTHER';
export const REMOVE_RIGHT_ALL = 'REMOVE_RIGHT_ALL';

export const addPage = (menu, context, fromMenu) => ({
  type: ADD_PAGE,
  data: menu,
  context,
  fromMenu,
});

export const switchPage = (menu) => ({
  type: SWITCH_PAGE,
  menu,
});

export const removePage = (menu) => ({
  type: REMOVE_PAGE,
  menu,
});

export const replacePage = (Page, menu, context) => ({
  type: REPLACE_PAGE,
  data: Page,
  context,
  menu,
});

export const removeAllPage = () => ({
  type: REMOVE_ALL,
});

export const removeOtherPage = () => ({
  type: REMOVE_OTHER,
});

export const removeRightPage = () => ({
  type: REMOVE_RIGHT_ALL,
});

