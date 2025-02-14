"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _rcResizeObserver = _interopRequireDefault(require("rc-resize-observer"));

var _utils = require("../utils/utils");

var _SiderMenu = require("../SiderMenu/SiderMenu");

require("./index.less");

var _BaseMenu = _interopRequireDefault(require("../SiderMenu/BaseMenu"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var TopNavHeader = function TopNavHeader(props) {
  var ref = (0, _react.useRef)(null);
  var theme = props.theme,
      onMenuHeaderClick = props.onMenuHeaderClick,
      contentWidth = props.contentWidth,
      rightContentRender = props.rightContentRender,
      propsClassName = props.className,
      style = props.style;
  var baseClassName = 'ant-pro-top-nav-header';
  var headerDom = (0, _SiderMenu.defaultRenderLogoAndTitle)(props);
  var className = (0, _classnames.default)(baseClassName, propsClassName, {
    light: theme === 'light'
  });

  var _useState = (0, _react.useState)('auto'),
      _useState2 = _slicedToArray(_useState, 2),
      rightSize = _useState2[0],
      setRightSize = _useState2[1];

  return _react.default.createElement("div", {
    className: className,
    style: style
  }, _react.default.createElement("div", {
    ref: ref,
    className: "".concat(baseClassName, "-main ").concat(contentWidth === 'Fixed' ? 'wide' : '')
  }, headerDom && _react.default.createElement("div", {
    className: "".concat(baseClassName, "-left"),
    onClick: onMenuHeaderClick
  }, _react.default.createElement("div", {
    className: "".concat(baseClassName, "-logo"),
    key: "logo",
    id: "logo"
  }, headerDom)), _react.default.createElement("div", {
    style: {
      flex: 1,
      overflow: 'hidden'
    },
    className: "".concat(baseClassName, "-menu")
  }, _react.default.createElement(_BaseMenu.default, Object.assign({}, props, props.menuProps))), rightContentRender && _react.default.createElement("div", {
    style: {
      minWidth: rightSize
    }
  }, _react.default.createElement(_rcResizeObserver.default, {
    onResize: (0, _utils.debounce)(function (_ref) {
      var width = _ref.width;

      if (!width) {
        return;
      }

      setRightSize(width);
    }, 200)
  }, _react.default.createElement("div", {
    style: {
      paddingRight: 8
    }
  }, rightContentRender(Object.assign({}, props)))))));
};

var _default = TopNavHeader;
exports.default = _default;