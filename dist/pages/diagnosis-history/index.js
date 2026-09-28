"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/diagnosis-history/index"],{

/***/ "./node_modules/.pnpm/@tarojs+taro-loader@4.2.1_w_655abde9082470cdb421892bba8a3e04/node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/diagnosis-history/index!./src/pages/diagnosis-history/index.tsx":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@tarojs+taro-loader@4.2.1_w_655abde9082470cdb421892bba8a3e04/node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/diagnosis-history/index!./src/pages/diagnosis-history/index.tsx ***!
  \************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ DiagnosisHistoryPage; }
/* harmony export */ });
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/taro */ "webpack/container/remote/@tarojs/taro");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/.pnpm/@tarojs+plugin-platform-wea_4e8305395171dc1f042a34fd93f3fd6b/node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "webpack/container/remote/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_business_DiagnosisCard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/business/DiagnosisCard */ "./src/components/business/DiagnosisCard/index.tsx");
/* harmony import */ var _components_qd_ui_EmptyState__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/qd-ui/EmptyState */ "./src/components/qd-ui/EmptyState/index.tsx");
/* harmony import */ var _components_qd_ui_PageState__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/qd-ui/PageState */ "./src/components/qd-ui/PageState/index.tsx");
/* harmony import */ var _services_diagnosis_api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/services/diagnosis.api */ "./src/services/diagnosis.api.ts");
/* harmony import */ var _store_auth_store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/store/auth.store */ "./src/store/auth.store.ts");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "webpack/container/remote/react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__);













