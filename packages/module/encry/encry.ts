// TODO 生成UUID
/**
 * 生成随机数
 * @param len 随机数长度
 * @returns {Object}
 * @property {string} name 是是
 * @property {string} name2 是是
 */
export function randomString(len = 32) {
  const t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnoprstuvwxyz1234567890";
  const a = t.length;
  let str = "";

  for (let i = 0; i < len; i++) {
    str += t.charAt(Math.floor(Math.random() * a));
  }

  return str;
}
// TODO base64解码
// TODO base64加码
// TODO MD5
// TODO AES
// TODO RSA
// TODO 国密SM2
// TODO 国密SM4
