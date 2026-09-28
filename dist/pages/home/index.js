"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/home/index"],{

/***/ "./node_modules/.pnpm/@tarojs+taro-loader@4.2.1_w_655abde9082470cdb421892bba8a3e04/node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/home/index!./src/pages/home/index.tsx":
/*!**********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@tarojs+taro-loader@4.2.1_w_655abde9082470cdb421892bba8a3e04/node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/home/index!./src/pages/home/index.tsx ***!
  \**********************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ HomePage; }
/* harmony export */ });
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/taro */ "webpack/container/remote/@tarojs/taro");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/.pnpm/@tarojs+plugin-platform-wea_4e8305395171dc1f042a34fd93f3fd6b/node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "webpack/container/remote/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_qd_ui_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/qd-ui/Button */ "./src/components/qd-ui/Button/index.tsx");
/* harmony import */ var _components_qd_ui_Badge__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/qd-ui/Badge */ "./src/components/qd-ui/Badge/index.tsx");
/* harmony import */ var _components_qd_ui_SectionHeader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/qd-ui/SectionHeader */ "./src/components/qd-ui/SectionHeader/index.tsx");
/* harmony import */ var _components_business_DiagnosisCard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/components/business/DiagnosisCard */ "./src/components/business/DiagnosisCard/index.tsx");
/* harmony import */ var _components_business_TaskItem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/components/business/TaskItem */ "./src/components/business/TaskItem/index.tsx");
/* harmony import */ var _services_diagnosis_api__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/services/diagnosis.api */ "./src/services/diagnosis.api.ts");
/* harmony import */ var _services_farm_api__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/services/farm.api */ "./src/services/farm.api.ts");
/* harmony import */ var _services_task_api__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/services/task.api */ "./src/services/task.api.ts");
/* harmony import */ var _services_message_api__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/services/message.api */ "./src/services/message.api.ts");
/* harmony import */ var _store_auth_store__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @/store/auth.store */ "./src/store/auth.store.ts");
/* harmony import */ var _utils_analytics__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @/utils/analytics */ "./src/utils/analytics.ts");
/* harmony import */ var _components_qd_ui_PageState__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @/components/qd-ui/PageState */ "./src/components/qd-ui/PageState/index.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react/jsx-runtime */ "webpack/container/remote/react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__);




















