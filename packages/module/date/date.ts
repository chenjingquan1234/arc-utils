import moment from "moment";
import { isDate, isEmpty } from "../is";

/**
 * 时间戳转日期
 * @param timestamp 时间戳
 * @param format 格式 默认Y-M-D h:m:s
 */
export function timestampToTime(timestamp: number, format = "Y-M-D h:m:s"): string {
  const date = new Date(timestamp);
  const obj: Record<string, string | number> = {
    Y: date.getFullYear(),
    M: date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1,
    D: date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(),
    h: date.getHours() < 10 ? `0${date.getHours()}` : date.getHours(),
    m: date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes(),
    s: date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds(),
  };
  const newitem = format.split("").map((item) => {
    for (const key in obj) {
      if (item === key) {
        item = obj[key].toString();
      }
    }
    return item;
  });
  return newitem.join("");
}

/**
 * 判断一个值是否是时间戳
 * @param value 时间戳
 */
export function isTimestamp(value: number) {
  if (isEmpty(value)) {
    return false;
  }
  if (isNaN(value)) {
    return false;
  }
  const date = new Date(Number(value));
  return value === date.getTime();
}

/**
 * 日期转时间戳
 * @param date
 */
export function timesToStamp(date: string): number | null {
  return Date.parse(`${+new Date(date)}`) / 1000;
}

/**
 * 转换日期为Moment对象
 * @param timestamp 时间戳
 */
export function getDateMoment(timestamp: number): any {
  if (!timestamp) {
    return null;
  }
  const value = timestampToTime(timestamp).replace(/\-/g, "/");

  return moment(new Date(value));
}
// ---------------------------------------------------------------------------------------
/**
 * 转换日期，输入有效的时间格式，时间戳或者字符串，通过format转时间格式
 * @param date 时间戳
 * @param format 格式
 */
export function getDateStr(date: string | number, format = "YYYY-MM-DD HH:mm:ss"): string {
  if (isEmpty(date)) {
    console.warn("getDateStr: date为空");
    return "";
  }

  const parsedDate = new Date(date);
  if (isNaN(parsedDate?.getTime())) {
    console.warn("getDateStr: 无效的日期格式");
    return "";
  }

  const momentObj = getDateMoment(parsedDate.getTime());
  if (!momentObj) {
    console.warn("getDateStr: 无效的日期格式");
    return "";
  }
  return momentObj.format(format);
}

/**
 * 判断时间是否过期
 * @param date 传入可newDate的时间格式
 * @param isToday 判断是否从今天的23.59算起
 */
export function isExpire(date: string | number, isToday = false): boolean {
  if (isEmpty(date)) {
    console.warn("isExpire: date为空");
    return false;
  }

  const curTimestamp = Date.now();
  let expireTimestamp;

  // 解析日期，并处理无效日期的情况
  const parsedDate = new Date(date);
  if (isNaN(parsedDate?.getTime())) {
    console.warn("isExpire: 无效的日期格式");
    return false;
  }

  if (isToday) {
    expireTimestamp = parsedDate.getTime();
  } else {
    expireTimestamp = parsedDate.setHours(23, 59, 59, 999);
  }

  // 比较时间戳，确定是否过期
  return curTimestamp > expireTimestamp;
}

const weekArr = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];

/**
 * 获取指定时间的年，月，日，时，分，秒，星期
 * @param value 传入可newDate的时间格式
 * @returns {}
 */
export function getDateAttrs(
  value: Date | string | number,
  config = {
    format: "YYYY-MM-DD HH:mm:ss",
  },
):
  | {
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
    }
  | undefined {
  const date = new Date(value);
  if (!isDate(date)) {
    console.warn("getTimeAndWeek：无效的日期格式");
    return;
  }

  const year = date.getFullYear();
  const month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  const hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  const minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  const second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  const week = date.getDay();

  return {
    year,
    month,
    day,
    hour,
    minute,
    second,
    time: hour + ":" + minute + ":" + second,
    date: year + "年" + month + "月" + day + "日",
    week: weekArr[week],
    dataStr: moment(date).format(config.format),
  };
}
