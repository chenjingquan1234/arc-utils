'use strict';

var moment = require('moment');
var axios = require('axios');

/**
 * 时间戳转日期
 * @param timestamp 时间戳
 * @param format 格式 默认Y-M-D h:m:s
 */
function timestampToTime(timestamp, format) {
    if (format === void 0) { format = "Y-M-D h:m:s"; }
    var date = new Date(timestamp);
    var obj = {
        Y: date.getFullYear(),
        M: date.getMonth() + 1 < 10 ? "0".concat(date.getMonth() + 1) : date.getMonth() + 1,
        D: date.getDate() < 10 ? "0".concat(date.getDate()) : date.getDate(),
        h: date.getHours() < 10 ? "0".concat(date.getHours()) : date.getHours(),
        m: date.getMinutes() < 10 ? "0".concat(date.getMinutes()) : date.getMinutes(),
        s: date.getSeconds() < 10 ? "0".concat(date.getSeconds()) : date.getSeconds(),
    };
    var newitem = format.split("").map(function (item) {
        for (var key in obj) {
            if (item === key) {
                item = obj[key].toString();
            }
        }
        return item;
    });
    return newitem.join("");
}
/**
 * 判断一个值是否是时间戳
 * @param value 时间戳
 */
function isTimestamp(value) {
    if (isNaN(value)) {
        return false;
    }
    var date = new Date(Number(value));
    return value === date.getTime();
}
/**
 * 日期转时间戳
 * @param date
 */
function timesToStamp(date) {
    return Date.parse("".concat(+new Date(date))) / 1000;
}
/**
 * 转换日期为Moment对象
 * @param timestamp 时间戳
 */
function getDateMoment(timestamp) {
    if (!timestamp) {
        return null;
    }
    var value = timestampToTime(timestamp).replace(/\-/g, "/");
    return moment(new Date(value));
}
/**
 * 转换日期
 * @param timestamp 时间戳
 * @param format 格式
 */
function getDateStr(timestamp, format) {
    if (format === void 0) { format = "YYYY-MM-DD HH:mm:ss"; }
    var momentObj = getDateMoment(+timestamp);
    if (!momentObj) {
        return "-";
    }
    return momentObj.format(format);
}

// tips：此文件是自动生成的，无需手动添加

var index$5 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getDateMoment: getDateMoment,
    getDateStr: getDateStr,
    isTimestamp: isTimestamp,
    timesToStamp: timesToStamp,
    timestampToTime: timestampToTime
});

/**
 * 输入具体下标，脱敏下标范围的值
 * @param input 输入值
 * @param maskIndexes 需要脱敏的下标值
 * @returns
 */
function desensitizeValue(input, maskIndexes) {
    if (!input)
        return "";
    var length = input.length;
    // 如果未提供脱敏下标数组，则默认对整个输入值进行全脱敏
    if (!maskIndexes || maskIndexes.length === 0) {
        return "*".repeat(length);
    }
    // 创建一个标记数组，用于标记需要脱敏的位置
    var shouldMask = new Array(length).fill(false);
    // 将指定的脱敏下标位置设为 true
    maskIndexes.forEach(function (index) {
        if (index >= 0 && index < length) {
            shouldMask[index] = true;
        }
    });
    // 生成脱敏后的值
    var desensitizedValue = "";
    for (var i = 0; i < length; i++) {
        desensitizedValue += shouldMask[i] ? "*" : input[i];
    }
    return desensitizedValue;
}

// tips：此文件是自动生成的，无需手动添加

var index$4 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    desensitizeValue: desensitizeValue
});

var toString = Object.prototype.toString;
var test = function (val) {
    return typeof val !== "undefined";
};
var is = function (val, type) {
    return toString.call(val) === "[object ".concat(type, "]");
};
var isDef = function (val) {
    return typeof val !== "undefined";
};
var isUnDef = function (val) {
    return !isDef(val);
};
var isObject = function (val) {
    return val !== null && is(val, "Object");
};
/**
 * 是否为空
 * @param val
 * @returns
 */