function HomePage() {
  var _farm$plots, _tasks$, _farm$plots2;
  var identity = (0,_store_auth_store__WEBPACK_IMPORTED_MODULE_11__.useAuthStore)(function (state) {
    return state.identity;
  });
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState2 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_15__["default"])(_useState, 2),
    farm = _useState2[0],
    setFarm = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState4 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_15__["default"])(_useState3, 2),
    diagnosis = _useState4[0],
    setDiagnosis = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState6 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_15__["default"])(_useState5, 2),
    tasks = _useState6[0],
    setTasks = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0),
    _useState8 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_15__["default"])(_useState7, 2),
    unreadMessages = _useState8[0],
    setUnreadMessages = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true),
    _useState0 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_15__["default"])(_useState9, 2),
    loading = _useState0[0],
    setLoading = _useState0[1];
  var _useState1 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState10 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_15__["default"])(_useState1, 2),
    offline = _useState10[0],
    setOffline = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
    _useState12 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_15__["default"])(_useState11, 2),
    lastSyncedAt = _useState12[0],
    setLastSyncedAt = _useState12[1];
  var loadRunRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(0);
  var loadedIdentityRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)();
  var load = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(/*#__PURE__*/(0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_16__["default"])(/*#__PURE__*/(0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_17__["default"])().m(function _callee() {
    var runId, _yield$Promise$allSet, _yield$Promise$allSet2, farmsResult, diagnosesResult, tasksResult, messagesResult;
    return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_17__["default"])().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          runId = ++loadRunRef.current;
          if (identity) {
            _context.n = 1;
            break;
          }
          loadedIdentityRef.current = undefined;
          setFarm(null);
          setDiagnosis(null);
          setTasks([]);
          setUnreadMessages(0);
          setOffline(false);
          setLoading(false);
          _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().stopPullDownRefresh();
          return _context.a(2);
        case 1:
          loadedIdentityRef.current = identity.userId;
          setLoading(true);
          _context.n = 2;
          return Promise.allSettled([_services_farm_api__WEBPACK_IMPORTED_MODULE_8__.farmApi.list(), _services_diagnosis_api__WEBPACK_IMPORTED_MODULE_7__.diagnosisApi.list(), _services_task_api__WEBPACK_IMPORTED_MODULE_9__.taskApi.list(), _services_message_api__WEBPACK_IMPORTED_MODULE_10__.messageApi.unreadCount()]);
        case 2:
          _yield$Promise$allSet = _context.v;
          _yield$Promise$allSet2 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_15__["default"])(_yield$Promise$allSet, 4);
          farmsResult = _yield$Promise$allSet2[0];
          diagnosesResult = _yield$Promise$allSet2[1];
          tasksResult = _yield$Promise$allSet2[2];
          messagesResult = _yield$Promise$allSet2[3];
          if (!(loadRunRef.current !== runId)) {
            _context.n = 3;
            break;
          }
          return _context.a(2);
        case 3:
          if (farmsResult.status === 'fulfilled') setFarm(farmsResult.value.data.items[0] || null);
          if (diagnosesResult.status === 'fulfilled') setDiagnosis(diagnosesResult.value.data.items[0] || null);
          if (tasksResult.status === 'fulfilled') setTasks(tasksResult.value.data.items.filter(function (task) {
            return task.status !== 'COMPLETED';
          }).slice(0, 2));
          if (messagesResult.status === 'fulfilled') setUnreadMessages(messagesResult.value.data.count);
          setOffline([farmsResult, diagnosesResult, tasksResult, messagesResult].some(function (result) {
            return result.status === 'rejected';
          }));
          setLastSyncedAt(new Date().toISOString());
          setLoading(false);
          _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().stopPullDownRefresh();
        case 4:
          return _context.a(2);
      }
    }, _callee);
  })), [identity]);
  (0,_tarojs_taro__WEBPACK_IMPORTED_MODULE_0__.useDidShow)(load);
  (0,_tarojs_taro__WEBPACK_IMPORTED_MODULE_0__.usePullDownRefresh)(load);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    // 网络状态变化时立即更新提示，并在恢复连接后重新同步一次首页数据。
    var handleNetworkChange = function handleNetworkChange(event) {
      setOffline(!event.isConnected);
      if (event.isConnected && identity) void load();
    };
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().onNetworkStatusChange(handleNetworkChange);
    return function () {
      return _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().offNetworkStatusChange(handleNetworkChange);
    };
  }, [identity, load]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (!identity) {
      void load();
      return;
    }
    if (loadedIdentityRef.current !== identity.userId) void load();
  }, [identity, load]);
  var startDiagnosis = function startDiagnosis() {
    (0,_utils_analytics__WEBPACK_IMPORTED_MODULE_12__.track)('home_start_diagnosis');
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().switchTab({
      url: '/pages/diagnosis/index'
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.View, {
    className: "page home-page",
    children: [offline ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.View, {
      className: "home-offline",
      role: "status",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
        children: "\u5F53\u524D\u7F51\u7EDC\u4E0D\u53EF\u7528\uFF0C\u4EE5\u4E0B\u5185\u5BB9\u53EF\u80FD\u4E0D\u662F\u6700\u65B0\u72B6\u6001"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
        className: "home-offline__action",
        onClick: load,
        children: "\u91CD\u65B0\u8FDE\u63A5"
      })]
    }) : null, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.View, {
      className: "home-heading",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.View, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
          className: "home-heading__greeting",
          children: identity ? "".concat(identity.displayName, "\uFF0C\u65E9\u4E0A\u597D") : '你好，先从一张照片开始'
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
          className: "page-title",
          children: "\u770B\u6E05\u95EE\u9898\uFF0C\u518D\u51B3\u5B9A\u600E\u4E48\u505A"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.View, {
        className: "home-heading__tools",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.View, {
          className: "home-heading__status ".concat(offline ? 'home-heading__status--offline' : ''),
          role: "status",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.View, {
            className: "home-heading__dot"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
            children: offline ? '网络暂时不可用' : '诊断服务正常'
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.View, {
          className: "home-heading__messages",
          onClick: function onClick() {
            return _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().navigateTo({
              url: '/pages/messages/index'
            });
          },
          role: "button",
          "aria-label": "\u67E5\u770B\u6D88\u606F\u4E0E\u63D0\u9192",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
            children: "\u6D88\u606F"
          }), unreadMessages > 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
            className: "home-heading__messages-badge",
            children: unreadMessages > 9 ? '9+' : unreadMessages
          }) : null]
        })]
      })]
    }), loading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_components_qd_ui_PageState__WEBPACK_IMPORTED_MODULE_13__.LoadingState, {
      label: "\u6B63\u5728\u540C\u6B65\u519C\u573A\u548C\u8BCA\u65AD\u8BB0\u5F55"
    }) : null, !loading && !identity ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.View, {
      className: "home-login",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.View, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
          className: "home-login__title",
          children: "\u767B\u5F55\u540E\u4FDD\u5B58\u8BCA\u65AD\u8BB0\u5F55"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
          className: "home-login__description",
          children: "\u5F00\u53D1\u73AF\u5883\u53EF\u4F7F\u7528\u6A21\u62DF\u519C\u6237\u8D26\u53F7\u3002"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_components_qd_ui_Button__WEBPACK_IMPORTED_MODULE_2__.Button, {
        variant: "secondary",
        onClick: function onClick() {
          return _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().switchTab({
            url: '/pages/profile/index'
          });
        },
        children: "\u53BB\u767B\u5F55"
      })]
    }) : null, !loading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.View, {
      className: "home-diagnosis",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.View, {
        className: "home-diagnosis__content",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
          className: "home-diagnosis__eyebrow",
          children: "\u7530\u95F4\u5FEB\u901F\u5224\u65AD"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_components_qd_ui_Badge__WEBPACK_IMPORTED_MODULE_3__.Badge, {
          tone: "success",
          children: "\u7EA6 30 \u79D2\u5F97\u5230\u521D\u6B65\u5224\u65AD"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
          className: "home-diagnosis__title",
          children: "\u62CD\u4E0B\u4F5C\u7269\u5F02\u5E38\u90E8\u4F4D"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
          className: "home-diagnosis__description",
          children: "\u5C3D\u91CF\u9760\u8FD1\u75C5\u6591\uFF0C\u4FDD\u6301\u5149\u7EBF\u5747\u5300\uFF0C\u5E76\u62CD\u6E05\u53F6\u7247\u8FB9\u7F18\u3002"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_components_qd_ui_Button__WEBPACK_IMPORTED_MODULE_2__.Button, {
        block: true,
        size: "lg",
        onClick: startDiagnosis,
        children: "\u62CD\u7167\u8BCA\u65AD"
      })]
    }) : null, !loading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.View, {
      className: "home-context",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.View, {
        className: "home-context__item",
        onClick: function onClick() {
          return _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().switchTab({
            url: '/pages/farm/index'
          });
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
          className: "home-context__label",
          children: "\u5F53\u524D\u519C\u573A"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
          className: "home-context__value",
          children: (farm === null || farm === void 0 ? void 0 : farm.name) || '还没有农场'
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
          className: "home-context__meta",
          children: farm ? "".concat(((_farm$plots = farm.plots) === null || _farm$plots === void 0 ? void 0 : _farm$plots.length) || 0, " \u5757\u5730 \xB7 ").concat(farm.areaMu || 0, " \u4EA9") : '添加后可提高诊断上下文准确度'
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.View, {
        className: "home-context__item",
        onClick: function onClick() {
          return _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().switchTab({
            url: '/pages/tasks/index'
          });
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
          className: "home-context__label",
          children: "\u5F85\u5904\u7406\u4EFB\u52A1"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
          className: "home-context__value",
          children: [tasks.length, " \u9879"]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
          className: "home-context__meta",
          children: ((_tasks$ = tasks[0]) === null || _tasks$ === void 0 ? void 0 : _tasks$.title) || '当前没有待处理任务'
        })]
      })]
    }) : null, !loading && identity ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.View, {
      className: "home-overview",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.View, {
        className: "home-overview__heading",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.View, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
            className: "section-title",
            children: "\u4ECA\u5929\u7684\u519C\u4E8B\u6982\u89C8"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
            className: "home-overview__sync",
            children: lastSyncedAt ? "\u521A\u521A\u540C\u6B65 \xB7 ".concat(tasks.length ? '有待处理事项' : '暂无待处理事项') : '正在同步最新状态'
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
          className: "home-overview__link",
          onClick: function onClick() {
            return _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().switchTab({
              url: '/pages/tasks/index'
            });
          },
          children: "\u770B\u4EFB\u52A1"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.View, {
        className: "home-overview__stats",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.View, {
          className: "home-overview__stat",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
            className: "home-overview__value",
            children: tasks.length
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
            className: "home-overview__label",
            children: "\u5F85\u5904\u7406"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.View, {
          className: "home-overview__stat",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
            className: "home-overview__value",
            children: (farm === null || farm === void 0 || (_farm$plots2 = farm.plots) === null || _farm$plots2 === void 0 ? void 0 : _farm$plots2.length) || 0
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
            className: "home-overview__label",
            children: "\u7BA1\u7406\u5730\u5757"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.View, {
          className: "home-overview__stat",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
            className: "home-overview__value",
            children: unreadMessages
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
            className: "home-overview__label",
            children: "\u672A\u8BFB\u63D0\u9192"
          })]
        })]
      })]
    }) : null, !loading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.View, {
      className: "section",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_components_qd_ui_SectionHeader__WEBPACK_IMPORTED_MODULE_4__.SectionHeader, {
        title: "\u6700\u8FD1\u8BCA\u65AD",
        action: "\u67E5\u770B\u5168\u90E8",
        onAction: function onAction() {
          return _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().navigateTo({
            url: '/pages/diagnosis-history/index'
          });
        }
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.View, {
        className: "surface home-list",
        children: diagnosis ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_components_business_DiagnosisCard__WEBPACK_IMPORTED_MODULE_5__.DiagnosisCard, {
          diagnosis: diagnosis,
          onClick: function onClick() {
            return _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().navigateTo({
              url: "/pages/diagnosis-result/index?id=".concat(diagnosis.id)
            });
          }
        }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
          className: "home-list__empty",
          children: "\u5B8C\u6210\u7B2C\u4E00\u6B21\u62CD\u7167\u8BCA\u65AD\u540E\uFF0C\u8BB0\u5F55\u4F1A\u4FDD\u5B58\u5728\u8FD9\u91CC\u3002"
        })
      })]
    }) : null, !loading && tasks.length > 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.View, {
      className: "section",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_components_qd_ui_SectionHeader__WEBPACK_IMPORTED_MODULE_4__.SectionHeader, {
        title: "\u4ECA\u5929\u8981\u505A",
        action: "\u4EFB\u52A1\u5217\u8868",
        onAction: function onAction() {
          return _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().switchTab({
            url: '/pages/tasks/index'
          });
        }
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.View, {
        className: "surface home-list",
        children: tasks.map(function (task) {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_components_business_TaskItem__WEBPACK_IMPORTED_MODULE_6__.TaskItem, {
            task: task
          }, task.id);
        })
      })]
    }) : null]
  });
}

