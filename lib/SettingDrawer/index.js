"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.getFormatMessage = void 0;

require("antd/lib/button/style");

var _button = _interopRequireDefault(require("antd/lib/button"));

require("antd/lib/alert/style");

var _alert = _interopRequireDefault(require("antd/lib/alert"));

require("antd/lib/switch/style");

var _switch = _interopRequireDefault(require("antd/lib/switch"));

require("antd/lib/list/style");

var _list = _interopRequireDefault(require("antd/lib/list"));

require("antd/lib/divider/style");

var _divider = _interopRequireDefault(require("antd/lib/divider"));

require("antd/lib/drawer/style");

var _drawer = _interopRequireDefault(require("antd/lib/drawer"));

require("antd/lib/message/style");

var _message2 = _interopRequireDefault(require("antd/lib/message"));

require("./index.less");

var _icons = require("@ant-design/icons");

var _history = require("history");

var _qs = require("qs");

var _react = _interopRequireWildcard(require("react"));

var _reactCopyToClipboard = _interopRequireDefault(require("react-copy-to-clipboard"));

var _useMergeValue5 = _interopRequireDefault(require("use-merge-value"));

var _omit = _interopRequireDefault(require("omit.js"));

var _defaultSettings = _interopRequireDefault(require("../defaultSettings"));

var _BlockCheckbox = _interopRequireDefault(require("./BlockCheckbox"));

var _ThemeColor = _interopRequireDefault(require("./ThemeColor"));

var _locales = _interopRequireWildcard(require("../locales"));

var _utils = require("../utils/utils");

