/**
 * 时间戳转日期
 * @param timestamp 时间戳
 * @param format 格式 默认Y-M-D h:m:s
 */
export declare function timestampToTime(timestamp: number, format?: string): string;
/**
 * 判断一个值是否是时间戳
 * @param value 时间戳
 */
export declare function isTimestamp(value: number): boolean;
/**
 * 日期转时间戳
 * @param date
 */
export declare function timesToStamp(date: string): number | null;
/**
 * 转换日期为Moment对象
 * @param timestamp 时间戳
 */
export declare function getDateMoment(timestamp: number): any;
/**
 * 转换日期
 * @param timestamp 时间戳
 * @param format 格式
 */
export declare function getDateStr(timestamp: number, format?: string): string;