var isEmpty = function (val) {
    if (val === null) {
        return true;
    }
    if (val === undefined) {
        return true;
    }
    if (isArray(val) || isString(val)) {
        return val.length === 0;
    }
    if (val instanceof Map || val instanceof Set) {
        return val.size === 0;
    }
    if (isObject(val)) {
        return Object.keys(val).length === 0;
    }
    return false;
};
/**
 * 是否不为空
 * @param val
 * @returns
 */
var isNotEmpty = function (val) {
    return !isEmpty(val);
};
/**
 * 判断是否对象是空
 * @param value 输入的值
 *  @returns {boolean}
 */
function isObjEmpty(value) {
    if (!isObject(value))
        return false;
    return Object.keys(value).length === 0;
}
/**
 * 判断是否对象不为空
 * @param value 输入的值
 * @returns {boolean}
 */
function isObjNotEmpty(obj) {
    if (!isObject(obj))
        return false;
    return Object.keys(obj).length > 0;
}
/**
 * 是否日期类型
 * @param val
 * @returns
 */
var isDate = function (val) {
    return is(val, "Date");
};
/**
 * 是否为null
 * @param val
 * @returns
 */
var isNull = function (val) {
    return val === null;
};
var isNullAndUnDef = function (val) {
    return isUnDef(val) && isNull(val);
};
var isNullOrUnDef = function (val) {
    return isUnDef(val) || isNull(val);
};
/**
 * 是否为数字
 * @param val
 * @returns
 */
var isNumber = function (val) {
    return is(val, "Number");
};
var isPromise = function (val) {
    return is(val, "Promise") && isObject(val) && isFunction(val.then) && isFunction(val.catch);
};
var isString = function (val) {
    return is(val, "String");
};
var isFunction = function (val) {
    return typeof val === "function";
};
var isBoolean = function (val) {
    return is(val, "Boolean");
};
var isRegExp = function (val) {
    return is(val, "RegExp");
};
var isArray = function (val) {
    return val && Array.isArray(val);
};
var isWindow = function (val) {
    return typeof window !== "undefined" && is(val, "Window");
};
var isElement = function (val) {
    return isObject(val) && !!val.tagName;
};
var isMap = function (val) {
    return is(val, "Map");
};
var isServer = typeof window === "undefined";
var isClient = typeof window !== "undefined";
var isUrl = function (path) {
    var reg = /(((^https?:(?:\/\/)?)(?:[-:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&%@.\w_]*)#?(?:[\w]*))?)$/;
    return reg.test(path);
};
var isDark = function () {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
};
/**
 * 是否是图片链接
 * @param path 图片链接
 * @returns {boolean}
 */
var isImgPath = function (path) {
    return /(https?:\/\/|data:image\/).*?\.(png|jpg|jpeg|gif|svg|webp|ico)/gi.test(path);
};
var isEmptyVal = function (val) {
    return val === "" || val === null || val === undefined;
};

// tips：此文件是自动生成的，无需手动添加

var index$3 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    is: is,
    isArray: isArray,
    isBoolean: isBoolean,
    isClient: isClient,
    isDark: isDark,
    isDate: isDate,
    isDef: isDef,
    isElement: isElement,
    isEmpty: isEmpty,
    isEmptyVal: isEmptyVal,
    isFunction: isFunction,
    isImgPath: isImgPath,
    isMap: isMap,
    isNotEmpty: isNotEmpty,
    isNull: isNull,
    isNullAndUnDef: isNullAndUnDef,
    isNullOrUnDef: isNullOrUnDef,
    isNumber: isNumber,
    isObjEmpty: isObjEmpty,
    isObjNotEmpty: isObjNotEmpty,
    isObject: isObject,
    isPromise: isPromise,
    isRegExp: isRegExp,
    isServer: isServer,
    isString: isString,
    isUnDef: isUnDef,
    isUrl: isUrl,
    isWindow: isWindow,
    test: test
});

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * 浅合并对象。写法同 Object.assign
 * 通过重定义方式合并，解决 Object.assign 合并两边同名属性混有 value写法 和 get/set写法 时报 TypeError: Cannot set property b of #<Object> which has only a getter 的问题
 * @param target {object} 目标对象
 * @param sources {any[]} 数据源。一个或多个对象
 * @returns {*}
 */