var _LayoutChange = _interopRequireWildcard(require("./LayoutChange"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Body = function Body(_ref) {
  var children = _ref.children,
      title = _ref.title;
  return _react.default.createElement("div", {
    style: {
      marginBottom: 24
    }
  }, _react.default.createElement("h3", {
    className: "ant-pro-setting-drawer-title"
  }, title), children);
};

var oldSetting = {};

var getDifferentSetting = function getDifferentSetting(state) {
  var stateObj = {};
  Object.keys(state).forEach(function (key) {
    if (state[key] !== oldSetting[key] && key !== 'collapse') {
      stateObj[key] = state[key];
    }
  });
  delete stateObj.menu;
  return stateObj;
};

var getFormatMessage = function getFormatMessage() {
  var formatMessage = function formatMessage(_ref2) {
    var id = _ref2.id,
        defaultMessage = _ref2.defaultMessage;
    var locales = (0, _locales.default)();

    if (locales[id]) {
      return locales[id];
    }

    if (defaultMessage) {
      return defaultMessage;
    }

    return id;
  };

  return formatMessage;
};

exports.getFormatMessage = getFormatMessage;

var updateTheme = function updateTheme(dark, color) {
  var hideMessageLoading = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var publicPath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '/theme';

  // ssr
  if (typeof window === 'undefined' || !window.umi_plugin_ant_themeVar) {
    return;
  }

  var formatMessage = getFormatMessage();

  var hide = function hide() {
    return null;
  };

  if (!hideMessageLoading) {
    hide = _message2.default.loading(formatMessage({
      id: 'app.setting.loading',
      defaultMessage: '正在加载主题'
    }));
  }

  var href = dark ? "".concat(publicPath, "/dark") : "".concat(publicPath, "/"); // 如果是 dark，并且是 color=daybreak，无需进行拼接

  var colorFileName = dark && color ? "-".concat(encodeURIComponent(color)) : encodeURIComponent(color || '');

  if (color === 'daybreak' && dark) {
    colorFileName = '';
  }

  var dom = document.getElementById('theme-style'); // 如果这两个都是空

  if (!href && !colorFileName) {
    if (dom) {
      dom.remove();
      localStorage.removeItem('site-theme');
    }

    return;
  }

  var url = "".concat(href).concat(colorFileName || '', ".css");

  if (dom) {
    dom.onload = function () {
      window.setTimeout(function () {
        hide();
      });
    };

    dom.href = url;
  } else {
    var style = document.createElement('link');
    style.type = 'text/css';
    style.rel = 'stylesheet';
    style.id = 'theme-style';

    style.onload = function () {
      window.setTimeout(function () {
        hide();
      });
    };

    style.href = url;

    if (document.body.append) {
      document.body.append(style);
    } else {
      document.body.appendChild(style);
    }
  }

  localStorage.setItem('site-theme', dark ? 'dark' : 'light');
};

var getThemeList = function getThemeList() {
  var formatMessage = getFormatMessage();
  var list = window.umi_plugin_ant_themeVar || [];
  var themeList = [{
    key: 'light',
    url: 'https://gw.alipayobjects.com/zos/antfincdn/NQ%24zoisaD2/jpRkZQMyYRryryPNtyIC.svg',
    title: formatMessage({
      id: 'app.setting.pagestyle.light'
    })
  }, {
    key: 'dark',
    url: 'https://gw.alipayobjects.com/zos/antfincdn/XwFOFbLkSM/LCkqqYNmvBEbokSDscrm.svg',
    title: formatMessage({
      id: 'app.setting.pagestyle.dark',
      defaultMessage: ''
    })
  }];
  var darkColorList = [{
    key: 'daybreak',
    color: '#1890ff',
    theme: 'dark'
  }];
  var lightColorList = [{
    key: 'daybreak',
    color: '#1890ff',
    theme: 'dark'
  }];

  if (list.find(function (item) {
    return item.theme === 'dark';
  })) {
    themeList.push({
      key: 'realDark',
      url: 'https://gw.alipayobjects.com/zos/antfincdn/hmKaLQvmY2/LCkqqYNmvBEbokSDscrm.svg',
      title: formatMessage({
        id: 'app.setting.pagestyle.dark',
        defaultMessage: ''
      })
    });
  } // insert  theme color List


  list.forEach(function (item) {
    var color = (item.modifyVars || {})['@primary-color'];

    if (item.theme === 'dark' && color) {
      darkColorList.push(Object.assign({
        color: color
      }, item));
    }

    if (!item.theme || item.theme === 'light') {
      lightColorList.push(Object.assign({
        color: color
      }, item));
    }
  });
  return {
    colorList: {
      dark: darkColorList,
      light: lightColorList
    },
    themeList: themeList
  };
};
/**
 * 初始化的时候需要做的工作
 * @param param0
 */


var initState = function initState(settings, onSettingChange, publicPath) {
  if (!(0, _utils.isBrowser)()) {
    return;
  }

  var loadedStyle = false;

  if (window.location.search) {
    var params = (0, _qs.parse)(window.location.search.replace('?', ''));
    var replaceSetting = {};
    Object.keys(params).forEach(function (key) {
      if (_defaultSettings.default[key]) {
        replaceSetting[key] = params[key];
      }
    });

    if (onSettingChange) {
      onSettingChange(Object.assign(Object.assign({}, settings), replaceSetting));
    } // 如果 url 中设置主题，进行一次加载。


    if (oldSetting.navTheme !== params.navTheme && params.navTheme) {
      updateTheme(settings.navTheme === 'realDark', params.primaryColor, true, publicPath);
      loadedStyle = true;
    }
  }

  if (loadedStyle) {
    return;
  } // 如果 url 中没有设置主题，并且 url 中的没有加载，进行一次加载。


  if (_defaultSettings.default.navTheme !== settings.navTheme && settings.navTheme) {
    updateTheme(settings.navTheme === 'realDark', settings.primaryColor, true, publicPath);
  }
};

var getParamsFromUrl = function getParamsFromUrl(settings) {
  if (!(0, _utils.isBrowser)()) {
    return _defaultSettings.default;
  } // 第一次进入与 浏览器参数同步一下


  var params = {};

  if (window.location.search) {
    params = (0, _qs.parse)(window.location.search.replace('?', ''));
  }

  return Object.assign(Object.assign(Object.assign({}, _defaultSettings.default), settings), params);
};

var genCopySettingJson = function genCopySettingJson(settingState) {
  return JSON.stringify((0, _omit.default)(Object.assign(Object.assign({}, settingState), {
    primaryColor: (0, _utils.genStringToTheme)(settingState.primaryColor)
  }), ['colorWeak']), null, 2);
};
/**
 * 可视化配置组件
 * @param props
 */


var SettingDrawer = function SettingDrawer(props) {
  var _props$settings = props.settings,
      propsSettings = _props$settings === void 0 ? {} : _props$settings,
      _props$hideLoading = props.hideLoading,
      hideLoading = _props$hideLoading === void 0 ? false : _props$hideLoading,
      hideColors = props.hideColors,
      hideHintAlert = props.hideHintAlert,
      hideCopyButton = props.hideCopyButton,
      getContainer = props.getContainer,
      onSettingChange = props.onSettingChange;
  var firstRender = (0, _react.useRef)(true);

  var _useMergeValue = (0, _useMergeValue5.default)(false, {
    value: props.collapse,
    onChange: props.onCollapseChange
  }),
      _useMergeValue2 = _slicedToArray(_useMergeValue, 2),
      show = _useMergeValue2[0],
      setShow = _useMergeValue2[1];

  var _useState = (0, _react.useState)((0, _locales.getLanguage)()),
      _useState2 = _slicedToArray(_useState, 2),
      language = _useState2[0],
      setLanguage = _useState2[1];

  var _useMergeValue3 = (0, _useMergeValue5.default)(function () {
    return getParamsFromUrl(propsSettings);
  }, {
    value: propsSettings,
    onChange: onSettingChange
  }),
      _useMergeValue4 = _slicedToArray(_useMergeValue3, 2),
      settingState = _useMergeValue4[0],
      setSettingState = _useMergeValue4[1];

  var _ref3 = settingState || {},
      _ref3$navTheme = _ref3.navTheme,
      navTheme = _ref3$navTheme === void 0 ? 'dark' : _ref3$navTheme,
      _ref3$primaryColor = _ref3.primaryColor,
      primaryColor = _ref3$primaryColor === void 0 ? 'daybreak' : _ref3$primaryColor,
      _ref3$layout = _ref3.layout,
      layout = _ref3$layout === void 0 ? 'sidemenu' : _ref3$layout,
      colorWeak = _ref3.colorWeak;

  (0, _react.useEffect)(function () {
    // 语言修改，这个是和 locale 是配置起来的
    var onLanguageChange = function onLanguageChange() {
      if (language !== (0, _locales.getLanguage)()) {
        setLanguage((0, _locales.getLanguage)());
      }
    }; // 记住默认的选择，方便做 diff，然后保存到 url 参数中


    oldSetting = Object.assign(Object.assign({}, _defaultSettings.default), propsSettings);
    /**
     * 如果不是浏览器 都没有必要做了
     */

    if (!(0, _utils.isBrowser)()) {
      return function () {
        return null;
      };
    }

    initState(settingState, setSettingState, props.publicPath);
    window.addEventListener('languagechange', onLanguageChange, {
      passive: true
    });
    return function () {
      return window.removeEventListener('languagechange', onLanguageChange);
    };
  }, []);
  /**
   * 修改设置
   * @param key
   * @param value
   * @param hideMessageLoading
   */

  var changeSetting = function changeSetting(key, value, hideMessageLoading) {
    var nextState = Object.assign({}, settingState);
    nextState[key] = value;

    if (key === 'navTheme') {
      updateTheme(value === 'realDark', undefined, hideMessageLoading, props.publicPath);
      nextState.primaryColor = 'daybreak';
    }

    if (key === 'primaryColor') {
      updateTheme(nextState.navTheme === 'realDark', value === 'daybreak' ? '' : value, hideMessageLoading, props.publicPath);
    }

    if (key === 'layout') {
      nextState.contentWidth = value === 'topmenu' ? 'Fixed' : 'Fluid';
    }

    setSettingState(nextState);
  };

  var formatMessage = getFormatMessage();
  var themeList = getThemeList();
  (0, _react.useEffect)(function () {
    /**
     * 如果不是浏览器 都没有必要做了
     */
    if (!(0, _utils.isBrowser)()) {
      return;
    }

    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    var browserHistory = (0, _history.createBrowserHistory)();
    var params = {};

    if (window.location.search) {
      params = (0, _qs.parse)(window.location.search.replace('?', ''));
    }

    var diffParams = getDifferentSetting(Object.assign(Object.assign({}, params), settingState));

    if (Object.keys(settingState).length < 1) {
      return;
    }

    browserHistory.replace({
      search: (0, _qs.stringify)(diffParams)
    });
  }, [JSON.stringify(settingState)]);
  return _react.default.createElement(_drawer.default, {
    visible: show,
    width: 300,
    onClose: function onClose() {
      return setShow(false);
    },
    placement: "right",
    getContainer: getContainer,
    handler: _react.default.createElement("div", {
      className: "ant-pro-setting-drawer-handle",
      onClick: function onClick() {
        return setShow(!show);
      }
    }, show ? _react.default.createElement(_icons.CloseOutlined, {
      style: {
        color: '#fff',
        fontSize: 20
      }
    }) : _react.default.createElement(_icons.SettingOutlined, {
      style: {
        color: '#fff',
        fontSize: 20
      }
    })),
    style: {
      zIndex: 999
    }
  }, _react.default.createElement("div", {
    className: "ant-pro-setting-drawer-content"
  }, _react.default.createElement(Body, {
    title: formatMessage({
      id: 'app.setting.pagestyle',
      defaultMessage: 'Page style setting'
    })
  }, _react.default.createElement(_BlockCheckbox.default, {
    list: themeList.themeList,
    value: navTheme,
    onChange: function onChange(value) {
      return changeSetting('navTheme', value, hideLoading);
    }
  })), _react.default.createElement(_ThemeColor.default, {
    title: formatMessage({
      id: 'app.setting.themecolor'
    }),
    value: primaryColor,
    colors: hideColors ? [] : themeList.colorList[navTheme === 'realDark' ? 'dark' : 'light'],
    formatMessage: formatMessage,
    onChange: function onChange(color) {
      return changeSetting('primaryColor', color, hideLoading);
    }
  }), _react.default.createElement(_divider.default, null), _react.default.createElement(Body, {
    title: formatMessage({
      id: 'app.setting.navigationmode'
    })
  }, _react.default.createElement(_BlockCheckbox.default, {
    value: layout,
    onChange: function onChange(value) {
      return changeSetting('layout', value, hideLoading);
    }
  })), _react.default.createElement(_LayoutChange.default, {
    settings: settingState,
    changeSetting: changeSetting
  }), _react.default.createElement(_divider.default, null), _react.default.createElement(Body, {
    title: formatMessage({
      id: 'app.setting.othersettings'
    })
  }, _react.default.createElement(_list.default, {
    split: false,
    renderItem: _LayoutChange.renderLayoutSettingItem,
    dataSource: [{
      title: formatMessage({
        id: 'app.setting.weakmode'
      }),
      action: _react.default.createElement(_switch.default, {
        size: "small",
        checked: !!colorWeak,
        onChange: function onChange(checked) {
          return changeSetting('colorWeak', checked);
        }
      })
    }]
  })), hideHintAlert && hideCopyButton ? null : _react.default.createElement(_divider.default, null), hideHintAlert ? null : _react.default.createElement(_alert.default, {
    type: "warning",
    message: formatMessage({
      id: 'app.setting.production.hint'
    }),
    icon: _react.default.createElement(_icons.NotificationOutlined, null),
    showIcon: true,
    style: {
      marginBottom: 16
    }
  }), hideCopyButton ? null : _react.default.createElement(_reactCopyToClipboard.default, {
    text: genCopySettingJson(settingState),
    onCopy: function onCopy() {
      return _message2.default.success(formatMessage({
        id: 'app.setting.copyinfo'
      }));
    }
  }, _react.default.createElement(_button.default, {
    block: true
  }, _react.default.createElement(_icons.CopyOutlined, null), " ", formatMessage({
    id: 'app.setting.copy'
  })))));
};

var _default = SettingDrawer;
exports.default = _default;