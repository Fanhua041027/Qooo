"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["common"],{

/***/ "./packages/api-client/src/index.ts":
/*!******************************************!*\
  !*** ./packages/api-client/src/index.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ApiClient: function() { return /* binding */ ApiClient; },
/* harmony export */   toAuthIdentity: function() { return /* binding */ toAuthIdentity; }
/* harmony export */ });
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/classCallCheck.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/createClass.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/typeof.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/typeof.js");





var _excluded = ["clientRequestId"],
  _excluded2 = ["priority"];
var riskMap = {
  low: 'LOW',
  medium: 'MEDIUM',
  high: 'HIGH',
  critical: 'CRITICAL'
};
function stringArray(value) {
  return Array.isArray(value) ? value.filter(function (item) {
    return typeof item === 'string' && item.trim().length > 0;
  }) : [];
}
function normalizeDiagnosis(raw) {
  var _result$model, _result$model2, _result$model3, _result$model4, _result$decision;
  var result = raw.result && (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(raw.result) === 'object' ? raw.result : undefined;
  var possibleProblems = Array.isArray(result === null || result === void 0 ? void 0 : result.possibleProblems) ? result.possibleProblems.filter(function (item) {
    return item && typeof item.name === 'string';
  }) : [];
  var top = possibleProblems[0];
  var topRiskLevel = top ? riskMap[top.riskLevel] || 'MEDIUM' : undefined;
  var risk = top && topRiskLevel ? {
    level: topRiskLevel,
    label: {
      low: '低风险',
      medium: '中风险',
      high: '高风险',
      critical: '极高风险'
    }[top.riskLevel] || '中风险',
    reason: result !== null && result !== void 0 && result.needExpertReview ? '当前结果建议结合农技员意见复核。' : '建议按下一步行动完成观察和复查。'
  } : undefined;
  var actions = (Array.isArray(result === null || result === void 0 ? void 0 : result.actions) ? result.actions : []).filter(function (item) {
    return item && typeof item.title === 'string';
  }).map(function (item) {
    return {
      type: item.title.includes('不要') || item.title.includes('避免') || item.title.includes('暂不') ? 'AVOID' : item.priority === 'now' ? 'DO_NOW' : 'OBSERVE',
      title: item.title,
      description: item.description,
      dueAt: item.priority === 'now' ? new Date(Date.now() + 86400000).toISOString() : undefined
    };
  });
  var status = raw.status === 'created' || raw.status === 'uploading' ? 'PENDING' : raw.status === 'analyzing' ? 'PROCESSING' : raw.status === 'completed' ? 'COMPLETED' : raw.status === 'need_more_images' ? 'NEED_MORE_IMAGES' : raw.status === 'need_expert_review' ? 'NEED_EXPERT_REVIEW' : 'FAILED';
  var followUpQuestions = Array.isArray(result === null || result === void 0 ? void 0 : result.followUpQuestions) ? result.followUpQuestions.filter(function (item) {
    return item && typeof item.code === 'string' && typeof item.prompt === 'string';
  }) : undefined;
  var needExpertReview = Boolean(result === null || result === void 0 ? void 0 : result.needExpertReview);
  var loop = result !== null && result !== void 0 && result.loop ? (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, result.loop) : undefined;
  return {
    id: raw.id,
    status: status,
    crop: (result === null || result === void 0 ? void 0 : result.crop) || raw.cropName || '待确认作物',
    plotId: raw.plotId || undefined,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
    possibleIssues: possibleProblems.map(function (item) {
      return {
        name: item.name,
        confidence: typeof item.confidence === 'number' && Number.isFinite(item.confidence) ? Math.min(1, Math.max(0, item.confidence)) : 0,
        evidence: stringArray(item.evidence),
        riskLevel: riskMap[item.riskLevel] || 'MEDIUM',
        lookalikes: stringArray(item.lookalikes)
      };
    }),
    risk: risk,
    actions: actions,
    disclaimer: (result === null || result === void 0 ? void 0 : result.disclaimer) || '以上为辅助判断，请结合当地农技员意见确认。',
    model: {
      name: (result === null || result === void 0 || (_result$model = result.model) === null || _result$model === void 0 ? void 0 : _result$model.name) || 'unknown',
      version: (result === null || result === void 0 || (_result$model2 = result.model) === null || _result$model2 === void 0 ? void 0 : _result$model2.version) || 'unknown',
      traceId: result === null || result === void 0 || (_result$model3 = result.model) === null || _result$model3 === void 0 ? void 0 : _result$model3.traceId,
      knowledgeVersion: result === null || result === void 0 || (_result$model4 = result.model) === null || _result$model4 === void 0 ? void 0 : _result$model4.knowledgeVersion
    },
    requestId: raw.requestId,
    decision: result === null || result === void 0 || (_result$decision = result.decision) === null || _result$decision === void 0 ? void 0 : _result$decision.toUpperCase(),
    loop: loop,
    followUpQuestions: followUpQuestions,
    expertReview: result ? {
      required: needExpertReview,
      reasonCodes: stringArray(result.expertReviewReasons),
      message: needExpertReview ? '建议让农技人员结合田间情况复核。' : undefined
    } : undefined,
    safety: result === null || result === void 0 ? void 0 : result.safety,
    progress: status === 'PROCESSING' ? {
      stage: 'ANALYZING',
      label: '正在比对症状特征',
      percent: 62
    } : undefined,
    error: status === 'FAILED' ? {
      code: raw.failureCode || 'DIAGNOSIS_FAILED',
      message: raw.failureMessage || '诊断服务暂时不可用'
    } : undefined
  };
}
function normalizeFarm(raw) {
  var _raw$areaMu, _raw$plots;
  var location = 'region' in raw ? raw.region || raw.address || '' : raw.location || '';
  return {
    id: raw.id,
    name: raw.name,
    location: location,
    areaMu: (_raw$areaMu = raw.areaMu) !== null && _raw$areaMu !== void 0 ? _raw$areaMu : undefined,
    healthScore: raw.healthScore,
    plots: (_raw$plots = raw.plots) === null || _raw$plots === void 0 ? void 0 : _raw$plots.map(function (plot) {
      return normalizePlot(plot);
    })
  };
}
function normalizePlot(raw) {
  return {
    id: raw.id,
    farmId: raw.farmId,
    name: raw.name,
    cropName: raw.cropName,
    growthStage: raw.growthStage || undefined,
    areaMu: raw.areaMu || undefined,
    plantedAt: raw.plantedAt
  };
}
function normalizeTask(raw) {
  return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, raw), {}, {
    status: raw.status.toUpperCase(),
    priority: raw.priority.toUpperCase()
  });
}
function normalizeMessage(raw) {
  return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, raw), {}, {
    type: raw.type.toUpperCase(),
    readAt: raw.readAt || null
  });
}
var ApiClient = /*#__PURE__*/function () {
  function ApiClient(transport) {
    (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this, ApiClient);
    this.transport = transport;
  }
  return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_3__["default"])(ApiClient, [{
    key: "mockLogin",
    value: function mockLogin() {
      var accountId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'user_p0_farmer_001';
      return this.transport.request({
        method: 'POST',
        path: '/api/v1/auth/mock-login',
        body: {
          accountId: accountId
        }
      });
    }
  }, {
    key: "wechatLogin",
    value: function wechatLogin(code) {
      return this.transport.request({
        method: 'POST',
        path: '/api/v1/auth/wechat-login',
        body: {
          code: code
        }
      });
    }
  }, {
    key: "me",
    value: function me() {
      return this.transport.request({
        method: 'GET',
        path: '/api/v1/me'
      });
    }
  }, {
    key: "logout",
    value: function logout() {
      return this.transport.request({
        method: 'POST',
        path: '/api/v1/auth/logout'
      });
    }
  }, {
    key: "listFarms",
    value: function listFarms() {
      return this.transport.request({
        method: 'GET',
        path: '/api/v1/farms'
      }).then(function (response) {
        return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, response), {}, {
          data: (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, response.data), {}, {
            items: response.data.items.map(normalizeFarm)
          })
        });
      });
    }
  }, {
    key: "createFarm",
    value: function createFarm(input) {
      return this.transport.request({
        method: 'POST',
        path: '/api/v1/farms',
        body: {
          name: input.name,
          region: input.location
        }
      }).then(function (response) {
        return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, response), {}, {
          data: normalizeFarm(response.data)
        });
      });
    }
  }, {
    key: "updateFarm",
    value: function updateFarm(farmId, input) {
      var body = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, input), input.location !== undefined ? {
        region: input.location
      } : {});
      delete body.location;
      return this.transport.request({
        method: 'PATCH',
        path: "/api/v1/farms/".concat(farmId),
        body: body
      }).then(function (response) {
        return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, response), {}, {
          data: normalizeFarm(response.data)
        });
      });
    }
  }, {
    key: "listPlots",
    value: function listPlots(farmId) {
      return this.transport.request({
        method: 'GET',
        path: "/api/v1/farms/".concat(farmId, "/plots")
      }).then(function (response) {
        return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, response), {}, {
          data: (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, response.data), {}, {
            items: response.data.items.map(normalizePlot)
          })
        });
      });
    }
  }, {
    key: "createPlot",
    value: function createPlot(farmId, input) {
      return this.transport.request({
        method: 'POST',
        path: "/api/v1/farms/".concat(farmId, "/plots"),
        body: input
      }).then(function (response) {
        return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, response), {}, {
          data: normalizePlot(response.data)
        });
      });
    }
  }, {
    key: "updatePlot",
    value: function updatePlot(plotId, input) {
      return this.transport.request({
        method: 'PATCH',
        path: "/api/v1/plots/".concat(plotId),
        body: input
      }).then(function (response) {
        return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, response), {}, {
          data: normalizePlot(response.data)
        });
      });
    }
  }, {
    key: "deletePlot",
    value: function deletePlot(plotId) {
      return this.transport.request({
        method: 'DELETE',
        path: "/api/v1/plots/".concat(plotId)
      });
    }
  }, {
    key: "createDiagnosis",
    value: function createDiagnosis(input) {
      var _input$description;
      var body = {
        clientRequestId: input.clientRequestId,
        plotId: input.plotId,
        cropName: input.crop.name,
        growthStage: input.crop.growthStage,
        description: ((_input$description = input.description) === null || _input$description === void 0 ? void 0 : _input$description.trim()) || undefined,
        images: input.images.map(function (image) {
          return {
            objectKey: image.objectKey || image.url,
            width: image.width,
            height: image.height,
            quality: image.quality
          };
        })
      };
      return this.transport.request({
        method: 'POST',
        path: '/api/v1/diagnoses',
        body: body,
        idempotencyKey: input.clientRequestId
      }).then(function (response) {
        return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, response), {}, {
          data: normalizeDiagnosis(response.data)
        });
      });
    }
  }, {
    key: "getDiagnosis",
    value: function getDiagnosis(diagnosisId) {
      return this.transport.request({
        method: 'GET',
        path: "/api/v1/diagnoses/".concat(diagnosisId)
      }).then(function (response) {
        return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, response), {}, {
          data: normalizeDiagnosis(response.data)
        });
      });
    }
  }, {
    key: "getDiagnosisResult",
    value: function getDiagnosisResult(diagnosisId) {
      return this.getDiagnosis(diagnosisId);
    }
  }, {
    key: "listDiagnoses",
    value: function listDiagnoses() {
      return this.transport.request({
        method: 'GET',
        path: '/api/v1/diagnoses'
      }).then(function (response) {
        var payload = response.data;
        var candidateItems = payload && (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(payload) === 'object' ? payload.items : undefined;
        var items = Array.isArray(candidateItems) ? candidateItems : payload ? [payload] : [];
        var total = payload && (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(payload) === 'object' && typeof payload.total === 'number' ? payload.total : items.length;
        return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, response), {}, {
          data: {
            items: items.map(normalizeDiagnosis),
            total: total
          }
        });
      });
    }
  }, {
    key: "retryDiagnosis",
    value: function retryDiagnosis(diagnosisId) {
      return this.transport.request({
        method: 'POST',
        path: "/api/v1/diagnoses/".concat(diagnosisId, "/retry")
      }).then(function (response) {
        return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, response), {}, {
          data: normalizeDiagnosis(response.data)
        });
      });
    }
  }, {
    key: "verifyDiagnosis",
    value: function verifyDiagnosis(diagnosisId, outcome, note) {
      return this.transport.request({
        method: 'POST',
        path: "/api/v1/diagnoses/".concat(diagnosisId, "/verify"),
        body: {
          outcome: outcome,
          note: note
        }
      }).then(function (response) {
        return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, response), {}, {
          data: normalizeDiagnosis(response.data)
        });
      });
    }
  }, {
    key: "createUpload",
    value: function createUpload(input) {
      return this.transport.request({
        method: 'POST',
        path: '/api/v1/files/upload-url',
        body: input
      });
    }
  }, {
    key: "completeUpload",
    value: function completeUpload(fileId) {
      return this.transport.request({
        method: 'POST',
        path: "/api/v1/files/".concat(fileId, "/complete")
      });
    }
  }, {
    key: "listTasks",
    value: function listTasks() {
      return this.transport.request({
        method: 'GET',
        path: '/api/v1/tasks'
      }).then(function (response) {
        return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, response), {}, {
          data: (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, response.data), {}, {
            items: response.data.items.map(normalizeTask)
          })
        });
      });
    }
  }, {
    key: "createTask",
    value: function createTask(input) {
      var _input$priority;
      var clientRequestId = input.clientRequestId,
        taskInput = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_4__["default"])(input, _excluded);
      var body = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, taskInput), {}, {
        priority: (_input$priority = input.priority) === null || _input$priority === void 0 ? void 0 : _input$priority.toLowerCase()
      }, clientRequestId ? {
        clientRequestId: clientRequestId
      } : {});
      return this.transport.request({
        method: 'POST',
        path: '/api/v1/tasks',
        body: body,
        idempotencyKey: clientRequestId
      }).then(function (response) {
        return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, response), {}, {
          data: normalizeTask(response.data)
        });
      });
    }
  }, {
    key: "updateTask",
    value: function updateTask(taskId, input) {
      var priority = input.priority,
        rest = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_4__["default"])(input, _excluded2);
      var body = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, rest), priority ? {
        priority: priority.toLowerCase()
      } : {});
      return this.transport.request({
        method: 'PATCH',
        path: "/api/v1/tasks/".concat(taskId),
        body: body
      }).then(function (response) {
        return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, response), {}, {
          data: normalizeTask(response.data)
        });
      });
    }
  }, {
    key: "completeTask",
    value: function completeTask(taskId, note) {
      return this.transport.request({
        method: 'POST',
        path: "/api/v1/tasks/".concat(taskId, "/complete"),
        body: {
          note: note
        }
      }).then(function (response) {
        return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, response), {}, {
          data: normalizeTask(response.data)
        });
      });
    }
  }, {
    key: "listMessages",
    value: function listMessages() {
      return this.transport.request({
        method: 'GET',
        path: '/api/v1/messages'
      }).then(function (response) {
        return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, response), {}, {
          data: (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, response.data), {}, {
            items: response.data.items.map(normalizeMessage)
          })
        });
      });
    }
  }, {
    key: "unreadMessageCount",
    value: function unreadMessageCount() {
      return this.transport.request({
        method: 'GET',
        path: '/api/v1/messages/unread-count'
      });
    }
  }, {
    key: "markMessageRead",
    value: function markMessageRead(messageId) {
      return this.transport.request({
        method: 'POST',
        path: "/api/v1/messages/".concat(messageId, "/read")
      }).then(function (response) {
        return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, response), {}, {
          data: normalizeMessage(response.data)
        });
      });
    }
  }]);
}();
function toAuthIdentity(result) {
  return {
    userId: result.user.id,
    displayName: result.user.nickname,
    isMock: result.user.id.startsWith('user_p0_')
  };
}


/***/ }),

/***/ "./src/components/business/DiagnosisCard/index.tsx":
/*!*********************************************************!*\
  !*** ./src/components/business/DiagnosisCard/index.tsx ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DiagnosisCard: function() { return /* binding */ DiagnosisCard; }
/* harmony export */ });
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/.pnpm/@tarojs+plugin-platform-wea_4e8305395171dc1f042a34fd93f3fd6b/node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _components_qd_ui_Badge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/components/qd-ui/Badge */ "./src/components/qd-ui/Badge/index.tsx");
/* harmony import */ var _RiskBadge__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../RiskBadge */ "./src/components/business/RiskBadge/index.tsx");
/* harmony import */ var _utils_format__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/utils/format */ "./src/utils/format.ts");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "webpack/container/remote/react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);






var statusPresentation = {
  PENDING: {
    label: '等待分析',
    tone: 'info'
  },
  PROCESSING: {
    label: '处理中',
    tone: 'info'
  },
  COMPLETED: {
    label: '已完成',
    tone: 'neutral'
  },
  NEED_MORE_IMAGES: {
    label: '待补拍',
    tone: 'warning'
  },
  NEED_EXPERT_REVIEW: {
    label: '待复核',
    tone: 'warning'
  },
  FAILED: {
    label: '未完成',
    tone: 'danger'
  }
};
function DiagnosisCard(_ref) {
  var diagnosis = _ref.diagnosis,
    onClick = _ref.onClick;
  var issue = diagnosis.possibleIssues[0];
  var presentation = statusPresentation[diagnosis.status];
  var issueLabel = (issue === null || issue === void 0 ? void 0 : issue.name) || (diagnosis.status === 'FAILED' ? '本次诊断未完成' : diagnosis.status === 'NEED_MORE_IMAGES' ? '需要补充图片' : diagnosis.status === 'NEED_EXPERT_REVIEW' ? '等待农技员复核' : '正在分析图片特征');
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__.View, {
    className: "diagnosis-card",
    onClick: onClick,
    role: "button",
    "aria-label": "\u67E5\u770B".concat(diagnosis.crop, "\u8BCA\u65AD\u8BB0\u5F55"),
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__.View, {
      className: "diagnosis-card__header",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__.Text, {
        className: "diagnosis-card__crop",
        children: diagnosis.crop
      }), diagnosis.status === 'COMPLETED' && diagnosis.risk ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_RiskBadge__WEBPACK_IMPORTED_MODULE_1__.RiskBadge, {
        level: diagnosis.risk.level,
        label: diagnosis.risk.label
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_components_qd_ui_Badge__WEBPACK_IMPORTED_MODULE_0__.Badge, {
        tone: presentation.tone,
        children: presentation.label
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__.Text, {
      className: "diagnosis-card__issue",
      children: issueLabel
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__.View, {
      className: "diagnosis-card__meta",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__.Text, {
        children: (0,_utils_format__WEBPACK_IMPORTED_MODULE_4__.formatDateTime)(diagnosis.createdAt)
      }), issue ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__.Text, {
        children: ["\u53EF\u4FE1\u5EA6 ", (0,_utils_format__WEBPACK_IMPORTED_MODULE_4__.formatConfidence)(issue.confidence)]
      }) : null]
    })]
  });
}

/***/ }),

/***/ "./src/components/business/RiskBadge/index.tsx":
/*!*****************************************************!*\
  !*** ./src/components/business/RiskBadge/index.tsx ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RiskBadge: function() { return /* binding */ RiskBadge; }
/* harmony export */ });
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/.pnpm/@tarojs+plugin-platform-wea_4e8305395171dc1f042a34fd93f3fd6b/node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _components_qd_ui_Badge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/components/qd-ui/Badge */ "./src/components/qd-ui/Badge/index.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "webpack/container/remote/react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);




function RiskBadge(_ref) {
  var level = _ref.level,
    label = _ref.label;
  var tone = level === 'HIGH' || level === 'CRITICAL' ? 'danger' : level === 'MEDIUM' ? 'warning' : 'success';
  var fallback = level === 'CRITICAL' ? '极高风险' : level === 'HIGH' ? '高风险' : level === 'MEDIUM' ? '中风险' : '低风险';
  var marker = level === 'HIGH' || level === 'CRITICAL' ? '!' : '•';
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components_qd_ui_Badge__WEBPACK_IMPORTED_MODULE_0__.Badge, {
    tone: tone,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.Text, {
      className: "risk-badge__marker",
      "aria-hidden": true,
      children: marker
    }), label || fallback]
  });
}

/***/ }),

/***/ "./src/components/business/TaskItem/index.tsx":
/*!****************************************************!*\
  !*** ./src/components/business/TaskItem/index.tsx ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TaskItem: function() { return /* binding */ TaskItem; }
/* harmony export */ });
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/.pnpm/@tarojs+plugin-platform-wea_4e8305395171dc1f042a34fd93f3fd6b/node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/container/remote/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_qd_ui_Badge__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/qd-ui/Badge */ "./src/components/qd-ui/Badge/index.tsx");
/* harmony import */ var _components_qd_ui_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/qd-ui/Button */ "./src/components/qd-ui/Button/index.tsx");
/* harmony import */ var _utils_format__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/utils/format */ "./src/utils/format.ts");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "webpack/container/remote/react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);










