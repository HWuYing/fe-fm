import { initReducers } from '@applyStore';
import { factoryRecursion } from '@tools';
import { getEventBus } from '@mixin';
import * as action from '../action';

const $eventbus = getEventBus();
const initialState = {
  data: [],
  openKeys: [],
  selected: undefined,
  serializeData: [],
  topMenu: { selected: {}, list: [] },
  sideMenu: {
    defaultCheck: {},
    list: [],
  },
};
const defaultName = '员工管理';
let defaultHash = '';
let recursion;

function serialize(data) {
  recursion = factoryRecursion(data);
  return recursion.each((tree, pTree, hash) => {
    if (tree.name === defaultName) defaultHash = hash;
    Object.assign(tree, {
      hasKey: tree.hasKey || pTree.hasKey,
      pathList: [].concat(pTree.pathList || [], tree.path ? [tree.path] : []),
      hashList: [].concat(pTree.hashList || [], [hash]),
      pathHash: hash,
    }, tree.children && tree.children.length ? {} : { isLastNode: true });
  });
}

const handlers = {
  [action.RESET_MENU]: (state, { data }) => {
    const serializeData = serialize(data);
    const topMenuList = serializeData.map(item => Object.assign({ ...item }, {
      children: undefined,
    }));
    const defaultCheck = serializeData[0] || { children: [] };
    const defaultSelected = recursion.find(defaultHash);
    if (!defaultSelected) return {
      ...state,
      serializeData,
      topMenu: {
        selected: topMenuList[0],
        list: topMenuList,
      },
      sideMenu: {
        list: defaultCheck.children,
      },
    };
    const topCursor = defaultHash.split('-')[0];
    const topCheck = topMenuList[topCursor];
    const sideMenuList = serializeData[topCursor].children || [];
    return {
      ...state,
      topMenu: {
        selected: topCheck,
        list: topMenuList,
      },
      sideMenu: {
        list: sideMenuList,
      },
      serializeData,
      openKeys: defaultSelected.hashList,
      selected: defaultSelected,
    };
  },
  [action.ACTIVE_TOP_ITEM] : (state, { data }) => {
    const { serializeData, topMenu: { list }, sideMenu, selected } = state;
    const topSelected = list[data];
    let changeSideMenu = sideMenu;
    let changeSelected = selected;
    if (!topSelected) return;
    const topMenu = {
      selected: topSelected,
      list,
    };
    if (!topSelected.isLastNode) {
      changeSideMenu = {
        list: serializeData[data].children || [],
      };
    } else {
      changeSelected = topSelected;
      changeSideMenu= { list: [] };
      $eventbus.$emit('MENU_ITEM_ACTIVE', topSelected);
    }
    return {
      ...state,
      topMenu,
      sideMenu: changeSideMenu,
      selected: changeSelected,
    }
  },
  [action.RESET_OPEN_KEYS]: (state, { data }) => {
    if (!data) return state;
    const selected = recursion.find(data);
    return {
      ...state,
      openKeys: selected.hashList,
    };
  },
  [action.ACTIVE_ITEM]: (state, { data }) => {
    if (!data) return state;
    return {
      ...state,
      selected: recursion.find(data),
    };
  },
};

export default initReducers(handlers, initialState);
