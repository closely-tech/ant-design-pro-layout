function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import './index.less';
import React, { Component } from 'react';
import classNames from 'classnames';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { defaultRenderLogo } from '../SiderMenu/SiderMenu';
import { isBrowser } from '../utils/utils';

var defaultRenderCollapsedButton = function defaultRenderCollapsedButton(collapsed) {
  return collapsed ? React.createElement(MenuUnfoldOutlined, null) : React.createElement(MenuFoldOutlined, null);
};

var renderLogo = function renderLogo(menuHeaderRender, logoDom) {
  if (menuHeaderRender === false) {
    return null;
  }

  if (menuHeaderRender) {
    return menuHeaderRender(logoDom, null);
  }

  return logoDom;
};

var GlobalHeader = /*#__PURE__*/function (_Component) {
  _inherits(GlobalHeader, _Component);

  function GlobalHeader() {
    var _this;

    _classCallCheck(this, GlobalHeader);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GlobalHeader).apply(this, arguments));

    _this.triggerResizeEvent = function () {
      if (isBrowser()) {
        var event = document.createEvent('HTMLEvents');
        event.initEvent('resize', true, false);
        window.dispatchEvent(event);
      }
    };

    _this.toggle = function () {
      var _this$props = _this.props,
          collapsed = _this$props.collapsed,
          onCollapse = _this$props.onCollapse;
      if (onCollapse) onCollapse(!collapsed);

      _this.triggerResizeEvent();
    };

    _this.renderCollapsedButton = function () {
      var _this$props2 = _this.props,
          collapsed = _this$props2.collapsed,
          _this$props2$collapse = _this$props2.collapsedButtonRender,
          collapsedButtonRender = _this$props2$collapse === void 0 ? defaultRenderCollapsedButton : _this$props2$collapse,
          menuRender = _this$props2.menuRender;

      if (collapsedButtonRender !== false && menuRender !== false) {
        return React.createElement("span", {
          className: "ant-pro-global-header-trigger",
          onClick: _this.toggle
        }, collapsedButtonRender(collapsed));
      }

      return null;
    };

    return _this;
  }

  _createClass(GlobalHeader, [{
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          isMobile = _this$props3.isMobile,
          logo = _this$props3.logo,
          rightContentRender = _this$props3.rightContentRender,
          menuHeaderRender = _this$props3.menuHeaderRender,
          propClassName = _this$props3.className,
          style = _this$props3.style;
      var className = classNames(propClassName, 'ant-pro-global-header');
      var logoDom = React.createElement("span", {
        className: "ant-pro-global-header-logo",
        key: "logo"
      }, defaultRenderLogo(logo));
      return React.createElement("div", {
        className: className,
        style: style
      }, isMobile && renderLogo(menuHeaderRender, logoDom), this.renderCollapsedButton(), React.createElement("div", {
        style: {
          flex: 1
        }
      }), rightContentRender && rightContentRender(this.props));
    }
  }]);

  return GlobalHeader;
}(Component);

export { GlobalHeader as default };