var priorityLabels = {
  LOW: '不着急',
  MEDIUM: '建议今天',
  HIGH: '优先处理'
};
function toDateInput(value) {
  if (!value) return new Date().toISOString().slice(0, 10);
  var date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date().toISOString().slice(0, 10) : date.toISOString().slice(0, 10);
}
function TaskItem(_ref) {
  var task = _ref.task,
    onComplete = _ref.onComplete,
    onUpdate = _ref.onUpdate,
    _ref$loading = _ref.loading,
    loading = _ref$loading === void 0 ? false : _ref$loading,
    _ref$updating = _ref.updating,
    updating = _ref$updating === void 0 ? false : _ref$updating;
  var completed = task.status === 'COMPLETED';
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState2 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_4__["default"])(_useState, 2),
    note = _useState2[0],
    setNote = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState4 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_4__["default"])(_useState3, 2),
    showNote = _useState4[0],
    setShowNote = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState6 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_4__["default"])(_useState5, 2),
    editing = _useState6[0],
    setEditing = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(task.title),
    _useState8 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_4__["default"])(_useState7, 2),
    title = _useState8[0],
    setTitle = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(task.description || ''),
    _useState0 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_4__["default"])(_useState9, 2),
    description = _useState0[0],
    setDescription = _useState0[1];
  var _useState1 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(toDateInput(task.dueAt)),
    _useState10 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_4__["default"])(_useState1, 2),
    dueDate = _useState10[0],
    setDueDate = _useState10[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (editing) return;
    setTitle(task.title);
    setDescription(task.description || '');
    setDueDate(toDateInput(task.dueAt));
  }, [editing, task.description, task.dueAt, task.title]);
  var openNote = function openNote() {
    if (!loading) setShowNote(true);
  };
  var cancelNote = function cancelNote() {
    setNote('');
    setShowNote(false);
  };
  var submitComplete = function submitComplete() {
    return onComplete === null || onComplete === void 0 ? void 0 : onComplete(note.trim() || undefined);
  };
  var startEdit = function startEdit() {
    if (loading || updating) return;
    setShowNote(false);
    setEditing(true);
  };
  var cancelEdit = function cancelEdit() {
    setTitle(task.title);
    setDescription(task.description || '');
    setDueDate(toDateInput(task.dueAt));
    setEditing(false);
  };
  var submitEdit = /*#__PURE__*/function () {
    var _ref2 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_5__["default"])(/*#__PURE__*/(0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_6__["default"])().m(function _callee() {
      var updated;
      return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_6__["default"])().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            if (!(!onUpdate || !title.trim() || !dueDate || updating)) {
              _context.n = 1;
              break;
            }
            return _context.a(2);
          case 1:
            _context.n = 2;
            return onUpdate({
              title: title.trim(),
              description: description.trim() || undefined,
              dueAt: new Date("".concat(dueDate, "T09:00:00")).toISOString()
            });
          case 2:
            updated = _context.v;
            if (updated) setEditing(false);
          case 3:
            return _context.a(2);
        }
      }, _callee);
    }));
    return function submitEdit() {
      return _ref2.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
    className: "task-item ".concat(completed ? 'task-item--completed' : ''),
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
      className: "task-item__body",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: "task-item__top",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
          className: "task-item__title",
          children: task.title
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_qd_ui_Badge__WEBPACK_IMPORTED_MODULE_1__.Badge, {
          tone: completed ? 'success' : task.status === 'OVERDUE' ? 'danger' : task.priority === 'HIGH' ? 'warning' : 'neutral',
          children: completed ? '已完成' : task.status === 'OVERDUE' ? '已逾期' : '待处理'
        })]
      }), task.description ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
        className: "task-item__description",
        children: task.description
      }) : null, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: "task-item__meta-row",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
          className: "task-item__time",
          children: ["\u8BA1\u5212\u65F6\u95F4\uFF1A", (0,_utils_format__WEBPACK_IMPORTED_MODULE_8__.formatDateTime)(task.dueAt)]
        }), !completed ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
          className: "task-item__priority task-item__priority--".concat(task.priority.toLowerCase()),
          children: priorityLabels[task.priority]
        }) : null]
      }), !completed && onComplete && showNote ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: "task-item__note",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Input, {
          className: "task-item__note-input",
          value: note,
          maxlength: 120,
          placeholder: "\u8BB0\u5F55\u5904\u7406\u7ED3\u679C\uFF08\u53EF\u9009\uFF09",
          "aria-label": "\u5B8C\u6210\u5907\u6CE8",
          onInput: function onInput(event) {
            return setNote(event.detail.value);
          }
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: "task-item__note-actions",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_qd_ui_Button__WEBPACK_IMPORTED_MODULE_2__.Button, {
            variant: "ghost",
            disabled: loading,
            onClick: cancelNote,
            children: "\u53D6\u6D88"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_qd_ui_Button__WEBPACK_IMPORTED_MODULE_2__.Button, {
            variant: "secondary",
            loading: loading,
            onClick: submitComplete,
            children: "\u786E\u8BA4\u5B8C\u6210"
          })]
        })]
      }) : null, !completed && onUpdate && editing ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: "task-item__edit",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Input, {
          className: "task-item__edit-input",
          value: title,
          maxlength: 80,
          placeholder: "\u4EFB\u52A1\u540D\u79F0",
          "aria-label": "\u4EFB\u52A1\u540D\u79F0",
          onInput: function onInput(event) {
            return setTitle(event.detail.value);
          }
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Textarea, {
          className: "task-item__edit-textarea",
          value: description,
          maxlength: 200,
          placeholder: "\u8865\u5145\u6267\u884C\u8BF4\u660E\uFF08\u53EF\u9009\uFF09",
          "aria-label": "\u4EFB\u52A1\u8BF4\u660E",
          onInput: function onInput(event) {
            return setDescription(event.detail.value);
          }
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: "task-item__edit-date",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
            children: "\u8BA1\u5212\u65E5\u671F"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Picker, {
            mode: "date",
            value: dueDate,
            onChange: function onChange(event) {
              return setDueDate(event.detail.value);
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
              children: dueDate
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: "task-item__note-actions",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_qd_ui_Button__WEBPACK_IMPORTED_MODULE_2__.Button, {
            variant: "ghost",
            disabled: updating,
            onClick: cancelEdit,
            children: "\u53D6\u6D88"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_qd_ui_Button__WEBPACK_IMPORTED_MODULE_2__.Button, {
            variant: "secondary",
            loading: updating,
            disabled: !title.trim() || !dueDate,
            onClick: submitEdit,
            children: "\u4FDD\u5B58\u4FEE\u6539"
          })]
        })]
      }) : null]
    }), !completed && !showNote && !editing ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
      className: "task-item__actions",
      children: [onUpdate ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_qd_ui_Button__WEBPACK_IMPORTED_MODULE_2__.Button, {
        variant: "ghost",
        disabled: loading || updating,
        ariaLabel: "\u7F16\u8F91\u4EFB\u52A1\uFF1A".concat(task.title),
        onClick: startEdit,
        children: "\u7F16\u8F91"
      }) : null, onComplete ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_qd_ui_Button__WEBPACK_IMPORTED_MODULE_2__.Button, {
        variant: "secondary",
        loading: loading,
        ariaLabel: "\u5B8C\u6210\u4EFB\u52A1\uFF1A".concat(task.title),
        onClick: openNote,
        children: "\u5B8C\u6210"
      }) : null]
    }) : null]
  });
}

/***/ }),

/***/ "./src/components/qd-ui/Badge/index.tsx":
/*!**********************************************!*\
  !*** ./src/components/qd-ui/Badge/index.tsx ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Badge: function() { return /* binding */ Badge; }
/* harmony export */ });
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/.pnpm/@tarojs+plugin-platform-wea_4e8305395171dc1f042a34fd93f3fd6b/node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "webpack/container/remote/react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);



function Badge(_ref) {
  var children = _ref.children,
    _ref$tone = _ref.tone,
    tone = _ref$tone === void 0 ? 'neutral' : _ref$tone;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Text, {
    className: "qd-badge qd-badge--".concat(tone),
    children: children
  });
}

/***/ }),

/***/ "./src/components/qd-ui/Button/index.tsx":
/*!***********************************************!*\
  !*** ./src/components/qd-ui/Button/index.tsx ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Button: function() { return /* binding */ Button; },
/* harmony export */   ButtonGroup: function() { return /* binding */ ButtonGroup; }
/* harmony export */ });
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/.pnpm/@tarojs+plugin-platform-wea_4e8305395171dc1f042a34fd93f3fd6b/node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "webpack/container/remote/react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);



function Button(_ref) {
  var children = _ref.children,
    _ref$variant = _ref.variant,
    variant = _ref$variant === void 0 ? 'primary' : _ref$variant,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'md' : _ref$size,
    _ref$block = _ref.block,
    block = _ref$block === void 0 ? false : _ref$block,
    _ref$loading = _ref.loading,
    loading = _ref$loading === void 0 ? false : _ref$loading,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    onClick = _ref.onClick,
    ariaLabel = _ref.ariaLabel;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    className: "qd-button qd-button--".concat(variant, " qd-button--").concat(size, " ").concat(block ? 'qd-button--block' : ''),
    disabled: disabled || loading,
    loading: loading,
    onClick: onClick,
    "aria-label": ariaLabel,
    "aria-busy": loading,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Text, {
      children: loading ? '请稍候' : children
    })
  });
}
function ButtonGroup(_ref2) {
  var children = _ref2.children;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
    className: "qd-button-group",
    children: children
  });
}

/***/ }),

/***/ "./src/components/qd-ui/EmptyState/index.tsx":
/*!***************************************************!*\
  !*** ./src/components/qd-ui/EmptyState/index.tsx ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EmptyState: function() { return /* binding */ EmptyState; }
/* harmony export */ });
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/.pnpm/@tarojs+plugin-platform-wea_4e8305395171dc1f042a34fd93f3fd6b/node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Button */ "./src/components/qd-ui/Button/index.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "webpack/container/remote/react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);




function EmptyState(_ref) {
  var title = _ref.title,
    description = _ref.description,
    actionLabel = _ref.actionLabel,
    onAction = _ref.onAction;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.View, {
    className: "qd-empty",
    role: "status",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.View, {
      className: "qd-empty__mark",
      "aria-hidden": true
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.Text, {
      className: "qd-empty__title",
      children: title
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.Text, {
      className: "qd-empty__description",
      children: description
    }), actionLabel && onAction ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_0__.Button, {
      variant: "secondary",
      onClick: onAction,
      children: actionLabel
    }) : null]
  });
}

/***/ }),

/***/ "./src/components/qd-ui/Field/index.tsx":
/*!**********************************************!*\
  !*** ./src/components/qd-ui/Field/index.tsx ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Field: function() { return /* binding */ Field; }
/* harmony export */ });
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/.pnpm/@tarojs+plugin-platform-wea_4e8305395171dc1f042a34fd93f3fd6b/node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "webpack/container/remote/react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);



function Field(_ref) {
  var label = _ref.label,
    value = _ref.value,
    placeholder = _ref.placeholder,
    _ref$multiline = _ref.multiline,
    multiline = _ref$multiline === void 0 ? false : _ref$multiline,
    maxLength = _ref.maxLength,
    onChange = _ref.onChange;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
    className: "qd-field",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Text, {
      className: "qd-field__label",
      children: label
    }), multiline ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Textarea, {
      className: "qd-field__control qd-field__textarea",
      value: value,
      placeholder: placeholder,
      maxlength: maxLength,
      "aria-label": label,
      onInput: function onInput(event) {
        return onChange(event.detail.value);
      }
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Input, {
      className: "qd-field__control",
      value: value,
      placeholder: placeholder,
      maxlength: maxLength,
      "aria-label": label,
      onInput: function onInput(event) {
        return onChange(event.detail.value);
      }
    })]
  });
}

/***/ }),

/***/ "./src/components/qd-ui/PageState/index.tsx":
/*!**************************************************!*\
  !*** ./src/components/qd-ui/PageState/index.tsx ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ErrorState: function() { return /* binding */ ErrorState; },
/* harmony export */   LoadingState: function() { return /* binding */ LoadingState; }
/* harmony export */ });
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/.pnpm/@tarojs+plugin-platform-wea_4e8305395171dc1f042a34fd93f3fd6b/node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Button */ "./src/components/qd-ui/Button/index.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "webpack/container/remote/react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);




function LoadingState(_ref) {
  var _ref$label = _ref.label,
    label = _ref$label === void 0 ? '正在加载' : _ref$label;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.View, {
    className: "qd-page-state",
    role: "status",
    "aria-live": "polite",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.View, {
      className: "qd-page-state__pulse"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.Text, {
      children: label
    })]
  });
}
function ErrorState(_ref2) {
  var _ref2$title = _ref2.title,
    title = _ref2$title === void 0 ? '暂时无法加载' : _ref2$title,
    message = _ref2.message,
    onRetry = _ref2.onRetry,
    _ref2$retrying = _ref2.retrying,
    retrying = _ref2$retrying === void 0 ? false : _ref2$retrying,
    actionLabel = _ref2.actionLabel,
    onAction = _ref2.onAction;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.View, {
    className: "qd-page-state",
    role: "alert",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.Text, {
      className: "qd-page-state__title",
      children: title
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.Text, {
      className: "qd-page-state__message",
      children: message
    }), onRetry ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_0__.Button, {
      variant: "secondary",
      loading: retrying,
      onClick: onRetry,
      children: "\u91CD\u65B0\u52A0\u8F7D"
    }) : null, onAction ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_0__.Button, {
      variant: "ghost",
      onClick: onAction,
      children: actionLabel || '继续操作'
    }) : null]
  });
}

/***/ }),

/***/ "./src/config/env.ts":
/*!***************************!*\
  !*** ./src/config/env.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   API_BASE_URL: function() { return /* binding */ API_BASE_URL; },
/* harmony export */   API_MODE: function() { return /* binding */ API_MODE; },
/* harmony export */   AUTH_TOKEN_STORAGE_KEY: function() { return /* binding */ AUTH_TOKEN_STORAGE_KEY; },
/* harmony export */   SUBSCRIBE_TEMPLATE_IDS: function() { return /* binding */ SUBSCRIBE_TEMPLATE_IDS; }
/* harmony export */ });
var API_MODE =  false ? 0 : 'mock';
var API_BASE_URL =  false || 'http://127.0.0.1:3000';
var AUTH_TOKEN_STORAGE_KEY = 'nongjianzhen_access_token';
var SUBSCRIBE_TEMPLATE_IDS = ( false || '').split(',').map(function (item) {
  return item.trim();
}).filter(Boolean);

/***/ }),

/***/ "./src/mocks/agriculture-knowledge.ts":
/*!********************************************!*\
  !*** ./src/mocks/agriculture-knowledge.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildMockKnowledgeResult: function() { return /* binding */ buildMockKnowledgeResult; }
/* harmony export */ });
/* unused harmony export agricultureKnowledgeVersion */
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _data_agriculture_issues_v1_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../data/agriculture/issues.v1.json */ "./data/agriculture/issues.v1.json");


var knowledge = _data_agriculture_issues_v1_json__WEBPACK_IMPORTED_MODULE_0__;
var defaultIssueIds = {
  番茄: 'tomato-late-blight',
  黄瓜: 'cucumber-downy-mildew',
  水稻: 'rice-blast',
  玉米: 'corn-northern-leaf-blight',
  柑橘: 'citrus-huanglongbing'
};
var riskLabels = {
  LOW: '低风险',
  MEDIUM: '中风险',
  HIGH: '高风险',
  CRITICAL: '严重风险'
};
function toRiskLevel(level) {
  return level.toUpperCase();
}
function createModel() {
  return {
    name: 'agriculture-knowledge-mock',
    version: '1.1.0',
    provider: 'local-mock',
    promptVersion: 'diagnosis-prompt-1.0.0',
    policyVersion: '1.0.0-mvp',
    knowledgeVersion: knowledge.version
  };
}
function buildMockKnowledgeResult(crop) {
  var issue = knowledge.issues.find(function (item) {
    return item.id === defaultIssueIds[crop];
  });
  if (!issue) {
    return {
      possibleIssues: [],
      actions: [],
      disclaimer: '当前演示知识库暂不支持该作物，请补充作物信息或请农技员判断。',
      decision: 'ASK_MORE',
      followUpQuestions: [{
        code: 'SELECT_SUPPORTED_CROP',
        prompt: '请选择番茄、黄瓜、水稻、玉米或柑橘，并补拍整株和异常部位。',
        captureHint: '至少包含一张整株照片和一张异常部位近照。'
      }],
      expertReview: {
        required: false,
        reasonCodes: []
      },
      model: createModel()
    };
  }
  var riskLevel = toRiskLevel(issue.riskLevel);
  var expertReviewRequired = issue.expertReview.recommended || riskLevel === 'HIGH' || riskLevel === 'CRITICAL';
  var actions = [].concat((0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(issue.recommendedActions.immediate.slice(0, 2).map(function (title) {
    return {
      type: 'DO_NOW',
      title: title
    };
  })), (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(issue.recommendedActions.followUp.slice(0, 1).map(function (title) {
    return {
      type: 'OBSERVE',
      title: title,
      dueAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    };
  })), (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(issue.doNot.slice(0, 1).map(function (title) {
    return {
      type: 'AVOID',
      title: title
    };
  })));
  if (expertReviewRequired) actions.push({
    type: 'EXPERT_REVIEW',
    title: issue.plainLanguage.nextStep
  });
  return {
    possibleIssues: [{
      name: issue.plainLanguage.shortName,
      confidence: Math.min(0.86, issue.aiReview.confidenceCap),
      evidence: issue.symptoms.slice(0, 3),
      riskLevel: riskLevel,
      lookalikes: issue.lookalikes || []
    }],
    risk: {
      level: riskLevel,
      label: riskLabels[riskLevel],
      reason: issue.plainLanguage.summary
    },
    actions: actions,
    disclaimer: "\u4EE5\u4E0A\u4E3A\u57FA\u4E8E\u6F14\u793A\u77E5\u8BC6\u5E93\u7684\u8F85\u52A9\u5224\u65AD\uFF0C\u4E0D\u4EE3\u8868\u786E\u8BCA\u3002".concat(issue.safeInterval.displayText),
    decision: expertReviewRequired ? 'EXPERT_REVIEW' : 'RESULT',
    followUpQuestions: [],
    expertReview: {
      required: expertReviewRequired,
      reasonCodes: expertReviewRequired ? ['KNOWLEDGE_POLICY_REVIEW'] : [],
      message: expertReviewRequired ? '当前问题风险较高或容易混淆，建议让农技人员结合田间情况复核。' : undefined
    },
    model: createModel()
  };
}
var agricultureKnowledgeVersion = knowledge.version;

/***/ }),

/***/ "./src/mocks/seed.ts":
/*!***************************!*\
  !*** ./src/mocks/seed.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   seedDiagnoses: function() { return /* binding */ seedDiagnoses; },
/* harmony export */   seedFarms: function() { return /* binding */ seedFarms; },
/* harmony export */   seedTasks: function() { return /* binding */ seedTasks; }
/* harmony export */ });
var now = new Date().toISOString();
var seedFarms = [{
  id: 'farm_demo_001',
  name: '向阳示范农场',
  location: '浙江省杭州市临安区',
  areaMu: 18.6,
  healthScore: 86,
  plots: [{
    id: 'plot_demo_001',
    farmId: 'farm_demo_001',
    name: '东一号棚',
    cropName: '番茄',
    growthStage: '开花期',
    areaMu: 3.2,
    plantedAt: '2026-07-18'
  }, {
    id: 'plot_demo_002',
    farmId: 'farm_demo_001',
    name: '南二号田',
    cropName: '黄瓜',
    growthStage: '结果期',
    areaMu: 4.8,
    plantedAt: '2026-07-02'
  }]
}];
var seedDiagnoses = [{
  id: 'diag_demo_history_001',
  status: 'COMPLETED',
  crop: '番茄',
  plotId: 'plot_demo_001',
  createdAt: now,
  updatedAt: now,
  possibleIssues: [{
    name: '疑似晚疫病',
    confidence: 0.86,
    evidence: ['叶片边缘出现不规则暗褐色病斑', '潮湿环境下病斑扩展较快']
  }],
  risk: {
    level: 'MEDIUM',
    label: '中风险',
    reason: '当前可能影响叶片和果实，建议 24 小时内复查。'
  },
  actions: [{
    type: 'DO_NOW',
    title: '隔离并标记异常植株',
    description: '避免潮湿时修剪，并记录病斑变化。'
  }, {
    type: 'OBSERVE',
    title: '检查相邻植株',
    description: '查看是否出现相似病斑。',
    dueAt: new Date(Date.now() + 86400000).toISOString()
  }, {
    type: 'AVOID',
    title: '暂不要自行混配药剂',
    description: '涉及用药时先咨询当地农技员。'
  }],
  disclaimer: '以上为辅助判断，请结合当地农技员意见确认。',
  model: {
    name: 'demo-diagnosis-model',
    version: 'mock-1.0.0'
  },
  requestId: 'mock_req_seed_001'
}];
var seedTasks = [{
  id: 'task_demo_001',
  title: '检查相邻番茄植株',
  description: '重点查看叶片背面和下层叶片。',
  farmId: 'farm_demo_001',
  plotId: 'plot_demo_001',
  diagnosisId: 'diag_demo_history_001',
  priority: 'HIGH',
  status: 'PENDING',
  dueAt: new Date(Date.now() + 86400000).toISOString(),
  createdAt: now,
  updatedAt: now
}];

/***/ }),

/***/ "./src/mocks/transport.ts":
/*!********************************!*\
  !*** ./src/mocks/transport.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mockTransport: function() { return /* binding */ mockTransport; }
/* harmony export */ });
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/taro */ "webpack/container/remote/@tarojs/taro");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/services/http */ "./src/services/http.ts");
/* harmony import */ var _agriculture_knowledge__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./agriculture-knowledge */ "./src/mocks/agriculture-knowledge.ts");
/* harmony import */ var _seed__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./seed */ "./src/mocks/seed.ts");








