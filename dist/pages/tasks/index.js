"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/tasks/index"],{

/***/ "./node_modules/.pnpm/@tarojs+taro-loader@4.2.1_w_655abde9082470cdb421892bba8a3e04/node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/tasks/index!./src/pages/tasks/index.tsx":
/*!************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@tarojs+taro-loader@4.2.1_w_655abde9082470cdb421892bba8a3e04/node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/tasks/index!./src/pages/tasks/index.tsx ***!
  \************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ TasksPage; }
/* harmony export */ });
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/taro */ "webpack/container/remote/@tarojs/taro");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/.pnpm/@tarojs+plugin-platform-wea_4e8305395171dc1f042a34fd93f3fd6b/node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "webpack/container/remote/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_business_TaskItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/business/TaskItem */ "./src/components/business/TaskItem/index.tsx");
/* harmony import */ var _components_qd_ui_EmptyState__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/qd-ui/EmptyState */ "./src/components/qd-ui/EmptyState/index.tsx");
/* harmony import */ var _components_qd_ui_PageState__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/qd-ui/PageState */ "./src/components/qd-ui/PageState/index.tsx");
/* harmony import */ var _services_task_api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/services/task.api */ "./src/services/task.api.ts");
/* harmony import */ var _store_auth_store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/store/auth.store */ "./src/store/auth.store.ts");
/* harmony import */ var _utils_analytics__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/utils/analytics */ "./src/utils/analytics.ts");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "webpack/container/remote/react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__);














