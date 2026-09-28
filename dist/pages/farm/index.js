"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/farm/index"],{

/***/ "./node_modules/.pnpm/@tarojs+taro-loader@4.2.1_w_655abde9082470cdb421892bba8a3e04/node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/farm/index!./src/pages/farm/index.tsx":
/*!**********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@tarojs+taro-loader@4.2.1_w_655abde9082470cdb421892bba8a3e04/node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/farm/index!./src/pages/farm/index.tsx ***!
  \**********************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ FarmPage; }
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














function FarmPage() {
  var identity = (0,_store_auth_store__WEBPACK_IMPORTED_MODULE_7__.useAuthStore)(function (state) {
    return state.identity;
  });
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState2 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_9__["default"])(_useState, 2),
    farms = _useState2[0],
    setFarms = _useState2[1];
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
    showForm = _useState8[0],
    setShowForm = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
    _useState0 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_9__["default"])(_useState9, 2),
    name = _useState0[0],
    setName = _useState0[1];
  var _useState1 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
    _useState10 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_9__["default"])(_useState1, 2),
    location = _useState10[0],
    setLocation = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState12 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_9__["default"])(_useState11, 2),
    saving = _useState12[0],
    setSaving = _useState12[1];
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(),
    _useState14 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_9__["default"])(_useState13, 2),
    editingFarmId = _useState14[0],
    setEditingFarmId = _useState14[1];
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
          setFarms([]);
          setError('');
          setLoading(false);
          return _context.a(2);
        case 1:
          loadedIdentityRef.current = identity.userId;
          _context.p = 2;
          _context.n = 3;
          return _services_farm_api__WEBPACK_IMPORTED_MODULE_6__.farmApi.list();
        case 3:
          response = _context.v;
          setFarms(response.data.items);
          setError('');
          _context.n = 5;
          break;
        case 4:
          _context.p = 4;
          _t = _context.v;
          setError(_t instanceof Error ? _t.message : '农场加载失败');
        case 5:
          _context.p = 5;
          setLoading(false);
          return _context.f(5);
        case 6:
          return _context.a(2);
      }
    }, _callee, null, [[2, 4, 5, 6]]);
  })), [identity]);
  (0,_tarojs_taro__WEBPACK_IMPORTED_MODULE_0__.useDidShow)(load);
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
  var createFarm = /*#__PURE__*/function () {
    var _ref2 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])(/*#__PURE__*/(0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_11__["default"])().m(function _callee2() {
      var _t2;
      return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_11__["default"])().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            if (!(!name.trim() || !location.trim() || saving)) {
              _context2.n = 1;
              break;
            }
            return _context2.a(2);
          case 1:
            setSaving(true);
            _context2.p = 2;
            if (!editingFarmId) {
              _context2.n = 4;
              break;
            }
            _context2.n = 3;
            return _services_farm_api__WEBPACK_IMPORTED_MODULE_6__.farmApi.update(editingFarmId, {
              name: name.trim(),
              location: location.trim()
            });
          case 3:
            _context2.n = 5;
            break;
          case 4:
            _context2.n = 5;
            return _services_farm_api__WEBPACK_IMPORTED_MODULE_6__.farmApi.create({
              name: name.trim(),
              location: location.trim()
            });
          case 5:
            setName('');
            setLocation('');
            setEditingFarmId(undefined);
            setShowForm(false);
            _context2.n = 6;
            return load();
          case 6:
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().showToast({
              title: editingFarmId ? '农场已更新' : '农场已创建',
              icon: 'success'
            });
            _context2.n = 8;
            break;
          case 7:
            _context2.p = 7;
            _t2 = _context2.v;
            setError(_t2 instanceof Error ? _t2.message : '创建失败');
          case 8:
            _context2.p = 8;
            setSaving(false);
            return _context2.f(8);
          case 9:
            return _context2.a(2);
        }
      }, _callee2, null, [[2, 7, 8, 9]]);
    }));
    return function createFarm() {
      return _ref2.apply(this, arguments);
    };
  }();
  var startCreate = function startCreate() {
    setEditingFarmId(undefined);
    setName('');
    setLocation('');
    setShowForm(true);
  };
  var startEdit = function startEdit(farm) {
    setEditingFarmId(farm.id);
    setName(farm.name);
    setLocation(farm.location);
    setShowForm(true);
  };
  if (!identity) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
      className: "page",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_qd_ui_EmptyState__WEBPACK_IMPORTED_MODULE_3__.EmptyState, {
        title: "\u767B\u5F55\u540E\u7BA1\u7406\u519C\u573A",
        description: "\u519C\u573A\u548C\u5730\u5757\u4F1A\u4F5C\u4E3A\u8BCA\u65AD\u4E0A\u4E0B\u6587\u4FDD\u5B58\u3002",
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
    className: "page farm-page",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
      className: "farm-heading",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
          className: "page-title",
          children: "\u6211\u7684\u519C\u573A"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
          className: "page-description",
          children: "\u7BA1\u7406\u5730\u5757\u3001\u4F5C\u7269\u4E0E\u751F\u957F\u9636\u6BB5\u3002"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_qd_ui_Button__WEBPACK_IMPORTED_MODULE_2__.Button, {
        variant: "secondary",
        onClick: function onClick() {
          return showForm ? setShowForm(false) : startCreate();
        },
        children: showForm ? '取消' : '新建'
      })]
    }), showForm ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
      className: "surface farm-form",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
        className: "section-title",
        children: editingFarmId ? '编辑农场' : '创建农场'
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_qd_ui_Field__WEBPACK_IMPORTED_MODULE_5__.Field, {
        label: "\u519C\u573A\u540D\u79F0",
        value: name,
        placeholder: "\u4F8B\u5982\uFF1A\u5411\u9633\u793A\u8303\u519C\u573A",
        onChange: setName
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_qd_ui_Field__WEBPACK_IMPORTED_MODULE_5__.Field, {
        label: "\u6240\u5728\u5730\u533A",
        value: location,
        placeholder: "\u4F8B\u5982\uFF1A\u6D59\u6C5F\u7701\u676D\u5DDE\u5E02\u4E34\u5B89\u533A",
        onChange: setLocation
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
        className: "farm-form__submit",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_qd_ui_Button__WEBPACK_IMPORTED_MODULE_2__.Button, {
          block: true,
          loading: saving,
          disabled: !name.trim() || !location.trim(),
          onClick: createFarm,
          children: "\u4FDD\u5B58\u519C\u573A"
        })
      })]
    }) : null, loading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_qd_ui_PageState__WEBPACK_IMPORTED_MODULE_4__.LoadingState, {}) : error && farms.length === 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_qd_ui_PageState__WEBPACK_IMPORTED_MODULE_4__.ErrorState, {
      title: "\u519C\u573A\u52A0\u8F7D\u5931\u8D25",
      message: error,
      onRetry: load
    }) : farms.length === 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_qd_ui_EmptyState__WEBPACK_IMPORTED_MODULE_3__.EmptyState, {
      title: "\u8FD8\u6CA1\u6709\u519C\u573A",
      description: "\u5148\u521B\u5EFA\u519C\u573A\uFF0C\u518D\u6DFB\u52A0\u5730\u5757\u548C\u4F5C\u7269\u4FE1\u606F\u3002",
      actionLabel: "\u521B\u5EFA\u519C\u573A",
      onAction: startCreate
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
      children: [error ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
        className: "farm-stale",
        role: "status",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
          children: "\u7F51\u7EDC\u6682\u65F6\u4E0D\u53EF\u7528\uFF0C\u4EE5\u4E0B\u662F\u6700\u8FD1\u4E00\u6B21\u540C\u6B65\u7684\u519C\u573A\u3002"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
          className: "farm-stale__action",
          onClick: load,
          children: "\u91CD\u8BD5"
        })]
      }) : null, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
        className: "farm-list",
        children: farms.map(function (farm) {
          var _farm$plots;
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
            className: "farm-card",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
              className: "farm-card__main",
              onClick: function onClick() {
                return _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().navigateTo({
                  url: "/pages/farm-detail/index?id=".concat(farm.id, "&name=").concat(encodeURIComponent(farm.name))
                });
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
                className: "farm-card__top",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
                  className: "farm-card__name",
                  children: farm.name
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
                  className: "farm-card__score",
                  children: farm.healthScore ? "\u5065\u5EB7\u5EA6 ".concat(farm.healthScore) : '查看详情'
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
                className: "farm-card__location",
                children: farm.location
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
                className: "farm-card__stats",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
                  children: [((_farm$plots = farm.plots) === null || _farm$plots === void 0 ? void 0 : _farm$plots.length) || 0, " \u5757\u5730"]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
                  children: [farm.areaMu || 0, " \u4EA9"]
                })]
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
              className: "farm-card__actions",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_qd_ui_Button__WEBPACK_IMPORTED_MODULE_2__.Button, {
                size: "md",
                variant: "ghost",
                onClick: function onClick() {
                  return startEdit(farm);
                },
                children: "\u7F16\u8F91\u519C\u573A"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_qd_ui_Button__WEBPACK_IMPORTED_MODULE_2__.Button, {
                size: "md",
                variant: "secondary",
                onClick: function onClick() {
                  return _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().navigateTo({
                    url: "/pages/farm-detail/index?id=".concat(farm.id, "&name=").concat(encodeURIComponent(farm.name))
                  });
                },
                children: "\u7BA1\u7406\u5730\u5757"
              })]
            })]
          }, farm.id);
        })
      })]
    })]
  });
}

/***/ }),

/***/ "./src/pages/farm/index.tsx":
/*!**********************************!*\
  !*** ./src/pages/farm/index.tsx ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/runtime */ "webpack/container/remote/@tarojs/runtime");
/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_farm_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/.pnpm/@tarojs+taro-loader@4.2.1_w_655abde9082470cdb421892bba8a3e04/node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/farm/index!./index.tsx */ "./node_modules/.pnpm/@tarojs+taro-loader@4.2.1_w_655abde9082470cdb421892bba8a3e04/node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/farm/index!./src/pages/farm/index.tsx");


var config = {"navigationBarTitleText":"我的农场"};



var taroOption = (0,_tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__.createPageConfig)(_node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_farm_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"], 'pages/farm/index', {root:{cn:[]}}, config || {})
if (_node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_farm_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"] && _node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_farm_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"].behaviors) {
  taroOption.behaviors = (taroOption.behaviors || []).concat(_node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_farm_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"].behaviors)
}
var inst = Page(taroOption)



/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_pnpm_tarojs_taro_loader_4_2_1_w_655abde9082470cdb421892bba8a3e04_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_farm_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"]);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors","common"], function() { return __webpack_exec__("./src/pages/farm/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map