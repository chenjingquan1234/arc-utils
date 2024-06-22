const toString = Object.prototype.toString;

export default {
  aaa(a: string) {
    return a;
  },
  is(val: unknown, type: string) {
    return toString.call(val) === `[object ${type}]`;
  },

  isDef<T = unknown>(val?: T): val is T {
    return typeof val !== "undefined";
  },

  isUnDef<T = unknown>(val?: T): val is T {
    return !this.isDef(val);
  },

  isObject(val: any): val is Record<any, any> {
    return val !== null && this.is(val, "Object");
  },

  /**
   * 是否为空
   * @param val
   * @returns
   */
  isEmpty<T = unknown>(val: T): val is T {
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
  isNotEmpty<T = unknown>(val: T): val is T {
    return !this.isEmpty(val);
  },

  /**
   * 是否日期类型
   * @param val
   * @returns
   */
  isDate(val: unknown): val is Date {
    return this.is(val, "Date");
  },

  /**
   * 是否为null
   * @param val
   * @returns
   */
  isNull(val: unknown): val is null {
    return val === null;
  },

  isNullAndUnDef(val: unknown): val is null | undefined {
    return this.isUnDef(val) && this.isNull(val);
  },

  isNullOrUnDef(val: unknown): val is null | undefined {
    return this.isUnDef(val) || this.isNull(val);
  },

  /**
   * 是否为数字
   * @param val
   * @returns
   */
  isNumber(val: unknown): val is number {
    return this.is(val, "Number");
  },

  isPromise<T = any>(val: unknown): val is Promise<T> {
    return this.is(val, "Promise") && this.isObject(val) && this.isFunction(val.then) && this.isFunction(val.catch);
  },

  isString(val: unknown): val is string {
    return this.is(val, "String");
  },

  isFunction(val: unknown): val is () => void {
    return typeof val === "function";
  },

  isBoolean(val: unknown): val is boolean {
    return this.is(val, "Boolean");
  },

  isRegExp(val: unknown): val is RegExp {
    return this.is(val, "RegExp");
  },

  isArray(val: any): val is Array<any> {
    return val && Array.isArray(val);
  },

  isWindow(val: any): val is Window {
    return typeof window !== "undefined" && this.is(val, "Window");
  },

  isElement(val: unknown): val is Element {
    return this.isObject(val) && !!val.tagName;
  },

  isMap(val: unknown): val is Map<any, any> {
    return this.is(val, "Map");
  },

  isServer: typeof window === "undefined",

  isClient: typeof window !== "undefined",

  isUrl(path: string): boolean {
    const reg =
      /(((^https?:(?:\/\/)?)(?:[-:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&%@.\w_]*)#?(?:[\w]*))?)$/;
    return reg.test(path);
  },

  isDark(): boolean {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  },

  // 是否是图片链接
  isImgPath(path: string): boolean {
    return /(https?:\/\/|data:image\/).*?\.(png|jpg|jpeg|gif|svg|webp|ico)/gi.test(path);
  },

  isEmptyVal(val: any): boolean {
    return val === "" || val === null || val === undefined;
  },
};
