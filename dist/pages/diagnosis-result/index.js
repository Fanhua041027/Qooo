"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/diagnosis-result/index"],{

/***/ "./node_modules/.pnpm/@tarojs+taro-loader@4.2.1_w_655abde9082470cdb421892bba8a3e04/node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/diagnosis-result/index!./src/pages/diagnosis-result/index.tsx":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@tarojs+taro-loader@4.2.1_w_655abde9082470cdb421892bba8a3e04/node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/diagnosis-result/index!./src/pages/diagnosis-result/index.tsx ***!
  \**********************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ DiagnosisResultPage; }
/* harmony export */ });
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/taro */ "webpack/container/remote/@tarojs/taro");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/.pnpm/@tarojs+plugin-platform-wea_4e8305395171dc1f042a34fd93f3fd6b/node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "webpack/container/remote/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_qd_ui_Badge__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/qd-ui/Badge */ "./src/components/qd-ui/Badge/index.tsx");
/* harmony import */ var _components_qd_ui_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/qd-ui/Button */ "./src/components/qd-ui/Button/index.tsx");
/* harmony import */ var _components_qd_ui_PageState__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/qd-ui/PageState */ "./src/components/qd-ui/PageState/index.tsx");
/* harmony import */ var _components_business_RiskBadge__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/components/business/RiskBadge */ "./src/components/business/RiskBadge/index.tsx");
/* harmony import */ var _components_business_DiagnosisLoop__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/components/business/DiagnosisLoop */ "./src/components/business/DiagnosisLoop/index.tsx");
/* harmony import */ var _features_diagnosis_useDiagnosisPolling__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/features/diagnosis/useDiagnosisPolling */ "./src/features/diagnosis/useDiagnosisPolling.ts");
/* harmony import */ var _services_task_api__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/services/task.api */ "./src/services/task.api.ts");
/* harmony import */ var _services_diagnosis_api__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/services/diagnosis.api */ "./src/services/diagnosis.api.ts");
/* harmony import */ var _services_subscription__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/services/subscription */ "./src/services/subscription.ts");
/* harmony import */ var _utils_format__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @/utils/format */ "./src/utils/format.ts");
/* harmony import */ var _utils_analytics__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @/utils/analytics */ "./src/utils/analytics.ts");
/* harmony import */ var _utils_id__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @/utils/id */ "./src/utils/id.ts");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react/jsx-runtime */ "webpack/container/remote/react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__);




















