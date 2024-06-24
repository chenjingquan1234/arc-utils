import { isObject } from "../is/is";

/**
 * 浅合并对象。写法同 Object.assign
 * 通过重定义方式合并，解决 Object.assign 合并两边同名属性混有 value写法 和 get/set写法 时报 TypeError: Cannot set property b of #<Object> which has only a getter 的问题
 * @param target {object} 目标对象
 * @param sources {any[]} 数据源。一个或多个对象
 * @returns {*}
 */
export function assign(target = {}, ...sources: any[]) {
  for (const source of sources) {
    // 不使用 target[key]=value 写法，直接使用desc重定义
    for (const [key, desc] of Object.entries(Object.getOwnPropertyDescriptors(source))) {
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
export function deepAssign(target: Record<string, any> = {}, ...sources: any[]) {
  for (const source of sources) {
    for (const [key, desc] of Object.entries(Object.getOwnPropertyDescriptors(source))) {
      if ("value" in desc) {
        // value写法：对象递归处理，其他直接定义
        if (isObject(desc.value)) {
          Object.defineProperty(target, key, {
            ...desc,
            value: deepAssign(target[key], desc.value),
          });
        } else {
          Object.defineProperty(target, key, desc);
        }
      } else {
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
export function deepCopy(obj: any) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  const copy: Record<string, any> = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepCopy(obj[key]);
    }
  }
  return copy;
}