var STORAGE_KEY = 'nongjianzhen_mock_db_v1';
var ACCESS_TOKEN_STORAGE_KEY = 'nongjianzhen_access_token';
var DEFAULT_ACCOUNT_ID = 'user_p0_farmer_001';
function defaultLoop() {
  var now = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date().toISOString();
  return {
    stage: 'JUDGMENT',
    updatedAt: now
  };
}
function toServerDiagnosisRecord(record) {
  var _record$expertReview, _record$expertReview2, _record$error, _record$error2;
  var result = record.possibleIssues.length > 0 || record.actions.length > 0 || record.decision || record.loop ? {
    decision: record.decision === 'ASK_MORE' ? 'ask_more' : record.decision === 'EXPERT_REVIEW' ? 'expert_review' : record.decision === 'REJECTED' ? 'rejected' : 'result',
    model: {
      name: record.model.name,
      version: record.model.version,
      traceId: record.model.traceId || "mock_trace_".concat(record.id),
      knowledgeVersion: record.model.knowledgeVersion || 'mock-knowledge'
    },
    crop: record.crop,
    stage: record.growthStage || '',
    possibleProblems: record.possibleIssues.map(function (issue) {
      var _record$risk;
      return {
        name: issue.name,
        confidence: issue.confidence,
        riskLevel: (issue.riskLevel || ((_record$risk = record.risk) === null || _record$risk === void 0 ? void 0 : _record$risk.level) || 'medium').toLowerCase(),
        evidence: issue.evidence,
        lookalikes: issue.lookalikes
      };
    }),
    actions: record.actions.map(function (action) {
      return {
        title: action.title,
        description: action.description || '',
        priority: action.type === 'DO_NOW' ? 'now' : action.type === 'OBSERVE' ? 'follow_up' : 'today'
      };
    }),
    avoidActions: record.actions.filter(function (action) {
      return action.type === 'AVOID';
    }).map(function (action) {
      return action.title;
    }),
    followUpQuestions: record.followUpQuestions || [],
    needExpertReview: ((_record$expertReview = record.expertReview) === null || _record$expertReview === void 0 ? void 0 : _record$expertReview.required) || record.status === 'NEED_EXPERT_REVIEW',
    expertReviewReasons: ((_record$expertReview2 = record.expertReview) === null || _record$expertReview2 === void 0 ? void 0 : _record$expertReview2.reasonCodes) || [],
    needMoreImages: record.status === 'NEED_MORE_IMAGES' || record.decision === 'ASK_MORE',
    safety: record.safety || {
      passed: true,
      violationCodes: []
    },
    disclaimer: record.disclaimer,
    loop: record.loop || defaultLoop(record.updatedAt)
  } : null;
  return {
    id: record.id,
    status: record.status === 'PENDING' ? 'created' : record.status === 'PROCESSING' ? 'analyzing' : record.status === 'COMPLETED' ? 'completed' : record.status === 'NEED_MORE_IMAGES' ? 'need_more_images' : record.status === 'NEED_EXPERT_REVIEW' ? 'need_expert_review' : 'failed',
    plotId: record.plotId,
    cropName: record.crop,
    requestId: record.requestId,
    traceId: record.model.traceId || "mock_trace_".concat(record.id),
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
    result: result,
    failureCode: (_record$error = record.error) === null || _record$error === void 0 ? void 0 : _record$error.code,
    failureMessage: (_record$error2 = record.error) === null || _record$error2 === void 0 ? void 0 : _record$error2.message
  };
}
function getAccountId() {
  var token = _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().getStorageSync(ACCESS_TOKEN_STORAGE_KEY);
  if (typeof token === 'string' && token.startsWith('mock_token_')) return token.slice('mock_token_'.length) || DEFAULT_ACCOUNT_ID;
  return DEFAULT_ACCOUNT_ID;
}
function getStorageKey() {
  var accountId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getAccountId();
  // 保留默认账号的旧键，兼容已有本地演示数据和测试夹具。
  return accountId === DEFAULT_ACCOUNT_ID ? STORAGE_KEY : "".concat(STORAGE_KEY, ":").concat(accountId);
}
function getDatabase() {
  var storageKey = getStorageKey();
  var stored = _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().getStorageSync(storageKey);
  if (stored !== null && stored !== void 0 && stored.farms && stored !== null && stored !== void 0 && stored.diagnoses && stored !== null && stored !== void 0 && stored.tasks) {
    if (!stored.messages) {
      stored.messages = [];
      saveDatabase(stored);
    }
    return stored;
  }
  var initial = {
    farms: _seed__WEBPACK_IMPORTED_MODULE_3__.seedFarms.map(function (farm) {
      var _farm$plots;
      return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, farm), {}, {
        plots: (_farm$plots = farm.plots) === null || _farm$plots === void 0 ? void 0 : _farm$plots.map(function (plot) {
          return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, plot);
        })
      });
    }),
    diagnoses: _seed__WEBPACK_IMPORTED_MODULE_3__.seedDiagnoses.map(function (diagnosis) {
      var _diagnosis$followUpQu;
      return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, diagnosis), {}, {
        possibleIssues: diagnosis.possibleIssues.map(function (issue) {
          return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, issue), {}, {
            evidence: (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(issue.evidence),
            lookalikes: issue.lookalikes ? (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(issue.lookalikes) : undefined
          });
        }),
        risk: diagnosis.risk ? (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, diagnosis.risk) : undefined,
        actions: diagnosis.actions.map(function (action) {
          return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, action);
        }),
        model: (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, diagnosis.model),
        expertReview: diagnosis.expertReview ? (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, diagnosis.expertReview), {}, {
          reasonCodes: (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(diagnosis.expertReview.reasonCodes)
        }) : undefined,
        followUpQuestions: (_diagnosis$followUpQu = diagnosis.followUpQuestions) === null || _diagnosis$followUpQu === void 0 ? void 0 : _diagnosis$followUpQu.map(function (question) {
          return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, question);
        }),
        safety: diagnosis.safety ? (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, diagnosis.safety), {}, {
          violationCodes: (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(diagnosis.safety.violationCodes)
        }) : undefined,
        loop: diagnosis.loop ? (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, diagnosis.loop) : defaultLoop(diagnosis.updatedAt)
      });
    }),
    tasks: _seed__WEBPACK_IMPORTED_MODULE_3__.seedTasks.map(function (task) {
      return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, task);
    }),
    messages: [{
      id: 'message_demo_001',
      type: 'SYSTEM',
      title: '欢迎使用农间诊',
      content: '拍下作物异常部位，先获得一个可执行的初步判断。',
      targetType: 'diagnosis',
      createdAt: new Date().toISOString(),
      readAt: null
    }],
    sequence: 10
  };
  _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().setStorageSync(storageKey, initial);
  return initial;
}
function saveDatabase(database) {
  _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().setStorageSync(getStorageKey(), database);
}
function nextId(database, prefix) {
  database.sequence += 1;
  return "".concat(prefix, "_mock_").concat(String(database.sequence).padStart(4, '0'));
}
function response(database, data) {
  return {
    code: 'OK',
    message: 'success',
    data: data,
    requestId: "mock_req_".concat(String(database.sequence).padStart(4, '0'))
  };
}
function completeDiagnosis(record) {
  if (record.status !== 'PROCESSING' || Date.now() < (record.availableAt || 0)) return record;
  var result = (0,_agriculture_knowledge__WEBPACK_IMPORTED_MODULE_2__.buildMockKnowledgeResult)(record.crop);
  return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, record), {}, {
    status: 'COMPLETED',
    updatedAt: new Date().toISOString(),
    progress: undefined
  }, result);
}
function syncDiagnosisMessage(database, record) {
  if (record.status !== 'COMPLETED') return;
  var dedupeKey = "diagnosis-completed:".concat(record.id);
  if (database.messages.some(function (message) {
    return message.id === dedupeKey;
  })) return;
  database.messages.unshift({
    id: dedupeKey,
    type: 'DIAGNOSIS_COMPLETED',
    title: '诊断结果已生成',
    content: "".concat(record.crop, " \u7684\u521D\u6B65\u5224\u65AD\u5DF2\u7ECF\u5B8C\u6210\uFF0C\u70B9\u51FB\u67E5\u770B\u4E0B\u4E00\u6B65\u884C\u52A8\u3002"),
    targetType: 'diagnosis',
    targetId: record.id,
    readAt: null,
    createdAt: record.updatedAt
  });
}
function delay() {
  return _delay.apply(this, arguments);
}
function _delay() {
  _delay = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_6__["default"])(/*#__PURE__*/(0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_7__["default"])().m(function _callee2() {
    return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_7__["default"])().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          _context2.n = 1;
          return new Promise(function (resolve) {
            return setTimeout(resolve, 520);
          });
        case 1:
          return _context2.a(2);
      }
    }, _callee2);
  }));
  return _delay.apply(this, arguments);
}
var mockTransport = {
  request: function request(_request) {
    return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_6__["default"])(/*#__PURE__*/(0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_7__["default"])().m(function _callee() {
      var database, method, path, _request$body, accountId, input, farm, farmMatch, _farm, _input, plotsMatch, _farm2, plots, _input2, plot, plotMatch, _farm3$plots, plotIndex, _farm3, _plot, _input3, _input4$images$, _input4, existing, now, id, record, resultMatch, retryMatch, detailMatch, index, current, _now, verifyMatch, _index, _input5, outcome, _now2, _current, diagnosisId, _index2, messageReadMatch, message, _input6, _existing, _now3, task, diagnosis, completeTaskMatch, _input7$note, _task, _input7, _diagnosis, updateTaskMatch, _task2;
      return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_7__["default"])().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            _context.n = 1;
            return delay();
          case 1:
            database = getDatabase();
            method = _request.method, path = _request.path;
            if (!(method === 'POST' && path === '/api/v1/auth/mock-login')) {
              _context.n = 2;
              break;
            }
            accountId = ((_request$body = _request.body) === null || _request$body === void 0 ? void 0 : _request$body.accountId) || 'user_p0_farmer_001';
            return _context.a(2, response(database, {
              accessToken: "mock_token_".concat(accountId),
              tokenType: 'Bearer',
              expiresIn: '7d',
              user: {
                id: accountId,
                nickname: '向阳农场主',
                role: 'farmer'
              }
            }));
          case 2:
            if (!(method === 'POST' && path === '/api/v1/auth/logout')) {
              _context.n = 3;
              break;
            }
            return _context.a(2, response(database, undefined));
          case 3:
            if (!(method === 'GET' && path === '/api/v1/farms')) {
              _context.n = 4;
              break;
            }
            return _context.a(2, response(database, {
              items: database.farms,
              total: database.farms.length
            }));
          case 4:
            if (!(method === 'POST' && path === '/api/v1/farms')) {
              _context.n = 5;
              break;
            }
            input = _request.body;
            farm = {
              id: nextId(database, 'farm'),
              name: input.name,
              location: input.location || input.region || '',
              plots: []
            };
            database.farms.unshift(farm);
            saveDatabase(database);
            return _context.a(2, response(database, farm));
          case 5:
            farmMatch = path.match(/^\/api\/v1\/farms\/([^/]+)$/);
            if (!(farmMatch && method === 'PATCH')) {
              _context.n = 7;
              break;
            }
            _farm = database.farms.find(function (item) {
              return item.id === decodeURIComponent(farmMatch[1]);
            });
            if (_farm) {
              _context.n = 6;
              break;
            }
            throw new _services_http__WEBPACK_IMPORTED_MODULE_1__.ApiRequestError('FARM_NOT_FOUND', '未找到该农场');
          case 6:
            _input = _request.body;
            if (_input.name !== undefined) _farm.name = _input.name;
            if (_input.region !== undefined) _farm.location = _input.region;
            saveDatabase(database);
            return _context.a(2, response(database, _farm));
          case 7:
            plotsMatch = path.match(/^\/api\/v1\/farms\/([^/]+)\/plots$/);
            if (!plotsMatch) {
              _context.n = 10;
              break;
            }
            _farm2 = database.farms.find(function (item) {
              return item.id === decodeURIComponent(plotsMatch[1]);
            });
            if (_farm2) {
              _context.n = 8;
              break;
            }
            throw new _services_http__WEBPACK_IMPORTED_MODULE_1__.ApiRequestError('FARM_NOT_FOUND', '未找到该农场');
          case 8:
            if (!(method === 'GET')) {
              _context.n = 9;
              break;
            }
            plots = _farm2.plots || [];
            return _context.a(2, response(database, {
              items: plots,
              total: plots.length
            }));
          case 9:
            if (!(method === 'POST')) {
              _context.n = 10;
              break;
            }
            _input2 = _request.body;
            plot = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({
              id: nextId(database, 'plot'),
              farmId: _farm2.id
            }, _input2);
            _farm2.plots = [plot].concat((0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_farm2.plots || []));
            saveDatabase(database);
            return _context.a(2, response(database, plot));
          case 10:
            plotMatch = path.match(/^\/api\/v1\/plots\/([^/]+)$/);
            if (!plotMatch) {
              _context.n = 13;
              break;
            }
            plotIndex = database.farms.findIndex(function (farm) {
              return (farm.plots || []).some(function (plot) {
                return plot.id === decodeURIComponent(plotMatch[1]);
              });
            });
            _farm3 = database.farms[plotIndex];
            _plot = _farm3 === null || _farm3 === void 0 || (_farm3$plots = _farm3.plots) === null || _farm3$plots === void 0 ? void 0 : _farm3$plots.find(function (item) {
              return item.id === decodeURIComponent(plotMatch[1]);
            });
            if (!(!_farm3 || !_plot)) {
              _context.n = 11;
              break;
            }
            throw new _services_http__WEBPACK_IMPORTED_MODULE_1__.ApiRequestError('PLOT_NOT_FOUND', '未找到该地块');
          case 11:
            if (!(method === 'PATCH')) {
              _context.n = 12;
              break;
            }
            _input3 = _request.body;
            Object.assign(_plot, _input3);
            saveDatabase(database);
            return _context.a(2, response(database, _plot));
          case 12:
            if (!(method === 'DELETE')) {
              _context.n = 13;
              break;
            }
            _farm3.plots = (_farm3.plots || []).filter(function (item) {
              return item.id !== _plot.id;
            });
            saveDatabase(database);
            return _context.a(2, response(database, {
              id: _plot.id,
              deleted: true
            }));
          case 13:
            if (!(method === 'POST' && path === '/api/v1/diagnoses')) {
              _context.n = 15;
              break;
            }
            _input4 = _request.body;
            existing = database.diagnoses.find(function (item) {
              return item.clientRequestId === _input4.clientRequestId;
            });
            if (!existing) {
              _context.n = 14;
              break;
            }
            return _context.a(2, response(database, toServerDiagnosisRecord(existing)));
          case 14:
            now = new Date().toISOString();
            id = nextId(database, 'diag');
            record = {
              id: id,
              status: 'PROCESSING',
              crop: _input4.cropName || '待确认作物',
              growthStage: _input4.growthStage,
              description: _input4.description,
              plotId: _input4.plotId,
              imageUrl: (_input4$images$ = _input4.images[0]) === null || _input4$images$ === void 0 ? void 0 : _input4$images$.objectKey,
              createdAt: now,
              updatedAt: now,
              possibleIssues: [],
              actions: [],
              disclaimer: '以上为辅助判断，请结合当地农技员意见确认。',
              model: {
                name: 'demo-diagnosis-model',
                version: 'mock-1.0.0'
              },
              requestId: "mock_req_".concat(id),
              loop: defaultLoop(now),
              progress: {
                stage: 'ANALYZING',
                label: '正在比对症状特征',
                percent: 62
              },
              clientRequestId: _input4.clientRequestId,
              availableAt: Date.now() + 1600
            };
            database.diagnoses.unshift(record);
            saveDatabase(database);
            return _context.a(2, response(database, toServerDiagnosisRecord(record)));
          case 15:
            if (!(method === 'GET' && path === '/api/v1/diagnoses')) {
              _context.n = 16;
              break;
            }
            database.diagnoses = database.diagnoses.map(completeDiagnosis);
            database.diagnoses.forEach(function (record) {
              return syncDiagnosisMessage(database, record);
            });
            saveDatabase(database);
            return _context.a(2, response(database, {
              items: database.diagnoses.map(toServerDiagnosisRecord),
              total: database.diagnoses.length
            }));
          case 16:
            resultMatch = path.match(/^\/api\/v1\/diagnoses\/([^/]+)\/result$/);
            retryMatch = path.match(/^\/api\/v1\/diagnoses\/([^/]+)\/retry$/);
            detailMatch = path.match(/^\/api\/v1\/diagnoses\/([^/]+)$/);
            if (!(method === 'POST' && retryMatch)) {
              _context.n = 19;
              break;
            }
            index = database.diagnoses.findIndex(function (item) {
              return item.id === decodeURIComponent(retryMatch[1]);
            });
            if (!(index < 0)) {
              _context.n = 17;
              break;
            }
            throw new _services_http__WEBPACK_IMPORTED_MODULE_1__.ApiRequestError('DIAGNOSIS_NOT_FOUND', '未找到该诊断记录');
          case 17:
            current = database.diagnoses[index];
            if (!(current.status !== 'FAILED' && current.status !== 'NEED_MORE_IMAGES')) {
              _context.n = 18;
              break;
            }
            throw new _services_http__WEBPACK_IMPORTED_MODULE_1__.ApiRequestError('DIAGNOSIS_INVALID_STATE', '当前诊断状态不能重试');
          case 18:
            _now = new Date().toISOString();
            database.diagnoses[index] = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, current), {}, {
              status: 'PROCESSING',
              updatedAt: _now,
              possibleIssues: [],
              risk: undefined,
              actions: [],
              decision: undefined,
              followUpQuestions: undefined,
              expertReview: undefined,
              safety: undefined,
              error: undefined,
              progress: {
                stage: 'ANALYZING',
                label: '正在重新分析图片',
                percent: 62
              },
              availableAt: Date.now() + 1600
            });
            saveDatabase(database);
            return _context.a(2, response(database, toServerDiagnosisRecord(database.diagnoses[index])));
          case 19:
            verifyMatch = path.match(/^\/api\/v1\/diagnoses\/([^/]+)\/verify$/);
            if (!(method === 'POST' && verifyMatch)) {
              _context.n = 22;
              break;
            }
            _index = database.diagnoses.findIndex(function (item) {
              return item.id === decodeURIComponent(verifyMatch[1]);
            });
            if (!(_index < 0)) {
              _context.n = 20;
              break;
            }
            throw new _services_http__WEBPACK_IMPORTED_MODULE_1__.ApiRequestError('DIAGNOSIS_NOT_FOUND', '未找到该诊断记录');
          case 20:
            _input5 = _request.body;
            outcome = _input5.outcome;
            if (!(!outcome || !['IMPROVED', 'UNCHANGED', 'WORSE', 'UNKNOWN'].includes(outcome))) {
              _context.n = 21;
              break;
            }
            throw new _services_http__WEBPACK_IMPORTED_MODULE_1__.ApiRequestError('DIAGNOSIS_INVALID_VERIFICATION', '复查结果不完整');
          case 21:
            _now2 = new Date().toISOString();
            _current = database.diagnoses[_index];
            _current.loop = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, _current.loop || defaultLoop(_current.updatedAt)), {}, {
              stage: outcome === 'IMPROVED' ? 'CLOSED' : outcome === 'UNKNOWN' ? 'VERIFICATION' : 'REASSESSMENT',
              outcome: outcome,
              note: _input5.note,
              verifiedAt: _now2,
              updatedAt: _now2
            });
            _current.updatedAt = _now2;
            saveDatabase(database);
            return _context.a(2, response(database, toServerDiagnosisRecord(_current)));
          case 22:
            diagnosisId = (resultMatch === null || resultMatch === void 0 ? void 0 : resultMatch[1]) || (detailMatch === null || detailMatch === void 0 ? void 0 : detailMatch[1]);
            if (!(method === 'GET' && diagnosisId)) {
              _context.n = 24;
              break;
            }
            _index2 = database.diagnoses.findIndex(function (item) {
              return item.id === decodeURIComponent(diagnosisId);
            });
            if (!(_index2 < 0)) {
              _context.n = 23;
              break;
            }
            throw new _services_http__WEBPACK_IMPORTED_MODULE_1__.ApiRequestError('DIAGNOSIS_NOT_FOUND', '未找到该诊断记录');
          case 23:
            database.diagnoses[_index2] = completeDiagnosis(database.diagnoses[_index2]);
            syncDiagnosisMessage(database, database.diagnoses[_index2]);
            saveDatabase(database);
            return _context.a(2, response(database, toServerDiagnosisRecord(database.diagnoses[_index2])));
          case 24:
            if (!(method === 'GET' && path === '/api/v1/tasks')) {
              _context.n = 25;
              break;
            }
            return _context.a(2, response(database, {
              items: database.tasks,
              total: database.tasks.length
            }));
          case 25:
            if (!(method === 'GET' && path === '/api/v1/messages')) {
              _context.n = 26;
              break;
            }
            return _context.a(2, response(database, {
              items: database.messages,
              total: database.messages.length
            }));
          case 26:
            if (!(method === 'GET' && path === '/api/v1/messages/unread-count')) {
              _context.n = 27;
              break;
            }
            return _context.a(2, response(database, {
              count: database.messages.filter(function (message) {
                return !message.readAt;
              }).length
            }));
          case 27:
            messageReadMatch = path.match(/^\/api\/v1\/messages\/([^/]+)\/read$/);
            if (!(method === 'POST' && messageReadMatch)) {
              _context.n = 29;
              break;
            }
            message = database.messages.find(function (item) {
              return item.id === decodeURIComponent(messageReadMatch[1]);
            });
            if (message) {
              _context.n = 28;
              break;
            }
            throw new _services_http__WEBPACK_IMPORTED_MODULE_1__.ApiRequestError('MESSAGE_NOT_FOUND', '未找到该消息');
          case 28:
            message.readAt || (message.readAt = new Date().toISOString());
            saveDatabase(database);
            return _context.a(2, response(database, message));
          case 29:
            if (!(method === 'POST' && path === '/api/v1/tasks')) {
              _context.n = 31;
              break;
            }
            _input6 = _request.body;
            _existing = _input6.clientRequestId ? database.tasks.find(function (item) {
              return item.clientRequestId === _input6.clientRequestId;
            }) : undefined;
            if (!_existing) {
              _context.n = 30;
              break;
            }
            return _context.a(2, response(database, _existing));
          case 30:
            _now3 = new Date().toISOString();
            task = {
              id: nextId(database, 'task'),
              clientRequestId: _input6.clientRequestId,
              title: _input6.title,
              description: _input6.description,
              farmId: _input6.farmId,
              plotId: _input6.plotId,
              diagnosisId: _input6.diagnosisId,
              priority: _input6.priority || 'MEDIUM',
              status: 'PENDING',
              dueAt: _input6.dueAt,
              createdAt: _now3,
              updatedAt: _now3
            };
            database.tasks.unshift(task);
            if (task.diagnosisId) {
              diagnosis = database.diagnoses.find(function (item) {
                return item.id === task.diagnosisId;
              });
              if (diagnosis) diagnosis.loop = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, diagnosis.loop || defaultLoop(diagnosis.updatedAt)), {}, {
                stage: 'EXECUTION',
                taskId: task.id,
                nextReviewAt: task.dueAt,
                updatedAt: _now3
              });
            }
            saveDatabase(database);
            return _context.a(2, response(database, task));
          case 31:
            completeTaskMatch = path.match(/^\/api\/v1\/tasks\/([^/]+)\/complete$/);
            if (!(method === 'POST' && completeTaskMatch)) {
              _context.n = 33;
              break;
            }
            _task = database.tasks.find(function (item) {
              return item.id === completeTaskMatch[1];
            });
            if (_task) {
              _context.n = 32;
              break;
            }
            throw new _services_http__WEBPACK_IMPORTED_MODULE_1__.ApiRequestError('TASK_NOT_FOUND', '未找到该任务');
          case 32:
            _input7 = _request.body;
            _task.status = 'COMPLETED';
            _task.completedNote = (_input7 === null || _input7 === void 0 || (_input7$note = _input7.note) === null || _input7$note === void 0 ? void 0 : _input7$note.trim()) || undefined;
            _task.updatedAt = new Date().toISOString();
            if (_task.diagnosisId) {
              _diagnosis = database.diagnoses.find(function (item) {
                return item.id === _task.diagnosisId;
              });
              if (_diagnosis) _diagnosis.loop = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, _diagnosis.loop || defaultLoop(_diagnosis.updatedAt)), {}, {
                stage: 'VERIFICATION',
                taskId: _task.id,
                updatedAt: _task.updatedAt
              });
            }
            saveDatabase(database);
            return _context.a(2, response(database, _task));
          case 33:
            updateTaskMatch = path.match(/^\/api\/v1\/tasks\/([^/]+)$/);
            if (!(method === 'PATCH' && updateTaskMatch)) {
              _context.n = 35;
              break;
            }
            _task2 = database.tasks.find(function (item) {
              return item.id === updateTaskMatch[1];
            });
            if (_task2) {
              _context.n = 34;
              break;
            }
            throw new _services_http__WEBPACK_IMPORTED_MODULE_1__.ApiRequestError('TASK_NOT_FOUND', '未找到该任务');
          case 34:
            Object.assign(_task2, _request.body, {
              updatedAt: new Date().toISOString()
            });
            saveDatabase(database);
            return _context.a(2, response(database, _task2));
          case 35:
            throw new _services_http__WEBPACK_IMPORTED_MODULE_1__.ApiRequestError('MOCK_ROUTE_NOT_FOUND', "Mock \u672A\u5B9E\u73B0\u63A5\u53E3\uFF1A".concat(method, " ").concat(path));
          case 36:
            return _context.a(2);
        }
      }, _callee);
    }))();
  }
};

