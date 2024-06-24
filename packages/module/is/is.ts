const toString = Object.prototype.toString;

export const is = (val: unknown, type: string) => {
  return toString.call(val) === `[object ${type}]`;
};

export const isDef = <T = unknown>(val?: T): val is T => {
  return typeof val !== "undefined";
};

export const isUnDef = <T = unknown>(val?: T): val is T => {
  return !isDef(val);
};

export const isObject = (val: any): val is Record<any, any> => {
  return val !== null && is(val, "Object");
};

/**
 * 是否为空
 * @param val
 * @returns
 */
export const isEmpty = <T = unknown>(val: T): val is T => {
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
export const isNotEmpty = <T = unknown>(val: T): val is T => {
  return !isEmpty(val);
};

/**
 * 判断是否对象是空
 * @param value 输入的值
 *  @returns {boolean}
 */
export function isObjEmpty(value: Record<string, any>) {
  if (!isObject(value)) return false;
  return Object.keys(value).length === 0;
}

/**
 * 判断是否对象不为空
 * @param value 输入的值
 * @returns {boolean}
 */
export function isObjNotEmpty(obj: Record<string, any>) {
  if (!isObject(obj)) return false;
  return Object.keys(obj).length > 0;
}

/**
 * 是否日期类型
 * @param val
 * @returns
 */
export const isDate = (val: unknown): val is Date => {
  return is(val, "Date");
};

/**
 * 是否为null
 * @param val
 * @returns
 */
export const isNull = (val: unknown): val is null => {
  return val === null;
};

export const isNullAndUnDef = (val: unknown): val is null | undefined => {
  return isUnDef(val) && isNull(val);
};

export const isNullOrUnDef = (val: unknown): val is null | undefined => {
  return isUnDef(val) || isNull(val);
};

/**
 * 是否为数字
 * @param val
 * @returns
 */
export const isNumber = (val: unknown): val is number => {
  return is(val, "Number");
};

export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
  return is(val, "Promise") && isObject(val) && isFunction(val.then) && isFunction(val.catch);
};

export const isString = (val: unknown): val is string => {
  return is(val, "String");
};

export const isFunction = (val: unknown): val is () => void => {
  return typeof val === "function";
};

export const isBoolean = (val: unknown): val is boolean => {
  return is(val, "Boolean");
};

export const isRegExp = (val: unknown): val is RegExp => {
  return is(val, "RegExp");
};

export const isArray = (val: any): val is Array<any> => {
  return val && Array.isArray(val);
};

export const isWindow = (val: any): val is Window => {
  return typeof window !== "undefined" && is(val, "Window");
};

export const isElement = (val: unknown): val is Element => {
  return isObject(val) && !!val.tagName;
};

export const isMap = (val: unknown): val is Map<any, any> => {
  return is(val, "Map");
};

export const isServer = typeof window === "undefined";

export const isClient = typeof window !== "undefined";

export const isUrl = (path: string): boolean => {
  const reg =
    /(((^https?:(?:\/\/)?)(?:[-:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&%@.\w_]*)#?(?:[\w]*))?)$/;
  return reg.test(path);
};

export const isDark = (): boolean => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

/**
 * 是否是图片链接
 * @param path 图片链接
 * @returns {boolean}
 */
export const isImgPath = (path: string): boolean => {
  return /(https?:\/\/|data:image\/).*?\.(png|jpg|jpeg|gif|svg|webp|ico)/gi.test(path);
};

export const isEmptyVal = (val: any): boolean => {
  return val === "" || val === null || val === undefined;
};