/***/ }),

/***/ "./src/components/qd-ui/SectionHeader/index.tsx":
/*!******************************************************!*\
  !*** ./src/components/qd-ui/SectionHeader/index.tsx ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SectionHeader: function() { return /* binding */ SectionHeader; }
/* harmony export */ });
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/.pnpm/@tarojs+plugin-platform-wea_4e8305395171dc1f042a34fd93f3fd6b/node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "webpack/container/remote/react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);



function SectionHeader(_ref) {
  var title = _ref.title,
    action = _ref.action,
    onAction = _ref.onAction;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
    className: "qd-section-header",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Text, {
      className: "qd-section-header__title",
      children: title
    }), action ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Text, {
      className: "qd-section-header__action",
      onClick: onAction,
      children: action
    }) : null]
  });
}

/***/ }),

/***/ "./src/pages/home/index.tsx":
/*!**********************************!*\
  !*** ./src/pages/home/index.tsx ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/runtime */ "webpack/container/remote/@tarojs/runtime");
/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/.pnpm/@tarojs+taro-loader@4.2.1_w_655abde9082470cdb421892bba8a3e04/node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/home/index!./index.tsx */ "./node_modules/.pnpm/@tarojs+taro-loader@4.2.1_w_655abde9082470cdb421892bba8a3e04/node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/home/index!./src/pages/home/index.tsx");


var config = {"navigationBarTitleText":"农间诊","enablePullDownRefresh":true};



var taroOption = (0,_tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__.createPageConfig)(_node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"], 'pages/home/index', {root:{cn:[]}}, config || {})
if (_node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"] && _node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"].behaviors) {
  taroOption.behaviors = (taroOption.behaviors || []).concat(_node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"].behaviors)
}
var inst = Page(taroOption)



/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"]);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors","common"], function() { return __webpack_exec__("./src/pages/home/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map