/***/ }),

/***/ "./src/services/auth.api.ts":
/*!**********************************!*\
  !*** ./src/services/auth.api.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mockLogin: function() { return /* binding */ mockLogin; }
/* harmony export */ });
/* unused harmony export getWechatLoginCode */
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/taro */ "webpack/container/remote/@tarojs/taro");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_0__);



function mockLogin() {
  return _mockLogin.apply(this, arguments);
}
function _mockLogin() {
  _mockLogin = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])(/*#__PURE__*/(0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])().m(function _callee() {
    return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _context.n = 1;
          return new Promise(function (resolve) {
            return setTimeout(resolve, 360);
          });
        case 1:
          return _context.a(2, {
            userId: 'user_p0_farmer_001',
            displayName: '向阳农场主',
            isMock: true
          });
      }
    }, _callee);
  }));
  return _mockLogin.apply(this, arguments);
}
function getWechatLoginCode() {
  return _getWechatLoginCode.apply(this, arguments);
}
function _getWechatLoginCode() {
  _getWechatLoginCode = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])(/*#__PURE__*/(0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])().m(function _callee2() {
    var result;
    return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          _context2.n = 1;
          return _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().login();
        case 1:
          result = _context2.v;
          if (result.code) {
            _context2.n = 2;
            break;
          }
          throw new Error('未获得微信登录 code');
        case 2:
          return _context2.a(2, result.code);
      }
    }, _callee2);
  }));
  return _getWechatLoginCode.apply(this, arguments);
}

/***/ }),

/***/ "./src/services/client.ts":
/*!********************************!*\
  !*** ./src/services/client.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   apiClient: function() { return /* binding */ apiClient; }
/* harmony export */ });
/* harmony import */ var _nongjianzhen_api_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nongjianzhen/api-client */ "./packages/api-client/src/index.ts");
/* harmony import */ var _config_env__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/config/env */ "./src/config/env.ts");
/* harmony import */ var _mocks_transport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/mocks/transport */ "./src/mocks/transport.ts");
/* harmony import */ var _http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./http */ "./src/services/http.ts");




var apiClient = new _nongjianzhen_api_client__WEBPACK_IMPORTED_MODULE_0__.ApiClient(_config_env__WEBPACK_IMPORTED_MODULE_1__.API_MODE === 'mock' ? _mocks_transport__WEBPACK_IMPORTED_MODULE_2__.mockTransport : _http__WEBPACK_IMPORTED_MODULE_3__.taroTransport);

/***/ }),

/***/ "./src/services/diagnosis.api.ts":
/*!***************************************!*\
  !*** ./src/services/diagnosis.api.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   diagnosisApi: function() { return /* binding */ diagnosisApi; }
/* harmony export */ });
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./client */ "./src/services/client.ts");





var diagnosisApi = {
  create: function create(input) {
    return _client__WEBPACK_IMPORTED_MODULE_0__.apiClient.createDiagnosis(input);
  },
  get: function get(diagnosisId) {
    return _client__WEBPACK_IMPORTED_MODULE_0__.apiClient.getDiagnosis(diagnosisId);
  },
  getResult: function getResult(diagnosisId) {
    return _client__WEBPACK_IMPORTED_MODULE_0__.apiClient.getDiagnosisResult(diagnosisId);
  },
  list: function () {
    var _list = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])(/*#__PURE__*/(0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])().m(function _callee() {
      var response;
      return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            _context.n = 1;
            return _client__WEBPACK_IMPORTED_MODULE_0__.apiClient.listDiagnoses();
          case 1:
            response = _context.v;
            return _context.a(2, (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_3__["default"])((0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_3__["default"])({}, response), {}, {
              data: (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_3__["default"])((0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_3__["default"])({}, response.data), {}, {
                // 服务端负责分页，客户端保证当前页仍按最新创建时间展示，兼容 Mock 和旧接口。
                items: (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_4__["default"])(response.data.items).sort(function (left, right) {
                  var rightTime = Date.parse(right.createdAt);
                  var leftTime = Date.parse(left.createdAt);
                  return (Number.isFinite(rightTime) ? rightTime : 0) - (Number.isFinite(leftTime) ? leftTime : 0);
                })
              })
            }));
        }
      }, _callee);
    }));
    function list() {
      return _list.apply(this, arguments);
    }
    return list;
  }(),
  retry: function retry(diagnosisId) {
    return _client__WEBPACK_IMPORTED_MODULE_0__.apiClient.retryDiagnosis(diagnosisId);
  },
  verify: function verify(diagnosisId, outcome, note) {
    return _client__WEBPACK_IMPORTED_MODULE_0__.apiClient.verifyDiagnosis(diagnosisId, outcome, note);
  }
};

/***/ }),

/***/ "./src/services/farm.api.ts":
/*!**********************************!*\
  !*** ./src/services/farm.api.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   farmApi: function() { return /* binding */ farmApi; }
/* harmony export */ });
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./client */ "./src/services/client.ts");

var farmApi = {
  list: function list() {
    return _client__WEBPACK_IMPORTED_MODULE_0__.apiClient.listFarms();
  },
  create: function create(input) {
    return _client__WEBPACK_IMPORTED_MODULE_0__.apiClient.createFarm(input);
  },
  update: function update(farmId, input) {
    return _client__WEBPACK_IMPORTED_MODULE_0__.apiClient.updateFarm(farmId, input);
  },
  listPlots: function listPlots(farmId) {
    return _client__WEBPACK_IMPORTED_MODULE_0__.apiClient.listPlots(farmId);
  },
  createPlot: function createPlot(farmId, input) {
    return _client__WEBPACK_IMPORTED_MODULE_0__.apiClient.createPlot(farmId, input);
  },
  updatePlot: function updatePlot(plotId, input) {
    return _client__WEBPACK_IMPORTED_MODULE_0__.apiClient.updatePlot(plotId, input);
  },
  deletePlot: function deletePlot(plotId) {
    return _client__WEBPACK_IMPORTED_MODULE_0__.apiClient.deletePlot(plotId);
  }
};

/***/ }),

/***/ "./src/services/http.ts":
/*!******************************!*\
  !*** ./src/services/http.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ApiRequestError: function() { return /* binding */ ApiRequestError; },
/* harmony export */   taroTransport: function() { return /* binding */ taroTransport; }
/* harmony export */ });
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/createClass.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/classCallCheck.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_callSuper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/callSuper.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/callSuper.js");
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/inherits.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_wrapNativeSuper_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/wrapNativeSuper.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/wrapNativeSuper.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/taro */ "webpack/container/remote/@tarojs/taro");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _config_env__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/config/env */ "./src/config/env.ts");
/* harmony import */ var _utils_id__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/utils/id */ "./src/utils/id.ts");












var ApiRequestError = /*#__PURE__*/function (_Error) {
  function ApiRequestError(code, message, requestId, details, traceId) {
    var _this;
    (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this, ApiRequestError);
    _this = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_callSuper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(this, ApiRequestError, [message]);
    _this.code = code;
    _this.requestId = requestId;
    _this.details = details;
    _this.traceId = traceId;
    _this.name = 'ApiRequestError';
    return _this;
  }
  (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_4__["default"])(ApiRequestError, _Error);
  return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_5__["default"])(ApiRequestError);
}(/*#__PURE__*/(0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_wrapNativeSuper_js__WEBPACK_IMPORTED_MODULE_6__["default"])(Error));
function buildUrl(path, query) {
  var pairs = Object.entries(query || {}).filter(function (_ref) {
    var _ref2 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_7__["default"])(_ref, 2),
      value = _ref2[1];
    return value !== undefined;
  });
  var search = pairs.map(function (_ref3) {
    var _ref4 = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_7__["default"])(_ref3, 2),
      key = _ref4[0],
      value = _ref4[1];
    return "".concat(encodeURIComponent(key), "=").concat(encodeURIComponent(String(value)));
  }).join('&');
  return "".concat(_config_env__WEBPACK_IMPORTED_MODULE_1__.API_BASE_URL).concat(path).concat(search ? "?".concat(search) : '');
}
function getAccessToken() {
  try {
    return _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().getStorageSync(_config_env__WEBPACK_IMPORTED_MODULE_1__.AUTH_TOKEN_STORAGE_KEY) || '';
  } catch (_unused) {
    return '';
  }
}
var taroTransport = {
  request: function request(_request) {
    return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_8__["default"])(/*#__PURE__*/(0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])().m(function _callee() {
      var requestId, traceId, accessToken, response, envelope, errorEnvelope, _code, _errorEnvelope$detail, _t;
      return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            requestId = (0,_utils_id__WEBPACK_IMPORTED_MODULE_10__.createClientRequestId)('req');
            traceId = (0,_utils_id__WEBPACK_IMPORTED_MODULE_10__.createClientRequestId)('trace');
            accessToken = getAccessToken();
            _context.p = 1;
            _context.n = 2;
            return _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().request({
              url: buildUrl(_request.path, _request.query),
              method: _request.method,
              data: _request.body,
              timeout: 15000,
              header: (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_11__["default"])((0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_11__["default"])({
                'content-type': 'application/json',
                'X-Request-Id': requestId,
                'X-Trace-Id': traceId
              }, accessToken ? {
                Authorization: "Bearer ".concat(accessToken)
              } : {}), _request.idempotencyKey ? {
                'Idempotency-Key': _request.idempotencyKey
              } : {})
            });
          case 2:
            response = _context.v;
            envelope = response.data;
            errorEnvelope = envelope;
            _code = (envelope === null || envelope === void 0 ? void 0 : envelope.code) || (response.statusCode >= 200 && response.statusCode < 300 ? 'INVALID_RESPONSE' : 'HTTP_ERROR');
            if (!(response.statusCode < 200 || response.statusCode >= 300 || (envelope === null || envelope === void 0 ? void 0 : envelope.code) !== 'OK')) {
              _context.n = 3;
              break;
            }
            throw new ApiRequestError(_code, (envelope === null || envelope === void 0 ? void 0 : envelope.message) || '请求失败，请稍后重试', (envelope === null || envelope === void 0 ? void 0 : envelope.requestId) || requestId, (_errorEnvelope$detail = errorEnvelope === null || errorEnvelope === void 0 ? void 0 : errorEnvelope.details) !== null && _errorEnvelope$detail !== void 0 ? _errorEnvelope$detail : envelope === null || envelope === void 0 ? void 0 : envelope.data, (envelope === null || envelope === void 0 ? void 0 : envelope.traceId) || traceId);
          case 3:
            return _context.a(2, envelope);
          case 4:
            _context.p = 4;
            _t = _context.v;
            if (!(_t instanceof ApiRequestError)) {
              _context.n = 5;
              break;
            }
            throw _t;
          case 5:
            throw new ApiRequestError('NETWORK_ERROR', '网络连接失败，请检查网络后重试', requestId, _t, traceId);
          case 6:
            return _context.a(2);
        }
      }, _callee, null, [[1, 4]]);
    }))();
  }
};

/***/ }),

/***/ "./src/services/message.api.ts":
/*!*************************************!*\
  !*** ./src/services/message.api.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isMessageUnread: function() { return /* binding */ isMessageUnread; },
/* harmony export */   messageApi: function() { return /* binding */ messageApi; }
/* harmony export */ });
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./client */ "./src/services/client.ts");

var messageApi = {
  list: function list() {
    return _client__WEBPACK_IMPORTED_MODULE_0__.apiClient.listMessages();
  },
  unreadCount: function unreadCount() {
    return _client__WEBPACK_IMPORTED_MODULE_0__.apiClient.unreadMessageCount();
  },
  markRead: function markRead(messageId) {
    return _client__WEBPACK_IMPORTED_MODULE_0__.apiClient.markMessageRead(messageId);
  }
};
function isMessageUnread(message) {
  return !message.readAt;
}

/***/ }),

/***/ "./src/services/subscription.ts":
/*!**************************************!*\
  !*** ./src/services/subscription.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   requestTaskSubscription: function() { return /* binding */ requestTaskSubscription; }
/* harmony export */ });
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/taro */ "webpack/container/remote/@tarojs/taro");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _config_env__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/config/env */ "./src/config/env.ts");




function requestTaskSubscription() {
  return _requestTaskSubscription.apply(this, arguments);
}
function _requestTaskSubscription() {
  _requestTaskSubscription = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])(/*#__PURE__*/(0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])().m(function _callee() {
    var requestWechatSubscription, result, accepted;
    return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          if (!(_config_env__WEBPACK_IMPORTED_MODULE_1__.SUBSCRIBE_TEMPLATE_IDS.length === 0)) {
            _context.n = 1;
            break;
          }
          return _context.a(2, {
            configured: false,
            accepted: false
          });
        case 1:
          // Taro 4.2.1 将微信 tmplIds 与支付宝 entityIds 错误地同时标记为必填，这里仅收窄微信端签名。
          requestWechatSubscription = (_tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().requestSubscribeMessage);
          _context.n = 2;
          return requestWechatSubscription({
            tmplIds: _config_env__WEBPACK_IMPORTED_MODULE_1__.SUBSCRIBE_TEMPLATE_IDS
          });
        case 2:
          result = _context.v;
          accepted = _config_env__WEBPACK_IMPORTED_MODULE_1__.SUBSCRIBE_TEMPLATE_IDS.some(function (id) {
            return result[id] === 'accept';
          });
          return _context.a(2, {
            configured: true,
            accepted: accepted
          });
      }
    }, _callee);
  }));
  return _requestTaskSubscription.apply(this, arguments);
}

/***/ }),

/***/ "./src/services/task.api.ts":
/*!**********************************!*\
  !*** ./src/services/task.api.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   taskApi: function() { return /* binding */ taskApi; }
/* harmony export */ });
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./client */ "./src/services/client.ts");

var taskApi = {
  list: function list() {
    return _client__WEBPACK_IMPORTED_MODULE_0__.apiClient.listTasks();
  },
  create: function create(input) {
    return _client__WEBPACK_IMPORTED_MODULE_0__.apiClient.createTask(input);
  },
  update: function update(taskId, input) {
    return _client__WEBPACK_IMPORTED_MODULE_0__.apiClient.updateTask(taskId, input);
  },
  complete: function complete(taskId, note) {
    return _client__WEBPACK_IMPORTED_MODULE_0__.apiClient.completeTask(taskId, note);
  }
};

/***/ }),

/***/ "./src/store/auth.store.ts":
/*!*********************************!*\
  !*** ./src/store/auth.store.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useAuthStore: function() { return /* binding */ useAuthStore; }
/* harmony export */ });
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/taro */ "webpack/container/remote/@tarojs/taro");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! zustand */ "webpack/container/remote/zustand");
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(zustand__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nongjianzhen_api_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nongjianzhen/api-client */ "./packages/api-client/src/index.ts");
/* harmony import */ var _config_env__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/config/env */ "./src/config/env.ts");
/* harmony import */ var _services_auth_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/services/auth.api */ "./src/services/auth.api.ts");
/* harmony import */ var _services_client__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/services/client */ "./src/services/client.ts");








var STORAGE_KEY = 'nongjianzhen_auth_identity';
var useAuthStore = (0,zustand__WEBPACK_IMPORTED_MODULE_1__.create)(function (set) {
  return {
    identity: null,
    initialized: false,
    loading: false,
    initialize: function initialize() {
      var storedIdentity = _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().getStorageSync(STORAGE_KEY) || null;
      var token = _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().getStorageSync(_config_env__WEBPACK_IMPORTED_MODULE_3__.AUTH_TOKEN_STORAGE_KEY) || '';
      var identity = _config_env__WEBPACK_IMPORTED_MODULE_3__.API_MODE === 'real' && storedIdentity && !token ? null : storedIdentity;
      if (!identity && storedIdentity) _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().removeStorageSync(STORAGE_KEY);
      set({
        identity: identity,
        initialized: true
      });
    },
    loginWithMock: function () {
      var _loginWithMock = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_6__["default"])(/*#__PURE__*/(0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_7__["default"])().m(function _callee() {
        var result, identity, _t, _t2;
        return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_7__["default"])().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              set({
                loading: true
              });
              _context.p = 1;
              if (!(_config_env__WEBPACK_IMPORTED_MODULE_3__.API_MODE === 'mock')) {
                _context.n = 2;
                break;
              }
              _t = null;
              _context.n = 4;
              break;
            case 2:
              _context.n = 3;
              return _services_client__WEBPACK_IMPORTED_MODULE_5__.apiClient.mockLogin();
            case 3:
              _t = _context.v;
            case 4:
              result = _t;
              if (!result) {
                _context.n = 5;
                break;
              }
              _t2 = (0,_nongjianzhen_api_client__WEBPACK_IMPORTED_MODULE_2__.toAuthIdentity)(result.data);
              _context.n = 7;
              break;
            case 5:
              _context.n = 6;
              return (0,_services_auth_api__WEBPACK_IMPORTED_MODULE_4__.mockLogin)();
            case 6:
              _t2 = _context.v;
            case 7:
              identity = _t2;
              if (result !== null && result !== void 0 && result.data.accessToken) _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().setStorageSync(_config_env__WEBPACK_IMPORTED_MODULE_3__.AUTH_TOKEN_STORAGE_KEY, result.data.accessToken);
              _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().setStorageSync(STORAGE_KEY, identity);
              set({
                identity: identity
              });
            case 8:
              _context.p = 8;
              set({
                loading: false
              });
              return _context.f(8);
            case 9:
              return _context.a(2);
          }
        }, _callee, null, [[1,, 8, 9]]);
      }));
      function loginWithMock() {
        return _loginWithMock.apply(this, arguments);
      }
      return loginWithMock;
    }(),
    loginWithWechat: function () {
      var _loginWithWechat = (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_6__["default"])(/*#__PURE__*/(0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_7__["default"])().m(function _callee2() {
        var codeResult, result, identity;
        return (0,C_Users_29838_Desktop_Qooo_node_modules_pnpm_babel_runtime_7_29_7_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_7__["default"])().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              set({
                loading: true
              });
              _context2.p = 1;
              _context2.n = 2;
              return _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().login();
            case 2:
              codeResult = _context2.v;
              if (codeResult.code) {
                _context2.n = 3;
                break;
              }
              throw new Error('未获得微信登录 code');
            case 3:
              _context2.n = 4;
              return _services_client__WEBPACK_IMPORTED_MODULE_5__.apiClient.wechatLogin(codeResult.code);
            case 4:
              result = _context2.v;
              _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().setStorageSync(_config_env__WEBPACK_IMPORTED_MODULE_3__.AUTH_TOKEN_STORAGE_KEY, result.data.accessToken);
              identity = (0,_nongjianzhen_api_client__WEBPACK_IMPORTED_MODULE_2__.toAuthIdentity)(result.data);
              _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().setStorageSync(STORAGE_KEY, identity);
              set({
                identity: identity
              });
            case 5:
              _context2.p = 5;
              set({
                loading: false
              });
              return _context2.f(5);
            case 6:
              return _context2.a(2);
          }
        }, _callee2, null, [[1,, 5, 6]]);
      }));
      function loginWithWechat() {
        return _loginWithWechat.apply(this, arguments);
      }
      return loginWithWechat;
    }(),
    logout: function logout() {
      void _services_client__WEBPACK_IMPORTED_MODULE_5__.apiClient.logout().catch(function () {
        return undefined;
      });
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().removeStorageSync(STORAGE_KEY);
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().removeStorageSync(_config_env__WEBPACK_IMPORTED_MODULE_3__.AUTH_TOKEN_STORAGE_KEY);
      set({
        identity: null
      });
    }
  };
});

