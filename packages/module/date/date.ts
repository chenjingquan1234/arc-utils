import moment from "moment";

export default {
  /**
   * 时间戳转日期
   * @param timestamp 时间戳
   * @param format 格式 默认Y-M-D h:m:s
   */
  timestampToTime(timestamp: number, format = "Y-M-D h:m:s"): string {
    const date = new Date(timestamp);
    const obj: Record<string, string | number> = {
      Y: date.getFullYear(),
      M: date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1,
      D: date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(),
      h: date.getHours() < 10 ? `0${date.getHours()}` : date.getHours(),
      m: date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes(),
      s: date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds(),
    };
    let newitem = format.split("").map((item) => {
      for (let key in obj) {
        if (item === key) {
          item = obj[key].toString();
        }
      }
      return item;
    });
    return newitem.join("");
  },

  /**
   * 判断一个值是否是时间戳
   * @param value 时间戳
   */
  isTimestamp(value) {
    if (isNaN(value)) {
      return false;
    }
    const date = new Date(Number(value));
    return value === date.getTime();
  },

  /**
   * 日期转时间戳
   * @param date
   */
  timesToStamp(date: string): number | null {
    return Date.parse(`${+new Date(date)}`) / 1000;
  },

  /**
   * 转换日期为Moment对象
   * @param timestamp 时间戳
   */
  getDateMoment(timestamp: number): any {
    if (!timestamp) {
      return null;
    }
    const value = this.timestampToTime(timestamp).replace(/\-/g, "/");

    return moment(new Date(value));
  },

  /**
   * 转换日期
   * @param timestamp 时间戳
   * @param format 格式
   */
  getDateStr(timestamp: number, format = "YYYY-MM-DD HH:mm:ss"): string {
    const momentObj = this.getDateMoment(+timestamp);
    if (!momentObj) {
      return "-";
    }
    return momentObj.format(format);
  },
};
