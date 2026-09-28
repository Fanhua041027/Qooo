"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/farm-detail/index"],{

/***/ "./node_modules/.pnpm/@tarojs+taro-loader@4.2.1_w_655abde9082470cdb421892bba8a3e04/node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/farm-detail/index!./src/pages/farm-detail/index.tsx":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@tarojs+taro-loader@4.2.1_w_655abde9082470cdb421892bba8a3e04/node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/farm-detail/index!./src/pages/farm-detail/index.tsx ***!
  \************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ FarmDetailPage; }
/* harmony export */ });
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/taro */ "webpack/container/remote/@tarojs/taro");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/.pnpm/@tarojs+plugin-platform-wea_4e8305395171dc1f042a34fd93f3fd6b/node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "webpack/container/remote/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_qd_ui_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/qd-ui/Button */ "./src/components/qd-ui/Button/index.tsx");
/* harmony import */ var _components_qd_ui_EmptyState__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/qd-ui/EmptyState */ "./src/components/qd-ui/EmptyState/index.tsx");
/* harmony import */ var _components_qd_ui_PageState__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/qd-ui/PageState */ "./src/components/qd-ui/PageState/index.tsx");
/* harmony import */ var _components_qd_ui_Field__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/components/qd-ui/Field */ "./src/components/qd-ui/Field/index.tsx");
/* harmony import */ var _services_farm_api__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/services/farm.api */ "./src/services/farm.api.ts");
/* harmony import */ var _store_auth_store__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/store/auth.store */ "./src/store/auth.store.ts");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "webpack/container/remote/react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__);














