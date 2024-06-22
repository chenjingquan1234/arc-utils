export default {
  /**
   * 浅合并对象。写法同 Object.assign
   * 通过重定义方式合并，解决 Object.assign 合并两边同名属性混有 value写法 和 get/set写法 时报 TypeError: Cannot set property b of #<Object> which has only a getter 的问题
   * @param target {object} 目标对象
   * @param sources {any[]} 数据源。一个或多个对象
   * @returns {*}
   */
  assign(target = {}, ...sources: any[]) {
    for (const source of sources) {
      // 不使用 target[key]=value 写法，直接使用desc重定义
      for (const [key, desc] of Object.entries(Object.getOwnPropertyDescriptors(source))) {
        Object.defineProperty(target, key, desc);
      }
    }
    return target;
  },

  /**
   * 深合并对象。同 assign 一样也会对属性进行重定义
   * @param target {object} 目标对象。默认值 {} 防止递归时报 TypeError: Object.defineProperty called on non-object
   * @param sources {any[]} 数据源。一个或多个对象
   */
  deepAssign(target: Record<string, any> = {}, ...sources: any[]) {
    for (const source of sources) {
      for (const [key, desc] of Object.entries(Object.getOwnPropertyDescriptors(source))) {
        if ("value" in desc) {
          // value写法：对象递归处理，其他直接定义
          if (this.isObject(desc.value)) {
            Object.defineProperty(target, key, {
              ...desc,
              value: this.deepAssign(target[key], desc.value),
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
  },
  /**
   * 深复制对象
   * @param value 输入的值，判断是否对象
   * @returns {boolean}
   */
  deepCopy(obj) {
    if (typeof obj !== "object" || obj === null) {
      return obj;
    }

    let copy = Array.isArray(obj) ? [] : {};

    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        copy[key] = this.deepCopy(obj[key]);
      }
    }
    return copy;
  },

  /**
   * 判断是否对象
   * @param value 输入的值，判断是否对象
   * @returns {boolean}
   */
  isObject(value: any) {
    return Object.prototype.toString.call(value) === "[object Object]";
  },

  /**
   * 判断是否对象是空
   * @param value 输入的值
   *  @returns {boolean}
   */
  isEmpty(value: Record<string, any>) {
    if (!this.isObject(value)) return false;
    return Object.keys(value).length === 0;
  },

  /**
   * 判断是否对象不为空
   * @param value 输入的值
   * @returns {boolean}
   */
  notEmpty(obj: Record<string, any>) {
    if (!this.isObject(obj)) return false;
    return Object.keys(obj).length > 0;
  },
};
