import "antd/es/menu/style";
import _Menu from "antd/es/menu";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import './index.less';
import Icon, { createFromIconfontCN } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import useMergeValue from 'use-merge-value';
import warning from 'warning';
import defaultSettings from '../defaultSettings';
import { getSelectedMenuKeys } from './SiderMenuUtils';
import { isUrl, getOpenKeysFromMenuData } from '../utils/utils';
import MenuCounter from './Counter';
var firstConsole = true;
var SubMenu = _Menu.SubMenu;
var IconFont = createFromIconfontCN({
  scriptUrl: defaultSettings.iconfontUrl
}); // Allow menu.js config icon as string or ReactNode
//   icon: 'setting',
//   icon: 'icon-geren' #For Iconfont ,
//   icon: 'http://demo.com/icon.png',
//   icon: '/favicon.png',
//   icon: <Icon type="setting" />,

var getIcon = function getIcon(icon) {
  if (typeof icon === 'string' && icon !== '') {
    if (isUrl(icon)) {
      return React.createElement(Icon, {
        component: function component() {
          return React.createElement("img", {
            src: icon,
            alt: "icon",
            className: "ant-pro-sider-menu-icon"
          });
        }
      });
    }

    if (icon.startsWith('icon-')) {
      return React.createElement(IconFont, {
        type: icon
      });
    }

    if (firstConsole) {
      warning(false, "In order to ensure compatibility with antd@4, we will delete the configuration icon in the next version, details can be viewed.\n\u4E3A\u4E86\u517C\u5BB9 antd@4\uFF0C\u6211\u4EEC\u4F1A\u5728\u4E0B\u4E2A\u7248\u672C\u5220\u9664\u914D\u7F6E icon: string \u751F\u6210icon\u7684\u7528\u6CD5\u3002\u8BF7\u67E5\u770B\nhttps://pro.ant.design/blog/antd-4.0-cn \u5BFB\u627E\u89E3\u51B3\u65B9\u5F0F\uFF01");
      firstConsole = false;
    }
  }

  return icon;
};

var MenuUtil = function MenuUtil(props) {
  var _this = this;

  _classCallCheck(this, MenuUtil);

  this.getNavMenuItems = function () {
    var menusData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return menusData.filter(function (item) {
      return item.name && !item.hideInMenu;
    }).map(function (item) {
      return _this.getSubMenuOrItem(item);
    }).filter(function (item) {
      return item;
    });
  };
  /**
   * get SubMenu or Item
   */


  this.getSubMenuOrItem = function (item) {
    if (Array.isArray(item.children) && !item.hideChildrenInMenu && item.children.some(function (child) {
      return child && !!child.name;
    })) {
      var name = _this.getIntlName(item);

      var subMenuItemRender = _this.props.subMenuItemRender; //  get defaultTitle by menuItemRender

      var defaultTitle = item.icon ? React.createElement("span", null, getIcon(item.icon), React.createElement("span", null, name)) : name; // subMenu only title render

      var title = subMenuItemRender ? subMenuItemRender(Object.assign(Object.assign({}, item), {
        isUrl: false
      }), defaultTitle) : defaultTitle;
      return React.createElement(SubMenu, {
        title: title,
        key: item.key || item.path,
        onTitleClick: item.onTitleClick
      }, _this.getNavMenuItems(item.children));
    }

    return React.createElement(_Menu.Item, {
      key: item.key || item.path
    }, _this.getMenuItemPath(item));
  };

  this.getIntlName = function (item) {
    var name = item.name,
        locale = item.locale;
    var _this$props = _this.props,
        _this$props$menu = _this$props.menu,
        menu = _this$props$menu === void 0 ? {
      locale: false
    } : _this$props$menu,
        formatMessage = _this$props.formatMessage;

    if (locale && menu.locale !== false && formatMessage) {
      return formatMessage({
        id: locale,
        defaultMessage: name
      });
    }

    return name;
  };
  /**
   * 判断是否是http链接.返回 Link 或 a
   * Judge whether it is http link.return a or Link
   * @memberof SiderMenu
   */


  this.getMenuItemPath = function (item) {
    var itemPath = _this.conversionPath(item.path || '/');

    var icon = getIcon(item.icon);
    var _this$props2 = _this.props,
        _this$props2$location = _this$props2.location,
        location = _this$props2$location === void 0 ? {
      pathname: '/'
    } : _this$props2$location,
        isMobile = _this$props2.isMobile,
        onCollapse = _this$props2.onCollapse,
        menuItemRender = _this$props2.menuItemRender;
    var target = item.target; // if local is true formatMessage all name。

    var name = _this.getIntlName(item);

    var defaultItem = React.createElement(React.Fragment, null, icon, React.createElement("span", null, name));
    var isHttpUrl = isUrl(itemPath); // Is it a http link

    if (isHttpUrl) {
      defaultItem = React.createElement("a", {
        href: itemPath,
        target: target
      }, icon, " ", React.createElement("span", null, name));
    }

    if (menuItemRender) {
      return menuItemRender(Object.assign(Object.assign({}, item), {
        isUrl: isHttpUrl,
        itemPath: itemPath,
        isMobile: isMobile,
        replace: itemPath === location.pathname,
        onClick: function onClick() {
          return onCollapse && onCollapse(true);
        }
      }), defaultItem);
    }

    return defaultItem;
  };

  this.conversionPath = function (path) {
    if (path && path.indexOf('http') === 0) {
      return path;
    }

    return "/".concat(path || '').replace(/\/+/g, '/');
  };

  this.props = props;
};
/**
 * 生成openKeys 的对象，因为设置了openKeys 就会变成受控，所以需要一个空对象
 * @param BaseMenuProps
 */


