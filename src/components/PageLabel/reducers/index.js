import { initReducers } from '@applyStore';
import { findPage } from '@applyComponent';
import {
  ADD_PAGE,
  SWITCH_PAGE,
  REMOVE_PAGE,
  REPLACE_PAGE,
  REMOVE_ALL,
  REMOVE_OTHER,
  REMOVE_RIGHT_ALL,
} from '../action';

function getLabel(data) {
  return {
    name: data.name,
    hash: data.path,
  };
}

function getContent(data, context, fromMenu) {
  const {
    match: { path } = {},
    Page,
  } = context;
  const { hasKey: host } = data;
  return {
    Page: Page || findPage(path) || (() => null),
    hash: data.path,
    ...(host ? { host } : {}),
    pageTitle: data.name,
    context,
    fromMenu,
  };
}

function addPage(state, data, context, fromMenu) {
  const { indexing, labels, contents } = state;
  labels.push(getLabel(data));
  contents.push(getContent(data, context, fromMenu));
  Object.assign(indexing, {
    [data.path]: {
      hash: data.path,
      key: labels.length - 1,
      name: data.name,
      menu: data,
      context,
    },
  });
  return {
    labels,
    contents: [...contents],
    indexing,
    index: indexing[data.path],
  };
}

function removePage(state, start, len) {
  const { indexing, labels, contents } = state;
  const currentIndexing = {};
  labels.splice(start, len);
  contents.splice(start, len);
  labels.forEach((label, index) => {
    const { hash } = label;
    currentIndexing[hash] = Object.assign(indexing[hash], {
      key: index,
    });
  });
  return {
    labels,
    contents: [...contents],
    indexing: currentIndexing,
  };
}

/**
 * 通过menu 查询对应的index 不存在返回-1
 * @param state
 * @param menu
 */
function menuToIndex(state, menu) {
  if (!menu) return -1;
  const { indexing } = state;
  const { name, path } = menu;
  if (!name) return indexing[path] || -1;
  let index;
  Object.keys(indexing).some(key => {
    const item = indexing[key];
    const indexName = item.name;
    if (indexName === name) {
      index = item;
      return true;
    }
    return false;
  });
  return index || -1;
}

const initialState = {
  index: {},
  indexing: {},
  labels: [],
  contents: [],
};

const handlers = {
  [ADD_PAGE]: (state, { data, context, fromMenu }) => {
    let currentState = state;
    const index = menuToIndex(state, data);
    if (index !== -1) {
      currentState.index = index;
    } else currentState = addPage(state, data, context, fromMenu);
    return {
      ...state,
      ...currentState,
    };
  },
  [SWITCH_PAGE]: (state, { menu }) => {
    const switchIndex = menuToIndex(state, menu);
    if (switchIndex === -1) return { ...state };
    const { hash: activeKey } = switchIndex;
    const { indexing } = state;
    return {
      ...state,
      index: indexing[activeKey],
    };
  },
  [REMOVE_PAGE]: (state, { menu }) => {
    const removeIndex = menuToIndex(state, menu);
    if (removeIndex === -1) return { ...state };
    const removeKey = removeIndex.hash;
    const { index, indexing } = state;
    const { key, hash: currentHash } = index;
    const currentState = removePage(state, indexing[removeKey].key, 1);
    const maxLen = currentState.labels.length;
    let currentKey = key;
    if (currentHash === removeKey) {
      if (currentKey >= maxLen) currentKey = maxLen - 1;
      if (currentKey >= 0) {
        currentState.index = currentState.indexing[currentState.labels[currentKey].hash];
      }
    } else {
      currentState.index = currentState.indexing[currentHash];
    }
    return {
      ...state,
      ...currentState,
    };
  },
  [REPLACE_PAGE]: (state, { data, menu, context }) => {
    let currentIndex = menuToIndex(state, menu);
    if (currentIndex === -1) currentIndex = state.index;
    const { contents } = state;
    const { key } = currentIndex;
    contents[key].Page = data;
    if (context) contents[key].context = context;
    return {
      ...state,
      contents: [...contents],
    };
  },
  [REMOVE_OTHER]: state => {
    const {
      index: { key, hash },
      contents,
    } = state;
    let start = key + 1;
    let len = contents.length - start;
    let currentState = removePage(state, start, len < 0 ? 0 : len);
    len = key - 1;
    start = 1;
    currentState = removePage(currentState, start, len < 0 ? 0 : len);
    currentState.index = currentState.indexing[hash];
    return {
      ...state,
      ...currentState,
    };
  },
  [REMOVE_ALL]: state => {
    const { contents } = state;
    const start = 1;
    const len = contents.length - start;
    const currentState = removePage(state, start, len < 0 ? 0 : len);
    return {
      ...state,
      ...currentState,
      index: currentState.indexing[contents[0].hash],
    };
  },
  [REMOVE_RIGHT_ALL]: state => {
    const {
      index: { key },
      contents,
    } = state;
    const start = key + 1;
    const len = contents.length - start;
    const currentState = removePage(state, start, len < 0 ? 0 : len);
    return {
      ...state,
      ...currentState,
    };
  },
};

export default initReducers(handlers, initialState);
