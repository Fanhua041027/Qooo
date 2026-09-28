"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/messages/index"],{

/***/ "./node_modules/.pnpm/@tarojs+taro-loader@4.2.1_w_655abde9082470cdb421892bba8a3e04/node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/messages/index!./src/pages/messages/index.tsx":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@tarojs+taro-loader@4.2.1_w_655abde9082470cdb421892bba8a3e04/node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/messages/index!./src/pages/messages/index.tsx ***!
  \******************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ MessagesPage; }
/* harmony export */ });
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/taro */ "webpack/container/remote/@tarojs/taro");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/.pnpm/@tarojs+plugin-platform-wea_4e8305395171dc1f042a34fd93f3fd6b/node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "webpack/container/remote/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_qd_ui_Badge__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/qd-ui/Badge */ "./src/components/qd-ui/Badge/index.tsx");
/* harmony import */ var _components_qd_ui_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/qd-ui/Button */ "./src/components/qd-ui/Button/index.tsx");
/* harmony import */ var _components_qd_ui_EmptyState__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/qd-ui/EmptyState */ "./src/components/qd-ui/EmptyState/index.tsx");
/* harmony import */ var _components_qd_ui_PageState__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/components/qd-ui/PageState */ "./src/components/qd-ui/PageState/index.tsx");
/* harmony import */ var _services_message_api__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/services/message.api */ "./src/services/message.api.ts");
/* harmony import */ var _store_auth_store__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/store/auth.store */ "./src/store/auth.store.ts");
/* harmony import */ var _utils_format__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @/utils/format */ "./src/utils/format.ts");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "webpack/container/remote/react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__);
















