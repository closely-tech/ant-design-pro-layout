"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/page-header/style");

var _pageHeader = _interopRequireDefault(require("antd/lib/page-header"));

require("antd/lib/tabs/style");

var _tabs = _interopRequireDefault(require("antd/lib/tabs"));

var _react = _interopRequireWildcard(require("react"));

var _reactHelmet = require("react-helmet");

var _classnames = _interopRequireDefault(require("classnames"));

require("./index.less");

var _GridContent = _interopRequireDefault(require("../GridContent"));

var _RouteContext = _interopRequireDefault(require("../RouteContext"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

var prefixedClassName = 'ant-pro-page-header-wrap';
/**
 * render Footer tabList
 * In order to be compatible with the old version of the PageHeader
 * basically all the functions are implemented.
 */

var renderFooter = function renderFooter(_ref) {
  var tabList = _ref.tabList,
      tabActiveKey = _ref.tabActiveKey,
      onTabChange = _ref.onTabChange,
      tabBarExtraContent = _ref.tabBarExtraContent,
      tabProps = _ref.tabProps;

  if (tabList && tabList.length) {
    return _react.default.createElement(_tabs.default, Object.assign({
      className: "".concat(prefixedClassName, "-tabs"),
      activeKey: tabActiveKey,
      onChange: function onChange(key) {
        if (onTabChange) {
          onTabChange(key);
        }
      },
      tabBarExtraContent: tabBarExtraContent
    }, tabProps), tabList.map(function (item) {
      return _react.default.createElement(_tabs.default.TabPane, Object.assign({}, item, {
        tab: item.tab,
        key: item.key
      }));
    }));
  }

  return null;
};

var renderPageHeader = function renderPageHeader(content, extraContent) {
  if (!content && !extraContent) {
    return null;
  }

  return _react.default.createElement("div", {
    className: "".concat(prefixedClassName, "-detail")
  }, _react.default.createElement("div", {
    className: "".concat(prefixedClassName, "-main")
  }, _react.default.createElement("div", {
    className: "".concat(prefixedClassName, "-row")
  }, content && _react.default.createElement("div", {
    className: "".concat(prefixedClassName, "-content")
  }, content), extraContent && _react.default.createElement("div", {
    className: "".concat(prefixedClassName, "-extraContent")
  }, extraContent))));
};

var defaultPageHeaderRender = function defaultPageHeaderRender(props, value) {
  var title = props.title,
      content = props.content,
      pageHeaderRender = props.pageHeaderRender,
      extraContent = props.extraContent,
      style = props.style,
      restProps = __rest(props, ["title", "content", "pageHeaderRender", "extraContent", "style"]);

  if (pageHeaderRender) {
    return pageHeaderRender(Object.assign(Object.assign({}, props), value));
  }

  var pageHeaderTitle = title;

  if (!title && title !== false) {
    pageHeaderTitle = value.title;
  }

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_reactHelmet.Helmet, null, _react.default.createElement("meta", {
    name: "description",
    content: value.title
  }), typeof props.content === 'string' && _react.default.createElement("meta", {
    name: "description",
    content: props.content
  })), _react.default.createElement(_pageHeader.default, Object.assign({}, value, {
    title: pageHeaderTitle
  }, restProps, {
    footer: renderFooter(restProps)
  }), renderPageHeader(content, extraContent)));
};

var PageHeaderWrapper = function PageHeaderWrapper(props) {
  var children = props.children,
      style = props.style;
  var value = (0, _react.useContext)(_RouteContext.default);
  var className = (0, _classnames.default)(prefixedClassName, props.className);
  return _react.default.createElement("div", {
    style: style,
    className: className
  }, _react.default.createElement("div", {
    className: "".concat(prefixedClassName, "-page-header-warp")
  }, _react.default.createElement(_GridContent.default, null, defaultPageHeaderRender(props, value))), children ? _react.default.createElement(_GridContent.default, null, _react.default.createElement("div", {
    className: "".concat(prefixedClassName, "-children-content")
  }, children)) : null);
};

var _default = PageHeaderWrapper;
exports.default = _default;