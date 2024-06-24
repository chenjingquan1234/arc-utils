const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const chalk = require("chalk"); // 自定义输出样式
const packageJsonPath = path.resolve(__dirname, "../package.json");

exec("npm whoami", (error, stdout, stderr) => {
  if (error) {
    // 未登录
    console.log("未登录");
    if (stderr.includes("ENEEDAUTH")) {
      // 处理未登录的情况
      console.log(chalk.red("未登录npm，请输入npm login登录（确保源是https://registry.npmjs.org/）"));
    }
  } else {
    // 登录了

    console.log(chalk.blue("登录用户:", stdout.trim()));

    // 读取 package.json 文件
    fs.readFile(packageJsonPath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading package.json:", err);
        return;
      }

      // 解析 JSON 数据
      let packageJson;
      try {
        packageJson = JSON.parse(data);
      } catch (parseErr) {
        console.error("Error parsing package.json:", parseErr);
        return;
      }

      // 获取当前版本号
      const currentVersion = packageJson.version;
      if (!currentVersion) {
        console.error("Version field not found in package.json");
        return;
      }

      // 增加版本号
      const versionParts = currentVersion.split(".");
      if (versionParts.length !== 3) {
        console.error("Invalid version format in package.json");
        return;
      }

      // 假设我们要增加补丁部分（第三部分）
      versionParts[2] = parseInt(versionParts[2], 10) + 1;

      // 更新 package.json 中的版本号
      packageJson.version = versionParts.join(".");

      // 将修改后的 JSON 数据写回 package.json 文件
      fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2), "utf8", (writeErr) => {
        if (writeErr) {
          console.error("Error writing package.json:", writeErr);
          return;
        }
        console.log(`Successfully updated version to ${packageJson.version}`);
        // 执行 npm publish 命令
        const publishProcess = exec("npm publish --access public", (error, stdout, stderr) => {
          if (error) {
            console.error(`Error: ${error.message}`);
            return;
          }
          if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return;
          }
          console.log(`Stdout: ${stdout}`);
          chalk.green("成功上传到npm");
        });

        // 将子进程的标准输出和标准错误输出重定向到主进程的控制台
        publishProcess.stdout.pipe(process.stdout);
        publishProcess.stderr.pipe(process.stderr);

        // 监听子进程的 'close' 事件，以便在进程结束时进行处理
        publishProcess.on("close", (code) => {
          if (code === 0) {
            console.log("npm publish executed successfully.");
            chalk.green("成功上传到npm");
          } else {
            console.error(`npm publish failed with exit code ${code}.`);
          }
        });
        // 监听子进程的 'error' 事件，以捕获任何错误
        publishProcess.on("error", (err) => {
          chalk.red("Failed to start subprocess.", err);
        });
      });
    });
  }
});
