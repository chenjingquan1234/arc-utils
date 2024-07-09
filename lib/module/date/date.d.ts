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
 * 转换日期，输入有效的时间格式，时间戳或者字符串，通过format转时间格式
 * @param date 时间戳
 * @param format 格式
 */
export declare function getDateStr(date: string | number, format?: string): string;
/**
 * 判断时间是否过期
 * @param date 传入可newDate的时间格式
 * @param isToday 判断是否从今天的23.59算起
 */
export declare function isExpire(date: string | number, isToday?: boolean): boolean;
/**
 * 获取指定时间的年月日时分秒，星期几
 * @param value 传入可newDate的时间格式
 * @returns {}
 */
export declare function getDateAttrs(value: Date | string | number, config?: {
    format: string;
}): {
    year: number;
    month: string | number;
    day: string | number;
    hour: string | number;
    minute: string | number;
    second: string | number;
    time: string;
    date: string;
    week: string;
    dataStr: string;
} | undefined;