var actionLabels = {
  DO_NOW: '现在做',
  OBSERVE: '继续观察',
  AVOID: '暂时不要做',
  EXPERT_REVIEW: '请专家复核'
};
function DiagnosisResultPage() {
  var _diagnosis$risk3, _diagnosis$expertRevi, _diagnosis$expertRevi2;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(),
    _useState2 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_13__["default"])(_useState, 2),
    diagnosisId = _useState2[0],
    setDiagnosisId = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState4 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_13__["default"])(_useState3, 2),
    creatingTask = _useState4[0],
    setCreatingTask = _useState4[1];
  var creatingTaskRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState6 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_13__["default"])(_useState5, 2),
    retrying = _useState6[0],
    setRetrying = _useState6[1];
  var retryingRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
  var taskRequestIdRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)();
  var verifyingRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(),
    _useState8 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_13__["default"])(_useState7, 2),
    loopOverride = _useState8[0],
    setLoopOverride = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState0 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_13__["default"])(_useState9, 2),
    verifying = _useState0[0],
    setVerifying = _useState0[1];
  var _useDiagnosisPolling = (0,_features_diagnosis_useDiagnosisPolling__WEBPACK_IMPORTED_MODULE_7__.useDiagnosisPolling)(diagnosisId),
    diagnosis = _useDiagnosisPolling.diagnosis,
    loading = _useDiagnosisPolling.loading,
    error = _useDiagnosisPolling.error,
    pollingTimedOut = _useDiagnosisPolling.pollingTimedOut,
    reload = _useDiagnosisPolling.reload;
  (0,_tarojs_taro__WEBPACK_IMPORTED_MODULE_0__.useLoad)(function (params) {
    return setDiagnosisId(params.id);
  });
  (0,_tarojs_taro__WEBPACK_IMPORTED_MODULE_0__.useDidShow)(function () {
    if (diagnosisId) reload();
  });
  if (loading && !diagnosis) return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.View, {
    className: "page",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_components_qd_ui_PageState__WEBPACK_IMPORTED_MODULE_4__.LoadingState, {
      label: "\u6B63\u5728\u8BFB\u53D6\u8BCA\u65AD\u72B6\u6001"
    })
  });
  if (error && !diagnosis) return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.View, {
    className: "page",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_components_qd_ui_PageState__WEBPACK_IMPORTED_MODULE_4__.ErrorState, {
      title: "\u8BCA\u65AD\u7ED3\u679C\u52A0\u8F7D\u5931\u8D25",
      message: error,
      onRetry: reload
    })
  });
  if (!diagnosis) return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.View, {
    className: "page",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_components_qd_ui_PageState__WEBPACK_IMPORTED_MODULE_4__.ErrorState, {
      message: "\u672A\u627E\u5230\u8BCA\u65AD\u8BB0\u5F55"
    })
  });
  if (diagnosis.status === 'PROCESSING' || diagnosis.status === 'PENDING') {
    var _diagnosis$progress, _diagnosis$progress2;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.View, {
      className: "page result-processing",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.View, {
        className: "result-processing__indicator",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.View, {})
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_components_qd_ui_Badge__WEBPACK_IMPORTED_MODULE_2__.Badge, {
        tone: "info",
        children: "\u8F85\u52A9\u8BCA\u65AD\u8FDB\u884C\u4E2D"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.Text, {
        className: "result-processing__title",
        children: ((_diagnosis$progress = diagnosis.progress) === null || _diagnosis$progress === void 0 ? void 0 : _diagnosis$progress.label) || '正在分析图片'
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.Text, {
        className: "result-processing__description",
        children: "\u901A\u5E38\u4F1A\u5728 30 \u79D2\u5185\u5B8C\u6210\u3002\u4F60\u53EF\u4EE5\u505C\u7559\u5728\u8FD9\u91CC\uFF0C\u4E5F\u53EF\u4EE5\u7A0D\u540E\u4ECE\u8BCA\u65AD\u5386\u53F2\u67E5\u770B\u3002"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.View, {
        className: "result-processing__track",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.View, {
          style: {
            transform: "scaleX(".concat((((_diagnosis$progress2 = diagnosis.progress) === null || _diagnosis$progress2 === void 0 ? void 0 : _diagnosis$progress2.percent) || 45) / 100, ")")
          }
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.Text, {
        className: "result-processing__hint",
        children: "\u8BF7\u52FF\u91CD\u590D\u63D0\u4EA4\u540C\u4E00\u5F20\u56FE\u7247"
      }), pollingTimedOut || error ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.View, {
        className: "result-processing__recovery",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.Text, {
          children: error || '分析等待时间较长，记录已保留。'
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_components_qd_ui_Button__WEBPACK_IMPORTED_MODULE_3__.Button, {
          variant: "secondary",
          onClick: reload,
          children: "\u91CD\u65B0\u67E5\u8BE2"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_components_qd_ui_Button__WEBPACK_IMPORTED_MODULE_3__.Button, {
          variant: "ghost",
          onClick: function onClick() {
            return _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().navigateTo({
              url: '/pages/diagnosis-history/index'
            });
          },
          children: "\u67E5\u770B\u8BCA\u65AD\u5386\u53F2"
        })]
      }) : null]
    });
  }
  if (diagnosis.status === 'FAILED') {
    var _diagnosis$error;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.View, {
      className: "page",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_components_qd_ui_PageState__WEBPACK_IMPORTED_MODULE_4__.ErrorState, {
        message: ((_diagnosis$error = diagnosis.error) === null || _diagnosis$error === void 0 ? void 0 : _diagnosis$error.message) || '本次诊断未完成',
        retrying: retrying,
        onRetry: /*#__PURE__*/(0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_15__["default"])(/*#__PURE__*/(0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_16__["default"])().m(function _callee() {
          var _t;
          return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_16__["default"])().w(function (_context) {
            while (1) switch (_context.p = _context.n) {
              case 0:
                if (!retryingRef.current) {
                  _context.n = 1;
                  break;
                }
                return _context.a(2);
              case 1:
                retryingRef.current = true;
                setRetrying(true);
                _context.p = 2;
                _context.n = 3;
                return _services_diagnosis_api__WEBPACK_IMPORTED_MODULE_9__.diagnosisApi.retry(diagnosis.id);
              case 3:
                reload();
                _context.n = 5;
                break;
              case 4:
                _context.p = 4;
                _t = _context.v;
                _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().showToast({
                  title: _t instanceof Error ? _t.message : '重新分析失败，请稍后重试',
                  icon: 'none'
                });
              case 5:
                _context.p = 5;
                retryingRef.current = false;
                setRetrying(false);
                return _context.f(5);
              case 6:
                return _context.a(2);
            }
          }, _callee, null, [[2, 4, 5, 6]]);
        }))
      })
    });
  }
  if (diagnosis.status === 'NEED_MORE_IMAGES' || diagnosis.decision === 'ASK_MORE') {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.View, {
      className: "page page--with-footer result-follow-up",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_components_qd_ui_Badge__WEBPACK_IMPORTED_MODULE_2__.Badge, {
        tone: "warning",
        children: "\u8FD8\u9700\u8981\u8865\u5145\u4FE1\u606F"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.Text, {
        className: "result-follow-up__title",
        children: "\u8FD9\u6B21\u8FD8\u4E0D\u80FD\u53EF\u9760\u5224\u65AD"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.Text, {
        className: "result-follow-up__description",
        children: diagnosis.disclaimer
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.View, {
        className: "result-follow-up__questions",
        children: (diagnosis.followUpQuestions || []).map(function (question) {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.View, {
            className: "result-follow-up__question",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.Text, {
              children: question.prompt
            }), question.captureHint ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.Text, {
              children: question.captureHint
            }) : null]
          }, question.code);
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.View, {
        className: "fixed-footer",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_components_qd_ui_Button__WEBPACK_IMPORTED_MODULE_3__.Button, {
          block: true,
          size: "lg",
          onClick: function onClick() {
            return _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().switchTab({
              url: '/pages/diagnosis/index'
            });
          },
          children: "\u6309\u63D0\u793A\u91CD\u65B0\u62CD\u6444"
        })
      })]
    });
  }
  var issue = diagnosis.possibleIssues[0];
  var loop = loopOverride || diagnosis.loop || {
    stage: 'JUDGMENT',
    updatedAt: diagnosis.updatedAt
  };
  var verifyLoop = /*#__PURE__*/function () {
    var _ref2 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_15__["default"])(/*#__PURE__*/(0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_16__["default"])().m(function _callee2(outcome) {
      var response, _t2;
      return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_16__["default"])().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            if (!verifyingRef.current) {
              _context2.n = 1;
              break;
            }
            return _context2.a(2);
          case 1:
            verifyingRef.current = true;
            setVerifying(true);
            _context2.p = 2;
            _context2.n = 3;
            return _services_diagnosis_api__WEBPACK_IMPORTED_MODULE_9__.diagnosisApi.verify(diagnosis.id, outcome);
          case 3:
            response = _context2.v;
            if (response.data.loop) setLoopOverride(response.data.loop);
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().showToast({
              title: outcome === 'IMPROVED' ? '已记录改善' : outcome === 'WORSE' ? '将重新判断' : '已记录复查',
              icon: 'success'
            });
            _context2.n = 5;
            break;
          case 4:
            _context2.p = 4;
            _t2 = _context2.v;
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().showToast({
              title: _t2 instanceof Error ? _t2.message : '复查结果保存失败',
              icon: 'none'
            });
          case 5:
            _context2.p = 5;
            verifyingRef.current = false;
            setVerifying(false);
            return _context2.f(5);
          case 6:
            return _context2.a(2);
        }
      }, _callee2, null, [[2, 4, 5, 6]]);
    }));
    return function verifyLoop(_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  var createTask = /*#__PURE__*/function () {
    var _ref3 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_15__["default"])(/*#__PURE__*/(0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_16__["default"])().m(function _callee3() {
      var action, _diagnosis$risk, _diagnosis$risk2, existingTasks, existing, subscription, _t3, _t4, _t5;
      return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_16__["default"])().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            action = diagnosis.actions.find(function (item) {
              return item.type === 'DO_NOW';
            }) || diagnosis.actions[0];
            if (action) {
              _context3.n = 1;
              break;
            }
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().showToast({
              title: '当前没有可转成任务的建议，请先补充图片或联系农技员',
              icon: 'none'
            });
            return _context3.a(2);
          case 1:
            if (!creatingTaskRef.current) {
              _context3.n = 2;
              break;
            }
            return _context3.a(2);
          case 2:
            creatingTaskRef.current = true;
            setCreatingTask(true);
            _context3.p = 3;
            _context3.p = 4;
            _context3.n = 5;
            return _services_task_api__WEBPACK_IMPORTED_MODULE_8__.taskApi.list();
          case 5:
            existingTasks = _context3.v;
            existing = existingTasks.data.items.find(function (task) {
              return task.diagnosisId === diagnosis.id && task.status !== 'COMPLETED';
            });
            if (!existing) {
              _context3.n = 6;
              break;
            }
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().showToast({
              title: '该诊断已创建过任务',
              icon: 'none'
            });
            setTimeout(function () {
              return _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().switchTab({
                url: '/pages/tasks/index'
              });
            }, 700);
            return _context3.a(2);
          case 6:
            _context3.n = 8;
            break;
          case 7:
            _context3.p = 7;
            _t3 = _context3.v;
          case 8:
            taskRequestIdRef.current || (taskRequestIdRef.current = (0,_utils_id__WEBPACK_IMPORTED_MODULE_17__.createClientRequestId)('client_task'));
            _context3.n = 9;
            return _services_task_api__WEBPACK_IMPORTED_MODULE_8__.taskApi.create({
              clientRequestId: taskRequestIdRef.current,
              title: action.title,
              description: action.description,
              plotId: diagnosis.plotId,
              diagnosisId: diagnosis.id,
              priority: ((_diagnosis$risk = diagnosis.risk) === null || _diagnosis$risk === void 0 ? void 0 : _diagnosis$risk.level) === 'HIGH' || ((_diagnosis$risk2 = diagnosis.risk) === null || _diagnosis$risk2 === void 0 ? void 0 : _diagnosis$risk2.level) === 'CRITICAL' ? 'HIGH' : 'MEDIUM',
              dueAt: action.dueAt || new Date(Date.now() + 86400000).toISOString()
            });
          case 9:
            (0,_utils_analytics__WEBPACK_IMPORTED_MODULE_11__.track)('diagnosis_task_created', {
              diagnosisId: diagnosis.id
            });
            subscription = {
              configured: false,
              accepted: false
            };
            _context3.p = 10;
            _context3.n = 11;
            return (0,_services_subscription__WEBPACK_IMPORTED_MODULE_10__.requestTaskSubscription)();
          case 11:
            subscription = _context3.v;
            _context3.n = 13;
            break;
          case 12:
            _context3.p = 12;
            _t4 = _context3.v;
          case 13:
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().showToast({
              title: subscription.configured && subscription.accepted ? '任务和提醒已创建' : '任务已创建',
              icon: 'success'
            });
            setTimeout(function () {
              return _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().switchTab({
                url: '/pages/tasks/index'
              });
            }, 700);
            _context3.n = 15;
            break;
          case 14:
            _context3.p = 14;
            _t5 = _context3.v;
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().showToast({
              title: _t5 instanceof Error ? _t5.message : '任务创建失败',
              icon: 'none'
            });
          case 15:
            _context3.p = 15;
            creatingTaskRef.current = false;
            setCreatingTask(false);
            return _context3.f(15);
          case 16:
            return _context3.a(2);
        }
      }, _callee3, null, [[10, 12], [4, 7], [3, 14, 15, 16]]);
    }));
    return function createTask() {
      return _ref3.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.View, {
    className: "page page--with-footer result-page",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.View, {
      className: "result-summary",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.View, {
        className: "result-summary__top",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_components_qd_ui_Badge__WEBPACK_IMPORTED_MODULE_2__.Badge, {
          tone: "neutral",
          children: "\u8F85\u52A9\u5224\u65AD"
        }), diagnosis.risk ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_components_business_RiskBadge__WEBPACK_IMPORTED_MODULE_5__.RiskBadge, {
          level: diagnosis.risk.level,
          label: diagnosis.risk.label
        }) : null]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.Text, {
        className: "result-summary__crop",
        children: diagnosis.crop
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.Text, {
        className: "result-summary__issue",
        children: (issue === null || issue === void 0 ? void 0 : issue.name) || '暂未识别到明确问题'
      }), issue ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.Text, {
        className: "result-summary__confidence",
        children: ["\u53EF\u4FE1\u5EA6 ", (0,_utils_format__WEBPACK_IMPORTED_MODULE_18__.formatConfidence)(issue.confidence)]
      }) : null, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.Text, {
        className: "result-summary__reason",
        children: (_diagnosis$risk3 = diagnosis.risk) === null || _diagnosis$risk3 === void 0 ? void 0 : _diagnosis$risk3.reason
      })]
    }), (_diagnosis$expertRevi = diagnosis.expertReview) !== null && _diagnosis$expertRevi !== void 0 && _diagnosis$expertRevi.required || diagnosis.status === 'NEED_EXPERT_REVIEW' ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.View, {
      className: "expert-review-callout",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.Text, {
        className: "expert-review-callout__title",
        children: "\u5EFA\u8BAE\u519C\u6280\u5458\u590D\u6838"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.Text, {
        children: ((_diagnosis$expertRevi2 = diagnosis.expertReview) === null || _diagnosis$expertRevi2 === void 0 ? void 0 : _diagnosis$expertRevi2.message) || '当前问题风险较高或容易混淆，请结合田间情况进一步确认。'
      })]
    }) : null, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_components_business_DiagnosisLoop__WEBPACK_IMPORTED_MODULE_6__.DiagnosisLoop, {
      loop: loop,
      verifying: verifying,
      onVerify: verifyLoop
    }), diagnosis.safety && !diagnosis.safety.passed ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.View, {
      className: "result-safety-callout",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.Text, {
        className: "result-safety-callout__title",
        children: "\u5EFA\u8BAE\u5148\u505C\u7528\u5F85\u786E\u8BA4\u7684\u836F\u5242"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.Text, {
        children: "\u5F53\u524D\u7ED3\u679C\u89E6\u53D1\u4E86\u5B89\u5168\u89C4\u5219\u6821\u9A8C\uFF0C\u8BF7\u5148\u8BA9\u5F53\u5730\u519C\u6280\u4EBA\u5458\u590D\u6838\uFF0C\u518D\u51B3\u5B9A\u662F\u5426\u7528\u836F\u3002"
      }), diagnosis.safety.violationCodes.length > 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.Text, {
        className: "result-safety-callout__codes",
        children: ["\u5B89\u5168\u63D0\u793A\uFF1A", diagnosis.safety.violationCodes.join('、')]
      }) : null]
    }) : null, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.View, {
      className: "section",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.Text, {
        className: "section-title",
        children: "\u5224\u65AD\u4F9D\u636E"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.View, {
        className: "result-evidence",
        children: ((issue === null || issue === void 0 ? void 0 : issue.evidence) || []).map(function (item, index) {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.View, {
            className: "result-evidence__item",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.Text, {
              className: "result-evidence__index",
              children: index + 1
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.Text, {
              children: item
            })]
          }, item);
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.View, {
      className: "section",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.Text, {
        className: "section-title",
        children: "\u4E0B\u4E00\u6B65\u600E\u4E48\u505A"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.View, {
        className: "result-actions",
        children: diagnosis.actions.map(function (action) {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.View, {
            className: "result-action result-action--".concat(action.type.toLowerCase()),
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.View, {
              className: "result-action__top",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_components_qd_ui_Badge__WEBPACK_IMPORTED_MODULE_2__.Badge, {
                tone: action.type === 'AVOID' ? 'danger' : action.type === 'DO_NOW' ? 'success' : 'neutral',
                children: actionLabels[action.type]
              }), action.dueAt ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.Text, {
                children: (0,_utils_format__WEBPACK_IMPORTED_MODULE_18__.formatDateTime)(action.dueAt)
              }) : null]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.Text, {
              className: "result-action__title",
              children: action.title
            }), action.description ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.Text, {
              className: "result-action__description",
              children: action.description
            }) : null]
          }, "".concat(action.type, "-").concat(action.title));
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.View, {
      className: "result-trace",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.Text, {
        children: diagnosis.disclaimer
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.Text, {
        children: ["\u6A21\u578B\uFF1A", diagnosis.model.name, " \xB7 ", diagnosis.model.version]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.Text, {
        children: ["\u8BF7\u6C42\u7F16\u53F7\uFF1A", diagnosis.requestId]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.View, {
      className: "fixed-footer",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(_components_qd_ui_Button__WEBPACK_IMPORTED_MODULE_3__.ButtonGroup, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_components_qd_ui_Button__WEBPACK_IMPORTED_MODULE_3__.Button, {
          variant: "secondary",
          onClick: function onClick() {
            return _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().switchTab({
              url: '/pages/diagnosis/index'
            });
          },
          children: "\u8865\u5145\u62CD\u6444"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_components_qd_ui_Button__WEBPACK_IMPORTED_MODULE_3__.Button, {
          loading: creatingTask,
          disabled: !diagnosis.actions.length,
          onClick: createTask,
          children: diagnosis.actions.length ? '创建农事任务' : '暂无可创建任务'
        })]
      })
    })]
  });
}

