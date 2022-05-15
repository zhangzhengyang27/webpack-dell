touch 1.html 创建html文件

npx webpack index.js 打包

npx webpack lesson01/index.js webpack 默认是将dist打包到主目录的，现阶段需要手动移动

模块打包工具
webpack官方文档

{
"name": "lesson",
"version": "1.0.0",
"description": "",
// 向外暴露
"main": "lesson01/index.js",
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1"
},
"author": "",
"license": "ISC",
"devDependencies": {
"webpack-cli": "^3.1.2"
},
"dependencies": {
"webpack": "^4.25.1"
}
}

npm i webpack webpack-cli -g  
全局安装
webpack -v
最好不要在全局安装webpack

npm i webpack webpack-cli -D

npm info webpack 查看历史的版本

webpack.config.js 文件必须要放到根目录才可以`

const path = require('path');

module.exports = {
// 模式 production打包出的代码是一行显示的 压缩
mode: 'development', // 未压缩
// 入口
entry: {
main: './src/index.js'
},
// 出口 打包的目录和文件名称
output: {
filename: 'bundle.js',
path: path.resolve(__dirname, 'bundle')
}
}

修改webpack打包的配置文件 (指定任意文件)
npx webpack --config webpackrename.js

file-loader、url-loader

plugin可以在webpack运行到某个时候的时候，帮你做一些事情
htmlWebpackPlugin 会在打包结束后，自动生成一个html文件，并把打包后生成的js自动引入html中
CleanWebpackPlugin 不是官方推荐的插件

webpack 文档

出错时可以查看源代码，做源代码与生成代码的映射
devtool 就是配置source-map
推荐使用的devtool配置
development devtool: 'cheap-module-eval-source-map',
production devtool: 'cheap-module-source-map',
inline- 将source-map放到打包后的js文件中，不新增一个js
cheap- 只显示行信息，不显示列信息
module- loader里面的错误
eval- 执行代码，提高执行效率

dev-serve的三种配置方法
1、packag.json中配置scripts  "watch": "webpack --watch",
"scripts": {
"bundle": "webpack",
"watch": "webpack --watch",
"start": "webpack-dev-server",
"server": "node server.js"
},
2、webpack-dev-server方法 ，需要安装webpack-dev-server插件  "start": "webpack-dev-server",
比第一种方法好在，可以自动打开浏览器，并且更新后，自动刷新浏览器,打包好的dist文件目录放在内存里面
"scripts": {
"bundle": "webpack",
"watch": "webpack --watch",
"start": "webpack-dev-server",
"server": "node server.js"
},
3、早期的vue版本
安装express webpack-dev-middleware 插件
新建serve.js文件，自己搭建服务器

*整理文档 documentation - guides development

热更新就是只渲染修改的代码，而不是全部刷新渲染
配置：weback.config.js
1、引入webpack
const webpack = require('webpack');
2、修改devServer
devServer: {
contentBase: './dist',
open: true,
port: 8080,
hot: true,
hotOnly: true
},
3、添加plugins
plugins: [
new HtmlWebpackPlugin({
template: 'src/index.html'
}),
new CleanWebpackPlugin(['dist']),
new webpack.HotModuleReplacementPlugin()
],
*整理文档 documentation - guides Hot Module Replacement(HMR)