function assign(target) {
    if (target === void 0) { target = {}; }
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    for (var _a = 0, sources_1 = sources; _a < sources_1.length; _a++) {
        var source = sources_1[_a];
        // 不使用 target[key]=value 写法，直接使用desc重定义
        for (var _b = 0, _c = Object.entries(Object.getOwnPropertyDescriptors(source)); _b < _c.length; _b++) {
            var _d = _c[_b], key = _d[0], desc = _d[1];
            Object.defineProperty(target, key, desc);
        }
    }
    return target;
}
/**
 * 深合并对象。同 assign 一样也会对属性进行重定义
 * @param target {object} 目标对象。默认值 {} 防止递归时报 TypeError: Object.defineProperty called on non-object
 * @param sources {any[]} 数据源。一个或多个对象
 */
function deepAssign(target) {
    if (target === void 0) { target = {}; }
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    for (var _a = 0, sources_2 = sources; _a < sources_2.length; _a++) {
        var source = sources_2[_a];
        for (var _b = 0, _c = Object.entries(Object.getOwnPropertyDescriptors(source)); _b < _c.length; _b++) {
            var _d = _c[_b], key = _d[0], desc = _d[1];
            if ("value" in desc) {
                // value写法：对象递归处理，其他直接定义
                if (isObject(desc.value)) {
                    Object.defineProperty(target, key, __assign(__assign({}, desc), { value: deepAssign(target[key], desc.value) }));
                }
                else {
                    Object.defineProperty(target, key, desc);
                }
            }
            else {
                // get/set写法：直接定义
                Object.defineProperty(target, key, desc);
            }
        }
    }
    return target;
}
/**
 * 深复制对象
 * @param value 输入的值，判断是否对象
 * @returns {boolean}
 */
function deepCopy(obj) {
    if (typeof obj !== "object" || obj === null) {
        return obj;
    }
    var copy = Array.isArray(obj) ? [] : {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            copy[key] = deepCopy(obj[key]);
        }
    }
    return copy;
}

// tips：此文件是自动生成的，无需手动添加

var index$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    assign: assign,
    deepAssign: deepAssign,
    deepCopy: deepCopy
});

var local = {
    getItem: function (key) {
        var res = localStorage.getItem(key);
        return JSON.parse(res);
    },
    setItem: function (key, param) {
        localStorage.setItem(key, JSON.stringify(param));
    },
};
var session = {
    getItem: function (key) {
        var res = sessionStorage.getItem(key);
        return JSON.parse(res);
    },
    setItem: function (key, param) {
        sessionStorage.setItem(key, JSON.stringify(param));
    },
};

// tips：此文件是自动生成的，无需手动添加

var index$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    local: local,
    session: session
});

/**
 * 获取url上的参数
 * @returns {object}
 */
function getUrlQuery() {
    var _a = location.search.split("?"), query = _a[1];
    if (!query)
        return {};
    var queryParams = query.split("&").reduce(function (p, c) {
        var _a = c.split("="), key = _a[0], value = _a[1];
        p[key] = value;
        return p;
    }, {});
    return queryParams;
}
/**
 * 把对象转成url参数，比如 "a=1&b=2"
 * @returns {object}
 */
function objToQueryString(obj) {
    var queryParams = [];
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            var value = obj[key];
            var encodedKey = encodeURIComponent(key);
            var encodedValue = encodeURIComponent(value);
            queryParams.push("".concat(encodedKey, "=").concat(encodedValue));
        }
    }
    return queryParams.join("&");
}
/**
 * 下载文件到电脑
 * @param url // 文件链接
 * @param name // 文件名
 * @returns {*|string}
 */
function downLoadFile(url, name) {
    axios(url, {
        responseType: "blob",
    }).then(function (res) {
        // { type: 'application/vnd.ms-excel;charset=utf-8' }
        // const blob = new Blob([res.data]);
        var blob = res.data;
        var url = window.URL.createObjectURL(blob);
        var link = document.createElement("a");
        link.href = url;
        var fileName = name || "文件";
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
    });
}
var base64ImgPrefix = "data:image/png;base64,";
//拿值相关函数-------------------------------------------------------------
/**
 * 获取列表排序序号  1 2 3 4 5...
 * @param index 索引值
 * @param pageNum 当前页码
 * @param pageSize 每页页数 默认10
 */