/***/ }),

/***/ "./src/components/business/DiagnosisLoop/index.tsx":
/*!*********************************************************!*\
  !*** ./src/components/business/DiagnosisLoop/index.tsx ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DiagnosisLoop: function() { return /* binding */ DiagnosisLoop; }
/* harmony export */ });
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/.pnpm/@tarojs+plugin-platform-wea_4e8305395171dc1f042a34fd93f3fd6b/node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _components_qd_ui_Button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/components/qd-ui/Button */ "./src/components/qd-ui/Button/index.tsx");
/* harmony import */ var _utils_format__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/utils/format */ "./src/utils/format.ts");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "webpack/container/remote/react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);





var stages = [{
  key: 'JUDGMENT',
  label: '判断',
  short: '根据图片形成初步判断'
}, {
  key: 'EXECUTION',
  label: '执行',
  short: '把建议转成农事任务'
}, {
  key: 'VERIFICATION',
  label: '验证',
  short: '复查现场变化并记录'
}];
var stageOrder = {
  JUDGMENT: 0,
  EXECUTION: 1,
  VERIFICATION: 2,
  REASSESSMENT: 0,
  CLOSED: 3
};
function DiagnosisLoop(_ref) {
  var loop = _ref.loop,
    _ref$verifying = _ref.verifying,
    verifying = _ref$verifying === void 0 ? false : _ref$verifying,
    onVerify = _ref.onVerify;
  var activeStage = loop.stage === 'REASSESSMENT' ? 'JUDGMENT' : loop.stage === 'CLOSED' ? 'VERIFICATION' : loop.stage;
  var activeIndex = stageOrder[loop.stage];
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.View, {
    className: "diagnosis-loop diagnosis-loop--".concat(loop.stage.toLowerCase()),
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.View, {
      className: "diagnosis-loop__heading",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.View, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.Text, {
          className: "diagnosis-loop__title",
          children: "JEV \u884C\u52A8\u95ED\u73AF"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.Text, {
          className: "diagnosis-loop__subtitle",
          children: loop.stage === 'CLOSED' ? '本轮处理已经完成' : loop.stage === 'REASSESSMENT' ? '复查结果需要重新判断' : '每一次判断都要落到行动和复查'
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.Text, {
        className: "diagnosis-loop__code",
        children: loop.stage === 'CLOSED' ? '完成' : "".concat(activeIndex + 1, "/3")
      })]
    }), loop.nextReviewAt ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.Text, {
      className: "diagnosis-loop__review",
      children: ["\u5EFA\u8BAE\u590D\u67E5\uFF1A", (0,_utils_format__WEBPACK_IMPORTED_MODULE_3__.formatDateTime)(loop.nextReviewAt)]
    }) : null, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.View, {
      className: "diagnosis-loop__steps",
      children: stages.map(function (stage, index) {
        var complete = loop.stage === 'CLOSED' ? true : index < activeIndex;
        var current = stage.key === activeStage;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.View, {
          className: "diagnosis-loop__step ".concat(complete ? 'diagnosis-loop__step--complete' : '', " ").concat(current ? 'diagnosis-loop__step--current' : ''),
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.View, {
            className: "diagnosis-loop__dot",
            children: complete ? '✓' : index + 1
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.View, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.Text, {
              className: "diagnosis-loop__label",
              children: stage.label
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.Text, {
              className: "diagnosis-loop__copy",
              children: stage.short
            })]
          })]
        }, stage.key);
      })
    }), loop.stage === 'VERIFICATION' || loop.stage === 'REASSESSMENT' ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.View, {
      className: "diagnosis-loop__verify",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.Text, {
        className: "diagnosis-loop__verify-title",
        children: loop.stage === 'REASSESSMENT' ? '建议重新判断' : '复查后告诉我们变化'
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.Text, {
        className: "diagnosis-loop__verify-copy",
        children: "\u8BB0\u5F55\u53D8\u5316\u540E\uFF0C\u7CFB\u7EDF\u4F1A\u51B3\u5B9A\u662F\u7ED3\u675F\u672C\u8F6E\uFF0C\u8FD8\u662F\u91CD\u65B0\u62CD\u7167\u5224\u65AD\u3002"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.View, {
        className: "diagnosis-loop__actions",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components_qd_ui_Button__WEBPACK_IMPORTED_MODULE_0__.Button, {
          size: "md",
          loading: verifying,
          onClick: function onClick() {
            return onVerify === null || onVerify === void 0 ? void 0 : onVerify('IMPROVED');
          },
          children: "\u6709\u6539\u5584"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components_qd_ui_Button__WEBPACK_IMPORTED_MODULE_0__.Button, {
          size: "md",
          variant: "secondary",
          loading: verifying,
          onClick: function onClick() {
            return onVerify === null || onVerify === void 0 ? void 0 : onVerify('UNCHANGED');
          },
          children: "\u6CA1\u53D8\u5316"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components_qd_ui_Button__WEBPACK_IMPORTED_MODULE_0__.Button, {
          size: "md",
          variant: "danger",
          loading: verifying,
          onClick: function onClick() {
            return onVerify === null || onVerify === void 0 ? void 0 : onVerify('WORSE');
          },
          children: "\u66F4\u4E25\u91CD"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components_qd_ui_Button__WEBPACK_IMPORTED_MODULE_0__.Button, {
        size: "md",
        variant: "ghost",
        loading: verifying,
        onClick: function onClick() {
          return onVerify === null || onVerify === void 0 ? void 0 : onVerify('UNKNOWN');
        },
        children: "\u6682\u65F6\u770B\u4E0D\u51FA\u6765"
      })]
    }) : null]
  });
}

