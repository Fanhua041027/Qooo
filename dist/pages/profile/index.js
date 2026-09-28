"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/profile/index"],{

/***/ "./node_modules/.pnpm/@tarojs+taro-loader@4.2.1_w_655abde9082470cdb421892bba8a3e04/node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/profile/index!./src/pages/profile/index.tsx":
/*!****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@tarojs+taro-loader@4.2.1_w_655abde9082470cdb421892bba8a3e04/node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/profile/index!./src/pages/profile/index.tsx ***!
  \****************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ProfilePage; }
/* harmony export */ });
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/taro */ "webpack/container/remote/@tarojs/taro");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/.pnpm/@tarojs+plugin-platform-wea_4e8305395171dc1f042a34fd93f3fd6b/node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _components_qd_ui_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/qd-ui/Button */ "./src/components/qd-ui/Button/index.tsx");
/* harmony import */ var _components_qd_ui_Badge__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/qd-ui/Badge */ "./src/components/qd-ui/Badge/index.tsx");
/* harmony import */ var _store_auth_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/store/auth.store */ "./src/store/auth.store.ts");
/* harmony import */ var _services_subscription__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/services/subscription */ "./src/services/subscription.ts");
/* harmony import */ var _config_env__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/config/env */ "./src/config/env.ts");
/* harmony import */ var _utils_analytics__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/utils/analytics */ "./src/utils/analytics.ts");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "webpack/container/remote/react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__);












