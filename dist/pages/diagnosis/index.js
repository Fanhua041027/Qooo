"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/diagnosis/index"],{

/***/ "./node_modules/.pnpm/@tarojs+taro-loader@4.2.1_w_655abde9082470cdb421892bba8a3e04/node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/diagnosis/index!./src/pages/diagnosis/index.tsx":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@tarojs+taro-loader@4.2.1_w_655abde9082470cdb421892bba8a3e04/node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/diagnosis/index!./src/pages/diagnosis/index.tsx ***!
  \********************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ DiagnosisPage; }
/* harmony export */ });
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/typeof.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/taro */ "webpack/container/remote/@tarojs/taro");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/.pnpm/@tarojs+plugin-platform-wea_4e8305395171dc1f042a34fd93f3fd6b/node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "webpack/container/remote/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_qd_ui_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/qd-ui/Button */ "./src/components/qd-ui/Button/index.tsx");
/* harmony import */ var _components_qd_ui_Badge__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/qd-ui/Badge */ "./src/components/qd-ui/Badge/index.tsx");
/* harmony import */ var _components_qd_ui_PageState__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/qd-ui/PageState */ "./src/components/qd-ui/PageState/index.tsx");
/* harmony import */ var _components_qd_ui_Field__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/components/qd-ui/Field */ "./src/components/qd-ui/Field/index.tsx");
/* harmony import */ var _services_farm_api__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/services/farm.api */ "./src/services/farm.api.ts");
/* harmony import */ var _services_diagnosis_api__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/services/diagnosis.api */ "./src/services/diagnosis.api.ts");
/* harmony import */ var _services_media_api__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/services/media.api */ "./src/services/media.api.ts");
/* harmony import */ var _store_auth_store__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/store/auth.store */ "./src/store/auth.store.ts");
/* harmony import */ var _utils_id__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @/utils/id */ "./src/utils/id.ts");
/* harmony import */ var _utils_analytics__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/utils/analytics */ "./src/utils/analytics.ts");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react/jsx-runtime */ "webpack/container/remote/react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__);




















