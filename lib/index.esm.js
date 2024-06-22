// copy to vben-admin
var toString = Object.prototype.toString;
var is = {
    aaa: function (a) {
        return a;
    },
    is: function (val, type) {
        return toString.call(val) === "[object ".concat(type, "]");
    },
    isDef: function (val) {
        return typeof val !== "undefined";
    },
    isUnDef: function (val) {
        return !this.isDef(val);
    },
    isObject: function (val) {
        return val !== null && this.is(val, "Object");
    },
    /**
     * 是否为空
     * @param val
     * @returns
     */
    isEmpty: function (val) {
        if (val === null) {
            return true;
        }
        if (val === undefined) {
            return true;
        }
        if (this.isArray(val) || this.isString(val)) {
            return val.length === 0;
        }
        if (val instanceof Map || val instanceof Set) {
            return val.size === 0;
        }
        if (this.isObject(val)) {
            return Object.keys(val).length === 0;
        }
        return false;
    },
    /**
     * 是否不为空
     * @param val
     * @returns
     */
    isNotEmpty: function (val) {
        return !this.isEmpty(val);
    },
    /**
     * 是否日期类型
     * @param val
     * @returns
     */
    isDate: function (val) {
        return this.is(val, "Date");
    },
    /**
     * 是否为null
     * @param val
     * @returns
     */
    isNull: function (val) {
        return val === null;
    },
    isNullAndUnDef: function (val) {
        return this.isUnDef(val) && this.isNull(val);
    },
    isNullOrUnDef: function (val) {
        return this.isUnDef(val) || this.isNull(val);
    },
    /**
     * 是否为数字
     * @param val
     * @returns
     */
    isNumber: function (val) {
        return this.is(val, "Number");
    },
    isPromise: function (val) {
        return this.is(val, "Promise") && this.isObject(val) && this.isFunction(val.then) && this.isFunction(val.catch);
    },
    isString: function (val) {
        return this.is(val, "String");
    },
    isFunction: function (val) {
        return typeof val === "function";
    },
    isBoolean: function (val) {
        return this.is(val, "Boolean");
    },
    isRegExp: function (val) {
        return this.is(val, "RegExp");
    },
    isArray: function (val) {
        return val && Array.isArray(val);
    },
    isWindow: function (val) {
        return typeof window !== "undefined" && this.is(val, "Window");
    },
    isElement: function (val) {
        return this.isObject(val) && !!val.tagName;
    },
    isMap: function (val) {
        return this.is(val, "Map");
    },
    isServer: typeof window === "undefined",
    isClient: typeof window !== "undefined",
    isUrl: function (path) {
        var reg = /(((^https?:(?:\/\/)?)(?:[-:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&%@.\w_]*)#?(?:[\w]*))?)$/;
        return reg.test(path);
    },
    isDark: function () {
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    },
    // 是否是图片链接
    isImgPath: function (path) {
        return /(https?:\/\/|data:image\/).*?\.(png|jpg|jpeg|gif|svg|webp|ico)/gi.test(path);
    },
    isEmptyVal: function (val) {
        return val === "" || val === null || val === undefined;
    }
};

export { is };
