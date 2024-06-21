!(function (i, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? t(exports)
    : "function" == typeof define && define.amd
    ? define(["exports"], t)
    : t(
        ((i =
          "undefined" != typeof globalThis ? globalThis : i || self).$utils =
          {})
      );
})(this, function (i) {
  "use strict";
  var t = Object.prototype.toString,
    n = {
      is: function (i, n) {
        return t.call(i) === "[object ".concat(n, "]");
      },
      isDef: function (i) {
        return void 0 !== i;
      },
      isUnDef: function (i) {
        return !this.isDef(i);
      },
      isObject: function (i) {
        return null !== i && this.is(i, "Object");
      },
      isEmpty: function (i) {
        return (
          null === i ||
          void 0 === i ||
          (this.isArray(i) || this.isString(i)
            ? 0 === i.length
            : i instanceof Map || i instanceof Set
            ? 0 === i.size
            : !!this.isObject(i) && 0 === Object.keys(i).length)
        );
      },
      isNotEmpty: function (i) {
        return !this.isEmpty(i);
      },
      isDate: function (i) {
        return this.is(i, "Date");
      },
      isNull: function (i) {
        return null === i;
      },
      isNullAndUnDef: function (i) {
        return this.isUnDef(i) && this.isNull(i);
      },
      isNullOrUnDef: function (i) {
        return this.isUnDef(i) || this.isNull(i);
      },
      isNumber: function (i) {
        return this.is(i, "Number");
      },
      isPromise: function (i) {
        return (
          this.is(i, "Promise") &&
          this.isObject(i) &&
          this.isFunction(i.then) &&
          this.isFunction(i.catch)
        );
      },
      isString: function (i) {
        return this.is(i, "String");
      },
      isFunction: function (i) {
        return "function" == typeof i;
      },
      isBoolean: function (i) {
        return this.is(i, "Boolean");
      },
      isRegExp: function (i) {
        return this.is(i, "RegExp");
      },
      isArray: function (i) {
        return i && Array.isArray(i);
      },
      isWindow: function (i) {
        return "undefined" != typeof window && this.is(i, "Window");
      },
      isElement: function (i) {
        return this.isObject(i) && !!i.tagName;
      },
      isMap: function (i) {
        return this.is(i, "Map");
      },
      isServer: "undefined" == typeof window,
      isClient: "undefined" != typeof window,
      isUrl: function (i) {
        return /(((^https?:(?:\/\/)?)(?:[-:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&%@.\w_]*)#?(?:[\w]*))?)$/.test(
          i
        );
      },
      isDark: function () {
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
      },
      isImgPath: function (i) {
        return /(https?:\/\/|data:image\/).*?\.(png|jpg|jpeg|gif|svg|webp|ico)/gi.test(
          i
        );
      },
      isEmptyVal: function (i) {
        return "" === i || null == i;
      },
    };
  i.is = n;
});