var cropOptions = ['番茄', '黄瓜', '水稻', '玉米', '柑橘'];
function DiagnosisPage() {
  var identity = (0,_store_auth_store__WEBPACK_IMPORTED_MODULE_9__.useAuthStore)(function (state) {
    return state.identity;
  });
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState2 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_12__["default"])(_useState, 2),
    plots = _useState2[0],
    setPlots = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0),
    _useState4 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_12__["default"])(_useState3, 2),
    plotSelection = _useState4[0],
    setPlotSelection = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('番茄'),
    _useState6 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_12__["default"])(_useState5, 2),
    cropName = _useState6[0],
    setCropName = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('开花期'),
    _useState8 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_12__["default"])(_useState7, 2),
    growthStage = _useState8[0],
    setGrowthStage = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
    _useState0 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_12__["default"])(_useState9, 2),
    symptomDescription = _useState0[0],
    setSymptomDescription = _useState0[1];
  var _useState1 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState10 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_12__["default"])(_useState1, 2),
    image = _useState10[0],
    setImage = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState12 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_12__["default"])(_useState11, 2),
    loading = _useState12[0],
    setLoading = _useState12[1];
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0),
    _useState14 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_12__["default"])(_useState13, 2),
    progress = _useState14[0],
    setProgress = _useState14[1];
  var _useState15 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
    _useState16 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_12__["default"])(_useState15, 2),
    error = _useState16[0],
    setError = _useState16[1];
  var _useState17 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState18 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_12__["default"])(_useState17, 2),
    permissionDenied = _useState18[0],
    setPermissionDenied = _useState18[1];
  var submittingRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
  var clientRequestIdRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)();
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    var active = true;
    if (!identity) {
      setPlots([]);
      setPlotSelection(0);
      setError('');
      return function () {
        active = false;
      };
    }
    _services_farm_api__WEBPACK_IMPORTED_MODULE_6__.farmApi.list().then(function (response) {
      if (active) setPlots(response.data.items.flatMap(function (farm) {
        return farm.plots || [];
      }));
    }).catch(function (reason) {
      if (active) setError(reason instanceof Error ? reason.message : '地块加载失败');
    });
    return function () {
      active = false;
    };
  }, [identity]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (plotSelection > plots.length) setPlotSelection(0);
  }, [plotSelection, plots.length]);
  var selectedPlot = plotSelection > 0 ? plots[plotSelection - 1] : undefined;
  var plotNames = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    return ['暂不关联地块'].concat((0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_13__["default"])(plots.map(function (plot) {
      return "".concat(plot.name, " \xB7 ").concat(plot.cropName);
    })));
  }, [plots]);
  var handlePlotChange = function handlePlotChange(event) {
    var nextSelection = Number(event.detail.value);
    var nextPlot = nextSelection > 0 ? plots[nextSelection - 1] : undefined;
    setPlotSelection(nextSelection);
    if (nextPlot) {
      setCropName(nextPlot.cropName);
      setGrowthStage(nextPlot.growthStage || '');
    }
  };
  var chooseImage = /*#__PURE__*/function () {
    var _ref = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_14__["default"])(/*#__PURE__*/(0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_15__["default"])().m(function _callee() {
      var selected, message, _t;
      return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_15__["default"])().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            setError('');
            setPermissionDenied(false);
            _context.n = 1;
            return (0,_services_media_api__WEBPACK_IMPORTED_MODULE_8__.chooseDiagnosisImage)();
          case 1:
            selected = _context.v;
            // 更换图片后必须生成新的幂等键，避免复用上一张图片的请求。
            clientRequestIdRef.current = undefined;
            setImage(selected);
            (0,_utils_analytics__WEBPACK_IMPORTED_MODULE_10__.track)('diagnosis_image_selected', {
              quality: selected.quality.status
            });
            _context.n = 4;
            break;
          case 2:
            _context.p = 2;
            _t = _context.v;
            if (!(_t instanceof _services_media_api__WEBPACK_IMPORTED_MODULE_8__.MediaPermissionError)) {
              _context.n = 3;
              break;
            }
            setPermissionDenied(true);
            setError(_t.message);
            return _context.a(2);
          case 3:
            message = _t instanceof Error ? _t.message : (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_16__["default"])(_t) === 'object' && _t !== null && 'errMsg' in _t ? String(_t.errMsg || '无法读取图片') : '无法读取图片';
            if (!/cancel/i.test(message)) setError(message);
          case 4:
            return _context.a(2);
        }
      }, _callee, null, [[0, 2]]);
    }));
    return function chooseImage() {
      return _ref.apply(this, arguments);
    };
  }();
  var removeImage = function removeImage() {
    clientRequestIdRef.current = undefined;
    setImage(null);
    setError('');
  };
  var openSettingsForPermission = /*#__PURE__*/function () {
    var _ref2 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_14__["default"])(/*#__PURE__*/(0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_15__["default"])().m(function _callee2() {
      var settings, authSetting, _t2;
      return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_15__["default"])().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            _context2.p = 0;
            _context2.n = 1;
            return _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().openSetting();
          case 1:
            _context2.n = 2;
            return _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().getSetting();
          case 2:
            settings = _context2.v;
            authSetting = settings.authSetting;
            if (!((authSetting === null || authSetting === void 0 ? void 0 : authSetting['scope.camera']) === false && (authSetting === null || authSetting === void 0 ? void 0 : authSetting['scope.album']) === false)) {
              _context2.n = 3;
              break;
            }
            setPermissionDenied(true);
            setError('仍未获得图片权限，请允许访问相机或相册后再试。');
            return _context2.a(2);
          case 3:
            setPermissionDenied(false);
            setError('');
            _context2.n = 5;
            break;
          case 4:
            _context2.p = 4;
            _t2 = _context2.v;
            setError('暂时无法打开微信设置，请在微信的设置中允许访问相机或相册。');
          case 5:
            return _context2.a(2);
        }
      }, _callee2, null, [[0, 4]]);
    }));
    return function openSettingsForPermission() {
      return _ref2.apply(this, arguments);
    };
  }();
  var submit = /*#__PURE__*/function () {
    var _ref3 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_14__["default"])(/*#__PURE__*/(0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_15__["default"])().m(function _callee3() {
      var result, _result, uploaded, response, _t3;
      return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_15__["default"])().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            if (identity) {
              _context3.n = 2;
              break;
            }
            _context3.n = 1;
            return _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().showModal({
              title: '请先登录',
              content: '登录后才能保存诊断记录和后续任务。',
              confirmText: '去登录'
            });
          case 1:
            result = _context3.v;
            if (result.confirm) _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().switchTab({
              url: '/pages/profile/index'
            });
            return _context3.a(2);
          case 2:
            if (!(!image || loading || submittingRef.current)) {
              _context3.n = 3;
              break;
            }
            return _context3.a(2);
          case 3:
            // 在弹出质量确认前就锁定提交，避免快速连点打开多个确认框并重复创建诊断。
            submittingRef.current = true;
            if (!(image.quality.status === 'FAILED')) {
              _context3.n = 4;
              break;
            }
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().showToast({
              title: '请重新选择清晰图片',
              icon: 'none'
            });
            submittingRef.current = false;
            return _context3.a(2);
          case 4:
            if (!(image.quality.status === 'WARNING')) {
              _context3.n = 6;
              break;
            }
            _context3.n = 5;
            return _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().showModal({
              title: '图片质量有限',
              content: image.quality.issues.join('；'),
              confirmText: '继续提交',
              cancelText: '重新拍摄'
            });
          case 5:
            _result = _context3.v;
            if (_result.confirm) {
              _context3.n = 6;
              break;
            }
            submittingRef.current = false;
            return _context3.a(2);
          case 6:
            // 同一张图片的失败重试复用幂等键，避免服务端成功但客户端超时后创建重复诊断。
            clientRequestIdRef.current || (clientRequestIdRef.current = (0,_utils_id__WEBPACK_IMPORTED_MODULE_17__.createClientRequestId)('client_diag'));
            setLoading(true);
            setError('');
            setProgress(10);
            _context3.p = 7;
            _context3.n = 8;
            return (0,_services_media_api__WEBPACK_IMPORTED_MODULE_8__.uploadDiagnosisImage)(image, function (percent) {
              return setProgress(Math.max(10, Math.round(percent * 0.45)));
            });
          case 8:
            uploaded = _context3.v;
            setProgress(58);
            _context3.n = 9;
            return _services_diagnosis_api__WEBPACK_IMPORTED_MODULE_7__.diagnosisApi.create({
              plotId: selectedPlot === null || selectedPlot === void 0 ? void 0 : selectedPlot.id,
              crop: {
                name: cropName.trim(),
                growthStage: growthStage.trim()
              },
              description: symptomDescription.trim() || undefined,
              images: [uploaded],
              clientRequestId: clientRequestIdRef.current
            });
          case 9:
            response = _context3.v;
            setProgress(100);
            (0,_utils_analytics__WEBPACK_IMPORTED_MODULE_10__.track)('diagnosis_submitted', {
              diagnosisId: response.data.id
            });
            clientRequestIdRef.current = undefined;
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().navigateTo({
              url: "/pages/diagnosis-result/index?id=".concat(response.data.id)
            });
            _context3.n = 11;
            break;
          case 10:
            _context3.p = 10;
            _t3 = _context3.v;
            setError(_t3 instanceof Error ? _t3.message : '提交失败，请重试');
            (0,_utils_analytics__WEBPACK_IMPORTED_MODULE_10__.track)('diagnosis_submit_failed');
          case 11:
            _context3.p = 11;
            submittingRef.current = false;
            setLoading(false);
            return _context3.f(11);
          case 12:
            return _context3.a(2);
        }
      }, _callee3, null, [[7, 10, 11, 12]]);
    }));
    return function submit() {
      return _ref3.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.View, {
    className: "page page--with-footer diagnosis-page",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
      className: "page-title",
      children: "\u628A\u5F02\u5E38\u90E8\u4F4D\u62CD\u6E05\u695A"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
      className: "page-description",
      children: "\u4E00\u5F20\u6E05\u6670\u7167\u7247\u6BD4\u591A\u5F20\u8FDC\u666F\u66F4\u6709\u7528\u3002\u7ED3\u679C\u4EC5\u7528\u4E8E\u8F85\u52A9\u5224\u65AD\u3002"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.View, {
      className: "diagnosis-steps",
      "aria-label": loading ? '正在分析，第二步' : '正在拍摄，第一步',
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.View, {
        className: "diagnosis-step ".concat(loading ? 'diagnosis-step--done' : 'diagnosis-step--active'),
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
          children: "1"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
          children: "\u62CD\u6444"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.View, {
        className: "diagnosis-step ".concat(loading ? 'diagnosis-step--active' : ''),
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
          children: "2"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
          children: "\u5206\u6790"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.View, {
        className: "diagnosis-step",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
          children: "3"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
          children: "\u5EFA\u8BAE"
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.View, {
      className: "section",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
        className: "section-title",
        children: "\u4F5C\u7269\u4FE1\u606F"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.View, {
        className: "surface diagnosis-form",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.View, {
          className: "diagnosis-picker",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
            className: "diagnosis-picker__label",
            children: "\u5173\u8054\u5730\u5757"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Picker, {
            mode: "selector",
            range: plotNames,
            value: plotSelection,
            onChange: handlePlotChange,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.View, {
              className: "diagnosis-picker__value",
              children: selectedPlot ? "".concat(selectedPlot.name, " \xB7 ").concat(selectedPlot.cropName) : '暂不关联地块'
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_components_qd_ui_Field__WEBPACK_IMPORTED_MODULE_5__.Field, {
          label: "\u4F5C\u7269\u540D\u79F0",
          value: cropName,
          placeholder: "\u4F8B\u5982\uFF1A\u756A\u8304",
          onChange: setCropName
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.View, {
          className: "diagnosis-crop-options",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
            className: "diagnosis-crop-options__label",
            children: "\u5E38\u7528\u4F5C\u7269"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.View, {
            className: "diagnosis-crop-options__list",
            children: cropOptions.map(function (crop) {
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
                className: "diagnosis-crop-option ".concat(cropName === crop ? 'diagnosis-crop-option--selected' : ''),
                onClick: function onClick() {
                  return setCropName(crop);
                },
                children: crop
              }, crop);
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_components_qd_ui_Field__WEBPACK_IMPORTED_MODULE_5__.Field, {
          label: "\u751F\u957F\u9636\u6BB5",
          value: growthStage,
          placeholder: "\u4F8B\u5982\uFF1A\u5F00\u82B1\u671F",
          onChange: setGrowthStage
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_components_qd_ui_Field__WEBPACK_IMPORTED_MODULE_5__.Field, {
          label: "\u75C7\u72B6\u8865\u5145\uFF08\u53EF\u9009\uFF09",
          value: symptomDescription,
          placeholder: "\u4F8B\u5982\uFF1A\u4E09\u5929\u524D\u5F00\u59CB\u51FA\u73B0\uFF0C\u5148\u4ECE\u4E0B\u90E8\u53F6\u7247\u53D8\u9EC4",
          multiline: true,
          maxLength: 160,
          onChange: setSymptomDescription
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
          className: "diagnosis-form__hint",
          children: [symptomDescription.length, "/160 \u5B57\uFF0C\u63CF\u8FF0\u51FA\u73B0\u65F6\u95F4\u3001\u4F4D\u7F6E\u548C\u53D8\u5316\u4F1A\u66F4\u6709\u5E2E\u52A9"]
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.View, {
      className: "section",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
        className: "section-title",
        children: "\u5F02\u5E38\u7167\u7247"
      }), image ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.View, {
        className: "diagnosis-preview surface",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Image, {
          className: "diagnosis-preview__image",
          src: image.url,
          mode: "aspectFill",
          onClick: function onClick() {
            return _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().previewImage({
              urls: [image.url]
            });
          }
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.View, {
          className: "diagnosis-preview__body",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_components_qd_ui_Badge__WEBPACK_IMPORTED_MODULE_3__.Badge, {
            tone: image.quality.status === 'PASS' ? 'success' : image.quality.status === 'WARNING' ? 'warning' : 'danger',
            children: image.quality.status === 'PASS' ? '基础质量通过' : image.quality.status === 'WARNING' ? '建议检查图片' : '需要重新拍摄'
          }), typeof image.quality.score === 'number' ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.View, {
            className: "diagnosis-preview__quality",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.View, {
              className: "diagnosis-preview__quality-top",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
                children: "\u62CD\u6444\u8D28\u91CF"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
                children: [image.quality.score, " \u5206"]
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.View, {
              className: "diagnosis-preview__quality-track diagnosis-preview__quality-track--".concat(image.quality.status.toLowerCase()),
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.View, {
                style: {
                  transform: "scaleX(".concat((image.quality.score || 0) / 100, ")")
                }
              })
            })]
          }) : null, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
            className: "diagnosis-preview__meta",
            children: [image.width, " \xD7 ", image.height]
          }), image.quality.issues.map(function (issue) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
              className: "diagnosis-preview__issue",
              children: issue
            }, issue);
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.View, {
            className: "diagnosis-preview__actions",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
              onClick: chooseImage,
              children: "\u91CD\u65B0\u9009\u62E9"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
              onClick: removeImage,
              children: "\u79FB\u9664"
            })]
          })]
        })]
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.View, {
        className: "diagnosis-upload",
        onClick: chooseImage,
        role: "button",
        "aria-label": "\u62CD\u7167\u6216\u4ECE\u76F8\u518C\u9009\u62E9\u56FE\u7247",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.View, {
          className: "diagnosis-upload__focus"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
          className: "diagnosis-upload__title",
          children: "\u62CD\u7167\u6216\u4ECE\u76F8\u518C\u9009\u62E9"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
          className: "diagnosis-upload__description",
          children: "\u9760\u8FD1\u75C5\u6591 \xB7 \u4E3B\u4F53\u5B8C\u6574 \xB7 \u907F\u514D\u9006\u5149\u548C\u53CD\u5149"
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.View, {
      className: "diagnosis-tips",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
        className: "diagnosis-tips__title",
        children: "\u62CD\u6444\u8981\u70B9"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.View, {
        className: "diagnosis-tip-row",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
          className: "diagnosis-tip-row__index",
          children: "1"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
          children: "\u8BA9\u75C5\u6591\u5360\u753B\u9762\u4E00\u534A\u4EE5\u4E0A\uFF0C\u4FDD\u7559\u8FB9\u7F18\u548C\u4E00\u5C0F\u5757\u5065\u5EB7\u7EC4\u7EC7\u3002"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.View, {
        className: "diagnosis-tip-row",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
          className: "diagnosis-tip-row__index",
          children: "2"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
          children: "\u907F\u5F00\u9006\u5149\u3001\u53CD\u5149\u548C\u624B\u90E8\u9634\u5F71\uFF0C\u53F6\u7247\u6B63\u53CD\u9762\u5404\u62CD\u4E00\u5F20\u66F4\u597D\u3002"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.View, {
        className: "diagnosis-tip-row",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
          className: "diagnosis-tip-row__index",
          children: "3"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.Text, {
          children: "\u5F53\u524D\u5BA2\u6237\u7AEF\u5148\u68C0\u67E5\u5C3A\u5BF8\u548C\u538B\u7F29\u60C5\u51B5\uFF0C\u4EAE\u5EA6\u3001\u6E05\u6670\u5EA6\u4E0E\u4E3B\u4F53\u7531\u670D\u52A1\u7AEF\u590D\u6838\u3002"
        })]
      })]
    }), error ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_components_qd_ui_PageState__WEBPACK_IMPORTED_MODULE_4__.ErrorState, {
      title: permissionDenied ? '需要图片权限' : undefined,
      message: error,
      onRetry: permissionDenied ? undefined : image ? submit : chooseImage,
      actionLabel: "\u524D\u5F80\u8BBE\u7F6E",
      onAction: permissionDenied ? openSettingsForPermission : undefined
    }) : null, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.View, {
      className: "fixed-footer",
      children: [loading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.View, {
        className: "diagnosis-progress",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_18__.View, {
          className: "diagnosis-progress__bar",
          style: {
            transform: "scaleX(".concat(progress / 100, ")")
          }
        })
      }) : null, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_components_qd_ui_Button__WEBPACK_IMPORTED_MODULE_2__.Button, {
        block: true,
        size: "lg",
        loading: loading,
        disabled: !image || !cropName.trim(),
        onClick: submit,
        children: image ? '提交诊断' : '请先选择图片'
      })]
    })]
  });
}