function TasksPage() {
  var identity = (0,_store_auth_store__WEBPACK_IMPORTED_MODULE_6__.useAuthStore)(function (state) {
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
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('PENDING'),
    _useState8 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_9__["default"])(_useState7, 2),
    filter = _useState8[0],
    setFilter = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState0 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_9__["default"])(_useState9, 2),
    completingTaskId = _useState0[0],
    setCompletingTaskId = _useState0[1];
  var completingTaskRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  var _useState1 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState10 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_9__["default"])(_useState1, 2),
    updatingTaskId = _useState10[0],
    setUpdatingTaskId = _useState10[1];
  var updatingTaskRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
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
          return _services_task_api__WEBPACK_IMPORTED_MODULE_5__.taskApi.list();
        case 3:
          response = _context.v;
          setItems(response.data.items);
          setError('');
          _context.n = 5;
          break;
        case 4:
          _context.p = 4;
          _t = _context.v;
          setError(_t instanceof Error ? _t.message : '任务加载失败');
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
  var visibleItems = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    return items.filter(function (item) {
      if (filter === 'COMPLETED') return item.status === 'COMPLETED';
      if (filter === 'OVERDUE') return item.status === 'OVERDUE';
      return item.status !== 'COMPLETED';
    });
  }, [filter, items]);
  var pendingCount = items.filter(function (item) {
    return item.status !== 'COMPLETED';
  }).length;
  var completedCount = items.filter(function (item) {
    return item.status === 'COMPLETED';
  }).length;
  var overdueCount = items.filter(function (item) {
    return item.status === 'OVERDUE';
  }).length;
  var complete = /*#__PURE__*/function () {
    var _ref2 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])(/*#__PURE__*/(0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_11__["default"])().m(function _callee2(task, note) {
      var _t2;
      return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_11__["default"])().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            if (!completingTaskRef.current) {
              _context2.n = 1;
              break;
            }
            return _context2.a(2);
          case 1:
            completingTaskRef.current = task.id;
            setCompletingTaskId(task.id);
            _context2.p = 2;
            _context2.n = 3;
            return _services_task_api__WEBPACK_IMPORTED_MODULE_5__.taskApi.complete(task.id, note);
          case 3:
            (0,_utils_analytics__WEBPACK_IMPORTED_MODULE_7__.track)('task_completed', {
              taskId: task.id
            });
            _context2.n = 4;
            return load();
          case 4:
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().showToast({
              title: '任务已完成',
              icon: 'success'
            });
            _context2.n = 6;
            break;
          case 5:
            _context2.p = 5;
            _t2 = _context2.v;
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().showToast({
              title: _t2 instanceof Error ? _t2.message : '操作失败',
              icon: 'none'
            });
          case 6:
            _context2.p = 6;
            completingTaskRef.current = null;
            setCompletingTaskId(null);
            return _context2.f(6);
          case 7:
            return _context2.a(2);
        }
      }, _callee2, null, [[2, 5, 6, 7]]);
    }));
    return function complete(_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }();
  var update = /*#__PURE__*/function () {
    var _ref3 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])(/*#__PURE__*/(0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_11__["default"])().m(function _callee3(task, input) {
      var _t3;
      return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_11__["default"])().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            if (!updatingTaskRef.current) {
              _context3.n = 1;
              break;
            }
            return _context3.a(2, false);
          case 1:
            updatingTaskRef.current = task.id;
            setUpdatingTaskId(task.id);
            _context3.p = 2;
            _context3.n = 3;
            return _services_task_api__WEBPACK_IMPORTED_MODULE_5__.taskApi.update(task.id, input);
          case 3:
            (0,_utils_analytics__WEBPACK_IMPORTED_MODULE_7__.track)('task_updated', {
              taskId: task.id
            });
            _context3.n = 4;
            return load();
          case 4:
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().showToast({
              title: '任务已更新',
              icon: 'success'
            });
            return _context3.a(2, true);
          case 5:
            _context3.p = 5;
            _t3 = _context3.v;
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().showToast({
              title: _t3 instanceof Error ? _t3.message : '任务更新失败',
              icon: 'none'
            });
            return _context3.a(2, false);
          case 6:
            _context3.p = 6;
            updatingTaskRef.current = null;
            setUpdatingTaskId(null);
            return _context3.f(6);
          case 7:
            return _context3.a(2);
        }
      }, _callee3, null, [[2, 5, 6, 7]]);
    }));
    return function update(_x3, _x4) {
      return _ref3.apply(this, arguments);
    };
  }();
  if (!identity) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
      className: "page",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_qd_ui_EmptyState__WEBPACK_IMPORTED_MODULE_3__.EmptyState, {
        title: "\u767B\u5F55\u540E\u67E5\u770B\u4EFB\u52A1",
        description: "\u8BCA\u65AD\u5EFA\u8BAE\u53EF\u4E00\u952E\u8F6C\u6210\u519C\u4E8B\u4EFB\u52A1\u3002",
        actionLabel: "\u53BB\u767B\u5F55",
        onAction: function onAction() {
          return _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().switchTab({
            url: '/pages/profile/index'
          });
        }
      })
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
    className: "page tasks-page",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
      className: "page-title",
      children: "\u519C\u4E8B\u4EFB\u52A1"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
      className: "page-description",
      children: "\u628A\u8BCA\u65AD\u5EFA\u8BAE\u53D8\u6210\u53EF\u6267\u884C\u3001\u53EF\u8FFD\u8E2A\u7684\u884C\u52A8\u3002"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
      className: "tasks-overview",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
          className: "tasks-overview__value",
          children: pendingCount
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
          className: "tasks-overview__label",
          children: "\u5F85\u5904\u7406"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
          className: "tasks-overview__value",
          children: completedCount
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
          className: "tasks-overview__label",
          children: "\u5DF2\u5B8C\u6210"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
          className: "tasks-overview__value ".concat(overdueCount ? 'tasks-overview__value--warning' : ''),
          children: overdueCount
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
          className: "tasks-overview__label",
          children: "\u5DF2\u903E\u671F"
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
      className: "tasks-filter",
      role: "tablist",
      "aria-label": "\u519C\u4E8B\u4EFB\u52A1\u7B5B\u9009",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
        className: filter === 'PENDING' ? 'tasks-filter__active' : '',
        role: "tab",
        "aria-selected": filter === 'PENDING',
        onClick: function onClick() {
          return setFilter('PENDING');
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
          children: "\u5F85\u5904\u7406"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
          className: "tasks-filter__count",
          children: pendingCount
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
        className: filter === 'OVERDUE' ? 'tasks-filter__active' : '',
        role: "tab",
        "aria-selected": filter === 'OVERDUE',
        onClick: function onClick() {
          return setFilter('OVERDUE');
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
          children: "\u5DF2\u903E\u671F"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
          className: "tasks-filter__count",
          children: overdueCount
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
        className: filter === 'COMPLETED' ? 'tasks-filter__active' : '',
        role: "tab",
        "aria-selected": filter === 'COMPLETED',
        onClick: function onClick() {
          return setFilter('COMPLETED');
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
          children: "\u5DF2\u5B8C\u6210"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
          className: "tasks-filter__count",
          children: completedCount
        })]
      })]
    }), loading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_qd_ui_PageState__WEBPACK_IMPORTED_MODULE_4__.LoadingState, {}) : error && items.length === 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_qd_ui_PageState__WEBPACK_IMPORTED_MODULE_4__.ErrorState, {
      title: "\u4EFB\u52A1\u52A0\u8F7D\u5931\u8D25",
      message: error,
      onRetry: load
    }) : visibleItems.length === 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_qd_ui_EmptyState__WEBPACK_IMPORTED_MODULE_3__.EmptyState, {
      title: filter === 'PENDING' ? '当前没有待处理任务' : filter === 'OVERDUE' ? '暂无逾期任务' : '还没有完成记录',
      description: filter === 'PENDING' ? '从诊断结果创建任务，避免错过处理窗口。' : filter === 'OVERDUE' ? '按计划完成任务，逾期事项会集中显示在这里。' : '完成任务后，记录会显示在这里。',
      actionLabel: filter === 'PENDING' ? '开始诊断' : undefined,
      onAction: filter === 'PENDING' ? function () {
        return _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().switchTab({
          url: '/pages/diagnosis/index'
        });
      } : undefined
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
      children: [error ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
        className: "tasks-stale",
        role: "status",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
          children: "\u7F51\u7EDC\u6682\u65F6\u4E0D\u53EF\u7528\uFF0C\u4EE5\u4E0B\u662F\u6700\u8FD1\u4E00\u6B21\u540C\u6B65\u7684\u4EFB\u52A1\u3002"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
          className: "tasks-stale__action",
          onClick: load,
          children: "\u91CD\u8BD5"
        })]
      }) : null, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
        className: "surface tasks-list",
        children: visibleItems.map(function (task) {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_business_TaskItem__WEBPACK_IMPORTED_MODULE_2__.TaskItem, {
            task: task,
            loading: completingTaskId === task.id,
            updating: updatingTaskId === task.id,
            onComplete: task.status !== 'COMPLETED' ? function (note) {
              return complete(task, note);
            } : undefined,
            onUpdate: task.status !== 'COMPLETED' ? function (input) {
              return update(task, input);
            } : undefined
          }, task.id);
        })
      })]
    })]
  });
}

/***/ }),

/***/ "./src/pages/tasks/index.tsx":
/*!***********************************!*\
  !*** ./src/pages/tasks/index.tsx ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/runtime */ "webpack/container/remote/@tarojs/runtime");
/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_tasks_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/.pnpm/@tarojs+taro-loader@4.2.1_w_655abde9082470cdb421892bba8a3e04/node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/tasks/index!./index.tsx */ "./node_modules/.pnpm/@tarojs+taro-loader@4.2.1_w_655abde9082470cdb421892bba8a3e04/node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/tasks/index!./src/pages/tasks/index.tsx");


var config = {"navigationBarTitleText":"农事任务","enablePullDownRefresh":true};



var taroOption = (0,_tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__.createPageConfig)(_node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_tasks_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"], 'pages/tasks/index', {root:{cn:[]}}, config || {})
if (_node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_tasks_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"] && _node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_tasks_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"].behaviors) {
  taroOption.behaviors = (taroOption.behaviors || []).concat(_node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_tasks_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"].behaviors)
}
var inst = Page(taroOption)



/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_tasks_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"]);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors","common"], function() { return __webpack_exec__("./src/pages/tasks/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map