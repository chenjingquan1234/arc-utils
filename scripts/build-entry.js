const fs = require("fs"); // node fs模块
const chalk = require("chalk"); // 自定义输出样式
const { getEntries, resolveFile } = require("./utils");
let srcIndexContent = `// tips：此文件是自动生成的，无需手动添加
`;

getEntries("packages/module/*").forEach(({ baseName, fullPath }) => {
  let moduleIndexContent = `// tips：此文件是自动生成的，无需手动添加
`;

  try {
    // 判断是否文件夹
    const stats = fs.statSync(fullPath);
    if (stats.isDirectory()) {
      getEntries(fullPath).forEach((file) => {
        if (file.baseName.indexOf("index") === -1) {
          moduleIndexContent += `
export * from "./${file.baseName}";
`;
        }
        fs.writeFileSync(resolveFile(fullPath, "index.ts"), moduleIndexContent, "utf-8");
      });
      srcIndexContent += `
      export * as ${baseName}Util from "./module/${baseName}";
      export * from "./module/${baseName}";
      `;
    }
  } catch (e) {
    console.error(e);
  }
});

fs.writeFileSync(resolveFile("packages/index.ts"), srcIndexContent, "utf-8");
console.log(chalk.blue("入口文件生成完成"));