function getOrdinalKey(index, pageNum, pageSize) {
    if (index === void 0) { index = 0; }
    if (pageNum === void 0) { pageNum = 1; }
    if (pageSize === void 0) { pageSize = 10; }
    return pageSize * (pageNum - 1) + index + 1;
}
/**
 * 根据id得到name值
 * @param list
 * @param id
 * @returns {*|string}
 */
function findIdName(list, id) {
    var findItem = list.find(function (item) { return item.id == id; });
    return (findItem === null || findItem === void 0 ? void 0 : findItem.name) || "-";
}
/**
 * 根据id得到Item
 * @param list
 * @param id
 * @returns {*|string}
 */
function findIdItem(list, id) {
    var findItem = list.find(function (item) { return item.id == id; });
    return findItem || {};
}
/**
 * 拿部门，角色，人员名称
 * @param list
 * @param id
 * @returns {*|string}
 */
function getOrgName(item) {
    return item.username || item.deptName || item.roleItem || "";
}
/**
 * 根据id得到Item
 * @param obj 对象
 * @param expression 表达式 aa.bb.cc
 * @returns {*|string}
 */
function getValueByExpression(obj, expression) {
    var keys = expression.split(".");
    var value = obj;
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        if (value && typeof value === "object" && key in value) {
            value = value[key];
        }
        else {
            return undefined;
        }
    }
    return value;
}
// 树相关的逻辑 --------------------------------------------------------
/**
 * 遍历树结构，并对每一项做回调处理
 * @param treeData //树数据，可以是对象或者数组
 * @param callback // 回调函数
 * @param config.children // children名称
 * @param config.additional // 附加的参数
 *
 */
function forEachTree(treeData, callback, config) {
    if (!treeData)
        return;
    var _a = config || {}, _b = _a.children, children = _b === void 0 ? "list" : _b, _c = _a.additional, additional = _c === void 0 ? {} : _c;
    var loop = function (data, additional) {
        callback && callback(data, additional);
        if (data[children] && data[children].length) {
            data[children].forEach(function (item) { return loop(item, additional); });
        }
    };
    var loop2 = function (array, additional) {
        if (array.length === 0)
            return;
        array.forEach(function (item) {
            callback && callback(item, additional);
            if (item[children] && item[children].length) {
                loop2(item[children], additional);
            }
        });
    };
    Object.prototype.toString.call(treeData) === "[object Array]" ? loop2(treeData, additional) : loop(treeData, additional);
}
/**
 * 获取树的id映射,浅拷贝来的
 */
function getTreeMap(treeData, config) {
    var _a = config || {}, _b = _a.key, key = _b === void 0 ? "id" : _b, _c = _a.children, children = _c === void 0 ? "children" : _c;
    var treeMap = {};
    forEachTree(treeData, function (item) {
        treeMap[item[key]] = item;
    }, {
        children: children,
        additional: {},
    });
    return treeMap;
}
/**
 * 获取树的链路
 */
