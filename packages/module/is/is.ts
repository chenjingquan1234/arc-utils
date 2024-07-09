const toString = Object.prototype.toString;

/**
 * 判断值类型
 * @param val 值
 * @param type 类型
 * @returns {boolean}
 */
export const is = (val: unknown, type: string) => {
  return toString.call(val) === `[object ${type}]`;
};

/**
 * 判断undefined
 * @param val 值
 * @returns {boolean}
 */
export const isDef = <T = unknown>(val?: T): val is T => {
  return typeof val !== "undefined";
};

/**
 * 判断值不是undefined
 * @param val 值
 * @returns {boolean}
 */
export const isUnDef = <T = unknown>(val?: T): val is T => {
  return !isDef(val);
};

/**
 * 判断是否object
 * @param val 值
 * @returns {boolean}
 */
export const isObject = (val: any): val is Record<any, any> => {
  return val !== null && is(val, "Object");
};

/**
 * 是否为空，适用于null，undefined，空字符串，map，set，数组
 * @param val
 * @returns {boolean}
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
 * 是否不为空，适用于null，undefined，空字符串，map，set，数组
 * @param val
 * @returns {boolean}
 */
export const isNotEmpty = <T = unknown>(val: T): val is T => {
  return !isEmpty(val);
};

/**
 * 是否日期类型
 * @param val
 * @returns {boolean}
 */
export const isDate = (val: unknown): val is Date => {
  return is(val, "Date");
};

/**
 * 是否为null
 * @param val
 * @returns {boolean}
 */
export const isNull = (val: unknown): val is null => {
  return val === null;
};

/**
 * 不为 undefined && 是null
 * @param val
 * @returns {boolean}
 */
export const isNullAndUnDef = (val: unknown): val is null | undefined => {
  return isUnDef(val) && isNull(val);
};

/**
 * null || undefined
 * @param val
 * @returns {boolean}
 */
export const isNullOrUnDef = (val: unknown): val is null | undefined => {
  return isUnDef(val) || isNull(val);
};

/**
 * 是否为数字
 * @param val
 * @returns {boolean}
 */
export const isNumber = (val: unknown): val is number => {
  return is(val, "Number");
};

/**
 * 是否为promise函数
 * @param val
 * @returns {boolean}
 */
export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
  return is(val, "Promise") && isObject(val) && isFunction(val.then) && isFunction(val.catch);
};

/**
 * 是否为字符串
 * @param val
 * @returns {boolean}
 */
export const isString = (val: unknown): val is string => {
  return is(val, "String");
};

/**
 * 是否为函数
 * @param val
 * @returns {boolean}
 */
export const isFunction = (val: unknown): val is () => void => {
  return typeof val === "function";
};

/**
 * 是否为布尔值
 * @param val
 * @returns {boolean}
 */
export const isBoolean = (val: unknown): val is boolean => {
  return is(val, "Boolean");
};

/**
 * 是否为正则
 * @param val
 * @returns {boolean}
 */
export const isRegExp = (val: unknown): val is RegExp => {
  return is(val, "RegExp");
};

/**
 * 是否为数组
 * @param val
 * @returns {boolean}
 */
export const isArray = (val: any): val is Array<any> => {
  return val && Array.isArray(val);
};

/**
 * 判断值是不是 window对象
 * @param val
 * @returns {boolean}
 */
export const isWindow = (val: any): val is Window => {
  return typeof window !== "undefined" && is(val, "Window");
};

/**
 * 判断值是不是 element节点
 * @param val
 * @returns {boolean}
 */
export const isElement = (val: unknown): val is Element => {
  return isObject(val) && !!val.tagName;
};

/**
 * 判断值是不是map对象
 * @param val
 * @returns {boolean}
 */
export const isMap = (val: unknown): val is Map<any, any> => {
  return is(val, "Map");
};

/**
 * 是否服务端
 */
export const isServer = typeof window === "undefined";

/**
 * 是否客户端
 */
export const isClient = typeof window !== "undefined";

/**
 * 判断值是不是https域名
 * @param val
 * @returns {boolean}
 */
export const isUrl = (path: string): boolean => {
  const reg =
    /(((^https?:(?:\/\/)?)(?:[-:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&%@.\w_]*)#?(?:[\w]*))?)$/;
  return reg.test(path);
};

/**
 * 是否是图片链接
 * @param path 图片链接
 * @returns {boolean}
 */
export const isImgPath = (path: string): boolean => {
  return /(https?:\/\/|data:image\/).*?\.(png|jpg|jpeg|gif|svg|webp|ico)/gi.test(path);
};