var typeLabels = {
  DIAGNOSIS_COMPLETED: '诊断完成',
  DIAGNOSIS_FAILED: '诊断提醒',
  TASK_DUE: '任务提醒',
  TASK_OVERDUE: '逾期提醒',
  SYSTEM: '系统消息'
};
function MessagesPage() {
  var identity = (0,_store_auth_store__WEBPACK_IMPORTED_MODULE_7__.useAuthStore)(function (state) {
    return state.identity;
  });
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState2 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_9__["default"])(_useState, 2),
    items = _useState2[0],
    setItems = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true),
    _useState4 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_9__["default"])(_useState3, 2),
    loading = _useState4[0],
    setLoading = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
    _useState6 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_9__["default"])(_useState5, 2),
    error = _useState6[0],
    setError = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState8 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_9__["default"])(_useState7, 2),
    markingAllRead = _useState8[0],
    setMarkingAllRead = _useState8[1];
  var loadedIdentityRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)();
  var load = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(/*#__PURE__*/(0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])(/*#__PURE__*/(0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_11__["default"])().m(function _callee() {
    var response, _t;
    return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_11__["default"])().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          if (identity) {
            _context.n = 1;
            break;
          }
          loadedIdentityRef.current = undefined;
          setItems([]);
          setError('');
          setLoading(false);
          _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().stopPullDownRefresh();
          return _context.a(2);
        case 1:
          loadedIdentityRef.current = identity.userId;
          _context.p = 2;
          _context.n = 3;
          return _services_message_api__WEBPACK_IMPORTED_MODULE_6__.messageApi.list();
        case 3:
          response = _context.v;
          setItems(response.data.items);
          setError('');
          _context.n = 5;
          break;
        case 4:
          _context.p = 4;
          _t = _context.v;
          setError(_t instanceof Error ? _t.message : '消息加载失败');
        case 5:
          _context.p = 5;
          setLoading(false);
          _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().stopPullDownRefresh();
          return _context.f(5);
        case 6:
          return _context.a(2);
      }
    }, _callee, null, [[2, 4, 5, 6]]);
  })), [identity]);
  (0,_tarojs_taro__WEBPACK_IMPORTED_MODULE_0__.useDidShow)(load);
  (0,_tarojs_taro__WEBPACK_IMPORTED_MODULE_0__.usePullDownRefresh)(load);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (!identity) {
      loadedIdentityRef.current = undefined;
      return;
    }
    if (loadedIdentityRef.current !== identity.userId) {
      setLoading(true);
      void load();
    }
  }, [identity, load]);
  var markRead = /*#__PURE__*/function () {
    var _ref2 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])(/*#__PURE__*/(0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_11__["default"])().m(function _callee2(message) {
      var _t2;
      return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_11__["default"])().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            if ((0,_services_message_api__WEBPACK_IMPORTED_MODULE_6__.isMessageUnread)(message)) {
              _context2.n = 1;
              break;
            }
            return _context2.a(2);
          case 1:
            _context2.p = 1;
            _context2.n = 2;
            return _services_message_api__WEBPACK_IMPORTED_MODULE_6__.messageApi.markRead(message.id);
          case 2:
            setItems(function (current) {
              return current.map(function (item) {
                return item.id === message.id ? (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_12__["default"])((0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_12__["default"])({}, item), {}, {
                  readAt: new Date().toISOString()
                }) : item;
              });
            });
            _context2.n = 4;
            break;
          case 3:
            _context2.p = 3;
            _t2 = _context2.v;
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().showToast({
              title: _t2 instanceof Error ? _t2.message : '消息状态更新失败',
              icon: 'none'
            });
          case 4:
            return _context2.a(2);
        }
      }, _callee2, null, [[1, 3]]);
    }));
    return function markRead(_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  var markAllRead = /*#__PURE__*/function () {
    var _ref3 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])(/*#__PURE__*/(0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_11__["default"])().m(function _callee3() {
      var unread, _t3;
      return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_11__["default"])().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            if (!markingAllRead) {
              _context3.n = 1;
              break;
            }
            return _context3.a(2);
          case 1:
            unread = items.filter(_services_message_api__WEBPACK_IMPORTED_MODULE_6__.isMessageUnread);
            if (!(unread.length === 0)) {
              _context3.n = 2;
              break;
            }
            return _context3.a(2);
          case 2:
            setMarkingAllRead(true);
            _context3.p = 3;
            _context3.n = 4;
            return Promise.all(unread.map(function (message) {
              return _services_message_api__WEBPACK_IMPORTED_MODULE_6__.messageApi.markRead(message.id);
            }));
          case 4:
            setItems(function (current) {
              return current.map(function (item) {
                return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_12__["default"])((0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_12__["default"])({}, item), {}, {
                  readAt: item.readAt || new Date().toISOString()
                });
              });
            });
            _context3.n = 6;
            break;
          case 5:
            _context3.p = 5;
            _t3 = _context3.v;
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().showToast({
              title: _t3 instanceof Error ? _t3.message : '全部已读失败',
              icon: 'none'
            });
          case 6:
            _context3.p = 6;
            setMarkingAllRead(false);
            return _context3.f(6);
          case 7:
            return _context3.a(2);
        }
      }, _callee3, null, [[3, 5, 6, 7]]);
    }));
    return function markAllRead() {
      return _ref3.apply(this, arguments);
    };
  }();
  var openMessage = /*#__PURE__*/function () {
    var _ref4 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])(/*#__PURE__*/(0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_11__["default"])().m(function _callee4(message) {
      return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_11__["default"])().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            _context4.n = 1;
            return markRead(message);
          case 1:
            if (message.targetType === 'diagnosis' && message.targetId) {
              _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().navigateTo({
                url: "/pages/diagnosis-result/index?id=".concat(message.targetId)
              });
            } else if (message.targetType === 'task') {
              _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().switchTab({
                url: '/pages/tasks/index'
              });
            }
          case 2:
            return _context4.a(2);
        }
      }, _callee4);
    }));
    return function openMessage(_x2) {
      return _ref4.apply(this, arguments);
    };
  }();
  var unreadCount = items.filter(_services_message_api__WEBPACK_IMPORTED_MODULE_6__.isMessageUnread).length;
  if (!identity) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
      className: "page",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_qd_ui_EmptyState__WEBPACK_IMPORTED_MODULE_4__.EmptyState, {
        title: "\u767B\u5F55\u540E\u67E5\u770B\u6D88\u606F",
        description: "\u8BCA\u65AD\u7ED3\u679C\u548C\u4EFB\u52A1\u63D0\u9192\u4F1A\u4FDD\u5B58\u5728\u8FD9\u91CC\u3002",
        actionLabel: "\u53BB\u767B\u5F55",
        onAction: function onAction() {
          return _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().switchTab({
            url: '/pages/profile/index'
          });
        }
      })
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
    className: "page messages-page",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
      className: "messages-heading",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
          className: "page-title",
          children: "\u6D88\u606F\u4E0E\u63D0\u9192"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
          className: "page-description",
          children: unreadCount ? "".concat(unreadCount, " \u6761\u672A\u8BFB\uFF0C\u5904\u7406\u540E\u4F1A\u81EA\u52A8\u5F52\u6863") : '诊断和农事任务的状态都会在这里留下记录。'
        })]
      }), unreadCount ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_qd_ui_Button__WEBPACK_IMPORTED_MODULE_3__.Button, {
        variant: "ghost",
        loading: markingAllRead,
        onClick: markAllRead,
        children: "\u5168\u90E8\u5DF2\u8BFB"
      }) : null]
    }), loading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_qd_ui_PageState__WEBPACK_IMPORTED_MODULE_5__.LoadingState, {
      label: "\u6B63\u5728\u52A0\u8F7D\u6D88\u606F"
    }) : error && items.length === 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_qd_ui_PageState__WEBPACK_IMPORTED_MODULE_5__.ErrorState, {
      title: "\u6D88\u606F\u6682\u65F6\u65E0\u6CD5\u52A0\u8F7D",
      message: error,
      onRetry: load
    }) : items.length === 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_qd_ui_EmptyState__WEBPACK_IMPORTED_MODULE_4__.EmptyState, {
      title: "\u8FD8\u6CA1\u6709\u6D88\u606F",
      description: "\u8BCA\u65AD\u5B8C\u6210\u3001\u8BCA\u65AD\u5931\u8D25\u6216\u4EFB\u52A1\u4E34\u671F\u65F6\uFF0C\u63D0\u9192\u4F1A\u51FA\u73B0\u5728\u8FD9\u91CC\u3002",
      actionLabel: "\u5F00\u59CB\u4E00\u6B21\u8BCA\u65AD",
      onAction: function onAction() {
        return _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().switchTab({
          url: '/pages/diagnosis/index'
        });
      }
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
      className: "messages-list",
      children: [error ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
        className: "messages-stale",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
          children: "\u7F51\u7EDC\u6682\u65F6\u4E0D\u53EF\u7528\uFF0C\u4EE5\u4E0B\u662F\u6700\u8FD1\u540C\u6B65\u7684\u6D88\u606F\u3002"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
          className: "messages-stale__action",
          onClick: load,
          children: "\u91CD\u8BD5"
        })]
      }) : null, items.map(function (message) {
        var unread = (0,_services_message_api__WEBPACK_IMPORTED_MODULE_6__.isMessageUnread)(message);
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
          className: "message-item ".concat(unread ? 'message-item--unread' : ''),
          onClick: function onClick() {
            return openMessage(message);
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
            className: "message-item__mark message-item__mark--".concat(message.type),
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
              children: unread ? '新' : '已'
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
            className: "message-item__body",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
              className: "message-item__top",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
                className: "message-item__title",
                children: message.title
              }), unread ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_qd_ui_Badge__WEBPACK_IMPORTED_MODULE_2__.Badge, {
                tone: "info",
                children: "\u672A\u8BFB"
              }) : null]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
              className: "message-item__type",
              children: [typeLabels[message.type], " \xB7 ", (0,_utils_format__WEBPACK_IMPORTED_MODULE_14__.formatDateTime)(message.createdAt)]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
              className: "message-item__content",
              children: message.content
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
            className: "message-item__arrow",
            children: "\u203A"
          })]
        }, message.id);
      })]
    })]
  });
}

/***/ }),

/***/ "./src/pages/messages/index.tsx":
/*!**************************************!*\
  !*** ./src/pages/messages/index.tsx ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/runtime */ "webpack/container/remote/@tarojs/runtime");
/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_messages_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/.pnpm/@tarojs+taro-loader@4.2.1_w_655abde9082470cdb421892bba8a3e04/node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/messages/index!./index.tsx */ "./node_modules/.pnpm/@tarojs+taro-loader@4.2.1_w_655abde9082470cdb421892bba8a3e04/node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/messages/index!./src/pages/messages/index.tsx");


var config = {"navigationBarTitleText":"消息与提醒","enablePullDownRefresh":true};



var taroOption = (0,_tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__.createPageConfig)(_node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_messages_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"], 'pages/messages/index', {root:{cn:[]}}, config || {})
if (_node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_messages_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"] && _node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_messages_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"].behaviors) {
  taroOption.behaviors = (taroOption.behaviors || []).concat(_node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_messages_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"].behaviors)
}
var inst = Page(taroOption)



/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_messages_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"]);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors","common"], function() { return __webpack_exec__("./src/pages/messages/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map