var filterLabels = {
  ALL: '全部',
  ACTIVE: '处理中',
  COMPLETED: '已完成',
  ATTENTION: '需关注'
};
function DiagnosisHistoryPage() {
  var identity = (0,_store_auth_store__WEBPACK_IMPORTED_MODULE_6__.useAuthStore)(function (state) {
    return state.identity;
  });
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState2 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_useState, 2),
    items = _useState2[0],
    setItems = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true),
    _useState4 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_useState3, 2),
    loading = _useState4[0],
    setLoading = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
    _useState6 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_useState5, 2),
    error = _useState6[0],
    setError = _useState6[1];
  var loadedIdentityRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)();
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('ALL'),
    _useState8 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_useState7, 2),
    filter = _useState8[0],
    setFilter = _useState8[1];
  var load = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(/*#__PURE__*/(0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])(/*#__PURE__*/(0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])().m(function _callee() {
    var response, _t;
    return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])().w(function (_context) {
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
          return _services_diagnosis_api__WEBPACK_IMPORTED_MODULE_5__.diagnosisApi.list();
        case 3:
          response = _context.v;
          setItems(response.data.items);
          setError('');
          _context.n = 5;
          break;
        case 4:
          _context.p = 4;
          _t = _context.v;
          setError(_t instanceof Error ? _t.message : '历史记录加载失败');
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
  var filteredItems = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    return items.filter(function (item) {
      if (filter === 'ALL') return true;
      if (filter === 'ACTIVE') return item.status === 'PENDING' || item.status === 'PROCESSING';
      if (filter === 'COMPLETED') return item.status === 'COMPLETED';
      return item.status === 'FAILED' || item.status === 'NEED_MORE_IMAGES' || item.status === 'NEED_EXPERT_REVIEW';
    });
  }, [filter, items]);
  var filterCounts = {
    ALL: items.length,
    ACTIVE: items.filter(function (item) {
      return item.status === 'PENDING' || item.status === 'PROCESSING';
    }).length,
    COMPLETED: items.filter(function (item) {
      return item.status === 'COMPLETED';
    }).length,
    ATTENTION: items.filter(function (item) {
      return item.status === 'FAILED' || item.status === 'NEED_MORE_IMAGES' || item.status === 'NEED_EXPERT_REVIEW';
    }).length
  };
  if (!identity) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
      className: "page",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_qd_ui_EmptyState__WEBPACK_IMPORTED_MODULE_3__.EmptyState, {
        title: "\u767B\u5F55\u540E\u67E5\u770B\u8BCA\u65AD\u5386\u53F2",
        description: "\u767B\u5F55\u540E\u53EF\u4EE5\u4FDD\u5B58\u8BCA\u65AD\u7ED3\u679C\uFF0C\u5E76\u5728\u590D\u67E5\u65F6\u5BF9\u6BD4\u53D8\u5316\u3002",
        actionLabel: "\u53BB\u767B\u5F55",
        onAction: function onAction() {
          return _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().switchTab({
            url: '/pages/profile/index'
          });
        }
      })
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
    className: "page history-page",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
      className: "page-title",
      children: "\u8BCA\u65AD\u5386\u53F2"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
      className: "page-description",
      children: "\u6309\u65F6\u95F4\u5012\u5E8F\u4FDD\u5B58\uFF0C\u65B9\u4FBF\u590D\u67E5\u5904\u7406\u524D\u540E\u7684\u53D8\u5316\u3002"
    }), loading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_qd_ui_PageState__WEBPACK_IMPORTED_MODULE_4__.LoadingState, {}) : error && items.length === 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_qd_ui_PageState__WEBPACK_IMPORTED_MODULE_4__.ErrorState, {
      title: "\u8BCA\u65AD\u5386\u53F2\u52A0\u8F7D\u5931\u8D25",
      message: error,
      onRetry: load
    }) : items.length === 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_qd_ui_EmptyState__WEBPACK_IMPORTED_MODULE_3__.EmptyState, {
      title: "\u8FD8\u6CA1\u6709\u8BCA\u65AD\u8BB0\u5F55",
      description: "\u62CD\u4E00\u5F20\u5F02\u5E38\u90E8\u4F4D\uFF0C\u5B8C\u6210\u7B2C\u4E00\u6B21\u8F85\u52A9\u8BCA\u65AD\u3002",
      actionLabel: "\u5F00\u59CB\u8BCA\u65AD",
      onAction: function onAction() {
        return _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().switchTab({
          url: '/pages/diagnosis/index'
        });
      }
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
      children: [error ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
        className: "history-stale",
        role: "status",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
          children: "\u7F51\u7EDC\u6682\u65F6\u4E0D\u53EF\u7528\uFF0C\u4EE5\u4E0B\u662F\u6700\u8FD1\u4E00\u6B21\u540C\u6B65\u7684\u8BB0\u5F55\u3002"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
          className: "history-stale__action",
          onClick: load,
          children: "\u91CD\u8BD5"
        })]
      }) : null, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
        className: "history-filter",
        role: "tablist",
        "aria-label": "\u8BCA\u65AD\u8BB0\u5F55\u7B5B\u9009",
        children: Object.keys(filterLabels).map(function (key) {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
            className: "history-filter__item ".concat(filter === key ? 'history-filter__item--active' : ''),
            role: "tab",
            "aria-selected": filter === key,
            onClick: function onClick() {
              return setFilter(key);
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
              children: filterLabels[key]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
              className: "history-filter__count",
              children: filterCounts[key]
            })]
          }, key);
        })
      }), filteredItems.length === 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_qd_ui_EmptyState__WEBPACK_IMPORTED_MODULE_3__.EmptyState, {
        title: "".concat(filterLabels[filter], "\u6682\u65E0\u8BB0\u5F55"),
        description: filter === 'ACTIVE' ? '新的诊断提交后会显示在这里。' : '切换其他筛选条件查看全部诊断记录。'
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
        className: "surface history-list",
        children: filteredItems.map(function (item) {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_business_DiagnosisCard__WEBPACK_IMPORTED_MODULE_2__.DiagnosisCard, {
            diagnosis: item,
            onClick: function onClick() {
              return _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().navigateTo({
                url: "/pages/diagnosis-result/index?id=".concat(item.id)
              });
            }
          }, item.id);
        })
      })]
    })]
  });
}

/***/ }),

/***/ "./src/pages/diagnosis-history/index.tsx":
/*!***********************************************!*\
  !*** ./src/pages/diagnosis-history/index.tsx ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/runtime */ "webpack/container/remote/@tarojs/runtime");
/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_diagnosis_history_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/.pnpm/@tarojs+taro-loader@4.2.1_w_655abde9082470cdb421892bba8a3e04/node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/diagnosis-history/index!./index.tsx */ "./node_modules/.pnpm/@tarojs+taro-loader@4.2.1_w_655abde9082470cdb421892bba8a3e04/node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/diagnosis-history/index!./src/pages/diagnosis-history/index.tsx");


var config = {"navigationBarTitleText":"诊断历史","enablePullDownRefresh":true};



var taroOption = (0,_tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__.createPageConfig)(_node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_diagnosis_history_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"], 'pages/diagnosis-history/index', {root:{cn:[]}}, config || {})
if (_node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_diagnosis_history_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"] && _node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_diagnosis_history_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"].behaviors) {
  taroOption.behaviors = (taroOption.behaviors || []).concat(_node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_diagnosis_history_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"].behaviors)
}
var inst = Page(taroOption)



/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_diagnosis_history_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"]);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors","common"], function() { return __webpack_exec__("./src/pages/diagnosis-history/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map