function getTreeLink(param) {
    var treeData = param.treeData, id = param.id, config = param.config;
    var _a = config || {}, _b = _a.key, key = _b === void 0 ? "id" : _b; _a.children;
    function findPath(root, targetId) {
        // 辅助递归函数
        function findPathHelper(node, targetId, path) {
            // 如果当前节点为空，则返回空路径
            if (!node)
                return null;
            // 当前节点匹配目标节点
            if (node[key] === targetId) {
                path.push(node);
                return path;
            }
            // 在子节点中递归查找
            for (var _i = 0, _a = (node === null || node === void 0 ? void 0 : node.children) || []; _i < _a.length; _i++) {
                var child = _a[_i];
                var newPath = findPathHelper(child, targetId, __spreadArray(__spreadArray([], path, true), [node], false));
                if (newPath)
                    return newPath;
            }
            return null; // 没有找到目标节点
        }
        // 遍历树中的每个节点，调用辅助函数进行查找
        for (var _i = 0, root_1 = root; _i < root_1.length; _i++) {
            var node = root_1[_i];
            var path = findPathHelper(node, targetId, []);
            if (path)
                return path;
        }
    }
    var treeLink = findPath(treeData, id);
    return treeLink;
}
// 过滤树结构的函数
function filterTree(tree, callback) {
    // 辅助函数，用于递归过滤
    function filterNode(node, callback) {
        var _a;
        if (!node)
            return null;
        // 检查当前节点是否符合条件
        if (callback(node)) {
            // 如果符合条件，则递归过滤子节点
            var filteredChildren = (_a = node.children) === null || _a === void 0 ? void 0 : _a.map(function (child) { return filterNode(child, callback); }).filter(Boolean);
            return __assign(__assign({ id: node.id }, node), { children: filteredChildren });
        }
        else {
            // 如果不符合条件，则递归过滤子节点并返回空
            return null;
        }
    }
    // 遍历树中的每个节点，调用辅助函数开始过滤
    return tree.map(function (node) { return filterNode(node, callback); }).filter(Boolean);
}

// tips：此文件是自动生成的，无需手动添加

var index = /*#__PURE__*/Object.freeze({
    __proto__: null,
    base64ImgPrefix: base64ImgPrefix,
    downLoadFile: downLoadFile,
    filterTree: filterTree,
    findIdItem: findIdItem,
    findIdName: findIdName,
    forEachTree: forEachTree,
    getOrdinalKey: getOrdinalKey,
    getOrgName: getOrgName,
    getTreeLink: getTreeLink,
    getTreeMap: getTreeMap,
    getUrlQuery: getUrlQuery,
    getValueByExpression: getValueByExpression,
    objToQueryString: objToQueryString
});

exports.assign = assign;
exports.base64ImgPrefix = base64ImgPrefix;
exports.dateUtil = index$5;
exports.deepAssign = deepAssign;
exports.deepCopy = deepCopy;
exports.desensitizeUtil = index$4;
exports.desensitizeValue = desensitizeValue;
exports.downLoadFile = downLoadFile;
exports.filterTree = filterTree;
exports.findIdItem = findIdItem;
exports.findIdName = findIdName;
exports.forEachTree = forEachTree;
exports.getDateMoment = getDateMoment;
exports.getDateStr = getDateStr;
exports.getOrdinalKey = getOrdinalKey;
exports.getOrgName = getOrgName;
exports.getTreeLink = getTreeLink;
exports.getTreeMap = getTreeMap;
exports.getUrlQuery = getUrlQuery;
exports.getValueByExpression = getValueByExpression;
exports.is = is;
exports.isArray = isArray;
exports.isBoolean = isBoolean;
exports.isClient = isClient;
exports.isDark = isDark;
exports.isDate = isDate;
exports.isDef = isDef;
exports.isElement = isElement;
exports.isEmpty = isEmpty;
exports.isEmptyVal = isEmptyVal;
exports.isFunction = isFunction;
exports.isImgPath = isImgPath;
exports.isMap = isMap;
exports.isNotEmpty = isNotEmpty;
exports.isNull = isNull;
exports.isNullAndUnDef = isNullAndUnDef;
exports.isNullOrUnDef = isNullOrUnDef;
exports.isNumber = isNumber;
exports.isObjEmpty = isObjEmpty;
exports.isObjNotEmpty = isObjNotEmpty;
exports.isObject = isObject;
exports.isPromise = isPromise;
exports.isRegExp = isRegExp;
exports.isServer = isServer;
exports.isString = isString;
exports.isTimestamp = isTimestamp;
exports.isUnDef = isUnDef;
exports.isUrl = isUrl;
exports.isUtil = index$3;
exports.isWindow = isWindow;
exports.local = local;
exports.objToQueryString = objToQueryString;
exports.objectUtil = index$2;
exports.session = session;
exports.storageUtil = index$1;
exports.test = test;
exports.timesToStamp = timesToStamp;
exports.timestampToTime = timestampToTime;
exports.toolUtil = index;