function ProfilePage() {
  var _useAuthStore = (0,_store_auth_store__WEBPACK_IMPORTED_MODULE_3__.useAuthStore)(),
    identity = _useAuthStore.identity,
    loading = _useAuthStore.loading,
    loginWithMock = _useAuthStore.loginWithMock,
    loginWithWechat = _useAuthStore.loginWithWechat,
    logout = _useAuthStore.logout;
  var login = /*#__PURE__*/function () {
    var _ref = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_8__["default"])(/*#__PURE__*/(0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])().m(function _callee() {
      var _t;
      return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            _context.n = 1;
            return loginWithMock();
          case 1:
            (0,_utils_analytics__WEBPACK_IMPORTED_MODULE_6__.track)('login_success', {
              mode: _config_env__WEBPACK_IMPORTED_MODULE_5__.API_MODE
            });
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().showToast({
              title: '登录成功',
              icon: 'success'
            });
            _context.n = 3;
            break;
          case 2:
            _context.p = 2;
            _t = _context.v;
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().showToast({
              title: _t instanceof Error ? _t.message : '登录失败，请稍后重试',
              icon: 'none'
            });
          case 3:
            return _context.a(2);
        }
      }, _callee, null, [[0, 2]]);
    }));
    return function login() {
      return _ref.apply(this, arguments);
    };
  }();
  var loginWechat = /*#__PURE__*/function () {
    var _ref2 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_8__["default"])(/*#__PURE__*/(0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])().m(function _callee2() {
      var _t2;
      return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            _context2.p = 0;
            _context2.n = 1;
            return loginWithWechat();
          case 1:
            (0,_utils_analytics__WEBPACK_IMPORTED_MODULE_6__.track)('wechat_login_success');
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().showToast({
              title: '登录成功',
              icon: 'success'
            });
            _context2.n = 3;
            break;
          case 2:
            _context2.p = 2;
            _t2 = _context2.v;
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().showToast({
              title: _t2 instanceof Error ? _t2.message : '微信登录暂不可用',
              icon: 'none'
            });
          case 3:
            return _context2.a(2);
        }
      }, _callee2, null, [[0, 2]]);
    }));
    return function loginWechat() {
      return _ref2.apply(this, arguments);
    };
  }();
  var subscribe = /*#__PURE__*/function () {
    var _ref3 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_8__["default"])(/*#__PURE__*/(0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])().m(function _callee3() {
      var result, _t3;
      return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            _context3.p = 0;
            _context3.n = 1;
            return (0,_services_subscription__WEBPACK_IMPORTED_MODULE_4__.requestTaskSubscription)();
          case 1:
            result = _context3.v;
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().showToast({
              title: result.configured ? result.accepted ? '提醒已开启' : '未开启提醒' : '模板 ID 尚未配置',
              icon: 'none'
            });
            _context3.n = 3;
            break;
          case 2:
            _context3.p = 2;
            _t3 = _context3.v;
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().showToast({
              title: _t3 instanceof Error ? _t3.message : '订阅失败',
              icon: 'none'
            });
          case 3:
            return _context3.a(2);
        }
      }, _callee3, null, [[0, 2]]);
    }));
    return function subscribe() {
      return _ref3.apply(this, arguments);
    };
  }();
  var confirmLogout = /*#__PURE__*/function () {
    var _ref4 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_8__["default"])(/*#__PURE__*/(0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])().m(function _callee4() {
      var result;
      return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            _context4.n = 1;
            return _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().showModal({
              title: '退出登录',
              content: '退出后将停止展示当前用户的个人数据。',
              confirmColor: '#BC2D35'
            });
          case 1:
            result = _context4.v;
            if (result.confirm) logout();
          case 2:
            return _context4.a(2);
        }
      }, _callee4);
    }));
    return function confirmLogout() {
      return _ref4.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
    className: "page profile-page",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
      className: "page-title",
      children: "\u6211\u7684"
    }), identity ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
      className: "profile-identity",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
        className: "profile-identity__avatar",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
          children: identity.displayName.slice(0, 1)
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
        className: "profile-identity__body",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
          className: "profile-identity__name",
          children: identity.displayName
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
          className: "profile-identity__id",
          children: identity.userId
        })]
      }), identity.isMock ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_qd_ui_Badge__WEBPACK_IMPORTED_MODULE_2__.Badge, {
        tone: "info",
        children: "\u6A21\u62DF\u8D26\u53F7"
      }) : null]
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
      className: "profile-login",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_qd_ui_Badge__WEBPACK_IMPORTED_MODULE_2__.Badge, {
        tone: "info",
        children: "\u5F00\u53D1\u73AF\u5883"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
        className: "profile-login__title",
        children: "\u767B\u5F55\u5E76\u4FDD\u5B58\u4F60\u7684\u8BCA\u65AD\u8BB0\u5F55"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
        className: "profile-login__description",
        children: _config_env__WEBPACK_IMPORTED_MODULE_5__.API_MODE === 'mock' ? '开发环境使用模拟农户账号，数据保存在当前设备。' : '使用服务端接口登录后，诊断和任务会按账号保存。'
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_qd_ui_Button__WEBPACK_IMPORTED_MODULE_1__.Button, {
        block: true,
        size: "lg",
        loading: loading,
        onClick: login,
        children: _config_env__WEBPACK_IMPORTED_MODULE_5__.API_MODE === 'mock' ? '模拟登录' : '开发账号登录'
      }), _config_env__WEBPACK_IMPORTED_MODULE_5__.API_MODE === 'real' ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_qd_ui_Button__WEBPACK_IMPORTED_MODULE_1__.Button, {
        block: true,
        variant: "ghost",
        loading: loading,
        onClick: loginWechat,
        children: "\u5FAE\u4FE1\u767B\u5F55"
      }) : null]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
      className: "profile-menu",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
        onClick: function onClick() {
          return _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().navigateTo({
            url: '/pages/diagnosis-history/index'
          });
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
          children: "\u8BCA\u65AD\u5386\u53F2"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
          children: "\u67E5\u770B\u8BB0\u5F55"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
        onClick: function onClick() {
          return _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().navigateTo({
            url: '/pages/messages/index'
          });
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
          children: "\u6D88\u606F\u4E0E\u63D0\u9192"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
          children: "\u67E5\u770B\u7AD9\u5185\u6D88\u606F"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
        onClick: function onClick() {
          return _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().switchTab({
            url: '/pages/farm/index'
          });
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
          children: "\u519C\u573A\u4E0E\u5730\u5757"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
          children: "\u7BA1\u7406\u4FE1\u606F"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
        onClick: function onClick() {
          return _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().switchTab({
            url: '/pages/tasks/index'
          });
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
          children: "\u519C\u4E8B\u4EFB\u52A1"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
          children: "\u67E5\u770B\u8FDB\u5EA6"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
        onClick: subscribe,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
          children: "\u5FAE\u4FE1\u8BA2\u9605\u63D0\u9192"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
          children: "\u914D\u7F6E\u63D0\u9192"
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
      className: "profile-environment",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
        children: "\u63A5\u53E3\u6A21\u5F0F"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_qd_ui_Badge__WEBPACK_IMPORTED_MODULE_2__.Badge, {
        tone: _config_env__WEBPACK_IMPORTED_MODULE_5__.API_MODE === 'mock' ? 'warning' : 'success',
        children: _config_env__WEBPACK_IMPORTED_MODULE_5__.API_MODE === 'mock' ? 'Mock' : 'Real API'
      })]
    }), identity ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
      className: "profile-logout",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_qd_ui_Button__WEBPACK_IMPORTED_MODULE_1__.Button, {
        block: true,
        variant: "danger",
        onClick: confirmLogout,
        children: "\u9000\u51FA\u767B\u5F55"
      })
    }) : null]
  });
}

/***/ }),

/***/ "./src/pages/profile/index.tsx":
/*!*************************************!*\
  !*** ./src/pages/profile/index.tsx ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/runtime */ "webpack/container/remote/@tarojs/runtime");
/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_profile_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/.pnpm/@tarojs+taro-loader@4.2.1_w_655abde9082470cdb421892bba8a3e04/node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/profile/index!./index.tsx */ "./node_modules/.pnpm/@tarojs+taro-loader@4.2.1_w_655abde9082470cdb421892bba8a3e04/node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/profile/index!./src/pages/profile/index.tsx");


var config = {"navigationBarTitleText":"我的"};



var taroOption = (0,_tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__.createPageConfig)(_node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_profile_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"], 'pages/profile/index', {root:{cn:[]}}, config || {})
if (_node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_profile_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"] && _node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_profile_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"].behaviors) {
  taroOption.behaviors = (taroOption.behaviors || []).concat(_node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_profile_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"].behaviors)
}
var inst = Page(taroOption)



/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_profile_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"]);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors","common"], function() { return __webpack_exec__("./src/pages/profile/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map