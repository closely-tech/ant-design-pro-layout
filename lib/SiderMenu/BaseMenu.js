"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/menu/style");

var _menu = _interopRequireDefault(require("antd/lib/menu"));

require("./index.less");

var _icons = _interopRequireWildcard(require("@ant-design/icons"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _useMergeValue5 = _interopRequireDefault(require("use-merge-value"));

var _warning = _interopRequireDefault(require("warning"));

var _defaultSettings = _interopRequireDefault(require("../defaultSettings"));

var _SiderMenuUtils = require("./SiderMenuUtils");

var _utils = require("../utils/utils");

var _Counter = _interopRequireDefault(require("./Counter"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var firstConsole = true;
var SubMenu = _menu.default.SubMenu;
var IconFont = (0, _icons.createFromIconfontCN)({
  scriptUrl: _defaultSettings.default.iconfontUrl
}); // Allow menu.js config icon as string or ReactNode
//   icon: 'setting',
//   icon: 'icon-geren' #For Iconfont ,
//   icon: 'http://demo.com/icon.png',
//   icon: '/favicon.png',
//   icon: <Icon type="setting" />,

var getIcon = function getIcon(icon) {
  if (typeof icon === 'string' && icon !== '') {
    if ((0, _utils.isUrl)(icon)) {
      return _react.default.createElement(_icons.default, {
        component: function component() {
          return _react.default.createElement("img", {
            src: icon,
            alt: "icon",
            className: "ant-pro-sider-menu-icon"
          });
        }
      });
    }

    if (icon.startsWith('icon-')) {
      return _react.default.createElement(IconFont, {
        type: icon
      });
    }

    if (firstConsole) {
      (0, _warning.default)(false, "In order to ensure compatibility with antd@4, we will delete the configuration icon in the next version, details can be viewed.\n\u4E3A\u4E86\u517C\u5BB9 antd@4\uFF0C\u6211\u4EEC\u4F1A\u5728\u4E0B\u4E2A\u7248\u672C\u5220\u9664\u914D\u7F6E icon: string \u751F\u6210icon\u7684\u7528\u6CD5\u3002\u8BF7\u67E5\u770B\nhttps://pro.ant.design/blog/antd-4.0-cn \u5BFB\u627E\u89E3\u51B3\u65B9\u5F0F\uFF01");
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

      var defaultTitle = item.icon ? _react.default.createElement("span", null, getIcon(item.icon), _react.default.createElement("span", null, name)) : name; // subMenu only title render

      var title = subMenuItemRender ? subMenuItemRender(Object.assign(Object.assign({}, item), {
        isUrl: false
      }), defaultTitle) : defaultTitle;
      return _react.default.createElement(SubMenu, {
        title: title,
        key: item.key || item.path,
        onTitleClick: item.onTitleClick
      }, _this.getNavMenuItems(item.children));
    }

    return _react.default.createElement(_menu.default.Item, {
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

    var defaultItem = _react.default.createElement(_react.default.Fragment, null, icon, _react.default.createElement("span", null, name));

    var isHttpUrl = (0, _utils.isUrl)(itemPath); // Is it a http link

    if (isHttpUrl) {
      defaultItem = _react.default.createElement("a", {
        href: itemPath,
        target: target
      }, icon, " ", _react.default.createElement("span", null, name));
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

  var _MenuCounter$useConta = _Counter.default.useContainer(),
      flatMenuKeys = _MenuCounter$useConta.flatMenuKeys,
      flatMenus = _MenuCounter$useConta.flatMenus;

  var _useState = (0, _react.useState)(menu.defaultOpenAll),
      _useState2 = _slicedToArray(_useState, 2),
      defaultOpenAll = _useState2[0],
      setDefaultOpenAll = _useState2[1];

  var _useMergeValue = (0, _useMergeValue5.default)(function () {
    if (menu.defaultOpenAll) {
      return (0, _utils.getOpenKeysFromMenuData)(menuData) || [];
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

  (0, _react.useEffect)(function () {
    if (!flatMenus || flatMenuKeys.length === 0) {
      return;
    }

    if (menu.defaultOpenAll || propsOpenKeys === false) {
      return;
    }

    var keys = (0, _SiderMenuUtils.getSelectedMenuKeys)(location.pathname || '/', flatMenus, flatMenuKeys || []);
    setOpenKeys(keys);
  }, [flatMenus, flatMenuKeys.join('-')]);

  var _useMergeValue3 = (0, _useMergeValue5.default)([], {
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

  (0, _react.useEffect)(function () {
    // reset IconFont
    if (iconfontUrl) {
      IconFont = (0, _icons.createFromIconfontCN)({
        scriptUrl: iconfontUrl
      });
    }
  }, [iconfontUrl]);
  (0, _react.useEffect)(function () {
    if (!flatMenus || flatMenuKeys.length === 0) {
      return function () {
        return null;
      };
    } // if pathname can't match, use the nearest parent's key


    var keys = (0, _SiderMenuUtils.getSelectedMenuKeys)(pathname || '/', flatMenus, flatMenuKeys || []);
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
  var cls = (0, _classnames.default)(className, {
    'top-nav-menu': mode === 'horizontal'
  });
  var menuUtils = new MenuUtil(props);
  var postData = props.postMenuData ? props.postMenuData(menuData) : menuData;
  return _react.default.createElement(_menu.default, Object.assign({}, openKeysProps, {
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
var _default = BaseMenu;
exports.default = _default;