function FarmDetailPage() {
  var identity = (0,_store_auth_store__WEBPACK_IMPORTED_MODULE_7__.useAuthStore)(function (state) {
    return state.identity;
  });
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
    _useState2 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_9__["default"])(_useState, 2),
    farmId = _useState2[0],
    setFarmId = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('农场'),
    _useState4 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_9__["default"])(_useState3, 2),
    farmName = _useState4[0],
    setFarmName = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState6 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_9__["default"])(_useState5, 2),
    plots = _useState6[0],
    setPlots = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true),
    _useState8 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_9__["default"])(_useState7, 2),
    loading = _useState8[0],
    setLoading = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
    _useState0 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_9__["default"])(_useState9, 2),
    error = _useState0[0],
    setError = _useState0[1];
  var _useState1 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState10 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_9__["default"])(_useState1, 2),
    showForm = _useState10[0],
    setShowForm = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
    _useState12 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_9__["default"])(_useState11, 2),
    name = _useState12[0],
    setName = _useState12[1];
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
    _useState14 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_9__["default"])(_useState13, 2),
    cropName = _useState14[0],
    setCropName = _useState14[1];
  var _useState15 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
    _useState16 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_9__["default"])(_useState15, 2),
    growthStage = _useState16[0],
    setGrowthStage = _useState16[1];
  var _useState17 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
    _useState18 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_9__["default"])(_useState17, 2),
    plantedAt = _useState18[0],
    setPlantedAt = _useState18[1];
  var _useState19 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState20 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_9__["default"])(_useState19, 2),
    saving = _useState20[0],
    setSaving = _useState20[1];
  var _useState21 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(),
    _useState22 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_9__["default"])(_useState21, 2),
    editingPlotId = _useState22[0],
    setEditingPlotId = _useState22[1];
  var _useState23 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(),
    _useState24 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_9__["default"])(_useState23, 2),
    deletingPlotId = _useState24[0],
    setDeletingPlotId = _useState24[1];
  var load = /*#__PURE__*/function () {
    var _ref = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])(/*#__PURE__*/(0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_11__["default"])().m(function _callee(id) {
      var response, _t;
      return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_11__["default"])().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            if (identity) {
              _context.n = 1;
              break;
            }
            setPlots([]);
            setError('');
            setLoading(false);
            return _context.a(2);
          case 1:
            if (id) {
              _context.n = 2;
              break;
            }
            setError('缺少农场编号，请返回农场列表后重试');
            setLoading(false);
            return _context.a(2);
          case 2:
            _context.p = 2;
            _context.n = 3;
            return _services_farm_api__WEBPACK_IMPORTED_MODULE_6__.farmApi.listPlots(id);
          case 3:
            response = _context.v;
            setPlots(response.data.items);
            setError('');
            _context.n = 5;
            break;
          case 4:
            _context.p = 4;
            _t = _context.v;
            setError(_t instanceof Error ? _t.message : '地块加载失败');
          case 5:
            _context.p = 5;
            setLoading(false);
            return _context.f(5);
          case 6:
            return _context.a(2);
        }
      }, _callee, null, [[2, 4, 5, 6]]);
    }));
    return function load(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (identity && farmId) void load(farmId);
  }, [identity, farmId]);
  (0,_tarojs_taro__WEBPACK_IMPORTED_MODULE_0__.useLoad)(function (params) {
    var id = params.id || '';
    setFarmId(id);
    var name = '农场';
    if (params.name) {
      try {
        name = decodeURIComponent(params.name);
      } catch (_unused) {
        name = params.name;
      }
    }
    setFarmName(name);
  });
  var createPlot = /*#__PURE__*/function () {
    var _ref2 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])(/*#__PURE__*/(0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_11__["default"])().m(function _callee2() {
      var input, _t2;
      return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_11__["default"])().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            if (!(!farmId || !name.trim() || !cropName.trim() || !plantedAt || saving)) {
              _context2.n = 1;
              break;
            }
            return _context2.a(2);
          case 1:
            setSaving(true);
            _context2.p = 2;
            input = {
              name: name.trim(),
              cropName: cropName.trim(),
              growthStage: growthStage.trim() || undefined,
              plantedAt: plantedAt
            };
            if (!editingPlotId) {
              _context2.n = 4;
              break;
            }
            _context2.n = 3;
            return _services_farm_api__WEBPACK_IMPORTED_MODULE_6__.farmApi.updatePlot(editingPlotId, input);
          case 3:
            _context2.n = 5;
            break;
          case 4:
            _context2.n = 5;
            return _services_farm_api__WEBPACK_IMPORTED_MODULE_6__.farmApi.createPlot(farmId, input);
          case 5:
            setName('');
            setCropName('');
            setGrowthStage('');
            setPlantedAt('');
            setEditingPlotId(undefined);
            setShowForm(false);
            _context2.n = 6;
            return load(farmId);
          case 6:
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().showToast({
              title: editingPlotId ? '地块已更新' : '地块已添加',
              icon: 'success'
            });
            _context2.n = 8;
            break;
          case 7:
            _context2.p = 7;
            _t2 = _context2.v;
            setError(_t2 instanceof Error ? _t2.message : '地块创建失败');
          case 8:
            _context2.p = 8;
            setSaving(false);
            return _context2.f(8);
          case 9:
            return _context2.a(2);
        }
      }, _callee2, null, [[2, 7, 8, 9]]);
    }));
    return function createPlot() {
      return _ref2.apply(this, arguments);
    };
  }();
  var startCreatePlot = function startCreatePlot() {
    setEditingPlotId(undefined);
    setName('');
    setCropName('');
    setGrowthStage('');
    setPlantedAt('');
    setShowForm(true);
  };
  var startEditPlot = function startEditPlot(plot) {
    setEditingPlotId(plot.id);
    setName(plot.name);
    setCropName(plot.cropName);
    setGrowthStage(plot.growthStage || '');
    setPlantedAt(plot.plantedAt ? plot.plantedAt.slice(0, 10) : '');
    setShowForm(true);
  };
  var removePlot = /*#__PURE__*/function () {
    var _ref3 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])(/*#__PURE__*/(0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_11__["default"])().m(function _callee3(plot) {
      var result, _t3;
      return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_11__["default"])().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            if (!deletingPlotId) {
              _context3.n = 1;
              break;
            }
            return _context3.a(2);
          case 1:
            _context3.n = 2;
            return _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().showModal({
              title: '删除地块？',
              content: '已有诊断记录会保留，但之后不会再把这块地作为诊断上下文。',
              confirmText: '删除',
              confirmColor: '#b63f37'
            });
          case 2:
            result = _context3.v;
            if (result.confirm) {
              _context3.n = 3;
              break;
            }
            return _context3.a(2);
          case 3:
            setDeletingPlotId(plot.id);
            _context3.p = 4;
            _context3.n = 5;
            return _services_farm_api__WEBPACK_IMPORTED_MODULE_6__.farmApi.deletePlot(plot.id);
          case 5:
            if (editingPlotId === plot.id) startCreatePlot();
            _context3.n = 6;
            return load(farmId);
          case 6:
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().showToast({
              title: '地块已删除',
              icon: 'success'
            });
            _context3.n = 8;
            break;
          case 7:
            _context3.p = 7;
            _t3 = _context3.v;
            setError(_t3 instanceof Error ? _t3.message : '地块删除失败');
          case 8:
            _context3.p = 8;
            setDeletingPlotId(undefined);
            return _context3.f(8);
          case 9:
            return _context3.a(2);
        }
      }, _callee3, null, [[4, 7, 8, 9]]);
    }));
    return function removePlot(_x2) {
      return _ref3.apply(this, arguments);
    };
  }();
  if (!identity) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
      className: "page",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_qd_ui_EmptyState__WEBPACK_IMPORTED_MODULE_3__.EmptyState, {
        title: "\u767B\u5F55\u540E\u67E5\u770B\u519C\u573A",
        description: "\u767B\u5F55\u540E\u53EF\u4EE5\u7BA1\u7406\u519C\u573A\u548C\u5730\u5757\u4FE1\u606F\u3002",
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
    className: "page farm-detail-page",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
      className: "farm-detail-heading",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
          className: "page-title",
          children: farmName
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
          className: "page-description",
          children: [plots.length, " \u5757\u5730\u6B63\u5728\u7BA1\u7406"]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_qd_ui_Button__WEBPACK_IMPORTED_MODULE_2__.Button, {
        variant: "secondary",
        onClick: function onClick() {
          return showForm ? setShowForm(false) : startCreatePlot();
        },
        children: showForm ? '取消' : '添加地块'
      })]
    }), showForm ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
      className: "surface plot-form",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
        className: "section-title",
        children: editingPlotId ? '编辑地块' : '地块信息'
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_qd_ui_Field__WEBPACK_IMPORTED_MODULE_5__.Field, {
        label: "\u5730\u5757\u540D\u79F0",
        value: name,
        placeholder: "\u4F8B\u5982\uFF1A\u4E1C\u4E00\u53F7\u68DA",
        onChange: setName
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_qd_ui_Field__WEBPACK_IMPORTED_MODULE_5__.Field, {
        label: "\u5F53\u524D\u4F5C\u7269",
        value: cropName,
        placeholder: "\u4F8B\u5982\uFF1A\u756A\u8304",
        onChange: setCropName
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_qd_ui_Field__WEBPACK_IMPORTED_MODULE_5__.Field, {
        label: "\u751F\u957F\u9636\u6BB5",
        value: growthStage,
        placeholder: "\u4F8B\u5982\uFF1A\u5F00\u82B1\u671F",
        onChange: setGrowthStage
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
        className: "plot-form__date",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
          children: "\u79CD\u690D\u65E5\u671F"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Picker, {
          mode: "date",
          value: plantedAt,
          onChange: function onChange(event) {
            return setPlantedAt(event.detail.value);
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
            children: plantedAt || '选择日期'
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_qd_ui_Button__WEBPACK_IMPORTED_MODULE_2__.Button, {
        block: true,
        loading: saving,
        disabled: !name.trim() || !cropName.trim() || !plantedAt,
        onClick: createPlot,
        children: "\u4FDD\u5B58\u5730\u5757"
      })]
    }) : null, loading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_qd_ui_PageState__WEBPACK_IMPORTED_MODULE_4__.LoadingState, {}) : error ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_qd_ui_PageState__WEBPACK_IMPORTED_MODULE_4__.ErrorState, {
      message: error,
      onRetry: function onRetry() {
        return load(farmId);
      }
    }) : plots.length === 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_qd_ui_EmptyState__WEBPACK_IMPORTED_MODULE_3__.EmptyState, {
      title: "\u8FD8\u6CA1\u6709\u5730\u5757",
      description: "\u6DFB\u52A0\u5730\u5757\u3001\u4F5C\u7269\u548C\u79CD\u690D\u65E5\u671F\uFF0C\u4E3A\u8BCA\u65AD\u8865\u5145\u4E0A\u4E0B\u6587\u3002",
      actionLabel: "\u6DFB\u52A0\u5730\u5757",
      onAction: startCreatePlot
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
      className: "plot-list",
      children: plots.map(function (plot) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
          className: "plot-row",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
            className: "plot-row__crop",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
              children: plot.cropName.slice(0, 1)
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
            className: "plot-row__body",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
              className: "plot-row__name",
              children: plot.name
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
              className: "plot-row__meta",
              children: [plot.cropName, " \xB7 ", plot.growthStage || '阶段未填写', " \xB7 ", plot.areaMu ? "".concat(plot.areaMu, " \u4EA9") : '面积未填写']
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
              className: "plot-row__actions",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_qd_ui_Button__WEBPACK_IMPORTED_MODULE_2__.Button, {
                size: "md",
                variant: "ghost",
                onClick: function onClick() {
                  return startEditPlot(plot);
                },
                children: "\u7F16\u8F91"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_qd_ui_Button__WEBPACK_IMPORTED_MODULE_2__.Button, {
                size: "md",
                variant: "danger",
                loading: deletingPlotId === plot.id,
                onClick: function onClick() {
                  return removePlot(plot);
                },
                children: "\u5220\u9664"
              })]
            })]
          })]
        }, plot.id);
      })
    })]
  });
}

/***/ }),

/***/ "./src/pages/farm-detail/index.tsx":
/*!*****************************************!*\
  !*** ./src/pages/farm-detail/index.tsx ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/runtime */ "webpack/container/remote/@tarojs/runtime");
/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_farm_detail_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/.pnpm/@tarojs+taro-loader@4.2.1_w_655abde9082470cdb421892bba8a3e04/node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/farm-detail/index!./index.tsx */ "./node_modules/.pnpm/@tarojs+taro-loader@4.2.1_w_655abde9082470cdb421892bba8a3e04/node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/farm-detail/index!./src/pages/farm-detail/index.tsx");


var config = {"navigationBarTitleText":"农场详情"};



var taroOption = (0,_tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__.createPageConfig)(_node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_farm_detail_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"], 'pages/farm-detail/index', {root:{cn:[]}}, config || {})
if (_node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_farm_detail_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"] && _node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_farm_detail_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"].behaviors) {
  taroOption.behaviors = (taroOption.behaviors || []).concat(_node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_farm_detail_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"].behaviors)
}
var inst = Page(taroOption)



/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_farm_detail_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"]);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors","common"], function() { return __webpack_exec__("./src/pages/farm-detail/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map