/***/ }),

/***/ "./src/features/diagnosis/useDiagnosisPolling.ts":
/*!*******************************************************!*\
  !*** ./src/features/diagnosis/useDiagnosisPolling.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useDiagnosisPolling: function() { return /* binding */ useDiagnosisPolling; }
/* harmony export */ });
/* unused harmony exports DIAGNOSIS_POLL_INTERVAL_MS, DIAGNOSIS_POLL_MAX_ATTEMPTS, DIAGNOSIS_POLL_TIMEOUT_MS */
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/container/remote/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services_diagnosis_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/services/diagnosis.api */ "./src/services/diagnosis.api.ts");





var terminalStatuses = new Set(['COMPLETED', 'NEED_MORE_IMAGES', 'NEED_EXPERT_REVIEW', 'FAILED']);
var DIAGNOSIS_POLL_INTERVAL_MS = 1200;
var DIAGNOSIS_POLL_MAX_ATTEMPTS = 25;
var DIAGNOSIS_POLL_TIMEOUT_MS = 45000;
function useDiagnosisPolling(diagnosisId) {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState2 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState, 2),
    diagnosis = _useState2[0],
    setDiagnosis = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState4 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState3, 2),
    loading = _useState4[0],
    setLoading = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState6 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState5, 2),
    error = _useState6[0],
    setError = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState8 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState7, 2),
    pollingTimedOut = _useState8[0],
    setPollingTimedOut = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState0 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState9, 2),
    pollingVersion = _useState0[0],
    setPollingVersion = _useState0[1];
  var pollingRunRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(0);
  var fetchDiagnosis = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(/*#__PURE__*/function () {
    var _ref = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])(/*#__PURE__*/(0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_4__["default"])().m(function _callee(runId) {
      var response, _t;
      return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_4__["default"])().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            if (diagnosisId) {
              _context.n = 1;
              break;
            }
            return _context.a(2, null);
          case 1:
            _context.p = 1;
            _context.n = 2;
            return _services_diagnosis_api__WEBPACK_IMPORTED_MODULE_1__.diagnosisApi.getResult(diagnosisId);
          case 2:
            response = _context.v;
            if (!(pollingRunRef.current !== runId)) {
              _context.n = 3;
              break;
            }
            return _context.a(2, null);
          case 3:
            setDiagnosis(response.data);
            setError('');
            return _context.a(2, response.data);
          case 4:
            _context.p = 4;
            _t = _context.v;
            if (!(pollingRunRef.current !== runId)) {
              _context.n = 5;
              break;
            }
            return _context.a(2, null);
          case 5:
            setError(_t instanceof Error ? _t.message : '诊断结果加载失败');
            return _context.a(2, null);
        }
      }, _callee, null, [[1, 4]]);
    }));
    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }(), [diagnosisId]);
  var retryPolling = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    setPollingTimedOut(false);
    setError('');
    setPollingVersion(function (version) {
      return version + 1;
    });
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    setDiagnosis(null);
    setPollingTimedOut(false);
    if (!diagnosisId) {
      setError('缺少诊断编号');
      setLoading(false);
      return;
    }
    var disposed = false;
    var timer;
    var attempts = 0;
    var startedAt = Date.now();
    var runId = pollingRunRef.current + 1;
    pollingRunRef.current = runId;
    setLoading(true);
    var _poll = /*#__PURE__*/function () {
      var _ref2 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])(/*#__PURE__*/(0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_4__["default"])().m(function _callee2() {
        var next, shouldContinue, timedOut;
        return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_4__["default"])().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              attempts += 1;
              _context2.n = 1;
              return fetchDiagnosis(runId);
            case 1:
              next = _context2.v;
              if (!disposed) {
                _context2.n = 2;
                break;
              }
              return _context2.a(2);
            case 2:
              shouldContinue = !next || !terminalStatuses.has(next.status);
              timedOut = attempts >= DIAGNOSIS_POLL_MAX_ATTEMPTS || Date.now() - startedAt >= DIAGNOSIS_POLL_TIMEOUT_MS;
              if (!(shouldContinue && timedOut)) {
                _context2.n = 3;
                break;
              }
              setLoading(false);
              setPollingTimedOut(true);
              setError('分析等待时间较长，诊断记录仍会保留。你可以稍后重试或从诊断历史查看。');
              return _context2.a(2);
            case 3:
              if (shouldContinue) {
                // 弱网下保留处理中状态并继续轮询，避免首次请求失败就把用户送进死路。
                setLoading(true);
                setError('');
                timer = setTimeout(_poll, DIAGNOSIS_POLL_INTERVAL_MS);
              } else {
                setLoading(false);
              }
            case 4:
              return _context2.a(2);
          }
        }, _callee2);
      }));
      return function poll() {
        return _ref2.apply(this, arguments);
      };
    }();
    void _poll();
    return function () {
      disposed = true;
      if (pollingRunRef.current === runId) pollingRunRef.current += 1;
      if (timer) clearTimeout(timer);
    };
  }, [diagnosisId, fetchDiagnosis, pollingVersion]);
  return {
    diagnosis: diagnosis,
    loading: loading,
    error: error,
    pollingTimedOut: pollingTimedOut,
    reload: retryPolling
  };
}

