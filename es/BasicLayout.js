import "antd/es/layout/style";
import _Layout from "antd/es/layout";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

import './BasicLayout.less';
import React, { useState, useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import classNames from 'classnames';
import warning from 'warning';
import useMergeValue from 'use-merge-value';
import { stringify } from 'use-json-comparison';
import { useMediaQuery } from 'react-responsive';
import Omit from 'omit.js';
import Header from './Header';
import { getPageTitleInfo } from './getPageTitle';
import defaultSettings from './defaultSettings';
import getLocales from './locales';
import Footer from './Footer';
import RouteContext from './RouteContext';
import SiderMenu from './SiderMenu';
import { getBreadcrumbProps } from './utils/getBreadcrumbProps';
import getMenuData from './utils/getMenuData';
import { isBrowser, useDeepCompareEffect } from './utils/utils';
import PageLoading from './PageLoading';
import MenuCounter from './SiderMenu/Counter';
import WrapContent from './WrapContent';
var MediaQueryEnum = {
  'screen-xs': {
    maxWidth: 575
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599
  },
  'screen-xxl': {
    minWidth: 1600
  }
};
/**
 * loop query screen className
 * Array.find will throw a error
 * `Rendered more hooks than during the previous render.`
 * So should use Array.forEach
 */

var getScreenClassName = function getScreenClassName() {
  var className = '';
  Object.keys(MediaQueryEnum).forEach(function (key) {
    if (useMediaQuery(MediaQueryEnum[key])) {
      className = key;
    }
  });
  return className;
};

var headerRender = function headerRender(props) {
  if (props.headerRender === false) {
    return null;
  }

  return React.createElement(Header, Object.assign({}, props));
};

var footerRender = function footerRender(props) {
  if (props.footerRender === false) {
    return null;
  }

  if (props.footerRender) {
    return props.footerRender(Object.assign({}, props), React.createElement(Footer, null));
  }

  return null;
};

var renderSiderMenu = function renderSiderMenu(props) {
  var layout = props.layout,
      isMobile = props.isMobile,
      menuRender = props.menuRender;

  if (props.menuRender === false) {
    return null;
  }

  if (layout === 'topmenu' && !isMobile) {
    return React.createElement(SiderMenu, Object.assign({}, props, {
      hide: true
    }));
  }

  if (menuRender) {
    return menuRender(props, React.createElement(SiderMenu, Object.assign({}, props)));
  }

  return React.createElement(SiderMenu, Object.assign({}, props));
};

var defaultPageTitleRender = function defaultPageTitleRender(pageProps, props) {
  var pageTitleRender = props.pageTitleRender;
  var pageTitleInfo = getPageTitleInfo(pageProps);

  if (pageTitleRender === false) {
    return {
      title: props.title || '',
      id: '',
      pageName: ''
    };
  }

  if (pageTitleRender) {
    var title = pageTitleRender(pageProps, pageTitleInfo.title, pageTitleInfo);

    if (typeof title === 'string') {
      return Object.assign(Object.assign({}, pageTitleInfo), {
        title: title
      });
    }

    warning(typeof title === 'string', 'pro-layout: renderPageTitle return value should be a string');
  }

  return pageTitleInfo;
};

var getPaddingLeft = function getPaddingLeft(hasLeftPadding, collapsed, siderWidth) {
  if (hasLeftPadding) {
    return collapsed ? 80 : siderWidth;
  }

  return undefined;
};
/**
 * 🌃 Powerful and easy to use beautiful layout
 * 🏄‍ Support multiple topics and layout types
 * @param props
 */


var BasicLayout = function BasicLayout(props) {
  var children = props.children,
      propsOnCollapse = props.onCollapse,
      _props$location = props.location,
      location = _props$location === void 0 ? {
    pathname: '/'
  } : _props$location,
      fixSiderbar = props.fixSiderbar,
      navTheme = props.navTheme,
      contentStyle = props.contentStyle,
      PropsLayout = props.layout,
      _props$route = props.route,
      route = _props$route === void 0 ? {
    routes: []
  } : _props$route,
      style = props.style,
      disableContentMargin = props.disableContentMargin,
      _props$siderWidth = props.siderWidth,
      siderWidth = _props$siderWidth === void 0 ? 256 : _props$siderWidth,
      menu = props.menu,
      propsIsChildrenLayout = props.isChildrenLayout,
      menuDataRender = props.menuDataRender,
      loading = props.loading,
      rest = __rest(props, ["children", "onCollapse", "location", "fixSiderbar", "navTheme", "contentStyle", "layout", "route", "style", "disableContentMargin", "siderWidth", "menu", "isChildrenLayout", "menuDataRender", "loading"]);
  /**
   * init variables
   */


  var _useState = useState(useMediaQuery({
    maxWidth: 767
  }, undefined, function (match) {
    if (!props.disableMobile) {
      setIsMobile(match);
    }
  }) && !props.disableMobile),
      _useState2 = _slicedToArray(_useState, 2),
      isMobile = _useState2[0],
      setIsMobile = _useState2[1];

  var formatMessage = function formatMessage(_a) {
    var id = _a.id,
        defaultMessage = _a.defaultMessage,
        restParams = __rest(_a, ["id", "defaultMessage"]);

    if (props.formatMessage) {
      return props.formatMessage(Object.assign({
        id: id,
        defaultMessage: defaultMessage
      }, restParams));
    }

    var locales = getLocales();

    if (locales[id]) {
      return locales[id];
    }

    if (defaultMessage) {
      return defaultMessage;
    }

    return id;
  };

  var _route$routes = route.routes,
      routes = _route$routes === void 0 ? [] : _route$routes;

  var _useMergeValue = useMergeValue(function () {
    return getMenuData(routes, menu, formatMessage, menuDataRender);
  }),
      _useMergeValue2 = _slicedToArray(_useMergeValue, 2),
      menuInfoData = _useMergeValue2[0],
      setMenuInfoData = _useMergeValue2[1];

  var renderMenuInfoData = {}; // 如果menuDataRender 存在，就应该每次都render一下，不然无法保证数据的同步

  if (menuDataRender) {
    renderMenuInfoData = getMenuData(routes, menu, formatMessage, menuDataRender);
  }

  var _ref = !menuDataRender ? menuInfoData : renderMenuInfoData,
      _ref$breadcrumb = _ref.breadcrumb,
      breadcrumb = _ref$breadcrumb === void 0 ? {} : _ref$breadcrumb,
      breadcrumbMap = _ref.breadcrumbMap,
      _ref$menuData = _ref.menuData,
      menuData = _ref$menuData === void 0 ? [] : _ref$menuData;
  /**
   *  如果 menuRender 不存在，可以做一下性能优化
   *  只要 routers 没有更新就不需要重新计算
   */


  useDeepCompareEffect(function () {
    if (!menuDataRender) {
      var infoData = getMenuData(routes, menu, formatMessage, menuDataRender); // 稍微慢一点 render，不然会造成性能问题，看起来像是菜单的卡顿

      var animationFrameId = requestAnimationFrame(function () {
        setMenuInfoData(infoData);
      });
      return function () {
        return window.cancelAnimationFrame && window.cancelAnimationFrame(animationFrameId);
      };
    }

    return function () {
      return null;
    };
  }, [props.route, stringify(menu)]); // If it is a fix menu, calculate padding
  // don't need padding in phone mode

  var hasLeftPadding = fixSiderbar && PropsLayout !== 'topmenu' && !isMobile;

  var _useMergeValue3 = useMergeValue(false, {
    value: props.collapsed,
    onChange: propsOnCollapse
  }),
      _useMergeValue4 = _slicedToArray(_useMergeValue3, 2),
      collapsed = _useMergeValue4[0],
      onCollapse = _useMergeValue4[1]; // Splicing parameters, adding menuData and formatMessage in props


  var defaultProps = Omit(Object.assign(Object.assign({}, props), {
    formatMessage: formatMessage,
    breadcrumb: breadcrumb
  }), ['className', 'style']); // gen page title

  var pageTitleInfo = defaultPageTitleRender(Object.assign(Object.assign({
    pathname: location.pathname
  }, defaultProps), {
    breadcrumbMap: breadcrumbMap
  }), props); // gen breadcrumbProps, parameter for pageHeader

  var breadcrumbProps = getBreadcrumbProps(Object.assign(Object.assign({}, defaultProps), {
    breadcrumbMap: breadcrumbMap
  })); // render sider dom

  var siderMenuDom = renderSiderMenu(Object.assign(Object.assign({}, defaultProps), {
    menuData: menuData,
    onCollapse: onCollapse,
    isMobile: isMobile,
    theme: (navTheme || 'dark').toLocaleLowerCase().includes('dark') ? 'dark' : 'light',
    collapsed: collapsed
  })); // render header dom

  var headerDom = headerRender(Object.assign(Object.assign({}, defaultProps), {
    hasSiderMenu: !!siderMenuDom,
    menuData: menuData,
    isMobile: isMobile,
    collapsed: collapsed,
    onCollapse: onCollapse,
    theme: (navTheme || 'dark').toLocaleLowerCase().includes('dark') ? 'dark' : 'light'
  })); // render footer dom

  var footerDom = footerRender(Object.assign({
    isMobile: isMobile,
    collapsed: collapsed
  }, defaultProps));

  var _useContext = useContext(RouteContext),
      contextIsChildrenLayout = _useContext.isChildrenLayout; // 如果 props 中定义，以 props 为准


  var isChildrenLayout = propsIsChildrenLayout !== undefined ? propsIsChildrenLayout : contextIsChildrenLayout; // gen className

  var className = classNames(getScreenClassName(), props.className, 'ant-design-pro', 'ant-pro-basicLayout', {
    'ant-pro-basicLayout-topmenu': PropsLayout === 'topmenu',
    'ant-pro-basicLayout-is-children': isChildrenLayout,
    'ant-pro-basicLayout-fix-siderbar': fixSiderbar,
    'ant-pro-basicLayout-mobile': isMobile
  }); // siderMenuDom 为空的时候，不需要 padding

  var genLayoutStyle = {
    paddingLeft: siderMenuDom ? getPaddingLeft(!!hasLeftPadding, collapsed, siderWidth) : undefined,
    position: 'relative'
  }; // if is some layout children，don't need min height

  if (isChildrenLayout || contentStyle && contentStyle.minHeight) {
    genLayoutStyle.minHeight = 0;
  }

  var contentClassName = classNames('ant-pro-basicLayout-content', {
    'ant-pro-basicLayout-has-header': headerDom,
    'ant-pro-basicLayout-content-disable-margin': disableContentMargin
  }); // warning info

  useEffect(function () {
    warning(props.collapsed === undefined === (props.onCollapse === undefined), 'pro-layout: onCollapse and collapsed should exist simultaneously');
  }, []);
  /**
   * 页面切换的时候触发
   */

  useEffect(function () {
    var onPageChange = props.onPageChange;

    if (onPageChange) {
      onPageChange(props.location);
    }
  }, [stringify(props.location)]);
  return React.createElement(React.Fragment, null, React.createElement(Helmet, null, React.createElement("title", null, pageTitleInfo.title)), React.createElement(MenuCounter.Provider, null, React.createElement(RouteContext.Provider, {
    value: Object.assign(Object.assign({}, defaultProps), {
      breadcrumb: breadcrumbProps,
      menuData: menuData,
      isMobile: isMobile,
      collapsed: collapsed,
      isChildrenLayout: true,
      title: pageTitleInfo.pageName
    })
  }, React.createElement("div", {
    className: className
  }, React.createElement(_Layout, {
    style: Object.assign({
      minHeight: '100%'
    }, style),
    hasSider: true
  }, siderMenuDom, React.createElement(_Layout, {
    style: genLayoutStyle
  }, headerDom, React.createElement(WrapContent, Object.assign({
    className: contentClassName,
    isChildrenLayout: isChildrenLayout
  }, rest, {
    style: contentStyle
  }), loading ? React.createElement(PageLoading, null) : children), footerDom))))));
};

BasicLayout.defaultProps = Object.assign(Object.assign({
  logo: 'https://gw.alipayobjects.com/zos/antfincdn/PmY%24TNNDBI/logo.svg'
}, defaultSettings), {
  location: isBrowser() ? window.location : undefined
});
export default BasicLayout;