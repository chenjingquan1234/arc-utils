const fs = require("fs"); // node fs模块
// const chalk = require("chalk"); // 自定义输出样式
const { resolveFile, getEntries } = require("./utils");
let srcIndexContent = `
// tips：此文件是自动生成的，无需手动添加
`;

resolveFile("packages/");

// getEntries(resolveFile("src/modules/*")).forEach(({ baseName, entry }) => {
//   let moduleIndexContent = `
// // tips：此文件是自动生成的，无需手动添加
// `;
//   try {
//     // 判断是否文件夹
//     const stats = fs.statSync(entry);
//     if (stats.isDirectory()) {
//       getEntries(`${entry}/*.ts`).forEach(({ baseName }) => {
//         baseName = baseName.split(".")[0];
//         if (baseName.indexOf("index") === -1) {
//           moduleIndexContent += `
// export * from './${baseName}'
// `;
//         }
//       });
//       fs.writeFileSync(`${entry}/index.ts`, moduleIndexContent, "utf-8");
//       srcIndexContent += `
// export * from './modules/${baseName}'
// export * as ${baseName} from './modules/${baseName}'
// `;
//     } else {
//       srcIndexContent += `
// export * from './modules/${baseName.split(".")[0]}'
// `;
//     }
//   } catch (e) {
//     console.error(e);
//   }
// });
fs.writeFileSync("packages/index2.ts", srcIndexContent, "utf-8");
