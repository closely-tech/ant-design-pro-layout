function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

import pathToRegexp from 'path-to-regexp';
/**
 * Recursively flatten the data
 * [{path:string},{path:string}] => {path,path2}
 * @param  menus
 */

export var getFlatMenuKeys = function getFlatMenuKeys() {
  var menuData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var keys = [];
  menuData.forEach(function (item) {
    if (!item) {
      return;
    }

    keys.push(item.path || '/');

    if (item.children) {
      keys = keys.concat(getFlatMenuKeys(item.children));
    }
  });
  return keys;
};
/**
 * 获取打平的 menuData
 * 已 path 为key
 * @param menuData
 */

export var getFlatMenus = function getFlatMenus() {
  var menuData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var menus = {};
  menuData.forEach(function (item) {
    if (!item || item.hideInMenu) {
      return;
    }

    menus[item.path || '/'] = item;

    if (item.children && !item.hideChildrenInMenu) {
      menus = Object.assign(Object.assign({}, menus), getFlatMenus(item.children));
    }
  });
  return menus;
};
/**
 * a-b-c
 * [
 *  "a",
 *  "a-b",
 *  "a-b-c"
 * ]
 * @param menuKey
 */

export var genKeysToArray = function genKeysToArray(menuKey) {
  var keys = menuKey.split('-');
  var keyArray = [];
  keys.forEach(function (key, index) {
    if (index === 0) {
      keyArray.push(key);
      return;
    }

    keyArray.push(keys.slice(0, index + 1).join('-'));
  });
  return keyArray;
};
export var getMenuMatches = function getMenuMatches() {
  var flatMenuKeys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var path = arguments.length > 1 ? arguments[1] : undefined;
  return flatMenuKeys.filter(function (item) {
    if (item === '/' && path === '/') {
      return true;
    }

    if (item !== '/' && item) {
      // /a
      if (pathToRegexp("".concat(item)).test(path)) {
        return true;
      } // /a/b/b


      if (pathToRegexp("".concat(item, "(.*)")).test(path)) {
        return true;
      }
    }

    return false;
  }).sort(function (a, b) {
    // 如果完全匹配放到最后面
    if (a === path) {
      return 10;
    }

    if (b === path) {
      return -10;
    }

    return a.substr(1).split('/').length - b.substr(1).split('/').length;
  }).pop();
}; // 获取当前的选中菜单

export var getSelectedMenuKeys = function getSelectedMenuKeys(pathname) {
  var flatMenus = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var flatMenuKeys = arguments.length > 2 ? arguments[2] : undefined;
  var menuPathKey = getMenuMatches(flatMenuKeys, pathname || '/');

  if (!menuPathKey) {
    return [];
  }

  var menuItem = flatMenus[menuPathKey] || {
    parentKeys: '',
    key: ''
  };

  var keys = _toConsumableArray(menuItem.parentKeys || []);

  if (menuItem.key) {
    keys.push(menuItem.key);
  }

  return keys;
};