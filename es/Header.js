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

import './Header.less';
import React, { Component } from 'react';
import classNames from 'classnames';
import GlobalHeader from './GlobalHeader';
import TopNavHeader from './TopNavHeader';
var Header = _Layout.Header;

var HeaderView = /*#__PURE__*/function (_Component) {
  _inherits(HeaderView, _Component);

  function HeaderView() {
    var _this;

    _classCallCheck(this, HeaderView);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(HeaderView).apply(this, arguments));

    _this.renderContent = function () {
      var _this$props = _this.props,
          isMobile = _this$props.isMobile,
          onCollapse = _this$props.onCollapse,
          navTheme = _this$props.navTheme,
          layout = _this$props.layout,
          headerRender = _this$props.headerRender;
      var isTop = layout === 'topmenu';
      var defaultDom = React.createElement(GlobalHeader, Object.assign({
        onCollapse: onCollapse
      }, _this.props));

      if (isTop && !isMobile) {
        defaultDom = React.createElement(TopNavHeader, Object.assign({
          theme: navTheme,
          mode: "horizontal",
          onCollapse: onCollapse
        }, _this.props));
      }

      if (headerRender) {
        return headerRender(_this.props, defaultDom);
      }

      return defaultDom;
    };

    return _this;
  }

  _createClass(HeaderView, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          fixedHeader = _this$props2.fixedHeader,
          layout = _this$props2.layout,
          propsClassName = _this$props2.className,
          style = _this$props2.style,
          collapsed = _this$props2.collapsed,
          _this$props2$siderWid = _this$props2.siderWidth,
          siderWidth = _this$props2$siderWid === void 0 ? 256 : _this$props2$siderWid,
          hasSiderMenu = _this$props2.hasSiderMenu,
          headerRender = _this$props2.headerRender,
          isMobile = _this$props2.isMobile;
      var isTop = layout === 'topmenu';
      var needSettingWidth = fixedHeader && hasSiderMenu && !isTop && !isMobile;
      var className = classNames(propsClassName, {
        'ant-pro-fixed-header': fixedHeader,
        'ant-pro-top-menu': isTop
      });

      if (headerRender === false) {
        return null;
      }

      return React.createElement(React.Fragment, null, fixedHeader && React.createElement(Header, null), React.createElement(Header, {
        style: Object.assign({
          padding: 0,
          width: needSettingWidth ? "calc(100% - ".concat(collapsed ? 80 : siderWidth, "px)") : '100%',
          zIndex: 9,
          right: fixedHeader ? 0 : undefined
        }, style),
        className: className
      }, this.renderContent()));
    }
  }]);

  return HeaderView;
}(Component);

export default HeaderView;