/***/ }),

/***/ "./src/pages/diagnosis/index.tsx":
/*!***************************************!*\
  !*** ./src/pages/diagnosis/index.tsx ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/runtime */ "webpack/container/remote/@tarojs/runtime");
/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_diagnosis_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/.pnpm/@tarojs+taro-loader@4.2.1_w_655abde9082470cdb421892bba8a3e04/node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/diagnosis/index!./index.tsx */ "./node_modules/.pnpm/@tarojs+taro-loader@4.2.1_w_655abde9082470cdb421892bba8a3e04/node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/diagnosis/index!./src/pages/diagnosis/index.tsx");


var config = {"navigationBarTitleText":"拍照诊断"};



var taroOption = (0,_tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__.createPageConfig)(_node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_diagnosis_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"], 'pages/diagnosis/index', {root:{cn:[]}}, config || {})
if (_node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_diagnosis_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"] && _node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_diagnosis_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"].behaviors) {
  taroOption.behaviors = (taroOption.behaviors || []).concat(_node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_diagnosis_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"].behaviors)
}
var inst = Page(taroOption)



/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_diagnosis_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"]);


/***/ }),

/***/ "./src/services/media.api.ts":
/*!***********************************!*\
  !*** ./src/services/media.api.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MediaPermissionError: function() { return /* binding */ MediaPermissionError; },
