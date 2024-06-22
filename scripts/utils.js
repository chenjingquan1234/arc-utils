const fs = require("fs"); // node fs模块
const path = require("path");

function getEntries(pattern) {
  const [basePath, filePattern] = pattern.split("*");
  const res = getDeepPathsSync(basePath, filePattern);

  return res;
}

/**
 * 递归生成文件路径
 * @param {*} dir
 * @param {*} filePattern
 * @returns
 */
function getDeepPathsSync(dir, filePattern) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.resolve(dir, file);
    const stat = fs.lstatSync(fullPath);
    const [baseName] = file.split(".");
    if (stat.isDirectory()) {
      // 添加目录路径
      results.push({
        fullPath,
        baseName,
        fileName: file,
      });
      // 如果是目录，递归搜索
      results = results.concat(getDeepPathsSync(fullPath, filePattern));
    } else if (stat.isFile() && (!filePattern || file.endsWith(filePattern))) {
      // 如果是文件，且匹配指定后缀，添加文件路径
      results.push({
        fullPath,
        baseName,
        fileName: file,
      });
    }
  });

  return results;
}

function resolveFile(fullPath, name) {
  const args = [...arguments];
  if (args.length === 1) {
    return path.resolve(fullPath);
  } else if (args.length === 2) {
    return path.resolve(fullPath, name);
  }
}

module.exports = {
  resolveFile,
  getEntries,
  getDeepPathsSync,
};
