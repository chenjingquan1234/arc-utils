import moment from "moment";
import { isEmpty } from "../is";

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

/**
 * 转换日期
 * @param timestamp 时间戳
 * @param format 格式
 */
export function getDateStr(timestamp: number, format = "YYYY-MM-DD HH:mm:ss"): string {
  const momentObj = getDateMoment(+timestamp);
  if (!momentObj) {
    return "-";
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
  return expireTimestamp > curTimestamp;
}