/* harmony export */   chooseDiagnosisImage: function() { return /* binding */ chooseDiagnosisImage; },
/* harmony export */   uploadDiagnosisImage: function() { return /* binding */ uploadDiagnosisImage; }
/* harmony export */ });
/* unused harmony exports MAX_DIAGNOSIS_IMAGE_BYTES, MediaContractError, inspectImageQuality */
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/typeof.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/createClass.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/classCallCheck.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_callSuper_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/callSuper.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/callSuper.js");
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/inherits.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_wrapNativeSuper_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/wrapNativeSuper.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/wrapNativeSuper.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/taro */ "webpack/container/remote/@tarojs/taro");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _config_env__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/config/env */ "./src/config/env.ts");
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./client */ "./src/services/client.ts");












var MAX_DIAGNOSIS_IMAGE_BYTES = 10 * 1024 * 1024;
var MediaContractError = /*#__PURE__*/function (_Error) {
  function MediaContractError(message) {
    var _this;
    (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_3__["default"])(this, MediaContractError);
    _this = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_callSuper_js__WEBPACK_IMPORTED_MODULE_4__["default"])(this, MediaContractError, [message]);
    _this.name = 'MediaContractError';
    return _this;
  }
  (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_5__["default"])(MediaContractError, _Error);
  return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_6__["default"])(MediaContractError);
}(/*#__PURE__*/(0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_wrapNativeSuper_js__WEBPACK_IMPORTED_MODULE_7__["default"])(Error));
var MediaPermissionError = /*#__PURE__*/function (_MediaContractError) {
  function MediaPermissionError() {
    var _this2;
    (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_3__["default"])(this, MediaPermissionError);
    _this2 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_callSuper_js__WEBPACK_IMPORTED_MODULE_4__["default"])(this, MediaPermissionError, ['没有照片权限，请在微信设置中允许访问相机或相册']);
    _this2.name = 'MediaPermissionError';
    return _this2;
  }
  (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_5__["default"])(MediaPermissionError, _MediaContractError);
  return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_6__["default"])(MediaPermissionError);
}(MediaContractError);
function getErrorMessage(reason) {
  if (reason instanceof Error) return reason.message;
  if ((0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_8__["default"])(reason) === 'object' && reason !== null && 'errMsg' in reason) return String(reason.errMsg || '');
  return String(reason || '');
}
function chooseDiagnosisImage() {
  return _chooseDiagnosisImage.apply(this, arguments);
}
function _chooseDiagnosisImage() {
  _chooseDiagnosisImage = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])(/*#__PURE__*/(0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])().m(function _callee() {
    var result, message, selected, selectedSize, path, compressed, info, fileSize, fileInfo, quality, _t, _t2;
    return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _context.p = 0;
          _context.n = 1;
          return _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().chooseMedia({
            count: 1,
            mediaType: ['image'],
            sourceType: ['camera', 'album'],
            sizeType: ['original', 'compressed']
          });
        case 1:
          result = _context.v;
          _context.n = 4;
          break;
        case 2:
          _context.p = 2;
          _t = _context.v;
          message = getErrorMessage(_t);
          if (!/auth deny|authorize|permission|camera|album|相机|相册|摄像头/i.test(message)) {
            _context.n = 3;
            break;
          }
          throw new MediaPermissionError();
        case 3:
          throw _t;
        case 4:
          selected = result.tempFiles[0];
          if (selected !== null && selected !== void 0 && selected.tempFilePath) {
            _context.n = 5;
            break;
          }
          throw new MediaContractError('没有选择图片');
        case 5:
          selectedSize = 'size' in selected && typeof selected.size === 'number' ? selected.size : 0;
          if (!(selectedSize > MAX_DIAGNOSIS_IMAGE_BYTES * 2)) {
            _context.n = 6;
            break;
          }
          throw new MediaContractError('图片文件过大，请选择 20 MB 以内的照片后重试');
        case 6:
          path = selected.tempFilePath;
          if (!(selectedSize > 1024 * 1024)) {
            _context.n = 8;
            break;
          }
          _context.n = 7;
          return _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().compressImage({
            src: path,
            quality: 78
          });
        case 7:
          compressed = _context.v;
          path = compressed.tempFilePath;
        case 8:
          _context.n = 9;
          return _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().getImageInfo({
            src: path
          });
        case 9:
          info = _context.v;
          // 低版本基础库可能无法读取临时文件大小，失败时沿用 chooseMedia 返回值。
          fileSize = selectedSize;
          _context.p = 10;
          _context.n = 11;
          return _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().getFileInfo({
            filePath: path
          });
        case 11:
          fileInfo = _context.v;
          if ('size' in fileInfo && fileInfo.size) fileSize = fileInfo.size;
          _context.n = 13;
          break;
        case 12:
          _context.p = 12;
          _t2 = _context.v;
        case 13:
          if (!(fileSize > MAX_DIAGNOSIS_IMAGE_BYTES)) {
            _context.n = 14;
            break;
          }
          throw new MediaContractError('图片压缩后仍超过 10 MB，请换一张照片重试');
        case 14:
          quality = inspectImageQuality(info.width, info.height, fileSize);
          return _context.a(2, {
            url: path,
            width: info.width,
            height: info.height,
            fileSize: fileSize,
            quality: quality
          });
      }
    }, _callee, null, [[10, 12], [0, 2]]);
  }));
  return _chooseDiagnosisImage.apply(this, arguments);
}
function inspectImageQuality(width, height, fileSize) {
  var issues = [];
  var issueCodes = [];
  if (fileSize > MAX_DIAGNOSIS_IMAGE_BYTES) {
    issues.push('图片文件过大，请压缩后重新选择');
    issueCodes.push('QUALITY_SIGNAL_INVALID');
  }
  if (Math.min(width, height) < 640) {
    issues.push('图片尺寸偏小，请靠近异常部位重新拍摄');
    issueCodes.push('IMAGE_TOO_SMALL');
  }
  if (fileSize > 0 && fileSize < 45 * 1024) {
    issues.push('图片信息较少，可能经过多次压缩');
    issueCodes.push('QUALITY_SIGNAL_INVALID');
  }
  if (issues.length > 0) return {
    status: fileSize > MAX_DIAGNOSIS_IMAGE_BYTES || Math.min(width, height) < 480 ? 'FAILED' : 'WARNING',
    issues: issues,
    issueCodes: issueCodes,
    score: fileSize > MAX_DIAGNOSIS_IMAGE_BYTES || Math.min(width, height) < 480 ? 35 : 68
  };
  return {
    status: 'PASS',
    issues: [],
    issueCodes: [],
    score: 92
  };
}
function inferContentType(path, contentType) {
  var _path$split$0$split$p;
  if (contentType) return contentType;
  var extension = (_path$split$0$split$p = path.split('?')[0].split('.').pop()) === null || _path$split$0$split$p === void 0 ? void 0 : _path$split$0$split$p.toLowerCase();
  if (extension === 'png') return 'image/png';
  if (extension === 'webp') return 'image/webp';
  return 'image/jpeg';
}
function readLocalFile(filePath) {
  return new Promise(function (resolve, reject) {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().getFileSystemManager().readFile({
      filePath: filePath,
      success: function success(result) {
        if (typeof result.data === 'string') {
          reject(new MediaContractError('图片读取结果不是二进制数据，请重新选择图片'));
          return;
        }
        resolve(result.data);
      },
      fail: reject
    });
  });
}
function uploadToObjectStorage(_x, _x2) {
  return _uploadToObjectStorage.apply(this, arguments);
}
function _uploadToObjectStorage() {
  _uploadToObjectStorage = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])(/*#__PURE__*/(0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])().m(function _callee2(image, onProgress) {
    var contentType, extension, ticket, data, response;
    return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          contentType = inferContentType(image.url, image.contentType);
          extension = contentType.split('/')[1];
          _context2.n = 1;
          return _client__WEBPACK_IMPORTED_MODULE_2__.apiClient.createUpload({
            contentType: contentType,
            extension: extension,
            size: image.fileSize,
            purpose: 'diagnoses'
          });
        case 1:
          ticket = _context2.v.data;
          onProgress === null || onProgress === void 0 || onProgress(35);
          _context2.n = 2;
          return readLocalFile(image.url);
        case 2:
          data = _context2.v;
          onProgress === null || onProgress === void 0 || onProgress(55);
          _context2.n = 3;
          return _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().request({
            url: ticket.uploadUrl,
            method: 'PUT',
            data: data,
            timeout: 30000,
            header: {
              'content-type': ticket.contentType || contentType
            }
          });
        case 3:
          response = _context2.v;
          if (!(response.statusCode < 200 || response.statusCode >= 300)) {
            _context2.n = 4;
            break;
          }
          throw new MediaContractError('图片上传失败，请检查网络后重试');
        case 4:
          onProgress === null || onProgress === void 0 || onProgress(88);
          _context2.n = 5;
          return _client__WEBPACK_IMPORTED_MODULE_2__.apiClient.completeUpload(ticket.fileId);
        case 5:
          onProgress === null || onProgress === void 0 || onProgress(100);
          return _context2.a(2, (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_11__["default"])((0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_11__["default"])({}, image), {}, {
            objectKey: ticket.objectKey,
            fileId: ticket.fileId,
            contentType: contentType
          }));
      }
    }, _callee2);
  }));
  return _uploadToObjectStorage.apply(this, arguments);
}
function uploadDiagnosisImage(_x3, _x4) {
  return _uploadDiagnosisImage.apply(this, arguments);
}
function _uploadDiagnosisImage() {
  _uploadDiagnosisImage = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])(/*#__PURE__*/(0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])().m(function _callee3(image, onProgress) {
    var _t3;
    return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          onProgress === null || onProgress === void 0 || onProgress(25);
          if (!(_config_env__WEBPACK_IMPORTED_MODULE_1__.API_MODE === 'mock')) {
            _context3.n = 2;
            break;
          }
          _context3.n = 1;
          return new Promise(function (resolve) {
            return setTimeout(resolve, 420);
          });
        case 1:
          onProgress === null || onProgress === void 0 || onProgress(100);
          return _context3.a(2, image);
        case 2:
          _context3.p = 2;
          _context3.n = 3;
          return uploadToObjectStorage(image, onProgress);
        case 3:
          return _context3.a(2, _context3.v);
        case 4:
          _context3.p = 4;
          _t3 = _context3.v;
          if (!(_t3 instanceof MediaContractError)) {
            _context3.n = 5;
            break;
          }
          throw _t3;
        case 5:
          throw new MediaContractError('图片上传失败，请检查网络后重试');
        case 6:
          return _context3.a(2);
      }
    }, _callee3, null, [[2, 4]]);
  }));
  return _uploadDiagnosisImage.apply(this, arguments);
}

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors","common"], function() { return __webpack_exec__("./src/pages/diagnosis/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map