var getOpenKeysProps = function getOpenKeysProps() {
  var openKeys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var _ref = arguments.length > 1 ? arguments[1] : undefined,
      layout = _ref.layout,
      collapsed = _ref.collapsed;

  var openKeysProps = {};

  if (openKeys && !collapsed && layout === 'sidemenu') {
    openKeysProps = {
      openKeys: openKeys
    };
  }

  return openKeysProps;
};

var BaseMenu = function BaseMenu(props) {
  var theme = props.theme,
      mode = props.mode,
      _props$location = props.location,
      location = _props$location === void 0 ? {
    pathname: '/'
  } : _props$location,
      className = props.className,
      handleOpenChange = props.handleOpenChange,
      style = props.style,
      menuData = props.menuData,
      _props$menu = props.menu,
      menu = _props$menu === void 0 ? {
    locale: true
  } : _props$menu,
      iconfontUrl = props.iconfontUrl,
      propsSelectedKeys = props.selectedKeys,
      onSelect = props.onSelect,
      propsOpenKeys = props.openKeys;
  var pathname = location.pathname;

  var _MenuCounter$useConta = MenuCounter.useContainer(),
      flatMenuKeys = _MenuCounter$useConta.flatMenuKeys,
      flatMenus = _MenuCounter$useConta.flatMenus;

  var _useState = useState(menu.defaultOpenAll),
      _useState2 = _slicedToArray(_useState, 2),
      defaultOpenAll = _useState2[0],
      setDefaultOpenAll = _useState2[1];

  var _useMergeValue = useMergeValue(function () {
    if (menu.defaultOpenAll) {
      return getOpenKeysFromMenuData(menuData) || [];
    }

    if (propsOpenKeys === false) {
      return false;
    }

    return [];
  }, {
    value: propsOpenKeys === false ? undefined : propsOpenKeys,
    onChange: handleOpenChange
  }),
      _useMergeValue2 = _slicedToArray(_useMergeValue, 2),
      openKeys = _useMergeValue2[0],
      setOpenKeys = _useMergeValue2[1];

  useEffect(function () {
    if (!flatMenus || flatMenuKeys.length === 0) {
      return;
    }

    if (menu.defaultOpenAll || propsOpenKeys === false) {
      return;
    }

    var keys = getSelectedMenuKeys(location.pathname || '/', flatMenus, flatMenuKeys || []);
    setOpenKeys(keys);
  }, [flatMenus, flatMenuKeys.join('-')]);

  var _useMergeValue3 = useMergeValue([], {
    value: propsSelectedKeys,
    onChange: onSelect ? function (keys) {
      if (onSelect && keys) {
        onSelect(keys);
      }
    } : undefined
  }),
      _useMergeValue4 = _slicedToArray(_useMergeValue3, 2),
      selectedKeys = _useMergeValue4[0],
      setSelectedKeys = _useMergeValue4[1];

  useEffect(function () {
    // reset IconFont
    if (iconfontUrl) {
      IconFont = createFromIconfontCN({
        scriptUrl: iconfontUrl
      });
    }
  }, [iconfontUrl]);
  useEffect(function () {
    if (!flatMenus || flatMenuKeys.length === 0) {
      return function () {
        return null;
      };
    } // if pathname can't match, use the nearest parent's key


    var keys = getSelectedMenuKeys(pathname || '/', flatMenus, flatMenuKeys || []);
    var animationFrameId = requestAnimationFrame(function () {
      setSelectedKeys(keys);

      if (!defaultOpenAll && propsOpenKeys !== false) {
        setOpenKeys(keys);
      } else {
        setDefaultOpenAll(false);
      }
    });
    return function () {
      return window.cancelAnimationFrame && window.cancelAnimationFrame(animationFrameId);
    };
  }, [pathname, flatMenuKeys.join('-')]);
  var openKeysProps = getOpenKeysProps(openKeys, props);
  var cls = classNames(className, {
    'top-nav-menu': mode === 'horizontal'
  });
  var menuUtils = new MenuUtil(props);
  var postData = props.postMenuData ? props.postMenuData(menuData) : menuData;
  return React.createElement(_Menu, Object.assign({}, openKeysProps, {
    key: "Menu",
    mode: mode,
    theme: theme,
    selectedKeys: selectedKeys,
    style: style,
    className: cls,
    onOpenChange: setOpenKeys
  }, props.menuProps), menuUtils.getNavMenuItems(postData));
};

BaseMenu.defaultProps = {
  postMenuData: function postMenuData(data) {
    return data || [];
  }
};
export default BaseMenu;