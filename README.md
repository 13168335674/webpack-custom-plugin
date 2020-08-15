# 手动编写一个 plugin

## Init:

创建 `webpack-custom-plugin` 目录

初始化 git `yarn init -y`

配置 `package.json`

```
"scripts": {
  "build": "webpack --mode development"
},
```

添加依赖 `yarn add webpack webpack-cli clean-webpack-plugin html-webpack-plugin -D`

根目录创建 `webpack.config.js`

```
const path = require("path");
const resolve = (file) => path.resolve(__dirname, file);
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "custom-plugin"
    }),
  ]
};


```

运行 `yarn build` 即可打包项目，初始化完成。

## 编写 plugin

根目录创建 `plugins`文件夹，添加 `file-list-plugin.js`

```
class FileListPlugin {
  constructor(options) {
    this.options = options;
    this.filename = this.options.filename || "fileList.md";
  }
  apply(compiler) {
    compiler.hooks.emit.tapAsync("FileListPlugin", (compilation, cb) => {
      // 2.
      const fileListName = this.filename;
      // 3.
      let len = Object.keys(compilation.assets).length;
      // 4.
      let content = `# 一共有${len}个文件\n\n`;
      // 5.
      for (let filename in compilation.assets) {
        content += `- ${filename}\n`;
      }
      // 6.
      compilation.assets[fileListName] = {
        // 7.
        source: function () {
          return content;
        },
        // 8.
        size: function () {
          return content.length;
        }
      };
      // 9.
      cb();
    });
  }
}

module.exports = FileListPlugin;



```

配置 webpack.config.js plugins

```
module: {
    plugins: [
    new HtmlWebpackPlugin({
      title: "custom-plugin"
    }),
    new CleanWebpackPlugin(),
    new FileListPlugin({
      filename: "fileList.md"
    })
  ]
},
```

运行 `yarn build` 查看处理后的结果
