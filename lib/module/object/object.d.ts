/**
 * 浅合并对象。写法同 Object.assign
 * 通过重定义方式合并，解决 Object.assign 合并两边同名属性混有 value写法 和 get/set写法 时报 TypeError: Cannot set property b of #<Object> which has only a getter 的问题
 * @param target {object} 目标对象
 * @param sources {any[]} 数据源。一个或多个对象
 * @returns {*}
 */
export declare function assign(target?: {}, ...sources: any[]): {};
/**
 * 深合并对象。同 assign 一样也会对属性进行重定义
 * @param target {object} 目标对象。默认值 {} 防止递归时报 TypeError: Object.defineProperty called on non-object
 * @param sources {any[]} 数据源。一个或多个对象
 */
export declare function deepAssign(target?: Record<string, any>, ...sources: any[]): Record<string, any>;
/**
 * 深复制对象
 * @param value 输入的值，判断是否对象
 * @returns {boolean}
 */
export declare function deepCopy(obj: any): any;
