const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const no1WebpackPlugin = require("./plugins/no1-webpack-plugin");
const no2WebpackPlugin = require("./plugins/no2-webpack-plugin");
const FileListPlugin = require("./plugins/file-list-plugin");

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
    new CleanWebpackPlugin(),
    // new no1WebpackPlugin({ msg: "good adi!" }),
    // new no2WebpackPlugin({ msg: "good adi 呀!" }),
    new FileListPlugin({
      filename: "fileList.md"
    })
  ]
};
