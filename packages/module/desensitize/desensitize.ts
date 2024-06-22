// 脱敏类
export default {
  /**
   * 输入具体下标，脱敏下标范围的值
   * @param input 输入值
   * @param maskIndexes 需要脱敏的下标值
   * @returns
   */
  desensitizeValue(input: string, maskIndexes?: number[]): string {
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
  },
};
