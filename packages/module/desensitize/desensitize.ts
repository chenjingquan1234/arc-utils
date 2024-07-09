/**
 * 输入具体下标，脱敏下标范围的值
 * @param input 输入值
 * @param maskIndexes 需要脱敏的下标值
 * @returns
 */
export function desensitizeValue(input: string, maskIndexes?: number[]): string {
  if (!input) return "";
  const length = input.length;
  // 如果未提供脱敏下标数组，则默认对整个输入值进行全脱敏
  if (!maskIndexes || maskIndexes.length === 0) {
    return "*".repeat(length);
  }

  // 创建一个标记数组，用于标记需要脱敏的位置
  const shouldMask = new Array(length).fill(false);

  // 将指定的脱敏下标位置设为 true
  maskIndexes.forEach((index) => {
    if (index >= 0 && index < length) {
      shouldMask[index] = true;
    }
  });

  // 生成脱敏后的值
  let desensitizedValue = "";
  for (let i = 0; i < length; i++) {
    desensitizedValue += shouldMask[i] ? "*" : input[i];
  }

  return desensitizedValue;
}

/**
 * 姓名脱敏
 * @description 脱敏规则：陈：陈，陈某：陈*，陈某某：陈*某，陈某某某：陈**某
 * @param value 输入值
 * @returns {string}
 */
export function nameDesensitize(value: string): string {
  if (!value) {
    console.log("nameDesensitize：输入值为空");
    return "";
  }
  const len = value.length;

  if (len === 2) {
    return value.replace(/^(.).$/, "$1*");
  } else if (len > 2) {
    return value.replace(/^(.).+(.)$/, "$1*$2");
  } else {
    return value;
  }
}

/**
 * 手机号脱敏
 * @description 脱敏规则：默认留前3位和后4位：131****6666
 * @param value 输入值
 * @param maskIndexes 需要脱敏的下标值， 默认留前3位和后4位
 * @returns {string}
 */
export function phoneDesensitize(value: string, maskIndexes?: number[]): string {
  if (!value) {
    console.log("nphoneDesensitize：输入值为空");
    return "";
  }
  value = value.toString();
  maskIndexes = maskIndexes || [3, value.length - 4];
  return desensitizeValue(value, maskIndexes);
}

/**
 * 身份证脱敏
 * @description mode=1: 输入： "110101880101123"，输出 "110****1123"
 * @description mode=2: 输入："11010119880101123X"，输出： "1101************X"
 * @param value 输入值
 * @param mode 1，2两种模式,默认值1
 * @returns {string}
 */
export function identityDesensitize(value: string, mode = 1): string {
  if (!value) {
    console.log("identityDesensitize：输入值为空");
    return "";
  }
  if (!mode) {
    console.log("identityDesensitize：mode为空");
    return "";
  }
  // 输入 "110101880101123"，输出 "110****1123"
  if (mode === 1) {
    const regExp = /^(.{3}).*(\d{4})$/;
    return value.replace(regExp, "$1****$2");
  }
  // 输入："11010119880101123X"，输出： "1101************X"
  if (mode === 2) {
    const regExp = /^(.{2})(?:\d+)(.{2})$/;
    return value.replace(regExp, "$1************$2");
  }
  return "";
}

// TODO 邮箱脱敏
