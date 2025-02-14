import "antd/es/config-provider/style";
import _ConfigProvider from "antd/es/config-provider";
import "antd/es/layout/style";
import _Layout from "antd/es/layout";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React from 'react';
import ResizeObserver from 'rc-resize-observer';
import { debounce } from './utils/utils';
var Content = _Layout.Content;

var WrapContent = /*#__PURE__*/function (_React$Component) {
  _inherits(WrapContent, _React$Component);

  function WrapContent() {
    var _this;

    _classCallCheck(this, WrapContent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(WrapContent).apply(this, arguments));
    _this.ref = null;
    return _this;
  }

  _createClass(WrapContent, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(_) {
      if (_.contentHeight !== this.props.contentHeight) {
        return true;
      }

      if (_.children !== this.props.children) {
        return true;
      }

      return false;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          style = _this$props.style,
          className = _this$props.className,
          children = _this$props.children,
          isChildrenLayout = _this$props.isChildrenLayout;
      return React.createElement(Content, {
        className: className,
        style: style
      }, React.createElement(_ConfigProvider, {
        getPopupContainer: function getPopupContainer() {
          if (isChildrenLayout && _this2.ref) {
            return _this2.ref;
          }

          return document.body;
        }
      }, React.createElement("div", {
        ref: function ref(ele) {
          _this2.ref = ele;
        },
        className: "ant-pro-basicLayout-children-content-wrap"
      }, children)));
    }
  }]);

  return WrapContent;
}(React.Component);

var ResizeObserverContent = /*#__PURE__*/function (_React$Component2) {
  _inherits(ResizeObserverContent, _React$Component2);

  function ResizeObserverContent() {
    var _this3;

    _classCallCheck(this, ResizeObserverContent);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(ResizeObserverContent).apply(this, arguments));
    _this3.state = {
      contentHeight: undefined
    };
    _this3.resize = debounce(function (_ref) {
      var height = _ref.height;
      var contentHeight = _this3.state.contentHeight;

      if (contentHeight !== height) {
        _this3.setState({
          contentHeight: height
        });
      }
    }, 100);
    return _this3;
  }

  _createClass(ResizeObserverContent, [{
    key: "render",
    value: function render() {
      var contentHeight = this.state.contentHeight;
      return React.createElement("div", {
        style: {
          minHeight: contentHeight
        }
      }, React.createElement(ResizeObserver, {
        onResize: this.resize
      }, React.createElement(WrapContent, Object.assign({}, this.props, {
        contentHeight: contentHeight
      }))));
    }
  }]);

  return ResizeObserverContent;
}(React.Component);

export default ResizeObserverContent;