/***/ }),

/***/ "./src/pages/diagnosis-result/index.tsx":
/*!**********************************************!*\
  !*** ./src/pages/diagnosis-result/index.tsx ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/runtime */ "webpack/container/remote/@tarojs/runtime");
/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_diagnosis_result_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/.pnpm/@tarojs+taro-loader@4.2.1_w_655abde9082470cdb421892bba8a3e04/node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/diagnosis-result/index!./index.tsx */ "./node_modules/.pnpm/@tarojs+taro-loader@4.2.1_w_655abde9082470cdb421892bba8a3e04/node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/diagnosis-result/index!./src/pages/diagnosis-result/index.tsx");


var config = {"navigationBarTitleText":"诊断结果","enableShareAppMessage":true};

_node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_diagnosis_result_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"].enableShareAppMessage = true

var taroOption = (0,_tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__.createPageConfig)(_node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_diagnosis_result_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"], 'pages/diagnosis-result/index', {root:{cn:[]}}, config || {})
if (_node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_diagnosis_result_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"] && _node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_diagnosis_result_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"].behaviors) {
  taroOption.behaviors = (taroOption.behaviors || []).concat(_node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_diagnosis_result_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"].behaviors)
}
var inst = Page(taroOption)



/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_diagnosis_result_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"]);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors","common"], function() { return __webpack_exec__("./src/pages/diagnosis-result/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map