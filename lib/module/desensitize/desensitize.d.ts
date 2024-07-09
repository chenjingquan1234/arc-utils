/**
 * 输入具体下标，脱敏下标范围的值
 * @param input 输入值
 * @param maskIndexes 需要脱敏的下标值
 * @returns
 */
export declare function desensitizeValue(input: string, maskIndexes?: number[]): string;
/**
 * 姓名脱敏
 * @description 脱敏规则：陈：陈，陈某：陈*，陈某某：陈*某，陈某某某：陈**某
 * @param value 输入值
 * @returns {string}
 */
export declare function nameDesensitize(value: string): string;
/**
 * 手机号脱敏
 * @description 脱敏规则：默认留前3位和后4位：131****6666
 * @param value 输入值
 * @param maskIndexes 需要脱敏的下标值， 默认留前3位和后4位
 * @returns {string}
 */
export declare function phoneDesensitize(value: string, maskIndexes?: number[]): string;
/**
 * 身份证脱敏
 * @description mode=1: 输入： "110101880101123"，输出 "110****1123"
 * @description mode=2: 输入："11010119880101123X"，输出： "1101************X"
 * @param value 输入值
 * @param mode 1，2两种模式,默认值1
 * @returns {string}
 */
export declare function identityDesensitize(value: string, mode?: number): string;