/***/ }),

/***/ "./src/utils/analytics.ts":
/*!********************************!*\
  !*** ./src/utils/analytics.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   track: function() { return /* binding */ track; }
/* harmony export */ });
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/taro */ "webpack/container/remote/@tarojs/taro");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_0__);

function track(eventName) {
  var _Taro$reportEvent;
  var properties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var payload = {
    eventName: eventName,
    properties: properties,
    occurredAt: new Date().toISOString()
  };
  if (true) {
    console.info('[analytics]', payload);
  }
  (_Taro$reportEvent = (_tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().reportEvent)) === null || _Taro$reportEvent === void 0 || _Taro$reportEvent.call((_tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default()), eventName, properties);
}

/***/ }),

/***/ "./src/utils/format.ts":
/*!*****************************!*\
  !*** ./src/utils/format.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatConfidence: function() { return /* binding */ formatConfidence; },
/* harmony export */   formatDateTime: function() { return /* binding */ formatDateTime; }
/* harmony export */ });
function formatDateTime(value) {
  if (!value) return '未设置';
  var date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  var pad = function pad(part) {
    return String(part).padStart(2, '0');
  };
  return "".concat(date.getMonth() + 1, "\u6708").concat(date.getDate(), "\u65E5 ").concat(pad(date.getHours()), ":").concat(pad(date.getMinutes()));
}
function formatConfidence(value) {
  return "".concat(Math.round(value * 100), "%");
}

/***/ }),

/***/ "./src/utils/id.ts":
/*!*************************!*\
  !*** ./src/utils/id.ts ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createClientRequestId: function() { return /* binding */ createClientRequestId; }
/* harmony export */ });
function createClientRequestId(prefix) {
  return "".concat(prefix, "_").concat(Date.now(), "_").concat(Math.random().toString(36).slice(2, 8));
}

/***/ }),

/***/ "./data/agriculture/issues.v1.json":
/*!*****************************************!*\
  !*** ./data/agriculture/issues.v1.json ***!
  \*****************************************/
