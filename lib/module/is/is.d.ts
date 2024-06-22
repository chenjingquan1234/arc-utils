declare const _default: {
    aaa(a: string): string;
    is(val: unknown, type: string): boolean;
    isDef<T = unknown>(val?: T | undefined): val is T;
    isUnDef<T_1 = unknown>(val?: T_1 | undefined): val is T_1;
    isObject(val: any): val is Record<any, any>;
    /**
     * 是否为空
     * @param val
     * @returns
     */
    isEmpty<T_2 = unknown>(val: T_2): val is T_2;
    /**
     * 是否不为空
     * @param val
     * @returns
     */
    isNotEmpty<T_3 = unknown>(val: T_3): val is T_3;
    /**
     * 是否日期类型
     * @param val
     * @returns
     */
    isDate(val: unknown): val is Date;
    /**
     * 是否为null
     * @param val
     * @returns
     */
    isNull(val: unknown): val is null;
    isNullAndUnDef(val: unknown): val is null | undefined;
    isNullOrUnDef(val: unknown): val is null | undefined;
    /**
     * 是否为数字
     * @param val
     * @returns
     */
    isNumber(val: unknown): val is number;
    isPromise<T_4 = any>(val: unknown): val is Promise<T_4>;
    isString(val: unknown): val is string;
    isFunction(val: unknown): val is () => void;
    isBoolean(val: unknown): val is boolean;
    isRegExp(val: unknown): val is RegExp;
    isArray(val: any): val is any[];
    isWindow(val: any): val is Window;
    isElement(val: unknown): val is Element;
    isMap(val: unknown): val is Map<any, any>;
    isServer: boolean;
    isClient: boolean;
    isUrl(path: string): boolean;
    isDark(): boolean;
    isImgPath(path: string): boolean;
    isEmptyVal(val: any): boolean;
};
export default _default;
