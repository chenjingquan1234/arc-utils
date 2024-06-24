export declare const test: <T = unknown>(val?: T | undefined) => val is T;
export declare const is: (val: unknown, type: string) => boolean;
export declare const isDef: <T = unknown>(val?: T | undefined) => val is T;
export declare const isUnDef: <T = unknown>(val?: T | undefined) => val is T;
export declare const isObject: (val: any) => val is Record<any, any>;
/**
 * 是否为空
 * @param val
 * @returns
 */
export declare const isEmpty: <T = unknown>(val: T) => val is T;
/**
 * 是否不为空
 * @param val
 * @returns
 */
export declare const isNotEmpty: <T = unknown>(val: T) => val is T;
/**
 * 判断是否对象是空
 * @param value 输入的值
 *  @returns {boolean}
 */
export declare function isObjEmpty(value: Record<string, any>): boolean;
/**
 * 判断是否对象不为空
 * @param value 输入的值
 * @returns {boolean}
 */
export declare function isObjNotEmpty(obj: Record<string, any>): boolean;
/**
 * 是否日期类型
 * @param val
 * @returns
 */
export declare const isDate: (val: unknown) => val is Date;
/**
 * 是否为null
 * @param val
 * @returns
 */
export declare const isNull: (val: unknown) => val is null;
export declare const isNullAndUnDef: (val: unknown) => val is null | undefined;
export declare const isNullOrUnDef: (val: unknown) => val is null | undefined;
/**
 * 是否为数字
 * @param val
 * @returns
 */
export declare const isNumber: (val: unknown) => val is number;
export declare const isPromise: <T = any>(val: unknown) => val is Promise<T>;
export declare const isString: (val: unknown) => val is string;
export declare const isFunction: (val: unknown) => val is () => void;
export declare const isBoolean: (val: unknown) => val is boolean;
export declare const isRegExp: (val: unknown) => val is RegExp;
export declare const isArray: (val: any) => val is any[];
export declare const isWindow: (val: any) => val is Window;
export declare const isElement: (val: unknown) => val is Element;
export declare const isMap: (val: unknown) => val is Map<any, any>;
export declare const isServer: boolean;
export declare const isClient: boolean;
export declare const isUrl: (path: string) => boolean;
export declare const isDark: () => boolean;
/**
 * 是否是图片链接
 * @param path 图片链接
 * @returns {boolean}
 */
export declare const isImgPath: (path: string) => boolean;
export declare const isEmptyVal: (val: any) => boolean;