/***/ (function(module) {

module.exports = /*#__PURE__*/JSON.parse('{"version":"1.0.0-mvp","safeIntervalPolicies":{"label_required":"本条不提供统一天数。若使用农药，必须以当前有效登记和产品标签标明的安全间隔期为准。","not_applicable":"当前建议不涉及农药，安全间隔期不适用。"},"issues":[{"id":"tomato-late-blight","crop":"番茄","problem":"晚疫病","aliases":["番茄晚疫"],"category":"disease","riskLevel":"high","symptoms":["叶片出现水渍状暗绿至褐色斑，潮湿时扩展很快","叶背病斑边缘在高湿时可见白色霉层","茎秆可出现深褐色条斑，果实形成较硬的褐色病斑"],"possibleCauses":["低温高湿、连续阴雨和叶面长时间带水有利于发病","带病植株或附近茄科作物可成为传染来源"],"lookalikes":["早疫病","细菌性斑点病","冻害或药害"],"captureParts":["病叶正面和背面各拍一张","拍茎部病斑","有果实症状时拍果面近照","拍一张整行植株分布"],"actionWindow":"发现后当天处理，潮湿天气下优先隔离并尽快复核。","recommendedActions":{"immediate":["标记并隔离重病株区域","清除严重病叶并装袋带离，不在田边堆放","减少叶面喷水，尽快降低棚内湿度"],"followUp":["24 至 48 小时后检查是否出现新病斑","检查邻近马铃薯或番茄地块是否同样发病"],"chemicalBoundary":"需要用药时只可选择对番茄晚疫病有有效登记的产品，并严格按标签使用。"},"doNot":["不要把病叶留在行间","不要在叶片潮湿时整枝打杈","不要凭图片自行混配或加量"],"safeInterval":{"policy":"label_required","displayText":"如使用农药，以该产品有效标签标明的安全间隔期为准。"},"expertReview":{"recommended":true,"triggers":["两天内快速扩展","茎和果实同时发病","面积超过一个种植畦","与早疫病难区分"]},"plainLanguage":{"shortName":"疑似晚疫病","summary":"这种病在阴冷潮湿时扩散很快，叶、茎和果都可能受害。","nextStep":"先拍叶背和茎部，隔离重病株，并尽快请农技员复核。"},"aiReview":{"requiredEvidence":["水渍状快速扩展病斑","叶背边缘白霉或茎部深褐病斑"],"rejectIf":["只有单个圆形同心轮纹","照片只含果实且无叶茎信息"],"confidenceCap":0.86},"sourceRefs":["cabi-plantwise","uc-ipm","china-pesticide-registration"]},{"id":"tomato-early-blight","crop":"番茄","problem":"早疫病","aliases":["轮纹病"],"category":"disease","riskLevel":"medium","symptoms":["多从下部老叶开始出现褐色圆斑","病斑常有一圈一圈的同心轮纹","病斑周围发黄，严重时下部叶片早落"],"possibleCauses":["田间病残体和带病种苗可提供病源","植株衰弱、叶面长时间潮湿时更易发生"],"lookalikes":["晚疫病","斑枯病","缺镁"],"captureParts":["拍下部老叶全叶","拍病斑近照以看清轮纹","拍整株上下叶片分布"],"actionWindow":"发现后 1 至 2 天内处理并持续观察。","recommendedActions":{"immediate":["摘除重病老叶并带离种植区","改善通风，浇水时避免打湿叶片","保持植株营养平衡，避免早衰"],"followUp":["3 天后检查上部新叶是否出现病斑","采收后清理病残体并安排轮作"],"chemicalBoundary":"需要用药时查询番茄早疫病有效登记，按标签选择和使用。"},"doNot":["不要把所有黄叶都判成早疫病","不要在带露水时摘叶","不要连续使用同一作用机制产品"],"safeInterval":{"policy":"label_required","displayText":"如使用农药，以产品标签规定为准。"},"expertReview":{"recommended":false,"triggers":["幼株快速萎蔫","病斑没有轮纹且呈水渍状","处理一周仍持续上移"]},"plainLanguage":{"shortName":"疑似早疫病","summary":"下部老叶上的褐斑如果像树木年轮一样一圈一圈，较符合早疫病。","nextStep":"先摘除重病老叶，减少叶面潮湿，3 天后复查。"},"aiReview":{"requiredEvidence":["老叶先发病","病斑具有同心轮纹"],"rejectIf":["嫩叶先出现花叶或卷曲","病斑边缘有明显白霉且扩展极快"],"confidenceCap":0.9},"sourceRefs":["cabi-plantwise","uc-ipm","china-pesticide-registration"]},{"id":"tomato-bacterial-spot","crop":"番茄","problem":"细菌性斑点病","aliases":["细菌性斑疹病"],"category":"disease","riskLevel":"high","symptoms":["叶片出现较小的深褐至黑色斑点，周围可带黄色晕圈","果实可出现小而略隆起的暗色斑点","雨后或喷灌后症状常加重"],"possibleCauses":["带菌种子、种苗或病残体","风雨、喷灌和带水作业传播细菌"],"lookalikes":["斑枯病","早疫病","细菌性溃疡病"],"captureParts":["拍叶片正反面","拍果实斑点近照","拍整株分布","记录近期降雨或喷灌情况"],"actionWindow":"发现后当天减少传播操作，24 小时内复核。","recommendedActions":{"immediate":["停止在叶片带水时整枝和采摘","将疑似病株工具与健康区工具分开","移除严重病叶并做好清洁"],"followUp":["检查同批种苗和相邻植株","对剪刀、手套和周转箱进行清洁消毒"],"chemicalBoundary":"细菌性病害用药选择受登记和抗性影响，必须查询有效标签并由农技人员确认。"},"doNot":["不要在田间来回触摸湿叶","不要把真菌病常规方案直接套用","不要保存明显带病植株的种子"],"safeInterval":{"policy":"label_required","displayText":"如使用登记农药，安全间隔期按标签执行。"},"expertReview":{"recommended":true,"triggers":["幼苗批量发病","果实出现斑点","与溃疡病难区分","雨后迅速扩展"]},"plainLanguage":{"shortName":"疑似细菌斑点","summary":"这种小黑点常会借雨水、喷灌和人的操作传播。","nextStep":"先停掉湿叶作业，拍果实和叶片两面，请农技员确认。"},"aiReview":{"requiredEvidence":["小型深色斑点","果实或雨后传播证据"],"rejectIf":["只有规则同心轮纹","只有叶脉间均匀黄化"],"confidenceCap":0.78},"sourceRefs":["cabi-plantwise","uc-ipm","china-pesticide-registration"]},{"id":"tomato-leaf-mold","crop":"番茄","problem":"叶霉病","aliases":["番茄叶霉"],"category":"disease","riskLevel":"medium","symptoms":["叶片正面出现淡黄或黄绿色斑块","对应叶背出现橄榄绿至灰褐色绒状霉层","常从下部叶片开始，棚内高湿时明显"],"possibleCauses":["保护地高湿、通风不足","种植过密或叶面结露时间长"],"lookalikes":["霜霉病","缺镁","药害"],"captureParts":["同一病斑拍叶面和叶背","拍棚内整株分布","记录清晨是否结露"],"actionWindow":"发现后 1 至 2 天内降湿处理。","recommendedActions":{"immediate":["加强通风并减少夜间结露","摘除严重病叶并带离","适当疏叶但不要一次去叶过多"],"followUp":["连续 3 天观察新叶","调整浇水时间，避免傍晚大量浇水"],"chemicalBoundary":"需要用药时只选番茄叶霉病有效登记产品并遵守标签。"},"doNot":["不要只拍叶面就下结论","不要在棚内堆放病叶","不要通过高氮追肥处理黄斑"],"safeInterval":{"policy":"label_required","displayText":"如用药，以标签规定的安全间隔期为准。"},"expertReview":{"recommended":false,"triggers":["叶背没有霉层","露地大面积快速发生","降湿后仍迅速扩展"]},"plainLanguage":{"shortName":"疑似叶霉病","summary":"叶面发黄、同一位置的叶背长出灰褐色绒毛，是重要线索。","nextStep":"补拍叶背，先通风降湿，再观察新叶。"},"aiReview":{"requiredEvidence":["叶面黄斑与叶背霉层对应","保护地高湿背景"],"rejectIf":["白色粉层主要在叶面","病斑呈明显水渍状"],"confidenceCap":0.9},"sourceRefs":["cabi-plantwise","uc-ipm","china-pesticide-registration"]},{"id":"tomato-two-spotted-spider-mite","crop":"番茄","problem":"二斑叶螨","aliases":["红蜘蛛","叶螨"],"category":"pest","riskLevel":"medium","symptoms":["叶面出现密集细小黄白点，随后发黄发褐","叶背可见极小螨体、卵或细丝状蛛网","高温干燥时常先在局部植株加重"],"possibleCauses":["高温干燥有利于叶螨繁殖","杂草、旧株或带虫苗成为来源"],"lookalikes":["蓟马危害","缺镁","病毒病"],"captureParts":["拍叶背微距照片","拍受害叶正面斑点","拍发生中心和相邻植株"],"actionWindow":"发现活虫后 1 至 2 天内控制发生中心。","recommendedActions":{"immediate":["标记虫量高的植株并清除重害叶","清理寄主杂草和旧株","先统计叶背活虫再决定是否需要防治"],"followUp":["3 天后复查叶背活虫和新叶","有条件时优先采用登记的生物防治方案"],"chemicalBoundary":"如需使用杀螨剂，必须核对番茄登记、抗性管理和标签安全间隔期。"},"doNot":["不要只看蛛网就判定","不要连续重复同一类杀螨剂","不要忽略叶背检查"],"safeInterval":{"policy":"label_required","displayText":"使用任何杀螨剂前核对标签安全间隔期。"},"expertReview":{"recommended":false,"triggers":["看不到活虫但叶片继续失绿","连续处理仍有大量活虫","准备采用生物防治但不清楚兼容性"]},"plainLanguage":{"shortName":"疑似红蜘蛛","summary":"叶背的小虫吸汁后，叶面会出现很多针尖大小的黄白点。","nextStep":"用手机微距拍叶背，先确认有没有活虫和细网。"},"aiReview":{"requiredEvidence":["叶背可见螨体、卵或蛛网","叶面密集针尖状失绿点"],"rejectIf":["未见虫体且只存在叶脉间黄化","叶片为银白条斑并有黑色粪点"],"confidenceCap":0.88},"sourceRefs":["cabi-plantwise","uc-ipm","china-pesticide-registration"]},{"id":"tomato-whitefly","crop":"番茄","problem":"粉虱","aliases":["白粉虱","烟粉虱"],"category":"pest","riskLevel":"high","symptoms":["轻拍植株时有小白虫飞起","叶背可见成虫、若虫或卵","叶片发黄并可能有黏液和煤污","部分粉虱可传播病毒病"],"possibleCauses":["带虫种苗进入棚室","棚内连续种植和杂草寄主维持虫源"],"lookalikes":["蚜虫","蓟马","番茄黄化曲叶病毒病"],"captureParts":["拍叶背成虫和若虫","录制轻拍植株后飞虫视频","拍顶部嫩叶是否卷曲黄化"],"actionWindow":"发现成虫和若虫后当天标记，2 天内完成防控判断。","recommendedActions":{"immediate":["隔离带虫苗和重害株","清除棚内外寄主杂草","使用防虫网并检查出入口","悬挂监测黄板但不要把黄板当作唯一防治"],"followUp":["每周固定抽查嫩叶背面","发现卷叶和矮化时同步排查病毒病"],"chemicalBoundary":"化学防治必须核对番茄粉虱登记、抗性和对天敌的影响。"},"doNot":["不要从带虫棚调苗到健康棚","不要只打成虫而忽略若虫","不要在有授粉昆虫时随意施药"],"safeInterval":{"policy":"label_required","displayText":"如用药，按有效标签执行安全间隔期。"},"expertReview":{"recommended":true,"triggers":["嫩叶明显卷曲黄化","苗期大量发生","疑似病毒病","棚内有授粉蜂或天敌"]},"plainLanguage":{"shortName":"疑似粉虱","summary":"轻拍叶片会飞起小白虫，叶背还能看到贴着不动的幼虫。","nextStep":"先拍叶背和顶部嫩叶；如果同时卷叶黄化，请农技员排查病毒病。"},"aiReview":{"requiredEvidence":["白色成虫飞起或叶背若虫","叶背近照"],"rejectIf":["只有顶部卷叶但未见虫","虫体明显为绿色或黑色蚜虫"],"confidenceCap":0.9},"sourceRefs":["cabi-plantwise","uc-ipm","china-pesticide-registration"]},{"id":"tomato-blossom-end-rot","crop":"番茄","problem":"脐腐病","aliases":["果实脐部腐烂"],"category":"physiological","riskLevel":"medium","symptoms":["果实花端先出现水渍状斑，随后变成褐色或黑色凹陷斑","常在果实膨大期出现","同一批果实可能部分正常、部分发病"],"possibleCauses":["果实快速膨大时钙供应不足","土壤忽干忽湿、根系受损、盐分过高或氮肥过量影响钙吸收"],"lookalikes":["晚疫病果实病斑","日灼","炭疽类果腐"],"captureParts":["拍果实花端近照","拍同一植株正常果和病果","拍根区湿度和滴灌位置"],"actionWindow":"发现后当天检查灌水和根区，下一批果实前完成调整。","recommendedActions":{"immediate":["保持根区水分相对稳定，避免大干后猛灌","检查根系、盐分和施肥浓度","摘除失去商品价值的严重病果"],"followUp":["观察新膨大果是否继续出现","依据土壤或叶片检测结果再调整钙和氮，不盲目加肥"],"chemicalBoundary":"这是生理性问题，杀菌剂通常不能解决根因。"},"doNot":["不要把脐腐当传染病反复喷药","不要一次大量补钙或加大肥液浓度","不要让土壤忽干忽湿"],"safeInterval":{"policy":"not_applicable","displayText":"当前建议不涉及农药，安全间隔期不适用。"},"expertReview":{"recommended":false,"triggers":["病斑不在花端","果面有霉层或快速软腐","新果持续大量发生"]},"plainLanguage":{"shortName":"疑似脐腐","summary":"果实底部发黑凹陷，多半与水分不稳、根系或钙吸收有关，不是一般的传染病。","nextStep":"先检查浇水和根区，不要急着喷杀菌剂或大量补钙。"},"aiReview":{"requiredEvidence":["病斑位于果实花端","黑褐凹陷且无典型扩散霉层"],"rejectIf":["病斑位于果肩受光面","叶茎同时出现快速扩展病斑"],"confidenceCap":0.93},"sourceRefs":["cabi-plantwise","uc-ipm"]},{"id":"tomato-magnesium-deficiency","crop":"番茄","problem":"缺镁","aliases":["镁素不足"],"category":"nutrient","riskLevel":"low","symptoms":["下部老叶先出现叶脉间黄化，叶脉仍较绿","严重时黄化区域出现褐色坏死斑","新叶通常比老叶轻"],"possibleCauses":["土壤或基质镁供应不足","钾、钙或铵态氮过多造成拮抗","根系受损或 pH 不合适影响吸收"],"lookalikes":["早疫病","叶霉病","根系受损"],"captureParts":["拍老叶和新叶对比","拍全叶确认叶脉是否保持绿色","拍根系和肥水记录"],"actionWindow":"1 周内完成根区和施肥记录检查。","recommendedActions":{"immediate":["检查近期钾、钙和氮肥用量","检查根区积水、盐分和 pH","保留有代表性的叶片用于检测"],"followUp":["有条件时进行土壤、基质或叶片检测","根据检测结果少量分次调整镁，不追求老叶返绿"],"chemicalBoundary":"营养调整不适用农药；肥料种类和用量应结合检测与栽培方式确定。"},"doNot":["不要只凭一张黄叶照片大量补镁","不要忽略根系和盐分问题","不要把已坏死老叶是否返绿作为唯一效果标准"],"safeInterval":{"policy":"not_applicable","displayText":"营养调整不涉及农药安全间隔期。"},"expertReview":{"recommended":false,"triggers":["顶部新叶先黄化","根系褐变或植株萎蔫","调整肥水两周后新叶仍加重"]},"plainLanguage":{"shortName":"可能缺镁","summary":"老叶的叶脉还绿、叶脉中间先变黄，可能与镁吸收不足有关。","nextStep":"先查根、查肥水记录；最好检测后再少量调整。"},"aiReview":{"requiredEvidence":["老叶先发病","叶脉间黄化且叶脉保绿"],"rejectIf":["病斑具有轮纹或霉层","新叶先出现均匀黄化"],"confidenceCap":0.75},"sourceRefs":["cabi-plantwise","uc-ipm"]},{"id":"cucumber-downy-mildew","crop":"黄瓜","problem":"霜霉病","aliases":["黄瓜霜霉"],"category":"disease","riskLevel":"high","symptoms":["叶面出现受叶脉限制的黄绿色多角形病斑","潮湿时病斑对应叶背可见灰紫色霉层","病斑增多后叶片迅速枯黄"],"possibleCauses":["高湿、叶面结露和适宜温度促进发病","通风差、种植密和连续阴雨增加风险"],"lookalikes":["角斑病","缺镁","药害"],"captureParts":["同一病斑拍叶面和叶背","逆光拍摄病斑是否被叶脉限制","拍整棚或整行分布"],"actionWindow":"发现后当天降湿并隔离重病区。","recommendedActions":{"immediate":["加强通风并缩短叶面带水时间","移除严重病叶并带离","避免傍晚大水灌溉和叶面喷水"],"followUp":["每天清晨检查叶背是否出现新霉层","检查相邻瓜类作物"],"chemicalBoundary":"需要用药时选择黄瓜霜霉病有效登记产品并按标签轮换使用。"},"doNot":["不要只根据黄斑颜色确诊","不要在湿叶间频繁作业","不要连续使用同一作用机制产品"],"safeInterval":{"policy":"label_required","displayText":"如使用农药，安全间隔期按产品标签执行。"},"expertReview":{"recommended":true,"triggers":["两天内快速扩展","叶背无霉层且有水渍状小斑","采收期需要用药"]},"plainLanguage":{"shortName":"疑似霜霉病","summary":"叶面黄斑被叶脉隔成多角形，潮湿时叶背像长了一层灰紫色霉。","nextStep":"先拍叶背，马上通风降湿，重病叶装袋带走。"},"aiReview":{"requiredEvidence":["多角形叶斑","叶背灰紫霉层或高湿条件"],"rejectIf":["叶片有白色粉层","病斑穿孔且叶背有菌脓描述"],"confidenceCap":0.88},"sourceRefs":["cabi-plantwise","uc-ipm","china-pesticide-registration"]},{"id":"cucumber-powdery-mildew","crop":"黄瓜","problem":"白粉病","aliases":["黄瓜白粉"],"category":"disease","riskLevel":"medium","symptoms":["叶片表面出现白色粉状小斑，逐渐连成片","粉层多在叶面，也可出现在叶背和叶柄","严重时叶片黄化、变脆和早枯"],"possibleCauses":["适宜温度、通风差和植株郁闭有利于发生","连续种植和附近瓜类病株提供病源"],"lookalikes":["叶面灰尘或药液残留","霜霉病","白粉虱分泌物相关污斑"],"captureParts":["拍白粉斑近照","轻擦前后各拍一张","拍整株新老叶分布"],"actionWindow":"出现少量粉斑时 2 天内处理。","recommendedActions":{"immediate":["清除严重病叶但保留足够功能叶","改善通风和透光","清理种植区附近的感病瓜类残株"],"followUp":["3 至 5 天后检查新叶粉斑","记录处理后病斑是否继续扩大"],"chemicalBoundary":"确需用药时查询黄瓜白粉病有效登记，并注意作用机制轮换。"},"doNot":["不要把可擦掉的灰尘直接判病","不要一次摘除过多叶片","不要连续使用同一类药"],"safeInterval":{"policy":"label_required","displayText":"用药后的采收等待时间必须按标签执行。"},"expertReview":{"recommended":false,"triggers":["粉层主要在叶背且叶面是多角黄斑","幼苗大面积发病","处理后仍迅速扩展"]},"plainLanguage":{"shortName":"疑似白粉病","summary":"叶面像撒了白面，白粉斑会慢慢连成片。","nextStep":"先拍近照并轻擦确认不是灰尘，再改善通风。"},"aiReview":{"requiredEvidence":["叶面白色粉状菌层","多叶片相似分布"],"rejectIf":["白色物只在药液干痕处","叶背灰紫霉层并有多角黄斑"],"confidenceCap":0.92},"sourceRefs":["cabi-plantwise","uc-ipm","china-pesticide-registration"]},{"id":"cucumber-angular-leaf-spot","crop":"黄瓜","problem":"细菌性角斑病","aliases":["角斑病"],"category":"disease","riskLevel":"high","symptoms":["叶片出现受叶脉限制的水渍状多角斑","潮湿时叶背可见乳白色菌液，干后留下白色痕迹","病斑后期可变薄、破裂或穿孔"],"possibleCauses":["带菌种子、病残体和带病种苗","雨水、喷灌和接触湿叶传播"],"lookalikes":["霜霉病","药害","机械损伤"],"captureParts":["逆光拍病斑","拍叶背是否有菌液或白色干痕","拍穿孔边缘","记录喷灌和降雨"],"actionWindow":"发现后当天停止湿叶作业，24 小时内复核。","recommendedActions":{"immediate":["停止喷灌和带水整枝采收","移除重病叶并清洁工具","加强通风，减少叶面结露"],"followUp":["检查同批种苗和相邻植株","采后清理病残体并安排轮作"],"chemicalBoundary":"细菌性病害用药需依据黄瓜角斑病有效登记，不能套用霜霉病方案。"},"doNot":["不要在叶片带水时操作","不要把多角斑都当霜霉病","不要留种于明显带病植株"],"safeInterval":{"policy":"label_required","displayText":"如用药，按有效产品标签执行安全间隔期。"},"expertReview":{"recommended":true,"triggers":["与霜霉病无法区分","幼苗批量发病","果实出现水渍状斑"]},"plainLanguage":{"shortName":"疑似角斑病","summary":"叶斑被叶脉挡成多角形，湿时叶背可能有黏液，干后会留白痕。","nextStep":"逆光拍叶片和叶背，先停止喷灌和湿叶作业。"},"aiReview":{"requiredEvidence":["水渍状多角斑","菌液、白色干痕或穿孔"],"rejectIf":["叶背有灰紫色霉层但无菌液","叶面白粉状覆盖"],"confidenceCap":0.78},"sourceRefs":["cabi-plantwise","uc-ipm","china-pesticide-registration"]},{"id":"cucumber-fusarium-wilt","crop":"黄瓜","problem":"枯萎病","aliases":["黄瓜枯萎"],"category":"disease","riskLevel":"high","symptoms":["植株中午萎蔫、早晚可能短时恢复，随后持续萎蔫","茎基部可纵裂或出现褐色变化","剖开靠近茎基部的维管束可见褐变"],"possibleCauses":["土传病原积累和连作","带病种苗、受伤根系和不良土壤环境增加风险"],"lookalikes":["青枯类病害","根腐病","缺水或肥害"],"captureParts":["拍整株萎蔫状态","拍茎基部","拍根系","由专业人员剖茎后拍维管束"],"actionWindow":"发现单株后当天标记和隔离，尽快确认。","recommendedActions":{"immediate":["标记疑似病株并避免土壤和流水向健康区传播","连根移除严重病株并妥善处理","检查滴灌堵塞、积水和肥液浓度"],"followUp":["记录发生位置，观察是否沿水流或行向扩展","后续采用轮作、抗病品种或合格嫁接苗等综合措施"],"chemicalBoundary":"土传枯萎问题不能依赖临时灌药解决；任何药剂必须有相应登记并由农技人员确认。"},"doNot":["不要把所有萎蔫都判为枯萎病","不要让病区排水流入健康区","不要反复高浓度灌药伤根"],"safeInterval":{"policy":"label_required","displayText":"如使用登记药剂，安全间隔期及使用方法按标签执行。"},"expertReview":{"recommended":true,"triggers":["多株快速萎蔫","根系腐烂或有异味","维管束褐变不明显","无法排除灌溉或肥害"]},"plainLanguage":{"shortName":"疑似枯萎病","summary":"植株先在中午蔫，后来整株不再恢复，根和茎基部需要一起检查。","nextStep":"先查滴灌和肥水，再拍根、茎基部和整株，请农技员复核。"},"aiReview":{"requiredEvidence":["整株萎蔫进程","茎基部或维管束异常"],"rejectIf":["整行同时在缺水后萎蔫","只有叶片病斑而无萎蔫"],"confidenceCap":0.72},"sourceRefs":["cabi-plantwise","uc-ipm","china-pesticide-registration"]},{"id":"cucumber-aphid","crop":"黄瓜","problem":"蚜虫","aliases":["瓜蚜"],"category":"pest","riskLevel":"high","symptoms":["嫩叶背面和生长点聚集绿色、黄色或黑色小虫","嫩叶卷缩、生长受阻","叶面可有黏液和煤污，蚜虫还可传播病毒"],"possibleCauses":["带虫苗和棚内外杂草寄主","温暖条件下繁殖快，天敌不足时易暴发"],"lookalikes":["粉虱","蓟马","病毒病"],"captureParts":["拍嫩叶背面微距","拍生长点卷缩","拍有翅蚜或整株分布"],"actionWindow":"发现虫群后当天标记，苗期或伴随卷叶时尽快处理。","recommendedActions":{"immediate":["隔离带虫苗并清除重害嫩梢","清理寄主杂草","保护瓢虫、草蛉等天敌并使用防虫网"],"followUp":["3 天后抽查新梢虫量","出现花叶、皱缩和矮化时排查病毒病"],"chemicalBoundary":"如需用药，核对黄瓜蚜虫有效登记，并考虑授粉昆虫和天敌安全。"},"doNot":["不要把所有卷叶都当蚜虫","不要在授粉昆虫活动时随意施药","不要从有虫区带苗到健康区"],"safeInterval":{"policy":"label_required","displayText":"采收期用药必须遵守标签安全间隔期。"},"expertReview":{"recommended":true,"triggers":["伴随花叶或矮化","苗期大量发生","有授粉蜂或天敌释放计划"]},"plainLanguage":{"shortName":"疑似蚜虫","summary":"嫩叶背面成群的小虫会吸汁，也可能把病毒带到健康植株。","nextStep":"拍清虫体和嫩叶；如果同时花叶或矮化，请农技员看看。"},"aiReview":{"requiredEvidence":["嫩叶背面可见成群蚜虫","卷叶或蜜露"],"rejectIf":["虫体为白色并受惊飞起","看不到虫体且只有花叶"],"confidenceCap":0.92},"sourceRefs":["cabi-plantwise","uc-ipm","china-pesticide-registration"]},{"id":"cucumber-thrips","crop":"黄瓜","problem":"蓟马","aliases":["瓜蓟马"],"category":"pest","riskLevel":"medium","symptoms":["嫩叶、花和幼果出现银白色条斑或粗糙疤痕","受害部位常见细小黑色粪点","嫩叶畸形，幼果弯曲或表面木栓化"],"possibleCauses":["带虫苗、花期虫源和棚内杂草","温暖干燥、天敌不足时虫量上升"],"lookalikes":["叶螨","药害","机械摩擦伤"],"captureParts":["拍花内和嫩叶背面微距","拍银白斑与黑色粪点","拍幼果表面疤痕"],"actionWindow":"花期和幼果期发现后 1 至 2 天内确认虫量。","recommendedActions":{"immediate":["检查花内和嫩叶是否有活虫","清理寄主杂草和重害组织","使用蓝板监测但不能代替田间检查"],"followUp":["连续一周定点检查花和嫩叶","保护或合理使用天敌"],"chemicalBoundary":"如需用药，核对黄瓜蓟马登记、授粉昆虫安全和标签要求。"},"doNot":["不要只凭银斑确诊","不要忽略花内虫体","不要在有授粉蜂时随意喷药"],"safeInterval":{"policy":"label_required","displayText":"如用药，严格按产品标签安全间隔期采收。"},"expertReview":{"recommended":false,"triggers":["未见活虫但幼果持续畸形","疑似病毒症状","棚内有授粉蜂"]},"plainLanguage":{"shortName":"疑似蓟马","summary":"蓟马很小，常躲在花和嫩叶里，受害处会发银白并带小黑点。","nextStep":"重点拍花内、嫩叶背面和幼果疤痕。"},"aiReview":{"requiredEvidence":["银白擦伤状斑","黑色粪点或活虫"],"rejectIf":["叶背有蛛网和大量针尖黄点","斑块只出现在果实向阳面"],"confidenceCap":0.82},"sourceRefs":["cabi-plantwise","uc-ipm","china-pesticide-registration"]},{"id":"cucumber-bitter-fruit","crop":"黄瓜","problem":"果实发苦","aliases":["苦味瓜"],"category":"physiological","riskLevel":"low","symptoms":["外观可能基本正常，但果实入口有明显苦味","同一植株或同一批次苦味程度不一","常在水分、温度或营养波动后出现"],"possibleCauses":["品种遗传倾向","干旱、温度剧烈变化、根系受损或肥水不均等胁迫"],"lookalikes":["农药残留异味","果实老化","品种本身风味"],"captureParts":["拍整株长势和果形","拍根区与灌水设施","记录连续 7 天温度、灌水和施肥"],"actionWindow":"发现后当天暂停该批次销售并排查管理记录。","recommendedActions":{"immediate":["将有苦味批次单独标记，不与正常果混装","检查近期缺水、高温低温和肥液波动","保持后续水肥稳定"],"followUp":["分别品尝不同植株的新果并记录","持续发生时评估品种和根区条件"],"chemicalBoundary":"该问题没有对应农药处理方案。"},"doNot":["不要用喷药解决苦味","不要把苦味果混入正常商品","不要仅凭图片声称能够确认苦味"],"safeInterval":{"policy":"not_applicable","displayText":"当前建议不涉及农药。"},"expertReview":{"recommended":false,"triggers":["怀疑农药误用或污染","整批持续发苦","同时出现根系异常"]},"plainLanguage":{"shortName":"黄瓜发苦","summary":"发苦通常与品种和生长受压有关，单靠照片看不出来。","nextStep":"先把该批次分开，检查最近的温度、浇水和施肥变化。"},"aiReview":{"requiredEvidence":["用户明确描述品尝到苦味","管理胁迫记录"],"rejectIf":["只提供图片未描述味道","用户描述口腔麻木或人员不适"],"confidenceCap":0.6},"sourceRefs":["cabi-plantwise","uc-ipm"]},{"id":"cucumber-nitrogen-deficiency","crop":"黄瓜","problem":"缺氮","aliases":["氮素不足"],"category":"nutrient","riskLevel":"low","symptoms":["植株整体颜色偏浅，下部老叶先均匀发黄","长势弱、叶片偏小、节间可能变短","通常没有清晰病斑、霉层或虫体"],"possibleCauses":["氮供应不足","根系受损、低温、积水或 pH 问题导致吸收差","结果负载过大而供肥不足"],"lookalikes":["根腐或涝害","缺硫","病毒病"],"captureParts":["拍整株和相邻正常株对比","拍老叶与新叶","拍根系","提供施肥和灌水记录"],"actionWindow":"1 周内完成根系和肥水排查。","recommendedActions":{"immediate":["先检查根区积水、温度、盐分和根系颜色","核对近期施肥浓度和用量","有条件时做基质、土壤或叶片检测"],"followUp":["确认缺氮后少量分次调整并观察新叶","同时保持钾、钙等营养平衡"],"chemicalBoundary":"肥料用量必须结合种植方式、检测结果和产品说明确定。"},"doNot":["不要看到黄叶就一次大量追氮","不要在根系腐烂或积水时继续加肥","不要忽略病毒病导致的矮化和花叶"],"safeInterval":{"policy":"not_applicable","displayText":"营养调整不涉及农药安全间隔期。"},"expertReview":{"recommended":false,"triggers":["根系褐变","顶部嫩叶先黄化","叶片有花叶或畸形","调整后新叶仍不恢复"]},"plainLanguage":{"shortName":"可能缺氮","summary":"整株颜色变浅、老叶先均匀发黄，可能是氮不够，也可能是根吸收不好。","nextStep":"先检查根和肥水记录，再决定是否补肥。"},"aiReview":{"requiredEvidence":["老叶先均匀黄化","整株长势弱且无明确病斑"],"rejectIf":["叶片有霉层、虫体或明显花叶","新叶先出现叶脉间黄化"],"confidenceCap":0.7},"sourceRefs":["cabi-plantwise","uc-ipm"]},{"id":"rice-blast","crop":"水稻","problem":"稻瘟病","aliases":["叶瘟","穗颈瘟"],"category":"disease","riskLevel":"high","symptoms":["叶片典型病斑呈梭形，两端较尖，中央灰白、边缘褐色","湿度高时病斑背面可见灰色霉层","穗颈受害后变褐，穗部可出现白穗或秕谷"],"possibleCauses":["感病品种、偏施氮肥和田间湿度高增加风险","带病种子、病稻草和周边病田可提供病源"],"lookalikes":["胡麻叶斑病","细菌性条斑病","药害","穗颈机械折伤"],"captureParts":["拍叶片病斑正反面","拍一张整穴和田块分布","抽穗后拍穗颈和白穗连接处","记录品种和施氮情况"],"actionWindow":"叶瘟发现后当天调查范围；破口抽穗期出现高风险时立即请农技人员判断。","recommendedActions":{"immediate":["标记发生中心并减少病区与健康区之间的带露水作业","停止偏施速效氮肥","保持合理水层和群体通风"],"followUp":["连续 3 天调查新病斑和天气条件","抽穗期重点检查穗颈和邻田发生情况"],"chemicalBoundary":"药剂防治必须核对水稻稻瘟病有效登记、施用时期和标签要求。"},"doNot":["不要把所有白穗都判为穗颈瘟","不要在发病后继续偏施氮肥","不要自行提高剂量或缩短施药间隔"],"safeInterval":{"policy":"label_required","displayText":"如使用农药，以有效产品标签的安全间隔期为准。"},"expertReview":{"recommended":true,"triggers":["进入破口抽穗期","穗颈变褐并出现白穗","田间迅速扩大","与细菌性病害难区分"]},"plainLanguage":{"shortName":"疑似稻瘟病","summary":"叶片上的梭形灰心褐边斑，或穗颈变褐后出现白穗，都需要重视。","nextStep":"拍清叶斑和穗颈，停止偏施氮肥，并尽快请农技员复核。"},"aiReview":{"requiredEvidence":["梭形灰白中央褐色边缘病斑","穗颈变褐或病斑霉层"],"rejectIf":["只有整田同方向倒伏","叶片为沿叶缘向下的长条枯白"],"confidenceCap":0.86},"sourceRefs":["irri-rice-knowledge-bank","cabi-plantwise","china-pesticide-registration"]},{"id":"rice-sheath-blight","crop":"水稻","problem":"纹枯病","aliases":["云纹病"],"category":"disease","riskLevel":"high","symptoms":["近水面叶鞘先出现椭圆形或不规则水渍状斑","病斑扩大后中央灰白、边缘灰褐，多个病斑连成云纹状","严重时病斑向上扩展，植株早衰或倒伏"],"possibleCauses":["田间菌核和病残体是主要来源","种植过密、偏施氮肥、群体郁闭和高温高湿利于发生"],"lookalikes":["稻曲病叶鞘症状","基腐或机械损伤","药害"],"captureParts":["扒开稻丛拍近水面叶鞘","拍病斑云纹和菌核","拍田间发生高度和范围"],"actionWindow":"发现病斑向上扩展时 1 至 2 天内处理。","recommendedActions":{"immediate":["停止偏施氮肥并改善田间通风透光","按当地栽培要求调节水层","调查病斑是否已上升到功能叶附近"],"followUp":["3 天后复查病斑上升速度","收获后处理病残体并减少菌核回田"],"chemicalBoundary":"需要用药时核对水稻纹枯病有效登记，并把施药时期与病斑上升程度结合。"},"doNot":["不要只拍叶尖","不要继续重施氮肥促旺","不要把水面附近所有褐斑都当纹枯病"],"safeInterval":{"policy":"label_required","displayText":"如用药，按产品标签的安全间隔期执行。"},"expertReview":{"recommended":true,"triggers":["病斑已上升到剑叶","大面积倒伏","看不到典型云纹斑","临近收获需要用药"]},"plainLanguage":{"shortName":"疑似纹枯病","summary":"病斑常从靠近水面的叶鞘开始，连起来像云纹，并会逐步向上爬。","nextStep":"扒开稻丛拍叶鞘，停掉偏多的氮肥，观察病斑有没有向上扩展。"},"aiReview":{"requiredEvidence":["近水面叶鞘先发病","灰白中央和褐色边缘的云纹状斑"],"rejectIf":["症状仅在穗粒形成球状物","根部腐烂但叶鞘无典型病斑"],"confidenceCap":0.88},"sourceRefs":["irri-rice-knowledge-bank","cabi-plantwise","china-pesticide-registration"]},{"id":"rice-bacterial-leaf-blight","crop":"水稻","problem":"白叶枯病","aliases":["细菌性白叶枯病"],"category":"disease","riskLevel":"high","symptoms":["多从叶尖或叶缘开始出现黄绿色水渍状条斑并向下延伸","病健交界可呈波浪状，后期病部灰白枯死","潮湿清晨病部有时可见黄色菌脓小珠"],"possibleCauses":["带病种子、病稻草和灌排水传播","暴雨、大风造成伤口后容易加重"],"lookalikes":["细菌性条斑病","叶尖干枯","药害","缺钾"],"captureParts":["拍完整叶片从叶尖到基部","拍病健交界","清晨拍菌脓","拍田间沿水流或风口分布"],"actionWindow":"暴雨后出现扩展性病斑时当天报告并复核。","recommendedActions":{"immediate":["病田与健康田分开灌排，避免串水","减少带露水进田和人为传播","停止过量追施氮肥"],"followUp":["调查病斑是否沿叶缘持续向下","记录暴雨、风害和灌排路径"],"chemicalBoundary":"细菌性病害用药必须查询有效登记并由当地农技人员结合病情决定。"},"doNot":["不要让病田水直接流入健康田","不要凭白色叶尖单独确诊","不要套用真菌性叶斑病方案"],"safeInterval":{"policy":"label_required","displayText":"若使用登记农药，安全间隔期按标签执行。"},"expertReview":{"recommended":true,"triggers":["暴雨后快速蔓延","苗期成片萎蔫","与条斑病难区分","当地要求报告或处置"]},"plainLanguage":{"shortName":"疑似白叶枯病","summary":"病斑常从叶尖或叶边往下走，最后变成灰白色，可能随灌排水传播。","nextStep":"拍完整叶片和田间分布，先把病田与健康田分开灌排。"},"aiReview":{"requiredEvidence":["叶尖或叶缘向下扩展的条斑","波浪状病健交界或菌脓"],"rejectIf":["病斑为梭形灰心褐边","只有老叶尖均匀焦枯"],"confidenceCap":0.78},"sourceRefs":["irri-rice-knowledge-bank","cabi-plantwise","china-pesticide-registration"]},{"id":"rice-false-smut","crop":"水稻","problem":"稻曲病","aliases":["青粉病","伪黑穗病"],"category":"disease","riskLevel":"medium","symptoms":["个别稻粒被黄绿色或墨绿色绒球状物替代","病粒逐渐变大，后期颜色加深并可能开裂散粉","通常一穗上只有部分谷粒受害"],"possibleCauses":["抽穗扬花期湿度高和降雨多有利于发病","品种、偏施氮肥和田间病源影响发生"],"lookalikes":["黑粉病类症状","穗部霉变","稻瘟病造成的空秕"],"captureParts":["拍整穗","拍病粒球状物近照","拍同田发生比例","记录抽穗期天气"],"actionWindow":"发现后立即标记病田，收获和留种前完成处置计划。","recommendedActions":{"immediate":["将病穗和健康穗分开，避免病粒混入留种材料","严重病粒妥善收集处理","记录发生地块和品种"],"followUp":["收获后清理病残体并安排下一季预防","下一季在关键时期依据当地预警采取措施"],"chemicalBoundary":"已形成病粒后药剂难以逆转；预防用药必须核对登记和关键施用时期。"},"doNot":["不要把病粒作为种子","不要把已经形成的病粒理解为喷药后会恢复","不要在无登记依据时提前混配多种药"],"safeInterval":{"policy":"label_required","displayText":"如在预防期使用农药，按产品标签安全间隔期执行。"},"expertReview":{"recommended":false,"triggers":["发生比例高","病粒形态不典型","准备留种或作为食用稻米处理"]},"plainLanguage":{"shortName":"疑似稻曲病","summary":"正常谷粒被黄绿或墨绿色绒球替代，是稻曲病的重要样子。","nextStep":"把病穗分开，别留作种子，并记录地块供下一季预防。"},"aiReview":{"requiredEvidence":["谷粒被球状绒团替代","同穗部分谷粒发病"],"rejectIf":["整穗白化但无球状病粒","仅有穗颈变褐"],"confidenceCap":0.95},"sourceRefs":["irri-rice-knowledge-bank","cabi-plantwise","china-pesticide-registration"]},{"id":"rice-brown-planthopper","crop":"水稻","problem":"褐飞虱","aliases":["稻飞虱","褐稻虱"],"category":"pest","riskLevel":"high","symptoms":["虫体多聚集在稻丛基部吸汁","虫量高时植株成片发黄枯死，形成虱烧","基部可见成虫、若虫和蜕皮"],"possibleCauses":["迁飞虫源和适宜天气","氮肥偏多、群体郁闭或不合理用药破坏天敌"],"lookalikes":["纹枯病","根系受损","干旱或药害","其他飞虱"],"captureParts":["扒开稻丛拍基部虫体","拍成片枯黄边界","拍虫体背部和侧面","记录每丛大致虫数"],"actionWindow":"发现基部虫量快速上升或虱烧中心时当天调查。","recommendedActions":{"immediate":["按田块多点调查基部虫量，不只看叶面","避免继续偏施氮肥","保护蜘蛛等天敌并标记虱烧中心"],"followUp":["依据当地测报和防治指标复查虫量","处理后重点看活虫数量而不是旧枯叶颜色"],"chemicalBoundary":"如需用药，必须依据当地防治指标、有效登记和稻田生态情况选择。"},"doNot":["不要只凭黄叶用药","不要高位喷雾却忽略稻丛基部","不要连续使用同一作用机制产品"],"safeInterval":{"policy":"label_required","displayText":"使用任何稻飞虱登记药剂均须按标签安全间隔期执行。"},"expertReview":{"recommended":true,"triggers":["已出现虱烧","虫种无法辨认","临近收获","处理后虫量仍高"]},"plainLanguage":{"shortName":"疑似褐飞虱","summary":"这种虫常躲在稻丛根部附近，虫多时会让稻株一片片枯黄。","nextStep":"先扒开稻丛拍基部并数虫，不要只看黄叶。"},"aiReview":{"requiredEvidence":["稻丛基部可见飞虱成虫或若虫","成片虱烧或虫量记录"],"rejectIf":["基部没有虫且有典型纹枯病斑","整田因缺水同时卷叶"],"confidenceCap":0.86},"sourceRefs":["irri-rice-knowledge-bank","cabi-plantwise","china-pesticide-registration"]},{"id":"rice-leaf-folder","crop":"水稻","problem":"稻纵卷叶螟","aliases":["卷叶虫"],"category":"pest","riskLevel":"medium","symptoms":["幼虫吐丝将叶片纵向卷合","卷叶内可见幼虫、粪便和刮食痕","叶面被刮食后形成长条白色透明斑"],"possibleCauses":["迁飞成虫产卵和适宜温湿度","田间嫩绿、氮肥偏多时可能更受害"],"lookalikes":["稻蓟马","风害折叶","药害白斑"],"captureParts":["展开卷叶拍幼虫和粪便","拍长条白斑","拍全田卷叶比例"],"actionWindow":"发现新鲜卷叶和幼虫时 1 至 2 天内调查虫龄和受害率。","recommendedActions":{"immediate":["随机多点统计新卷叶率","展开卷叶确认有无活幼虫","避免偏施氮肥并保护天敌"],"followUp":["依据当地测报和防治指标决定是否处理","处理后检查新卷叶和活虫，不以旧白斑判断失败"],"chemicalBoundary":"达到当地防治指标后，才考虑水稻稻纵卷叶螟有效登记产品。"},"doNot":["不要看到旧白斑就重复用药","不要在没有活虫时盲目处理","不要忽略虫龄和当地防治指标"],"safeInterval":{"policy":"label_required","displayText":"如用药，按登记标签安全间隔期执行。"},"expertReview":{"recommended":false,"triggers":["大面积新卷叶","接近抽穗期","无法找到活幼虫","处理后仍持续出现新卷叶"]},"plainLanguage":{"shortName":"疑似卷叶虫","summary":"幼虫把稻叶卷起来藏在里面吃，叶面会留下长条白痕。","nextStep":"展开几片新卷叶找活虫，并统计一块田里有多少新卷叶。"},"aiReview":{"requiredEvidence":["纵向卷叶和丝","卷内幼虫、粪便或新鲜刮食痕"],"rejectIf":["只有白斑没有卷叶","卷叶由整田缺水造成"],"confidenceCap":0.93},"sourceRefs":["irri-rice-knowledge-bank","cabi-plantwise","china-pesticide-registration"]},{"id":"rice-lodging","crop":"水稻","problem":"倒伏","aliases":["水稻倒伏"],"category":"physiological","riskLevel":"medium","symptoms":["茎秆倾斜或折倒，常成片并有一致方向","根倒型可见根系固定力差，茎倒型可见节间弯折或折断","倒伏后田间湿度增加，穗部易贴水或霉变"],"possibleCauses":["大风暴雨、植株过高或茎秆强度不足","偏施氮肥、种植过密、根系浅弱或病虫害削弱茎秆"],"lookalikes":["纹枯病导致倒伏","螟虫蛀茎","根腐或鼠害"],"captureParts":["拍整田倒伏方向","拍茎秆折点","拍根部和基部病虫痕迹","拍穗部是否贴水"],"actionWindow":"暴雨大风后当天检查排水和穗部接触水情况。","recommendedActions":{"immediate":["先排除田间积水并保持排水通畅","检查是否有纹枯病或蛀茎害虫","根据成熟度和天气评估提前收获风险"],"followUp":["记录倒伏位置、品种、施氮和密度","下一季优化品种、密度、氮肥和水层管理"],"chemicalBoundary":"倒伏本身没有药剂修复方案；如伴随病虫害，需另行确诊。"},"doNot":["不要盲目扶起已折断茎秆造成二次损伤","不要把倒伏统一判为风害","不要用增施氮肥帮助恢复"],"safeInterval":{"policy":"not_applicable","displayText":"倒伏管理本身不涉及农药安全间隔期。"},"expertReview":{"recommended":false,"triggers":["倒伏前无明显风雨","茎基部腐烂或虫孔多","临近收获且穗部贴水"]},"plainLanguage":{"shortName":"水稻倒伏","summary":"水稻成片倒下不一定只因风雨，还要看茎基部、虫孔和病斑。","nextStep":"先排水，拍倒伏方向、折点和茎基部，再判断是否伴随病虫害。"},"aiReview":{"requiredEvidence":["整田倒伏分布","茎折、根倒或外力证据"],"rejectIf":["只有一株倒伏近照","未检查茎基部病虫痕迹"],"confidenceCap":0.75},"sourceRefs":["irri-rice-knowledge-bank","cabi-plantwise"]},{"id":"rice-zinc-deficiency","crop":"水稻","problem":"缺锌","aliases":["水稻缺锌","坐蔸相关缺锌症状"],"category":"nutrient","riskLevel":"medium","symptoms":["移栽后植株生长迟缓、分蘖少","叶片可出现黄化、褐色小斑或青铜色斑块","新叶短窄，田间常出现高低不齐"],"possibleCauses":["土壤有效锌低或高 pH 降低锌有效性","低温、长期深水、有机质还原环境或根系受损影响吸收"],"lookalikes":["移栽伤","缺磷","根系中毒","病毒或药害"],"captureParts":["拍整穴和相邻正常株对比","拍叶片褐斑或青铜色","拍根系颜色","提供移栽时间、水层和施肥记录"],"actionWindow":"发现成片生长停滞后 3 天内排查根区和土壤条件。","recommendedActions":{"immediate":["检查水层、根系颜色和土壤 pH 条件","排除低温、药害和根系中毒","保留代表性植株和土样用于检测"],"followUp":["依据土壤或植株检测和当地技术意见调整锌营养","改善根区环境并观察新叶和分蘖"],"chemicalBoundary":"缺锌属于营养问题，肥料种类和用量需依据检测与产品说明。"},"doNot":["不要只凭矮小和黄叶大量补锌","不要在根系中毒或深水问题未解决时只加肥","不要追求老叶斑点消失"],"safeInterval":{"policy":"not_applicable","displayText":"营养调整不涉及农药安全间隔期。"},"expertReview":{"recommended":true,"triggers":["根系发黑或有臭味","症状成片但与土壤地势一致","补充营养后新叶仍异常"]},"plainLanguage":{"shortName":"可能缺锌","summary":"移栽后长得慢、分蘖少并有褐斑，可能是锌吸收不好，也可能是根区出了问题。","nextStep":"先查水层、根和土壤条件，检测后再补。"},"aiReview":{"requiredEvidence":["移栽后生长迟缓和分蘖少","褐斑或青铜色症状"],"rejectIf":["叶片有梭形病斑或虫体","根系明显腐烂但无营养检测"],"confidenceCap":0.7},"sourceRefs":["irri-rice-knowledge-bank","cabi-plantwise"]},{"id":"corn-northern-leaf-blight","crop":"玉米","problem":"大斑病","aliases":["玉米大斑病","北方叶枯病"],"category":"disease","riskLevel":"high","symptoms":["叶片出现较长的灰绿至灰褐色梭形或雪茄形大斑","病斑可沿叶片延伸并相互连合","高湿时病斑表面可见暗色霉层"],"possibleCauses":["病残体越冬和感病品种","温度适宜、露水多、田间湿度高时发展快"],"lookalikes":["小斑病","灰斑病","干旱灼伤","药害"],"captureParts":["拍完整叶片以显示病斑长度和形状","拍病斑近照和霉层","拍植株上中下部病斑分布","拍全田发生范围"],"actionWindow":"抽雄前后发现快速上升时当天调查并复核。","recommendedActions":{"immediate":["调查病斑是否已到达穗位叶及以上","停止偏施氮肥并保持田间通风","记录品种和病残体管理情况"],"followUp":["连续 3 天观察上位叶新病斑","收获后采用轮作、病残体管理和抗病品种"],"chemicalBoundary":"是否用药需结合生育期、穗位叶受害和当地防治指标，并核对有效登记。"},"doNot":["不要只凭一个枯斑确诊","不要忽略灰斑病的长方形叶脉限制特征","不要自行提高剂量"],"safeInterval":{"policy":"label_required","displayText":"如用药，以玉米大斑病登记产品标签为准。"},"expertReview":{"recommended":true,"triggers":["抽雄前穗位叶已受害","病斑快速向上扩展","与灰斑病难区分"]},"plainLanguage":{"shortName":"疑似玉米大斑病","summary":"叶片上出现像雪茄一样的长大斑，并逐渐连成片，需要关注。","nextStep":"拍完整叶片和穗位叶，记录是否正在快速向上扩展。"},"aiReview":{"requiredEvidence":["长梭形或雪茄形大斑","上中下叶片分布"],"rejectIf":["病斑被叶脉限制成长方形","只有叶缘干枯无独立病斑"],"confidenceCap":0.88},"sourceRefs":["cimmyt-maize","cabi-plantwise","china-pesticide-registration"]},{"id":"corn-gray-leaf-spot","crop":"玉米","problem":"灰斑病","aliases":["玉米灰斑病"],"category":"disease","riskLevel":"high","symptoms":["病斑常被叶脉限制，呈狭长方形或矩形","病斑初为黄褐色，后变灰褐色","严重时多个病斑连合导致叶片早枯"],"possibleCauses":["病残体携带病源，连作风险增加","温暖高湿、叶面长时间带水有利于发病"],"lookalikes":["大斑病","小斑病","细菌性叶条斑","药害"],"captureParts":["拍完整叶片和叶脉","拍病斑是否被叶脉截断","拍穗位叶","拍田间分布"],"actionWindow":"病斑到达穗位叶前后 1 至 2 天内评估风险。","recommendedActions":{"immediate":["调查穗位叶及以上病斑数量","改善群体通风并避免偏施氮肥","记录连作和病残体情况"],"followUp":["依据品种、生育期和天气复查","下一季采用轮作、抗病品种和病残体管理"],"chemicalBoundary":"需要用药时必须结合当地防治指标并核对玉米灰斑病有效登记。"},"doNot":["不要把长方形病斑误作大斑病","不要在无扩展风险时重复施药","不要忽视连作病残体"],"safeInterval":{"policy":"label_required","displayText":"如使用农药，安全间隔期按登记标签执行。"},"expertReview":{"recommended":true,"triggers":["穗位叶大量发病","与细菌性叶条斑难区分","抽雄前快速扩展"]},"plainLanguage":{"shortName":"疑似灰斑病","summary":"病斑像被叶脉切成一个个长方块，是灰斑病的重要线索。","nextStep":"把完整叶片和穗位叶拍清楚，请农技员判断扩展风险。"},"aiReview":{"requiredEvidence":["叶脉限制的矩形病斑","灰褐色病斑和田间扩展"],"rejectIf":["病斑为宽大雪茄形","症状为沿叶缘均匀焦枯"],"confidenceCap":0.85},"sourceRefs":["cimmyt-maize","cabi-plantwise","china-pesticide-registration"]},{"id":"corn-common-rust","crop":"玉米","problem":"普通锈病","aliases":["玉米锈病"],"category":"disease","riskLevel":"medium","symptoms":["叶片两面出现散生或密集的红褐色小疱斑","疱斑破裂后散出铁锈色粉末","后期疱斑可变黑，严重时叶片早枯"],"possibleCauses":["空气传播的锈菌孢子","适宜温度和高湿、叶面结露促进感染"],"lookalikes":["南方锈病","虫粪或泥点","其他叶斑病"],"captureParts":["拍叶片正反面疱斑","拍擦拭后是否有锈色粉末","拍上中下叶片分布"],"actionWindow":"抽雄前后上位叶明显发生时 1 至 2 天内复核。","recommendedActions":{"immediate":["确认疱斑是否可散出锈色粉末","调查穗位叶和上位叶发生程度","保持合理密度和营养平衡"],"followUp":["结合天气和品种抗性复查","下一季优先选择适宜当地的抗病品种"],"chemicalBoundary":"是否用药需结合生育期和上位叶受害，并核对玉米锈病有效登记。"},"doNot":["不要把泥点或虫粪当锈病","不要仅凭下部少量旧疱斑反复施药","不要把普通锈病和南方锈病混为一类"],"safeInterval":{"policy":"label_required","displayText":"如用药，按有效产品标签规定执行。"},"expertReview":{"recommended":false,"triggers":["上位叶快速密集发生","当地有南方锈病风险","疱斑形态不典型"]},"plainLanguage":{"shortName":"疑似玉米锈病","summary":"叶面的小疱斑会破开，手指轻擦可能沾到铁锈色粉。","nextStep":"拍叶片两面和上位叶，确认是不是能擦出锈色粉末。"},"aiReview":{"requiredEvidence":["红褐色隆起疱斑","锈色孢子粉"],"rejectIf":["斑点平坦且被叶脉限制","仅有泥点或虫粪可完全洗掉"],"confidenceCap":0.92},"sourceRefs":["cimmyt-maize","cabi-plantwise","china-pesticide-registration"]},{"id":"corn-stalk-rot","crop":"玉米","problem":"茎腐病","aliases":["玉米茎基腐病","茎秆腐烂"],"category":"disease","riskLevel":"high","symptoms":["灌浆中后期植株提前枯黄，茎基部变色或腐烂","用手捏茎秆感觉中空或变软，容易倒折","剖茎后髓部可能变色、松散或腐烂"],"possibleCauses":["多种病原可引起茎腐，病残体和土壤是来源","干旱后遇雨、虫伤、密植、营养失衡和叶部病害加重风险"],"lookalikes":["螟虫蛀茎","风倒","根腐","正常成熟衰老"],"captureParts":["拍整株早枯与相邻正常株","拍茎基部和倒折点","剖茎拍髓部","拍虫孔和蛀屑"],"actionWindow":"发现茎秆变软或成片倒折后当天评估收获风险。","recommendedActions":{"immediate":["调查茎秆硬度和倒折比例","检查是否有虫孔、蛀屑和叶部严重病害","根据成熟度与天气评估优先收获高风险地块"],"followUp":["记录品种、密度、施肥和前期胁迫","下一季通过轮作、抗病品种、合理密度和病残体管理降低风险"],"chemicalBoundary":"灌浆后已经腐烂的茎秆无法靠喷药恢复；伴随其他病虫害需另行确诊。"},"doNot":["不要把所有倒伏都判为茎腐病","不要指望已腐烂茎秆喷药后恢复","不要忽略蛀茎害虫"],"safeInterval":{"policy":"not_applicable","displayText":"当前管理建议不涉及农药；若另有病虫用药需按其标签执行。"},"expertReview":{"recommended":true,"triggers":["成片提前枯死","大面积倒折","无法区分病害与虫害","需要决定提前收获"]},"plainLanguage":{"shortName":"疑似茎腐","summary":"玉米提前枯黄、茎基部变软中空，很容易倒折。","nextStep":"捏一捏茎秆并拍剖面，同时检查虫孔，尽快评估是否提前收获。"},"aiReview":{"requiredEvidence":["茎基部变色软腐或中空","植株提前枯黄或倒折"],"rejectIf":["只有风后同方向倾倒","茎内有明显蛀虫且无腐烂"],"confidenceCap":0.75},"sourceRefs":["cimmyt-maize","cabi-plantwise"]},{"id":"corn-fall-armyworm","crop":"玉米","problem":"草地贪夜蛾","aliases":["秋黏虫"],"category":"pest","riskLevel":"high","symptoms":["心叶被取食形成成排孔洞或窗孔","喇叭口内可见大量虫粪和幼虫","较大幼虫头部常见浅色倒 Y 形纹，体末端有四个近方形排列黑点"],"possibleCauses":["成虫迁飞产卵，幼虫集中危害心叶","田间连续玉米和适宜温度有利于发生"],"lookalikes":["玉米螟","黏虫","其他夜蛾幼虫","冰雹伤"],"captureParts":["扒开喇叭口拍幼虫和虫粪","拍幼虫头部倒 Y 纹和尾端黑点","拍受害株比例"],"actionWindow":"苗期发现新鲜虫粪和小龄幼虫后当天调查。","recommendedActions":{"immediate":["多点调查受害株率和幼虫大小","苗期人工清除少量卵块和幼虫","保护寄生蜂等天敌并清理严重虫源"],"followUp":["依据当地测报和防治指标复查","处理后检查新鲜虫粪和活虫，不以旧孔洞判断"],"chemicalBoundary":"达到防治条件时只可选择玉米草地贪夜蛾有效登记产品，抓住低龄期并按标签使用。"},"doNot":["不要仅凭叶孔判断虫种","不要忽视喇叭口深处幼虫","不要对大龄幼虫盲目加量"],"safeInterval":{"policy":"label_required","displayText":"如用药，按玉米和该虫有效登记标签执行安全间隔期。"},"expertReview":{"recommended":true,"triggers":["虫种无法辨认","大龄幼虫比例高","田间快速扩展","已处理但仍有大量活虫"]},"plainLanguage":{"shortName":"疑似草地贪夜蛾","summary":"幼虫常躲在玉米心叶里，留下成排孔洞和很多虫粪。","nextStep":"扒开喇叭口，拍清虫头、尾端黑点和虫体大小。"},"aiReview":{"requiredEvidence":["心叶取食和大量虫粪","倒 Y 头纹或尾端四点特征"],"rejectIf":["只见茎内蛀道而心叶无虫","叶片损伤来自冰雹且无虫粪"],"confidenceCap":0.9},"sourceRefs":["cimmyt-maize","cabi-plantwise","china-pesticide-registration"]},{"id":"corn-borer","crop":"玉米","problem":"玉米螟","aliases":["钻心虫"],"category":"pest","riskLevel":"medium","symptoms":["心叶展开后出现横向成排小孔","茎秆、穗柄或果穗可见蛀孔和蛀屑","茎秆易折、果穗受害后易继发霉变"],"possibleCauses":["成虫产卵后幼虫钻蛀","玉米秸秆和田间残株可保留虫源"],"lookalikes":["草地贪夜蛾","其他蛀茎害虫","冰雹伤"],"captureParts":["拍心叶成排孔洞","拍茎秆或穗柄蛀孔和蛀屑","剖开受害部位拍幼虫和蛀道"],"actionWindow":"发现尚未钻入茎秆的小龄幼虫时尽快调查；已钻蛀后重点评估折倒和穗腐风险。","recommendedActions":{"immediate":["确认幼虫是在叶面还是已钻入茎穗","清除少量明显受害组织并记录发生率","收获后及时处理含虫秸秆"],"followUp":["依据当地测报和防治指标安排下一代管理","检查果穗是否继发霉变"],"chemicalBoundary":"药剂通常应在幼虫钻蛀前依据有效登记使用，已钻入茎内后效果有限。"},"doNot":["不要把所有成排孔洞都判成玉米螟","不要在幼虫已深钻后盲目加量","不要把带虫秸秆随意堆放"],"safeInterval":{"policy":"label_required","displayText":"如用药，以玉米螟登记产品标签为准。"},"expertReview":{"recommended":false,"triggers":["虫种无法确认","穗部受害并出现霉变","茎秆大面积折倒"]},"plainLanguage":{"shortName":"疑似玉米螟","summary":"幼虫会钻进茎和穗柄，蛀孔外常能看到碎屑。","nextStep":"拍蛀孔、碎屑和剖开的蛀道，确认虫子是否已经钻进去。"},"aiReview":{"requiredEvidence":["蛀孔、蛀屑和蛀道","横向成排叶孔或茎穗受害"],"rejectIf":["幼虫只在喇叭口取食且有大量粪便","无蛀孔仅有风折"],"confidenceCap":0.86},"sourceRefs":["cimmyt-maize","cabi-plantwise","china-pesticide-registration"]},{"id":"corn-drought-leaf-rolling","crop":"玉米","problem":"干旱卷叶","aliases":["缺水卷叶"],"category":"physiological","riskLevel":"medium","symptoms":["高温时叶片沿中脉向上卷成筒状","清晨或补水后轻度植株可部分恢复","严重时叶缘焦枯、生长受阻并影响授粉"],"possibleCauses":["土壤水分不足和高温蒸腾过强","根系受损、土壤板结或灌溉不均也会造成局部缺水"],"lookalikes":["除草剂药害","根腐病","蓟马或病毒造成的卷叶"],"captureParts":["拍全田分布和地势","清晨与中午各拍一次","拍根区土壤和根系","记录灌溉时间"],"actionWindow":"中午持续卷叶且清晨不能恢复时当天检查供水和根系。","recommendedActions":{"immediate":["检查根区实际含水和灌溉均匀性","在当地建议时段及时补水并避免一次过量冲灌","重点保护抽雄吐丝期供水"],"followUp":["补水后观察新叶和清晨恢复情况","检查土壤板结、根腐和灌溉堵塞"],"chemicalBoundary":"干旱卷叶本身不需要农药。"},"doNot":["不要只看卷叶就喷药","不要在高温正午进行大水漫灌造成剧烈变化","不要忽略根腐和药害"],"safeInterval":{"policy":"not_applicable","displayText":"补水和根区管理不涉及农药安全间隔期。"},"expertReview":{"recommended":false,"triggers":["土壤不干仍持续卷叶","叶片畸形且田间呈喷幅状","根系腐烂","抽雄吐丝期严重受旱"]},"plainLanguage":{"shortName":"可能缺水卷叶","summary":"热天叶片卷成筒，多半是在减少失水；清晨还不恢复就要查水和根。","nextStep":"清晨和中午各拍一次，摸一摸根区土壤，再检查灌溉是否均匀。"},"aiReview":{"requiredEvidence":["中午卷叶并与土壤干旱相关","清晨恢复情况"],"rejectIf":["田间呈规则喷幅状畸形","根系腐烂或茎基部病变"],"confidenceCap":0.78},"sourceRefs":["cimmyt-maize","cabi-plantwise"]},{"id":"corn-zinc-deficiency","crop":"玉米","problem":"缺锌","aliases":["白苗病","锌素不足"],"category":"nutrient","riskLevel":"medium","symptoms":["幼苗新叶中脉两侧出现黄白色宽条带，叶缘和中脉常仍较绿","植株矮小、节间缩短，严重时新叶发白","症状常在苗期较明显"],"possibleCauses":["土壤有效锌不足","高 pH、高磷、低温湿土或根系生长差影响锌吸收"],"lookalikes":["除草剂药害","缺铁","遗传性白化","条纹病害"],"captureParts":["拍新叶完整条带","拍植株与正常株对比","拍根系","提供土壤 pH 和近期施肥记录"],"actionWindow":"苗期发现后 3 天内排查根区和土壤条件。","recommendedActions":{"immediate":["核对磷肥用量、土壤 pH 和低温积水情况","检查根系是否正常","有条件时进行土壤或植株检测"],"followUp":["确认缺锌后依据当地技术意见和肥料说明少量调整","观察新叶而不是等待旧叶完全返绿"],"chemicalBoundary":"缺锌属于营养问题，不使用农药；肥料剂量需依据检测。"},"doNot":["不要看到白条就大量补锌","不要忽略除草剂喷幅和漂移","不要同时大幅增加磷肥"],"safeInterval":{"policy":"not_applicable","displayText":"营养调整不涉及农药安全间隔期。"},"expertReview":{"recommended":false,"triggers":["症状沿喷幅分布","植株畸形扭曲","根系明显受损","调整后新叶仍发白"]},"plainLanguage":{"shortName":"可能缺锌","summary":"玉米新叶中脉两边出现黄白宽带，可能是锌吸收不足。","nextStep":"先查根、土壤酸碱度和磷肥记录，检测后再补。"},"aiReview":{"requiredEvidence":["苗期新叶中脉两侧黄白宽带","中脉和叶缘相对较绿"],"rejectIf":["叶片扭曲且田间沿喷幅分布","斑纹可见病原霉层或坏死条斑"],"confidenceCap":0.75},"sourceRefs":["cimmyt-maize","cabi-plantwise"]},{"id":"citrus-huanglongbing","crop":"柑橘","problem":"黄龙病","aliases":["柑橘黄龙病","HLB","柑橘青果病"],"category":"disease","riskLevel":"critical","symptoms":["叶片出现左右不对称的斑驳黄化，黄绿边界不规则","枝梢可能局部黄化、树势衰弱","果实可能偏小、畸形、着色不均，果柄端附近保持绿色","种子可能发育不良"],"possibleCauses":["由柑橘木虱传播相关病原","带病苗木和接穗可远距离传播"],"lookalikes":["缺锌","缺铁","根腐","黄化型药害"],"captureParts":["拍同一叶片左右两半的黄化差异","拍整树黄梢分布","拍果实两端和剖开的种子","拍嫩梢是否有木虱"],"actionWindow":"发现疑似症状后当天标记植株，立即联系当地植保或农技部门复核。","recommendedActions":{"immediate":["给疑似树编号并停止取接穗或调运苗木","检查嫩梢柑橘木虱","记录苗木来源和附近疑似树"],"followUp":["按当地官方要求进行采样检测和处置","持续监测木虱和周边植株"],"chemicalBoundary":"任何木虱防治必须基于柑橘有效登记和当地统一防控要求；药剂不能治愈已感染黄龙病的植株。"},"doNot":["不要仅凭一片黄叶自行确诊","不要从疑似树剪取接穗或调运苗木","不要宣称喷药或施肥能治愈黄龙病","不要隐瞒疑似发生情况"],"safeInterval":{"policy":"label_required","displayText":"若防治木虱使用农药，必须按有效标签的安全间隔期执行。"},"expertReview":{"recommended":true,"triggers":["任何疑似黄龙病症状","发现木虱并伴随不对称斑驳","果实畸形和着色不均","苗木来源不明"]},"plainLanguage":{"shortName":"疑似黄龙病","summary":"叶片两边黄得不一样、果实畸形且着色不匀时，需要排查黄龙病。","nextStep":"立即标记这棵树，别剪枝嫁接或调苗，并联系当地农技人员检测。"},"aiReview":{"requiredEvidence":["不对称斑驳黄化","枝梢、果实或木虱的辅助证据"],"rejectIf":["黄化沿叶脉对称分布","只有单叶照片且无整树信息"],"confidenceCap":0.7},"sourceRefs":["uf-ifas-citrus","cabi-plantwise","china-pesticide-registration"]},{"id":"citrus-canker","crop":"柑橘","problem":"溃疡病","aliases":["柑橘溃疡病"],"category":"disease","riskLevel":"high","symptoms":["叶、枝或果面形成隆起的木栓化病斑","病斑常有褐色中心、较浅边缘和黄色晕圈","叶片病斑可在正反面同时隆起，严重时落叶落果"],"possibleCauses":["细菌通过风雨、伤口和带病苗木传播","大风雨、潜叶蛾伤口和嫩梢期增加感染风险"],"lookalikes":["疮痂病","黑点病","机械伤","虫害疤痕"],"captureParts":["拍叶片正反面同一病斑","侧光拍病斑是否隆起","拍果面和嫩枝病斑","记录近期风雨和潜叶蛾情况"],"actionWindow":"嫩梢和幼果期发现后当天标记并减少传播操作。","recommendedActions":{"immediate":["停止在雨后湿树上修剪和采摘","对工具和周转物进行清洁","严重病枝按当地要求修剪并妥善处理","同步检查潜叶蛾危害"],"followUp":["风雨后复查嫩梢和幼果","使用无病苗木并加强防风管理"],"chemicalBoundary":"细菌性病害和嫩梢保护需核对柑橘溃疡病有效登记及当地要求。"},"doNot":["不要在树体潮湿时跨区修剪","不要调运明显带病苗木和接穗","不要把平坦黑点都判为溃疡病"],"safeInterval":{"policy":"label_required","displayText":"如用药，安全间隔期按柑橘溃疡病登记产品标签执行。"},"expertReview":{"recommended":true,"triggers":["苗圃或幼树发生","果实病斑多","与疮痂病难区分","当地有检疫或调运要求"]},"plainLanguage":{"shortName":"疑似溃疡病","summary":"病斑像小火山口一样隆起，周围常有黄圈，叶、枝、果都可能出现。","nextStep":"拍叶片两面和果实侧光图，雨后先别修剪，并请农技员确认。"},"aiReview":{"requiredEvidence":["隆起木栓化病斑","黄色晕圈或叶片两面隆起"],"rejectIf":["病斑完全平坦且只在果面油胞","只有机械擦伤无扩展斑"],"confidenceCap":0.83},"sourceRefs":["uf-ifas-citrus","cabi-plantwise","china-pesticide-registration"]},{"id":"citrus-anthracnose","crop":"柑橘","problem":"炭疽病","aliases":["柑橘炭疽"],"category":"disease","riskLevel":"medium","symptoms":["衰弱枝梢、叶片或果实出现褐色至黑褐色坏死斑","潮湿时病斑上可能出现橙红色或粉红色小点","花、幼果或采后果实均可能出现腐烂，但形态会随部位变化"],"possibleCauses":["病原常在衰弱或受伤组织上发生","冻害、旱害、营养不良和长期潮湿会增加风险"],"lookalikes":["褐腐病","黑点病","日灼","采后机械伤和其他果腐"],"captureParts":["拍病部与健康部交界","拍枝、叶、果三个部位","拍潮湿时病斑小点","拍整树树势"],"actionWindow":"花果期或采后腐烂扩展时 1 至 2 天内确认。","recommendedActions":{"immediate":["清除明显枯枝和腐烂果并带离","改善树冠通风，减少伤口和长时间潮湿","检查冻害、旱害、根系和营养等削弱树势的原因"],"followUp":["雨后复查新梢和果实","采后改善采摘、消毒、通风和储运管理"],"chemicalBoundary":"炭疽症状变化大，用药前必须确认部位和病因并查询柑橘相应有效登记。"},"doNot":["不要把所有黑褐果斑都叫炭疽病","不要忽略树势衰弱根因","不要用未消毒工具修剪多棵树"],"safeInterval":{"policy":"label_required","displayText":"如使用登记农药，安全间隔期按标签执行。"},"expertReview":{"recommended":true,"triggers":["果实快速腐烂","病斑形态不典型","采后批量发病","与日灼或褐腐难区分"]},"plainLanguage":{"shortName":"疑似炭疽病","summary":"衰弱或受伤部位容易出现褐黑斑，潮湿时可能长出橙红小点。","nextStep":"拍清病斑边缘和整树树势，先清除腐烂果并减少潮湿。"},"aiReview":{"requiredEvidence":["扩展性坏死斑","橙红小点或衰弱组织背景"],"rejectIf":["只有向阳面固定灼斑","病斑明显隆起并有黄晕"],"confidenceCap":0.68},"sourceRefs":["uf-ifas-citrus","cabi-plantwise","china-pesticide-registration"]},{"id":"citrus-greasy-spot","crop":"柑橘","problem":"脂点黄斑病","aliases":["脂斑病","油斑病"],"category":"disease","riskLevel":"medium","symptoms":["叶面出现黄褐色斑驳，叶背对应位置形成褐黑色、略隆起、似油浸的斑点","病斑多在成熟叶片明显","严重时引起提早落叶并削弱树势"],"possibleCauses":["落叶上的病原形成侵染来源","温暖多雨和叶面长期潮湿有利于发生"],"lookalikes":["红蜘蛛危害","缺素黄化","煤污","药害"],"captureParts":["拍同一叶片正面和背面","侧光拍叶背油浸状隆起","拍落叶和树冠发生分布"],"actionWindow":"发现明显落叶或新病斑后 3 天内评估。","recommendedActions":{"immediate":["收集或加快落叶分解，减少病源","修剪过密枝条，改善树冠通风透光","检查叶背是否有螨虫或煤污"],"followUp":["雨季前后定期检查成熟叶片","记录落叶程度和树势变化"],"chemicalBoundary":"需要保护时应结合当地发生规律并核对柑橘脂点黄斑病有效登记。"},"doNot":["不要只看叶面黄斑确诊","不要忽略叶背检查","不要把所有落叶归因于单一病害"],"safeInterval":{"policy":"label_required","displayText":"如使用农药，按登记标签执行安全间隔期。"},"expertReview":{"recommended":false,"triggers":["落叶严重","叶背没有油浸状病斑","同时发现大量螨虫或根系问题"]},"plainLanguage":{"shortName":"疑似脂点黄斑","summary":"叶面发黄时，叶背同一位置常有像油渍一样的褐黑小斑。","nextStep":"一定要补拍叶背，并检查是否同时有红蜘蛛。"},"aiReview":{"requiredEvidence":["叶面黄斑与叶背油浸状斑对应","成熟叶片发生"],"rejectIf":["叶背有活螨和密集针尖失绿点","黄化沿叶脉对称"],"confidenceCap":0.82},"sourceRefs":["uf-ifas-citrus","cabi-plantwise","china-pesticide-registration"]},{"id":"citrus-red-mite","crop":"柑橘","problem":"柑橘全爪螨","aliases":["柑橘红蜘蛛","红蜘蛛"],"category":"pest","riskLevel":"medium","symptoms":["叶片和果面出现密集灰白细点，严重时叶片失去光泽呈灰白色","叶片正反面或果面可见红色小螨和卵","虫量高时树势下降并影响果面外观"],"possibleCauses":["适宜温度和干燥条件下种群增长","不合理广谱用药破坏天敌后可能反弹"],"lookalikes":["脂点黄斑病","蓟马伤","药害","灰尘"],"captureParts":["用微距拍叶片两面和果面活螨","拍针尖状失绿点","记录每叶大致活螨数量"],"actionWindow":"发现活螨后 1 至 2 天内按多点样本调查虫量。","recommendedActions":{"immediate":["多点抽查叶片活螨而不是只看旧伤","保护捕食螨等天敌","清理严重受害枝叶并改善树势"],"followUp":["根据当地防治指标复查虫量","处理后以活螨减少和新叶健康为准"],"chemicalBoundary":"如需用药，核对柑橘螨类有效登记、抗性管理和对天敌的影响。"},"doNot":["不要只凭灰白叶色用杀螨剂","不要连续重复同一作用机制","不要忽略果面和叶背"],"safeInterval":{"policy":"label_required","displayText":"如使用杀螨剂，必须遵守标签安全间隔期。"},"expertReview":{"recommended":false,"triggers":["看不到活螨但症状持续","连续处理后虫量仍上升","计划释放天敌"]},"plainLanguage":{"shortName":"疑似红蜘蛛","summary":"红蜘蛛吸汁后会留下很多针尖样灰白点，要看到活虫才能更可靠。","nextStep":"用手机微距拍叶片两面和果面，并数一数活虫。"},"aiReview":{"requiredEvidence":["可见红色活螨或卵","密集针尖状失绿点"],"rejectIf":["叶背为油浸状褐黑斑","只有灰尘可清洗掉"],"confidenceCap":0.9},"sourceRefs":["uf-ifas-citrus","cabi-plantwise","china-pesticide-registration"]},{"id":"citrus-asian-psyllid","crop":"柑橘","problem":"柑橘木虱","aliases":["亚洲柑橘木虱","木虱"],"category":"pest","riskLevel":"critical","symptoms":["成虫在嫩梢上停栖时身体常与枝条成约 45 度角","若虫扁平、黄橙色，聚集嫩叶并排出白色蜡质丝状物","嫩叶可卷曲、畸形并有蜜露"],"possibleCauses":["成虫迁入并在新梢产卵","连续抽梢和附近带虫寄主为木虱繁殖提供条件"],"lookalikes":["蚜虫","粉虱","其他木虱","潜叶蛾造成的卷叶"],"captureParts":["拍嫩梢成虫侧面姿态","拍若虫和白色蜡质分泌物","拍卵和嫩叶卷曲","拍同株黄龙病疑似叶片"],"actionWindow":"发现后当天标记并报告农技人员，同时排查黄龙病。","recommendedActions":{"immediate":["按嫩梢比例和多点样本调查虫量","停止从带虫区调运苗木和接穗","同步检查不对称斑驳黄化和异常果实"],"followUp":["依据当地统一防控和监测要求持续复查","管理抽梢和周边寄主并保护天敌"],"chemicalBoundary":"木虱防治必须服从当地黄龙病统防要求，并核对柑橘木虱有效登记和标签。"},"doNot":["不要仅处理木虱而不排查黄龙病","不要调运带虫苗木和接穗","不要在有传粉昆虫和天敌时随意施药"],"safeInterval":{"policy":"label_required","displayText":"如用药，严格遵守标签安全间隔期及当地统一防控要求。"},"expertReview":{"recommended":true,"triggers":["任何柑橘木虱阳性发现","伴随疑似黄龙病症状","苗圃或新建园发生"]},"plainLanguage":{"shortName":"疑似柑橘木虱","summary":"这种小虫爱待在嫩梢上，也是传播黄龙病的重要害虫。","nextStep":"拍清成虫侧面和若虫，停止调苗嫁接，并联系当地农技人员。"},"aiReview":{"requiredEvidence":["45 度停栖成虫或典型若虫","嫩梢蜡质分泌物"],"rejectIf":["虫体为成群蚜虫且无木虱姿态","只有卷叶未见虫"],"confidenceCap":0.9},"sourceRefs":["uf-ifas-citrus","cabi-plantwise","china-pesticide-registration"]},{"id":"citrus-sunburn","crop":"柑橘","problem":"日灼","aliases":["太阳果","晒伤"],"category":"physiological","riskLevel":"medium","symptoms":["果实向阳面出现黄白、淡褐至深褐色灼斑","严重时果皮组织变硬、凹陷或坏死","症状集中在树冠外层和朝西、朝南受强光部位"],"possibleCauses":["高温强光使果面温度过高","突然重剪、缺水、树冠稀疏或热浪增加风险"],"lookalikes":["炭疽病","药斑","冻害","机械伤"],"captureParts":["拍果实受光方向和整树方位","拍病斑边界和侧面","拍树冠遮阴情况","记录高温和修剪时间"],"actionWindow":"热浪前预防；发现轻度灼伤后当天检查灌水和遮阴。","recommendedActions":{"immediate":["保持稳定供水并检查根区","避免高温期突然重剪使果实暴露","采用当地认可的果面保护或遮阴措施"],"followUp":["观察受伤处是否继发腐烂","下一季通过合理修剪和树冠管理降低暴晒"],"chemicalBoundary":"日灼不是病菌引起，杀菌剂不能修复已灼伤组织。"},"doNot":["不要把向阳面灼斑直接判为炭疽病","不要在热浪前重剪","不要依靠喷药让坏死果皮恢复"],"safeInterval":{"policy":"not_applicable","displayText":"遮阴、灌水和树冠管理不涉及农药安全间隔期。"},"expertReview":{"recommended":false,"triggers":["病斑不集中在向阳面","病斑继续软腐或长霉","大面积果实受害"]},"plainLanguage":{"shortName":"疑似日灼","summary":"果实朝太阳的一面被高温晒伤，会先变黄白，再变褐变硬。","nextStep":"拍整树受光方向，先稳住水分，避免突然重剪。"},"aiReview":{"requiredEvidence":["病斑集中在向阳面","高温强光或重剪背景"],"rejectIf":["病斑在背阴面同样发生","病斑扩展并出现霉层或橙红小点"],"confidenceCap":0.88},"sourceRefs":["uf-ifas-citrus","cabi-plantwise"]},{"id":"citrus-iron-deficiency","crop":"柑橘","problem":"缺铁","aliases":["铁素不足","黄化缺铁"],"category":"nutrient","riskLevel":"medium","symptoms":["新叶先出现叶脉间黄化，细叶脉仍保持绿色，形成较规则网纹","严重时新叶接近黄白色而老叶相对较绿","同一枝梢的新叶症状较一致"],"possibleCauses":["石灰性或高 pH 土壤使铁有效性降低","积水、根腐、低温或根系受损影响铁吸收","并不一定是土壤总铁含量不足"],"lookalikes":["黄龙病","缺锌","缺锰","根腐"],"captureParts":["拍新叶和老叶对比","拍叶片左右两侧是否对称","拍整枝和整树分布","拍根系并提供土壤 pH"],"actionWindow":"发现新梢持续黄化后 1 周内检查根区和土壤。","recommendedActions":{"immediate":["检查排水、根系和土壤 pH","比较叶片黄化是否左右对称","有条件时进行叶片和土壤检测"],"followUp":["确认后依据土壤条件和当地技术意见调整铁营养","改善根区后观察下一批新叶"],"chemicalBoundary":"这是营养吸收问题，不使用农药；铁肥种类和用量需结合 pH、根系和检测。"},"doNot":["不要把所有斑驳黄叶都判为缺铁","不要在根腐或积水未解决时只补铁","不要因黄化对称就完全排除其他问题"],"safeInterval":{"policy":"not_applicable","displayText":"营养调整不涉及农药安全间隔期。"},"expertReview":{"recommended":true,"triggers":["黄化明显不对称","果实畸形或着色不均","发现柑橘木虱","根系腐烂","调整后新叶仍黄化"]},"plainLanguage":{"shortName":"可能缺铁","summary":"新叶先变黄、细叶脉还绿，而且左右较对称，可能是铁吸收不好。","nextStep":"先查排水、根和土壤酸碱度；若黄得左右不一样，要排查黄龙病。"},"aiReview":{"requiredEvidence":["新叶先叶脉间黄化","网纹较规则且左右相对对称"],"rejectIf":["黄化明显不对称","伴随畸形果和木虱证据"],"confidenceCap":0.72},"sourceRefs":["uf-ifas-citrus","cabi-plantwise"]}]}');

/***/ })

}]);
//# sourceMappingURL=common.js.map