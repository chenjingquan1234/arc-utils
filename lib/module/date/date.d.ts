declare const _default: {
    /**
     * 时间戳转日期
     * @param timestamp 时间戳
     * @param format 格式 默认Y-M-D h:m:s
     */
    timestampToTime(timestamp: number, format?: string): string;
    /**
     * 判断一个值是否是时间戳
     * @param value 时间戳
     */
    isTimestamp(value: number): boolean;
    /**
     * 日期转时间戳
     * @param date
     */
    timesToStamp(date: string): number | null;
    /**
     * 转换日期为Moment对象
     * @param timestamp 时间戳
     */
    getDateMoment(timestamp: number): any;
    /**
     * 转换日期
     * @param timestamp 时间戳
     * @param format 格式
     */
    getDateStr(timestamp: number, format?: string): string;
};
export default _default;
