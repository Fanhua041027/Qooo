"use strict";
require("./prebundle/vendors-node_modules_taro_weapp_prebundle_react-dom_js.js");
require("./prebundle/vendors-node_modules_taro_weapp_prebundle_chunk-YTFTNLUS_js.js");
require("./prebundle/vendors-node_modules_taro_weapp_prebundle_chunk-6TBQVUF2_js.js");
require("./prebundle/vendors-node_modules_taro_weapp_prebundle_chunk-7QP7AILE_js.js");
require("./prebundle/vendors-node_modules_taro_weapp_prebundle_tarojs_plugin-framework-react_dist_runtime_js.js");
require("./prebundle/vendors-node_modules_taro_weapp_prebundle_tarojs_plugin-platform-weapp_dist_runtime_js.js");
require("./prebundle/node_modules_taro_weapp_prebundle_tarojs_runtime_js.js");
require("./prebundle/vendors-node_modules_taro_weapp_prebundle_tarojs_taro_js.js");
require("./prebundle/remoteEntry.js");
require("./prebundle/node_modules_taro_weapp_prebundle_react_jsx-runtime_js.js");
require("./prebundle/node_modules_taro_weapp_prebundle_zustand_js.js");
require("./prebundle/node_modules_taro_weapp_prebundle_react_js.js");

require("./common");
require("./vendors");
require("./taro");
require("./runtime");

(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["app"],{

/***/ "./node_modules/.pnpm/@tarojs+taro-loader@4.2.1_w_655abde9082470cdb421892bba8a3e04/node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=app!./src/app.tsx":
/*!********************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@tarojs+taro-loader@4.2.1_w_655abde9082470cdb421892bba8a3e04/node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=app!./src/app.tsx ***!
  \********************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/container/remote/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _store_auth_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/store/auth.store */ "./src/store/auth.store.ts");
/* harmony import */ var _utils_analytics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils/analytics */ "./src/utils/analytics.ts");




function App(_ref) {
  var children = _ref.children;
  var initialize = (0,_store_auth_store__WEBPACK_IMPORTED_MODULE_1__.useAuthStore)(function (state) {
    return state.initialize;
  });
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    initialize();
    (0,_utils_analytics__WEBPACK_IMPORTED_MODULE_2__.track)('app_launch');
  }, [initialize]);
  return children;
}
/* harmony default export */ __webpack_exports__["default"] = (App);

/***/ }),

/***/ "./src/app.tsx":
/*!*********************!*\
  !*** ./src/app.tsx ***!
  \*********************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _tarojs_plugin_platform_weapp_dist_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/plugin-platform-weapp/dist/runtime */ "webpack/container/remote/@tarojs/plugin-platform-weapp/dist/runtime");
/* harmony import */ var _tarojs_plugin_platform_weapp_dist_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tarojs_plugin_platform_weapp_dist_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/runtime */ "webpack/container/remote/@tarojs/runtime");
/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _tarojs_plugin_framework_react_dist_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tarojs/plugin-framework-react/dist/runtime */ "webpack/container/remote/@tarojs/plugin-framework-react/dist/runtime");
/* harmony import */ var _tarojs_plugin_framework_react_dist_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_tarojs_plugin_framework_react_dist_runtime__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @tarojs/taro */ "webpack/container/remote/@tarojs/taro");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_app_app_tsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !!../node_modules/.pnpm/@tarojs+taro-loader@4.2.1_w_655abde9082470cdb421892bba8a3e04/node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=app!./app.tsx */ "./node_modules/.pnpm/@tarojs+taro-loader@4.2.1_w_655abde9082470cdb421892bba8a3e04/node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=app!./src/app.tsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "webpack/container/remote/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-dom */ "webpack/container/remote/react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_6__);











var config = {"pages":["pages/home/index","pages/diagnosis/index","pages/farm/index","pages/tasks/index","pages/profile/index","pages/diagnosis-result/index","pages/diagnosis-history/index","pages/messages/index","pages/farm-detail/index"],"window":{"backgroundTextStyle":"light","navigationBarBackgroundColor":"#FFFFFF","navigationBarTitleText":"农间诊","navigationBarTextStyle":"black","backgroundColor":"#F6F8F8"},"tabBar":{"color":"#465F62","selectedColor":"#25666D","backgroundColor":"#FFFFFF","borderStyle":"white","list":[{"pagePath":"pages/home/index","text":"首页"},{"pagePath":"pages/diagnosis/index","text":"诊断"},{"pagePath":"pages/farm/index","text":"农场"},{"pagePath":"pages/tasks/index","text":"任务"},{"pagePath":"pages/profile/index","text":"我的"}]},"lazyCodeLoading":"requiredComponents","sitemapLocation":"sitemap.json"};
_tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__.window.__taroAppConfig = config
var inst = App((0,_tarojs_plugin_framework_react_dist_runtime__WEBPACK_IMPORTED_MODULE_2__.createReactApp)(_node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_app_app_tsx__WEBPACK_IMPORTED_MODULE_4__["default"], react__WEBPACK_IMPORTED_MODULE_5__, (react_dom__WEBPACK_IMPORTED_MODULE_6___default()), config))

;(0,_tarojs_taro__WEBPACK_IMPORTED_MODULE_3__.initPxTransform)({
  designWidth: 750,
  deviceRatio: {"640":2.34,"750":1,"828":1.81},
  baseFontSize: 20,
  unitPrecision: undefined,
  targetUnit: undefined
})


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["vendors","common"], function() { return __webpack_exec__("./src/app.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);;;
//# sourceMappingURL=app.js.map