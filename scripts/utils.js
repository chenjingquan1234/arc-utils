const fs = require("fs"); // node fs模块

function resolveFile(currentPath) {
  const items = fs.readdirSync(currentPath);
  console.log({ items });
  return items
}

function getEntries() {}

module.exports = {
  resolveFile,
  getEntries,
};
